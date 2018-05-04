'use strict';

define([],
   function() {

      var KendoQueueStats = function() {
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

      var ptt = KendoQueueStats.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     url: "",
       *     items: [],
       *     fields: []
       * };
       *
       ******************************************************/

      ptt.makeOption = function( options ) {
         return options;
      };

      /******************************************************
       *
       * ~ input
       * [{"TENANT_ID":"10","GROUP_ID":"100",...}]
       *
       * ~ output
       * [{key:"tenant id", val:"1"}, {key:"group id", val:"1"}]
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

      ptt.makeData = function( arrData, bind, param ) {
         var self = this;
         var data = arrData[0] || [];
         var parsed = [];

         self.makeDataSet("AS_IS", arrData);

         for ( var key in bind ) {
            var valKeys = bind[key];
            var obj = {
               key: key,
               val: ""
            };

            if ( valKeys === "SERVICE_LEVEL" || valKeys === "ANSWER_RATE" ) {
               obj.val = (data[valKeys] || 0) + "%";
            }
            else {
               obj.val = data[valKeys] || 0;
            }

            parsed.push(obj);
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoQueueStats;

   }
);
