'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerGridAllViewModel( win ) {

         console.log("[containerGridAll] :: containerGridAllViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         this._myTag = win.others.joinBind.TAG;
         this._mydbms = this._dbms[win.others.joinBind.dbms];

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerGridAll] :: containerGridAllViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_GRID_ALL.TAG;

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

                     if ( component.type === "KENDO.GRID2" ) {
                        var text = component.text,
                            gridOptions = model.setColumns("SELECT_ALL", text, options, _shared);

                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              vm.setData(result, param);
                           },
                           onResultParam : gridOptions
                        });
                     }
                  }
               },
               setPushData : function( action, service, id, data, bind ) {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID];

                     if ( component.type === "KENDO.GRID2" ) {
                        var push = component.text.PUSH;

                        if ( push !== service ) return;

                        component.viewModel.setPushData(action, service, id, data, bind);
                     }
                  }
               }
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerGridAllViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerGridAll] :: containerGridAllViewModel : onContentLoad");
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
               options = componentM.getOptions(self._myTag, text, self._mydbms);
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

         self._meEvent = {
            onInsert: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onInsert");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args;

               if ( self._myTag === "ERMS_GRID_ALL" ) {
                  args = model.requestJdbcArgs("INSERT", values, self._nexus);

                  model.requestJdbc("INSERT", args, {
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
                     },
                     onResultParam : values
                  });
               }
               else {
                  args = model.requestAdminArgs("INSERT", values, self._nexus);

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
                     },
                     onResultParam : values
                  });
               }
            },
            onUpdate: function( tag, e, oldData, methods, domID ) {
               console.log("## ME ## ["+tag+"] onUpdate");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args;

               if ( self._myTag === "ERMS_GRID_ALL" ) {
                  args = model.requestJdbcArgs("UPDATE", values, self._nexus);

                  model.requestJdbc("UPDATE", args, {
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
               }
               else {
                  args = model.requestAdminArgsUpdate(values, self._nexus);

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
               }
            },
            onDelete: function( tag, e, methods, domID ) {
               console.log("## ME ## ["+tag+"] onDelete");
               var component = components[domID],
                   vm = component.viewModel,
                   model = component.model,
                   values = e.model;
               var args;

               if ( self._myTag === "ERMS_GRID_ALL" ) {
                  args = model.requestJdbcArgs("DELETE", values, self._nexus);

                  model.requestJdbc("DELETE", args, {
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
               else {
                  args = model.requestAdminArgs("DELETE", values, self._nexus);

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
            }
         };

         switch ( tag ) {
            case "ALL_GRID":
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


      return containerGridAllViewModel;

   }
);