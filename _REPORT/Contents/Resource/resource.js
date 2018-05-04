'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define"
   ],
   function( ko, _binder, _TEXT ) {

      var DOMID = "nx-contents-resource";

      function resourceViewModel( win ) {

         console.log("[resource] :: resourceViewModel : load");
         var self = this;

         this.winID = win.winID;

         this._nexus = win.winVM.options._nexus;
         this._dbms = this._nexus.get("dbms");

         //require define
         require(["nxdefine"], function( _define ) {
            console.log("[resource] :: resourceViewModel : define load");
            self._DEFINE = _define;
            self._ROOT = self._DEFINE.MENU.RESOURCE.TAG;
            self._VIEW = self._nexus.getWindow(self._ROOT, self.winID).view;

            //start point
            self.onContentLoad(self._VIEW);
         });

         //html observable
         this.nxViewLeft = ko.observable();

         //templates load
         this._setTemplates = {
            nxWin : undefined,
            init : function( view ) {
               var that = this;

               that.nxWin = view.set({
                  root : self._ROOT,
                  dbms : self._dbms.RESOURCE
               });

               that._viewLeft.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.RESOURCE.LEFT
               }, "viewLeft"));
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
            }
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//
      var _ptt = resourceViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[resource] :: resourceViewModel : onContentLoad");
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
         viewModel : resourceViewModel,
         domID : DOMID
      };

   }
);