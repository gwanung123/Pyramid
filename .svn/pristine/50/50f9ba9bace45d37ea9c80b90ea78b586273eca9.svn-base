'use strict';

define(["./models/model.kendo.treeview", "kendo.all.min"],
   function( model ) {

      function KendoTreeview( tag, domID, options ) {
         console.log("[KendoTreeview] :: Treeview : load");

         if ( options === null ) {
            console.log("[KendoTreeview] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //kendoTreeView parameter
         this.param = this.model.makeOption(options);
         this.param.change = this.onChange;
         this.param.dataBound = this.onDataBound;
         this.param.select = this.onSelect;

         if ( this.param === null ) {
            console.log("[KendoTreeview] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //treeview
         this.treeview = this.location.kendoTreeView(this.param).data("kendoTreeView");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoTreeview.prototype.onDestroy = function() {
         var self = this;
         self.treeview.destroy();
      };

      KendoTreeview.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      /**
       * {
       *    "tenant":[{"TENANT_ID":"10"}],
       *    "group":[{"TENANT_ID":"10","GROUP_ID":"100"}]
       * }
       */
      KendoTreeview.prototype.setData = function( data, param ) {
         var self = this;
         var parsed = self.model.makeData(data, self.param.dataTextField, self.nexus.bind, param);

         var dataSource = new kendo.data.HierarchicalDataSource({
           data: parsed
         });

         self.treeview.setDataSource(dataSource);
         self.treeview.expand(".k-item");
      };

      KendoTreeview.prototype.setPushData = function( action, id, data ) {
         var self = this;
         var nexus = self.nexus.join || {};

         if ( nexus.setPushData !== undefined ) {
            var len = nexus.setPushData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setPushData[i];
               cb.callback(self.TAG, data, self, cb.callbackParam);
            }
         }
      };

      KendoTreeview.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onChange = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onChange");
            if ( options.onChange !== undefined ) options.onChange(self.TAG, e, self);
            if ( nexus.onChange !== undefined ) {
               var len = nexus.onChange.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onChange[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onDataBound = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onDataBound");
            if ( options.onDataBound !== undefined ) options.onDataBound(self.TAG, e, self);
            if ( nexus.onDataBound !== undefined ) {
               var len = nexus.onDataBound.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDataBound[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onSelect = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onSelect");
            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, e.node, self);
            if ( nexus.onSelect !== undefined ) {
               var len = nexus.onSelect.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onSelect[i];
                  cb.callback(self.TAG, e.node, self, cb.callbackParam);
               }
            }
         };
      };

      KendoTreeview.prototype.doMethods = function() {
         var self = this;

         self.getItem = function( id ) {
            return self.treeview.dataSource.get(id);
         };

         self.getItems = function( node ) {
            return self.treeview.items(node);
         };

         self.getText = function( node ) {
            return self.treeview.text(node);
         };

         self.findByUid = function( uid ) {
            return self.treeview.findByUid(uid);
         };

         self.findByText = function( txt ) {
            return self.treeview.findByText(txt);
         };

         //custom
         self.getLevel = function( node ) {
            var text = self.getText(node),
                uid = self.findByText(text).data().uid;
            return self.treeview.dataSource.getByUid(uid).level();
         };

         self.getSubLevelItems = function( level, selected ) {
            return self.model.makeDataSubLevelItems(level, selected, self.param.dataTextField);
         };

      };

      return KendoTreeview;
   }
);