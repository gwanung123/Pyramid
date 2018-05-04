'use strict';

define([
       "text!./viewTop.html", "./viewTop",
       "text!./viewLeft.html", "./viewLeft",
       "text!./viewRight.html", "./viewRight",
       "text!./viewLeftCall.html", "./viewLeftCall",
       "text!./viewMainCall.html", "./viewMainCall",
       "text!./viewLeftMail.html", "./viewLeftMail",
       "text!./viewMainMail.html", "./viewMainMail",
       "text!./viewLeftChat.html", "./viewLeftChat",
       "text!./viewMainChat.html", "./viewMainChat",
       "text!./viewMainHome.html", "./viewMainHome",
       "text!./viewMainHistory.html", "./viewMainHistory"
   ],
   function(
        view_topV, view_topVM,
        view_leftV, view_leftVM,
        view_rightV, view_rightVM,
        
        view_leftCallV, view_leftCallVM,
        view_MainCallV, view_MainCallVM,

        view_leftMailV, view_leftMailVM,
        view_MainMailV, view_MainMailVM,

        view_leftChatV, view_leftChatVM,
        view_MainChatV, view_MainChatVM,

        view_MainHomeV, view_MainHomeVM,
        viewMainHistoryV, viewMainHistoryVM

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
        viewLeftCall       : view_leftCallV,
        viewMainCall       : view_MainCallV,
        viewLeftMail       : view_leftMailV,
        viewMainMail       : view_MainMailV,
        viewLeftChat       : view_leftChatV,
        viewMainChat       : view_MainChatV,
        viewMainHome       : view_MainHomeV,
        viewMainHistory       : viewMainHistoryV
      };

      var templatesVMs = {
         viewTop            : view_topVM,
         viewLeft           : view_leftVM,
         viewRight          : view_rightVM,
         viewLeftCall       : view_leftCallVM,
         viewMainCall       : view_MainCallVM,
         viewLeftMail       : view_leftMailVM,
         viewMainMail       : view_MainMailVM,
         viewLeftChat       : view_leftChatVM,
         viewMainChat       : view_MainChatVM,
         viewMainHome       : view_MainHomeVM,
         viewMainHistory       : viewMainHistoryVM
      };


      return {
         templatesVs  : templatesVs,
         templatesVMs : templatesVMs
      };
   }
);


