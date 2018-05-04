'use strict';

define([
      "text!./viewTop.html", "./viewTop",
      "text!./viewLeft.html", "./viewLeft",
      "text!./viewRight.html", "./viewRight",
      "text!./viewRightStat.html", "./viewRightStat",
      "text!./viewMain.html", "./viewMain"
   ],
   function(
      view_topV, view_topVM,
      view_leftV, view_leftVM,
      view_rightV, view_rightVM,
      view_rightStatV, view_rightStatVM,
      view_mainV, view_mainVM
   ) {

      /************************************************************
       * name        : subTemplates
       * url         : Templates/sub/subTemplates.js
       * description : 모든 components를 로드하여 관리한다.
       *               V, VM을 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var templatesVs = {
         viewTop            : view_topV,
         viewLeft           : view_leftV,
         viewRight          : view_rightV,
         viewRightStat      : view_rightStatV,
         viewMain           : view_mainV
      };

      var templatesVMs = {
         viewTop            : view_topVM,
         viewLeft           : view_leftVM,
         viewRight          : view_rightVM,
         viewRightStat      : view_rightStatVM,
         viewMain           : view_mainVM
      };


      return {
         templatesVs  : templatesVs,
         templatesVMs : templatesVMs
      };
   }
);


