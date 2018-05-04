'use strict';

define([],
   function() {

      var KendoNotification = function() {
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

      var ptt = KendoNotification.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     autoHideAfter: 0,
       *     appendTo: "#container",
       *     position: {},
       *     stacking: "down"
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "autoHideAfter":
               param.autoHideAfter = value;
               break;

            case "appendTo":
               param.appendTo = value;
               break;

            case "position":
               param.position = value;
               break;

            case "stacking":
               param.stacking = value;
               break;
         }

         return param;
      };

      ptt.makeOption = function( options ) {
         var self = this;
         var param = {
            autoHideAfter: 0,
            stacking: "down",
            templates: [
               {
                  type: "info",
                  template: '<div class="nx-notify-info">' +
                            '<img src="../../Styles/img/kendo-notify-info-icon.png" />' +
                            '<h3>#= title #</h3>' +
                            '<p>#= message #</p>' +
                            '</div>'

               },
               {
                  type: "error",
                  template: '<div class="nx-notify-error">' +
                            '<img src="../../Styles/img/kendo-notify-error-icon.png" />' +
                            '<h3>#= title #</h3>' +
                            '<p>[CODE]: #= code #</p>' +
                            '<p>#= message #</p>' +
                            '</div>'
               },
               {
                  type: "success",
                  template: '<div class="nx-notify-success">' +
                            '<img src="../../Styles/img/kendo-notify-success-icon.png" />' +
                            '<h3>#= title #</h3>' +
                            '<p>#= message #</p>' +
                            '</div>'
               }
            ]
         };

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
      return KendoNotification;

   }
);
