'use strict';

define(["./models/model.kendo.tooltip", "kendo.all.min"],
   function( model ) {

      function KendoTooltip( tag, domID, options ) {
         console.log("[KendoTooltip] :: Tooltip : load");

         if ( options === null ) {
            console.log("[KendoTooltip] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoTooltip parameter
         this.param = this.model.makeOption(options);
         this.param.show = this.onShow;
         this.param.hide = this.onHide;

         if ( this.param === null ) {
            console.log("[KendoTooltip] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //tooltip
         this.tooltip = this.location.kendoTooltip(this.param).data("kendoTooltip");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /*
      KendoTooltip.prototype.getData = function( type ) {
         var self = this;
      };

      KendoTooltip.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoTooltip.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };
      */

      KendoTooltip.prototype.setContent = function( content, param ) {
         var self = this;
         self.tooltip.content(content);
      };

      KendoTooltip.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onShow = function( e ) {
            console.log("[KendoTooltip] :: Tooltip : onShow");
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
            console.log("[KendoTooltip] :: Tooltip : onHide");
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

      KendoTooltip.prototype.doMethods = function() {
         var self = this;
      };

      return KendoTooltip;
   }
);