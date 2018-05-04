'use strict';

define(["knockout", 
        "../../Library/interaction.nxproxy",
        "../../Defines/field.define", "nexus"],
   function( ko, nxproxy, field ) {

      var loginTime = function( prefix ) {
         var curDateTime = new Date();

         // 20180423 Jesse #22917
         var curTime = leadingZero(curDateTime.getHours()) + ":" +
                        leadingZero(curDateTime.getMinutes()) + ":" +
                        leadingZero(curDateTime.getSeconds());

         return ( prefix )? prefix+" "+curTime:curTime;
      };

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

     // 20180423 Jesse #22917
     function leadingZero(n){
        var zero = '';
        n = n.toString();
      
        if (n.length < 2) {
            zero += '0';
        }
        return zero + n;
     }

     var userDn = null;
      

      function headerViewModel() {

        this.nxFieldHeaderLogin1 = ko.observable(field.CONTENTS.INTERACTION.HEADER.LOGIN.SELECT_LOGON);
        this.nxFieldHeaderLogin2 = ko.observable(field.CONTENTS.INTERACTION.HEADER.LOGIN.SELECT_READY);
        this.nxFieldHeaderLogin3 = ko.observable(field.CONTENTS.INTERACTION.HEADER.LOGIN.SELECT_NOTREADY);
        this.nxFieldHeaderLogin4 = ko.observable(field.CONTENTS.INTERACTION.HEADER.LOGIN.SELECT_ACW);
        this.nxFieldHeaderLogin5 = ko.observable(field.CONTENTS.INTERACTION.HEADER.LOGIN.SELECT_LOGOUT);

        // this.nxFieldHeaderStats1 = ko.observable(field.CONTENTS.INTERACTION.HEADER.STATS.TEXT_CALL_HELP);
        // this.nxFieldHeaderStats2 = ko.observable(field.CONTENTS.INTERACTION.HEADER.STATS.TEXT_MAIL_HELP);
        // this.nxFieldHeaderStats3 = ko.observable(field.CONTENTS.INTERACTION.HEADER.STATS.TEXT_CHAT_HELP);

        userDn = $.nexus({
            core : "nxapi",
            nxapi : {
               config : {
                  kind : "jwt"
               },
               params : {
                  key : "cccdn"
               }
            }
         });
       
         if (userDn ==="") {
            userDn = nexus_signin.userId;
         }


   
         var userID = nexus_signin.userId || "anonymous";
            //  userDN = nexus_signin.userDn || "DN Number";


         this.nxLoginTime = ko.observable(loginTime("[" + userDn + "]"));
         this.nxUserID = ko.observable(userID);

        // userDN = nexus_signin.userId ; //일단 임시 
        // nexus_signin.userDn =userDN;

        var cubeProxy = nxproxy
      
        cubeProxy.Proxy.prototype.addViewModel(this);
        

        $("#select_login").on("change", function(){
            
            console.log($("#select_login option:selected").val())
            var selListV = $("#select_login option:selected").val();

            if ( selListV == "logon") {
                cubeProxy.Proxy.prototype.changeAgentStatus("logon",nexus_signin.userId,userDn);
                // cubeProxy.Proxy.prototype.changeAgentStatus("logon","1011","1011");
            } else if (selListV =="ready") {
                cubeProxy.Proxy.prototype.changeAgentStatus("ready",nexus_signin.userId,userDn); 
                // cubeProxy.Proxy.prototype.changeAgentStatus("ready","1011","1011");
            } else if (selListV =="notready") {
                cubeProxy.Proxy.prototype.changeAgentStatus("notready",nexus_signin.userId,userDn); 
                // cubeProxy.Proxy.prototype.changeAgentStatus("notready","1011","1011"); 
            } else if (selListV =="acw") {
                cubeProxy.Proxy.prototype.changeAgentStatus("acw",nexus_signin.userId,userDn); 
                // cubeProxy.Proxy.prototype.changeAgentStatus("acw","1011","1011"); 
            } else if (selListV =="logout") {
                cubeProxy.Proxy.prototype.changeAgentStatus("afterwork",nexus_signin.userId,userDn); 
                // cubeProxy.Proxy.prototype.changeAgentStatus("logoff","1011","1011");
            }

          });

          /* Call 상태 변경 */

          $("#select_login_call").on("change", function(){
            
            console.log($("#select_login_call option:selected").val())
            var selListV = $("#select_login_call option:selected").val();

            if ( selListV == "logon") {
                cubeProxy.Proxy.prototype.changeAgentStatus("logon",nexus_signin.userId,userDn);
                
                // jesse
                if($("#select_login_call option").length == 2)
                {
                    $("#select_login_call").append("<option value='ready'>READY</option>");
                    $("#select_login_call").append("<option value='notready'>NOTREADY</option>");
                    $("#select_login_call").append("<option value='acw'>AFTER CALL WORK</option>"); // 20180423 Jesse #22970
                }
                
            } else if (selListV =="ready") {
                cubeProxy.Proxy.prototype.changeAgentStatus("ready",nexus_signin.userId,userDn); 
            } else if (selListV =="notready") {
                cubeProxy.Proxy.prototype.changeAgentStatus("notready",nexus_signin.userId,userDn); 
            } else if (selListV =="acw") {
                cubeProxy.Proxy.prototype.changeAgentStatus("afterwork",nexus_signin.userId,userDn); 
            } else if (selListV =="logout") {
                cubeProxy.Proxy.prototype.changeAgentStatus("logoff",nexus_signin.userId,userDn); 
            
                 // jesse
                 if($("#select_login_call option").length == 5)
                 {
                    for(var i = 0; i < 3; i++)
                    {
                       $("#select_login_call option:last").remove();
                    }
                 }
            }

          });


          /* 메일 상태 변경 */
          $("#select_login_mail").on("change", function(){
            
            console.log($("#select_login_mail option:selected").val())
            var selListV = $("#select_login_mail option:selected").val();

            if ( selListV == "mlogon") {
                cubeProxy.Proxy.prototype.changeAgentStatusMail("logon");
                 // jesse
                 if($("#select_login_call option").length == 2)
                 {
                     $("#select_login_mail").append("<option value='ready'>READY</option>");
                     $("#select_login_mail").append("<option value='notready'>NOTREADY</option>");
                     $("#select_login_mail").append("<option value='acw'>AFTER CALL WORK</option>"); // 20180423 Jesse #22970
                 }
            } else if (selListV =="mready") {
                cubeProxy.Proxy.prototype.changeAgentStatusMail("ready"); 
            } else if (selListV =="mnotready") {
                cubeProxy.Proxy.prototype.changeAgentStatusMail("notready"); 
            } else if (selListV =="macw") {
                cubeProxy.Proxy.prototype.changeAgentStatusMail("acw"); 
            } else if (selListV =="mlogout") {
                cubeProxy.Proxy.prototype.changeAgentStatusMail("logoff"); 

                 // jesse
                 if($("#select_login_call option").length == 5)
                 {
                    for(var i = 0; i < 3; i++)
                    {
                       $("#select_login_mail option:last").remove();
                    }
                 }
            }

          });

          /* 채팅 상태 변경 */
          $("#select_login_chat").on("change", function(){
            
            console.log($("#select_login_chat option:selected").val())
            var selListV = $("#select_login_chat option:selected").val();

            if ( selListV == "clogon") {
                cubeProxy.Proxy.prototype.changeAgentStatusChat("logon");
                 // jesse
                 if($("#select_login_call option").length == 2)
                 {
                     $("#select_login_chat").append("<option value='ready'>READY</option>");
                     $("#select_login_chat").append("<option value='notready'>NOTREADY</option>");
                     $("#select_login_chat").append("<option value='acw'>AFTER CALL WORK</option>"); 
                 }
            } else if (selListV =="cready") {
                cubeProxy.Proxy.prototype.changeAgentStatusChat("ready"); 
            } else if (selListV =="cnotready") {
                cubeProxy.Proxy.prototype.changeAgentStatusChat("notready"); 
            } else if (selListV =="cacw") {
                cubeProxy.Proxy.prototype.changeAgentStatusChat("acw"); 
            } else if (selListV =="clogout") {
                cubeProxy.Proxy.prototype.changeAgentStatusChat("logoff"); 

                 // jesse
                 if($("#select_login_chat option").length == 5)
                 {
                    for(var i = 0; i < 3; i++)
                    {
                       $("#select_login_chat option:last").remove();
                    }
                 }
            }

          });

        
      };

      headerViewModel.prototype.eventpush= function(obj) {
        //console.log("#recv:" + obj.data);

        if (obj.this == userDn) {

            switch (obj.id) {
                case 201:
                    $("#select_login").val("logon");
                    break;
                case 202:
                    $("#select_login").val("logout");
                    break;
                case 203:
                    $("#select_login").val("notready");
                    break;
                case 204:
                    $("#select_login").val("ready");
                    break;
                case 206:
                    $("#select_login").val("acw");
                    break;

            }
            
        }

    };


      return {
         viewModel: headerViewModel,
         domID: "nx-header"
      };
   }

);