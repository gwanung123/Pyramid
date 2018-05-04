'use strict';

define([
   "knockout",
   "models.signin",
   "error",
   "nexus"
],
function( ko, SigninModel, errorDefine ) {

   function onSignIn( model, password ) {
      /**
      - password 암호화를 할 경우

      $.nexus({
         plugin : "cipher",
         cipher : {
            config : {
               kind : "base64",
               action : "encode",
            },
            data : password,
            callback : request
         }
      });
      */

      /* 인증 요청 */
      request(model, password);
   };

   /**
    * 서버로 인증 요청
    */
   function request( model, password ) {
      console.log("[encode] password: " + password);

      //request
      $.nexus({
         core : "auth",
         auth : {
            config : {
               main : {
                  hosts : model.getMainHosts(),
                  url : "/Views/intro.html",
                  isReadyUrl : "/cairo/isReady"
               },
               push : {
                  hosts : model.getPushHosts(),
                  url : "/cairo/stats/route",
                  isReadyUrl : "/cairo/isReady"
               },
               auth : {
                  hosts : model.getAuthHosts(),
                  url : "/cairo/auth",
                  isReadyUrl : "/cairo/isReady"
               },
               log : {
                  hosts : model.getLogHosts(),
                  url : "/cairo/log",
                  isReadyUrl : "/cairo/isReady"
               }
            },
            params : {
               id : model.getUserId(),
               password : password
            },
            onResult : response,
            onResultParam : model
         }
      });
   };

   /**
    * 서버로부터 인증 응답
    */
   function response( result, error, param ) {
      if ( error !== null ) {
         displayPopup(error.reason, error.description);
         return;
      }

      var reason = result.reason*1;

      if ( reason === 1 ) {
         var result = localStorageHandle(param.getSiginInfo());
         // intro 페이지 전환
         location.href = "Views/intro.html";
      }
      else {
         var error = errorDefine;
         for ( var prop in error ) {
            var fail = error[prop];
            if ( fail["errno"] === reason ) {
               var result = "";
               result += "["+fail.level+"] ";
               if ( fail.desc !== undefined ) result+=fail.desc;
               result+="<br />"+fail.solve;
            }
         }
         displayPopup(reason, result);
      }
   };

   /**
    * localStorage의 정보를 get/set
    */
   function localStorageHandle( signinInfo ) {
      if ( signinInfo === null ) {
         /**
          * GET
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

         // 20180503 Jesse #23794
         if(nexus_signin !== "undefined" && nexus_signin !== null)
         {
            if(nexus_signin.autoSignin === false)
            {
               nexus_signin.userId = "";
            }
         }
         

         return (nexus_signin === "undefined" || nexus_signin === null)? {}:nexus_signin;
      }

      /**
       * SET
       * 로그인 정보를 저장(localStorage)
       */
      $.nexus({
         core : "nxapi",
         nxapi : {
            config : {
               kind : "localStorage",
               action : "set"
            },
            params : {
               key : "nexus_signin",
               val : signinInfo
            }
         }
      });
   };

   /**
    * 로그인 날짜
    */
   function loginDate() {
      var str = "";
      var date = new Date();
      var utcDate = date.toUTCString();
      var arr = utcDate.split(" ");

      for ( var i=0; i<4; i++ ) {
         str += " " + arr[i];
      }
      return str;
   };

   /************************************************************************
    * CSS
    ************************************************************************/
   function displayIcon( dom, kind ) {
      $("span#icon").remove();
      if ( $("#errorwrap").length > 0 || $("#successwrap").length > 0 ) dom.unwrap();

      switch ( kind ) {
         case "error":
            dom.wrap("<div class='form-group has-error has-feedback' id='errorwrap'></div>");
            dom.after("<span class='glyphicon glyphicon-remove form-control-feedback' id='icon'></span>");
            dom.css("color", "#a94442");
            break;

         case "success":
            dom.wrap("<div class='form-group has-success has-feedback'id='successwrap'></div>");
            dom.after("<span class='glyphicon glyphicon-ok form-control-feedback' id='icon'></span>");
            dom.css("color", "#666666");
            break;
      }
   };

   function displayPopup( reason, result ) {
      var modalOptions = {
         keyboard: true,
         show    : true
      };

      var modal = $("#errorModal");

      // 20180419 Jesse -
      // modal.find(".text-danger").text("로그인 실패 (" + reason + ")"); 
      //modal.find(".modal-body").html("<p>"+result+"</p>");
      modal.find(".text-danger").text("로그인 실패");
      modal.find(".modal-body").html("<p>"+result.description+"</p>");
      modal.modal(modalOptions);
   };
   /************************************************************************
    * CSS
    ************************************************************************/




   /***********************************************************************************
    *
    * viewModel
    *
    **********************************************************************************/
   return function SignInVM() {
      var self = this;
      var saved;

      /**
       * 로그인 정보를 읽어옴(localStorage)
       */
      self._saved = (function() {
         saved = localStorageHandle(null);

            if (saved.autoSignin === undefined ) {
            saved.autoSignin = false;
            saved.userId = "";
            saved.mainHosts = [];
            saved.pushHosts = [];
            saved.authHosts = [];
            saved.logHosts = [];
            localStorageHandle(saved);
         }
      })
     ();

      ///////////////////////////////////////////////////////////
      //
      // Option Modal Dialog
      //
      ///////////////////////////////////////////////////////////

      /**
       * [ko] main-hosts setting
       * gateway-service 의 http 정보
       */
      self.mainHosts = ko.observableArray(saved.mainHosts);
      self.mainHost_host = ko.observable("");
      self.mainHost_port = ko.observable("");
      self.mainHost_selected = ko.observable();

      self.mainHost_fill = function() {
         var selected = self.mainHost_selected();

         if ( selected ) {
            var arr = selected.split(":");
            self.mainHost_host(arr[0]);
            self.mainHost_port(arr[1]);
         }
      };

      self.mainHost_add = function() {
         var mainHosts = self.mainHosts(),
             host = self.mainHost_host() + ":" + self.mainHost_port();

         if ( self.mainHost_host().length <= 0 || self.mainHost_port().length <= 0 ) return;

         if ( mainHosts.indexOf(host) < 0 ) {
            self.mainHosts.push(host);
         }

         self.mainHost_host("");
         self.mainHost_port("");
      };

      self.mainHost_del = function() {
         var mainHosts = self.mainHosts(),
             host = self.mainHost_host() + ":" + self.mainHost_port(),
             index = mainHosts.indexOf(host);;

         if ( self.mainHost_host().length <= 0 || self.mainHost_port().length <= 0 ) return;

         if ( index >= 0 ) {
            mainHosts.splice(index, 1);
            self.mainHosts(mainHosts);
         }

         self.mainHost_host("");
         self.mainHost_port("");
      };

      /**
       * [ko] push-hosts setting
       * gateway-service 의 websocket 정보
       */
      self.pushHosts = ko.observableArray(saved.pushHosts);
      self.pushHost_host = ko.observable("");
      self.pushHost_port = ko.observable("");
      self.pushHost_selected = ko.observable();

      self.pushHost_fill = function() {
         var selected = self.pushHost_selected();

         if ( selected ) {
            var arr = selected.split(":");
            self.pushHost_host(arr[0]);
            self.pushHost_port(arr[1]);
         }
      };

      self.pushHost_add = function() {
         var pushHosts = self.pushHosts(),
             host = self.pushHost_host() + ":" + self.pushHost_port();

         if ( self.pushHost_host().length <= 0 || self.pushHost_port().length <= 0 ) return;

         if ( pushHosts.indexOf(host) < 0 ) {
            self.pushHosts.push(host);
         }

         self.pushHost_host("");
         self.pushHost_port("");
      };

      self.pushHost_del = function() {
         var pushHosts = self.pushHosts(),
             host = self.pushHost_host() + ":" + self.pushHost_port(),
             index = pushHosts.indexOf(host);;

         if ( self.pushHost_host().length <= 0 || self.pushHost_port().length <= 0 ) return;

         if ( index >= 0 ) {
            pushHosts.splice(index, 1);
            self.pushHosts(pushHosts);
         }

         self.pushHost_host("");
         self.pushHost_port("");
      };

      /**
       * [ko] auth-hosts setting
       * auth-service 의 http/https 정보
       */
      self.authHosts = ko.observableArray(saved.authHosts);
      self.authHost_host = ko.observable("");
      self.authHost_port = ko.observable("");
      self.authHost_selected = ko.observable();

      self.authHost_fill = function() {
         var selected = self.authHost_selected();

         if ( selected ) {
            var arr = selected.split(":");
            self.authHost_host(arr[0]);
            self.authHost_port(arr[1]);
         }
      };

      self.authHost_add = function() {
         var authHosts = self.authHosts(),
             host = self.authHost_host() + ":" + self.authHost_port();

         if ( self.authHost_host().length <= 0 || self.authHost_port().length <= 0 ) return;

         if ( authHosts.indexOf(host) < 0 ) {
            self.authHosts.push(host);
         }

         self.authHost_host("");
         self.authHost_port("");
      };

      self.authHost_del = function() {
         var authHosts = self.authHosts(),
             host = self.authHost_host() + ":" + self.authHost_port(),
             index = authHosts.indexOf(host);;

         if ( self.authHost_host().length <= 0 || self.authHost_port().length <= 0 ) return;

         if ( index >= 0 ) {
            authHosts.splice(index, 1);
            self.authHosts(authHosts);
         }

         self.authHost_host("");
         self.authHost_port("");
      };

      /**
       * [ko] log-hosts setting
       * log-service 의 http 정보 (미개발)
       */
      self.logHosts = ko.observableArray(saved.logHosts);
      self.logHost_host = ko.observable("");
      self.logHost_port = ko.observable("");
      self.logHost_selected = ko.observable();

      self.logHost_fill = function() {
         var selected = self.logHost_selected();

         if ( selected ) {
            var arr = selected.split(":");
            self.logHost_host(arr[0]);
            self.logHost_port(arr[1]);
         }
      };

      self.logHost_add = function() {
         var logHosts = self.logHosts(),
             host = self.logHost_host() + ":" + self.logHost_port();

         if ( self.logHost_host().length <= 0 || self.logHost_port().length <= 0 ) return;

         if ( logHosts.indexOf(host) < 0 ) {
            self.logHosts.push(host);
         }

         self.logHost_host("");
         self.logHost_port("");
      };

      self.logHost_del = function() {
         var logHosts = self.logHosts(),
             host = self.logHost_host() + ":" + self.logHost_port(),
             index = logHosts.indexOf(host);;

         if ( self.logHost_host().length <= 0 || self.logHost_port().length <= 0 ) return;

         if ( index >= 0 ) {
            logHosts.splice(index, 1);
            self.logHosts(logHosts);
         }

         self.logHost_host("");
         self.logHost_port("");
      };

      /**
       * 저장 버튼
       */
      self.option_save = function() {
         var saved = localStorageHandle(null);
         saved.mainHosts = self.mainHosts();
         saved.pushHosts = self.pushHosts();
         saved.authHosts = self.authHosts();
         saved.logHosts = self.logHosts();
         localStorageHandle(saved);

         if(confirm("저장하시겠습니까?")){
             console.log("save changes");
             $("#opt_wrap").fadeOut();
         }
         else{
             return;
         }
      };

      ///////////////////////////////////////////////////////////
      //
      //
      //
      ///////////////////////////////////////////////////////////


      /**
       * [ko] observable
       */
      self.date = ko.observable(loginDate());
      self.userid = ko.observable(saved.userId);
      self.password = ko.observable();
      self.autosignin = ko.observable(saved.autoSignin);

      /**
       * [ko] computed
       * userId 유효성 검사
       */
      self._validation = ko.computed(function() {
         var patternBlank =  /\s/g;
         var userid = self.userid();

         var blank = userid.match(patternBlank);
         var unLen = userid.length

         if ( unLen === 0 ) return;

         if ( blank || unLen > 10 ) {
             displayIcon($("#userid"), "error");
         }
         else {
             displayIcon($("#userid"), "success");
         }
      });

      /**
       * 로그인 버튼
       */
      self.submit = function() {
         var userId = self.userid(),
             password = self.password(),
             autoSignin = self.autosignin(),
             mainHosts = self.mainHosts(),
             pushHosts = self.pushHosts(),
             authHosts = self.authHosts(),
             logHosts = self.logHosts();

         if ( mainHosts.length === 0 || authHosts.length === 0 ) {
            displayPopup(-1, "옵션을 설정 하세요.");
            return;
         }

         if ( userId === undefined || userId.length === 0 ) {
            displayIcon($("#userid"), "error");
            return;
         }

         if ( password === undefined || password.length === 0 ) {
            displayIcon($("#password"), "error");
            return;
         }

         // 로그인 요청
         onSignIn(new SigninModel({
            userId : userId,
            autoSignin : autoSignin,
            mainHosts : mainHosts,
            pushHosts : pushHosts,
            authHosts : authHosts,
            logHosts : logHosts
         }), password);
      };
   };

});

