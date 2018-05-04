'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerGridViewModel( win ) {

         console.log("[containerGrid] :: containerGridViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         this._myTag = win.others.joinBind.TAG;
         this._mydbms = this._dbms.CONTAINER_GRID;

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerGrid] :: containerGridViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_GRID.TAG;

            //start point
            self.onContentLoad();
         });

         //templates load
         this._setTemplates = {
            init : function( view ) {
               var that = this;

               that._viewTop.init();

               that._viewBottom.init();
            },
            _viewTop : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = _TEXT.CONTENTS.CONTAINER_GRID.TOP,
                      defineBlock = self._setObservable("viewTop");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;
               },
               setData : function( data, fromTag, action ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel;

                     if ( model.setItems === undefined ) continue;

                     if ( component.type === "KENDO.MENU" ) {
                        switch ( action ) {
                           case "INSERT":
                              var append = model.addItems(data, component.text);
                              vm.doAppend(append);
                              break;

                           case "DELETE":
                              var domId = model.delItems(data, component.text);
                              vm.doRemove(domId);
                              break;

                           default:
                              model.setOptions(fromTag);
                              model.setItems(data);
                              vm.setData(model.getItems());
                        }
                     }
                     else {
                        model.setItems(data);
                        vm.setData(model.getItems());
                     }
                  }
               },
            },
            _viewBottom : {
               handle : undefined,
               init : function() {
                  var it = this;
                  var text = _TEXT.CONTENTS.CONTAINER_GRID.BOTTOM,
                      defineBlock = self._setObservable("viewBottom");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;
               },
               setData : function( data, fromTag ) {
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
                            gridOptions = model.setColumns(fromTag, "SELECT", text, options, _shared);

                        model.setItems(data, "SELECT", options);
                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData(result, param);
                           },
                           onResultParam : gridOptions
                        });
                     }
                     else {
                        model.setItems(data);
                        vm.setData(model.getItems());
                     }
                  }
               },
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerGridViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerGrid] :: containerGridViewModel : onContentLoad");
         var self = this;
         self._setTemplates.init();
      };

      _ptt._setObservable = function( position ) {
         var self = this;
         var defineBlock = self._DEFINE.getComponentChild(self._ROOT, position);
         return defineBlock;
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
               options = componentM.getOptions(text[component.TAG], self._mydbms);
               self._setEvent(component.TAG, options, components);
            }

            var componentID = component.domID + "-" + self._postfix;

            if ( component.type === "KENDO.MENU" ) {
               _binder.appendHTML(me.domID, "<ul id=\"" + componentID + "\" class=\"" + component.domID + "\"></ul>");
            }
            else {
               _binder.appendDIV(me.domID, componentID, component.domID);
            }

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
               text      : text[component.TAG]
            };
         }

         return components;
      };

      _ptt._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
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
                     var data = model.getDataForObj(model.options, param);
                     vm.setData(data);
                     self._setTemplates._viewTop.setData(data[0], null, "INSERT");
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
                     self._setTemplates._viewTop.setData(data[0], null, "DELETE");
                  },
                  onResultParam : values
               });
            }
         };

         switch ( tag ) {
            case "SELECTED_GRID":
               options.onInsert = self._meEvent.onInsert;
               options.onUpdate = self._meEvent.onUpdate;
               options.onDelete = self._meEvent.onDelete;
               break;

            default: break;
         }
      };

      _ptt._setJoinData = function( data, tag ) {
         var self = this;

         setTimeout( function() {
            self._setTemplates._viewTop.setData(data, tag);
            self._setTemplates._viewBottom.setData(data, tag);
         }, 100 );
      };


      return containerGridViewModel;

   }
);