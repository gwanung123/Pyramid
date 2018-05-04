'use strict';

define([],
   function() {

      /***********************************************************
       * name        : text.en
       * url         : Defines/language/text.en.js
       * description :
       ************************************************************/

      var _DEFINE = {
         SIDEBAR : {
            BUTTON_1 : "HOME",
            BUTTON_2 : "RESOURCE",
            BUTTON_3 : "AGENT",
            BUTTON_4 : "STATS",
            BUTTON_5 : "QUEUE",
            BUTTON_6 : "BOARD",
            BUTTON_7 : "USER DEFINE",
         },
         CONTENTS : {
            /**
             * loading
             */
            LOADING : {
            },


            /**
             * push
             */
            PUSH : {
               "master" : {
                  "team" : {
                     TENANT_ID : "EMPLOYEEPART_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "EMPLOYEEGRP_ID", "EMPLOYEEPART_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "EMPLOYEEGRP_ID"    : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "EMPLOYEEPART_ID"   : { field: "EMPLOYEEPART_ID", type: "number" },
                        "EMPLOYEEPART_NAME" : { field: "EMPLOYEEPART_NAME", type: "string" }
                     }
                  },
                  "agent" : {
                     TENANT_ID : "EMPLOYEEPART_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "EMPLOYEEGRP_ID", "EMPLOYEEPART_ID", "EMPLOYEE_ID"],
                     DATA : {
                        "MONITOR_FLAG"  : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"     : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"     : { field: "TENANT_ID", type: "number" },
                        "EMPLOYEEGRP_ID"  : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "EMPLOYEEPART_ID" : { field: "EMPLOYEEPART_ID", type: "number" },
                        "EMPLOYEE_ID"     : { field: "EMPLOYEE_ID", type: "string" },
                        "EMPLOYEE_NAME"   : { field: "EMPLOYEE_NAME", type: "string" },
                        "EMPLOYEE_PAWD" : { field: "EMPLOYEE_PAWD", type: "string" },
                        "MEDIA_ID"      : { field: "MEDIA_ID", type: "number" },
                        "LOGIN_ID"      : { field: "LOGIN_ID", type: "string" },
                        "EMPLOYEE_CLASS": { field: "EMPLOYEE_CLASS", type: "number" },
                        "BLEND_KIND"    : { field: "BLEND_KIND", type: "number" },
                        "TEL_HOME"      : { field: "TEL_HOME", type: "string" },
                        "PERMIT_ID"     : { field: "PERMIT_ID", type: "number" },
                        "UPDATE_USER"   : { field: "UPDATE_USER", type: "string" },
                        "END_UPDATEDATE": { field: "END_UPDATEDATE", type: "string" }
                     }
                  },
                  "queue" : {
                     TENANT_ID : "DNSUB_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "DNMAJOR_ID", "DNSUB_ID", "QUEUE_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNSUB_ID"     : { field: "DNSUB_ID", type: "number" },
                        "QUEUE_ID"     : { field: "QUEUE_ID", type: "string" },
                        "QUEUE_NAME"   : { field: "QUEUE_NAME", type: "string" },
                        "MEDIA_ID"     : { field: "MEDIA_ID", type: "number" },
                        "SUBMEDIA_ID"  : { field: "SUBMEDIA_ID", type: "number" },
                        "QUEUE_KIND"   : { field: "QUEUE_KIND", type: "number" },
                        "QUEUE_TYPE"   : { field: "QUEUE_TYPE", type: "number" },
                        "OPTIONS"      : { field: "OPTIONS", type: "string" },
                        "QUEUE_MAXTIME": { field: "QUEUE_MAXTIME", type: "number" },
                        "QUEUE_SLTIME" : { field: "QUEUE_SLTIME", type: "number" },
                        "LAST_SKILLID" : { field: "LAST_SKILLID", type: "number" }
                     }
                  },
                  "skill" : {
                     PK : ["CENTER_ID", "TENANT_ID", "SKILL_ID"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "SKILL_ID"     : { field: "SKILL_ID", type: "number" },
                        "SKILL_NAME"   : { field: "SKILL_NAME", type: "string" },
                        "SKILL_DESC"   : { field: "SKILL_DESC", type: "string" }
                     }
                  }
               },
               "stats" : {
                  "agent" : {
                     TENANT_ID : "TEAM_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "GROUP_ID", "TEAM_ID", "AGENT_ID"],
                     DATA : {
                        "CENTER_ID"  : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"  : { field: "TENANT_ID", type: "number" },
                        "GROUP_ID"   : { field: "GROUP_ID", type: "number" },
                        "TEAM_ID"    : { field: "TEAM_ID", type: "number" },
                        "AGENT_ID"   : { field: "AGENT_ID", type: "string" },
                        "AGENT_NAME" : { field: "AGENT_NAME", type: "string" },
                        "AGENT_MODE" : { field: "AGENT_MODE", type: "number" },
                        // 20180412 jesse
                        // "REASON_CODE": { field: "REASON_CODE", type: "number" },
                        "AGENT_TIME" : { field: "AGENT_TIME", type: "time" },
                        "LOGIN_ID"   : { field: "LOGIN_ID", type: "string" },
                        "DN_ID"      : { field: "DN_ID", type: "string" },
                        "CALL_TYPE"  : { field: "CALL_TYPE", type: "number" },
                        "CALL_KIND"  : { field: "CALL_KIND", type: "number" },
                        "CALL_COUNT" : { field: "CALL_COUNT", type: "number" },
                        "SKILL_ID"   : { field: "SKILL_ID", type: "number" },
                        "INBOUND_COUNT"       : { field: "INBOUND_COUNT", type: "number" },
                        "INBOUND_TIME"        : { field: "INBOUND_TIME", type: "time" },
                        "OUTBOUND_COUNT"      : { field: "OUTBOUND_COUNT", type: "number" },
                        "OUTBOUND_TIME"       : { field: "OUTBOUND_TIME", type: "time" },
                        "SEND_INTERNAL_COUNT" : { field: "SEND_INTERNAL_COUNT", type: "number" },
                        "SEND_INTERNAL_TIME"  : { field: "SEND_INTERNAL_TIME", type: "time" },
                        "RECV_INTERNAL_COUNT" : { field: "RECV_INTERNAL_COUNT", type: "number" },
                        "RECV_INTERNAL_TIME"  : { field: "RECV_INTERNAL_TIME", type: "time" },
                        "SEND_CONSULT_COUNT"  : { field: "SEND_CONSULT_COUNT", type: "number" },
                        "SEND_CONSULT_TIME"   : { field: "SEND_CONSULT_TIME", type: "time" },
                        "RECV_CONSULT_COUNT"  : { field: "RECV_CONSULT_COUNT", type: "number" },
                        "RECV_CONSULT_TIME"   : { field: "RECV_CONSULT_TIME", type: "time" },
                        "SEND_TRANSFER_COUNT" : { field: "SEND_TRANSFER_COUNT", type: "number" },
                        "SEND_TRANSFER_TIME"  : { field: "SEND_TRANSFER_TIME", type: "time" },
                        "RECV_TRANSFER_COUNT" : { field: "RECV_TRANSFER_COUNT", type: "number" },
                        "RECV_TRANSFER_TIME"  : { field: "RECV_TRANSFER_TIME", type: "time" },
                        "SEND_CONFERENCE_COUNT" : { field: "SEND_CONFERENCE_COUNT", type: "number" },
                        "SEND_CONFERENCE_TIME"  : { field: "SEND_CONFERENCE_TIME", type: "time" },
                        "RECV_CONFERENCE_COUNT" : { field: "RECV_CONFERENCE_COUNT", type: "number" },
                        "RECV_CONFERENCE_TIME"  : { field: "RECV_CONFERENCE_TIME", type: "time" },
                        "HOLD_COUNT" : { field: "HOLD_COUNT", type: "number" },
                        "HOLD_TIME"  : { field: "HOLD_TIME", type: "time" },
                        "OBSERVATION_COUNT"   : { field: "OBSERVATION_COUNT", type: "number" },
                        "OBSERVATION_TIME"    : { field: "OBSERVATION_TIME", type: "time" },
                        "INBOUND_DID_COUNT"   : { field: "INBOUND_DID_COUNT", type: "number" },
                        "INBOUND_DID_TIME"    : { field: "INBOUND_DID_TIME", type: "time" },
                        "OUTBOUND_DOD_COUNT"  : { field: "OUTBOUND_DOD_COUNT", type: "number" },
                        "OUTBOUND_DOD_TIME"   : { field: "OUTBOUND_DOD_TIME", type: "time" },
                        "QUEUE_IB_COUNT"      : { field: "QUEUE_IB_COUNT", type: "number" },
                        "QUEUE_IB_TIME"       : { field: "QUEUE_IB_TIME", type: "time" },
                        "SEND_GROUPTRANSFER_COUNT" : { field: "SEND_GROUPTRANSFER_COUNT", type: "number" },
                        "SEND_GROUPTRANSFER_TIME"  : { field: "SEND_GROUPTRANSFER_TIME", type: "time" },
                        "RECV_GROUPTRANSFER_COUNT" : { field: "RECV_GROUPTRANSFER_COUNT", type: "number" },
                        "RECV_GROUPTRANSFER_TIME"  : { field: "RECV_GROUPTRANSFER_TIME", type: "time" },
                        "READY_COUNT"         : { field: "READY_COUNT", type: "number" },
                        "READY_TIME"          : { field: "READY_TIME", type: "time" },
                        "NOTREADY_COUNT"      : { field: "NOTREADY_COUNT", type: "number" },
                        "NOTREADY_TIME"       : { field: "NOTREADY_TIME", type: "time" },
                        "ACW_COUNT"           : { field: "ACW_COUNT", type: "number" },
                        "ACW_TIME"            : { field: "ACW_TIME", type: "time" },
                        "OTHERWORK_COUNT"     : { field: "OTHERWORK_COUNT", type: "number" },
                        "OTHERWORK_TIME"      : { field: "OTHERWORK_TIME", type: "time" },
                        "GROUP_IB_AGENTS"     : { field: "GROUP_IB_AGENTS", type: "number" },
                        "GROUP_IB_COUNT"      : { field: "GROUP_IB_COUNT", type: "number" },
                        "GROUP_IB_TIME"       : { field: "GROUP_IB_TIME", type: "time" },
                        "GROUP_OB_AGENTS"     : { field: "GROUP_OB_AGENTS", type: "number" },
                        "GROUP_OB_COUNT"      : { field: "GROUP_OB_COUNT", type: "number" },
                        "GROUP_OB_TIME"       : { field: "GROUP_OB_TIME", type: "time" },
                        "TEAM_IB_AGENTS"      : { field: "TEAM_IB_AGENTS", type: "number" },
                        "TEAM_IB_COUNT"       : { field: "TEAM_IB_COUNT", type: "number" },
                        "TEAM_IB_TIME"        : { field: "TEAM_IB_TIME", type: "time" },
                        "TEAM_OB_AGENTS"      : { field: "TEAM_OB_AGENTS", type: "number" },
                        "TEAM_OB_COUNT"       : { field: "TEAM_OB_COUNT", type: "number" },
                        "TEAM_OB_TIME"        : { field: "TEAM_OB_TIME", type: "time" }
                     }
                  },
                  "team" : {
                     TENANT_ID : "TEAM_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "GROUP_ID", "TEAM_ID"],
                     DATA : {
                        "CENTER_ID"  : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"  : { field: "TENANT_ID", type: "number" },
                        "GROUP_ID"   : { field: "GROUP_ID", type: "number" },
                        "TEAM_ID"    : { field: "TEAM_ID", type: "number" },
                        "TEAM_NAME"  : { field: "TEAM_NAME", type: "string" },
                        "INBOUND_COUNT"       : { field: "INBOUND_COUNT", type: "number" },
                        "INBOUND_TIME"        : { field: "INBOUND_TIME", type: "time" },
                        "OUTBOUND_COUNT"      : { field: "OUTBOUND_COUNT", type: "number" },
                        "OUTBOUND_TIME"       : { field: "OUTBOUND_TIME", type: "time" },
                        "SEND_INTERNAL_COUNT" : { field: "SEND_INTERNAL_COUNT", type: "number" },
                        "SEND_INTERNAL_TIME"  : { field: "SEND_INTERNAL_TIME", type: "time" },
                        "RECV_INTERNAL_COUNT" : { field: "RECV_INTERNAL_COUNT", type: "number" },
                        "RECV_INTERNAL_TIME"  : { field: "RECV_INTERNAL_TIME", type: "time" },
                        "SEND_CONSULT_COUNT"  : { field: "SEND_CONSULT_COUNT", type: "number" },
                        "SEND_CONSULT_TIME"   : { field: "SEND_CONSULT_TIME", type: "time" },
                        "RECV_CONSULT_COUNT"  : { field: "RECV_CONSULT_COUNT", type: "number" },
                        "RECV_CONSULT_TIME"   : { field: "RECV_CONSULT_TIME", type: "time" },
                        "SEND_TRANSFER_COUNT" : { field: "SEND_TRANSFER_COUNT", type: "number" },
                        "SEND_TRANSFER_TIME"  : { field: "SEND_TRANSFER_TIME", type: "time" },
                        "RECV_TRANSFER_COUNT" : { field: "RECV_TRANSFER_COUNT", type: "number" },
                        "RECV_TRANSFER_TIME"  : { field: "RECV_TRANSFER_TIME", type: "time" },
                        "SEND_CONFERENCE_COUNT" : { field: "SEND_CONFERENCE_COUNT", type: "number" },
                        "SEND_CONFERENCE_TIME"  : { field: "SEND_CONFERENCE_TIME", type: "time" },
                        "RECV_CONFERENCE_COUNT" : { field: "RECV_CONFERENCE_COUNT", type: "number" },
                        "RECV_CONFERENCE_TIME"  : { field: "RECV_CONFERENCE_TIME", type: "time" },
                        "INBOUND_DID_COUNT"   : { field: "INBOUND_DID_COUNT", type: "number" },
                        "INBOUND_DID_TIME"    : { field: "INBOUND_DID_TIME", type: "time" },
                        "OUTBOUND_DOD_COUNT"  : { field: "OUTBOUND_DOD_COUNT", type: "number" },
                        "OUTBOUND_DOD_TIME"   : { field: "OUTBOUND_DOD_TIME", type: "time" },
                        "QUEUE_IB_COUNT"      : { field: "QUEUE_IB_COUNT", type: "number" },
                        "QUEUE_IB_TIME"       : { field: "QUEUE_IB_TIME", type: "time" },
                        "SEND_GROUPTRANSFER_COUNT" : { field: "SEND_GROUPTRANSFER_COUNT", type: "number" },
                        "SEND_GROUPTRANSFER_TIME"  : { field: "SEND_GROUPTRANSFER_TIME", type: "time" },
                        "RECV_GROUPTRANSFER_COUNT" : { field: "RECV_GROUPTRANSFER_COUNT", type: "number" },
                        "RECV_GROUPTRANSFER_TIME"  : { field: "RECV_GROUPTRANSFER_TIME", type: "time" },
                     }
                  },
                  "route" : {
                     PK : ["CENTER_ID", "TENANT_ID", "ROUTE_ID"],
                     DATA : {
                        "CENTER_ID"      : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"      : { field: "TENANT_ID", type: "number" },
                        "ROUTE_ID"       : { field: "ROUTE_ID", type: "string" },
                        "ENTER"          : { field: "ENTER", type: "number" },
                        "DISTRIBUTE"     : { field: "DISTRIBUTE", type: "number" },
                        "ANSWER"         : { field: "ANSWER", type: "number" },
                        "ABANDON"        : { field: "ABANDON", type: "number" },
                        "NONSERVICE"     : { field: "NONSERVICE", type: "number" },
                        "FAIL_CALL"      : { field: "FAIL_CALL", type: "number" },
                        "TRANSFER"       : { field: "TRANSFER", type: "number" },
                        "CALLBACK"       : { field: "CALLBACK", type: "number" },
                        "TO_CENTER"      : { field: "TO_CENTER", type: "number" },
                        "TO_CENTER_FAIL" : { field: "TO_CENTER_FAIL", type: "number" },
                        "FROM_CENTER"    : { field: "FROM_CENTER", type: "number" },
                        "ENTER_SYS"      : { field: "ENTER_SYS", type: "number" },
                        "EXTENAL"        : { field: "EXTENAL", type: "number" },
                        "REENTRY"        : { field: "REENTRY", type: "number" },
                        "REENTRY_ABANDON": { field: "REENTRY_ABANDON", type: "number" },
                        "EXP_DISTRIBUTE" : { field: "EXP_DISTRIBUTE", type: "number" },
                        "EXP_ABANDON"    : { field: "EXP_ABANDON", type: "number" },
                        "GROUP_TRANSFER" : { field: "GROUP_TRANSFER", type: "number" },
                        "GROUP_TRANSFER_ANSWER"     : { field: "GROUP_TRANSFER_ANSWER", type: "number" },
                        "GROUP_TRANSFER_DISTRIBUTE" : { field: "GROUP_TRANSFER_DISTRIBUTE", type: "number" },
                        "GROUP_TRANSFER_ABANDON"    : { field: "GROUP_TRANSFER_ABANDON", type: "number" },
                        "GROUP_TRANSFER_NONSERVICE" : { field: "GROUP_TRANSFER_NONSERVICE", type: "number" },
                        "GROUP_TRANSFER_FAIL"       : { field: "GROUP_TRANSFER_FAIL", type: "number" },
                        "GROUP_TRANSFER_EXP_DT"     : { field: "GROUP_TRANSFER_EXP_DT", type: "number" },
                        "GROUP_TRANSFER_EXP_AB"     : { field: "GROUP_TRANSFER_EXP_AB", type: "number" },
                        "GROUP_TRANSFER_TR"  : { field: "GROUP_TRANSFER_TR", type: "number" },
                        "WAIT_NO"        : { field: "WAIT_NO", type: "number" },
                        "WAIT_TIME_LONGEST"  : { field: "WAIT_TIME_LONGEST", type: "number" },
                        "SUM_ROUTE_COUNT"    : { field: "SUM_ROUTE_COUNT", type: "number" },
                        "SUM_WAIT_NO"    : { field: "SUM_WAIT_NO", type: "number" },
                        "SUM_ENTER"      : { field: "SUM_ENTER", type: "number" },
                        "SUM_ANSWER"     : { field: "SUM_ANSWER", type: "number" },
                        "SUM_FAIL_CALL"  : { field: "SUM_FAIL_CALL", type: "number" },
                        "SUM_NONSERVICE" : { field: "SUM_NONSERVICE", type: "number" },
                     }
                  }
               }
            },

            /**
             * resource
             */
            RESOURCE : {
               LEFT : {
                  TREEVIEW_AGENT : {
                     TEXT_FIELD: ["team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           URL    : "/cairo/caching/master/team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]",
                           FIELDS : ["CENTER_ID", "TENANT_ID", "GROUP_ID", "TEAM_ID", "TEAM_NAME"],
                           ARGS   : {
                              "CENTER_ID"   : { field: "CENTER_ID", type: "number" },
                              "TENANT_ID"   : { field: "TENANT_ID", type: "number" },
                              "GROUP_ID"    : { field: "EMPLOYEEGRP_ID", type: "number" },
                              "TEAM_ID"     : { field: "EMPLOYEEPART_ID", type: "number" },
                              "TEAM_NAME"   : { field: "EMPLOYEEPART_NAME", type: "string" }
                           }
                        },
                        DEPTH2 : {
                           TAG    : "agent",
                           URL    : "/cairo/caching/master/agent",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]",
                           FIELDS : ["CENTER_ID", "TENANT_ID", "GROUP_ID", "TEAM_ID", "AGENT_ID", "AGENT_NAME"],
                           ARGS   : {
                              "CENTER_ID"   : { field: "CENTER_ID", type: "number" },
                              "TENANT_ID"   : { field: "TENANT_ID", type: "number" },
                              "GROUP_ID"    : { field: "EMPLOYEEGRP_ID", type: "number" },
                              "TEAM_ID"     : { field: "EMPLOYEEPART_ID", type: "number" },
                              "AGENT_ID"    : { field: "EMPLOYEE_ID", type: "string" },
                              "AGENT_NAME"  : { field: "EMPLOYEE_NAME", type: "string" }
                           }
                        }
                     }
                  },
                  TREEVIEW_QUEUE : {
                     TEXT_FIELD: ["dnsub", "queue"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "dnsub",
                           DATA   : "DBMS_SUB",
                           PIN    : "DNSUB_ID",
                           TXT    : "@=DNSUB_ID [@=DNSUB_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "queue",
                           DATA   : "DBMS_QUEUE",
                           PIN    : "QUEUE_ID",
                           TXT    : "@=QUEUE_ID"
                        }
                     }
                  },
                  TREEVIEW_SKILL : {
                     TEXT_FIELD: ["skill"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "skill",
                           DATA   : "DBMS_SKILL",
                           PIN    : "SKILL_ID",
                           TXT    : "@=SKILL_ID [@=SKILL_NAME]"
                        }
                     }
                  },
               }
            }, // end of resource

            /**
             * Agent
             */
            AGENT : {
               LEFT : {
                  AGENT_AGENT : {
                     TEXT_FIELD: ["team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           DATA   : "%.shared._master.team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]"
                        },
                        DEPTH2 : {
                           TAG    : "agent",
                           DATA   : "%.shared._master.agent",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]"
                        }
                     }
                  }
               },
               CENTER : {
                  AGENT_GRID : {
                     COLUMN : [
                        { id: 1, field: "AGENT_COUNT", title: "AGENT", width: "12%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 2, field: "LOGIN_COUNT", title: "LOGIN", width: "13%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 3, field: "READY_COUNT", title: "READY", width: "12%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 4, field: "INBOUND_COUNT", title: "INBOUND", width: "13%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 5, field: "OUTBOUND_COUNT", title: "OUTBOUND", width: "12%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 6, field: "ETC_COUNT", title: "ETC", width: "13%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 7, field: "ACW_COUNT", title: "AFTER WORK", width: "12%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } },
                        { id: 8, field: "NOTREADY_COUNT", title: "NOT READY", width: "13%",
                          attributes: { "class": "nx-agent-grid-col", style: "text-align: center;" } }
                     ],
                     BIND : {
                        "AGENT_COUNT"    : { value: "!=DATA_LENGTH" },
                        "LOGIN_COUNT"    : { field: "AGENT_MODE", value: "201" },
                        "READY_COUNT"    : { field: "AGENT_MODE", value: "204" },
                        "INBOUND_COUNT"  : { field: "CALL_TYPE", value: "1" },
                        "OUTBOUND_COUNT" : { field: "CALL_TYPE", value: "2" },
                        "ETC_COUNT"      : { field: "AGENT_MODE",
                                             value: "@=AGENT_COUNT - @=LOGIN_COUNT - @=READY_COUNT - @=ACW_COUNT - @=NOTREADY_COUNT" },
                        "ACW_COUNT"      : { field: "AGENT_MODE", value: "206" },
                        "NOTREADY_COUNT" : { field: "AGENT_MODE", value: "203" }
                     }
                  },
                  AGENT_STATE : {
                     PAGESIZE : 30,
                     FIELDS : ["AGENT_ID", "AGENT_MODE", "LOGIN_ID", "CALL_TYPE"], //20180418 Sam #22976
                     BIND : {
                        "AgentID"    : "AGENT_ID",
                        "AgentState" : "AGENT_MODE",
                        "LoginID"    : "LOGIN_ID",
                        "AgentMode"  : "CALL_TYPE" 
                     }
                  }
               },
               RIGHT : {
                  AGENT_LISTBOX : {
                     BIND : ["TEAM_ID", "AGENT_ID"]
                  }
               }
            }, // end of Agent

            /**
             * Agent Stats
             */
            AGENT_STATS : {
               LEFT : {
                  AGENT_STATS_TEAM : {
                     TEXT_FIELD: ["team"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           DATA   : "%.shared._master.team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]"
                        }
                     }
                  },
                  AGENT_STATS_AGENT : {
                     TEXT_FIELD: ["team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           DATA   : "%.shared._master.team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]"
                        },
                        DEPTH2 : {
                           TAG    : "agent",
                           DATA   : "%.shared._master.agent",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]"
                        }
                     }
                  }
               },
               RIGHT : {
                  AGENT_STATS_GRID : {
                     AGENT_STATS_TEAM : {
                        URL : "/cairo/caching/stats/team",
                        COLUMN : [
                           {
                              id: 1, field: "TEAM_ID", title: "Tenant ID", locked: true, width: "120px",
                              pk: true,
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 2, field: "TEAM_NAME", title: "Tenant Name", locked: true, width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 3, field: "INBOUND_COUNT", title: "Inbound", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 4, field: "INBOUND_TIME", title: "Inbound(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 5, field: "OUTBOUND_COUNT", title: "Outbound", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 6, field: "OUTBOUND_TIME", title: "Outbound(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 7, field: "SEND_INTERNAL_COUNT", title: "[S] Internal", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 8, field: "SEND_INTERNAL_TIME", title: "[S] Internal(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 9, field: "RECV_INTERNAL_COUNT", title: "[R] Internal", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 10, field: "RECV_INTERNAL_TIME", title: "[R] Internal(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 11, field: "SEND_CONSULT_COUNT", title: "[S] Consult", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 12, field: "SEND_CONSULT_TIME", title: "[S] Consult(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 13, field: "RECV_CONSULT_COUNT", title: "[R] Consult", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 14, field: "RECV_CONSULT_TIME", title: "[R] Consult(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 15, field: "SEND_TRANSFER_COUNT", title: "[S] Transfer", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 16, field: "SEND_TRANSFER_TIME", title: "[S] Transfer(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 17, field: "RECV_TRANSFER_COUNT", title: "[R] Transfer", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 18, field: "RECV_TRANSFER_TIME", title: "[R] Transfer(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 19, field: "SEND_CONFERENCE_COUNT", title: "[S] Conference", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 20, field: "SEND_CONFERENCE_TIME", title: "[S] Conference(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 21, field: "RECV_CONFERENCE_COUNT", title: "[R] Conference", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 22, field: "RECV_CONFERENCE_TIME", title: "[R] Conference(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           }
                        ]
                     },
                     AGENT_STATS_AGENT : {
                        URL : "/cairo/caching/stats/agent",
                        COLUMN : [
                           {
                              id: 1, field: "TEAM_ID", title: "Tenant ID", locked: true, width: "120px",
                              pk: true,
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 2, field: "AGENT_ID", title: "Agent ID", locked: true, width: "120px",
                              pk: true,
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 3, field: "AGENT_NAME", title: "Agent Name", locked: true, width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 4, field: "INBOUND_COUNT", title: "Inbound", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 5, field: "INBOUND_TIME", title: "Inbound(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 6, field: "OUTBOUND_COUNT", title: "Outbound", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 7, field: "OUTBOUND_TIME", title: "Outbound(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 8, field: "SEND_INTERNAL_COUNT", title: "[S] Internal", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 11, field: "SEND_INTERNAL_TIME", title: "[S] Internal(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 12, field: "RECV_INTERNAL_COUNT", title: "[R] Internal", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 13, field: "RECV_INTERNAL_TIME", title: "[R] Internal(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 14, field: "SEND_CONSULT_COUNT", title: "[S] Consult", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 15, field: "SEND_CONSULT_TIME", title: "[S] Consult(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 16, field: "RECV_CONSULT_COUNT", title: "[R] Consult", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 17, field: "RECV_CONSULT_TIME", title: "[R] Consult(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 18, field: "SEND_TRANSFER_COUNT", title: "[S] Transfer", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 19, field: "SEND_TRANSFER_TIME", title: "[S] Transfer(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 20, field: "RECV_TRANSFER_COUNT", title: "[R] Transfer", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 21, field: "RECV_TRANSFER_TIME", title: "[R] Transfer(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 22, field: "SEND_CONFERENCE_COUNT", title: "[S] Conference", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 23, field: "SEND_CONFERENCE_TIME", title: "[S] Conference(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           },
                           {
                              id: 24, field: "RECV_CONFERENCE_COUNT", title: "[R] Conference", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" }
                           },
                           {
                              id: 25, field: "RECV_CONFERENCE_TIME", title: "[R] Conference(sec)", width: "120px",
                              attributes: { "class": "table-cell", style: "text-align: center;" },
                              type: "time"
                           }
                        ]
                     }
                  }
               }
            }, // end of Agent Stats

            /**
             * Queue
             */
            QUEUE : {
               LEFT : {
                  QUEUE_TREEVIEW : {
                     TEXT_FIELD: ["dnsub", "queue"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "dnsub",
                           DATA   : "%.shared._queue.dnsub",
                           PIN    : "DNSUB_ID",
                           TXT    : "@=DNSUB_ID [@=DNSUB_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "queue",
                           DATA   : "%.shared._queue.queue",
                           PIN    : "QUEUE_ID",
                           TXT    : "@=QUEUE_ID"
                        }
                     }
                  }
               },
               CENTER : {
                  SERVICE_LEVEL : {
                     TITLE: "SERVICE LEVEL(%)",
                     DEFAULT: "0.0",
                     BIND: "(@=EXP_ABANDON + @=EXP_DISTRIBUTE) / @=REAL_ENTER * 100"
                  },
                  ANSWER_RATE : {
                     TITLE: "ANSWER RATE(%)",
                     DEFAULT: "0.0",
                     BIND: "@=DISTRIBUTE / @=REAL_ENTER * 100"
                  },
                  REAL_ENTER : {
                     TITLE: "REAL ENTER",
                     DEFAULT: "0",
                     BIND: "@=DISTRIBUTE + @=ABANDON + @=NONSERVICE + @=FAIL_CALL"
                  },
                  WAITING_CALL : {
                     TITLE: "WAITING CALL",
                     DEFAULT: "0",
                     BIND: "@=WAIT_NO"
                  },
                  QUEUE_STATS  : {
                     FIELDS : [
                        "WAIT_NO", "ENTER", "FAIL_CALL", "NONSERVICE",
                        "DISTRIBUTE", "ABANDON", "TRANSFER", "CALLBACK", "EXTENAL",
                        "EXP_ABANDON", "EXP_DISTRIBUTE"
                     ],
                     BIND : {
                        "Waiting" : "WAIT_NO",
                        "Enter" : "ENTER",
                        "Fail" : "FAIL_CALL",
                        "Nonservice" : "NONSERVICE",
                        "Distribute" : "DISTRIBUTE",
                        "Abandon" : "ABANDON",
                        "Transfer" : "TRANSFER",
                        "Callback" : "CALLBACK",
                        "External" : "EXTENAL"
                     }
                  },
                  DONUTCHART : {
                     TITLE : "QUEUE STATISTICS",
                     BIND : {
                        "Waiting" : "@=WAIT_NO/@=ENTER",
                        "Fail" : "@=FAIL_CALL/@=ENTER",
                        "Nonservice" : "@=NONSERVICE/@=ENTER",
                        "Distribute" : "@=DISTRIBUTE/@=ENTER",
                        "Abandon" : "@=ABANDON/@=ENTER",
                        "Transfer" : "@=TRANSFER/@=ENTER",
                        "Callback" : "@=CALLBACK/@=ENTER",
                        "External" : "@=EXTENAL/@=ENTER"
                     }
                  }
               },
               RIGHT : {
                  QUEUE_LISTBOX : {
                     BIND : ["QUEUE_ID"]
                  }
               }
            }, // end of Queue

            /**
             * Board
             */
            BOARD : {
               TOP : {
                  BOARD_AGENT_STATE  : {
                    FIELDS : ["AGENT_MODE","AGENT_TIME", "DN_ID","LOGIN_ID"],
                      //20180423 Sam #22981
                         /*
                         "AGENT_MODE", "REASON_CODE", "AGENT_TIME", "LOGIN_ID", "DN_ID",
                         "CALL_TYPE", "CALL_KIND", "CALL_COUNT", "SKILL_ID"
                      ],
                      */
                     BIND : {
                        "Mode" : "AGENT_MODE",
                        // "Reason" : "REASON_CODE", // jesse 20180412
                        "Duration Time" : "AGENT_TIME",
                        "DN" : "DN_ID",
                        "Login ID" : "LOGIN_ID",
                        //20180423 Sam #22981
                        //"Skill ID" : "SKILL_ID",
                        //"Call Count" : "CALL_COUNT",
                        //"Call Type" : "CALL_TYPE",
                        //"Call Kind" : "CALL_KIND"
                     }
                  },
                  BOARD_AGENT_REPORT : {
                     FIELDS : [
                        "READY_COUNT", "READY_TIME", "NOTREADY_COUNT", "NOTREADY_TIME",
                        "ACW_COUNT", "ACW_TIME", "OTHERWORK_COUNT", "OTHERWORK_TIME"
                     ],
                     BIND : {
                        "Ready" : ["READY_TIME", "READY_COUNT"],
                        "Not Ready" : ["NOTREADY_TIME", "NOTREADY_COUNT"],
                        "After Call Work" : ["ACW_TIME", "ACW_COUNT"],
                        "Other Work" : ["OTHERWORK_TIME", "OTHERWORK_COUNT"]
                     }
                  },
                  BOARD_QUEUE_STATS  : {
                     SELECT : {
                        DATA : "%.shared._queue.queue",
                        TEXT_FIELD : "QUEUE_ID",
                        PLACEHOLDER : "Select ..."
                     },
                     FIELDS : [
                        "WAIT_NO", "ENTER", "ANSWER", "FAIL_CALL", "NONSERVICE"
                     ],
                     BIND : {
                        "Waiting Call" : "WAIT_NO",
                        "Enter Call" : "ENTER",
                        "Answer Call" : "ANSWER",
                        "Fail Call" : "FAIL_CALL",
                        "Nonservice Call" : "NONSERVICE"
                     }
                  }
               },
               BOTTOM : {
                  BARCHART : {
                     TITLE : "AGENT STATISTICS",
                     BIND : [
                        { depth: "$=TENANT", inAgents: "TEAM_IB_AGENTS", inCount: "TEAM_IB_COUNT", outAgents: "TEAM_OB_AGENTS", outCount:"TEAM_OB_COUNT" },
                        { depth: "$=AGENT", inCount: "INBOUND_COUNT", outCount:"OUTBOUND_COUNT" },
                     ]
                  }
               },
               RIGHT : {
                  BOARD_AGENT_STATS  : {
                     FIELDS : [
                        "TEAM_IB_AGENTS", "TEAM_IB_COUNT", "TEAM_IB_TIME",
                        "TEAM_OB_AGENTS", "TEAM_OB_COUNT", "TEAM_OB_TIME",
                        "INBOUND_COUNT", "INBOUND_TIME",
                        "OUTBOUND_COUNT", "OUTBOUND_TIME"
                     ],
                     BIND : {
                        "[T] In  Bound - Agents" : "TEAM_IB_AGENTS",
                        "[T] In  Bound - Count" : "TEAM_IB_COUNT",
                        "[T] In  Bound - Time" : "TEAM_IB_TIME",
                        "[T] Out Bound - Agents" : "TEAM_OB_AGENTS",
                        "[T] Out Bound - Count" : "TEAM_OB_COUNT",
                        "[T] Out Bound - Time" : "TEAM_OB_TIME",
                        "[A] In  Bound - Count" : "INBOUND_COUNT",
                        "[A] In  Bound - Time" : "INBOUND_TIME",
                        "[A] Out Bound - Count" : "OUTBOUND_COUNT",
                        "[A] Out Bound - Time" : "OUTBOUND_TIME",
                     }
                  }
               }
            }, // end of Board


            /**
             * User
             */
            USER_DEFINE : {
               TOP : {
                  USER_BUTTONS  : {
                     BUTTON_1: "AGENT LIST",
                     BUTTON_2: "AGENT (IB)",
                     BUTTON_3: "AGENT (OB)",
                     BUTTON_4: "AGENT STATS",
                     BUTTON_5: "QUEUE LIST",
                     BUTTON_6: "QUEUE STATS",
                     BUTTON_7: "QUEUE",
                     BUTTON_8: "AGENT STATE",
                  },
               },
               BOTTOM : {
                  USER_AGENT_LIST : {
                     FIELDS : [
                        "TEAM_ID", "AGENT_ID", "AGENT_NAME",
                        "INBOUND_COUNT", "OUTBOUND_COUNT"
                     ],
                     BIND : {
                        "AGENT" : "AGENT_ID",
                        "NAME"  : "AGENT_NAME",
                        "IN"    : "INBOUND_COUNT",
                        "OUT"   : "OUTBOUND_COUNT"
                     }
                  },
                  USER_AGENT_INBOUND : {
                     FIELDS : [
                        "TEAM_ID", "AGENT_ID", "AGENT_NAME",
                        "INBOUND_COUNT", "INBOUND_TIME"
                     ],
                     BIND : {
                        "AGENT" : "AGENT_ID",
                        "NAME"  : "AGENT_NAME",
                        "COUNT" : "INBOUND_COUNT",
                        "TIME"  : "INBOUND_TIME"
                     }
                  },
                  USER_AGENT_OUTBOUND : {
                     FIELDS : [
                        "TEAM_ID", "AGENT_ID", "AGENT_NAME",
                        "OUTBOUND_COUNT", "OUTBOUND_TIME"
                     ],
                     BIND : {
                        "AGENT" : "AGENT_ID",
                        "NAME"  : "AGENT_NAME",
                        "COUNT" : "OUTBOUND_COUNT",
                        "TIME"  : "OUTBOUND_TIME"
                     }
                  },
                  USER_AGENT_STATS : {
                     FIELDS : [
                        "INBOUND_COUNT", "OUTBOUND_COUNT",
                        "SEND_INTERNAL_COUNT", "RECV_INTERNAL_COUNT",
                        "SEND_CONSULT_COUNT", "RECV_CONSULT_COUNT",
                        "SEND_TRANSFER_COUNT", "RECV_TRANSFER_COUNT",
                        "SEND_CONFERENCE_COUNT", "RECV_CONFERENCE_COUNT"
                     ],
                     BIND : {
                        "Inbound Call"  : "INBOUND_COUNT",
                        "Outbound Call" : "OUTBOUND_COUNT",
                        "Internal (Send/Recv)"   : ["SEND_INTERNAL_COUNT", "RECV_INTERNAL_COUNT"],
                        "Consult (Send/Recv)"    : ["SEND_CONSULT_COUNT", "RECV_CONSULT_COUNT"],
                        "Transfer (Send/Recv)"   : ["SEND_TRANSFER_COUNT", "RECV_TRANSFER_COUNT"],
                        "Conference (Send/Recv)" : ["SEND_CONFERENCE_COUNT", "RECV_CONFERENCE_COUNT"]
                     }
                  },
                  USER_QUEUE_LIST : {
                     FIELDS : [
                        "SUB_ID", "ROUTE_ID", "ROUTE_NAME",
                        "ENTER", "DISTRIBUTE", "ABANDON",
                        "NONSERVICE", "WAIT_NO"
                     ],
                     BIND : {
                        "QUEUE" : "ROUTE_ID",
                        "NAME"  : "ROUTE_NAME",
                        "ENTER" : "ENTER",
                        "DISTRIBUTE" : "DISTRIBUTE",
                        "ABANDON"    : "ABANDON",
                        "NONSERVICE" : "NONSERVICE",
                        "WAITING"    : "WAIT_NO",
                     }
                  },
                  USER_QUEUE_STATS : {
                     FIELDS : [
                        "ENTER", "DISTRIBUTE",
                        "SERVICE_LEVEL", "ANSWER_RATE"
                     ],
                     BIND : {
                        "Enter Call"      : "ENTER",
                        "Distribute Call" : "DISTRIBUTE",
                        "Service Level"   : "SERVICE_LEVEL",
                        "Answer Rate"     : "ANSWER_RATE"
                     }
                  },
                  USER_QUEUE_CHART : {
                     FIELDS : [
                        "ENTER", "DISTRIBUTE", "ABANDON", "NONSERVICE"
                     ],
                     BIND : {
                        "DISTRIBUTE" : "@=DISTRIBUTE/@=ENTER",
                        "ABANDON"    : "@=ABANDON/@=ENTER",
                        "NONSERVICE" : "@=NONSERVICE/@=ENTER",
                     }
                  },
                  USER_AGENT_CHART : {
                     FIELDS : [
                        "AGENT_COUNT", "READY_COUNT", "NOTREADY_COUNT",
                        "ACW_COUNT", "OTHERWORK_COUNT",
                     ],
                     BIND : {
                        "READY"    : "@=READY_COUNT/@=AGENT_COUNT",
                        "NOTREADY" : "@=NOTREADY_COUNT/@=AGENT_COUNT",
                        "ACW"      : "@=ACW_COUNT/@=AGENT_COUNT",
                        "OTHERWORK": "@=OTHERWORK_COUNT/@=AGENT_COUNT",
                     }
                  },
               }
            }, // end of user
         },
         COMMENT : {
         }
      }; //end of _DEFINE


      return _DEFINE;
   }
);
