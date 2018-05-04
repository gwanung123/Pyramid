'use strict';

define([
      "text!./Board/sub/viewBoardCenter.html", "./Board/sub/viewBoardCenter",
      "text!./Setting/sub/viewSettingCenter.html", "./Setting/sub/viewSettingCenter"
   ],
   function(
      viewBoardCenterV, viewBoardCenterVM,
      viewSettingCenterV, viewSettingCenterVM
   ) {

      /************************************************************
       * name        : templates
       * url         : Contents/sub/templates.js
       * description : 모든 components를 로드하여 관리한다.
       *               V, VM을 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var templatesVs = {
         viewBoardCenter        : viewBoardCenterV,
         viewSettingCenter      : viewSettingCenterV
      };

      var templatesVMs = {
         viewBoardCenter        : viewBoardCenterVM,
         viewSettingCenter      : viewSettingCenterVM
      };


      return {
         templatesVs  : templatesVs,
         templatesVMs : templatesVMs
      };
   }
);
