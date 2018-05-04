'use strict';

define([
      "text!./kendo_board.html", "./kendo_board",
   ],
   function(
      tmplBoardV, tmplBoardVM,
   ) {

      /************************************************************
       * name        : componentTmpls
       * url         : ComponentTmpls/componentTmpls.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var componentTmplsVs = {
         tmplBoard   :   tmplBoardV
      };

      var componentTmplsVMs = {
         tmplBoard   :   tmplBoardVM
      };


      return {
         componentTmplsVs    : componentTmplsVs,
         componentTmplsVMs   : componentTmplsVMs,
         onComponentTmplLoad : function( tag, type, domID, options ) {
            switch ( type ) {
               case "KENDO.WALLBOARD.ITEM":
                  $("#"+domID).html(this.componentTmplsVs.tmplBoard);
                  return new this.componentTmplsVMs.tmplBoard(tag, domID, options);
            }
         }
      };
   }
);