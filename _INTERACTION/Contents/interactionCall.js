'use strict';

define([
      "knockout",
      "nxbinder",
      "../Library/interaction.block",
      "../Library/interaction.nxproxy",
      "../Defines/query.define",
      "../Defines/field.define"
   ],
   function( ko, binder, nxBlock,nxproxy,query, field ) {

      function interactionCallViewModel() {

         console.log("[interactionCall] :: interactionCallViewModel : load");
         var self = this;

         require(["nxdefine"], function( define ) {
            console.log("[interactionCall] :: interactionCallViewModel : define load");
            self._define = define;

            var a = nxproxy;
            
            //start point
            self.onInit();
         });

         //html observable
         //self.nxContentsMain = ko.observable();
//         self.nxContentsTop = ko.observable();
         self.nxContentsLeft = ko.observable();
         self.nxContentsMain = ko.observable();
         self.nxContentsRight = ko.observable();

         //templates load
         self._load = {
            
            init : function() {
                var that = this;
                // that._viewTop.init(new nxBlock().set({
                //  root : self._define.ENUM.ROUTE.CALL.KIND
                // //  field : field.CONTENTS.REPORT_QUEUE.TOP
                // }));
                that._viewLeft.init(new nxBlock().set({
                 root : self._define.ENUM.ROUTE.INTER_CALL.KIND,
                 field : field.CONTENTS.INTERACTION.LEFT,
                 query : query.CONTENTS.CALLBACK.getQuery()
                //  selectQuery : query.CONTENTS.CALLBACK.SELECT,
                //  fromQuery : query.CONTENTS.CALLBACK.FROM,
                //  whereQuery : query.CONTENTS.CALLBACK.WHERE
                }));
                that._viewMain.init(new nxBlock().set({
                    root : self._define.ENUM.ROUTE.INTER_CALL.KIND,
                    // field : field.CONTENTS.INTERACTION.RIGHT,
                    // query: query.CONTENTS.INTER_CALL.getQuery()
                   //  field : field.CONTENTS.REPORT_QUEUE.LEFT
                }));

                that._viewRight.init(new nxBlock().set({
                 root : self._define.ENUM.ROUTE.INTER_CALL.KIND,
                 field : field.CONTENTS.INTERACTION.RIGHT,
                 //field : field.CONTENTS.INTERACTION.RIGHT.INTER_CALL.GRID,
                 query: query.CONTENTS.CUSTMER_HIS.getQuery()
                }));
            },

           
             _viewLeft : {
                handle : undefined,
                init : function( nxBlock ) {
                   var it = this,
                       defineBlock = self._setObservable(self.nxContentsLeft, "left");
 
                   it.handle = self._getHandleAfterBind(defineBlock);
                   if ( it.handle === undefined ) return;
 
                   it.handle.onInit(nxBlock.set({define : defineBlock.components}));
                }
             },
             _viewRight : {
                handle : undefined,
                init : function( nxBlock ) {
                   var it = this,
                       defineBlock = self._setObservable(self.nxContentsRight, "right");
 
                   it.handle = self._getHandleAfterBind(defineBlock);
                   if ( it.handle === undefined ) return;
 
                   it.handle.onInit(nxBlock.set({define : defineBlock.components}));
                }
             },
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

      interactionCallViewModel.prototype.onInit = function() {
         console.log("[interactionCall] :: interactionCallViewModel : onInit");
         var self = this;
         self._load.init();
      };

      interactionCallViewModel.prototype._setObservable = function( observable, tag ) {
         var self = this,
             define = self._define;
         var defineBlock = define.getComponentChild(define.ENUM.ROUTE.INTER_CALL.KIND, tag);
         observable(defineBlock["view"]);
         return defineBlock;
      };

      interactionCallViewModel.prototype._getHandleAfterBind = function( defineBlock ) {
         var self = this,
             define = self._define;
         return binder.bind(defineBlock["viewModel"], {tag : define.ENUM.ROUTE.INTER_CALL.KIND});
      };

      return {
         viewModel : interactionCallViewModel,
         domID : "nx-contents-interactioncall"
      };
   }
);