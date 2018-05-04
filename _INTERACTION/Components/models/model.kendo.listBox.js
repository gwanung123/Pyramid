'use strict';

define([],
   function() {

      var KendoListBox = function() {
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

      var ptt = KendoListBox.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     connectWith: "",
       *     toolbar: {},
       *     messages: {},
       *     data: [],
       *     dataTextField: "",
       *     dataValueField: "",
       *     selectable: false
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "connectWith":
               param.connectWith = value;
               break;

            case "toolbar":
               param.toolbar = value;
               break;

            case "messages":
               param.messages = value;
               break;

            case "data":
               param.dataSource = value;
               break;

            case "dataTextField":
               param.dataTextField = value;
               break;

            case "dataValueField":
               param.dataValueField = value;
               break;

            case "selectable":
               param.selectable = value;
               break;
         }

         return param;
      };

      ptt.makeOption = function( options ) {
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
         self.DATA[type] = data;
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
      return KendoListBox;

   }
);
