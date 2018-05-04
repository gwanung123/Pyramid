'use strict';

define([
      "knockout",
      "../../../Components/components",
      "../../../ComponentTmpls/componentTmpls",
      "nxbinder"
   ],
   function( ko, _nxcomponent, _nxcomponentTmpl, _binder ) {

      var DOMID = "nx-contents-center";

      function ViewCenterViewModel( param ) {
         console.log("[viewCenter] :: ViewCenterViewModel : load");

         this._viewPosition = "viewCenter";

         this._nxWindowID = null;
         this._nxBlock = null;
         this._nxWindow = null;
         this._parent = null;

         this._define = null;
         this._root = null;
         this._dbms = null;
         this._nexus = null;
         this._shared = null;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      ViewCenterViewModel.prototype.onTemplatesLoad = function( nxWinID, nxBlock, nxWindow, _define, parent ) {
         var self = this;
         console.log("[viewCenter] :: ViewCenterViewModel : onTemplatesLoad");
         self._nxWindowID = nxWinID;
         self._nxBlock = nxBlock;
         self._nxWindow = nxWindow;

         self._define = _define;
         self._nexus = self._nxBlock.get("nexus");
         self._shared = self._nxBlock.get("shared");
         self._root = nxWindow.get("root");
         self._dbms = nxWindow.get("dbms");
         self._parent = parent;

         self._setObservableInit();
      };

      ViewCenterViewModel.prototype._setObservableInit = function() {
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

      ViewCenterViewModel.prototype._setObservableComponents = function( define, text, components ) {
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
                  domID        : component.domID,
                  type         : component.type,
                  option       : options,
                  model        : componentM,
                  viewModel    : componentVM,
                  text         : text[component.TAG],
                  push         : component.push,
                  joinBind     : component.joinBind
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

      ViewCenterViewModel.prototype._setObservableComponentTmpls = function( define, text, components ) {
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

      ViewCenterViewModel.prototype._setObservableData = function( domID, m, vm, options, onResultParam ) {
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

      ViewCenterViewModel.prototype.onPushMessage = function( pushed, bind, param ) {
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
      ViewCenterViewModel.prototype._setEvent = function( tag, options, components ) {
         var self = this;

         self._meEvent = {
            onClose : function( tag, itemDomID, methods, domID ) {
               console.log("## ME ## ["+tag+"] onClose: " + itemDomID);
               self._parent.closed(itemDomID);
            }
         };

         switch ( tag ) {
            case "TABSTRIP":
               options.onClose = self._meEvent.onClose;
               break;

            default: break;
         }
      };

      /**************************************************************************
       * Join Event
       **************************************************************************/

      ViewCenterViewModel.prototype._onJoinBind = function( component, subComponent, text, param ) {
         var self = this;
         var date = new Date();

         var contentRoot = subComponent.domID,
             contentTag = subComponent.content,
             content = self._define.getComponent(contentTag);

         var contentID = contentRoot + "-" + date.getTime(),
             options = { options: { _nexus: self._nxBlock } };

         // tabstrip append
         component.viewModel.doAppend([{
            text: text.TITLE,
            content: "<div id=\""+contentID+"\" class=\""+content.css+"\"></div>"
         }]);

         // containerGrid load
         var contentVM = _binder.noneBind(content.viewModel, {
            winID: contentID,
            winVM: options,
            others: param
         });

         return contentVM;
      };

      ViewCenterViewModel.prototype._setJoinEvent = function( tag, join, component ) {
         var self = this;

         self._joinEvent = {
            setPushData : function( tag, action, service, id, data, bind, methods, param ) {
               console.log("## JOIN ## ["+tag+"] setPushData :: "+param.domID);
               var component = param;
               self._parent.setPushData(action, service, id, data, bind);
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
               case "TABSTRIP":
                  joinComponent.model.setNexusJoin("setPushData", self._joinEvent.setPushData, component);
                  break;

               default: break;
            }
         }
      };


      /**************************************************************************
       *
       **************************************************************************/
      return {
         viewModel: ViewCenterViewModel,
         domID: DOMID
      };

   }
);
