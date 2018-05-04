'use strict';

define([
      "./kendo.grid",
      "./kendo.treeview",
      "./kendo.barchart",
      "./kendo.window",
      "./kendo.tooltip",
      "./kendo.splitter",
      "./kendo.listBox",
      "./kendo.datePicker",
      "./kendo.multiSelect"
   ],
   function(
      kendoGridVM,
      kendoTreeviewVM,
      kendoBarchartVM,
      kendoWindowVM,
      kendoTooltipVM,
      kendoSplitterVM,
      kendoListBoxVM,
      kendoDatePickerVM,
      kendoMultiSelectVM
   ) {

      /***********************************************************
       * name        : components
       * url         : Components/components.js
       * description :
       ***********************************************************/
      var componentsVMs = {
            kendoGrid        : kendoGridVM,
            kendoTreeview    : kendoTreeviewVM,
            kendoBarchart    : kendoBarchartVM,
            kendoWindow      : kendoWindowVM,
            kendoTooltip     : kendoTooltipVM,
            kendoSplitter    : kendoSplitterVM,
            kendoListBox     : kendoListBoxVM,
            kendoDatePicker  : kendoDatePickerVM,
            kendoMultiSelect : kendoMultiSelectVM
      };



      return {
         componentsVMs : componentsVMs,
         onComponentLoad : function( tag, type, domID, options ) {
            switch ( type ) {
               case "KENDO.GRID"        : return new this.componentsVMs.kendoGrid(tag, domID, options);
               case "KENDO.TREEVIEW"    : return new this.componentsVMs.kendoTreeview(tag, domID, options);
               case "KENDO.BARCHART"    : return new this.componentsVMs.kendoBarchart(tag, domID, options);
               case "KENDO.WINDOW"      : return new this.componentsVMs.kendoWindow(tag, domID, options);
               case "KENDO.TOOLTIP"     : return new this.componentsVMs.kendoTooltip(tag, domID, options);
               case "KENDO.SPLITTER"    : return new this.componentsVMs.kendoSplitter(tag, domID, options);
               case "KENDO.LISTBOX"     : return new this.componentsVMs.kendoListBox(tag, domID, options);
               case "KENDO.DATEPICKER"     : return new this.componentsVMs.kendoDatePicker(tag, domID, options);
               case "KENDO.MULTISELECT" : return new this.componentsVMs.kendoMultiSelect(tag, domID, options);
            }
         }
      };
   }
);