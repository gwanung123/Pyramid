'use strict';

define([
      "text!./Board/board.html", "./Board/board",
      "text!./Setting/setting.html", "./Setting/setting"
   ],
   function(
      boardV, boardVM,
      settingV, settingVM
   ) {

      /************************************************************
       * name        : contents
       * url         : Contents/contents.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var contentsVs = {
         board       : boardV,
         setting     : settingV
      };

      var contentsVMs = {
         board       : boardVM,
         setting     : settingVM
      };


      return {
         contentsVs  : contentsVs,
         contentsVMs : contentsVMs
      };
   }
);