'use strict';

define([],
   function() {

      var KendoBarchart = function() {
         /**
          * Variables
          */
         this.DATA = {
            AS_IS: undefined,
            TO_BE: undefined
         };
         this.isChangeFlag = false;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      var ptt = KendoBarchart.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     data: [],
       *     title: "",
       *     legend: "",
       *     series: [{
       *         type: "column",
       *         field: "inAgents",
       *         name: "Inbound Agents",
       *         axis: "inAgentsAxis",
       *         color: "#ec5e0a"
       *     }],
       *     categoryAxis: {
       *         field: "depth",
       *         axisCrossingValue: [0, 3]
       *     },
       *     valueAxis: [{
       *         name: "inAgentsAxis",
       *         title: {
       *            text: "Inbound, Agents"
       *         },
       *         color: "#ec5e0a"
       *     }],
       *     tooltip: {
       *        visible: true,
       *        template: "#= kendo.format('{0:HH:mm}', new Date(value)) #"
       *     }
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "data":
               param.dataSource.data = value;
               break;

            case "legend":
               param.legend = {
                  position : value
               };
               break;

            case "series":
               param.series = value;
               break;

            case "title":
               param.title = {
                  text : value
               };
               break;

            case "categoryAxis":
               param.categoryAxis = value;
               break;

            case "valueAxis":
               param.valueAxis = value;
               break;

            case "animation":
               param.transitions = value;
               break;

            case "tooltip":
               param.tooltip = value;
               break;
         }

         return param;
      };

      ptt.makeOption = function( options ) {
         var self = this;
         var param = {
            dataSource: {},
            renderAs: "canvas"
         };

         for ( var prop in options ) {
            param = self.setOption(options, prop, param);
         }

         return param;
      };

      /******************************************************
       *
       * Data Model
       *
       * [
       *    { depth: "GROUP", inAgents: 20, inCount: 45, outAgents: 10, outCount:30 },
       *    { depth: "TEAM", inAgents: 20, inCount: 45, outAgents: 10, outCount:30 },
       *    { depth: "AGENT", inAgents: 20, inCount: 45, outAgents: 10, outCount:30 }
       * ];
       *
       ******************************************************/

      ptt.makeDataGet = function( type ) {
         var self = this;
         if ( type === undefined ) return self.DATA;
         return self.DATA[type];
      };

      ptt.makeDataSet = function( type, data ) {
         var self = this;
         self.DATA[type] = $.extend(true, [], data);
      };

      ptt.makeDataIsChanged = function( bool ) {
         var self = this;
         if ( bool === undefined ) return self.isChangeFlag;
         self.isChangeFlag = bool;
      };

      ptt.getValue = function( data, type ) {
         var value;

         switch ( type ) {
            case "number":
               if ( typeof(data) === "boolean" ) {
                  value = ( data === true )? 1:0;
               }
               else {
                  value = parseInt(data);
               }
               break;

            case "time":
               if ( typeof(data) === "string" ) {
                  var arr = data.split(":");
                  value = (parseInt(arr[0]) * 3600) +
                          (parseInt(arr[1]) * 60) +
                          parseInt(arr[2]);
               }
               else {
                  value = data;
               }
               break;

            default:
               if ( data === undefined || data === null ) value = "";
               else value = data;
         }

         return value;
      };

      ptt.makeData = function( arrData, bind, param ) {
         var self = this;
         var parsed = [];

         self.makeDataSet("AS_IS", arrData);

         for ( var i=0; i<arrData.length; i++ ) {
            var data = arrData[i],
                obj = {};

            for ( var key in bind ) {
               var item = bind[key];
               obj[key] = self.getValue(data[item.field], item.type);
            }

            parsed.push(obj);
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoBarchart;

   }
);
