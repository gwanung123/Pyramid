'use strict';

define(["./models/model.kendo.window", "kendo.all.min"],
   function( model ) {

      function KendoWindow( tag, domID, options ) {
         console.log("[KendoWindow] :: Window : load");

         this._dragStartTop = 0;
         this._dragStartLeft = 0;

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
         this.param.maximize = this.onMaximize;
         this.param.minimize = this.onMinimize;
         //this.param.dragstart = this.onDragStart;
         //this.param.dragend = this.onDragEnd;

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

         self.onMaximize = function( e ) {
            console.log("[KendoWindow] :: Window : onMaximize");
            if ( options.onMaximize !== undefined ) options.onMaximize(self.TAG, e, self);
         };

         self.onMinimize = function( e ) {
            console.log("[KendoWindow] :: Window : onMinimize");
            if ( options.onMinimize !== undefined ) options.onMinimize(self.TAG, e, self);
         };

         self.onDragStart = function() {
            console.log("[KendoWindow] :: Window : onDragStart");
            var windowWrapper = self.window.wrapper,
                windowPosition = windowWrapper.offset();

            self._dragStartTop = windowPosition.top;
            self._dragStartLeft = windowPosition.left;

            if ( options.onDragStart !== undefined ) options.onDragStart(self.TAG, e, self);
         };

         self.onDragEnd = function() {
            console.log("[KendoWindow] :: Window : onDragEnd");
            var notMove = false;
            var container = self.param.container,
                containerPos = container.offset(),
                containerTop = containerPos.top,
                containerLeft = containerPos.left,
                containerWidth = container.width(),
                containerHeight = container.height();
            var window = self.window.wrapper,
                windowPos = window.offset(),
                top = windowPos.top,
                left = windowPos.left,
                width = window.width(),
                height = window.height();

            if ( top < 0 || left < 0 ) notMove = true;
            else if ( top < containerTop ) notMove = true;
            else if ( left < containerLeft ) notMove = true;
            else if ( top > containerHeight + containerTop - height ) notMove = true;
            else if ( left > containerWidth + containerLeft - width ) notMove = true;

            if ( notMove === true ) {
               self.setOptions({
                  position: {
                    top: self._dragStartTop,
                    left: self._dragStartLeft
                  }
               });
            }

            if ( options.onDragEnd !== undefined ) options.onDragEnd(self.TAG, e, self);
         };
      };

      KendoWindow.prototype.doMethods = function() {
         var self = this;

         self.progressOn = function() {
            kendo.ui.progress(self.window.element, true);
         };

         self.progressOff = function() {
            kendo.ui.progress(self.window.element, false);
         };

         self.content = function() {
            return self.window.content();
         };

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