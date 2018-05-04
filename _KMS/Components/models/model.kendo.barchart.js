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
       *     }]
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
         }

         return param;
      };

      ptt.makeOption = function( options ) {
         var self = this;
         var param = {
            dataSource: {}
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
         self.DATA[type] = data;
      };

      ptt.makeDataIsChanged = function( bool ) {
         var self = this;
         if ( bool === undefined ) return self.isChangeFlag;
         self.isChangeFlag = bool;
      };

      ptt.makeData = function( arrData ) {
         var self = this;
         var parsed = [];

         parsed = arrData;

        //  var data = arrData[0],
        //      bindLen = 10,
        //      parsed = [];

        //  self.makeDataSet("AS_IS", data);

        //  for ( var i=0; i<bindLen; i++ ) {
        //     var row = bind[i],
        //         obj = {};

        //     for ( var key in row ) {
        //        var val = row[key];

        //        if ( val.indexOf("$=") >= 0 ) {
        //           var arrVal = val.split("$=");
        //           val = arrVal[1];
        //        }
        //        else {
        //           val = parseInt(data[val]);
        //        }

        //        obj[key] = val;
        //     }

        //     parsed.push(obj);
        //  }

        //  self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoBarchart;

   }
);
