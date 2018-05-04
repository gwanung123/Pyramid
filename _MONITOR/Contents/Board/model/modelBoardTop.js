'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * AGENT_STATE
       *********************************************************************************/
      var AgentState = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
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
      AgentState.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      AgentState.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      AgentState.prototype.requestData = function( options, callback ) {
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

      AgentState.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION),
             items = [];

         items.push(nexus.userId);

         options.items = items;
         options.fields = text.FIELDS;

         options.nexus.bind = text.BIND;
         options.nexus.items = items;

         return self.options = options;
      };

      AgentState.prototype.setNexusJoin = function( name, cb, cbParam ) {
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



      /*********************************************************************************
       * AGENT_REPORT
       *********************************************************************************/
      var AgentReport = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
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
      AgentReport.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      AgentReport.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      AgentReport.prototype.requestData = function( options, callback ) {
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

      AgentReport.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION),
             items = [];

         items.push(nexus.userId);

         options.items = items;
         options.fields = text.FIELDS;

         options.nexus.bind = text.BIND;
         options.nexus.items = items;

         return self.options = options;
      };

      AgentReport.prototype.setNexusJoin = function( name, cb, cbParam ) {
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


      /*********************************************************************************
       * QUEUE_STATS
       *********************************************************************************/
      var QueueStats = function( tag ) {
         this.tag = tag;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               fields: undefined,
               join: {}
            },
            url    : "/cairo/caching/stats/route",
            items  : [],
            fields : undefined,
            select : {}
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
      QueueStats.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      QueueStats.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      QueueStats.prototype.getSelectData = function() {
         var self = this;
         var selectData = self.options.select.DATA,
             arrPath = selectData.split("."),
             shared = self.shared[arrPath[2]];

         return shared[arrPath[3]];
      };

      QueueStats.prototype.setItems = function( arrData ) {
         var self = this;
         var selectField = self.options.select.TEXT_FIELD,
             len = arrData.length,
             items = [];

         for ( var i=0; i<len; i++ ) {
            var data = arrData[i];
            items.push(data[selectField]);
         }

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      QueueStats.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      QueueStats.prototype.requestData = function( options, callback ) {
         var self = this;

         if ( options.items.length <= 0 ) return;

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

      QueueStats.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.select = text.SELECT;
         options.fields = text.FIELDS;
         options.parentModel = self;

         options.nexus.bind = text.BIND;
         options.nexus.items = options.items;
         options.nexus.fields = options.fields;

         return self.options = options;
      };

      QueueStats.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         switch ( tag ) {
            case "BOARD_AGENT_STATE": return new AgentState(tag);
            case "BOARD_AGENT_REPORT": return new AgentReport(tag);
            case "BOARD_QUEUE_STATS": return new QueueStats(tag);
         }
         return null;
      };

   }
);
