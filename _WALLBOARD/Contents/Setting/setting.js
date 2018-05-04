'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( ko, _binder, _TEXT, _components ) {

      var DOMID = "nx-contents-setting";

      function settingViewModel( win ) {

         console.log("[setting] :: settingViewModel : load");
         var self = this;

         this.winID = win.winID;
         this._nexus = win.winVM.options._nexus;

         //require define
         require(["nxdefine"], function( define ) {
            console.log("[setting] :: settingViewModel : define load");
            self._DEFINE = define;
            self._ROOT = self._DEFINE.MENU.SETTING.TAG;
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
                  root : self._ROOT
               });

               that._viewCenter.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.SETTING.CENTER
               }, "viewCenter"));

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
            }
         };

      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = settingViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[setting] :: settingViewModel : onContentLoad");
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
         viewModel : settingViewModel,
         domID : DOMID
      };

   }
);