'use strict';

define([
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( _binder, _TEXT, _Components ) {

      function containerGridDNViewModel( win ) {

         console.log("[containerGridDN] :: containerGridDNViewModel : load");
         var self = this;

         this._domID = win.winID;
         this._postfix = this._domID.split("-")[1];

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         this._myTag = win.others.joinBind.TAG;
         this._mydbms = this._dbms[win.others.joinBind.dbms];
         this._shared = this._nexus.get("shared");

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[containerGridDN] :: containerGridDNViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER_GRID_DN.TAG;

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
               tabStrip : undefined,
               init : function() {
                  var it = this;
                  var text = self._getText(win.others.joinBind.text),
                      defineBlock = self._setObservable("viewCenter");
                  var me = $.extend(true, {}, defineBlock);

                  me.domID = me.css + "-" + self._postfix;
                  _binder.appendDIV(self._domID, me.domID, me.css);

                  it.tabStrip = _Components.onComponentLoad(self._ROOT, "KENDO.TABSTRIP", me.domID, {
                     dataTextField: "text",
                     dataContentField: "content",
                     data: [
                        {
                           text: text[me.components[0].TAG].TITLE,
                           content: "<div id=\""+me.components[0].domID+"\" class=\""+me.components[0].domID+"\"></div>"
                        },
                        {
                           text: text[me.components[1].TAG].TITLE,
                           content: "<div id=\""+me.components[1].domID+"\" class=\""+me.components[1].domID+"\"></div>"
                        }
                     ]
                  });

                  it.handle = self._getHandleAfterBind(text, me);
                  if ( it.handle === undefined ) return;

                  it.requestData();
                  it.tabStrip.doSelect("li:first");
               },
               requestData : function() {
                  var it = this;

                  for ( var domID in it.handle ) {
                     var component = it.handle[domID],
                         model = component.model,
                         vm = component.viewModel,
                         options = component.option;

                     if ( component.type === "KENDO.GRID" ) {
                        model.requestData(options, {
                           onResult : function( result, error, param ) {
                              var viewModel = param;
                              if ( error !== null ) return;
                              if ( result.hasOwnProperty("result") ) return;
                              viewModel.setData(result, param);
                           },
                           onResultParam : vm
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

                        var media_id = parseInt(data["MEDIA_ID"]);

                        if ( component.tag === "DN_CALL_GRID" && media_id >= 10 ) continue;
                        if ( component.tag === "DN_UQ_GRID" && media_id < 10 ) continue;

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
      var _ptt = containerGridDNViewModel.prototype;

      _ptt.onContentLoad = function() {
         console.log("[containerGridDN] :: containerGridDNViewModel : onContentLoad");
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
               options = componentM.getOptions(self._myTag, text[component.TAG], self._mydbms, self._shared);
               self._setEvent(component.TAG, options, components);
            }

            componentVM = _Components.onComponentLoad(component.TAG,
                                                      component.type,
                                                      component.domID,
                                                      options);

            components[component.domID] = {
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
            case "DN_UQ_GRID":
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


      return containerGridDNViewModel;

   }
);