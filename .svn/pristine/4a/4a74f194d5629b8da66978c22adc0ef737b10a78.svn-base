'use strict';

define([
      "./kendo.grid",
      "./kendo.treeview",
      "./kendo.window",
      "./kendo.tooltip",
      "./kendo.splitter",
      //"./kendo.listBox",
      //"./kendo.multiSelect",
      "./kendo.tabstrip",
      "./kendo.menu",
      //"./kendo.contextMenu",
      "./kendo.notification",
      "./kendo.grid2",
   ],
   function(
      kendoGridVM,
      kendoTreeviewVM,
      kendoWindowVM,
      kendoTooltipVM,
      kendoSplitterVM,
      //kendoListBoxVM,
      //kendoMultiSelectVM,
      kendoTabstripVM,
      kendoMenuVM,
      //kendoContextMenuVM,
      kendoNotificationVM,
      kendoGrid2VM
   ) {

      /***********************************************************
       * name        : components
       * url         : Components/components.js
       * description :
       ***********************************************************/

      var componentsVMs = {
         kendoGrid        : kendoGridVM,
         kendoTreeview    : kendoTreeviewVM,
         kendoWindow      : kendoWindowVM,
         kendoTooltip     : kendoTooltipVM,
         kendoSplitter    : kendoSplitterVM,
         //kendoListBox     : kendoListBoxVM,
         //kendoMultiSelect : kendoMultiSelectVM,
         kendoTabstrip    : kendoTabstripVM,
         kendoMenu        : kendoMenuVM,
         //kendoContextMenu : kendoContextMenuVM,
         kendoNotification: kendoNotificationVM,
         kendoGrid2        : kendoGrid2VM,
      };

      return {
         componentsVMs : componentsVMs,
         onComponentLoad : function( tag, type, domID, options ) {
            switch ( type ) {
               case "KENDO.GRID"        : return new this.componentsVMs.kendoGrid(tag, domID, options);
               case "KENDO.TREEVIEW"    : return new this.componentsVMs.kendoTreeview(tag, domID, options);
               case "KENDO.WINDOW"      : return new this.componentsVMs.kendoWindow(tag, domID, options);
               case "KENDO.TOOLTIP"     : return new this.componentsVMs.kendoTooltip(tag, domID, options);
               case "KENDO.SPLITTER"    : return new this.componentsVMs.kendoSplitter(tag, domID, options);
               //case "KENDO.LISTBOX"     : return new this.componentsVMs.kendoListBox(tag, domID, options);
               //case "KENDO.MULTISELECT" : return new this.componentsVMs.kendoMultiSelect(tag, domID, options);
               case "KENDO.TABSTRIP"    : return new this.componentsVMs.kendoTabstrip(tag, domID, options);
               case "KENDO.MENU"        : return new this.componentsVMs.kendoMenu(tag, domID, options);
               //case "KENDO.CONTEXTMENU" : return new this.componentsVMs.kendoContextMenu(tag, domID, options);
               case "KENDO.NOTIFY"      : return new this.componentsVMs.kendoNotification(tag, domID, options);
               case "KENDO.GRID2"       : return new this.componentsVMs.kendoGrid2(tag, domID, options);  
            }
         }
      };

   }
);