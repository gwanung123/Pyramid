'use strict';

define([
      "knockout",
      "../../../Components/components",
      "../../../ComponentTmpls/componentTmpls",
      "../../../Library/monitor.calc"
   ],
   function( ko, _Component, _ComponentTmpl, _Calc ) {

      var DOMID = "nx-contents-center";

      function ViewCenterViewModel( param ) {
         console.log("[viewCenter] :: ViewCenterViewModel : load");

         this._viewPosition = "viewCenter";

         this._nxWindowID = null;
         this._nxBlock = null;
         this._nxWindow = null;

         this._root = null;
         this._nexus = null;
         this._shared = null;

         this.nxTXTServiceLevel = ko.observable();
         this.nxVALServiceLevel = ko.observable();
         this.nxTXTAnswerRate = ko.observable();
         this.nxVALAnswerRate = ko.observable();
         this.nxTXTRealEnter = ko.observable();
         this.nxVALRealEnter = ko.observable();
         this.nxTXTWaitCall = ko.observable();
         this.nxVALWaitCall = ko.observable();
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      ViewCenterViewModel.prototype.onTemplatesLoad = function( nxWinID, nxBlock, nxWindow ) {
         var self = this;
         console.log("[viewCenter] :: ViewCenterViewModel : onTemplatesLoad");
         self._nxWindowID = nxWinID;
         self._nxBlock = nxBlock;
         self._nxWindow = nxWindow;

         self._nexus = self._nxBlock.get("nexus");
         self._shared = self._nxBlock.get("shared");
         self._root = nxWindow.get("root");

         self._setObservableInit();
      };

      ViewCenterViewModel.prototype._setObservableInit = function() {
         var self = this;
         var define = self._nxWindow.get("define", self._viewPosition),
             text = self._nxWindow.get("text", self._viewPosition),
             components = self._nxWindow.get("components", self._viewPosition);

         self.nxTXTServiceLevel(text.SERVICE_LEVEL.TITLE);
         self.nxVALServiceLevel(text.SERVICE_LEVEL.DEFAULT);
         self.nxTXTAnswerRate(text.ANSWER_RATE.TITLE);
         self.nxVALAnswerRate(text.ANSWER_RATE.DEFAULT);
         self.nxTXTRealEnter(text.REAL_ENTER.TITLE);
         self.nxVALRealEnter(text.REAL_ENTER.DEFAULT);
         self.nxTXTWaitCall(text.WAITING_CALL.TITLE);
         self.nxVALWaitCall(text.WAITING_CALL.DEFAULT);

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
               options = componentM.getOptions(text[component.TAG], self._nexus, self._shared);
               self._setEvent(component.TAG, options, components);
            }

            componentVM = _Component.onComponentLoad(component.TAG,
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
               options = templateM.getOptions(text[template.TAG], self._nexus, self._shared);
               self._setEvent(template.TAG, options, components);
            }

            templateVM = _ComponentTmpl.onComponentTmplLoad(template.TAG,
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
         };

         switch ( tag ) {
            default: break;
         }
      };

      /**************************************************************************
       * Join Event
       **************************************************************************/
      ViewCenterViewModel.prototype._setJoinEvent = function( tag, join, component ) {
         var self = this;

         self._joinEvent = {
            setData : function( tag, data, methods, param ) {
               var component = param;

               console.log("## JOIN ## ["+tag+"] setData :: "+param.domID);

               switch ( tag ) {
                  case "QUEUE_LISTBOX":
                     //QUEUE_STATS
                     var me = component.model.tag,
                         push = component.push;
                     var items = component.model.setItems(data),
                         pusher = self._shared.pusher,
                         pushParams;

                     if ( items === 0 ) {
                        component.viewModel.setData();
                        pushParams = pusher.getParams(pushParams, me, push[0]);
                        pusher.onEventPushing(pushParams);
                     }
                     else {
                        self._setObservableData(component.domID,
                                                component.model,
                                                component.viewModel,
                                                component.option);
                        pushParams = pusher.getParams(pushParams, me, push[0], {
                           items: component.model.getItems()
                        });
                        pusher.onEventPushing(pushParams);
                     }
                     break;

                  case "QUEUE_STATS":
                     //DONUTCHART
                     component.viewModel.setData(data);
                     //TOP
                     self._setCalcData(data);
                     break;
               }
            },
            setPushData : function( tag, action, service, id, data, bind, methods, param ) {
               console.log("## JOIN ## ["+tag+"] setPushData :: "+param.domID);
               var component = param;
               //DONUTCHART
               component.viewModel.setData(data);
               //TOP
               self._setCalcData(data);
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
               case "QUEUE_STATS":
                  joinComponent.model.setNexusJoin("setData", self._joinEvent.setData, component);
                  component.viewModel.setData();
                  break;

               case "DONUTCHART":
                  joinComponent.model.setNexusJoin("setData", self._joinEvent.setData, component);
                  joinComponent.model.setNexusJoin("setPushData", self._joinEvent.setPushData, component);
                  component.viewModel.setData();
                  break;

               default: break;
            }
         }
      };

      /**************************************************************************
       * TOP Event
       **************************************************************************/
      ViewCenterViewModel.prototype._setCalcData = function( data ) {
         var self = this;
         var text = self._nxWindow.get("text", self._viewPosition),
             realData = data[0];

         var _doCalculation = function( data, calc, etc ) {
            for( var key in data ) {
               var val = data[key]*1;
               var regex = new RegExp("@="+key, "g");
               calc = calc.replace(regex, val);
            }

            for( var key in etc ) {
               var val = etc[key]*1;
               var regex = new RegExp("@="+key, "g");
               calc = calc.replace(regex, val);
            }

            return _Calc(calc);
         };

         var etc = {};

         var waitingCall = _doCalculation(realData, text.WAITING_CALL.BIND);
         self.nxVALWaitCall(waitingCall);

         var realEnter = _doCalculation(realData, text.REAL_ENTER.BIND);
         self.nxVALRealEnter(realEnter);

         etc["REAL_ENTER"] = realEnter;

         var serviceLevel = _doCalculation(realData, text.SERVICE_LEVEL.BIND, etc);
         self.nxVALServiceLevel(serviceLevel.toFixed(1));

         var answerRate = _doCalculation(realData, text.ANSWER_RATE.BIND, etc);
         self.nxVALAnswerRate(answerRate.toFixed(1));
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
