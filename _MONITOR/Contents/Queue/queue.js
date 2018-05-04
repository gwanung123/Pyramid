'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( ko, _binder, _TEXT, _components ) {

      var DOMID = "nx-contents-queue";

      function queueViewModel( win ) {

         console.log("[queue] :: queueViewModel : load");
         var self = this;

         this.winID = win.winID;
         this._nexus = win.winVM.options._nexus;

         //require define
         require(["nxdefine"], function( define ) {
            console.log("[queue] :: queueViewModel : define load");
            self._DEFINE = define;
            self._ROOT = self._DEFINE.MENU.QUEUE.TAG;
            self._VIEW = self._nexus.getWindow(self._ROOT, self.winID).view;

            //start point
            self.onContentLoad(self._VIEW);
         });

         //html observable
         this.nxViewLeft = ko.observable();
         this.nxViewCenter = ko.observable();
         this.nxViewRight = ko.observable();

         //templates load
         this._setTemplates = {
            nxWin : undefined,
            init : function( view ) {
               var that = this;

               _components.onComponentLoad(self._ROOT, "KENDO.SPLITTER", DOMID, {
                  panes: [
                     { collapsible: true, size: "230px", min: "230px", max: "230px" },
                     { collapsible: false },
                     { collapsible: true, collapsed: true, size: "100px", min: "100px", max: "100px" }
                  ]
               });

               that.nxWin = view.set({
                  root : self._ROOT
               });

               that._viewLeft.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.QUEUE.LEFT
               }, "viewLeft"));

               that._viewRight.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.QUEUE.RIGHT
               }, "viewRight"));

               that._viewCenter.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.QUEUE.CENTER
               }, "viewCenter"));
            },
            _viewLeft : {
               handle : undefined,
               init : function( nxWin ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxViewLeft, "viewLeft");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  nxWin.set({
                     define : {
                        components: defineBlock.components,
                        componentTmpls: defineBlock.componentTmpls
                     }
                  }, "viewLeft");

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin);
               }
            },
            _viewCenter : {
               handle : undefined,
               init : function( nxWin ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxViewCenter, "viewCenter");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  nxWin.set({
                     define : {
                        components: defineBlock.components,
                        componentTmpls: defineBlock.componentTmpls
                     }
                  }, "viewCenter");

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin);
               }
            },
            _viewRight : {
               handle : undefined,
               init : function( nxWin ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxViewRight, "viewRight");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  nxWin.set({
                     define : {
                        components: defineBlock.components,
                        componentTmpls: defineBlock.componentTmpls
                     }
                  }, "viewRight");

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin);
               }
            }
         };

      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = queueViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[queue] :: queueViewModel : onContentLoad");
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
         viewModel : queueViewModel,
         domID : DOMID
      };

   }
);