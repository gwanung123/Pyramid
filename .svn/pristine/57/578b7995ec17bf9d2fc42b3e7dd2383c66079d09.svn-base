'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define"
   ],
   function( ko, _binder, _TEXT ) {

      var DOMID = "nx-contents-board";

      function boardViewModel( win ) {

         console.log("[board] :: boardViewModel : load");
         var self = this;

         this.winID = win.winID;
         this._nexus = win.winVM.options._nexus;

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[board] :: boardViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.BOARD.TAG;
            self._VIEW = self._nexus.getWindow(self._ROOT, self.winID).view;

            //start point
            self.onContentLoad(self._VIEW);
         });

         //html observable
         this.nxViewTop = ko.observable();
         this.nxViewBottom = ko.observable();
         this.nxViewRight = ko.observable();

         //templates load
         this._setTemplates = {
            nxWin : undefined,
            init : function( view ) {
               var that = this;

               that.nxWin = view.set({
                  root : self._ROOT
               });

               that._viewTop.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.BOARD.TOP
               }, "viewTop"), that);

               that._viewRight.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.BOARD.RIGHT
               }, "viewRight"), that);
            },
            loaded : function( viewPosition ) {
               var that = this;

               if ( viewPosition === "viewRight" ) {
                  that._viewBottom.init(that.nxWin.set({
                     text : _TEXT.CONTENTS.BOARD.BOTTOM
                  }, "viewBottom"), that);
               }
            },
            _viewTop : {
               handle : undefined,
               init : function( nxWin, that ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxViewTop, "viewTop");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  nxWin.set({
                     define : {
                        components: defineBlock.components,
                        componentTmpls: defineBlock.componentTmpls
                     }
                  }, "viewTop");

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin, that);
               }
            },
            _viewBottom : {
               handle : undefined,
               init : function( nxWin, that ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxViewBottom, "viewBottom");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  nxWin.set({
                     define : {
                        components: defineBlock.components,
                        componentTmpls: defineBlock.componentTmpls
                     }
                  }, "viewBottom");

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin, that);
               }
            },
            _viewRight : {
               handle : undefined,
               init : function( nxWin, that ) {
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

                  it.handle.onTemplatesLoad(self.winID, self._nexus, nxWin, that);
               }
            }
         };

      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = boardViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[board] :: boardViewModel : onContentLoad");
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
         viewModel : boardViewModel,
         domID : DOMID
      };

   }
);