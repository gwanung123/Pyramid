'use strict';

define(["knockout", "../../Defines/field.define", "nexus"],
   function( ko, field ) {

      var loginTime = function( prefix ) {
         var curDateTime = new Date();
         var curTime = curDateTime.getHours() + ":" +
                       curDateTime.getMinutes() + ":" +
                       curDateTime.getSeconds();

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

      var userID = nexus_signin.userId || "anonymous",
          userDN = nexus_signin.userDn || "DN Number";

      function headerViewModel() {

         this.nxFieldHeaderLogin1 = ko.observable(field.CONTENTS.REPORT_QUEUE.HEADER.LOGIN.SELECT_LOGON);
         this.nxFieldHeaderLogin2 = ko.observable(field.CONTENTS.REPORT_QUEUE.HEADER.LOGIN.SELECT_LOGOUT);
         this.nxFieldHeaderStats1 = ko.observable(field.CONTENTS.REPORT_QUEUE.HEADER.STATS.TEXT_CALL_HELP);
         this.nxFieldHeaderStats2 = ko.observable(field.CONTENTS.REPORT_QUEUE.HEADER.STATS.TEXT_MAIL_HELP);
         this.nxFieldHeaderStats3 = ko.observable(field.CONTENTS.REPORT_QUEUE.HEADER.STATS.TEXT_CHAT_HELP);

         this.nxLoginTime = ko.observable(loginTime("[" + userDN + "]"));
         this.nxUserID = ko.observable(userID);

        
      };


      return {
         viewModel: headerViewModel,
         domID: "nx-header"
      };
   }

);