'use strict';

define([],
   function() {

      /***********************************************************
       * name        : dbms.maria
       * url         : Defines/dbms/dbms.maria.js
       * description : dbms 쿼리 정의
       ************************************************************/

      var _DEFINE = function( _PARAM ) {

         return {
         //////////////////////////////////////////////////////////
         //////////////////////////////////////////////////////////

         /**
          * loading
          */
         LOADING : {
         },


         /**
          * resource
          * 트리를 위한 쿼리
          */
         RESOURCE : {
               DBMS_TEAM : {
                  URL    : "/cairo/selector/master/team",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEEPART_NAME, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEEPART " +
                           "WHERE EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID
               },
               DBMS_AGENT: {
                  URL    : "/cairo/selector/master/agent",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, EMPLOYEE_NAME, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEE " +
                           "WHERE EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID
               },
               DBMS_SUB : {
                  URL    : "/cairo/selector/master/dnsub",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DNSUB_NAME " +
                           "FROM MA_DNSUBCATEGORY " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_QUEUE : {
                  URL    : "/cairo/selector/master/queue",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, MONITOR_FLAG " +
                           "FROM MA_QUEUE " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_SKILL : {
                  URL    : "/cairo/selector/master/skill",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, SKILL_ID, SKILL_NAME " +
                           "FROM MA_SKILL"
               },
               DBMS_IVR : {
                URL    : "/cairo/selector/master/ivr",
                QUERY  : "SELECT CENTER_ID, TENANT_ID, SERVICE_CODE, SERVICE_NAME " +
                         "FROM MA_IVR"
             }
         }, // end of resource


         /**
          * ContainerGrid
          * grid에 search 버튼이 눌렀을 경우 요청되는 쿼리
          */
         CONTAINER_GRID : {
               DBMS_AGENT_STATS : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/stats/agentStats",
                     QUERY : "SELECT a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND, " +
                             "IFNULL(SUM(a.IBCALL_COUNT),0) IBCALL_COUNT, " +
                             "IFNULL(SUM(a.OBCALL_COUNT),0) OBCALL_COUNT, " +
                             "IFNULL(SUM(a.ITCALL_SCOUNT),0) + IFNULL(SUM(a.ITCALL_RCOUNT),0) ITCALL, " +
                             "IFNULL(SUM(a.CSCALL_SCOUNT),0) + IFNULL(SUM(a.CSCALL_RCOUNT),0) CSCALL, " +
                             "IFNULL(SUM(a.TRCALL_SCOUNT),0) + IFNULL(SUM(a.TRCALL_RCOUNT),0) TRCALL, " +
                             "IFNULL(SUM(a.CFCALL_SCOUNT),0) + IFNULL(SUM(a.CFCALL_RCOUNT),0) CFCALL " +
                             "FROM VIEW_RE_EMPLOYEECALL_H a " +
                             "WHERE " +
                             "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND " +
                             "ORDER BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  },
                  SELECT : {
                     URL : "/cairo/selector/stats/agentStats",
                     QUERY : "SELECT a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND, " +
                             "IFNULL(SUM(a.IBCALL_COUNT),0) IBCALL_COUNT, " +
                             "IFNULL(SUM(a.OBCALL_COUNT),0) OBCALL_COUNT, " +
                             "IFNULL(SUM(a.ITCALL_SCOUNT),0) + IFNULL(SUM(a.ITCALL_RCOUNT),0) ITCALL, " +
                             "IFNULL(SUM(a.CSCALL_SCOUNT),0) + IFNULL(SUM(a.CSCALL_RCOUNT),0) CSCALL, " +
                             "IFNULL(SUM(a.TRCALL_SCOUNT),0) + IFNULL(SUM(a.TRCALL_RCOUNT),0) TRCALL, " +
                             "IFNULL(SUM(a.CFCALL_SCOUNT),0) + IFNULL(SUM(a.CFCALL_RCOUNT),0) CFCALL " +
                             "FROM VIEW_RE_EMPLOYEECALL_H a " +
                             "WHERE " +
                             "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "a.EMPLOYEE_ID = ? AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND " +
                             "ORDER BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  }
               }, // agent stats
               DBMS_QUEUE : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/stats/queue",
                     QUERY : "SELECT a.QUEUE_ID, a.QUEUE_NAME, a.CALL_KIND, " +
                             "IFNULL(SUM(a.ENTER_COUNT),0) ENTER_COUNT, " +
                             "IFNULL(SUM(a.ORGENTER_COUNT),0) ORGENTER_COUNT, " +
                             "IFNULL(SUM(a.DISTRIBUTE_COUNT),0) DISTRIBUTE_COUNT, " +
                             "IFNULL(SUM(a.ABANDON_COUNT),0) ABANDON_COUNT, " +
                             "IFNULL(SUM(a.NONSERVICE_COUNT),0) NONSERVICE_COUNT, " +
                             "IFNULL(SUM(a.OUTDISTRIBUTE_COUNT),0) OUTDISTRIBUTE_COUNT, " +
                             "IFNULL(SUM(a.FAIL_COUNT),0) FAIL_COUNT, " +
                             "IFNULL(SUM(a.CALLBACK_COUNT),0) CALLBACK_COUNT " +
                             "FROM VIEW_RE_QUEUESTATL_H a " +
                             "WHERE " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.QUEUE_ID, a.QUEUE_NAME, a.CALL_KIND " +
                             "ORDER BY a.QUEUE_ID, a.QUEUE_NAME, a.CALL_KIND",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  },
                  SELECT : {
                     URL : "/cairo/selector/stats/queue",
                     QUERY : "SELECT a.QUEUE_ID, a.QUEUE_NAME, a.CALL_KIND, " +
                             "IFNULL(SUM(a.ENTER_COUNT),0) ENTER_COUNT, " +
                             "IFNULL(SUM(a.ORGENTER_COUNT),0) ORGENTER_COUNT, " +
                             "IFNULL(SUM(a.DISTRIBUTE_COUNT),0) DISTRIBUTE_COUNT, " +
                             "IFNULL(SUM(a.ABANDON_COUNT),0) ABANDON_COUNT, " +
                             "IFNULL(SUM(a.NONSERVICE_COUNT),0) NONSERVICE_COUNT, " +
                             "IFNULL(SUM(a.OUTDISTRIBUTE_COUNT),0) OUTDISTRIBUTE_COUNT, " +
                             "IFNULL(SUM(a.FAIL_COUNT),0) FAIL_COUNT, " +
                             "IFNULL(SUM(a.CALLBACK_COUNT),0) CALLBACK_COUNT " +
                             "FROM VIEW_RE_QUEUESTATL_H a " +
                             "WHERE " +
                             "a.QUEUE_ID = ? AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.QUEUE_ID, a.QUEUE_NAME, a.CALL_KIND " +
                             "ORDER BY a.QUEUE_ID, a.QUEUE_NAME, a.CALL_KIND",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  }
               }, // queue
               DBMS_SKILL : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/stats/skill",
                     QUERY : "SELECT a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.SKILL_ID, a.SKILL_NAME, " +
                             "IFNULL(SUM(a.ANSWER_COUNT),0) ANSWER_COUNT, " +
                             "IFNULL(SUM(a.ANSWER_TIME),0) ANSWER_TIME, " +
                             "IFNULL(SUM(a.ABANDON_COUNT),0) ABANDON_COUNT, " +
                             "IFNULL(SUM(a.ABANDON_TIME),0) ABANDON_TIME " +
                             "FROM VIEW_RE_EMPQSKILL_H a " +
                             "WHERE " +
                             "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.SKILL_ID, a.SKILL_NAME " +
                             "ORDER BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.SKILL_ID, a.SKILL_NAME",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  },
                  SELECT : {
                     URL : "/cairo/selector/stats/skill",
                     QUERY : "SELECT a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.SKILL_ID, a.SKILL_NAME, " +
                             "IFNULL(SUM(a.ANSWER_COUNT),0) ANSWER_COUNT, " +
                             "IFNULL(SUM(a.ANSWER_TIME),0) ANSWER_TIME, " +
                             "IFNULL(SUM(a.ABANDON_COUNT),0) ABANDON_COUNT, " +
                             "IFNULL(SUM(a.ABANDON_TIME),0) ABANDON_TIME " +
                             "FROM VIEW_RE_EMPQSKILL_H a " +
                             "WHERE " +
                             "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "a.SKILL_ID = ? AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.SKILL_ID, a.SKILL_NAME " +
                             "ORDER BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.SKILL_ID, a.SKILL_NAME",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  }
               }, // skill
               DBMS_IVR : {
                SELECT_ALL : {
                   URL : "/cairo/selector/stats/ivr",
                   QUERY : 
                        "SELECT SERVICE_CODE ,SERVICE_NAME " +
                        ",IFNULL(SUM(a.ARS_COUNT),0) ARS_COUNT " +
                        ",IFNULL(SUM(a.NOSERVICE_COUNT),0) NOSERVICE_COUNT " +
                        ",IFNULL(SUM(a.SERVICE_COUNT),0) SERVICE_COUNT " +
                        ",IFNULL(SUM(a.QUEUEENTER_COUNT),0) QUEUEENTER_COUNT " +
                        "FROM RE_ARSSERVICECALL_D a " +
                        "WHERE a.END_DATE BETWEEN ? AND ? " +
                        "GROUP BY a.SERVICE_CODE ,a.SERVICE_NAME " +
                        "ORDER BY a.SERVICE_CODE ,a.SERVICE_NAME" ,
                   
                   ARGS : {
                      "DAY_START": "string",
                      "DAY_END": "string"
                   }
                },
                SELECT : {
                   URL : "/cairo/selector/stats/ivr",
                   QUERY : 
                        "SELECT SERVICE_CODE ,SERVICE_NAME " +
                        ",IFNULL(SUM(a.ARS_COUNT),0) ARS_COUNT " +
                        ",IFNULL(SUM(a.NOSERVICE_COUNT),0) NOSERVICE_COUNT " +
                        ",IFNULL(SUM(a.SERVICE_COUNT),0) SERVICE_COUNT " +
                        ",IFNULL(SUM(a.QUEUEENTER_COUNT),0) QUEUEENTER_COUNT " +
                        "FROM RE_ARSSERVICECALL_D a " +
                        "WHERE a.END_DATE BETWEEN ? AND ? " +
                        "GROUP BY a.SERVICE_CODE ,a.SERVICE_NAME " +
                        "ORDER BY a.SERVICE_CODE ,a.SERVICE_NAME" ,
                   ARGS : {
                      "DAY_START": "string",
                      "DAY_END": "string"
                   }
                }
             }, // ivr
             DBMS_TRACE_TOP : {
                SELECT_ALL : {
                   URL : "/cairo/selector/stats/trace_top",
                   QUERY : 
                        // "SELECT SERVICE_CODE ,SERVICE_NAME " +
                        // ",IFNULL(SUM(a.ARS_COUNT),0) ARS_COUNT " +
                        // ",IFNULL(SUM(a.NOSERVICE_COUNT),0) NOSERVICE_COUNT " +
                        // ",IFNULL(SUM(a.SERVICE_COUNT),0) SERVICE_COUNT " +
                        // ",IFNULL(SUM(a.QUEUEENTER_COUNT),0) QUEUEENTER_COUNT " +
                        // "FROM RE_ARSSERVICECALL_D a " +
                        // "WHERE a.END_DATE BETWEEN ? AND ? " +
                        // "GROUP BY a.SERVICE_CODE ,a.SERVICE_NAME " +
                        // "ORDER BY a.SERVICE_CODE ,a.SERVICE_NAME" ,

                        " SELECT a.CONNECT_ID , a.CHANNEL_DN , a.EVENT_STARTTIME ,a.SERVICE_CODE , "+
                        " a.SERVICE_NAME , a.STATE_TIME ,a.ANI from bu_OT_IVRTRACE a " +
                        " WHERE a.EVENT_STARTTIME BETWEEN ?000000 AND ?235959 ",
                   
                   ARGS : {
                      "DAY_START": "string",
                      "DAY_END": "string"
                   }
                },
                SELECT : {
                   URL : "/cairo/selector/stats/trace_top",
                   QUERY : 
                        // "SELECT SERVICE_CODE ,SERVICE_NAME " +
                        // ",IFNULL(SUM(a.ARS_COUNT),0) ARS_COUNT " +
                        // ",IFNULL(SUM(a.NOSERVICE_COUNT),0) NOSERVICE_COUNT " +
                        // ",IFNULL(SUM(a.SERVICE_COUNT),0) SERVICE_COUNT " +
                        // ",IFNULL(SUM(a.QUEUEENTER_COUNT),0) QUEUEENTER_COUNT " +
                        // "FROM RE_ARSSERVICECALL_D a " +
                        // "WHERE a.END_DATE BETWEEN ? AND ? " +
                        // "GROUP BY a.SERVICE_CODE ,a.SERVICE_NAME " +
                        // "ORDER BY a.SERVICE_CODE ,a.SERVICE_NAME" ,

                        " SELECT a.CONNECT_ID , a.CHANNEL_DN , a.EVENT_STARTTIME ,a.SERVICE_CODE , "+
                        " a.SERVICE_NAME , a.STATE_TIME ,a.ANI from bu_OT_IVRTRACE a " +
                        " WHERE a.EVENT_STARTTIME BETWEEN ?000000 AND ?235959 ",

                   ARGS : {
                      "DAY_START": "string",
                      "DAY_END": "string"
                   }
                }
             }, // trace
             DBMS_TRACE_BOTTOM : {
                SELECT_ALL : {
                   URL : "/cairo/selector/stats/trace_bottom",
                   QUERY : 
                        "SELECT SERVICE_CODE ,SERVICE_NAME " +
                        ",IFNULL(SUM(a.ARS_COUNT),0) ARS_COUNT " +
                        ",IFNULL(SUM(a.NOSERVICE_COUNT),0) NOSERVICE_COUNT " +
                        ",IFNULL(SUM(a.SERVICE_COUNT),0) SERVICE_COUNT " +
                        ",IFNULL(SUM(a.QUEUEENTER_COUNT),0) QUEUEENTER_COUNT " +
                        "FROM RE_ARSSERVICECALL_D a " +
                        "WHERE a.END_DATE BETWEEN ? AND ? " +
                        "GROUP BY a.SERVICE_CODE ,a.SERVICE_NAME " +
                        "ORDER BY a.SERVICE_CODE ,a.SERVICE_NAME" ,
                   
                   ARGS : {
                      "DAY_START": "string",
                      "DAY_END": "string"
                   }
                },
                SELECT : {
                   URL : "/cairo/selector/stats/trace_bottom",
                   QUERY : 
                        "SELECT SERVICE_CODE ,SERVICE_NAME " +
                        ",IFNULL(SUM(a.ARS_COUNT),0) ARS_COUNT " +
                        ",IFNULL(SUM(a.NOSERVICE_COUNT),0) NOSERVICE_COUNT " +
                        ",IFNULL(SUM(a.SERVICE_COUNT),0) SERVICE_COUNT " +
                        ",IFNULL(SUM(a.QUEUEENTER_COUNT),0) QUEUEENTER_COUNT " +
                        "FROM RE_ARSSERVICECALL_D a " +
                        "WHERE a.END_DATE BETWEEN ? AND ? " +
                        "GROUP BY a.SERVICE_CODE ,a.SERVICE_NAME " +
                        "ORDER BY a.SERVICE_CODE ,a.SERVICE_NAME" ,
                   ARGS : {
                      "DAY_START": "string",
                      "DAY_END": "string"
                   }
                }
             }, // trace
         },


         /**
          * ContainerGridAll
          * grid에 search 버튼이 눌렀을 경우 요청되는 쿼리
          */
         CONTAINER_GRID_ALL : {
               DBMS_AGENT_STATE : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/stats/agentState",
                     QUERY : "SELECT a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND, " +
                             "IFNULL(SUM(a.READY_COUNT),0) READY_COUNT, " +
                             "IFNULL(SUM(a.READY_TIME),0) READY_TIME, " +
                             "IFNULL(SUM(a.BUSY_COUNT),0) BUSY_COUNT, " +
                             "IFNULL(SUM(a.BUSY_TIME),0) BUSY_TIME, " +
                             "IFNULL(SUM(a.ACW_COUNT),0) ACW_COUNT, " +
                             "IFNULL(SUM(a.ACW_TIME),0) ACW_TIME, " +
                             "IFNULL(SUM(a.NRD_COUNT),0) NRD_COUNT, " +
                             "IFNULL(SUM(a.NRD_TIME),0) NRD_TIME " +
                             "FROM VIEW_RE_EMPLOYEESTATE_H a " +
                             "WHERE " +
                             "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND " +
                             "ORDER BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  },
                  SELECT : {
                     URL : "/cairo/selector/stats/agentState",
                     QUERY : "SELECT a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND, " +
                             "IFNULL(SUM(a.READY_COUNT),0) READY_COUNT, " +
                             "IFNULL(SUM(a.READY_TIME),0) READY_TIME, " +
                             "IFNULL(SUM(a.BUSY_COUNT),0) BUSY_COUNT, " +
                             "IFNULL(SUM(a.BUSY_TIME),0) BUSY_TIME, " +
                             "IFNULL(SUM(a.ACW_COUNT),0) ACW_COUNT, " +
                             "IFNULL(SUM(a.ACW_TIME),0) ACW_TIME, " +
                             "IFNULL(SUM(a.NRD_COUNT),0) NRD_COUNT, " +
                             "IFNULL(SUM(a.NRD_TIME),0) NRD_TIME " +
                             "FROM VIEW_RE_EMPLOYEESTATE_H a " +
                             "WHERE " +
                             "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "a.EMPLOYEE_ID = ? AND " +
                             "a.END_DATE BETWEEN ? AND ? " +
                             "GROUP BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND " +
                             "ORDER BY a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                             "a.EMPLOYEEPART_ID, a.EMPLOYEEPART_NAME, " +
                             "a.EMPLOYEE_ID, a.EMPLOYEE_NAME, a.CALL_KIND",
                     ARGS : {
                        "DAY_START": "string",
                        "DAY_END": "string"
                     }
                  }
               }, // agent state
         },


         /**
          * Container
          */
         CONTAINER : {
         },

         //////////////////////////////////////////////////////////
         //////////////////////////////////////////////////////////
         };
      }; //end of _DEFINE

      return _DEFINE;
   }
);
