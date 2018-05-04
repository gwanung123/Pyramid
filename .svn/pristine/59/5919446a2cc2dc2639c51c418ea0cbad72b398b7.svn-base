'use strict';

define([
   "knockout",
   "nexus"
],
function( ko ) {

   /**
    * 저장되어있는 정보를 읽어옴
    */
   function getNexus( key ) {
      if ( key === "userId" ) {
         /**
          * 저장되어있는 로그인 정보를 읽어옴(localStorage)
          */
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

         return (nexus_signin === null)? undefined:nexus_signin[key];
      }
      else if ( key === "userDn" ) {
         /**
          * 저장되어있는 인증 정보를 읽어옴(sessionStorage)
          */
         var nexus_dn = $.nexus({
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

         return (nexus_dn === null)? undefined:nexus_dn;
      }
   };

   /**
    * 로그인 날짜
    */
   function today() {
      var str = "";
      var date = new Date();
      var utcDate = date.toUTCString();
      var arr = utcDate.split(" ");

      for ( var i=0; i<4; i++ ) {
         str += " " + arr[i];
      }
      return str;
   };




   /***********************************************************************************
    *
    * viewModel
    *
    **********************************************************************************/
   return function IntroVM( permit ) {
      var self = this;
      var userID = getNexus("userId") || "anonymous",
          userDN = getNexus("userDn") || "DN Number";

      /**
       * [ko] observable
       */
      self.nxUserID = ko.observable(userID);
      self.nxUserDN = ko.observable("[" + userDN + "]");
      self.nxUserTime = ko.observable(today());

      /* logout 버튼 */
      self.nxDoLogout = function() {
         console.log("[intro] :: introViewModel : DoLogout");
         $.nexus.core.nxapi.sessionStorage.clear(); //2018.04.30 eric 추가 
         location.href = "../../signin.html";
      };
   };

});

