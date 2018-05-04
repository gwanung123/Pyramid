'use strict';

(function () {

   requirejs.config({
      baseUrl: "../../",
      config: {},
      paths: {
         "jquery": "../Libpack/jquery/jquery-3.3.1.min",
         "knockout": "../Libpack/knockout/knockout-3.4.2",
         "sammy": "../Libpack/sammy/sammy-0.7.6.min",
         "text": "../Libpack/require_text/text",
         "kendo.all.min": "../Libpack/kendo/js/kendo.all.min",

         "nexus": "../Libpack/nexus/nexus",
         "nxredis": "../Libpack/nexus/nexus.redis",
         "nxdbms"   : "../Libpack/nexus/nexus.dbms",

         "nxdefine": "wallboard.define",
         "nxbinder": "wallboard.binder",
         "nxrouter": "Contents/contents.router"
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
         }
      },
   });

   require([
      "nxrouter"
   ],
   function(
      router
   ) {

      var init = function() {
         router.run();
      };

      var main = function () {
         console.log("[contents] :: main : start");
         init();
      };

      //=====================================================================
      //    Management Start
      //=====================================================================
      main();

   });

})();
