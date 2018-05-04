'use strict';

define([
      "text!./kendo_agent_AgentState.html", "./kendo_agent_AgentState",
      "text!./kendo_board_AgentState.html", "./kendo_board_AgentState",
      "text!./kendo_board_AgentReport.html", "./kendo_board_AgentReport",
      "text!./kendo_board_QueueStats.html", "./kendo_board_QueueStats",
      "text!./kendo_board_AgentStats.html", "./kendo_board_AgentStats",
      "text!./kendo_route_QueueStats.html", "./kendo_route_QueueStats",
      "text!./kendo_user_AgentList.html", "./kendo_user_AgentList",
      "text!./kendo_user_AgentIN.html", "./kendo_user_AgentIN",
      "text!./kendo_user_AgentOUT.html", "./kendo_user_AgentOUT",
      "text!./kendo_user_AgentStats.html", "./kendo_user_AgentStats",
      "text!./kendo_user_QueueList.html", "./kendo_user_QueueList",
      "text!./kendo_user_QueueStats.html", "./kendo_user_QueueStats",
      "text!./kendo_user_QueueChart.html", "./kendo_user_QueueChart",
      "text!./kendo_user_AgentChart.html", "./kendo_user_AgentChart",
   ],
   function(
      tmplAgentAgentStateV, tmplAgentAgentStateVM,
      tmplBoardAgentStateV, tmplBoardAgentStateVM,
      tmplBoardAgentReportV, tmplBoardAgentReportVM,
      tmplBoardQueueStatsV, tmplBoardQueueStatsVM,
      tmplBoardAgentStatsV, tmplBoardAgentStatsVM,
      tmplRouteQueueStatsV, tmplRouteQueueStatsVM,
      tmplUserAgentListV, tmplUserAgentListVM,
      tmplUserAgentINV, tmplUserAgentINVM,
      tmplUserAgentOUTV, tmplUserAgentOUTVM,
      tmplUserAgentStatsV, tmplUserAgentStatsVM,
      tmplUserQueueListV, tmplUserQueueListVM,
      tmplUserQueueStatsV, tmplUserQueueStatsVM,
      tmplUserQueueChartV, tmplUserQueueChartVM,
      tmplUserAgentChartV, tmplUserAgentChartVM,
   ) {

      /************************************************************
       * name        : componentTmpls
       * url         : ComponentTmpls/componentTmpls.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var componentTmplsVs = {
         tmplAgentAgentState    : tmplAgentAgentStateV,
         tmplBoardAgentState    : tmplBoardAgentStateV,
         tmplBoardAgentReport   : tmplBoardAgentReportV,
         tmplBoardQueueStats    : tmplBoardQueueStatsV,
         tmplBoardAgentStats    : tmplBoardAgentStatsV,
         tmplRouteQueueStats    : tmplRouteQueueStatsV,
         tmplUserAgentList      : tmplUserAgentListV,
         tmplUserAgentIN        : tmplUserAgentINV,
         tmplUserAgentOUT       : tmplUserAgentOUTV,
         tmplUserAgentStats     : tmplUserAgentStatsV,
         tmplUserQueueList      : tmplUserQueueListV,
         tmplUserQueueStats     : tmplUserQueueStatsV,
         tmplUserQueueChart     : tmplUserQueueChartV,
         tmplUserAgentChart     : tmplUserAgentChartV,
      };

      var componentTmplsVMs = {
         tmplAgentAgentState    : tmplAgentAgentStateVM,
         tmplBoardAgentState    : tmplBoardAgentStateVM,
         tmplBoardAgentReport   : tmplBoardAgentReportVM,
         tmplBoardQueueStats    : tmplBoardQueueStatsVM,
         tmplBoardAgentStats    : tmplBoardAgentStatsVM,
         tmplRouteQueueStats    : tmplRouteQueueStatsVM,
         tmplUserAgentList      : tmplUserAgentListVM,
         tmplUserAgentIN        : tmplUserAgentINVM,
         tmplUserAgentOUT       : tmplUserAgentOUTVM,
         tmplUserAgentStats     : tmplUserAgentStatsVM,
         tmplUserQueueList      : tmplUserQueueListVM,
         tmplUserQueueStats     : tmplUserQueueStatsVM,
         tmplUserQueueChart     : tmplUserQueueChartVM,
         tmplUserAgentChart     : tmplUserAgentChartVM,
      };


      return {
         componentTmplsVs    : componentTmplsVs,
         componentTmplsVMs   : componentTmplsVMs,
         onComponentTmplLoad : function( tag, type, domID, options ) {
            switch ( type ) {
               case "KENDO.AGENT.AGENT.STATE":
                  $("#"+domID).html(this.componentTmplsVs.tmplAgentAgentState);
                  return new this.componentTmplsVMs.tmplAgentAgentState(tag, domID, options);
               case "KENDO.BOARD.AGENT.STATE":
                  $("#"+domID).html(this.componentTmplsVs.tmplBoardAgentState);
                  return new this.componentTmplsVMs.tmplBoardAgentState(tag, domID, options);
               case "KENDO.BOARD.AGENT.REPORT":
                  $("#"+domID).html(this.componentTmplsVs.tmplBoardAgentReport);
                  return new this.componentTmplsVMs.tmplBoardAgentReport(tag, domID, options);
               case "KENDO.BOARD.QUEUE.STATS":
                  $("#"+domID).html(this.componentTmplsVs.tmplBoardQueueStats);
                  return new this.componentTmplsVMs.tmplBoardQueueStats(tag, domID, options);
               case "KENDO.BOARD.AGENT.STATS":
                  $("#"+domID).html(this.componentTmplsVs.tmplBoardAgentStats);
                  return new this.componentTmplsVMs.tmplBoardAgentStats(tag, domID, options);
               case "KENDO.ROUTE.QUEUE.STATS":
                  $("#"+domID).html(this.componentTmplsVs.tmplRouteQueueStats);
                  return new this.componentTmplsVMs.tmplRouteQueueStats(tag, domID, options);
               case "KENDO.USER.AGENT.LIST":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserAgentList);
                  return new this.componentTmplsVMs.tmplUserAgentList(tag, domID, options);
               case "KENDO.USER.AGENT.IN":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserAgentIN);
                  return new this.componentTmplsVMs.tmplUserAgentIN(tag, domID, options);
               case "KENDO.USER.AGENT.OUT":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserAgentOUT);
                  return new this.componentTmplsVMs.tmplUserAgentOUT(tag, domID, options);
               case "KENDO.USER.AGENT.STATS":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserAgentStats);
                  return new this.componentTmplsVMs.tmplUserAgentStats(tag, domID, options);
               case "KENDO.USER.QUEUE.LIST":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserQueueList);
                  return new this.componentTmplsVMs.tmplUserQueueList(tag, domID, options);
               case "KENDO.USER.QUEUE.STATS":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserQueueStats);
                  return new this.componentTmplsVMs.tmplUserQueueStats(tag, domID, options);
               case "KENDO.USER.QUEUE.CHART":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserQueueChart);
                  return new this.componentTmplsVMs.tmplUserQueueChart(tag, domID, options);
               case "KENDO.USER.AGENT.CHART":
                  $("#"+domID).html(this.componentTmplsVs.tmplUserAgentChart);
                  return new this.componentTmplsVMs.tmplUserAgentChart(tag, domID, options);
            }
         }
      };
   }
);