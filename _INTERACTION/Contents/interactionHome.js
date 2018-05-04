'use strict';

define([
      "knockout",
      "nxbinder",
      "../Library/interaction.block",
      "../Defines/query.define",
      "../Defines/field.define"
   ],
   function( ko, binder, nxBlock,query, field ) {

      function interactionHomeViewModel() {

         console.log("[interactionHome] :: interactionHomeViewModel : load");
         var self = this;

         require(["nxdefine"], function( define ) {
            console.log("[interactionHome] :: interactionHomeViewModel : define load");
            self._define = define;

            //start point
            self.onInit();
         });

         //html observable
         self.nxContentsMain = ko.observable();
        //  self.nxContentsTop = ko.observable();
       

         //templates load
         self._load = {
            init : function() {
                var that = this;
                that._viewMain.init(new nxBlock().set({
                    root : self._define.ENUM.ROUTE.INTER_HOME.KIND,
                    field : field.CONTENTS.INTERACTION.MAIN,
                    query : query.CONTENTS.INTER_HOME.getQuery()
                }));
                // that._viewTop.init(new nxBlock().set({
                //  root : self._define.ENUM.ROUTE.INTER_HOME.KIND
                //  field : field.CONTENTS.REPORT_QUEUE.TOP
                // }));
               
            },

            // _viewTop : {
            //     handle : undefined,
            //     init : function( nxBlock ) {
            //        var it = this,
            //            defineBlock = self._setObservable(self.nxContentsTop, "top");
 
            //        it.handle = self._getHandleAfterBind(defineBlock);
            //        if ( it.handle === undefined ) return;
 
            //        it.handle.onInit(nxBlock.set({define : defineBlock.components}));
            //     }
            //  },
                      
            _viewMain : {
               handle : undefined,
               init : function( nxBlock ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxContentsMain, "main");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  it.handle.onInit(nxBlock.set({define : defineBlock.components}));
               }
            }


         };

      };

      interactionHomeViewModel.prototype.onInit = function() {
         console.log("[interactionHome] :: interactionHomeViewModel : onInit");
         var self = this;
         self._load.init();
      };

      interactionHomeViewModel.prototype._setObservable = function( observable, tag ) {
         var self = this,
             define = self._define;
         var defineBlock = define.getComponentChild(define.ENUM.ROUTE.INTER_HOME.KIND, tag);
         observable(defineBlock["view"]);
         return defineBlock;
      };

      interactionHomeViewModel.prototype._getHandleAfterBind = function( defineBlock ) {
         var self = this,
             define = self._define;
         return binder.bind(defineBlock["viewModel"], {tag : define.ENUM.ROUTE.INTER_HOME.KIND});
      };

      return {
         viewModel : interactionHomeViewModel,
         domID : "nx-contents-interactionhome"
      };
   }
);