'use strict';

define(["knockout", 
        "../../Library/interaction.nxproxy",
        "../../Library/interaction.selector",
        "../../Components/components"],
   function( ko, nxproxy,dbselector, nxcomponent ) {

     var _cubeProxy = nxproxy;
     var _useQuery ="";
     var activeCid = null;
     var calledDn = null;
     var self = this;
     var _answerTime ="";
     var _callType ="1"

     var activeChatDn="";

     var nexus_signin = $.nexus({
        core : "nxapi",
        nxapi : {
           config : {
              kind : "localStorage",
              action : "get"
           },
           params : {
              key : "nexus_signin"
           }
        }
     });




     var userID = nexus_signin.userId ;

     var ActiveDn ="";


      function ViewMainChatViewModel( param ) {
         console.log("[viewChatMain] :: ViewMainChatViewModel : load");

        _cubeProxy.Proxy.prototype.addViewModel(this);


        $('#sendMsg').click(function () {
            console.log("" + $("#chat_txt").val());
            if ($("#chat_txt").val() == "")
                return false;
            _cubeProxy.Proxy.prototype.sendChatMsg("wchat/text", $("#chat_txt").val(),ActiveDn, calledDn,activeCid);
            $("#chat_txt").val("");
        });

        $('#saveReady').click(function () {
            
            saveReady();
        });

        $('#saveNotReady').click(function () {
            // console.log("" + $("#chat_txt").val());
            // if ($("#chat_txt").val() == "")
            //     return false;
            // _cubeProxy.Proxy.prototype.sendChatMsg("wchat/text", $("#chat_txt").val(),"1011", calledDn,activeCid);
            // $("#chat_txt").val("");
            
            this.prototype.saveNotReady();
        });

        
        $("#chat_txt").keypress(function (e) {
            if (e.which == 13){
                if ($("#chat_txt").val() == "")
                    return false;
                _cubeProxy.Proxy.prototype.sendChatMsg("wchat/text", $("#chat_txt").val(),ActiveDn, calledDn,activeCid);
                $("#chat_txt").val("");
                
            }
        });

      };

      var saveReady = function () {

        console.log("saveReady");

        _useQuery = insertConsultQuery();

        getData(function(result, error, param){
            console.log("result {}" , result);

            if ( result != null) {
                _cubeProxy.prototype.changeAgentStatus("ready",userID,ActiveDn);
            }
        } );
      }

      var getcalltype = function() {

        if (_callType == 2) {
            return "1";
        } else  {
            return "2";    
        }
      
      };

      var insertConsultQuery= function() {
        var query="";
        
        query = " INSERT INTO COUNSELING_DATA ( "
                + " CAMPAIGN_CODE, "
                //+ " CUSTOMER_IDX, " 
                + " AGENT_ID, "
                + " AGENT_DN, "
                // + " CALL_FLAG, " 
                // + " CALL_NUM, " 
                // + " CATEGORY_IDX, "
                + " CALL_ID, "
                + " DESCRIPT, " 
                + " START_TIME, "
                // + " END_TIME, " 
                 + " REG_AGENTID, "  
                // + " CENTER_ID, "
                 + " TENANT_ID, "
                 + " CALL_TYPE, "
                + " category1, "
                + " category2, "
                + " category3, "
                + " CUBE_CALL_KIND , "
                 + " GROUP_ID "
                //, CALL_ID_ALL
                + " ) VALUES ( "
               + "'"+ "1" + "',"
               + "'"+ userID +"',"   //AGENT_ID
               + "'" +ActiveDn +"',"   // AGENT_DN
               + "'" + _cubeProxy.Proxy.prototype.getActiveCall(ActiveDn) +"'," // CALL_ID
               + "'" + $("#content").val() +"',"  //DESCRIPT
               + "'" + answerDate() +"',"   //START_TIME
               + "'"+ userID +"',"   //REG_AGENTID
               + "10," //TENANT_ID
               + getcalltype() +","  //CALL_TYPE
               + "1,'1',1,"   //CATEGORY 
               + "16,"
               + "1" //GROUP_ID  -> CM_ID + TENNAT_ID
                + ")";
        return query;

  };


      ViewMainChatViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewMain] :: ViewMainChatViewModel : onInit");
         this._setObservableInit(nxBlock);
      };


      ViewMainChatViewModel.prototype.chatsaveReady = function() {
        console.log("[ViewMainChatViewModel] :: ViewMainChatViewModel : saveReady");

        _useQuery = this.insertConsultQuery();

        getData(function(result, error, param){
            console.log("result {}" , result);

            if ( result != null) {
                _cubeProxy.prototype.changeAgentStatus("ready",userID,ActiveDn);
            }
        } );

        // if (_newCustFlag==0)  { // 신규고객 

        //     _useQuery = insertNewCustomerQuery();
            
        //     getData(function(result, error, param){
        //         console.log("result {}" , result);

        //         if ( result != null) {
        //             _cubeProxy.prototype.changeAgentStatus("notready",userID,userDN);
        //         }
        //     } );
        // }

        // this.customerFieldInital();
        $("#content").val('');

      };


      var msgform = (function (){

        var _userid = "";
        var _time = "";
        var _identity = "";
        var _lastoption = "";
    
            function IsAttach(info, time) {
    
                if (_userid != info["id"]) {
    
                    _userid = info["id"];
                    _lastoption = info["option"];
    
                    return false;
    
                } else if (_lastoption != info["option"]) {
                    _lastoption = info["option"];
                    return false;
                }
    
                if (_time != time) {
                    _time = time;
                    console.log("time:" + _time + "," + time);
                    return false;
                }
    
                return true;
            }
            
            /* id정보 추가 attach */
            function AttachUserInfo(info) {
    
                var szid = "";
                var tagimg = "";
                var tagid = $('<li></li>').attr('class', _identity + '-id');
    
                if (_identity === 'me') {
                    szid = $('<div><div>').text(info["option"]);
                    $(szid).appendTo($(tagid));
                } else {
                    szid = $('<div><div>').text(info["id"]);
                    // tagimg = $('<img></img>').attr('src', 'img/face.png');
                    $(szid).appendTo($(tagid));
                    // $(tagimg).appendTo($(tagid));
                }
                $(tagid).appendTo($(".chat-box"));
            }
    
            /* 시간 출력 함수 */
            function conver12H(time) {
                var label = ['am', 'pm'];
                var timeRegExFormat = /^([0-9]{1,2}):([0-9]{1,2})$/; // ^ 입력값 시작, [] 괄호 안의 모든 문자, {n} 번 반복, $ 입력값 끝
                var timetoken = time.match(timeRegExFormat);
    
                if (typeof timeRegExFormat === undefined) {
                    return null;
                }
    
                var intHours = parseInt(timetoken[1]);
                var intMinutes = parseInt(timetoken[2]);
                console.log(intHours);
                console.log(intMinutes);
                var szHours12H = ('0' + (intHours == 12 ? 12 : intHours % 12)).slice(-2);
    
                var szMinute = ('0' + intMinutes).slice(-2);
    
                return label[parseInt(intHours / 12)] + ' ' + szHours12H + ':' + szMinute;
            }
    
            
    
            return {
           

            show: function (info, message, time) {
                
                
                var tagmsg;
                var tagtime;
                var cvtime;
                var lastchild;

                // if (activeChatDn=="2011")  {
                    lastchild = $(".chat-box").children().last();
                // } else {
                //     lastchild = $(".cb2").children().last();
                // } 
               
                lastchild = $(".chat-box").children().last();


                if (info["id"] == "") {
                    _identity = 'me';
                } else {
                    _identity = 'other';
                }

                if (IsAttach(info, time)) {
                    lastchild.remove();
                    tagmsg = $('<li></li>').attr('class', _identity + '-normal');
                    tagtime = $('<li></li>').attr('class', _identity + '-normal time');

                } else {

                    AttachUserInfo(info);
                    tagmsg = $('<li></li>').attr('class', _identity);
                    tagtime = $('<li></li>').attr('class', _identity + '-normal time');
                }
               

                // if (activeChatDn=="2011")  {

                    cvtime = conver12H(time);
                    $(tagmsg).text(message).appendTo($(".chat-box"));

                    $(tagtime).text(cvtime).appendTo($(".chat-box"));
                    $("#content").scrollTop($("#content")[0].scrollHeight);
                // } else {
                //     cvtime = conver12H(time);
                //     $(tagmsg).text(message).appendTo($(".cb2"));

                //     $(tagtime).text(cvtime).appendTo($(".cb2"));
                //     $("#content").scrollTop($("#content")[0].scrollHeight);

                // } 




            }


    
        }
    
        })();


        ViewMainChatViewModel.prototype.insertConsultQuery= function() {
            var query="";

            var type1 = $("#type1 option:selected").val();
            var type2 = $("#type2 option:selected").val();
            var type3 = $("#type3 option:selected").val();

            
            query = " INSERT INTO COUNSELING_DATA ( "
                    + " CAMPAIGN_CODE, "
                    //+ " CUSTOMER_IDX, " 
                    + " AGENT_ID, "
                    + " AGENT_DN, "
                    // + " CALL_FLAG, " 
                    // + " CALL_NUM, " 
                    // + " CATEGORY_IDX, "
                    + " CALL_ID, "
                    + " DESCRIPT, " 
                    + " START_TIME, "
                    // + " END_TIME, " 
                     + " REG_AGENTID, "  
                    // + " CENTER_ID, "
                     + " TENANT_ID, "
                     + " CALL_TYPE, "
                    // + " category1, "
                    // + " category2, "
                    // + " category3, "
                    + type1 +","
                    + type2 +","
                    + type3 +","
                    + " CUBE_CALL_KIND , "
                     + " GROUP_ID "
                    //, CALL_ID_ALL
                    + " ) VALUES ( "
                   + "'"+ "1" + "',"
                   + "'"+ userID +"',"   //AGENT_ID
                   + "'" +ActiveDn +"',"   // AGENT_DN
                   + "'" + _cubeProxy.Proxy.prototype.getActiveCall(ActiveDn) +"'," // CALL_ID
                   + "'" + $("#content").val() +"',"  //DESCRIPT
                   + "'" + answerDate() +"',"   //START_TIME
                   + "'"+ userID +"',"   //REG_AGENTID
                   + "10," //TENANT_ID
                   + getcalltype() +","  //CALL_TYPE
                   + "1,'1',1,"   //CATEGORY 
                   + "16,"
                   + "1" //GROUP_ID  -> CM_ID + TENNAT_ID
                    + ")";
            return query;

      };

      var answerDate = function () {

        return _answerTime.substr(0,4) + "-" + _answerTime.substr(4,2) +  "-" + _answerTime.substr(6,2)
        + " " + _answerTime.substr(8,2) +":" + _answerTime.substr(10,2) +":" + _answerTime.substr(10,2);  

      };

      var getData = function(callback) {

        var fds= [];

        dbselector("agent", {
            //url : "/cairo/caching/master/agent", 
            url : "/cairo/selector/master/agent",
            params : {
               fields: fds,
               query: _useQuery,//"SELECT IDX , ID, NAME, SEX,JUMIN,TEL,FAX,MOBILE,ZIPCODE,EMAIL, ADDRESS FROM counseling_customer"
            },
            onResult : function(result, error, param) {
               var parse = [];
               /**
                * ## parsing
                * - before
                * [{"nx.agent-3-1004":{"TENANT_ID":"10","GROUP_ID":"100","TEAM_ID":"101","AGENT_ID":"1004","AGENT_NAME":"1004"}}]
                * - after
                * [{"TENANT_ID":"10","GROUP_ID":"100","TEAM_ID":"101","AGENT_ID":"1004","AGENT_NAME":"1004"}]
                */
               if ( result !== null ) {
                  for( var idx=0; idx<result.output.length; idx++ ) {
                //   for( var idx=0; idx<result.length; idx++ ) {
                     /*parse.push(_.values(result[idx])[0]);*/
                     //parse.push(result[idx]);
                     parse.push(result.output[idx]);
                  }
               }

               callback(parse, error, param);
            },
            onResultParam : fds
         });

      };

        

          ViewMainChatViewModel.prototype.saveNotReady = function() {

            console.log("[ViewMainCallViewModel] :: ViewMainCallViewModel : saveNotReady");
    
            _useQuery = this.insertConsultQuery();
    
            getData(function(result, error, param){
                console.log("result {}" , result);
    
                if ( result != null) {
                    _cubeProxy.prototype.changeAgentStatus("notready",userID,userDN);
                }
            } );
    
            // if (_newCustFlag==0)  { // 신규고객 
    
            //     _useQuery = insertNewCustomerQuery();
                
            //     getData(function(result, error, param){
            //         console.log("result {}" , result);
    
            //         if ( result != null) {
            //             _cubeProxy.prototype.changeAgentStatus("notready",userID,userDN);
            //         }
            //     } );
            // }
    
            // this.customerFieldInital();
            $("#content").val('');
    
        };


    

        ViewMainChatViewModel.prototype.eventpush= function(obj) {
            var nowtime = new Date();
            var sztime = nowtime.getHours() + ":" + nowtime.getMinutes();
            

            if (_cubeProxy.Proxy.prototype.getActiveChatDnCheck(obj.this) == 1  ) {

            switch(obj.id) {
                case 4:
                    console.log("Delivered ..");
                    activeCid = String(obj.call.c1);

                    if ( obj.call.ctype == 1 ) {
                        msgform.show('', "Arrival Customer chat.", sztime);
                        _cubeProxy.Proxy.prototype.chatAnswer(obj.this,activeCid);
                    }

                    if (obj.call.called != obj.call.other) {
                        calledDn = String(obj.call.other);
                    }

                    break;

                case 6:
                    console.log("Established ..");

                    if ( obj.call.ctype == 1) {
                        _cubeProxy.Proxy.prototype.sendChatMsg("wchat/text", "Hello! May I help you?.",String(obj.this),calledDn,activeCid);
                    }

                    ActiveDn = String(obj.this);
                    _answerTime = obj.ftime;

                    break;
                case 3:
                    var nowtime = new Date();
                    var sztime = nowtime.getHours() + ":" + nowtime.getMinutes();
                   
                    console.log(obj.call.c1);
                    
                    if (obj.call.ctype == 1) {

                    }
                    msgform.show('', "Chatting End.", sztime);

                    ActiveDn = String(obj.this);

                    break;

                case 30:
                    console.log("Msg: ");

                    activeChatDn = obj.this;

                    /*채팅창 옆에 붙여 보여줄 id 옵션*/
                    var agentInfo = {
                        "id": "",
                        "option": "To: " + obj.call.third
                    };
                    var userInfo;
                    if (obj.call.other == "guest") {
                        userInfo = {
                            "id": obj.call.other + "- customer",
                            "option": ""
                        };
                    } else {
                        userInfo = {
                            "id": obj.call.other + "- agent",
                            "option": ""
                        };
                    }
                    var blind = _cubeProxy.Proxy.prototype.BASE64decode(obj.attach.contents);


                    if (obj.call.other != obj.this) {

                        // msgform.show(userInfo, filterWords(Base64.decode(obj.attach.containers)), sztime);
                        msgform.show(userInfo, blind, sztime);
                        //들어온 메세지
                    } else if (obj.call.other == obj.this) {

                        msgform.show(agentInfo, blind, sztime);

                    }

                    break;


                }
            }


        };

    

    

    ViewMainChatViewModel.prototype.sendMsg = function () {
        console.log("" + $("#chat_txt").val());
		if ($("#chat_txt").val() == "")
			return false;
        _cubeProxy.Proxy.prototype.sendChatMsg("wchat/text", $("#chat_txt").val());
		$("#chat_txt").val("");
    }

      ViewMainChatViewModel.prototype._setObservableInit = function( nxBlock ) {
         var define = nxBlock.get("define"),
             field = nxBlock.get("field"),
             components = nxBlock.get("components");

         for ( var idx=0; idx<define.length; idx++ ) {
            var type = define[idx].type,
                domID = define[idx].domID,
                model = define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(define[idx].title);
               options = model.getOptions(field);
            }

            // componentVM = nxcomponent.onInit(type, domID, options);

            if ( componentVM ) {
               components[domID] = {
                  type      : type,
                  model     : model,
                  viewModel : componentVM,
                  pushHandle: null
               };

              
             this._setObservableData(domID, model, componentVM);
            }
         }
      };
    
      ViewMainChatViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };

    


      return {
         viewModel: ViewMainChatViewModel,
         domID: "nx-contents-main"
        //  domID: "nx-contents-interactionchat-main" 
      };
   }
);
