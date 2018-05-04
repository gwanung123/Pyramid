'use strict';

define([
      "./kendo.grid",
      "./kendo.treeview",
      "./kendo.barchart",
      "./kendo.donutchart",
      "./kendo.window",
      "./kendo.tooltip",
      "./kendo.splitter",
      "./kendo.listBox",
      "./kendo.multiSelect",
      "./kendo.buttonGroup",
   ],
   function(
      kendoGridVM,
      kendoTreeviewVM,
      kendoBarchartVM,
      kendoDonutchartVM,
      kendoWindowVM,
      kendoTooltipVM,
      kendoSplitterVM,
      kendoListBoxVM,
      kendoMultiSelectVM,
      kendoButtonGroupVM
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
         kendoDonutchart  : kendoDonutchartVM,
         kendoWindow      : kendoWindowVM,
         kendoTooltip     : kendoTooltipVM,
         kendoSplitter    : kendoSplitterVM,
         kendoListBox     : kendoListBoxVM,
         kendoMultiSelect : kendoMultiSelectVM,
         kendoButtonGroup : kendoButtonGroupVM
      };

      return {
         componentsVMs : componentsVMs,
         onComponentLoad : function( tag, type, domID, options ) {
            switch ( type ) {
               case "KENDO.GRID"        : return new this.componentsVMs.kendoGrid(tag, domID, options);
               case "KENDO.TREEVIEW"    : return new this.componentsVMs.kendoTreeview(tag, domID, options);
               case "KENDO.BARCHART"    : return new this.componentsVMs.kendoBarchart(tag, domID, options);
               case "KENDO.DONUTCHART"  : return new this.componentsVMs.kendoDonutchart(tag, domID, options);
               case "KENDO.WINDOW"      : return new this.componentsVMs.kendoWindow(tag, domID, options);
               case "KENDO.TOOLTIP"     : return new this.componentsVMs.kendoTooltip(tag, domID, options);
               case "KENDO.SPLITTER"    : return new this.componentsVMs.kendoSplitter(tag, domID, options);
               case "KENDO.LISTBOX"     : return new this.componentsVMs.kendoListBox(tag, domID, options);
               case "KENDO.MULTISELECT" : return new this.componentsVMs.kendoMultiSelect(tag, domID, options);
               case "KENDO.BUTTONGROUP" : return new this.componentsVMs.kendoButtonGroup(tag, domID, options);
            }
         }
      };

   }
);