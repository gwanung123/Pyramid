'use strict';

define(["./models/model.kendo.contextMenu", "kendo.all.min"],
   function( model ) {

      function KendoContextMenu( tag, domID, options ) {
         console.log("[KendoContextMenu] :: ContextMenu : load");

         if ( options === null ) {
            console.log("[KendoContextMenu] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoContextMenu parameter
         this.param = this.model.makeOption(domID, options);
         this.param.select = this.onSelect;

         if ( this.param === null ) {
            console.log("[KendoContextMenu] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom
         this.location = $("#" + domID);

         //contextMenu
         this.contextMenu = this.location.kendoContextMenu(this.param).data("kendoContextMenu");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoContextMenu.prototype.onDestroy = function() {
         var self = this;
         self.contextMenu.destroy();
      };

      KendoContextMenu.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoContextMenu.prototype.setData = function( data, param ) {
         var self = this;
         var finalData = self.model.makeData(data);
         self.doAppend(finalData);
      };

      KendoContextMenu.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoContextMenu.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onSelect = function( e ) {
            console.log("[KendoContextMenu] :: ContextMenu : onSelect");
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

      KendoContextMenu.prototype.doMethods = function() {
         var self = this;

         self.doAppend = function( items ) {
            self.contextMenu.append(items);
         };

         self.doRemove = function( cssClass ) {
            self.contextMenu.remove("." + cssClass);
         };

      };

      return KendoContextMenu;
   }
);