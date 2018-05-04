'use strict';

define([""],
    function() {

        var _webSocket = null;
        var _wsProtocol = "ws://";

        var _activeCallID=null;

        var _activeUser= null;
        var _activeMultiDn =[];

        var _activeChatDN =[];
        var _activeChatUser =[];
        
        var _activeMailDN="";
        var _activeMailUser="";



        var _activeHeldCallID = null;


        var _viewModelContainer=[];



        function DNInfo () {
            this.dn ="";
            this.kind = 0 ;//1 : Call , 10: email ,31 : chat
            this.user ="";
            this.activecall = null;
            this.UseOK = 0; 
        };

        var _dnArray = new Array();
       



        var Base64 = {

            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode: function(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode: function(input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                //input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode: function(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode: function(utftext) {
                var string = "";
                var i = 0;
                var c=0;
                var c1=0;
                var c2=0;
                var c3=0;
                // var c = c1 = c2 = 0;

                while (i < utftext.length) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }

        };





        var _cubeApiProxy = function() {
            return this;
        };

        _cubeApiProxy.prototype.UseWebSocket = function() {
            return _webSocket;
        };

        _cubeApiProxy.prototype.addViewModel = function (viewModel) {
            _viewModelContainer[_viewModelContainer.length] = viewModel;

        };


        _cubeApiProxy.prototype.openServer = function(protocol,serverIP,serverPort,UserID ,UserDn) {

            _webSocket = new WebSocket(_wsProtocol + serverIP + ":" + serverPort);

            _webSocket.onopen= function (){
                var nonce = (String)(Math.floor(Math.random() * 10000));
                var open = new Object();
                open.fname = "login";
                open.id = UserID;
                open.nonce = nonce;
                open.pwd = "1";
    
                _cubeApiProxy.prototype.send(JSON.stringify(open))
    
                _cubeApiProxy.prototype.monitorStart(UserDn);


                var callUser = new DNInfo();
                callUser.dn = UserDn;
                callUser.user= UserID;
                callUser.kind = 1;

                _dnArray.push(callUser); 
                

            }

            _webSocket.onmessage = function (message) {
            
                var obj = false;
                obj = JSON.parse(message.data);
    
                if ( obj.fname =="event") { 
                    
                    switch (obj.id) {
                        case 4: //DL
                            console.log("Delivered ..");
                            _cubeApiProxy.prototype.setActiveCall(obj.this, obj.call.c1);
                            break;
                        case 8:
                            console.log("held ..");
                            _cubeApiProxy.prototype.prototype.setActiveHeldCall(obj.this, obj.call.c1);
                            break;
                        

                    }
                    
                    
                    for (var n = 0; n < _viewModelContainer.length; n++) {
                        _viewModelContainer[n].eventpush(obj);
                    }
                } else if (obj.fname ="addmonitor") { 
                    console.log("#recv:" + message.data);
                } else {
                    console.log("#recv:" + message.data);
                }
            };


        };

        _cubeApiProxy.prototype.BASE64decode = function(contents) {
            return Base64.decode(contents);
        };

        _cubeApiProxy.prototype.monitorStart = function(UserDn) {
            var monitor = new Object();
            monitor.fname = "addmonitor";
            monitor.device = UserDn;
		    this.send(JSON.stringify(monitor));
        };

        _cubeApiProxy.prototype.MultiChannelAddDevice = function(UserDn,userID,mediaID) {
            var addDevice = new Object();
            addDevice.fname = "addmonitor";
            addDevice.device = String(UserDn);


            if (mediaID=="10" ) { //email
                _activeMailDN = UserDn;
                _activeMailUser = userID;
            }  else if ( mediaID =="31" ) { //chat
                var length = _activeChatDN.length;
                _activeChatDN[length] = String(UserDn);
                _activeChatUser[length] = userID;
            };
         
            this.send(JSON.stringify(addDevice));


        };

       



        _cubeApiProxy.prototype.setActiveCall = function(UserDn,callID) {

            for(var idx = 0; idx < _dnArray.length; idx++ ) {
                if (_dnArray[idx].dn ==  UserDn) {
                    _dnArray[idx].activecall = callID;
                }
            }

             _activeCallID = String(callID);    //callID;
        };

        _cubeApiProxy.prototype.getActiveCall = function(UserDn) {
           var rtnCallid="0";

            for(var idx = 0; idx < _dnArray.length; idx++ ) {
                if (_dnArray[idx].dn ==  UserDn) {
                    rtnCallid = _dnArray[idx].activecall ;
                }
            }

            return rtnCallid;

        };


        _cubeApiProxy.prototype.getActiveChatDn = function () {

            var rtnChatDn = new Array();

            for(var idx = 0; idx < _dnArray.length; idx++ ) {
                if (_dnArray[idx].kind ==  31) {
                    rtnChatDn.push(_dnArray[idx]);
                }
            }

            return rtnChatDn ;
        }

        _cubeApiProxy.prototype.getActiveChatDnCheck = function (UserDn) {

            var rtnChatDnCheck = 0 ;

            for(var idx = 0; idx < _dnArray.length; idx++ ) {
                if (_dnArray[idx].kind ==  31) {
                    if (_dnArray[idx].dn ==  UserDn) {
                        rtnChatDnCheck = 1;
                    }
                }
            }

            return rtnChatDnCheck ;
        }

        _cubeApiProxy.prototype.getActiveMailDn = function () {

            var rtnMailDn = "";

            for(var idx = 0; idx < _dnArray.length; idx++ ) {
                if (_dnArray[idx].kind ==  10) {
                    rtnMailDn = _dnArray[idx].dn;
                }
            }

            return rtnMailDn ;
        }




         _cubeApiProxy.prototype.getActiveMailDnCheck = function (UserDn) {

            var rtnMailDnCheck = 0 ;

            for(var idx = 0; idx < _dnArray.length; idx++ ) {
                if (_dnArray[idx].kind ==  10) {
                    
                    if (_dnArray[idx].dn ==  UserDn) {
                        rtnMailDnCheck = 1;
                    }
                }
            }

            return rtnMailDnCheck ;
        }

        

       




        _cubeApiProxy.prototype.setActiveHeldCall = function(UserDn,callID) {
            _activeHeldCallID = String(callID);    //callID;
        };

        _cubeApiProxy.prototype.getActiveHeldCall = function(UserDn) {
            return _activeHeldCallID ;
        };



        _cubeApiProxy.prototype.answer = function(UserDn) {

            var answer = new Object();
			answer.fname = 'answer';
			answer.this = UserDn;
			answer.c1 = _activeCallID;

            this.send(JSON.stringify(answer));
            
        };

        _cubeApiProxy.prototype.chatAnswer = function(UserDn,callid) {

            var answer = new Object();
			answer.fname = 'answer';
			answer.this = UserDn;
			answer.c1 = callid;

            this.send(JSON.stringify(answer));
            
        };


        _cubeApiProxy.prototype.mailAnswer = function(UserDn,callID){

            var answer = new Object();
			answer.fname = 'answer';
			answer.this = UserDn;
			answer.c1 = callID;

            this.send(JSON.stringify(answer));

        };




        _cubeApiProxy.prototype.makeCall = function(thisNo,dialNo) {

            var dial = new Object();
            dial.fname = 'dial';
            dial.this = thisNo;
			dial.called = dialNo;
            dial.uui ="";

            var attach = new Object();
            attach.uei = "";
            attach.ci = "";
           
            dial.attach = attach;

            this.send(JSON.stringify(dial));
            
        };




        _cubeApiProxy.prototype.clearConnection = function(UserDn) {

            var clear = new Object();
            clear.fname = 'clear';
            clear.this = UserDn;
            clear.c1 = _activeCallID;
         
            this.send(JSON.stringify(clear));

        };


        _cubeApiProxy.prototype.mailClearConnection = function(UserDn,CallID) {

            var clear = new Object();
            clear.fname = 'clear';
            clear.this = UserDn;
            clear.c1 = CallID;
         
            this.send(JSON.stringify(clear));

        };





        _cubeApiProxy.prototype.holdCall = function (callingDn) {
            var hold = new Object();
            hold.fname ="hold";
            hold.this = callingDn;
            hold.c1 = _activeCallID;

            this.send(JSON.stringify(hold));

        };


        _cubeApiProxy.prototype.retrieve = function (callingDn) {
            var retrieve = new Object();
            retrieve.fname ="retrieve";
            retrieve.this = callingDn;
            retrieve.c1 = _activeCallID;

            this.send(JSON.stringify(retrieve));

        };


        _cubeApiProxy.prototype.consult = function (callingDn,calledDN) {
            var consult = new Object();
            consult.fname ="consult";
            consult.this = callingDn;
            consult.c1 = _activeCallID;

            consult.called = calledDN;
            consult.mode="0"; ////mode 0 : Transfer , mode 1 : Confer
            consult.uui="";
            
            var attach = new Object();
            attach.uei = "";
            attach.ci = "";
           
            consult.attach = attach;


            this.send(JSON.stringify(consult));

        };


        _cubeApiProxy.prototype.transfer = function (callingDn,calledDN) {
            var transfer = new Object();
            transfer.fname ="consult";
            transfer.this = callingDn;
            transfer.c1 = _activeCallID;
            transfer.held = calledDN;

            transfer.c2 = _activeHeldCallID; //; //Held call id
            
            transfer.mode = 0;
            
            this.send(JSON.stringify(transfer));

        };

        _cubeApiProxy.prototype.confer = function (callingDn,calledDN) {
            var confer = new Object();
            confer.fname ="confer";
            confer.this = callingDn;
            confer.c1 = callID;
            
            confer.held = calledDN;
            confer.c2 = _activeHeldCallID ;//"; //Held call id
            confer.mode = 1;
            
            this.send(JSON.stringify(confer));

        };


        _cubeApiProxy.prototype.sendChatMsg = function (mimeTypeInput, text ,UserDn,calledDn ,activeCid ) {

            console.log("cubeApiProxy.prototype.sendChatMsg()");

            var mimeType = mimeTypeInput;
            var msg_me = text;


            var json = new Object();
            json.fname = "sendchatmsg";
            json.c1 = activeCid;
            json.this = UserDn;
            json.called = calledDn;
            
            json.mime = mimeType;
            json.contents = Base64.encode(msg_me);
            json.reason ="0"
            this.send(JSON.stringify(json));
        };


        _cubeApiProxy.prototype.helpCall = function (TargetDn ) {

            var pwdconfirm = new Object();
            pwdconfirm.fname = "pwdconfirm";
            pwdconfirm.this = TargetDn;
            pwdconfirm.reason ="1";
            pwdconfirm.attach ="helpcall";

		    this.send(JSON.stringify(pwdconfirm));

        };


        // function sleep (delay) {
        //     var start = new Date().getTime();
        //     while( new Date().getTime() <start+ delay );
        // };

        _cubeApiProxy.prototype.changeAgentStatus = function(fname,UserID,UserDn) {
            var obj = new Object();
            obj.fname = fname;
            obj.this = UserDn;

            var agent = new Object();
            agent.id = UserID;
            agent.reason = "0"
            agent.group = "400";
            agent.channel = "0";
            
            obj.agent = agent;

            switch(fname) {
                case "logon" :
                    agent.wmode = "1";
                    //agent.channel = (0x40).toString(10);
                    break;
                case "logoff":
                    agent.wmode = "1";
                    break;
                case 'ready':
                    break;
                case 'notready':
                    break;
                case 'afterwork':
                    break;
            }

            this.send(JSON.stringify(obj));
        
        };




        _cubeApiProxy.prototype.changeAgentStatusMail = function(fname) {
            var obj = new Object();
            obj.fname = fname;
            obj.this = _activeMailDN;

            var agent = new Object();
            agent.id = _activeMailUser;
            agent.reason = "0"
            agent.group = "400";
            agent.channel = "0";
            
            obj.agent = agent;

            switch(fname) {
                case "logon" :
                    agent.wmode = "1";
                    agent.channel = (0x40).toString(10);
                    break;
                case "logoff":
                    agent.wmode = "1";
                    break;
                case 'ready':
                    break;
                case 'notready':
                    break;
                case 'afterwork':
                    break;
            }

            this.send(JSON.stringify(obj));
        
        };

        _cubeApiProxy.prototype.changeAgentStatusChat = function(fname) {

            var length = _activeChatDN.length;
        
            for (var n = 0; n < length; n++) {

                var obj = new Object();
                obj.fname = fname;
                obj.this = _activeChatDN[n];
    
                var agent = new Object();
                agent.id = _activeChatUser[n];
                agent.reason = "0"
                agent.group = "400";
                agent.channel = "0";
                
                obj.agent = agent;
    
                switch(fname) {
                    case "logon" :
                        agent.wmode = "1";
                        agent.channel = (0x10).toString(10);
                        break;
                    case "logoff":
                        agent.wmode = "1";
                        break;
                    case 'ready':
                        break;
                    case 'notready':
                        break;
                    case 'afterwork':
                        break;
                }
    
                this.send(JSON.stringify(obj));

            }



            // var obj = new Object();
            // obj.fname = fname;
            // obj.this = _activeMailDN;

            // var agent = new Object();
            // agent.id = _activeMailUser;
            // agent.reason = "0"
            // agent.group = "400";
            // agent.channel = "0";
            
            // obj.agent = agent;

            // switch(fname) {
            //     case "logon" :
            //         agent.wmode = "1";
            //         agent.channel = (0x40).toString(10);
            //         break;
            //     case "logoff":
            //         agent.wmode = "1";
            //         break;
            //     case 'ready':
            //         break;
            //     case 'notready':
            //         break;
            //     case 'afterwork':
            //         break;
            // }

            // this.send(JSON.stringify(obj));
        
        }


        _cubeApiProxy.prototype.send =function(msg) {
            console.log("#send:" + msg);
            _webSocket.send(msg);
        };



        _cubeApiProxy.prototype.MultiChannelAddDevice = function(channelinfo) {

            var addDevice = new Object();
            addDevice.fname = "addmonitor";

            for(var idx = 0; idx < channelinfo.length; idx++ ) {
                

                if (channelinfo[idx].SUB_MEDIA_ID =="10" ) { //email
                    _activeMailDN = String(channelinfo[idx].SUB_DN);
                    _activeMailUser = channelinfo[idx].EMPLOYEE_ID;
                }  else if ( channelinfo[idx].SUB_MEDIA_ID =="31" ) { //chat
                    var length = _activeChatDN.length;
                    _activeChatDN[length] = String(channelinfo[idx].SUB_DN);
                    _activeChatUser[length] = channelinfo[idx].EMPLOYEE_ID;
                };


                var callUser = new DNInfo();
                callUser.dn = String(channelinfo[idx].SUB_DN);
                callUser.user= channelinfo[idx].EMPLOYEE_ID;
                callUser.kind = channelinfo[idx].SUB_MEDIA_ID;

                _dnArray.push(callUser);

                addDevice.device =  String(channelinfo[idx].SUB_DN);

                this.send(JSON.stringify(addDevice),function() {
                    console.log("MultiChannelAddDevice");
                });

            };

        }



        _cubeApiProxy.prototype.send = function(message,callback) {
            this.waitForConnection(function() {
                console.log("#send:" + message);
                _webSocket.send(message);
                if ( typeof callback!=='undefined') {
                    callback();
                }
            },1000);
        };

        _cubeApiProxy.prototype.waitForConnection = function (callback,interval) {
            if (_webSocket.readyState === 1 ) {
                callback();
            } else {
                var that = this;
                setTimeout (function () {
                    that.waitForConnection(callback,interval);
                },interval);
            }

        }




        _cubeApiProxy.prototype.onclose = function () {
            _webSocket = null;
        };


    return {
        Proxy : _cubeApiProxy,
        ProxySocket : _webSocket
    };

    }
);