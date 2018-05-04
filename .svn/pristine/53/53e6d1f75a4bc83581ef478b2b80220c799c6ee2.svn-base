'use strict';

define([],
   function() {

      var KendoMenu = function() {
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

      var ptt = KendoMenu.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     dataSource: [],
       *     orientation: "vertical",
       *     direction: "right",
       *     scrollable: true,
       *     openOnClick: { rootMenuItems: true }
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "dataSource":
               param.dataSource = value;
               break;

            case "orientation":
               param.orientation = value;
               break;

            case "direction":
               param.direction = value;
               break;

            case "scrollable":
               param.scrollable = value;
               break;

            case "openOnClick":
               param.openOnClick = value;
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
      return KendoMenu;

   }
);
