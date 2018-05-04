'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define"
   ],
   function( ko, _binder, _TEXT ) {

      var DOMID = "nx-contents-container";

      function containerViewModel( win ) {

         console.log("[container] :: containerViewModel : load");
         var self = this;

         this.winID = win.winID;

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[container] :: containerViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.CONTAINER.TAG;
            self._VIEW = self._nexus.getWindow(self._ROOT, self.winID).view;

            //start point
            self.onContentLoad(self._VIEW);
         });

         //html observable
         this.nxViewCenter = ko.observable();

         //templates load
         this._setTemplates = {
            nxWin : undefined,
            init : function( view ) {
               var that = this;

               that.nxWin = view.set({
                  root : self._ROOT,
                  dbms : self._dbms.CONTAINER
               });

               that._viewCenter.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.CONTAINER.CENTER
               }, "viewCenter"));
            },
            _viewCenter : {
               handle : undefined,
               tabs : {},
               init : function( nxWin ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxViewCenter, "viewCenter");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  nxWin.set({
                     define : {
                        components: defineBlock.components,
                        componentTmpls: defineBlock.componentTmpls
                     },
                     methods: {
                        doAppend: { exe: it.append, arg: it.handle, it: it }
                     }
                  }, "viewCenter");

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin, self._DEFINE, it);
               },
               append : function( arg, component, subComponent, text, param ) {
                  var methods = this,
                      there = arg;

                  if ( component.type === "KENDO.TABSTRIP" ) {
                     var vm = there._onJoinBind(component, subComponent, text, param);
                     component.viewModel.doSelect("li:last");
                     methods.it.tabs[vm._domID] = vm;
                     return vm;
                  }
               },
               closed : function( itemDomID ) {
                  var it = this;
                  delete(it.tabs[itemDomID]);
               },
               setPushData : function( action, service, id, data, bind ) {
                  var it = this;

                  for ( var domID in it.tabs ) {
                     var vm = it.tabs[domID];
                     vm.setPushData(action, service, id, data, bind);
                  }
               }
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = containerViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[container] :: containerViewModel : onContentLoad");
         var self = this;
         self._setTemplates.init(view);
      };

      _ptt._setObservable = function( observable, position ) {
         var self = this;
         var defineBlock = self._DEFINE.getComponentChild(self._ROOT, position);
         observable(defineBlock["view"]);
         return defineBlock;
      };

      _ptt._getHandleAfterBind = function( defineBlock ) {
         var self = this;
         return _binder.bind(defineBlock["viewModel"], {root : self._ROOT});
      };


      return {
         viewModel : containerViewModel,
         domID : DOMID
      };

   }
);