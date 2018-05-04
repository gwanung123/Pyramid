'use strict';

define([
      "./kendo.barchart",
      "./kendo.datePicker",
      "./kendo.grid",
      "./kendo.spreadsheet",
      "./kendo.treeview",
      "./kendo.window",
      "./kendo.tooltip",
      "./kendo.splitter",
      "./kendo.listBox",
      "./kendo.multiSelect",
      "./kendo.tabstrip",
      "./kendo.menu",
      "./kendo.notification"
   ],
   function(
      kendoBarchartVM,
      kendoDatePickerVM,
      kendoGridVM,
      kendoSpreadsheetVM,
      kendoTreeviewVM,
      kendoWindowVM,
      kendoTooltipVM,
      kendoSplitterVM,
      kendoListBoxVM,
      kendoMultiSelectVM,
      kendoTabstripVM,
      kendoMenuVM,
      kendoNotificationVM
   ) {

      /***********************************************************
       * name        : components
       * url         : Components/components.js
       * description :
       ***********************************************************/

      var componentsVMs = {
         kendoBarchart    : kendoBarchartVM,
         kendoDatePicker  : kendoDatePickerVM,
         kendoGrid        : kendoGridVM,
         kendoSpreadsheet : kendoSpreadsheetVM,
         kendoTreeview    : kendoTreeviewVM,
         kendoWindow      : kendoWindowVM,
         kendoTooltip     : kendoTooltipVM,
         kendoSplitter    : kendoSplitterVM,
         kendoListBox     : kendoListBoxVM,
         kendoMultiSelect : kendoMultiSelectVM,
         kendoTabstrip    : kendoTabstripVM,
         kendoMenu        : kendoMenuVM,
         kendoNotification: kendoNotificationVM
      };

      return {
         componentsVMs : componentsVMs,
         onComponentLoad : function( tag, type, domID, options ) {
            switch ( type ) {
               case "KENDO.BARCHART"    : return new this.componentsVMs.kendoBarchart(tag, domID, options);
               case "KENDO.DATE"        : return new this.componentsVMs.kendoDatePicker(tag, domID, options);
               case "KENDO.GRID"        : return new this.componentsVMs.kendoGrid(tag, domID, options);
               case "KENDO.SPREADSHEET" : return new this.componentsVMs.kendoSpreadsheet(tag, domID, options);
               case "KENDO.TREEVIEW"    : return new this.componentsVMs.kendoTreeview(tag, domID, options);
               case "KENDO.WINDOW"      : return new this.componentsVMs.kendoWindow(tag, domID, options);
               case "KENDO.TOOLTIP"     : return new this.componentsVMs.kendoTooltip(tag, domID, options);
               case "KENDO.SPLITTER"    : return new this.componentsVMs.kendoSplitter(tag, domID, options);
               case "KENDO.LISTBOX"     : return new this.componentsVMs.kendoListBox(tag, domID, options);
               case "KENDO.MULTISELECT" : return new this.componentsVMs.kendoMultiSelect(tag, domID, options);
               case "KENDO.TABSTRIP"    : return new this.componentsVMs.kendoTabstrip(tag, domID, options);
               case "KENDO.MENU"        : return new this.componentsVMs.kendoMenu(tag, domID, options);
               case "KENDO.NOTIFY"      : return new this.componentsVMs.kendoNotification(tag, domID, options);
            }
         }
      };

   }
);