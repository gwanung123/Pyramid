'use strict';

define([
      "text!./Resource/resource.html", "./Resource/resource",
      "text!./Agent/agent.html", "./Agent/agent",
      "text!./AgentStats/agentStats.html", "./AgentStats/agentStats",
      "text!./Queue/queue.html", "./Queue/queue",
      "text!./Board/board.html", "./Board/board",
      "text!./User/user.html", "./User/user"
   ],
   function(
      resourceV, resourceVM,
      agentV, agentVM,
      agentStatsV, agentStatsVM,
      queueV, queueVM,
      boardV, boardVM,
      userV, userVM,
   ) {

      /************************************************************
       * name        : contents
       * url         : Contents/contents.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var contentsVs = {
         resource    : resourceV,
         agent       : agentV,
         agentStats  : agentStatsV,
         queue       : queueV,
         board       : boardV,
         user        : userV
      };

      var contentsVMs = {
         resource    : resourceVM,
         agent       : agentVM,
         agentStats  : agentStatsVM,
         queue       : queueVM,
         board       : boardVM,
         user        : userVM,
      };


      return {
         contentsVs  : contentsVs,
         contentsVMs : contentsVMs
      };
   }
);