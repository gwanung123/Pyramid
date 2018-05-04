'use strict';

define(["./models/model.kendo.window", "kendo.all.min"],
   function( model ) {

      function KendoWindow( tag, domID, options ) {
         console.log("[KendoWindow] :: Window : load");

         if ( options === null ) {
            console.log("[KendoWindow] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoWindow parameter
         this.param = this.model.makeOption(domID, options);
         this.param.open = this.onOpen;
         this.param.close = this.onClose;

         if ( this.param === null ) {
            console.log("[KendoWindow] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //window
         this.window = this.location.kendoWindow(this.param).data("kendoWindow");
         if ( this.param.content === undefined ) this.setContent(options.content);
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoWindow.prototype.onDestroy = function() {
         var self = this;
         self.window.destroy();
      };

      /*
      KendoWindow.prototype.getData = function( type ) {
         var self = this;
      };

      KendoWindow.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoWindow.prototype.setPushData = function( action, id, data ) {
         var self = this;
      };
      */

      KendoWindow.prototype.setContent = function( content, param ) {
         var self = this;
         self.window.content(content);
      };

      KendoWindow.prototype.setEvents = function( domID, options ) {
         var self = this;

         self.onOpen = function( e ) {
            console.log("[KendoWindow] :: window : onOpen");
            if ( options.onOpen !== undefined ) options.onOpen(self.TAG, e, self);
         };

         self.onClose = function( e ) {
            console.log("[KendoWindow] :: Window : onClose");
            if ( options.onClose !== undefined ) options.onClose(self.TAG, e, self);
         };
      };

      KendoWindow.prototype.doMethods = function() {
         var self = this;

         self.setOptions = function( option ) {
            self.window.setOptions(option);
         };

         self.doOpen = function() {
            self.window.open();
         };

         self.doClose = function() {
            self.window.close();
         };

         self.doMax = function() {
            self.window.maximize();
         };

         self.doMin = function() {
            self.window.minimize();
         };

         self.doCenter = function() {
            self.window.center();
         };

         self.doPin = function() {
            self.window.pin();
         };

         self.doUnPin = function() {
            self.window.unpin();
         };
      };

      return KendoWindow;
   }
);