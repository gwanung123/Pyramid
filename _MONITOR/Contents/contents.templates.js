'use strict';

define([
      "text!./Resource/sub/viewResourceLeft.html", "./Resource/sub/viewResourceLeft",

      "text!./Agent/sub/viewAgentLeft.html", "./Agent/sub/viewAgentLeft",
      "text!./Agent/sub/viewAgentCenter.html", "./Agent/sub/viewAgentCenter",
      "text!./Agent/sub/viewAgentRight.html", "./Agent/sub/viewAgentRight",

      "text!./AgentStats/sub/viewAgentStatsLeft.html", "./AgentStats/sub/viewAgentStatsLeft",
      "text!./AgentStats/sub/viewAgentStatsRight.html", "./AgentStats/sub/viewAgentStatsRight",

      "text!./Queue/sub/viewQueueLeft.html", "./Queue/sub/viewQueueLeft",
      "text!./Queue/sub/viewQueueCenter.html", "./Queue/sub/viewQueueCenter",
      "text!./Queue/sub/viewQueueRight.html", "./Queue/sub/viewQueueRight",

      "text!./Board/sub/viewBoardTop.html", "./Board/sub/viewBoardTop",
      "text!./Board/sub/viewBoardBottom.html", "./Board/sub/viewBoardBottom",
      "text!./Board/sub/viewBoardRight.html", "./Board/sub/viewBoardRight",

      "text!./User/sub/viewUserTop.html", "./User/sub/viewUserTop",
      "text!./User/sub/viewUserBottom.html", "./User/sub/viewUserBottom",
   ],
   function(
      viewResourceLeftV, viewResourceLeftVM,

      viewAgentLeftV, viewAgentLeftVM,
      viewAgentCenterV, viewAgentCenterVM,
      viewAgentRightV, viewAgentRightVM,

      viewAgentStatsLeftV, viewAgentStatsLeftVM,
      viewAgentStatsRightV, viewAgentStatsRightVM,

      viewQueueLeftV, viewQueueLeftVM,
      viewQueueCenterV, viewQueueCenterVM,
      viewQueueRightV, viewQueueRightVM,

      viewBoardTopV, viewBoardTopVM,
      viewBoardBottomV, viewBoardBottomVM,
      viewBoardRightV, viewBoardRightVM,

      viewUserTopV, viewUserTopVM,
      viewUserBottomV, viewUserBottomVM,
   ) {

      /************************************************************
       * name        : templates
       * url         : Contents/sub/templates.js
       * description : 모든 components를 로드하여 관리한다.
       *               V, VM을 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var templatesVs = {
         viewResourceLeft      : viewResourceLeftV,

         viewAgentLeft         : viewAgentLeftV,
         viewAgentCenter       : viewAgentCenterV,
         viewAgentRight        : viewAgentRightV,

         viewAgentStatsLeft    : viewAgentStatsLeftV,
         viewAgentStatsRight   : viewAgentStatsRightV,

         viewQueueLeft         : viewQueueLeftV,
         viewQueueCenter       : viewQueueCenterV,
         viewQueueRight        : viewQueueRightV,

         viewBoardTop          : viewBoardTopV,
         viewBoardBottom       : viewBoardBottomV,
         viewBoardRight        : viewBoardRightV,

         viewUserTop          : viewUserTopV,
         viewUserBottom       : viewUserBottomV,
      };

      var templatesVMs = {
         viewResourceLeft      : viewResourceLeftVM,

         viewAgentLeft         : viewAgentLeftVM,
         viewAgentCenter       : viewAgentCenterVM,
         viewAgentRight        : viewAgentRightVM,

         viewAgentStatsLeft    : viewAgentStatsLeftVM,
         viewAgentStatsRight   : viewAgentStatsRightVM,

         viewQueueLeft         : viewQueueLeftVM,
         viewQueueCenter       : viewQueueCenterVM,
         viewQueueRight        : viewQueueRightVM,

         viewBoardTop          : viewBoardTopVM,
         viewBoardBottom       : viewBoardBottomVM,
         viewBoardRight        : viewBoardRightVM,

         viewUserTop          : viewUserTopVM,
         viewUserBottom       : viewUserBottomVM,
      };


      return {
         templatesVs  : templatesVs,
         templatesVMs : templatesVMs
      };
   }
);

