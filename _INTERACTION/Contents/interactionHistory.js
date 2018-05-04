'use strict';

define([
      "knockout",
      "nxbinder",
      "../Library/interaction.block",
      "../Defines/query.define",
      "../Defines/field.define"
   ],
   function( ko, binder, nxBlock,query, field ) {

      function interactionHistoryViewModel() {

         console.log("[interactionhistory] :: interactionHistoryViewModel : load");
         var self = this;

         require(["nxdefine"], function( define ) {
            console.log("[interactionhistory] :: interactionHistoryViewModel : define load");
            self._define = define;

            //start point
            self.onInit();
         });

         //html observable
          self.nxContentsMain = ko.observable();
        //  self.nxContentsTop = ko.observable();
        //self.nxContentsRight = ko.observable();
       

         //templates load
         self._load = {
            init : function() {
                var that = this;
                that._viewMain.init(new nxBlock().set({
                    root : self._define.ENUM.ROUTE.INTER_HOME.KIND,
                    field : field.CONTENTS.INTERACTION.MAIN,
                    query : query.CONTENTS.INTER_HIS.getQuery()
                }));
                
               
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

      interactionHistoryViewModel.prototype.onInit = function() {
         console.log("[interactionHistory] :: interactionHistoryViewModel : onInit");
         var self = this;
         self._load.init();
      };

      interactionHistoryViewModel.prototype._setObservable = function( observable, tag ) {
         var self = this,
             define = self._define;
         var defineBlock = define.getComponentChild(define.ENUM.ROUTE.INTER_HISTORY.KIND, tag);
         observable(defineBlock["view"]);
         return defineBlock;
      };

      interactionHistoryViewModel.prototype._getHandleAfterBind = function( defineBlock ) {
         var self = this,
             define = self._define;
         return binder.bind(defineBlock["viewModel"], {tag : define.ENUM.ROUTE.INTER_HISTORY.KIND});
      };

      return {
         viewModel : interactionHistoryViewModel,
         domID : "nx-contents-interactionhistory"
      };
   }
);