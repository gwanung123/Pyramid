'use strict';

define(["knockout", "../../../Components/components", "../../../ComponentTmpls/componentTmpls"],
   function( ko, _nxcomponent, _nxcomponentTmpl ) {

      var DOMID = "nx-contents-bottom";

      function ViewBottomViewModel( param ) {
         console.log("[viewBottom] :: ViewBottomViewModel : load");

         this._viewPosition = "viewBottom";

         this._nxWindowID = null;
         this._nxBlock = null;
         this._nxWindow = null;
         this._parent = null;

         this._root = null;
         this._nexus = null;
         this._shared = null;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      ViewBottomViewModel.prototype.onTemplatesLoad = function( nxWinID, nxBlock, nxWindow, parent ) {
         var self = this;
         console.log("[viewBottom] :: ViewBottomViewModel : onTemplatesLoad");
         self._nxWindowID = nxWinID;
         self._nxBlock = nxBlock;
         self._nxWindow = nxWindow;

         self._nexus = self._nxBlock.get("nexus");
         self._shared = self._nxBlock.get("shared");
         self._root = nxWindow.get("root");
         self._parent = parent;

         self._setObservableInit();
      };

      ViewBottomViewModel.prototype._setObservableInit = function() {
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

      ViewBottomViewModel.prototype._setObservableComponents = function( define, text, components ) {
         var self = this;

         for ( var idx=0; idx<define.length; idx++ ) {
            var component = define[idx];

            var options = null,
                componentM,
                componentVM;

            if ( component.model !== undefined ) {
               componentM = component.model(component.TAG);
               options = componentM.getOptions(text[component.TAG], self._nexus, self._shared);
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
                           callbacks[push].push({ tag: component.TAG, func: self.onPushMessage, param: self });
                           break;

                        default:
                           callbacks["stats"][push].push({ tag: component.TAG, func: self.onPushMessage, param: self });
                     }
                  }
               }

               if ( component.join !== undefined ) {
                  self._setJoinEvent(component.TAG, component.join, components[component.TAG]);
                  self._parent.loaded(self._viewPosition);
               }
               else {
                  self._setObservableData(component.domID, componentM, componentVM, options);
               }
            }
         }
      };

      ViewBottomViewModel.prototype._setObservableComponentTmpls = function( define, text, components ) {
         var self = this;

         for ( var idx=0; idx<define.length; idx++ ) {
            var template = define[idx];

            var options = null,
                templateM = undefined,
                templateVM = undefined;

            if ( template.model !== undefined ) {
               templateM = template.model(template.TAG);
               options = templateM.getOptions(text[template.TAG], self._nexus, self._shared);
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
                           callbacks[push].push({ tag: template.TAG, func: self.onPushMessage, param: self });
                           break;

                        default:
                           callbacks["stats"][push].push({ tag: template.TAG, func: self.onPushMessage, param: self });
                     }
                  }
               }

               if ( template.join !== undefined ) {
                  self._setJoinEvent(template.TAG, template.join, components[template.TAG]);
                  self._parent.loaded(self._viewPosition);
               }
               else {
                  self._setObservableData(template.domID, templateM, templateVM, options);
               }
            }
         }
      };

      ViewBottomViewModel.prototype._setObservableData = function( domID, m, vm, options ) {
         var self = this;

         if ( m === undefined ) return;

         m.requestData(options, {
            onResult : function( result, error, param ) {
               var self = param;

               if ( error !== null ) return;
               if ( result.hasOwnProperty("result") ) return;

               vm.setData(result, param);

               self._parent.loaded(self._viewPosition);
            },
            onResultParam : self
         });
      };

      ViewBottomViewModel.prototype.onPushMessage = function( pushed, bind, param ) {
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
      ViewBottomViewModel.prototype._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
         };

         switch ( tag ) {
            default: break;
         }
      };

      /**************************************************************************
       * Join Event
       **************************************************************************/
      ViewBottomViewModel.prototype._setJoinEvent = function( tag, join, component ) {
         var self = this;

         self._joinEvent = {
            onSelect : function( tag, e, methods, param ) {
               console.log("## JOIN ## ["+tag+"] onSelect :: "+param.domID);
               var component = param;
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
               case "USER_QUEUE":
                  joinComponent.model.setNexusJoin("onSelect", self._joinEvent.onSelect, component);
                  break;

               default: break;
            }
         }
      };


      return {
         viewModel: ViewBottomViewModel,
         domID: DOMID
      };

   }
);
