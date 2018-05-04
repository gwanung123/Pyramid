'use strict';

define([],
   function() {

      var KendoTabstrip = function() {
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

      var ptt = KendoTabstrip.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     data: [],
       *     animation: {},
       *     scrollable: true,
       *     tabPosition: "bottom",  //"top" (default), "left", "right" and "bottom"
       *     dataTextField: "",
       *     dataContentField: "",
       *     dataSpriteCssClass: "",
       *     sortable: true,
       *     closable: true
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "data":
               param.dataSource = value;
               break;

            case "animation":
               param.animation = value;
               break;

            case "scrollable":
               param.scrollable = value;
               break;

            case "tabPosition":
               param.tabPosition = value;
               break;

            case "dataTextField":
               param.dataTextField = value;
               break;

            case "dataContentField":
               param.dataContentField = value;
               break;

            case "dataSpriteCssClass":
               param.dataSpriteCssClass = value;
               break;

            case "sortable":
               param.sortable = value;
               break;

            case "closable":
               param.closable = value;
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
      ptt.makeData = function( data, dataTextField, param ) {
         var self = this;
         var parsed = [];

         self.makeDataSet("AS_IS", data);

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoTabstrip;

   }
);
