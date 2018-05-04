'use strict';

define(["./models/model.kendo.listBox", "kendo.all.min"],
   function( model ) {

      function KendoListBox( tag, domID, options ) {
         console.log("[KendoListBox] :: ListBox : load");

         if ( options === null ) {
            console.log("[KendoListBox] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoListBox parameter
         this.param = this.model.makeOption(options);
         this.param.add = this.onAdd;
         this.param.remove = this.onRemove;
         this.param.reorder = this.onReorder;

         if ( this.param === null ) {
            console.log("[KendoListBox] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //ListBox
         this.listBox = this.location.kendoListBox(this.param).data("kendoListBox");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoListBox.prototype.onDestroy = function() {
         var self = this;
         self.listBox.destroy();
      };

      KendoListBox.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoListBox.prototype.setData = function( data, param ) {
         var self = this;
         var nexus = self.nexus.join || {};
         var dataSource = new kendo.data.DataSource({
            data: self.model.makeData(data, self.nexus.bind, param)
         });

         self.listBox.setDataSource(dataSource);

         if ( nexus.setData !== undefined ) {
            var len = nexus.setData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setData[i];
               cb.callback(self.TAG, self.getData("AS_IS"), self, cb.callbackParam);
            }
         }
      };

      KendoListBox.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoListBox.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onAdd = function( e ) {
            console.log("[KendoListBox] :: ListBox : onAdd");
            if ( options.onAdd !== undefined ) options.onAdd(self.TAG, e, self);
            if ( nexus.onAdd !== undefined ) {
               var len = nexus.onAdd.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onAdd[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onRemove = function( e ) {
            console.log("[KendoListBox] :: ListBox : onRemove");
            if ( options.onRemove !== undefined ) options.onRemove(self.TAG, e, self);
            if ( nexus.onRemove !== undefined ) {
               var len = nexus.onRemove.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onRemove[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onReorder = function( e ) {
            console.log("[KendoListBox] :: ListBox : onReorder");
            if ( options.onReorder !== undefined ) options.onReorder(self.TAG, e, self);
            if ( nexus.onReorder !== undefined ) {
               var len = nexus.onReorder.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onReorder[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };
      };

      KendoListBox.prototype.doMethods = function() {
         var self = this;

         self.clearSelection = function() {
            return self.listBox.clearSelection();
         };

         self.dataItems = function() {
            return self.listBox.dataItems();
         };
      };

      return KendoListBox;
   }
);