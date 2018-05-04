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
         this.param.setData = options.setData;
         this.param.change = this.onChange;
         this.param.dataBound = this.onDataBound;
         this.param.select = this.onSelect;
         this.param.check = this.onCheck;

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

         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
      };

      KendoTreeview.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         var nexus = self.nexus.join || {};

         if ( bind === undefined ) return;

         if ( self.model.isPushService(self.param.dataTextField, service) === true ) {
            var parsed = self.model.makeDataPush(action,
                                                 service,
                                                 data,
                                                 bind,
                                                 self.param.dataTextField,
                                                 self.nexus.bind);

            var dataSource = new kendo.data.HierarchicalDataSource({
               data: parsed
            });

            self.treeview.setDataSource(dataSource);

            if ( self.param.setPushData !== undefined ) self.param.setPushData(self.TAG, service, self);
         }

         if ( nexus.setPushData !== undefined ) {
            var len = nexus.setPushData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setPushData[i];
               cb.callback(self.TAG, action, service, id, data, bind, self, cb.callbackParam);
            }
         }
      };

      KendoTreeview.prototype.checkedNodes = function( nodes, checked ) {
         var self = this;

         for ( var i=0; i<nodes.length; i++ ) {
            var node = nodes[i];

            if ( node.checked ) {
               var level = self.treeview.dataSource.getByUid(node.uid).level(),
                   textField = self.param.dataTextField[level],
                   text = node[textField];

               checked.push({
                  id: node.id,
                  level: level,
                  text: text,
                  textField: textField,
                  field: node.pin,
                  item: node[node.pin],
                  depth: self.model.makeDataDepthLength(),
                  source: node.source
               });
            }

            if ( node.hasChildren ) {
               self.checkedNodes(node.children.view(), checked);
            }
         }
      };


      KendoTreeview.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onChange = function( e ) {
            //console.log("[KendoTreeview] :: Treeview : onChange");
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
            //console.log("[KendoTreeview] :: Treeview : onDataBound");
            if ( self.treeview !== undefined ) self.treeview.expand(".k-item");
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
            if ( options.onSelect !== undefined ) options.onSelect(self.TAG, e.node, self, domID);
            if ( nexus.onSelect !== undefined ) {
               var len = nexus.onSelect.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onSelect[i];
                  cb.callback(self.TAG, e.node, self, cb.callbackParam);
               }
            }
         };

         self.onCheck = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onCheck");
            var checked = [];

            self.checkedNodes(self.treeview.dataSource.view(), checked);

            if ( options.onCheck !== undefined ) options.onCheck(self.TAG, checked, self);
            if ( nexus.onCheck !== undefined ) {
               var len = nexus.onCheck.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onCheck[i];
                  cb.callback(self.TAG, checked, self, cb.callbackParam);
               }
            }
         };
      };

      KendoTreeview.prototype.doMethods = function() {
         var self = this;

         self.getItem = function( id ) {
            return self.treeview.dataSource.get(id);
         };

         self.dataItem = function( node ) {
            return self.treeview.dataItem(node);
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
         self.getLastLevel = function() {
            return self.model.makeDataDepthLength();
         };

         self.getLevel = function( node ) {
            var text = self.getText(node),
                item = self.findByText(text).data(),
                uid;

            if ( item === undefined ) return -1;

            uid = item.uid;
            return self.treeview.dataSource.getByUid(uid).level();
         };

         self.getSubLevelItems = function( level, selected ) {
            return self.model.makeDataSubLevelItems(level, selected, self.param.dataTextField);
         };

      };

      return KendoTreeview;
   }
);