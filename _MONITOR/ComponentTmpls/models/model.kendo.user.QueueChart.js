'use strict';

define(["../../Library/monitor.calc"],
   function( _calc ) {

      var KendoDonutchart = function() {
         /**
          * Variables
          */
         this.DATA = {
            AS_IS: [],
            TO_BE: []
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
      ptt.makeOption = function( options ) {
         var self = this;
         var param = {
            legend: {
               visible: false
            },
            series: [{
               type: "donut",
               field: "percentage",
               categoryField: "item",
               overlay: {
                  gradient: "none"
               },
            }],
            tooltip: {
               visible: true,
               template: "#= category # - #= kendo.format('{0:P}', percentage) #"
            },
            animation: false,
            renderAs: "canvas"
         };

         return param;
      };


      /******************************************************
       *
       * ~ input
       * [{"TENANT_ID":"10","AGENT_ID":"100",...}]
       *
       * ~ output
       * [{"AGENT":"100","NAME":"100",...}]
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

         parsed.push({ item: "ETC", percentage: mod });

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      ptt.makeDataDefault = function( bind, param ) {
         var self = this;
         var parsed = [];

         parsed.push({ item: "ETC", percentage: 100 });

         return parsed;
      };

      ptt.makeDataBottom = function( arrData, bind ) {
         var self = this;
         var data = arrData[0] || [];
         var parsed = [];

         for ( var key in bind ) {
            var valKey = bind[key];
            var obj = {
               key: key,
               val: data[key] || 0
            };

            parsed.push(obj);
         }

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoDonutchart;

   }
);
