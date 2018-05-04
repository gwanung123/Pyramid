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

         "nxdefine" : "monitor.define",
         "nxbinder" : "monitor.binder",
         "nxrouter" : "monitor.router",
         "nxmonitor": "monitor.monitor"
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
      "Library/monitor.block",
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

         nexus_signin.tenantId = parseInt(
            $.nexus({
               core : "nxapi",
               nxapi : {
                  config : {
                     kind : "jwt"
                  },
                  params : {
                     key : "tenant"
                  }
               }
            })
         );

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

         var dbms = _DBMS(nexus_dbms, {
            EMPLOYEEPART_ID: nexus_signin.tenantId,
            DNSUB_ID: nexus_signin.tenantId
         });

         var nxBlock = new _BLOCK.block().set({
            nexus : nexus_signin,
            dbms : dbms
         });

         //append container
         _BINDER.appendHTMLs(_Containers.viewModels);

         var _spliterVM = _Components.onComponentLoad("MAIN", "KENDO.SPLITTER", "nx-contents-container", {
            nexus: { join: { "onExpand": [], "onCollapse": [] } },
            orientation: "vertical",
            panes: [
               { collapsible: true, size: "100%", min: "100%", max: "100%" },
               {}
            ]
         });

         //container vm bind
         for ( var prop in _Containers.containersVMs ) {
            _BINDER.bind(_Containers.containersVMs[prop], { _block: nxBlock, _spliter: _spliterVM });
         }

         //websocket
         _ROUTER.run(nxBlock, new _MONITOR(), _spliterVM);
      };

      var main = function () {
         console.log("[monitor] :: main : start");
         init();
      };

      //=====================================================================
      //    Monitor Start
      //=====================================================================
      main();

   });

})();
