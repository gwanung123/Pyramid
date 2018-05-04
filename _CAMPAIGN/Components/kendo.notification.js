'use strict';

define(["./models/model.kendo.notification", "kendo.all.min"],
   function( model ) {

      function KendoNotification( tag, domID, options ) {
         console.log("[KendoNotification] :: Notification : load");

         if ( options === null ) {
            console.log("[KendoNotification] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(options);

         //KendoNotification parameter
         this.param = this.model.makeOption(options);
         this.param.show = this.onShow;
         this.param.hide = this.onHide;

         if ( this.param === null ) {
            console.log("[KendoNotification] :: error > invalid options");
            return null;
         }

         //dom empty
         this.meDomID = domID + "-notification";
         $("#" + domID).append("<span id="+ this.meDomID + ' style="display:none;"></span>');

         this.location = $("#" + this.meDomID);
         this.location.empty();

         //notification
         this.notification = this.location.kendoNotification(this.param).data("kendoNotification");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /*
      KendoNotification.prototype.getData = function( type ) {
         var self = this;
      };

      KendoNotification.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoNotification.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };
      */

      KendoNotification.prototype.setEvents = function( options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onShow = function( e ) {
            console.log("[KendoNotification] :: Notification : onShow");

            if ( self.param.position === undefined ) {
               if (e.sender.getNotifications().length == 1) {
                  var element = e.element.parent(),
                      eWidth = element.width(),
                      eHeight = element.height(),
                      wWidth = $(window).width(),
                      wHeight = $(window).height(),
                      newTop, newLeft;

                  newLeft = Math.floor(wWidth / 2 - eWidth / 2);
                  newTop = Math.floor(wHeight / 2 - eHeight / 2);

                  e.element.parent().css({top: newTop, left: newLeft});
               }
            }

            if ( options.onShow !== undefined ) options.onShow(self.TAG, e, self);
            if ( nexus.onShow !== undefined ) {
               var len = nexus.onShow.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onShow[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onHide = function( e ) {
            console.log("[KendoNotification] :: Notification : onHide");
            if ( options.onHide !== undefined ) options.onHide(self.TAG, e, self);
            if ( nexus.onHide !== undefined ) {
               var len = nexus.onHide.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onHide[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };
      };

      KendoNotification.prototype.doMethods = function() {
         var self = this;

         self.doShow = function( option, action ) {
            self.notification.show(option, action);
         };

         self.doInfo = function( title, message ) {
            self.doShow({ title: title, message: message }, "info");
         };

         self.doError = function( title, code, message ) {
            self.doShow({ title: title, code: code, message: message }, "error");
         };

         self.doSuccess = function( title, message ) {
            self.doShow({ title: title, message: message }, "success");
         };
      };

      return KendoNotification;
   }
);