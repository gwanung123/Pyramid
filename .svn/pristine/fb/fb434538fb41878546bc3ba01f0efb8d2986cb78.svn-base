'use strict';

define(["./models/model.kendo.multiSelect", "kendo.all.min"],
   function( model ) {

      function KendoMultiSelect( tag, domID, options ) {
         console.log("[KendoMultiSelect] :: MultiSelect : load");

         if ( options === null ) {
            console.log("[KendoMultiSelect] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoMultiSelect parameter
         this.param = this.model.makeOption(options);
         this.param.select = this.onSelect;
         this.param.deselect = this.onDeselect;

         if ( this.param === null ) {
            console.log("[KendoMultiSelect] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //MultiSelect
         this.multiSelect = this.location.kendoMultiSelect(this.param).data("kendoMultiSelect");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMultiSelect.prototype.onDestroy = function() {
         var self = this;
         self.multiSelect.destroy();
      };

      KendoMultiSelect.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMultiSelect.prototype.setData = function( data, param ) {
         var self = this;
         var finalData = self.model.makeData(data, self.param.dataTextField, param);

         self.multiSelect.dataSource.data(finalData);
      };

      KendoMultiSelect.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoMultiSelect.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onSelect = function( e ) {
            console.log("[KendoMultiSelect] :: MultiSelect : onSelect");
            var old = self.getItems(),
                items = $.extend(true, [], old),
                now = {};

            now[self.param.dataTextField] = e.item.text();
            items.push(now);

            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, items, self);
            if ( nexus.onSelect !== undefined ) {
               var len = nexus.onSelect.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onSelect[i];
                  cb.callback(self.TAG, items, self, cb.callbackParam);
               }
            }
         };

         self.onDeselect = function( e ) {
            console.log("[KendoMultiSelect] :: MultiSelect : onDeselect");
            var field = self.param.dataTextField,
                old = self.getItems(),
                len = old.length,
                items = [];

            for ( var i=0; i<len; i++ ) {
               var data = old[i],
                   val = data[field],
                   obj = {};

               if ( val === e.item.text() ) continue;

               obj[field] = val;
               items.push(obj);
            }

            if ( options.onDeselect !== undefined ) options.onDeselect(self.TAG, items, self);
            if ( nexus.onDeselect !== undefined ) {
               var len = nexus.onDeselect.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDeselect[i];
                  cb.callback(self.TAG, items, self, cb.callbackParam);
               }
            }
         };
      };

      KendoMultiSelect.prototype.doMethods = function() {
         var self = this;

         self.getItems = function( item ) {
            return self.multiSelect.dataItems();
         };

         self.getText = function( item ) {
            return item.text();
         };
      };

      return KendoMultiSelect;
   }
);