'use strict';

define([
      "text!./Resource/sub/viewResourceLeft.html", "./Resource/sub/viewResourceLeft",
      "text!./Container/sub/viewContainerCenter.html", "./Container/sub/viewContainerCenter"
   ],
   function(
      viewResourceLeftV, viewResourceLeftVM,
      viewContainerCenterV, viewContainerCenterVM
   ) {

      /************************************************************
       * name        : templates
       * url         : Contents/sub/templates.js
       * description : 모든 components를 로드하여 관리한다.
       *               V, VM을 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var templatesVs = {
         viewResourceLeft         : viewResourceLeftV,
         viewContainerCenter      : viewContainerCenterV
      };

      var templatesVMs = {
         viewResourceLeft         : viewResourceLeftVM,
         viewContainerCenter      : viewContainerCenterVM
      };


      return {
         templatesVs  : templatesVs,
         templatesVMs : templatesVMs
      };
   }
);
