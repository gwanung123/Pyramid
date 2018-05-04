'use strict';

define([],
   function() {

      /************************************************************
       * name        : report.caching
       * url         : Library/report.caching.js
       * description :
       ************************************************************/

      var _dbselector = function() {
         return this;
      };

      /****************************************************************************
      {
         url : "/cairo/selector",
         params : {
            fields : []
            query : "select * from re_employeecall"
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _dbselector.prototype.onDbSelector = function( action, target, params ) {
         console.log("[dbselector] action: " + action + " target: " + target);

         $.nexus({
            /*plugin : "dbselect",*/
            plugin : "redis",
            redis : {
               config : {
                  url : params.url,
                  action : action,
                  target : target
               },
               params : params.params,
               onResult : params.onResult,
               onResultParam : params.onResultParam
            }
         });
      };

      /*
      _caching.prototype.readCenter = function( params ) {
         this.onCaching("read", "center", params);
      };

      _caching.prototype.readTenant = function( params ) {
         this.onCaching("read", "tenant", params);
      };

      _caching.prototype.readGroup = function( params ) {
         this.onCaching("read", "group", params);
      };

      _caching.prototype.readTeam = function( params ) {
         this.onCaching("read", "team", params);
      };
      */
      _dbselector.prototype.readAgent = function( params ) {
         this.onDbSelector("read", "agent", params);
      };
/*
      _caching.prototype.readDn = function( params ) {
         this.onCaching("read", "dn", params);
      };

      _caching.prototype.readRoute = function( params ) {
         this.onCaching("read", "route", params);
      };
*/

      return function( name, params ) {
         var dbselector = new _dbselector();

         
         switch ( name ) {
            /*case "center": dbselector.readCenter(params); break;
            case "tenant": dbselector.readTenant(params); break;
            case "group" : dbselector.readGroup(params);  break;
            case "team"  : dbselector.readTeam(params);   break;*/
            case "agent" : dbselector.readAgent(params);  break;
            /*case "dn"    : dbselector.readDn(params);     break;
            case "route" : dbselector.readRoute(params);  break;*/
         }
      };

   }
);


