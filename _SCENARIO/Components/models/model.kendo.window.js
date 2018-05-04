'use strict';

define([],
   function() {

      var KendoWindow = function() {
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

      var ptt = KendoWindow.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     iframe: true,
       *     content: "",
       *     position: {},
       *     draggable: false,
       *     resizable: false,
       *     width: "600px",
       *     height: "",
       *     title: "",   //string or false
       *     action: [],   //"Pin", "Minimize", "Maximize", "Close",
       *     animation: {},
       *     visible: false,
       *     container: "nx-contents"
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "iframe":
               param.iframe = value;
               break;

            case "content":
               param.content = value;
               break;

            case "position":
               param.position = value;
               break;

            case "draggable":
               param.draggable = value;
               break;

            case "resizable":
               param.resizable = value;
               break;

            case "width":
               param.width = value;
               break;

            case "height":
               param.height = value;
               break;

            case "title":
               param.title = value;
               break;

            case "actions":
               param.actions = value;
               break;

            case "animation":
               param.animation = value;
               break;

            case "visible":
               param.visible = value;
               break;

            case "container":
               var container = $("#" + value),
                   containerWidth = container.width(),
                   containerHeight = container.height();

               param.container = container;
               //param.maxWidth = containerWidth;
               //param.maxHeight = containerHeight;
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

         if ( param.iframe === true ) {
            param.content = param.content + "?windowID=" + domID;
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
      return KendoWindow;

   }
);
