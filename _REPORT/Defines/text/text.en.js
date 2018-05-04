'use strict';

define(["../../Library/report.validation"],
   function( _Validation ) {

      /***********************************************************
       * name        : text.en
       * url         : Defines/text/text.en.js
       * description : 화면 text 및 설정 정의
       ************************************************************/

      /**
       * GRID
       */
      var _GRID_DEFINE = {
            // 상담원 통계
            _AGENT_STATS : {
               COLUMN : [
                  {
                     id: 1, field: "EMPLOYEEPART_ID", title: "Tenant ID", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "EMPLOYEEPART_NAME", title: "Tenant Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "EMPLOYEE_ID", title: "Agent ID", locked: true, width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "EMPLOYEE_NAME", title: "Agent Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "CALL_KIND", title: "Call Kind", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 6, field: "IBCALL_COUNT", title: "Inbound", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 7, field: "OBCALL_COUNT", title: "Outbound", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 8, field: "ITCALL", title: "Internal", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 9, field: "CSCALL", title: "Consult", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 10, field: "TRCALL", title: "Transfer", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 11, field: "CFCALL", title: "Conference", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
                        EMPLOYEEPART_ID   : { type: "number" },
                        EMPLOYEEPART_NAME : { type: "string" },
                        EMPLOYEE_ID       : { type: "string" },
                        EMPLOYEE_NAME     : { type: "string" },
                        CALL_KIND         : { type: "number" },
                        IBCALL_COUNT      : { type: "number" },
                        OBCALL_COUNT      : { type: "number" },
                        ITCALL            : { type: "number" },
                        CSCALL            : { type: "number" },
                        TRCALL            : { type: "number" },
                        CFCALL            : { type: "number" },
                     }
                  }
               }
            }, // agent stats
            // 상담원 상태 통계
            _AGENT_STATE : {
               COLUMN : [
                  {
                     id: 1, hidden: true, field: "EMPLOYEEPART_ID", title: "Tenant ID", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, hidden: true, field: "EMPLOYEEPART_NAME", title: "Tenant Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "EMPLOYEE_ID", title: "Agent ID", locked: true, width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "EMPLOYEE_NAME", title: "Agent Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "CALL_KIND", title: "Call Kind", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 6, field: "TOTAL_COUNT", title: "Total Count", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 7, field: "TOTAL_TIME", title: "Total Time", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 8, field: "READY_COUNT", title: "Ready Count", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 9, field: "READY_TIME", title: "Ready Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 10, field: "BUSY_COUNT", title: "Busy Count", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 11, field: "BUSY_TIME", title: "Busy Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 12, field: "ACW_COUNT", title: "ACW Count", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 13, field: "ACW_TIME", title: "ACW Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 14, field: "NRD_COUNT", title: "NotReady Count", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 15, field: "NRD_TIME", title: "NotReady Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
                        EMPLOYEEPART_ID   : { type: "number" },
                        EMPLOYEEPART_NAME : { type: "string" },
                        EMPLOYEE_ID       : { type: "string" },
                        EMPLOYEE_NAME     : { type: "string" },
                        CALL_KIND         : { type: "number" },
                        TOTAL_COUNT       : { type: "number" },
                        TOTAL_TIME        : { type: "string" },
                        READY_COUNT       : { type: "number" },
                        READY_TIME        : { type: "string" },
                        BUSY_COUNT        : { type: "number" },
                        BUSY_TIME         : { type: "string" },
                        ACW_COUNT         : { type: "number" },
                        ACW_TIME          : { type: "string" },
                        NRD_COUNT         : { type: "number" },
                        NRD_TIME          : { type: "string" },
                     }
                  }
               }
            }, // agent state
            // 큐 통계
            _QUEUE : {
               COLUMN : [
                  {
                     id: 1, field: "QUEUE_ID", title: "Queue ID", locked: true, width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "QUEUE_NAME", title: "Queue Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "CALL_KIND", title: "Queue ID", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "TOTAL_COUNT", title: "Total Count", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "ENTER_COUNT", title: "Enter", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 6, field: "ORGENTER_COUNT", title: "Orgenter", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 7, field: "DISTRIBUTE_COUNT", title: "Distribute", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 8, field: "ABANDON_COUNT", title: "Abandon", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 9, field: "NONSERVICE_COUNT", title: "Nonservice", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 10, field: "OUTDISTRIBUTE_COUNT", title: "Outdistribute", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 11, field: "FAIL_COUNT", title: "Fail", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 12, field: "CALLBACK_COUNT", title: "Callback", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "QUEUE_ID",
                     fields : {
                        QUEUE_ID            : { type: "string" },
                        QUEUE_NAME          : { type: "string" },
                        CALL_KIND           : { type: "number" },
                        TOTAL_COUNT         : { type: "number" },
                        ENTER_COUNT         : { type: "number" },
                        ORGENTER_COUNT      : { type: "number" },
                        DISTRIBUTE_COUNT    : { type: "number" },
                        ABANDON_COUNT       : { type: "number" },
                        NONSERVICE_COUNT    : { type: "number" },
                        OUTDISTRIBUTE_COUNT : { type: "number" },
                        FAIL_COUNT          : { type: "number" },
                        CALLBACK_COUNT      : { type: "number" }
                     }
                  }
               }
            }, // queue
            // 스킬 통계
            _SKILL : {
               COLUMN : [
                  {
                     id: 1, field: "EMPLOYEEPART_ID", title: "Tenant ID", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "EMPLOYEEPART_NAME", title: "Tenant Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "EMPLOYEE_ID", title: "Agent ID", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "EMPLOYEE_NAME", title: "Agent Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "SKILL_ID", title: "Skill ID", locked: true, width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 6, field: "SKILL_NAME", title: "Skill Name", locked: true, width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 7, field: "ANSWER_COUNT", title: "Answer Count", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 8, field: "ANSWER_TIME", title: "Answer Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 9, field: "ABANDON_COUNT", title: "Abandon Count", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 10, field: "ABANDON_TIME", title: "Abandon Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
               ],
               SCHEMA : {
                  model : {
                     id : "SKILL_ID",
                     fields : {
                        EMPLOYEEPART_ID   : { type: "number" },
                        EMPLOYEEPART_NAME : { type: "string" },
                        EMPLOYEE_ID       : { type: "string" },
                        EMPLOYEE_NAME     : { type: "string" },
                        SKILL_ID          : { type: "number" },
                        SKILL_NAME        : { type: "string" },
                        ANSWER_COUNT      : { type: "number" },
                        ANSWER_TIME       : { type: "string" },
                        ABANDON_COUNT     : { type: "number" },
                        ABANDON_TIME      : { type: "string" },
                     }
                  }
               }
            }, // skill

            // IVR 통계                        
            _IVR : {
                  COLUMN : [
                        {
                        id: 1, field: "SERVICE_CODE", title: "SERVICE CODE", locked: true, width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 2, field: "SERVICE_NAME", title: "SERVICE NAME", locked: true, width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 3, field: "ARS_COUNT", title: "ARS COUNT",  width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 4, field: "NOSERVICE_COUNT", title: "NOSERVICE COUNT", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 5, field: "SERVICE_COUNT", title: "SERVICE COUNT",  width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 6, field: "QUEUEENTER_COUNT", title: "QUEUEENTER COUNT",  width: "130px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        }
              
                  ],
                  SCHEMA : {
                        model : {
                        id : "SERVICE_CODE",
                        fields : {
                              SERVICE_CODE      : { type: "string" },
                              SERVICE_NAME      : { type: "string" },
                              ARS_COUNT         : { type: "number" },
                              NOSERVICE_COUNT   : { type: "number" },
                              SERVICE_COUNT     : { type: "number" },
                              QUEUEENTER_COUNT  : { type: "number" }
                              
                        }
                        }
                  }
            }, // ivr


            //select CONNECT_ID , CHANNEL_DN , EVENT_STARTTIME ,SERVICE_CODE , SERVICE_NAME , STATE_TIME ,ANI
            _TRACETOP: {
                  COLUMN : [
                        {
                        id: 1, field: "CONNECT_ID", title: "CONNECT_ID", locked: true, width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 2, field: "CHANNEL_DN", title: "CHANNEL_DN", locked: true, width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 3, field: "EVENT_STARTTIME", title: "EVENT_STARTTIME",  width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 4, field: "SERVICE_CODE", title: "SERVICE_CODE", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 5, field: "SERVICE_NAME", title: "SERVICE_NAME",  width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 6, field: "STATE_TIME", title: "STATE_TIME",  width: "130px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                        id: 7, field: "ANI", title: "ANI",  width: "130px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                        }
              
                  ],
                  SCHEMA : {
                        model : {
                        id : "CONNECT_ID",
                        fields : {
                              CONNECT_ID              : { type: "string" },
                              CHANNEL_DN              : { type: "string" },
                              EVENT_STARTTIME         : { type: "string" },
                              SERVICE_CODE            : { type: "string" },
                              SERVICE_NAME            : { type: "string" },
                              STATE_TIME              : { type: "number" },
                              ANI                     : { type: "string" }
                              
                        }
                        }
                  }
            }, // trace top


      };



      /**
       * DEFINE
       */
      var _DEFINE = {
         // 사이드 메뉴바
         SIDEBAR : {
            BUTTON_1 : "HOME",
            BUTTON_2 : "RESOURCE",
            BUTTON_3 : "AGENT",
            BUTTON_4 : "STATE",
            BUTTON_5 : "QUEUE",
            BUTTON_6 : "SKILL",
            BUTTON_7 : "IVR",
            BUTTON_8 : "ISSUE TRACKER"

         },
         CONTENTS : {
            /**
             * loading
             */
            LOADING : {
            },


            /**
             * push
             * websocket 을 통해 받은 데이터 정보의 형식을 맞추기위한 설정
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
                  "dnsub" : {
                     TENANT_ID : "DNSUB_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "DNMAJOR_ID", "DNSUB_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNSUB_ID"     : { field: "DNSUB_ID", type: "number" },
                        "DNSUB_NAME"   : { field: "DNSUB_NAME", type: "string" }
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
                  },
               
            }
            },


            /**
             * resource
             */
            RESOURCE : {
               LEFT : {
                  // 상담원
                  TREEVIEW_AGENT : {
                     TEXT_FIELD: ["team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           DATA   : "DBMS_TEAM",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH2: {
                           TAG    : "agent",
                           DATA   : "DBMS_AGENT",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  // 큐
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
                           TXT    : "@=QUEUE_ID",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  // 스킬
                  TREEVIEW_SKILL : {
                     TEXT_FIELD: ["center", "tenant", "skill"],
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
             * Container
             */
            CONTAINER : {
               CENTER : {
                  // 탭 타이틀
                  TABSTRIP : {
                     AGENT           : { TITLE : "AGENT STATISTICS" },
                     STATE           : { TITLE : "AGENT STATE" },
                     QUEUE           : { TITLE : "QUEUE STATISTICS" },
                     SKILL           : { TITLE : "SKILL STATISTICS" },
                     IVR             : { TITLE : "IVR STATISTICS" },
                     TRACE           : { TITLE : "ISSUE TRACKER" },


                     TREEVIEW_AGENT  : { TITLE : "AGENT STATISTICS SELECT" },
                     TREEVIEW_QUEUE  : { TITLE : "QUEUE STATISTICS SELECT" },
                     TREEVIEW_SKILL  : { TITLE : "SKILL STATISTICS SELECT" },
                     TREEVIEW_IVR    : { TITLE : "IVR STATISTICS SELECT" }
                  }
               }
            },


            /**
             * ContainerGrid
             * 트리에 check box가 check 되어지면 구성되어지는 화면
             */
            CONTAINER_GRID : {
               // 상단에 check 된 정보 리스트
               TOP : {
                  MENU_LIST : {
                     AGENT_GRID : {
                        TEXT_FIELD : "EMPLOYEE_ID"
                     },
                     QUEUE_GRID : {
                        TEXT_FIELD : "QUEUE_ID"
                     },
                     SKILL_GRID : {
                        TEXT_FIELD : "SKILL_ID"
                     },
                     IVR_GRID : {
                        TEXT_FIELD : "SERVICE_CODE"
                     },
                  }
               },
               // grid
               CENTER : {
                  SELECTED_GRID : {
                     AGENT_GRID : {
                        FILENAME : "ccc_report_agent_stats",
                        DATA     : "DBMS_AGENT_STATS",
                        COLUMN   : _GRID_DEFINE._AGENT_STATS.COLUMN,
                        SCHEMA   : _GRID_DEFINE._AGENT_STATS.SCHEMA
                     },
                     QUEUE_GRID : {
                        FILENAME : "ccc_report_queue_stats",
                        DATA     : "DBMS_QUEUE",
                        COLUMN   : _GRID_DEFINE._QUEUE.COLUMN,
                        SCHEMA   : _GRID_DEFINE._QUEUE.SCHEMA
                     }, // queue
                     SKILL_GRID : {
                        FILENAME : "ccc_report_skill_stats",
                        DATA     : "DBMS_SKILL",
                        COLUMN   : _GRID_DEFINE._SKILL.COLUMN,
                        SCHEMA   : _GRID_DEFINE._SKILL.SCHEMA
                     }, // skill
                     IVR_GRID : {
                        FILENAME : "ccc_report_ivr_stats",
                        DATA     : "DBMS_IVR",
                        COLUMN   : _GRID_DEFINE._IVR.COLUMN,
                        SCHEMA   : _GRID_DEFINE._IVR.SCHEMA
                     },
                     TRACE_GRID_TOP : {
                        FILENAME : "ccc_report_ivr_stats",
                        DATA     : "DBMS_TRACE_TOP",
                        COLUMN   : _GRID_DEFINE._TRACETOP.COLUMN,
                        SCHEMA   : _GRID_DEFINE._TRACETOP.SCHEMA
                     },
                     TRACE_GRID_BOTTOM : {
                        FILENAME : "ccc_report_ivr_stats",
                        DATA     : "DBMS_TRACE_BOTTOM",
                        COLUMN   : _GRID_DEFINE._IVR.COLUMN,
                        SCHEMA   : _GRID_DEFINE._IVR.SCHEMA
                     },
                  }
               },
               // chart
               BOTTOM : {
                  BARCHART : {
                     AGENT_GRID : {
                        TITLE : "AGENT STATISTICS",
                        BIND : {
                           depth: { field: "EMPLOYEE_ID", type: "string" },
                           ibcount: { field: "IBCALL_COUNT", type: "number" },
                           obcount: { field: "OBCALL_COUNT", type: "number" }
                        },
                        SERIES : [
                           {
                              type: "column",
                              field: "ibcount",
                              name: "Inbound Count"
                           },
                           {
                              type: "column",
                              field: "obcount",
                              name: "Outbound Count"
                           }
                        ],
                        VALUE : [
                           {
                              
                              title: { text: "Count" },
                              min: 0,                             
                              color: "#ff6800"
                           }
                        ]
                     },
                     QUEUE_GRID : {
                        TITLE : "QUEUE STATISTICS",
                        BIND : {
                           depth: { field: "QUEUE_ID", type: "string" },
                           total_count: { field: "TOTAL_COUNT", type: "number" },
                           fail_count: { field: "FAIL_COUNT", type: "number" }
                        },
                        SERIES : [
                           {
                              type: "column",
                              field: "total_count",
                              name: "Total Count"                             
                           },
                           {
                              type: "column",
                              field: "fail_count",
                              name: "Fail Count"
                           }
                        ],
                        VALUE : [
                           {
                             
                              title: { text: "Count" },
                              min: 0,                             
                              color: "#ff6800"
                           }
                        ]
                     }, // queue
                     SKILL_GRID : {
                        TITLE : "SKILL STATISTICS",
                        BIND : {
                           depth: { field: "SKILL_ID", type: "number" },
                           answer_count: { field: "ANSWER_COUNT", type: "number" },
                           abandon_count: { field: "ABANDON_COUNT", type: "number" }
                        },
                        SERIES : [
                           {
                              type: "column",
                              field: "answer_count",
                              name: "Answer Count"                             
                           },
                           {
                              type: "column",
                              field: "abandon_count",
                              name: "Abandon Count"
                           }
                        ],
                        VALUE : [
                           {
                              title: { text: "Count" },
                              min: 0,                              
                              color: "#ff6800"
                           }
                        ]
                     }, // skill
                     IVR_GRID : {
                        TITLE : "IVR STATISTICS",
                        BIND : {
                           depth: { field: "SERVICE_CODE", type: "number" },
                           ars_count: { field: "ARS_COUNT", type: "number" },
                           nonservice_count: { field: "NOSERVICE_COUNT", type: "number" },
                           service_count: { field: "SERVICE_COUNT", type: "number" },
                           queueenter_count: { field: "QUEUEENTER_COUNT", type: "number" }
                        },
                        SERIES : [
                           {
                              type: "column",
                              field: "ars_count",
                              name: "ARS Count"
                           },
                           {
                              type: "column",
                              field: "nonservice_count",
                              name: "Nonservice Count"
                           },
                           {
                              type: "column",
                              field: "service_count",
                              name: "Service Count"
                           },
                           {
                              type: "column",
                              field: "queueenter_count",
                              name: "Queue Enter Count"
                           }
                        ],
                        VALUE : [
                           {
                              title: { text: "Count" },
                              min: 0,                              
                              color: "#ff6800"
                           }
                        ]
                     }, // ivr
                  }
               }
            },


            /**
             * ContainerGridAll
             * 사이드바에 메뉴가 클릭 되어지면 구성되어지는 화면
             */
            CONTAINER_GRID_ALL : {
               // grid
               TOP : {
                  ALL_GRID : {
                     AGENT_STATE : {
                        FILENAME : "ccc_report_agent_state",
                        DATA     : "DBMS_AGENT_STATE",
                        COLUMN   : _GRID_DEFINE._AGENT_STATE.COLUMN,
                        SCHEMA   : _GRID_DEFINE._AGENT_STATE.SCHEMA
                     },
                  }
               },
               // chart
               BOTTOM : {
                  ALL_BARCHART : {
                     AGENT_STATE : {
                        TITLE : "AGENT STATE",
                        BIND : {
                           depth: { field: "EMPLOYEE_ID", type: "string" },
                           count: { field: "TOTAL_COUNT", type: "number" },
                           time: { field: "TOTAL_TIME", type: "time" }
                        },
                        SERIES : [
                           {
                              type: "column",
                              field: "count",
                              name: "Agent State Count"
                           },
                           {
                              type: "column",
                              field: "time",
                              name: "Agent State Time"                             
                           }
                        ],
                        VALUE : [
                           {                             
                              title: { text: "Count" },
                              min: 0,                             
                              color: "#ff6800"
                           }
                        ],                       
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
