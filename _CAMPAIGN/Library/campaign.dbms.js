'use strict';

define(["nxdbms"],
   function() {

      /************************************************************
       * name        : campaign.dbms
       * url         : Library/campaign.dbms.js
       * description :
       ************************************************************/

      var _dbms = function() {};

      /****************************************************************************
      {
         url : "/cairo/selector/master/agent",
         params : {
            query : {},
            args : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _dbms.prototype.onSelect = function( param ) {
         console.log("[dbms] url: " + param.url);

         $.nexus({
            plugin : "dbms",
            dbms : {
               config : {
                  url : param.url,
                  action : "select"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };

      /****************************************************************************
      {
         url : "/cairo/admin/agent/insert",
         params : {
            query : [],
            args : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _dbms.prototype.onInsert = function( param ) {
         console.log("[dbms] url: " + param.url);

         $.nexus({
            plugin : "dbms",
            dbms : {
               config : {
                  url : param.url,
                  action : "insert"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };

      /****************************************************************************
      {
         url : "/cairo/admin/agent/update",
         params : {
            query : [],
            args : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _dbms.prototype.onUpdate = function( param ) {
         console.log("[dbms] url: " + param.url);

         $.nexus({
            plugin : "dbms",
            dbms : {
               config : {
                  url : param.url,
                  action : "update"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };

      /****************************************************************************
      {
         url : "/cairo/admin/agent/delete",
         params : {
            query : [],
            args : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _dbms.prototype.onDelete = function( param ) {
         console.log("[dbms] url: " + param.url);

         $.nexus({
            plugin : "dbms",
            dbms : {
               config : {
                  url : param.url,
                  action : "delete"
               },
               params : param.params,
               onResult : param.onResult,
               onResultParam : param.onResultParam
            }
         });
      };


      return function( param ) {
         var dbms = new _dbms(),
             urls = param.url.split("/");

         switch ( urls[4] ) {
            case "insert" : dbms.onInsert(param); break;
            case "update" : dbms.onUpdate(param); break;
            case "delete" : dbms.onDelete(param); break;
            default       : dbms.onSelect(param); break;
         }
      };

   }
);


