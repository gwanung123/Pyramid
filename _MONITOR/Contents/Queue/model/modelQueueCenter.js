'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * QUEUE_STATS
       *********************************************************************************/
      var QueueStats = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            url    : "/cairo/caching/stats/route",
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
      QueueStats.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];
         var sum = data[0].DATA;

         for ( var idx=1; idx<dataLen; idx++ ) {
            var row = data[idx].DATA;

            for ( var key in sum ) {
               sum[key] = parseInt(sum[key]);
               row[key] = parseInt(row[key]);
               sum[key] += row[key];
            }
         }

         parsed.push(sum);

         return parsed;
      };

      QueueStats.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      QueueStats.prototype.setItems = function( data ) {
         var self = this;
         var len = data.length;
         var items = [];

         for ( var i=0; i<len; i++ ) {
            items.push(data[i].item);
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

         options.fields = text.FIELDS;

         options.nexus.bind = text.BIND;

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


      /*********************************************************************************
       * DONUTCHART
       *********************************************************************************/
      var QueueStatsChart = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            data: [],
            title: "",
            legend: "",
            labels: "",
            series: [],
            tooltip: "",
            animation: false
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      QueueStatsChart.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      QueueStatsChart.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      /******************************************************
       * ~ AS-IS
       * [
       *    { key: "Waiting", val: "10" },
       *    { key: "Answer", val: "3" },
       *    { key: "Fail", val: "1" },
       * ]
       *
       * ~ TO-BE
       * [
       *    { item: "Waiting", percentage:30 },
       *    { item: "Answer", percentage:30 },
       *    { item: "Fail", percentage:30 },
       *    { item: "Etc", percentage:10 }
       * ]
       ******************************************************/
      QueueStatsChart.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.bind = text.BIND;

         options.title = text.TITLE;
         options.legend = "bottom";
         options.series = [
            {
               type: "donut",
               field: "percentage",
               categoryField: "item"
            }
         ];
         options.labels = "#= category # - #= kendo.format('{0:P}', percentage)#";
         options.tooltip = "#= category # - #= kendo.format('{0:P}', percentage) #";

         return self.options = options;
      };

      QueueStatsChart.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
            case "QUEUE_STATS": return new QueueStats(tag);
            case "DONUTCHART" : return new QueueStatsChart(tag);
         }
         return null;
      };

   }
);
