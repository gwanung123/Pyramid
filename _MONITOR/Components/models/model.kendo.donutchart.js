'use strict';

define(["../../Library/monitor.calc"],
   function( _calc ) {

      var KendoDonutchart = function() {
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

      var ptt = KendoDonutchart.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     data: [],
       *     title: "",
       *     legend: "",
       *     labels: "#= category # - #= kendo.format('{0:P}', percentage)#",
       *     series: [{
       *         type: "donut",
       *         field: "percentage",
       *         categoryField: "item"
       *     }],
       *     tooltip: "#= category # - #= kendo.format('{0:P}', percentage) #"
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

            case "labels":
               param.seriesDefaults = {
                  labels: {
                     template: value,
                     position: "outsideEnd",
                     visible: true,
                     background: "transparent"
                  }
               }
               break;

            case "tooltip":
               param.tooltip = {
                  visible: true,
                  template: value
               }
               break;

            case "animation":
               param.transitions = value;
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
       *    { item: "Waiting", percentage:30 },
       *    { item: "Answer", percentage:30 },
       *    { item: "Fail", percentage:30 },
       *    { item: "Etc", percentage:10 }
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

      /****************************************************
       *
       * ~ AS_IS
       * {
       *   ABANDON:"0",
       *   CALLBACK:"0",
       *   DISTRIBUTE:"0",
       *   ENTER:"0",
       *   EXTENAL:"0",
       *   FAIL_CALL:"0",
       *   NONSERVICE:"0",
       *   TRANSFER:"0",
       *   WAIT_NO:"0"
       * }
       *
       ****************************************************/
      ptt.doCalculation = function( data, calc ) {
         var isExist = false;

         for( var key in data ) {
            var val = data[key]*1;
            var regex = new RegExp("@="+key, "g");
            calc = calc.replace(regex, val);
            isExist = true;
         }

         return ( isExist === true )? _calc(calc):0;
      };

      ptt.makeData = function( arrData, bind, param ) {
         var self = this;
         var clone = $.extend(true, {}, bind);
         var data = arrData[0],
             parsed = [],
             mod = 100;

         self.makeDataSet("AS_IS", data);

         for ( var item in clone ) {
            var val = clone[item];
            var obj = {};

            obj.item = item;
            obj.percentage = self.doCalculation(data, val);

            parsed.push(obj);

            mod -= obj.percentage;
         }

         parsed.push({ item: "Etc", percentage: mod });

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      ptt.makeDataDefault = function( bind, param ) {
         var self = this;
         var parsed = [];

         parsed.push({ item: "Etc", percentage: 100 });

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoDonutchart;

   }
);
