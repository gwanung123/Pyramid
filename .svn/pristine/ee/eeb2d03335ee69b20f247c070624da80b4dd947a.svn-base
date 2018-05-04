'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * AGENT_CHART
       *********************************************************************************/
      var AgentChart = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            url    : "/cairo/caching/stats/team",
            items  : undefined,
            fields : undefined
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /**
       * - data
       * [
       *    {
       *       "ACTION": "read",
       *       "CONTENT":"caching",
       *       "SERVICE":"agent",
       *       "ID":"6002",
       *       "DATA":{"TENANT_ID":"10","GROUP_ID":"200","TEAM_ID":"2001",…}
       *    }
       * ]
       *
       * - parsed
       * [{"TENANT_ID":"10","GROUP_ID":"200","TEAM_ID":"2001",…}]
       */
      AgentChart.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      AgentChart.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      AgentChart.prototype.requestData = function( options, callback ) {
         var self = this;

         _caching({
            url : options.url,
            params : {
               items : options.items,
               fields: options.fields
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

      AgentChart.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION),
             items = [];

         items.push(nexus.tenantId);

         options.items = items;
         options.fields = text.FIELDS;

         options.nexus.bind = text.BIND;
         options.nexus.items = items;

         return self.options = options;
      };

      AgentChart.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new AgentChart(tag);
      };

   }
);
