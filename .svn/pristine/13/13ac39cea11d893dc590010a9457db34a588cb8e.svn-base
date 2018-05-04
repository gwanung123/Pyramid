'use strict';

define(["knockout", "../../../Components/components", "../../../ComponentTmpls/componentTmpls"],
   function( ko, _nxcomponent, _nxcomponentTmpl ) {

      var DOMID = "nx-contents-left";

      function ViewLeftViewModel( param ) {
         console.log("[viewLeft] :: ViewLeftViewModel : load");

         this._viewPosition = "viewLeft";

         this._nxWindowID = null;
         this._nxBlock = null;
         this._nxWindow = null;

         this._root = null;
         this._dbms = null;
         this._nexus = null;
         this._shared = null;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      ViewLeftViewModel.prototype.onTemplatesLoad = function( nxWinID, nxBlock, nxWindow ) {
         var self = this;
         console.log("[viewLeft] :: ViewLeftViewModel : onTemplatesLoad");
         self._nxWindowID = nxWinID;
         self._nxBlock = nxBlock;
         self._nxWindow = nxWindow;

         self._nexus = self._nxBlock.get("nexus");
         self._shared = self._nxBlock.get("shared");
         self._root = nxWindow.get("root");
         self._dbms = nxWindow.get("dbms");

         self._setObservableInit();
      };

      ViewLeftViewModel.prototype._setObservableInit = function() {
         var self = this;
         var define = self._nxWindow.get("define", self._viewPosition),
             text = self._nxWindow.get("text", self._viewPosition),
             components = self._nxWindow.get("components", self._viewPosition);

         if ( define.componentTmpls !== undefined ) {
            self._setObservableComponentTmpls(define.componentTmpls, text, components);
         }

         if ( define.components !== undefined ) {
            self._setObservableComponents(define.components, text, components);
         }
      };

      ViewLeftViewModel.prototype._setObservableComponents = function( define, text, components ) {
         var self = this;

         for ( var idx=0; idx<define.length; idx++ ) {
            var component = define[idx];

            var options = null,
                componentM,
                componentVM;

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text[component.TAG], self._nexus, self._shared, self._dbms);
               self._setEvent(component.TAG, options, components);
            }

            componentVM = _nxcomponent.onComponentLoad(component.TAG,
                                                     component.type,
                                                     component.domID,
                                                     options);

            if ( componentVM ) {
               components[component.TAG] = {
                  domID     : component.domID,
                  type      : component.type,
                  option    : options,
                  model     : componentM,
                  viewModel : componentVM,
                  text      : text[component.TAG],
                  push      : component.push
               };

               if ( component.push !== undefined ) {
                  var callbacks = self._shared.pushCallbacks;

                  for ( var i=0; i<component.push.length; i++ ) {
                     var push = component.push[i];

                     switch ( push ) {
                        case "master":
                           callbacks[push].push({ func: self.onPushMessage, param: self });
                           break;

                        default:
                           callbacks["stats"][push].push({ func: self.onPushMessage, param: self });
                     }
                  }
               }

               if ( component.join !== undefined ) {
                  self._setJoinEvent(component.TAG, component.join, components[component.TAG]);
               }
               else {
                  self._setObservableData(component.domID, componentM, componentVM, options);
               }
            }
         }
      };

      ViewLeftViewModel.prototype._setObservableComponentTmpls = function( define, text, components ) {
         var self = this;

         for ( var idx=0; idx<define.length; idx++ ) {
            var template = define[idx];

            var options = null,
                templateM = undefined,
                templateVM = undefined;

            if ( template.model !== undefined ) {
               templateM = template.model(template.TAG);
               options = templateM.getOptions(text[template.TAG], self._nexus, self._shared, self._dbms);
               self._setEvent(template.TAG, options, components);
            }

            templateVM = _nxcomponentTmpl.onComponentTmplLoad(template.TAG,
                                                            template.type,
                                                            template.domID,
                                                            options);

            if ( templateVM ) {
               components[template.TAG] = {
                  domID     : template.domID,
                  type      : template.type,
                  option    : options,
                  model     : templateM,
                  viewModel : templateVM,
                  text      : text[template.TAG],
                  push      : template.push
               };

               if ( template.push !== undefined ) {
                  var callbacks = self._shared.pushCallbacks;

                  for ( var i=0; i<template.push.length; i++ ) {
                     var push = template.push[i];

                     switch ( push ) {
                        case "master":
                           callbacks[push].push({ func: self.onPushMessage, param: self });
                           break;

                        default:
                           callbacks["stats"][push].push({ func: self.onPushMessage, param: self });
                     }
                  }
               }

               if ( template.join !== undefined ) {
                  self._setJoinEvent(template.TAG, template.join, components[template.TAG]);
               }
               else {
                  self._setObservableData(template.domID, templateM, templateVM, options);
               }
            }
         }
      };

      ViewLeftViewModel.prototype._setObservableData = function( domID, m, vm, options, onResultParam ) {
         if ( m === undefined ) return;

         m.requestData(options, {
            onResult : function(result, error, param) {
               if ( error !== null ) return;
               if ( result.hasOwnProperty("result") ) return;
               vm.setData(result, param);
            },
            onResultParam : onResultParam
         });
      };

      ViewLeftViewModel.prototype.onPushMessage = function( pushed, bind, param ) {
         var self = param;
         var components = self._nxWindow.get("components", self._viewPosition);
         var component = components[pushed.tag],
             arrData = pushed.data;

         if ( component === undefined ) return;

         var items = component.option.nexus.items;

         if ( items === undefined ) {
            var action = arrData[0].ACTION,
                service = arrData[0].SERVICE,
                id = arrData[0].ID,
                data = component.model.getPushData(arrData[0]);
            component.viewModel.setPushData(action, service, id, data, bind);
            return;
         }

         for ( var i=0; i<items.length; i++ ) {
            var item = items[i],
                arrDataLen = arrData.length;

            for ( var j=0; j<arrDataLen; j++ ) {
               var action = arrData[j].ACTION,
                   service = arrData[j].SERVICE,
                   id = arrData[j].ID,
                   data = component.model.getPushData(arrData[j]);

               if ( item !== id ) continue;
               component.viewModel.setPushData(action, service, id, data, bind);
               break;
            }
         }
      };

      /**************************************************************************
       * Event
       **************************************************************************/
      ViewLeftViewModel.prototype._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
            setData : function( tag, data, methods, param ) {
               console.log("## ME ## ["+tag+"] setData");
               var asis = methods.getData("AS_IS");

               switch ( tag ) {
                  case "TREEVIEW_CAMPAIGN":
                     self._nxBlock.set({ _campaign: asis }, "shared");
                     break;
               }
            }
         };

         switch ( tag ) {
            case "TREEVIEW_CAMPAIGN":
               options.setData = self._meEvent.setData;
               break;

            default: break;
         }
      };

      /**************************************************************************
       * Join Event
       **************************************************************************/
      ViewLeftViewModel.prototype._setJoinEvent = function( tag, join, component ) {
         var self = this;

         self._joinEvent = {
            setPushData : function( tag, action, service, id, data, bind, methods, param ) {
               console.log("## JOIN ## ["+tag+"] setPushData :: "+param.domID);
               var component = param;

               component.viewModel.setPushData(action, service, id, data, bind);

               var asis = component.viewModel.getData("AS_IS");
               switch ( component.model.tag ) {
                  case "TREEVIEW_CAMPAIGN":
                     self._nxBlock.set({ _campaign: asis }, "shared");
                     break;
               }
            }
         };

         for ( var i=0; i<join.length; i++ ) {
            var arrJoin = join[i].split("."),
                joinRoot = arrJoin[0],
                joinPos = arrJoin[1],
                joinTag = arrJoin[2],
                joinID = "nx-contents-div-"+joinRoot,
                joinInfo = self._nxBlock.getWindow(joinRoot, joinID);

            if ( joinRoot === self._root ) {
               joinInfo = self._nxBlock.getWindow(joinRoot, self._nxWindowID);
            }

            if ( joinInfo === null ) return;

            var joinView = joinInfo.view,
                components = joinView.get("components", joinPos),
                joinComponent = components[joinTag];

            if ( joinComponent === undefined ) return;

            switch ( tag ) {
               case "TREEVIEW_CAMPAIGN":
                  joinComponent.model.setNexusJoin("setPushData", self._joinEvent.setPushData, component);
                  break;

               default: break;
            }
         }
      };


      return {
         viewModel: ViewLeftViewModel,
         domID: DOMID
      };

   }
);
