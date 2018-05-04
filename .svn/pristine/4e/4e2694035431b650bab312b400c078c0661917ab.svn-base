'use strict';

define(["./models/model.kendo.datePicker", "kendo.all.min"],
   function( model ) {

      function DatePicker( tag, domID, options ) {
         console.log("[datePicker] :: DatePicker : load");
         var self = this;

         if ( options === null ) {
            options = {
               value : new Date(),
               format : "yyyy-MM-dd"
            }
         }

         //datePicker set and start
         self.location = $("#"+domID);
         self.location.empty();

         //kendoDatePicker parameter
         self.param = model(options);

         if ( self.param === null ) {
            console.log("[datePicker] :: error > invalid options");
            return null;
         }

         self.datePicker = self.location.kendoDatePicker(self.param).data("kendoDatePicker");

         return self;
      };

      DatePicker.prototype.empty = function() {
         console.log("[datePicker] :: DatePicker : empty");
         var self = this;
         return self;
      };

      DatePicker.prototype.destroy = function() {
         var self = this;
         self.datePicker.destroy();
      };

      DatePicker.prototype.getDate = function() {
         var self = this;
         //return self.datePicker.value();

        if (self.datePicker !=undefined) {
            var dateobj = kendo.parseDate(self.datePicker.value(), "yyyy-MM-dd ");
            var datestring = kendo.toString(dateobj, "yyyyMMdd ");
   
            return datestring;
        } else {
            return self.datePicker.value();
        }
        

         
      };

      


      DatePicker.prototype.setDate = function( date ) {
         var self = this;
         self.datePicker.value(date);
         self.datePicker.trigger("change");
      };


      return DatePicker;
   }
);