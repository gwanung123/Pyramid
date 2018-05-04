'use strict';

define(["nxredis"],
   function() {

      /************************************************************
       * name        : interaction.caching
       * url         : Library/interaction.caching.js
       * description :
       ************************************************************/

      var _caching = function() {
         return this;
      };

      /****************************************************************************
      {
         url : "/cairo/caching/master/agent",
         params : {
            fields : []
         },
         onResult : function(result, error, param) {
            _log.log(message);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      _caching.prototype.onCaching = function( action, target, params ) {
         console.log("[caching] action: " + action + " target: " + target);

         $.nexus({
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

      _caching.prototype.readAgent = function( params ) {
         this.onCaching("read", "agent", params);
      };

      _caching.prototype.readDn = function( params ) {
         this.onCaching("read", "dn", params);
      };

      _caching.prototype.readRoute = function( params ) {
         this.onCaching("read", "route", params);
      };


      return function( name, params ) {
         var caching = new _caching();

         switch ( name ) {
            case "center": caching.readCenter(params); break;
            case "tenant": caching.readTenant(params); break;
            case "group" : caching.readGroup(params);  break;
            case "team"  : caching.readTeam(params);   break;
            case "agent" : caching.readAgent(params);  break;
            case "dn"    : caching.readDn(params);     break;
            case "route" : caching.readRoute(params);  break;
         }
      };

   }
);


