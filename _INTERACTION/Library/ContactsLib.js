//20180504 Sam #16130 
'use strict';
define([""], function() {
        var fnCallback;
        var wsSession;
        var iAsyncConnect = 0;
        var iNextAsync = 0;
        var iAttemptConnect = 0;
        var sTelephonNum ="";
        //var AddLog;

        const evtConnect = 1;
        const evtSearch = 2;
        const evtDoAction = 3;
        const evtConfigurationChanged = 4;
        const evtMakeCall = 5;
        const evtOutOfService = 6;
        const evtError = 7;
        const evtGetAddressBooks = 8;
        const evtGetPicture = 9;
        const evtGetActions = 10;
        const evtSetState = 11;

        const iPicCrm16 = 1
        const iPicCrm32 = 2
        const iPicContact = 3

        const errNotStarted = -1
        const errNotAttached = -2
        const errInsufficientSpace = -3
        const errNoLicense = -3
        const errGeneric = -99

        var _crm = function() {
            return this;
        };

        _crm.prototype.SetCallback = function(CallbackEvent) {
            fnCallback = CallbackEvent;
            return 0;
        }

        function DoCallback(iEvent, iAsyncRef, sData) {
            if (typeof fnCallback === "function") {
                fnCallback(iEvent, iAsyncRef, sData);
            }
        }

        _crm.prototype.ConnectAsync = function(Country, Language, Serial) {
            iAttemptConnect = 0;
            iAsyncConnect = NextAsync();
            window.location.assign("PhoneHelper:LoadIntegrator(" + Country + "," + Language + "," + Serial);
            ConnectAsync2();
            return iAsyncConnect;
        }

        function ConnectAsync2() {
            wsSession = new WebSocket("wss://localhost.mondago.net:21047");
            wsSession.onclose = wsClose;
            wsSession.onerror = wsError;
            wsSession.onmessage = wsMessage;
            wsSession.onopen = wsOpen;
        }

        function Disconnect() {
            wsSession.close();
            return 0;
        }

        function Configure(Caption) {
            // Need to Encode/check Caption
            if (wsSession == null) errNotAttached;
            wsSession.send("<Packet><Command>CrmConfigure</Command><Caption>" + Caption + "</Caption></Packet>");
            return 0;
        }

        function AddressBook(Caption, Filter) {
            // Need to Encode/check Caption
            if (wsSession == null) errNotAttached;
            wsSession.send("<Packet><Command>CrmAddressBook</Command><Caption>" + Caption +"</Caption>" + Filter +"</Packet>");
            return 0;
        }

        function GetAddressBooks() {
            //Supposed to be a synchronous response;
            if (wsSession == null) errNotAttached;
            var iAsync = NextAsync();
            wsSession.send("<Packet><Command>CrmGetAddressBooks</Command><Event>" + evtGetAddressBooks + "</Event><Ref>" + iAsync + "</Ref></Packet>");
            return iAsync;
        }

        function SearchAsync(AddressBook, Filter) {
            // Need to Encode/check params
            if (wsSession == null) errNotAttached;
            var iAsync = NextAsync();
            wsSession.send("<Packet><Command>CrmSearch</Command><Event>" + evtSearch + "</Event><Ref>" + iAsync +"</Ref><AddressBook>" + AddressBook + "</AddressBook>" + Filter + "</Packet>");
            return iAsync;
        }

        function GetActions(ContactId) {
            // Need to Encode/check params
            //Supposed to be a synchronous response;
            if (wsSession == null) errNotAttached;
            var iAsync = NextAsync();
            wsSession.send("<Packet><Command>CrmGetActions</Command><Event>" + evtGetActions + "</Event><Ref>" + iAsync + "</Ref><ContactId>" + ContactId + "</ContactId></Packet>");
            return iAsync;
        }

        function GetPicture(PicType, Id) {
            // Need to Encode/check params
            //Supposed to be a synchronous response;
            if (wsSession == null) errNotAttached;
            var iAsync = NextAsync();
            wsSession.send("<Packet><Command>CrmGetPicture</Command><Event>" + evtGetActions + "</Event><Ref>" + iAsync + "</Ref><PicType>" + PicType + "</PicType><Id>" + Id + "</Id></Packet>");
            return iAsync;
        }
        function DoActionAsync(Action, ContactId, Values) {
            // Need to Encode/check params
            if (wsSession == null) errNotAttached;
            var iAsync = NextAsync();
            wsSession.send("<Packet><Command>CrmDoAction</Command><Event>" + evtDoAction + "</Event><Ref>" + iAsync + "</Ref><Action>" + Action + "</Action><ContactId>" + ContactId + "</ContactId><Values>" + Values + "</Values></Packet>");
            return iAsync;
        }

        function SetState(OnCall, Dnd, VM) {
            // Need to Encode/check Caption
            if (wsSession == null) errNotAttached;
            wsSession.send("<Packet><Command>CrmSetState</Command><OnCall>" + OnCall +"</OnCall><Dnd>" + Dnd +"</Dnd><VM>" + VM +"</VM></Packet>");
            return 0;
        }

        function NextAsync() {
            iNextAsync += 1;
            if (iNextAsync > 999) iNextAsync = 1;
            return iNextAsync;
        }

        function wsClose() {
            if (iAsyncConnect > 0) {
                iAttemptConnect++;
                if (iAttemptConnect < 5) {
                    sleep(iAttemptConnect * 2000);
                    ConnectAsync2();
                } else {
                    iAsyncConnect = 0;
                    DoCallback(evtConnect, iAsyncConnect, "Close");
                }
            } else {
                DoCallback(evtOutOfService, 0, "")
            }
        };

        function wsError(evt) {
            // Not sure if needed
        };

        function wsMessage(evt) {
            // Todo get Event and AsyncRef
            DoCallback(-1, -1, evt.data)
        };

        function wsOpen() {
            DoCallback(evtConnect, iAsyncConnect, "Open")
            iAsyncConnect = 0;
        };

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) break;
            }
        }

        _crm.prototype.CallbackEvent = function(iEvent, iAsyncRef, sData){ 
            
            function AddLog(sFunction, sText){
                console.log( sFunction + ": " + sText);   
                
                if(sText == "1  Open"){
                    var fillter = "<filter><telephone>"+sTelephonNum+"</telephone></filter>";
                    
                    AddLog("Search", AddressBook(sTelephonNum,fillter));
                }
            }
            
            if(iEvent ==-1){
                AddLog("Search", " "+sData);
                console.log(xmlLoad(sData));
            }else{
                AddLog("CallbackEvent", iEvent + "  " + sData);
            }  

          };
        function xmlLoad(xml){
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xml, "text/xml");
            var data = new Object();
            if(xmlDoc.getElementsByTagName("DeviceName")[0].childNodes != undefined){
                data.CRM_KIND = xmlDoc.getElementsByTagName("DeviceName")[0].childNodes[0].nodeValue;
            }else{
                data.CRM_KIND ="";
            }

            if(xmlDoc.getElementsByTagName("DisplayName")[0].childNodes != undefined){
                data.NAME = xmlDoc.getElementsByTagName("DisplayName")[0].childNodes[0].nodeValue;
            }else{
                data.NAME ="";
            }                         
            
            return data;
        }
          _crm.prototype.AddLog = function(sFunction, sText,telno){
            console.log( sFunction + ": " + sText);
            switch(sFunction)
            {
                case "SetCallback":
                    if(sText == 0){
                        this.AddLog("Connect",this.ConnectAsync(44, "English",0));
                        sTelephonNum = telno;
                    }
                break;              	
            }
        };
        return {
            _CRM : _crm
        };
    }
);