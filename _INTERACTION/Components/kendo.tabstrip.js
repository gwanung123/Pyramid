'use strict';

define(["./models/model.kendo.tabstrip", "kendo.all.min"],
   function( model ) {

      function KendoTabstrip( tag, domID, options ) {
         console.log("[KendoTabstrip] :: TabStrip : load");

         if ( options === null ) {
            console.log("[KendoTabstrip] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoTabstrip parameter
         this.param = this.model.makeOption(domID, options);
         this.param.select = this.onSelect;

         if ( this.param === null ) {
            console.log("[KendoTabstrip] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //TabStrip
         this.tabstrip = this.location.kendoTabStrip(this.param).data("kendoTabStrip");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoTabstrip.prototype.onDestroy = function() {
         var self = this;
         self.tabstrip.destroy();
      };

      /*
      KendoTabstrip.prototype.getData = function( type ) {
         var self = this;
      };

      KendoTabstrip.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoTabstrip.prototype.setPushData = function( action, id, data ) {
         var self = this;
      };
      */

      KendoTabstrip.prototype.setEvents = function( domID, options ) {
         var self = this;

         self.onSelect = function( e ) {
            console.log("[KendoTabstrip] :: TabStrip : onSelect");
            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, e, self);
         };
      };

      KendoTabstrip.prototype.doMethods = function() {
         var self = this;
      };

      return KendoTabstrip;
   }
);