'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define"
   ],
   function( ko, _binder, _TEXT ) {

      var DOMID = "nx-contents-user";

      function userViewModel( win ) {

         console.log("[user] :: userViewModel : load");
         var self = this;

         this.winID = win.winID;
         this._nexus = win.winVM.options._nexus;

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[user] :: userViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.USER_DEFINE.TAG;
            self._VIEW = self._nexus.getWindow(self._ROOT, self.winID).view;

            //start point
            self.onContentLoad(self._VIEW);
         });

         //html observable
         this.nxViewTop = ko.observable();
         this.nxViewBottom = ko.observable();

         //templates load
         this._setTemplates = {
            nxWin : undefined,
            init : function( view ) {
               var that = this;

               that.nxWin = view.set({
                  root : self._ROOT
               });

               that._viewTop.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.USER_DEFINE.TOP
               }, "viewTop"), that);

               that._viewBottom.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.USER_DEFINE.BOTTOM
               }, "viewBottom"), that);
            },
            loaded : function( viewPosition ) {
               var that = this;
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
            }
         };

      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = userViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[user] :: userViewModel : onContentLoad");
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
         viewModel : userViewModel,
         domID : DOMID
      };

   }
);