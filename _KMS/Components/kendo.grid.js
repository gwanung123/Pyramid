'use strict';

define(["./models/model.kendo.grid", "kendo.all.min"],
   function( model ) {

      function KendoGrid( tag, domID, options ) {
         console.log("[KendoGrid] :: Grid : load");

         if ( options === null ) {
            console.log("[KendoGrid] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //kendoGrid parameter
         this.param = this.model.makeOption(options);
         this.param.dataBound = this.onDataBound;
         this.param.change = this.onChange;
         this.param.beforeEdit = this.onBeforeEdit;
         this.param.edit = this.onBtnEdit;
         this.param.cancel = this.onBtnCancel;
         this.param.save = this.onBtnSave;
         this.param.remove = this.onBtnRemove;

         if ( this.param === null ) {
            console.log("[KendoGrid] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //grid
         this.grid = this.location.kendoGrid(this.param).data("kendoGrid");

         this.doMethods();

         this.setCustomEvents(domID, options);

         this.setData(options.data);

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoGrid.prototype.onDestroy = function() {
         var self = this;
         self.grid.destroy();
         self.timerDestroy();
      };

      KendoGrid.prototype.getData = function() {
         var self = this;
         return self.model.makeDataGet();
      };

      KendoGrid.prototype.setDataSource = function( data, schema, sort ) {
         var self = this;
         var nextId = data.length + 1;

         var dataSource = new kendo.data.DataSource({
            pageSize: self.getOptions().pageable.pageSize || undefined,
            transport: {
                  read: function( e ) {
                     console.log("[KendoGrid] :: DataSource : read");
                     e.success(data);
                  }
            },
            schema: schema,
            sort: sort,
            group: self.nexus.group
         });

         self.grid.setDataSource(dataSource);
      };

      KendoGrid.prototype.setData = function( data, param ) {
         var self = this;
         var finalData = data || [],
             isChange = false;

         console.log("[KendoGrid] :: Grid : setData: " + finalData.length);

         if ( param !== undefined ) {
            isChange = self.model.compareColumnsData(self.getOptions().columns, param.columns);
            if ( isChange === true ) {
               self.setOptions(param);
               if ( param.columns !== undefined ) self.model.checkRole(param.columns);
            }
         }

         if ( finalData.length === 0 ) {
            self.setDataSource(finalData, self.nexus.schema, self.nexus.sort);
            self.model.makeDataSet(finalData);
            return;
         }

         if ( self.model.makeDataLen() > 0 ) {
            finalData = self.model.makeData(data, self.nexus.pk);
         }

         self.model.makeDataSet(finalData);
         self.setDataSource(finalData, self.nexus.schema, self.nexus.sort);

         if ( self.model.isCheckAll() === true ) self.setCheckAllEvent();
      };

      KendoGrid.prototype.setDataDelete = function( data ) {
         console.log("[KendoGrid] :: Grid : setDataDelete: "+data.length);
         var self = this;
         var finalData = self.model.makeDataDelete(data, self.nexus.pk);

         self.model.makeDataSet(finalData);
         self.setDataSource(finalData, self.nexus.schema, self.nexus.sort);

         if ( self.model.isCheckAll() === true ) self.setCheckAllEvent();
      };

      KendoGrid.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;

         if ( bind === undefined ) return;

         var finalData = self.model.makeDataPush(action, data, bind);

         self.setDataSource(finalData, self.nexus.schema, self.nexus.sort);
      };

      KendoGrid.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {},
             isEditing = false,
             action = "",
             oldData;

         self.onDataBound = function( e ) {
            console.log("[KendoGrid] :: Grid : onDataBound");

            isEditing = false;
            oldData = undefined;

            if ( self.model.makeDataLen() === 0 ) return;

            //checkbox
            if ( self.model.isCheckAll() === true ) {
               var checkAll = self.model.getCheckAll("domID"),
                   rowID = self.model.getCheckAll("rowID");

               e.sender.items().each(function() {
                  var dataItem = e.sender.dataItem(this);
                  kendo.bind(this, dataItem);
                  if ( dataItem[rowID] ){
                     $(this).addClass("k-state-selected");
                  }
               })

               var checkedLen = e.sender.items().find(":checked").length,
                   rowLen = e.sender.dataSource.view().length;
               $("#"+domID+" #"+checkAll)[0].checked = checkedLen == rowLen;
            }

            if ( options.onDataBound !== undefined ) options.onDataBound(self.TAG, e, self, domID);
            if ( nexus.onDataBound !== undefined ) {
               var len = nexus.onDataBound.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onDataBound[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };

         self.onChange = function( e ) {
            console.log("[KendoGrid] :: Grid : onChange");
            if ( options.onChange !== undefined ) options.onChange(self.TAG, e, self, domID);
         };

         self.onBeforeEdit = function( e ) {
            console.log("[KendoGrid] :: Grid : onBeforeEdit => " + e.model.isNew());

            // set column editor
            var _columnEdit = {
               "kendoDropDownList": function( container, options ) {
                  var nx = $.extend(true, {}, options.values);
                  delete(options.values);

                  var input = $("<input id=\""+options.field+"\" name=\""+options.field+"\" />");

                  if ( nx.options.required !== undefined ) {
                     input.attr("required", "required");
                     input.attr("validationMessage", nx.options.required);
                     var tooltip = $('<span class="k-invalid-msg" data-for="' + options.field + '"></span>');
                     tooltip.appendTo(container);
                  }

                  input.appendTo(container);

                  if ( nx.options.filterField !== undefined ) {
                     self.model.dropDownListFilter(nx.options.dataSource,
                                                   nx.options.filterField,
                                                   e.model[nx.options.filterField]);
                  }

                  var dropdown = input.kendoDropDownList({
                     height: nx.options.height,
                     dataTextField: nx.options.dataTextField,
                     dataValueField: nx.options.dataValueField,
                     cascadeFrom: nx.options.cascadeFrom,
                     cascadeFromField: nx.options.cascadeFromField,
                     dataSource: nx.options.dataSource,
                     optionLabel: nx.options.optionLabel,
                     select: function( e ) {
                        var item = e.item,
                            text = item.text();
                        var sender = e.sender,
                            valueField = sender.dataItem(item)[sender.options.dataValueField];
                            //textField = sender.dataItem(item)[sender.options.dataTextField],
                            //label = sender.options.optionLabel;
                        var parent = $(sender)[0].wrapper.closest("td"),
                            tooltip = parent.find(".k-invalid-msg");

                        if ( valueField !== "" ) {
                           tooltip.attr("style", "display: none");
                        }
                     }
                  }).data("kendoDropDownList");

                  dropdown.wrapper.appendTo(container);
               },
               "kendoValidator": function( container, options ) {
                  var nx = $.extend(true, {}, options.values);
                  delete(options.values);

                  var input = $("<input id=\""+options.field+"\" name=\""+options.field+"\" />");

                  if ( nx.options.messages.required !== undefined ) {
                     input.attr("required", "required");
                  }
                  if ( nx.options.min !== undefined ) {
                     input.attr("type", "number");
                     input.attr("min", nx.options.min);
                  }
                  if ( nx.options.max !== undefined ) {
                     input.attr("type", "number");
                     input.attr("max", nx.options.max);
                  }
                  if ( nx.options.pattern !== undefined ) {
                     input.attr("type", "text");
                     input.attr("pattern", nx.options.pattern);
                  }
                  if ( nx.options.url === true ) {
                     input.attr("type", "url");
                     input.attr(name, "url");
                  }
                  if ( nx.options.email === true ) {
                     input.attr("type", "email");
                     input.attr(name, "email");
                  }
                  if ( nx.options.date === true ) {
                     input.attr("type", "date");
                     input.attr(name, "date");
                  }
                  if ( nx.options.style !== undefined ) {
                     input.attr("style", nx.options.style);
                  }
                  if ( nx.options.defaultValue !== undefined ) {
                     input.attr("value", nx.options.defaultValue);
                  }
                  if ( nx.options.placeholder !== undefined ) {
                     input.attr("placeholder", nx.options.placeholder);
                  }

                  input.appendTo(container);
                  var validator = container.kendoValidator({
                     rules: nx.options.rules,
                     messages: nx.options.messages
                  }).data("kendoValidator");
               }
            };

            if ( isEditing ) {
               self.grid.cancelChanges();
               e.preventDefault();
               isEditing = false;
               return;
            }

            isEditing = true;

            var columns = e.sender.columns;

            for ( var i=0; i<columns.length; i++ ) {
               var column = columns[i];

               if ( column.onEdit === undefined ) continue;
               if ( column.values === undefined ) column.values = {};

               var editor = column.onEdit;

               column.values.domID = editor.domID;
               column.values.options = editor.options;

               column.editor = _columnEdit[editor.component];
            }

         };

         self.onBtnEdit = function( e ) {
            console.log("[KendoGrid] :: Grid : onBtnEdit");
            //e.preventDefault();

            if ( e.model.isNew() ) {
               action = "insert";
            }
            else {
               action = "update";
               oldData = $.extend(true, {}, e.model);
            }

            if ( options.onEdit !== undefined ) options.onEdit(self.TAG, e, self, domID);
         };

         self.onBtnCancel = function( e ) {
            console.log("[KendoGrid] :: Grid : onBtnCancel");
            isEditing = false;
            self.grid.cancelChanges();
            if ( options.onCancel !== undefined ) options.onCancel(self.TAG, e, self, domID);
         };

         self.onBtnSave = function( e ) {
            console.log("[KendoGrid] :: Grid : onBtnSave");
            isEditing = false;

            switch ( action ) {
               case "insert":
                  if ( options.onInsert !== undefined ) options.onInsert(self.TAG, e, self, domID);
                  break;

               case "update":
                  if ( options.onUpdate !== undefined ) options.onUpdate(self.TAG, e, oldData, self, domID);
                  break;
            }

            self.grid.cancelChanges();
            if ( options.onSave !== undefined ) options.onSave(self.TAG, e, self, domID);
         };

         self.onBtnRemove = function( e ) {
            console.log("[KendoGrid] :: Grid : onBtnRemove");
            //e.preventDefault();
            self.grid.cancelChanges();
            if ( options.onDelete !== undefined ) options.onDelete(self.TAG, e, self, domID);
            if ( options.onRemove !== undefined ) options.onRemove(self.TAG, e, self, domID);
         };

         self.onNavigate = function( e ) {
            console.log("[KendoGrid] :: Grid : onNavigate");
            if ( options.onNavigate !== undefined ) options.onNavigate(self.TAG, e, self);
         };

      };

      KendoGrid.prototype.setCustomEvents = function( domID, options ) {
         var self = this;

         // bind click event to the checkbox
         self.onCheckAll = function( allchecked ) {
            var rowID = self.model.getCheckAll("rowID");
            var items = self.grid.items();

            items.each(function() {
               var dataItem = self.grid.dataItem(this);

               if( dataItem[rowID] != allchecked ) {
                  dataItem[rowID] = allchecked;
                  dataItem.dirty = true;
               }
            });

            self.grid.dataSource.sync();
         };

         self.setCheckAllEvent = function() {
            var checkAll = self.model.getCheckAll("domID");

            if ( checkAll !== undefined ) {
               $("#"+domID+" #"+checkAll).off("click");
               $("#"+domID+" #"+checkAll).on("click", function( e ) {
                  e.preventDefault();

                  console.log("[KendoGrid] :: Grid : onCheckAll");
                  self.onCheckAll(e.target.checked);
               });
            }
         };

         /*
         // custom toolbar
         var ROOT_CLASSNAME = "k-grid-toolbar";
         var selector = "#"+domID+" ."+ROOT_CLASSNAME;

         if ( options.toolbar !== undefined && options.toolbar.length > 0 ) {
            for ( var i=0; i<options.toolbar.length; i++ ) {
               var name = options.toolbar[i].name || options.toolbar[i],
                   id = " .k-grid-"+name;

               $(selector + id).on("click", function(e) {
                  var event = e.target.text;
                  console.log("[KendoGrid] :: Grid : onToolbarEvent = "+event);

                  switch ( event ) {
                     default: break;
                  }
               });
            }
         }
         */
      };

      KendoGrid.prototype.doMethods = function() {
         var self = this;

         self.getItems = function() {
            return self.grid.items();
         };

         self.getDataItem = function( param ) {
            return self.grid.dataItem(param);
         };

         self.getOptions = function() {
            return self.grid.getOptions();
         };

         self.setOptions = function( options ) {
            self.grid.setOptions(options);
         };

         self.gridColumnInit = function() {
            self.setOptions({ columns: [] });
            self.grid.columns = [];
         };

         self.doHidden = function() {
            self.location.css("visibility", "hidden");
         };

         self.doVisible = function() {
            self.location.css("visibility", "visible");
         };

         self.doDataSync = function() {
            self.grid.dataSource.sync();
         };

         self.doCancelChanges = function() {
            self.grid.cancelChanges();
         };
      };


      return KendoGrid;
   }
);