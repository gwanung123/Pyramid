'use strict';

define([],
   function() {

      var KendoDatePicker = function() {
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

      var ptt = KendoDatePicker.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     dateInput : true,
       *     value : new Date(),
       *     disableDates : ["Su"],
       *     format : "yyyy-MM-dd",
       *     max : new Date(2020, 0, 1),
       *     min : new Date(2010, 0, 1),
       *     change : function() {
       *        var value = this.value();
       *        console.log(value);
       *     }
       * };
       *
       ******************************************************/

       ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "dateInput":
               param.dateInput = value;
               break;

            case "value":
               param.value = value;
               break;

            case "disableDates":
               param.disableDates = value;
               break;

            case "format":
               param.format = value;
               break;

            case "max":
               param.max = value;
               break;

            case "min":
               param.min = value;
               break;
         }

         return param;
      };

      ptt.makeOption = function( domID, options ) {
         var self = this;
         var param = {};

         for ( var prop in options ) {
            param = self.setOption(options, prop, param);
         }

         return param;
      };

      /******************************************************
       *
       * ~ input
       *
       * ~ output
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

      /********************************************************
       *
       */
      ptt.makeData = function( data ) {
         var self = this;

         self.makeDataSet("AS_IS", data);

         self.makeDataSet("TO_BE", data);

         return data;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoDatePicker;

   }
);
