'use strict';

define([
      "Contents/contents",
      "Contents/contents.templates",
      "Contents/contents.templates.model"
   ],
   function( contents, templates, modelTemplates ) {

      /***********************************************************
       * name        : Define
       * url         : /
       * description :
       ************************************************************/

      var _base_path = "/_MONITOR/Contents/";

      var _menu = {
         LOADING     : { TAG : "loading" },
         RESOURCE    : { TAG : "resource", LOCATION : "Resource/resource.html" },
         AGENT       : { TAG : "agent", LOCATION : "Agent/agent.html" },
         AGENT_STATS : { TAG : "agent_stats", LOCATION : "AgentStats/agentStats.html" },
         QUEUE       : { TAG : "queue", LOCATION : "Queue/queue.html" },
         BOARD       : { TAG : "board", LOCATION : "Board/board.html" },
         USER_DEFINE : { TAG : "user_define", LOCATION : "User/user.html" },
      };

      var _define = {
         "loading" : [
         ],
         "resource" : {
               parent   : "nx-contents",
               title    : "RESOURCE",
               content  : _base_path + _menu.RESOURCE.LOCATION,
               view     : contents.contentsVs.resource,
               viewModel: contents.contentsVMs.resource,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "TREEVIEW_AGENT",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewAgent",
                                 model : modelTemplates.modelResourceLeft_agent,
                                 push  : ["master"]
                              },
                              {
                                 TAG   : "TREEVIEW_QUEUE",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewQueue",
                                 model : modelTemplates.modelResourceLeft_queue,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_SKILL",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewSkill",
                                 model : modelTemplates.modelResourceLeft_skill,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              }
                           ],
                           parent: "nx-contents-resource-left",
                           view  : templates.templatesVs.viewResourceLeft,
                           viewModel : templates.templatesVMs.viewResourceLeft
                     }
               }
         },
         "agent" : {
               parent   : "nx-contents",
               title    : "AGENT",
               content  : _base_path + _menu.AGENT.LOCATION,
               view     : contents.contentsVs.agent,
               viewModel: contents.contentsVMs.agent,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "AGENT_AGENT",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxAgentAgent",
                                 model : modelTemplates.modelAgentLeft_agent,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              }
                           ],
                           parent: "nx-contents-agent-left",
                           view  : templates.templatesVs.viewAgentLeft,
                           viewModel : templates.templatesVMs.viewAgentLeft
                     },
                     "viewCenter" : {
                           componentTmpls : [
                              {
                                 TAG   : "AGENT_STATE",
                                 type  : "KENDO.AGENT.AGENT.STATE",
                                 domID : "nxAgentCenterBottom",
                                 model : modelTemplates.modelAgentCenter,
                                 join  : ["agent.viewRight.AGENT_LISTBOX"],
                                 push  : ["agent"]
                              }
                           ],
                           components : [
                              {
                                 TAG   : "AGENT_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxAgentCenterTop",
                                 model : modelTemplates.modelAgentCenter,
                                 join  : ["agent.viewCenter.AGENT_STATE"],
                              }
                           ],
                           parent: "nx-contents-agent-center",
                           view  : templates.templatesVs.viewAgentCenter,
                           viewModel : templates.templatesVMs.viewAgentCenter
                     },
                     "viewRight" : {
                           components : [
                              {
                                 TAG   : "AGENT_LISTBOX",
                                 type  : "KENDO.LISTBOX",
                                 domID : "nxAgentRight",
                                 model : modelTemplates.modelAgentRight,
                                 join  : ["agent.viewLeft.AGENT_AGENT"]
                              }
                           ],
                           parent: "nx-contents-agent-right",
                           view  : templates.templatesVs.viewAgentRight,
                           viewModel : templates.templatesVMs.viewAgentRight
                     }
               }
         },
         "agent_stats" : {
               parent   : "nx-contents",
               title    : "AGENT STATISTICS",
               content  : _base_path + _menu.AGENT_STATS.LOCATION,
               view     : contents.contentsVs.agentStats,
               viewModel: contents.contentsVMs.agentStats,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "AGENT_STATS_TEAM",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxAgentStatsTeam",
                                 model : modelTemplates.modelAgentStatsLeft_team,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "AGENT_STATS_AGENT",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxAgentStatsAgent",
                                 model : modelTemplates.modelAgentStatsLeft_agent,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              }
                           ],
                           parent: "nx-contents-agentStats-left",
                           view  : templates.templatesVs.viewAgentStatsLeft,
                           viewModel : templates.templatesVMs.viewAgentStatsLeft
                     },
                     "viewRight" : {
                           components : [
                              {
                                 TAG   : "AGENT_STATS_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxAgentStatsRight",
                                 model : modelTemplates.modelAgentStatsRight,
                                 join  : ["agent_stats.viewLeft.AGENT_STATS_TEAM",
                                          "agent_stats.viewLeft.AGENT_STATS_AGENT"],
                                 push  : ["team", "agent"]
                              }
                           ],
                           parent: "nx-contents-agentStats-right",
                           view  : templates.templatesVs.viewAgentStatsRight,
                           viewModel : templates.templatesVMs.viewAgentStatsRight
                     }
               }
         },
         "queue" : {
               parent   : "nx-contents",
               title    : "QUEUE",
               content  : _base_path + _menu.QUEUE.LOCATION,
               view     : contents.contentsVs.queue,
               viewModel: contents.contentsVMs.queue,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "QUEUE_TREEVIEW",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxQueueLeft",
                                 model : modelTemplates.modelQueueLeft,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              }
                           ],
                           parent: "nx-contents-queue-left",
                           view  : templates.templatesVs.viewQueueLeft,
                           viewModel : templates.templatesVMs.viewQueueLeft
                     },
                     "viewCenter" : {
                           componentTmpls : [
                              {
                                 TAG   : "QUEUE_STATS",
                                 type  : "KENDO.ROUTE.QUEUE.STATS",
                                 domID : "nxQueueCenterTmplQueueStats",
                                 model : modelTemplates.modelQueueCenter,
                                 join  : ["queue.viewRight.QUEUE_LISTBOX"],
                                 push  : ["route"]
                              }
                           ],
                           components : [
                              {
                                 TAG   : "DONUTCHART",
                                 type  : "KENDO.DONUTCHART",
                                 domID : "nxQueueCenterQueueStats",
                                 model : modelTemplates.modelQueueCenter,
                                 join  : ["queue.viewCenter.QUEUE_STATS"]
                              }
                           ],
                           parent: "nx-contents-queue-center",
                           view  : templates.templatesVs.viewQueueCenter,
                           viewModel : templates.templatesVMs.viewQueueCenter
                     },
                     "viewRight" : {
                           components : [
                              {
                                 TAG   : "QUEUE_LISTBOX",
                                 type  : "KENDO.LISTBOX",
                                 domID : "nxQueueRight",
                                 model : modelTemplates.modelQueueRight,
                                 join  : ["queue.viewLeft.QUEUE_TREEVIEW"]
                              }
                           ],
                           parent: "nx-contents-queue-right",
                           view  : templates.templatesVs.viewQueueRight,
                           viewModel : templates.templatesVMs.viewQueueRight
                     }
               }
         },
         "board" : {
               parent   : "nx-header",
               title    : "BOARD",
               content  : _base_path + _menu.BOARD.LOCATION,
               view     : contents.contentsVs.board,
               viewModel: contents.contentsVMs.board,
               window   : {
                     "viewTop" : {
                           componentTmpls : [
                              {
                                 TAG   : "BOARD_AGENT_STATE",
                                 type  : "KENDO.BOARD.AGENT.STATE",
                                 domID : "nxBoardTopTmplAgentState",
                                 model : modelTemplates.modelBoardTop,
                                 push  : ["agent"]
                              },
                              {
                                 TAG   : "BOARD_AGENT_REPORT",
                                 type  : "KENDO.BOARD.AGENT.REPORT",
                                 domID : "nxBoardTopTmplAgentReport",
                                 model : modelTemplates.modelBoardTop,
                                 push  : ["agent"]
                              },
                              {
                                 TAG   : "BOARD_QUEUE_STATS",
                                 type  : "KENDO.BOARD.QUEUE.STATS",
                                 domID : "nxBoardTopTmplQueueStats",
                                 model : modelTemplates.modelBoardTop,
                                 push  : ["route"]
                              }
                           ],
                           parent: "nx-contents-board-top",
                           view  : templates.templatesVs.viewBoardTop,
                           viewModel : templates.templatesVMs.viewBoardTop
                     },
                     "viewRight" : {
                           componentTmpls : [
                              {
                                 TAG   : "BOARD_AGENT_STATS",
                                 type  : "KENDO.BOARD.AGENT.STATS",
                                 domID : "nxBoardTopTmplAgentStats",
                                 model : modelTemplates.modelBoardRight,
                                 push  : ["agent"]
                              }
                           ],
                           parent: "nx-contents-board-right",
                           view  : templates.templatesVs.viewBoardRight,
                           viewModel : templates.templatesVMs.viewBoardRight
                     },
                     "viewBottom" : {
                           components : [
                              {
                                 TAG   : "BARCHART",
                                 type  : "KENDO.BARCHART",
                                 domID : "nxBoardBottomBarChart",
                                 model : modelTemplates.modelBoardBottom,
                                 join  : ["board.viewRight.BOARD_AGENT_STATS"]
                              }
                           ],
                           parent: "nx-contents-board-bottom",
                           view  : templates.templatesVs.viewBoardBottom,
                           viewModel : templates.templatesVMs.viewBoardBottom
                     }
               }
         },
         "user_define" : {
               parent   : "nx-contents",
               title    : "USER DEFINE",
               content  : _base_path + _menu.USER_DEFINE.LOCATION,
               view     : contents.contentsVs.user,
               viewModel: contents.contentsVMs.user,
               window   : {
                     "viewTop" : {
                           components : [
                              {
                                 TAG   : "USER_BUTTONS",
                                 type  : "KENDO.BUTTONGROUP",
                                 domID : "nxUserTopButtons",
                                 model : modelTemplates.modelUserTop
                              }
                           ],
                           parent: "nx-contents-user-top",
                           view  : templates.templatesVs.viewUserTop,
                           viewModel : templates.templatesVMs.viewUserTop
                     },
                     "viewBottom" : {
                           componentTmpls : [
                              {
                                 TAG   : "USER_AGENT_LIST",
                                 type  : "KENDO.USER.AGENT.LIST",
                                 domID : "nxUserBottomAgentList",
                                 model : modelTemplates.modelUserAgentList
                              },
                              {
                                 TAG   : "USER_AGENT_INBOUND",
                                 type  : "KENDO.USER.AGENT.IN",
                                 domID : "nxUserBottomAgentIN",
                                 model : modelTemplates.modelUserAgentIN
                              },
                              {
                                 TAG   : "USER_AGENT_OUTBOUND",
                                 type  : "KENDO.USER.AGENT.OUT",
                                 domID : "nxUserBottomAgentOUT",
                                 model : modelTemplates.modelUserAgentOUT
                              },
                              {
                                 TAG   : "USER_AGENT_STATS",
                                 type  : "KENDO.USER.AGENT.STATS",
                                 domID : "nxUserBottomAgentStats",
                                 model : modelTemplates.modelUserAgentStats
                              },
                              {
                                 TAG   : "USER_QUEUE_LIST",
                                 type  : "KENDO.USER.QUEUE.LIST",
                                 domID : "nxUserBottomQueueList",
                                 model : modelTemplates.modelUserQueueList
                              },
                              {
                                 TAG   : "USER_QUEUE_STATS",
                                 type  : "KENDO.USER.QUEUE.STATS",
                                 domID : "nxUserBottomQueueStats",
                                 model : modelTemplates.modelUserQueueStats
                              },
                              {
                                 TAG   : "USER_QUEUE_CHART",
                                 type  : "KENDO.USER.QUEUE.CHART",
                                 domID : "nxUserBottomQueueChart",
                                 model : modelTemplates.modelUserQueueChart
                              },
                              {
                                 TAG   : "USER_AGENT_CHART",
                                 type  : "KENDO.USER.AGENT.CHART",
                                 domID : "nxUserBottomAgentChart",
                                 model : modelTemplates.modelUserAgentChart
                              },
                           ],
                           parent: "nx-contents-user-bottom",
                           view  : templates.templatesVs.viewUserBottom,
                           viewModel : templates.templatesVMs.viewUserBottom
                     }
               }
         }
      }; // end of _define

      var method = {
         MENU : _menu,
         getComponent : function( rootComponent, propName ) {
            if ( rootComponent === undefined ) return _define;
            if ( _define[rootComponent] === undefined ) return null;
            if ( propName === undefined ) return _define[rootComponent];
            return _define[rootComponent][propName];
         },
         getComponentView : function( rootComponent ) {
            return _define[rootComponent]["view"];
         },
         getComponentChild : function( rootComponent, tag ) {
            return _define[rootComponent]["window"][tag];
         }
      };


      return method;
   }
);


