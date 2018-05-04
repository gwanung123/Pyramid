'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               info: undefined,
               bind: undefined,
               items: undefined,
               join: {},
            },
            url    : "/cairo/caching/stats/agent",
            items  : undefined,
            fields : undefined
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /**
       * - parsed
       * [{"TENANT_ID":"10","GROUP_ID":"200","TEAM_ID":"2001",…}]
       */
      Grid.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Grid.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;
         var nx = self.options.nexus.info;

         _caching({
            url : options.url,
            params : {
               fields : options.fields,
               tenant : nx.tenantId.toString()
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  callback.onResult(null, error, param);
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  callback.onResult(self.getData(output), null, param);
               }
               else {
                  callback.onResult(result, null, param);
               }
            },
            onResultParam : callback.onResultParam
         });
      };

      Grid.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.info = nexus;
         options.nexus.bind = text.BIND;

         options.fields = text.FIELDS;

         return self.options = options;
      };

      Grid.prototype.setNexusJoin = function( name, cb, cbParam ) {
         var self = this;
         var nexus = self.options.nexus;

         if ( nexus.join[name] === undefined ) {
            nexus.join[name] = [];
         }

         nexus.join[name].push({
            callback: cb,
            callbackParam: cbParam
         });
      };


      /************************************************************************************

       ************************************************************************************/
      return function( tag ) {
         return new Grid(tag);
      };

   }
);
