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
         this.param.setPushData = options.setPushData;
         this.param.change = this.onChange;
         this.param.dataBound = this.onDataBound;
         this.param.select = this.onSelect;
         this.param.check = this.onCheck;
         /* drag & drop events */
         this.param.dragstart = this.onDragStart;
         this.param.drag = this.onDrag;
         this.param.drop = this.onDrop;
         this.param.dragend = this.onDragEnd;

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

      KendoTreeview.prototype.getCheckedNodes = function( nodes, checked ) {
         var self = this;

         for ( var i=0; i<nodes.length; i++ ) {
            var node = nodes[i],
                domNode = self.findByUid(node.uid),
                isChecked = domNode.find(":checkbox")[0].checked;

            if ( isChecked ) {
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
               self.getCheckedNodes(node.children.view(), checked);
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

            self.getCheckedNodes(self.treeview.dataSource.view(), checked);

            if ( options.onCheck !== undefined ) options.onCheck(self.TAG, checked, self, domID);
            if ( nexus.onCheck !== undefined ) {
               var len = nexus.onCheck.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onCheck[i];
                  cb.callback(self.TAG, checked, self, cb.callbackParam);
               }
            }
         };

         self.onDragStart = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onDragStart => " + self.TAG);
            if ( options.onDragStart !== undefined ) options.onDragStart(self.TAG, e, self, domID);
            if ( nexus.onDragStart !== undefined ) {
               var len = nexus.onDragStart.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDragStart[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onDrag = function( e ) {
            //console.log("[KendoTreeview] :: Treeview : onDrag => " + self.TAG);
            if ( options.onDrag !== undefined ) options.onDrag(self.TAG, e, self, domID);
            if ( nexus.onDrag !== undefined ) {
               var len = nexus.onDrag.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDrag[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onDrop = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onDrop => " + self.TAG);
            if ( options.onDrop !== undefined ) options.onDrop(self.TAG, e, self, domID);
            if ( nexus.onDrop !== undefined ) {
               var len = nexus.onDrop.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDrop[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onDragEnd = function( e ) {
            console.log("[KendoTreeview] :: Treeview : onDragEnd => " + self.TAG);
            if ( options.onDragEnd !== undefined ) options.onDragEnd(self.TAG, e, self, domID);
            if ( nexus.onDragEnd !== undefined ) {
               var len = nexus.onDragEnd.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDragEnd[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
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
            if ( node === undefined ) return self.treeview.items();
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
         self.findByItem = function( nodes, item, _output ) {
            for ( var i=0; i<nodes.length; i++ ) {
               var node = nodes[i];

               if ( node[node.pin] === item ) {
                  _output.push(node);
                  return;
               }

               if ( node.hasChildren ) {
                  self.findByItem(node.children.view(), item, _output);
               }
            }
         };

         self.checkBoxDisabled = function( value, items ) {
            if ( items === undefined ) {
               var nodes = self.getItems(),
                   boxes = nodes.find(":checkbox");

               for ( var i=0; i<boxes.length; i++ ) {
                  var box = boxes[i];
                  box.disabled = value;
               }
            }
            else {
               var views = self.treeview.dataSource.view();

               for ( var i=0; i<items.length; i++ ) {
                  var item = items[i],
                      out = [];

                  self.findByItem(views, item, out);
                  if ( out.length === 0 ) continue;

                  var node = self.findByUid(out[0].uid);
                  node.find(":checkbox")[0].disabled = value;
               }
            }
         };

         self.checkBoxInit = function( value ) {
            var nodes = self.getItems();

            for ( var i=0; i<nodes.length; i++ ) {
               var node = nodes[i];
               self.treeview.dataItem(node).set("checked", value);
            }
         };

         self.checkBoxChecked = function( value, items ) {
            var views = self.treeview.dataSource.view();

            for ( var i=0; i<items.length; i++ ) {
               var item = items[i],
                   out = [];

               self.findByItem(views, item, out);
               if ( out.length === 0 ) continue;

               var node = self.findByUid(out[0].uid);
               self.treeview.dataItem(node).set("checked", value);
            }
         };

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