'use strict';

define([
      "knockout",
      "nxbinder",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( ko, _binder, _TEXT, _components ) {

      var DOMID = "nx-contents-agentStats";

      function agentStatsViewModel( win ) {

         console.log("[agentStats] :: agentStatsViewModel : load");
         var self = this;

         this.winID = win.winID;
         this._nexus = win.winVM.options._nexus;

         //require define
         require(["nxdefine"], function( define ) {
            console.log("[agentStats] :: agentStatsViewModel : define load");
            self._DEFINE = define;
            self._ROOT = self._DEFINE.MENU.AGENT_STATS.TAG;
            self._VIEW = self._nexus.getWindow(self._ROOT, self.winID).view;

            //start point
            self.onContentLoad(self._VIEW);
         });

         //html observable
         this.nxViewLeft = ko.observable();
         this.nxViewRight = ko.observable();

         //templates load
         this._setTemplates = {
            nxWin : undefined,
            init : function( view ) {
               var that = this;

               _components.onComponentLoad(self._ROOT, "KENDO.SPLITTER", DOMID, {
                  panes: [
                     { collapsible: true, size: "230px", min: "230px", max: "230px" },
                     { collapsible: false }
                  ]
               });

               that.nxWin = view.set({
                  root : self._ROOT
               });

               that._viewLeft.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.AGENT_STATS.LEFT
               }, "viewLeft"));

               that._viewRight.init(that.nxWin.set({
                  text : _TEXT.CONTENTS.AGENT_STATS.RIGHT
               }, "viewRight"));
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
      var _ptt = agentStatsViewModel.prototype;

      _ptt.onContentLoad = function( view ) {
         console.log("[agentStats] :: agentStatsViewModel : onContentLoad");
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
         viewModel : agentStatsViewModel,
         domID : DOMID
      };

   }
);