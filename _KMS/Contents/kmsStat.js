'use strict';

define([
      "knockout",
      "nxbinder",
      "../Library/kms.block",
      "../Defines/query.define",
      "../Defines/field.define"
   ],
   function( ko, binder, nxBlock,query, field ) {

      function kmsStatViewModel() {

         console.log("[kms stat] :: kmsStatViewModel : load");
         var self = this;

         require(["nxdefine"], function( define ) {
            console.log("[kms stat] :: kmsStatViewModel : define load");
            self._define = define;

            //start point
            self.onInit();
         });

         //html observable
        //  self.nxContentsTop = ko.observable();
        //  self.nxContentsLeft = ko.observable();
         self.nxContentsRight = ko.observable();

         //templates load
         self._load = {
            init : function() {
               var that = this;
            //    that._viewTop.init(new nxBlock().set({
            //       root : self._define.ENUM.ROUTE.QUEUE.KIND,
            //       field : field.CONTENTS.REPORT_QUEUE.TOP
            //    }));
            //    that._viewLeft.init(new nxBlock().set({
            //     root : self._define.ENUM.KMS.STAT.KIND
            //     //   field : field.CONTENTS.REPORT_QUEUE.LEFT
            //    }));
               that._viewRight.init(new nxBlock().set({
                  root : self._define.ENUM.KMS.STAT.KIND,
                  field : field.CONTENTS.REPORT_QUEUE.RIGHT,
                  query: query.CONTENTS.STAT.getQuery(),
                //   field : field.CONTENTS.REPORT_QUEUE.RIGHT,
                //   selectQuery : query.CONTENTS.QUEUESTATL.select,
                //   fromQuery : query.CONTENTS.QUEUESTATL.from ,
                //   whereQuery : query.CONTENTS.QUEUESTATL.where,
                //   endQuery :  query.CONTENTS.QUEUESTATL.endQuery()
               }));
            },
            // _viewTop : {
            //    handle : undefined,
            //    init : function( nxBlock ) {
            //       var it = this,
            //           defineBlock = self._setObservable(self.nxContentsTop, "top");

            //       it.handle = self._getHandleAfterBind(defineBlock);
            //       if ( it.handle === undefined ) return;

            //       it.handle.onInit(nxBlock.set({define : defineBlock.components}));
            //    }
            // },
            // _viewLeft : {
            //    handle : undefined,
            //    init : function( nxBlock ) {
            //       var it = this,
            //           defineBlock = self._setObservable(self.nxContentsLeft, "left");

            //       it.handle = self._getHandleAfterBind(defineBlock);
            //       if ( it.handle === undefined ) return;

            //       it.handle.onInit(nxBlock.set({define : defineBlock.components}));
            //    }
            // },
            _viewRight : {
               handle : undefined,
               init : function( nxBlock ) {
                  var it = this,
                      defineBlock = self._setObservable(self.nxContentsRight, "right");

                  it.handle = self._getHandleAfterBind(defineBlock);
                  if ( it.handle === undefined ) return;

                  it.handle.onInit(nxBlock.set({define : defineBlock.components}));
               }
            }
         };

      };

      kmsStatViewModel.prototype.onInit = function() {
         console.log("[kms stat] :: kmsStatViewModel : onInit");
         var self = this;
         self._load.init();
      };

      kmsStatViewModel.prototype._setObservable = function( observable, tag ) {
         var self = this,
             define = self._define;
         var defineBlock = define.getComponentChild(define.ENUM.KMS.STAT.KIND, tag);
         observable(defineBlock["view"]);
         return defineBlock;
      };

      kmsStatViewModel.prototype._getHandleAfterBind = function( defineBlock ) {
         var self = this,
             define = self._define;
         return binder.bind(defineBlock["viewModel"], {tag : define.ENUM.KMS.STAT.KIND});
      };

      return {
         viewModel : kmsStatViewModel,
         domID : "nx-contents-queue"
      };
   }
);