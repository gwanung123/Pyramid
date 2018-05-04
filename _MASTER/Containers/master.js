'use strict';

(function () {

   requirejs.config({
      baseUrl: "../",
      config: {},
      paths: {
         "jquery": "../Libpack/jquery/jquery-3.3.1.min",
         "knockout": "../Libpack/knockout/knockout-3.4.2",
         "sammy": "../Libpack/sammy/sammy-0.7.6.min",
         "text": "../Libpack/require_text/text",
         "kendo.all.min": "../Libpack/kendo/js/kendo.all.min",

         "nxerror"  : "../Error/error",
         "nexus"    : "../Libpack/nexus/nexus",
         "nxredis"  : "../Libpack/nexus/nexus.redis",
         "nxdbms"   : "../Libpack/nexus/nexus.dbms",
         "nxws"     : "../Libpack/nexus/nexus.ws",

         "nxdefine" : "master.define",
         "nxbinder" : "master.binder",
         "nxrouter" : "master.router",
         "nxmonitor": "master.monitor"
      },
      shim: {
         "kendo.all.min": {
            deps: ["jquery"]
         },
         "nexus": {
            deps: ["jquery"]
         },
         "nxredis": {
            deps: ["nexus"]
         },
         "nxdbms": {
            deps: ["nexus"]
         },
         "nxws": {
            deps: ["nexus"]
         }
      },
   });

   require([
      "nxbinder",
      "nxmonitor",
      "nxrouter",
      "Defines/dbms.define",
      "Library/master.block",
      "Containers/sub/containers",
      "Components/components",
      "nexus"
   ],
   function(
      _BINDER,
      _MONITOR,
      _ROUTER,
      _DBMS,
      _BLOCK,
      _Containers,
      _Components
   ) {

      var init = function() {
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

         var nexus_dbms = $.nexus({
            core : "nxapi",
            nxapi : {
               config : {
                  kind : "jwt"
               },
               params : {
                  key : "dbms"
               }
            }
         });

         var nxBlock = new _BLOCK.block().set({
            nexus : nexus_signin,
            dbms : _DBMS(nexus_dbms)
         });

         //append container
         _BINDER.appendHTMLs(_Containers.viewModels);

         //container vm bind
         for ( var prop in _Containers.containersVMs ) {
            _BINDER.bind(_Containers.containersVMs[prop], { _block: nxBlock });
         }

         //websocket
         _ROUTER.run(nxBlock, new _MONITOR());
      };

      var main = function () {
         console.log("[master] :: main : start");
         init();
      };

      //=====================================================================
      //    Master Start
      //=====================================================================
      main();

   });

})();
