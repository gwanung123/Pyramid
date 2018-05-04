'use strict';

define(["./models/model.kendo.buttonGroup", "kendo.all.min"],
   function( model ) {

      function KendoButtonGroup( tag, domID, options ) {
         console.log("[KendoButtonGroup] :: ButtonGroup : load");

         if ( options === null ) {
            console.log("[KendoButtonGroup] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoButtonGroup parameter
         this.param = this.model.makeOption(domID, options);
         this.param.select = this.onSelect;

         if ( this.param === null ) {
            console.log("[KendoButtonGroup] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom empty
         this.location = $("#" + domID);

         //ButtonGroup
         this.buttonGroup = this.location.kendoButtonGroup(this.param).data("kendoButtonGroup");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      /*
      KendoButtonGroup.prototype.onDestroy = function() {
         var self = this;
      };

      KendoButtonGroup.prototype.getData = function( type ) {
         var self = this;
      };

      KendoButtonGroup.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoButtonGroup.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };
      */

      KendoButtonGroup.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onSelect = function( e ) {
            console.log("[KendoButtonGroup] :: buttonGroup : onSelect");
            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, e.node, self, domID);
            if ( nexus.onSelect !== undefined ) {
               var len = nexus.onSelect.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onSelect[i];
                  cb.callback(self.TAG, e.node, self, cb.callbackParam);
               }
            }
         };

      };

      KendoButtonGroup.prototype.doMethods = function() {
         var self = this;
      };

      return KendoButtonGroup;
   }
);