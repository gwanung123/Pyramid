'use strict';

define(["./models/model.kendo.tabstrip", "kendo.all.min"],
   function( model ) {

      function KendoTabstrip( tag, domID, options ) {
         console.log("[KendoTabstrip] :: TabStrip : load");

         if ( options === null ) {
            console.log("[KendoTabstrip] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoTabstrip parameter
         this.param = this.model.makeOption(domID, options);
         this.param.select = this.onSelect;

         if ( this.param === null ) {
            console.log("[KendoTabstrip] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //TabStrip
         this.tabstrip = this.location.kendoTabStrip(this.param).data("kendoTabStrip");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoTabstrip.prototype.onDestroy = function() {
         var self = this;
         self.tabstrip.destroy();
      };

      /*
      KendoTabstrip.prototype.getData = function( type ) {
         var self = this;
      };

      KendoTabstrip.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoTabstrip.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };
      */

      KendoTabstrip.prototype.setEvents = function( domID, options ) {
         var self = this;

         self.onSelect = function( e ) {
            console.log("[KendoTabstrip] :: TabStrip : onSelect");
            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, e, self, domID);
         };

         self.configureSortable = function() {
            $("#"+domID+" ul.k-tabstrip-items").kendoSortable({
               filter: "li.k-item",
               axis: "x",
               container: "ul.k-tabstrip-items",
               hint: function( element ) {
                  return $("<div id='hint' class='k-widget k-header k-tabstrip'><ul class='k-tabstrip-items k-reset'><li class='k-item k-state-active k-tab-on-top'>" + element.html() + "</li></ul></div>");
               },
               start: function( e ) {
                  self.tabstrip.activateTab(e.item);
               },
               change: function( e ) {
                  self.tabstrip = $("#"+domID).data("kendoTabStrip");
                  var reference = self.tabstrip.tabGroup.children().eq(e.newIndex);

                  if ( e.oldIndex < e.newIndex ) {
                     self.tabstrip.insertAfter(e.item, reference);
                  }
                  else {
                     self.tabstrip.insertBefore(e.item, reference);
                  }
               }
            });
         };

         self.configureCloseTab = function() {
            var tabsElements = $("#" + domID + ' li[role="tab"].k-last');

            //tabsElements.append('<span data-type="remove" class="k-link k-remove"><span class="k-icon k-i-x"></span></span>');
            tabsElements.find(".k-link").before('<span data-type="remove" class="k-link k-remove"><span class="k-icon k-i-x"></span></span>');

            self.tabstrip.tabGroup.off("click", "[data-type='remove']");

            self.tabstrip.tabGroup.on("click", "[data-type='remove']", function( e ) {
               e.preventDefault();
               e.stopPropagation();

               var item = $(e.target).closest(".k-item"),
                   index = item.index();
               if ( index < 0 ) return;

               var itemData = self.tabstrip.contentElement(index).firstChild.id;
               self.tabstrip.remove(index);

               if ( self.tabstrip.items().length > 0 && item.hasClass('k-state-active') ) {
                  self.tabstrip.select(0);
               }

               if ( options.onClose !== undefined ) options.onClose(self.TAG, itemData, self, domID);
            });
         };
      };

      KendoTabstrip.prototype.doMethods = function() {
         var self = this;

         self.getItems = function() {
            return self.tabstrip.items();
         };

         self.getContentDom = function( index ) {
            return self.tabstrip.contentElement(index);
         };

         self.doAppend = function( tab ) {
            self.tabstrip.append(tab);
            if ( self.param.sortable === true ) self.configureSortable();
            if ( self.param.closable === true ) self.configureCloseTab();
         };

         self.doActivate = function( tab ) {
            self.tabstrip.activateTab(tab);
         };

         self.doDeactivate = function( tab ) {
            self.tabstrip.deactivateTab(tab);
         };

         self.doSelect = function( tab ) {
            if ( tab === undefined ) return self.tabstrip.select();
            self.tabstrip.select(tab);
         };
      };

      return KendoTabstrip;
   }
);