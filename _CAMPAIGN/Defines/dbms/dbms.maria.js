'use strict';

define([],
   function() {

      /***********************************************************
       * name        : dbms.maria
       * url         : Defines/dbms/dbms.maria.js
       * description :
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
          */
         RESOURCE : {
               DBMS_SUB : {
                  URL    : "/cairo/selector/master/dnsub",
                  QUERY  : "SELECT a.DNSUB_ID TENANT_ID, a.DNSUB_NAME TENANT_NAME " +
                           "FROM MA_DNSUBCATEGORY a " +
                           "WHERE a.DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_CAMPAIGN: {
                  URL    : "/cairo/selector/campaign/ccc_campaign",
                  QUERY  : "SELECT TENANT_ID, CCC_TYPE, CCC_CODE, CCC_NAME " +
                           "FROM ccc_campaign"
               }
         }, // end of resource


         /**
          * ContainerCampaign
          */
         CONTAINER_CAMPAIGN : {
               DBMS_CAMPAIGN : {
                  SELECT : {
                     URL : "/cairo/selector/campaign/ccc_campaign",
                     QUERY : "SELECT a.TENANT_ID, a.CCC_TYPE, a.CCC_CODE, " +
                             "a.CCC_NAME, a.START_DATE, a.END_DATE, " +
                             "a.STATUS, a.MEMO, a.REG_DATE, " +
                             "a.REG_ID, a.MOD_DATE, a.MOD_ID, " +
                             "IFNULL(SUM(a.LIST_COUNT), 0) AS LIST_COUNT, " +
                             "IFNULL(SUM(a.NOTROUTED_COUNT), 0) NOTROUTED_COUNT, " +
                             "IFNULL(SUM(a.ROUTED_COUNT), 0) AS ROUTED_COUNT, " +
                             "IFNULL(SUM(a.COMPLETE_COUNT), 0) AS COMPLETE_COUNT, " +
                             "IFNULL(SUM(a.WAITING_COUNT), 0) AS WAITING_COUNT " +
                             "FROM VIEW_CCC_CAMPAIGN a " +
                             "WHERE " +
                             "(a.START_DATE BETWEEN ? AND ? OR " +
                             "a.END_DATE BETWEEN ? AND ?) ",
                     WHERE : {
                        "CCC_TYPE": " AND a.CCC_TYPE=? ",
                        "CCC_NAME": " AND a.CCC_NAME=? ",
                        "STATUS"  : " AND a.STATUS=? ",
                     },
                     FINAL : "GROUP BY a.CCC_CODE",
                     ARGS : [
                        { field: "START_DATE", type: "number" },
                        { field: "END_DATE", type: "number" },
                        { field: "START_DATE", type: "number" },
                        { field: "END_DATE", type: "number" },
                        { field: "CCC_TYPE", type: "string" },
                        { field: "CCC_NAME", type: "string" },
                        { field: "STATUS", type: "number" }
                     ]
                  },
                  INSERT : {
                     URL : "/cairo/ccc_campaign/campaign/insert",
                     QUERY : "INSERT INTO ccc_campaign (" +
                             "TENANT_ID, CCC_TYPE, CCC_CODE, CCC_NAME, " +
                             "START_DATE, END_DATE, STATUS, MEMO, " +
                             "REG_DATE, REG_ID, MOD_DATE, MOD_ID" +
                             ") VALUES (" +
                             "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?" +
                             ")",
                     ARGS : {
                        "TENANT_ID"  : { field: "TENANT_ID", type: "number" },
                        "CCC_TYPE"   : { field: "CCC_TYPE", type: "string" },
                        "CCC_CODE"   : { field: "CCC_CODE", type: "string" },
                        "CCC_NAME"   : { field: "CCC_NAME", type: "string" },
                        "START_DATE" : { field: "START_DATE", type: "sysTime" },
                        "END_DATE"   : { field: "END_DATE", type: "sysTime" },
                        "STATUS"     : { field: "STATUS", type: "number" },
                        "MEMO"       : { field: "MEMO", type: "string" },
                        "REG_DATE"   : { field: "REG_DATE", type: "string" },
                        "REG_ID"     : { field: "REG_ID", type: "string" },
                        "MOD_DATE"   : { field: "MOD_DATE", type: "string" },
                        "MOD_ID"     : { field: "MOD_ID", type: "string" },
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/ccc_campaign/campaign/update",
                     QUERY : "UPDATE ccc_campaign " +
                             "SET " +
                             "CCC_NAME=?, START_DATE=?, END_DATE=?, STATUS=?, MEMO=?, " +
                             "REG_DATE=?, REG_ID=?, MOD_DATE=?, MOD_ID=? " +
                             "WHERE " +
                             "TENANT_ID=? AND CCC_TYPE=? AND CCC_CODE=?",
                     ARGS : {
                        "CCC_NAME"   : { field: "CCC_NAME", type: "string" },
                        "START_DATE" : { field: "START_DATE", type: "sysTime" },
                        "END_DATE"   : { field: "END_DATE", type: "sysTime" },
                        "STATUS"     : { field: "STATUS", type: "number" },
                        "MEMO"       : { field: "MEMO", type: "string" },
                        "REG_DATE"   : { field: "REG_DATE", type: "string" },
                        "REG_ID"     : { field: "REG_ID", type: "string" },
                        "MOD_DATE"   : { field: "MOD_DATE", type: "string" },
                        "MOD_ID"     : { field: "MOD_ID", type: "string" },
                        "TENANT_ID"  : { field: "TENANT_ID", type: "number" },
                        "CCC_TYPE"   : { field: "CCC_TYPE", type: "string" },
                        "CCC_CODE"   : { field: "CCC_CODE", type: "string" },
                     }
                  },
                  DELETE : {
                     URL : "/cairo/ccc_campaign/campaign/delete",
                     QUERY : "DELETE FROM ccc_campaign " +
                             "WHERE " +
                             "TENANT_ID=? AND CCC_TYPE=? AND CCC_CODE=?",
                     ARGS : {
                        "TENANT_ID"  : { field: "TENANT_ID", type: "number" },
                        "CCC_TYPE"   : { field: "CCC_TYPE", type: "string" },
                        "CCC_CODE"   : { field: "CCC_CODE", type: "string" },
                     }
                  }
               }, // campaign
         },


         /**
          * ContainerCustomer
          */
         CONTAINER_CUSTOMER : {
               DBMS_CUSTOMER : {
                  SELECT : {
                     URL : "/cairo/selector/campaign/ccc_campaign_list",
                     QUERY : "SELECT CCC_CODE, SEQNO, NAME, JUMIN, " +
                             "PHONE, TELL, EMAIL, " +
                             "ADDRESS, STATUS, CHARGER, " +
                             "CHARGED_TIME " +
                             "FROM ccc_campaign_list " +
                             "WHERE " +
                             "CCC_CODE=?",
                     ARGS : [
                        { field: "CCC_CODE", type: "string" },
                     ]
                  },
                  DELETE : {
                     URL : "/cairo/ccc_campaign/campaign_list/delete",
                     QUERY : "DELETE FROM ccc_campaign_list " +
                             "WHERE " +
                             "SEQNO=?",
                     ARGS : {
                        "SEQNO"  : { field: "SEQNO", type: "number" },
                     }
                  }
               }, // customer
         },


         /**
          * ContainerSetting
          */
         CONTAINER_SETTING : {
               DBMS_SETTING : {
                  SELECT : {
                     URL : "/cairo/selector/campaign/ccc_campaign",
                     QUERY : "SELECT a.TENANT_ID, a.CCC_TYPE, a.CCC_CODE, " +
                             "a.CCC_NAME, a.START_DATE, a.END_DATE " +
                             "FROM VIEW_CCC_CAMPAIGN a " +
                             "WHERE " +
                             "(a.START_DATE BETWEEN ? AND ? OR " +
                             "a.END_DATE BETWEEN ? AND ?) ",
                     WHERE : {
                        "CCC_TYPE": " AND a.CCC_TYPE=? "
                     },
                     FINAL : "GROUP BY a.CCC_CODE",
                     ARGS : [
                        { field: "START_DATE", type: "number" },
                        { field: "END_DATE", type: "number" },
                        { field: "START_DATE", type: "number" },
                        { field: "END_DATE", type: "number" },
                        { field: "CCC_TYPE", type: "string" }
                     ]
                  },
                  INSERT : {
                     URL : "/cairo/ccc_campaign/campaign_list/insert",
                     QUERY : "INSERT INTO ccc_campaign_list (" +
                             "NAME, JUMIN, PHONE, TELL, " +
                             "EMAIL, ADDRESS, CCC_CODE, " +
                             "STATUS, CHARGER, CHARGED_TIME" +
                             ") VALUES (" +
                             "?, ?, ?, ?, ?, ?, ?, '0', NULL, 0" +
                             ")",
                     ARGS : {
                        "NAME"    : { field: "NAME", type: "string" },
                        "RESIDENT NUMBER" : { field: "JUMIN", type: "string" },
                        "MOBILE"  : { field: "PHONE", type: "string" },
                        "TEL"     : { field: "TELL", type: "string" },
                        "E-MAIL"  : { field: "EMAIL", type: "string" },
                        "ADDRESS" : { field: "ADDRESS", type: "string" },
                        "CCC_CODE": { field: "CCC_CODE", type: "string" },
                     }
                  },
               }, // setting
         },


         /**
          * ContainerAssign
          */
         CONTAINER_ASSIGN : {
               DBMS_TEAM : {
                  URL    : "/cairo/selector/master/team",
                  QUERY  : "SELECT a.EMPLOYEEPART_ID TENANT_ID, a.EMPLOYEEPART_NAME TENANT_NAME " +
                           "FROM MA_EMPLOYEEPART a " +
                           "WHERE " +
                           "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                           "a.MONITOR_FLAG=1"
               },
               DBMS_AGENT: {
                  URL    : "/cairo/selector/master/agent",
                  QUERY  : "SELECT a.EMPLOYEEPART_ID TENANT_ID, a.EMPLOYEE_ID, a.EMPLOYEE_NAME " +
                           "FROM MA_EMPLOYEE a " +
                           "WHERE " +
                           "a.EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                           "a.MONITOR_FLAG=1"
               },
               DBMS_LIST : {
                  URL : "/cairo/selector/campaign/ccc_campaign",
                  QUERY : "SELECT a.TENANT_ID, a.CCC_TYPE, a.CCC_CODE, " +
                          "a.CCC_NAME, a.START_DATE, a.END_DATE, " +
                          "IFNULL(SUM(a.LIST_COUNT), 0) AS LIST_COUNT, " +
                          "IFNULL(SUM(a.NOTROUTED_COUNT), 0) NOTROUTED_COUNT, " +
                          "IFNULL(SUM(a.ROUTED_COUNT), 0) AS ROUTED_COUNT, " +
                          "IFNULL(SUM(a.COMPLETE_COUNT), 0) AS COMPLETE_COUNT, " +
                          "IFNULL(SUM(a.WAITING_COUNT), 0) AS WAITING_COUNT " +
                          "FROM VIEW_CCC_CAMPAIGN a " +
                          "WHERE " +
                          "a.CCC_CODE=? " +
                          "GROUP BY a.CCC_CODE",
                  ARGS : [
                     { field: "CCC_CODE", type: "string" },
                  ]
               },
               DBMS_ASSIGN : {
                  DBMS_NOT_ASSIGN : {
                     URL : "/cairo/selector/campaign/ccc_campaign_list",
                     QUERY : "SELECT a.CCC_CODE, a.SEQNO " +
                             "FROM ccc_campaign_list a " +
                             "WHERE " +
                             "a.CCC_CODE=? AND a.CHARGER IS NULL",
                     ARGS : [
                        { field: "CCC_CODE", type: "string" },
                     ]
                  },
                  DBMS_AGENT_ASSIGN : {
                     URL : "/cairo/selector/campaign/ccc_campaign_list",
                     QUERY : "SELECT a.CCC_CODE, a.CHARGER, a.SEQNO " +
                             "FROM ccc_campaign_list a " +
                             "WHERE " +
                             "a.CCC_CODE=? AND a.CHARGER IS NOT NULL",
                     ARGS : [
                        { field: "CCC_CODE", type: "string" },
                     ]
                  },
                  SELECT : {
                     URL : "/cairo/selector/campaign/ccc_campaign_list",
                     QUERY : "SELECT a.TENANT_ID, a.CCC_CODE, a.CHARGER, " +
                             "IFNULL(SUM(a.TOTAL_COUNT), 0) AS TOTAL_COUNT, " +
                             "IFNULL(SUM(a.ROUTED_COUNT), 0) AS ROUTED_COUNT, " +
                             "IFNULL(SUM(a.COMPLETE_COUNT), 0) AS COMPLETE_COUNT, " +
                             "IFNULL(SUM(a.WAITING_COUNT), 0) AS WAITING_COUNT " +
                             "FROM VIEW_CCC_CAMPAIGN_BY_CODE a " +
                             "WHERE " +
                             "CCC_CODE=? " +
                             "GROUP BY a.CCC_CODE, a.CHARGER",
                     ARGS : [
                        { field: "CCC_CODE", type: "string" },
                     ]
                  },
                  ASSIGN : {
                     URL : "/cairo/ccc_campaign/campaign_list/assign",
                     QUERY : "UPDATE ccc_campaign_list " +
                             "SET " +
                             "CHARGER=?, CHARGED_TIME=? " +
                             "WHERE " +
                             "SEQNO=? AND CCC_CODE=?",
                     ARGS : {
                        "CHARGER"      : { field: "CHARGER", type: "string" },
                        "CHARGED_TIME" : { field: "CHARGED_TIME", type: "number" },
                        "SEQNO"        : { field: "SEQNO", type: "number" },
                        "CCC_CODE"     : { field: "CCC_CODE", type: "string" },
                     }
                  },
                  RETRIEVAL : {
                     URL : "/cairo/ccc_campaign/campaign_list/retrieval",
                     QUERY : "UPDATE ccc_campaign_list " +
                             "SET " +
                             "CHARGER=NULL, CHARGED_TIME=0 " +
                             "WHERE " +
                             "SEQNO=? AND CCC_CODE=?",
                     ARGS : {
                        "SEQNO"        : { field: "SEQNO", type: "number" },
                        "CCC_CODE"     : { field: "CCC_CODE", type: "string" },
                     }
                  }
               }
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
