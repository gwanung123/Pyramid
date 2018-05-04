'use strict';

define([],
   function() {

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
            animation: true
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

      Barchart.prototype.getOptions = function( text, dbms, myTag ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.bind = text[myTag].BIND;

         options.title = text[myTag].TITLE;
         options.legend = "bottom";
         options.series = text[myTag].SERIES;
         options.categoryAxis = text[myTag].CATEGORY;
         options.valueAxis = text[myTag].VALUE;
         options.tooltip = { visible: true };

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
         return new Barchart(tag);
      };

   }
);
