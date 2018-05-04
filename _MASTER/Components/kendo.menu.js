'use strict';

define(["./models/model.kendo.menu", "kendo.all.min"],
   function( model ) {

      function KendoMenu( tag, domID, options ) {
         console.log("[KendoMenu] :: Menu : load");

         if ( options === null ) {
            console.log("[KendoMenu] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoMenu parameter
         this.param = this.model.makeOption(domID, options);
         this.param.select = this.onSelect;

         if ( this.param === null ) {
            console.log("[KendoMenu] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom
         this.location = $("#" + domID);

         //menu
         this.menu = this.location.kendoMenu(this.param).data("kendoMenu");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMenu.prototype.onDestroy = function() {
         var self = this;
         self.menu.destroy();
      };

      KendoMenu.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMenu.prototype.setData = function( data, param ) {
         var self = this;
         var finalData = self.model.makeData(data);
         self.doAppend(finalData);
      };

      KendoMenu.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoMenu.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onSelect = function( e ) {
            console.log("[KendoMenu] :: Menu : onSelect");
            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, e.item, self);
            if ( nexus.onSelect !== undefined ) {
               var len = nexus.onSelect.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onSelect[i];
                  cb.callback(self.TAG, e.item, self);
               }
            }
         };

      };

      KendoMenu.prototype.doMethods = function() {
         var self = this;

         self.doAppend = function( items ) {
            self.menu.append(items);
         };

         self.doRemove = function( cssClass ) {
            self.menu.remove("." + cssClass);
         };

      };

      return KendoMenu;
   }
);