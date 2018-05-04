'use strict';

define([],
   function() {

      /***********************************************************
       * name        : text.en
       * url         : Defines/text/text.en.js
       * description :
       ************************************************************/


      /**
       * DEFINE
       */
      var _DEFINE = {

         SIDEBAR : {
            BUTTON_1 : "HOME",
            BUTTON_2 : "SETTING",
            BUTTON_3 : "BOARD"
         },
         CONTENTS : {
            /**
             * loading
             */
            LOADING : {
               AGENT : {
                  TAG    : "agent",
                  URL    : "/cairo/caching/master/agent",
                  FIELDS : ["CENTER_ID", "TENANT_ID", "GROUP_ID", "TEAM_ID", "AGENT_ID", "AGENT_NAME"],
                  ARGS   : {
                     "CENTER_ID"   : { field: "CENTER_ID", type: "number" },
                     "TENANT_ID"   : { field: "TENANT_ID", type: "number" },
                     "GROUP_ID"    : { field: "EMPLOYEEGRP_ID", type: "number" },
                     "TEAM_ID"     : { field: "EMPLOYEEPART_ID", type: "number" },
                     "AGENT_ID"    : { field: "EMPLOYEE_ID", type: "string" },
                     "AGENT_NAME"  : { field: "EMPLOYEE_NAME", type: "string" }
                  }
               },
               WALLBOARD_BOARD : {
                  TAG    : "wallboard",
                  URL    : "/cairo/caching/ccc_wallboard/board",
                  ARGS : {
                     "Waiting"           : { field: "WAIT_COUNT", type: "number" },
                     "Longest Waiting"   : { field: "LONGEST_WAIT_TIME", type: "time" },
                     "Inbound Call"      : { field: "IB_DISTRIBUTE", type: "number" },
                     "Inbound Answered"  : { field: "IB_ANSWER", type: "number" },
                     "Inbound Abandoned" : { field: "IB_ABANDON", type: "number" },
                     "Service Level"     : { field: "SERVICE_LEVEL", type: "number" },
                     "Agent Login"       : { field: "LOGIN_COUNT", type: "number" },
                     "Agent Logout"      : { field: "LOGOUT_COUNT", type: "number" },
                     "Agent Ready"       : { field: "READY_COUNT", type: "number" },
                     "Agent Busy"        : { field: "OTHERWORK_COUNT", type: "number" },
                     "Agent Not-Ready"   : { field: "NOTREADY_COUNT", type: "number" },
                     "Agent ACW"         : { field: "AFTERCALLWORK_COUNT", type: "number" },
                     "Avg Agent Ready"   : { field: "AVG_READY_TIME", type: "time" },
                     "Avg Agent Busy"    : { field: "AVG_OTHERWORK_TIME", type: "time" },
                     "Avg Agent Not-Ready"   : { field: "AVG_NOTREADY_TIME", type: "time" },
                     "Avg Agent ACW"     : { field: "AVG_AFTERCALLWORK_TIME", type: "time" },
                     //"Outbound Answered" : { field: "OB_ANSWER", type: "number" },
                     //"Outbound Call"     : { field: "OB_CALL", type: "number" },
                     //"Outbound Latency"  : { field: "OB_LATENCY", type: "time" },
                     "Total Agent Ready" : { field: "SUM_READY_TIME", type: "time" },
                     "Total Agent Busy"  : { field: "SUM_OTHERWORK_TIME", type: "time" },
                     "Total Agent Not-Ready" : { field: "SUM_NOTREADY_TIME", type: "time" },
                     "Total Agent ACW"   : { field: "SUM_AFTERCALLWORK_TIME", type: "time" }
                  }
               },
               WALLBOARD_SETTING : {
                  TAG    : "setting",
                  URL    : "/cairo/caching/ccc_wallboard/setting",
                  ARGS : {
                     "INDEX"  : { field: "INDEX", type: "number" },
                     "NAME"   : { field: "NAME", type: "string" },
                     "ISUSE"  : { field: "ISUSE", type: "number" },
                     "WARNING": { field: "WARNING" }
                  }
               }
            },


            /**
             * push
             */
            PUSH : {
               "master" : {
                  "agent" : {
                     TENANT_ID : "EMPLOYEEPART_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "EMPLOYEEGRP_ID", "EMPLOYEEPART_ID", "EMPLOYEE_ID"],
                     DATA : {
                        "CENTER_ID"       : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"       : { field: "TENANT_ID", type: "number" },
                        "EMPLOYEEGRP_ID"  : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "EMPLOYEEPART_ID" : { field: "EMPLOYEEPART_ID", type: "number" },
                        "EMPLOYEE_ID"     : { field: "EMPLOYEE_ID", type: "string" },
                        "EMPLOYEE_NAME"   : { field: "EMPLOYEE_NAME", type: "string" },
                     }
                  }
               },
               "stats" : {
                  "wallboard" : {
                     PK : [],
                     DATA : {
                        "Waiting"           : { field: "WAIT_COUNT", type: "number" },
                        "Longest Waiting"   : { field: "LONGEST_WAIT_TIME", type: "time" },
                        "Inbound Call"      : { field: "IB_DISTRIBUTE", type: "number" },
                        "Inbound Answered"  : { field: "IB_ANSWER", type: "number" },
                        "Inbound Abandoned" : { field: "IB_ABANDON", type: "number" },
                        "Service Level"     : { field: "SERVICE_LEVEL", type: "number" },
                        "Agent Login"       : { field: "LOGIN_COUNT", type: "number" },
                        "Agent Logout"      : { field: "LOGOUT_COUNT", type: "number" },
                        "Agent Ready"       : { field: "READY_COUNT", type: "number" },
                        "Agent Busy"        : { field: "OTHERWORK_COUNT", type: "number" },
                        "Agent Not-Ready"   : { field: "NOTREADY_COUNT", type: "number" },
                        "Agent ACW"         : { field: "AFTERCALLWORK_COUNT", type: "number" },
                        "Avg Agent Ready"   : { field: "AVG_READY_TIME", type: "time" },
                        "Avg Agent Busy"    : { field: "AVG_OTHERWORK_TIME", type: "time" },
                        "Avg Agent Not-Ready"   : { field: "AVG_NOTREADY_TIME", type: "time" },
                        "Avg Agent ACW"     : { field: "AVG_AFTERCALLWORK_TIME", type: "time" },
                        //"Outbound Answered" : { field: "OB_ANSWER", type: "number" },
                        //"Outbound Call"     : { field: "OB_CALL", type: "number" },
                        //"Outbound Latency"  : { field: "OB_LATENCY", type: "time" },
                        "Total Agent Ready" : { field: "SUM_READY_TIME", type: "time" },
                        "Total Agent Busy"  : { field: "SUM_OTHERWORK_TIME", type: "time" },
                        "Total Agent Not-Ready" : { field: "SUM_NOTREADY_TIME", type: "time" },
                        "Total Agent ACW"   : { field: "SUM_AFTERCALLWORK_TIME", type: "time" }
                     }
                  }
               }
            },


            /**
             * Board
             */
            BOARD : {
               CENTER : {
                  WALLBOARD_ITEM : {
                     PAGESIZE : 30,
                     DATA     : "%.shared._ccc",
                     ITEMS    : "%.shared._master.agent"
                  }
               }
            }, // end of resource


            /**
             * Setting
             */
            SETTING : {
               CENTER : {
                  SETTING_GRID : {
                     DATA : "%.shared._ccc.setting",
                     SAVE : {
                        TAG  : "wallboard",
                        URL  : "/cairo/ccc_wallboard/setting/save",
                        ARGS : {
                           "INDEX"  : { field: "INDEX", type: "number" },
                           "NAME"   : { field: "NAME", type: "string" },
                           "ISUSE"  : { field: "ISUSE", type: "number" },
                           "WARNING": { field: "WARNING" }
                        }
                     },
                     COLUMN : [
                        {
                           id: 1, field: "INDEX", title: "IDX", width: "50px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: center; font-weight: 600;" },
                        },
                        {
                           id: 2, field: "NAME", title: "NAME", width: "250px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: left; font-weight: 600;" },
                        },
                        {
                           id: 3, field: "ISUSE", title: "USE(Y/N)", width: "100px",
                           attributes: { "class": "table-cell", style: "text-align: center; font-weight: 600;" },
                           values: [ { text: "NO", value: 0 }, { text: "YES", value: 1 } ]
                        },
                        {
                           id: 4, field: "WARNING", title: "WARNING VALUE", width: "150px",
                           attributes: { "class": "table-cell", style: "text-align: center; font-weight: 600;" },
                        },
                        {
                           command: [
                             { name: "edit", text: { edit: "EDIT", cancel: "CANCEL", update: "UPDATE" } }
                           ],
                           title: "&nbsp;", width: "180px"
                        }
                     ],
                     SCHEMA : {
                        model : {
                           id : "INDEX",
                           fields : {
                              INDEX: {
                                    type: "number", editable: false
                              },
                              NAME: {
                                    type: "string", editable: false
                              },
                              ISUSE: {
                                    type: "number", editable: true
                              },
                              WARNING: {
                                    type: "string", editable: true
                              }
                           }
                        }
                     }
                  }
               }
            },

         },


         COMMENT : {
         }
      }; //end of _DEFINE



      return _DEFINE;
   }
);
