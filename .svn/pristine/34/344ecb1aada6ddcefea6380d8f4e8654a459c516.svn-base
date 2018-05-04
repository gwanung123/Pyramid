'use strict';

define([],
   function() {

      /************************************************************
       * name        : manage.monitoring
       * url         : Library/manage.monitoring.js
       * description :
       ************************************************************/

      var _monitoring = function() {};

      /****************************************************************************
      {
         url : "/cairo/monitor/stats/route",
         params : {
            items : [],
            fields : [],
            count: 2000
         },
         onOpen : function(param) {},
         onMessage : function(data, param) {},
         onError : function(error, param) {},
         onClose : function(param) {},
         onResult : function(result, error, param) {
            _log.log("websocket handle: " + result);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }

      {
         url : "/cairo/monitor/event",
         params : {
            services : []
         },
         onOpen : function(param) {},
         onMessage : function(data, param) {},
         onError : function(error, param) {},
         onClose : function(param) {},
         onResult : function(result, error, param) {
            _log.log("websocket handle: " + result);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _monitoring.prototype.onRegister = function( param ) {
         console.log("[monitoring] url: " + param.url);

         $.nexus({
            plugin : "ws",
            ws : {
               config : {
                  url : param.url
               },
               params : param.params,
               onOpen : param.onOpen,
               onMessage : param.onMessage,
               onError : param.onError,
               onClose : param.onClose,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };


      return function( param ) {
         var monitoring = new _monitoring();

         monitoring.onRegister(param);
      };

   }
);


