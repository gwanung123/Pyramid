'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerApplyViewModel( win ) {

         console.log("[containerApply] :: containerApplyViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;

         this._myTag = win.others.joinBind.TAG;

         this._dbms = this._nexus.get("dbms");
         this._shared = this._nexus.get("shared");

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerApply] :: containerApplyViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_APPLY.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function() {
               var that = this;
               var splitterCss = "nx-containerApply-splitter",
                   splitterID = splitterCss + "-" + self._postfix;

               _binder.appendDIV(self._domID, splitterID, splitterCss);

               setTimeout( function() {
                  _Components.onComponentLoad(self._ROOT, "KENDO.SPLITTER", splitterID, {
                     panes: [
                        { collapsible: true, size: "250px", min: "250px", max: "250px" },
                        { collapsible: false }
                     ]
                  });
               }, 100 );

               that._viewLeft.init(splitterID);
               that._viewRight.init(splitterID);
            },
            _viewLeft : {
               handle : undefined,
               init : function( parentID ) {
                  var it = this;
                  var dbms = self._dbms[win.others.joinBind["viewLeft"].dbms],
                      text = self._getText(win.others.joinBind["viewLeft"].text),
                      title = win.others.joinBind["viewLeft"].title,
                      defineBlock = self._setObservable("viewLeft");
                  var html = "<h6 class=\"nx-containerApply-title\">" + title + "</h6>",
                      me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(parentID, me.domID, me.css);
                  _binder.appendHTML(me.domID, html);

                  it.handle = self._getHandleAfterBind(dbms, text, me);
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

                     model.requestData(options, {
                        onResult : function( result, error, param ) {
                           if ( error !== null ) return;
                           if ( result.hasOwnProperty("result") ) return;
                           vm.setData(result, param);
                        },
                        onResultParam : {}
                     });
                  }
               },
               setPushData : function( action, service, id, data, bind ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.model.tag === "APPLY_QUEUE_TREEVIEW" ) {
                        var asis = component.viewModel.getData("AS_IS"),
                            push = component.model.getPushData(action, service, asis, data);
                        if ( push === null ) return;
                        console.log("[containerApply] :: APPLY_QUEUE_TREEVIEW : setPushData => "+push.ACTION);
                        component.viewModel.setPushData(push.ACTION, service, id, push.DATA, bind);
                     }
                  }
               },
               getComponent : function( tag ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];
                     if ( component.tag === tag ) return component;
                  }

                  return null;
               },
            },
            _viewRight : {
               handle : undefined,
               init : function( parentID ) {
                  var it = this;
                  var dbms = self._dbms[win.others.joinBind["viewRight"].dbms],
                      text = self._getText(win.others.joinBind["viewRight"].text),
                      title = win.others.joinBind["viewRight"].title,
                      defineBlock = self._setObservable("viewRight");
                  var html = "<h6 class=\"nx-containerApply-title\">" + title + "</h6>",
                      me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(parentID, me.domID, me.css);
                  //_binder.appendHTML(me.domID, html);

                  it.handle = self._getHandleAfterBind(dbms, text, me);
                  if ( it.handle === undefined ) return;
               },
               setData : function( field, item, itemData ) {
                  var it = this;
                  var _shared = self._nexus.get("shared");

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( model.setItems === undefined ) continue;

                     if ( component.type === "KENDO.GRID" ) {
                        var text = component.text,
                            toolbarDom = $("#" + domID + " .k-grid-toolbar"),
                            itemDomID = "nx-dailySchedule-selected-item",
                            itemHtml = "<span id='" + itemDomID + "'>" + item + "</span>";

                        // grid init
                        vm.setData([]);
                        var itemDom = toolbarDom.children("#" + itemDomID);
                        if ( itemDom.length > 0 ) itemDom.remove();

                        vm.setOptions({ toolbar: itemHtml });

                        // grid set
                        model.setItems("SELECT", itemData, options);
                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData(result, param);
                           }
                        });

                        // grid visible
                        vm.doVisible();
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
                        if ( component.model.checkItems(data) === false ) return;

                        var pushData = component.model.getPushData(action, data, bind);
                        component.viewModel.setPushData("update", pushData.DATA, pushData.BIND);
                     }
                  }
               }
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerApplyViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerApply] :: containerApplyViewModel : onContentLoad");
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

      _ptt._getHandleAfterBind = function( dbms, text, me ) {
         var self = this;
         var components = {};

         for ( var idx=0; idx<me.components.length; idx++ ) {
            var component = me.components[idx];

            var options = null,
                componentM,
                componentVM;

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text, dbms, self._shared);
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

            if ( component.type === "KENDO.GRID" ) componentVM.doHidden();
         }

         return components;
      };

      _ptt._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
            // TREEVIEW
            onSelect: function( tag, node, methods, domID ) {
               var level = methods.getLevel(node);

               if ( methods.getLastLevel()-1 !== level ) return;

               var selected = methods.getText(node),
                   item = methods.dataItem(node);

               console.log("## ME ## ["+tag+"] onSelect ("+level+") "+selected);

               self._setTemplates._viewRight.setData(item.pin, item[item.pin], item.source);
            },
            // SCHEDULER
            onUpdate: function( tag, e, oldData, methods, domID ) {
               var that = this;
               console.log("## ME ## ["+tag+"] onUpdate");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;

               if ( model.isDirty(values) === false ) return;

               if ( model.isChanged(oldData, values) === true ) {
                  that.onDelete(tag, { model: oldData }, methods, domID);
               }

               var args = model.requestAdminArgs("INSERT", values, model.getItems(), self._nexus);
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
                     vm.setData(model.getDataForObj("INSERT", model.options, param));
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
               var args = model.requestAdminArgs("DELETE", values, model.getItems(), self._nexus);

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
                     vm.setData(model.getDataForObj("DELETE", model.options, param));
                  },
                  onResultParam : values
               });
            }
         };

         switch ( tag ) {
            case "APPLY_QUEUE_TREEVIEW":
               options.onSelect = self._meEvent.onSelect;
               break;

            case "APPLY_QUEUE_GRID":
               options.onUpdate = self._meEvent.onUpdate;
               options.onDelete = self._meEvent.onDelete;
               break;

            default: break;
         }
      };

      _ptt.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._setTemplates._viewLeft.setPushData(action, service, id, data, bind);
         self._setTemplates._viewRight.setPushData(action, service, id, data, bind);
      };


      return containerApplyViewModel;

   }
);