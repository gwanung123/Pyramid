'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerScenarioViewModel( win ) {

         console.log("[containerScenario] :: containerScenarioViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");
         this._shared = this._nexus.get("shared");

         this._myTag = win.others.joinBind.TAG;
         this._mydbms = this._dbms[win.others.joinBind.dbms];

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerScenario] :: containerScenarioViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_SCENARIO.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function() {
               var that = this;

               that._viewCenter.init();
            },
            _viewCenter : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = self._getText(win.others.joinBind.text),
                      defineBlock = self._setObservable("viewCenter");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;

                  it.requestData();
               },
               requestData : function() {
                  var it = this;
                  var _shared = self._nexus.get("shared");

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData(result, param);
                           },
                           onResultParam : {}
                        });
                     }
                  }
               },
               setPushData : function( action, service, id, data, bind ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.type === "KENDO.GRID" ) {
                        var push = component.text.PUSH;

                        if ( push !== service ) return;

                        component.viewModel.setPushData(action, data, bind);
                     }
                  }
               }
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerScenarioViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerScenario] :: containerScenarioViewModel : onContentLoad");
         var self = this;
         self._setTemplates.init();
      };

      _ptt._setObservable = function( position ) {
         var self = this;
         var defineBlock = self._DEFINE.getComponentChild(self._ROOT, position);
         return defineBlock;
      };

      _ptt._getText = function( path ) {
         var self = this;
         var arrPath = path.split("."),
             len = arrPath.length,
             result = _TEXT.CONTENTS[arrPath[0]];

         for ( var i=1; i<len; i++ ) {
            result = result[arrPath[i]];
         }

         return result;
      };

      _ptt._getHandleAfterBind = function( text, me ) {
         var self = this;
         var components = {};

         for ( var idx=0; idx<me.components.length; idx++ ) {
            var component = me.components[idx];

            var options = null,
                componentM,
                componentVM;

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text, self._mydbms, self._shared);
               self._setEvent(component.TAG, options, components);
            }

            var componentID = component.domID + "-" + self._postfix;
            _binder.appendDIV(me.domID, componentID, component.domID);

            componentVM = _Components.onComponentLoad(component.TAG,
                                                      component.type,
                                                      componentID,
                                                      options);

            components[componentID] = {
               tag       : component.TAG,
               type      : component.type,
               option    : options,
               model     : componentM,
               viewModel : componentVM,
               text      : text
            };
         }

         return components;
      };

      _ptt._setEvent = function( tag, options, components ) {
         var self = this;
         var _editModel = undefined;

         self._meEvent = {
            onDetailInit: function( tag, e, methods, domID ) {
               var component = components[domID],
                   m = component.model,
                   text = component.text["DETAIL"];
               var detailRow = e.detailRow;

               options.detailSkill = detailRow.find("#nx-scenario-skill").kendoMultiSelect({
                  dataSource: m.getDetailData("SKILL", text),
                  dataTextField: "TXT",
                  dataValueField: "VAL",
                  placeholder: "SKILL SELECT ...",
                  tagMode: "single",
                  select: function( e ) {
                     var selected = $.extend(true, [], this.value()),
                         val = e.dataItem[options.detailSkill.options.dataValueField];

                     selected.push(val);

                     _editModel.set("SCENARIO_DESC", m.getDetailData("SCENARIO_MAKE", text, selected));
                     _editModel.trigger("change");
                  },
                  deselect: function( e ) {
                     var selected = $.extend(true, [], this.value()),
                         val = e.dataItem[options.detailSkill.options.dataValueField];

                    for ( var i=0; i<selected.length; i++ ) {
                       if ( selected[i] !== val ) continue;
                       selected.splice(i, 1);
                       break;
                    }

                    _editModel.set("SCENARIO_DESC", m.getDetailData("SCENARIO_MAKE", text, selected));
                     _editModel.trigger("change");
                  }
               }).data("kendoMultiSelect");

               if ( e.data["SCENARIO_DESC"] !== "" ) {
                  var selected = m.getDetailData("SCENARIO_PARSE", text, e.data["SCENARIO_DESC"]);
                  options.detailSkill.value(selected);
               }

               options.detailSkill.readonly(true);
            },
            onEdit: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onEdit");
               var component = components[domID],
                   m = component.model,
                   text = component.text["DETAIL"];

               _editModel = e.model;

               e.sender.expandRow(e.container);

               var detailRow = e.container.next('.k-detail-row');

               detailRow.find('.nx-scenario-container').toggle();

               options.detailSkill.setDataSource(
                  new kendo.data.DataSource({
                     data: m.getDetailData("SKILL", text)
                  })
               );

               if ( _editModel["SCENARIO_DESC"] !== "" ) {
                  var selected = m.getDetailData("SCENARIO_DESC", text, _editModel["SCENARIO_DESC"]);
                  options.detailSkill.value(selected);
               }

               options.detailSkill.readonly(false);

               kendo.bind(detailRow, _editModel);
               _editModel.bind('change', function( e ) {
                  var tr = $('tr[data-uid=' + _editModel.uid + ']');
               });
            },
            onSave: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onSave");
               var detailRow = e.container.next('.k-detail-row');
               detailRow.find('#nx-scenario-container').toggle();
            },
            onCancel: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onCancel");
               var detailRow = e.container.next('.k-detail-row');
               detailRow.find('#nx-scenario-container').toggle();
            },
            onInsert: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onInsert");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args = model.requestAdminArgs("INSERT", values, self._nexus);

               model.requestAdmin("INSERT", args, {
                  onResult : function( result, error, param ) {
                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onInsert => "+JSON.stringify(error));
                        var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onInsert => "+JSON.stringify(result));
                        var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }
                     setTimeout( function() {
                        var data = model.getDataForObj(model.options, model.getInsertData(param));
                        vm.setData(data);
                     }, 100 );
                  },
                  onResultParam : values
               });
            },
            onUpdate: function( tag, e, oldData, methods, domID ) {
               console.log("## ME ## ["+tag+"] onUpdate");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args = model.requestAdminArgsUpdate(values, self._nexus);

               model.requestAdmin("UPDATE", args, {
                  onResult : function( result, error, param ) {
                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onUpdate => "+JSON.stringify(error));
                        var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onUpdate => "+JSON.stringify(result));
                        var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }
                     vm.setData(model.getDataForObj(model.options, param));
                  },
                  onResultParam : values
               });
            },
            onDelete: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onDelete");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args = model.requestAdminArgs("DELETE", values, self._nexus);

               model.requestAdmin("DELETE", args, {
                  onResult : function( result, error, param ) {
                     if ( error !== null ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onDelete => "+JSON.stringify(error));
                        var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                        notify.doError("Save Error", "",JSON.stringify(error));
                        return;
                     }
                     if ( result.hasOwnProperty("result") ) {
                        console.log("## ME ## ["+tag+"] ERROR!! onDelete => "+JSON.stringify(result));
                        var notify = _Components.onComponentLoad("", "KENDO.NOTIFY", domID, {});
                        notify.doError("Save Error", result.result.code, result.result.description);
                        return;
                     }
                     var data = model.getDataForObj(model.options, param);
                     vm.setDataDelete(data);
                  },
                  onResultParam : values
               });
            }
         };

         switch ( tag ) {
            case "SCENARIO_GRID":
               options.onDetailInit = self._meEvent.onDetailInit;
               options.onEdit = self._meEvent.onEdit;
               options.onSave = self._meEvent.onSave;
               options.onCancel = self._meEvent.onCancel;

               options.onInsert = self._meEvent.onInsert;
               options.onUpdate = self._meEvent.onUpdate;
               options.onDelete = self._meEvent.onDelete;
               break;

            default: break;
         }
      };

      _ptt.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._setTemplates._viewCenter.setPushData(action, service, id, data, bind);
      };


      return containerScenarioViewModel;

   }
);