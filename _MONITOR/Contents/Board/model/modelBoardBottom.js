'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * BARCHART
       *********************************************************************************/
      var Barchart = function( tag ) {
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
            series: [],
            categoryAxis: {},
            valueAxis: [],
            animation: false
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      Barchart.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Barchart.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      /******************************************************
       * ~ AS-IS
       * [
       *    { key: "[G] In Bound - Agents", val: "10" },
       *    { key: "[G] In Bound - Count", val: "3" },
       *    { key: "[G] In Bound - Time", val: "00:00:00" },
       * ]
       *
       * ~ TO-BE
       * {
       *    "GROUP_IB_AGENTS":"10",
       *    "GROUP_IB_COUNT":"3",
       *    "GROUP_IB_TIME":"00:00:00",
       * }
       ******************************************************/
      Barchart.prototype.makeSourceData = function( bind, data ) {
         var self = this;
         var dataLen = data.length,
             parsed = {};

         for ( var i=0; i<dataLen; i++ ) {
            var row = data[i];

            for ( var key in bind ) {
               if ( row.key !== key ) continue;
               parsed[bind[key]] = row.val;
               break;
            }
         }

         return parsed;
      };

      Barchart.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.bind = text.BIND;

         options.title = text.TITLE;
         options.legend = "bottom";
         options.series = [
            {
               type: "column",
               field: "inAgents",
               name: "Inbound Agents",
               axis: "inAgentsAxis"
            },
            {
               type: "column",
               field: "inCount",
               name: "Inbound Count",
               axis: "inCountAxis"
            },
            {
               type: "column",
               field: "outAgents",
               name: "Outbound Agents",
               axis: "outAgentsAxis"
            },
            {
               type: "column",
               field: "outCount",
               name: "Outbound Count",
               axis: "outCountAxis"
            }
         ];
         options.categoryAxis = {
            field: "depth",
            axisCrossingValue: [0, 0, 10, 10]
         };
         options.valueAxis = [
            {
               name: "inAgentsAxis",
               title: { text: "Inbound, Agents" },
               min: 0,
               max: 50,
               color: "#ff6800"
            },
            {
               name: "inCountAxis",
               title: { text: "Inbound, Count" },
               min: 0,
               max: 50,
               color: "#a0a700"
            },
            {
               name: "outAgentsAxis",
               title: { text: "Outbound, Agents" },
               min: 0,
               max: 50,
               color: "#ff8d00"
            },
            {
               name: "outCountAxis",
               title: { text: "Outbound, Count" },
               min: 0,
               max: 50,
               color: "#212529"
            }
         ];

         return self.options = options;
      };

      Barchart.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
            case "BARCHART": return new Barchart(tag);
         }
         return null;
      };

   }
);
