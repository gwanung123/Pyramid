'use strict';

define(["./models/model.kendo.spreadsheet", "kendo.all.min"],
   function( model ) {

      function KendoSpreadsheet( tag, domID, options ) {
         console.log("[KendoSpreadsheet] :: Spreadsheet : load");

         if ( options === null ) {
            console.log("[KendoSpreadsheet] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoSpreadsheet parameter
         this.param = this.model.makeOption(options);
         this.param.excelImport = options.onExcelImport;

         if ( this.param === null ) {
            console.log("[KendoSpreadsheet] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //Spreadsheet
         this.spreadsheet = this.location.kendoSpreadsheet(this.param).data("kendoSpreadsheet");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /*
      KendoSpreadsheet.prototype.getData = function( type ) {
         var self = this;
      };

      KendoSpreadsheet.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoSpreadsheet.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };
      */

      KendoSpreadsheet.prototype.setContent = function( content, param ) {
         var self = this;
         self.spreadsheet.content(content);
      };

      KendoSpreadsheet.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onExcelImport = function( e ) {
            console.log("[KendoSpreadsheet] :: Spreadsheet : onExcelImport");
            if ( options.onExcelImport !== undefined ) options.onExcelImport(self.TAG, e, self, domID);
         };

      };

      KendoSpreadsheet.prototype.doMethods = function() {
         var self = this;
      };

      return KendoSpreadsheet;
   }
);