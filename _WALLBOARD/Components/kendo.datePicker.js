'use strict';

define(["./models/model.kendo.datePicker", "kendo.all.min"],
   function( model ) {

      function KendoDatePicker( tag, domID, options ) {
         console.log("[KendoDatePicker] :: DatePicker : load");

         if ( options === null ) {
            options = {
               value : new Date(),
               format : "yyyy-MM-dd"
            }
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoDatePicker parameter
         this.param = this.model.makeOption(domID, options);
         this.param.change = this.onChange;

         if ( this.param === null ) {
            console.log("[KendoDatePicker] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //datePicker
         this.datePicker = this.location.kendoDatePicker(this.param).data("kendoDatePicker");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoDatePicker.prototype.onDestroy = function() {
         var self = this;
         self.datePicker.destroy();
      };

      KendoDatePicker.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoDatePicker.prototype.setData = function( data, param ) {
         var self = this;
         self.datePicker.value(data);
         self.datePicker.trigger("change");
      };

      KendoDatePicker.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoDatePicker.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onChange = function() {
            var date = self.datePicker.value();
            console.log("[KendoDatePicker] :: DatePicker : onChange => " + date);
            if ( options.onChange !== undefined ) options.onChange(self.TAG, date, self);
            if ( nexus.onChange !== undefined ) {
               var len = nexus.onChange.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onChange[i];
                  cb.callback(self.TAG, date, self, domID);
               }
            }
         };

      };

      KendoDatePicker.prototype.doMethods = function() {
         var self = this;
      };

      return KendoDatePicker;
   }
);