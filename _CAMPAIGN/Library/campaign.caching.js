'use strict';

define(["nxredis"],
   function() {

      /************************************************************
       * name        : campaign.caching
       * url         : Library/campaign.caching.js
       * description :
       ************************************************************/

      var _caching = function() {};

      /****************************************************************************
      {
         url : "/cairo/caching/master/agent",
         params : {
            items : [],
            fields : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _caching.prototype.onRead = function( param ) {
         console.log("[caching] url: " + param.url);

         $.nexus({
            plugin : "redis",
            redis : {
               config : {
                  url : param.url,
                  action : "read"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };

      /****************************************************************************
      {
         url : "/cairo/cachingExe/agent/save",
         params : {
            item : "",
            values : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _caching.prototype.onWrite = function( param ) {
         console.log("[caching] url: " + param.url);

         $.nexus({
            plugin : "redis",
            redis : {
               config : {
                  url : param.url,
                  action : "save"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };

      /****************************************************************************
      {
         url : "/cairo/cachingExe/agent/remove",
         params : {
            item : "",
            fields : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _caching.prototype.onRemove = function( param ) {
         console.log("[caching] url: " + param.url);

         $.nexus({
            plugin : "redis",
            redis : {
               config : {
                  url : param.url,
                  action : "remove"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };


      return function( param ) {
         var caching = new _caching(),
             urls = param.url.split("/");

         switch ( urls[4] ) {
            case "save"   : caching.onWrite(param);  break;
            case "remove" : caching.onRemove(param); break;
            default       : caching.onRead(param);   break;
         }
      };

   }
);


