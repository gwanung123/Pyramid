'use strict';

define([
      "knockout",
      "nxbinder",
      "../Library/interaction.block",
      "../Defines/query.define",
      "../Defines/field.define"
   ],
   function( ko, binder, nxBlock, query, field ) {

      function interactionMailViewModel() {

         console.log("[interactionMail] :: interactionMailViewModel : load");
         var self = this;

         require(["nxdefine"], function( define ) {
            console.log("[interactionMail] :: interactionMailViewModel : define load");
            self._define = define;

            //start point
            self.onInit();
         });

         //html observable
        

        //  self.nxContentsTop = ko.observable();
         self.nxContentsLeft = ko.observable();
         self.nxContentsMain = ko.observable();
         self.nxContentsRight = ko.observable();

         //templates load
         self._load = {
            // init : function() {
            //    var that = this;
            //    that._viewMain.init(new nxBlock().set({
            //       root : self._define.ENUM.ROUTE.HOME.KIND,
            //       field : field.CONTENTS.MONITOR_QUEUE.MAIN
            //    }));
            init : function() {
                var that = this;
                // that._viewTop.init(new nxBlock().set({
                //  root : self._define.ENUM.ROUTE.CALL.KIND
                // //  field : field.CONTENTS.REPORT_QUEUE.TOP
                // }));
                that._viewLeft.init(new nxBlock().set({
                 root : self._define.ENUM.ROUTE.INTER_MAIL.KIND,
                 field : field.CONTENTS.INTERACTION.LEFT,
                 selectQuery : query.CONTENTS.MAILLIST.SELECT,
                 fromQuery : query.CONTENTS.MAILLIST.FROM,
                 whereQuery : query.CONTENTS.MAILLIST.WHERE
               
                }));
                that._viewMain.init(new nxBlock().set({
                    root : self._define.ENUM.ROUTE.INTER_MAIL.KIND
                   //  field : field.CONTENTS.REPORT_QUEUE.LEFT
                }));
                that._viewRight.init(new nxBlock().set({
                 root : self._define.ENUM.ROUTE.INTER_MAIL.KIND,
                 field : field.CONTENTS.INTERACTION.RIGHT
                //  query: query.CONTENTS.EMPLOYEESTATE.getQuery()
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

      interactionMailViewModel.prototype.onInit = function() {
         console.log("[interactionMail] :: interactionMailViewModel : onInit");
         var self = this;
         self._load.init();
      };

      interactionMailViewModel.prototype._setObservable = function( observable, tag ) {
         var self = this,
             define = self._define;
         var defineBlock = define.getComponentChild(define.ENUM.ROUTE.INTER_MAIL.KIND, tag);
         observable(defineBlock["view"]);
         return defineBlock;
      };

      interactionMailViewModel.prototype._getHandleAfterBind = function( defineBlock ) {
         var self = this,
             define = self._define;
         return binder.bind(defineBlock["viewModel"], {tag : define.ENUM.ROUTE.INTER_MAIL.KIND});
      };

      return {
         viewModel : interactionMailViewModel,
         domID : "nx-contents-interactionmail"
      };
   }
);