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
               DBMS_SKILL : {
                  URL    : "/cairo/selector/master/skill",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, SKILL_ID, SKILL_NAME " +
                           "FROM MA_SKILL"
               },
               DBMS_MAJOR : {
                  URL    : "/cairo/selector/master/dnmajor",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNMAJOR_NAME " +
                           "FROM MA_DNMAJORCATEGORY"
               },
               DBMS_SUB : {
                  URL    : "/cairo/selector/master/dnsub",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DNSUB_NAME " +
                           "FROM MA_DNSUBCATEGORY " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_DN : {
                  URL    : "/cairo/selector/master/dn",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DN " +
                           "FROM MA_DN " +
                           "WHERE " +
                           "DNSUB_ID=" + _PARAM.DNSUB_ID + " AND " +
                           "MONITOR_FLAG=1"
               },
               DBMS_QUEUE : {
                  URL    : "/cairo/selector/master/queue",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID " +
                           "FROM MA_QUEUE " +
                           "WHERE " +
                           "DNSUB_ID=" + _PARAM.DNSUB_ID + " AND " +
                           "MONITOR_FLAG=1 AND " +
                           "QUEUE_KIND=4 AND QUEUE_TYPE <> 3 AND QUEUE_TYPE <> 4"
               },
               DBMS_SCENARIO : {
                  URL    : "/cairo/selector/master/scenario",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, SCENARIO_ID, SCENARIO_NAME, " +
                           "SCENARIO_DESC, CREATE_DATE, CREATE_IP, CREATE_EMPID, " +
                           "MODIFY_DATE, MODIFY_IP, MODIFY_EMPID " +
                           "FROM MA_SCENARIO"
               }
         }, // end of resource


         /**
          * ContainerGrid
          */
         CONTAINER_GRID : {
         },

         CONTAINER_GRID_ALL : {
            DBMS_MAJOR : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/erms",
                     QUERY : "SELECT MAJOR_ID, MAJOR_NAME, REG_DATE " +
                             "FROM ma_category_major"
                  },
                  INSERT : {
                     URL : "/cairo/erms/tenant/insert",
                     QUERY : "INSERT INTO ma_category_major (" +
                             "MAJOR_ID, MAJOR_NAME, REG_DATE " +
                             ") VALUES (" +
                             "?, ?, ?" +
                             ")",
                     ARGS : {
                        "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                        "MAJOR_NAME"       : { field: "MAJOR_NAME", type: "string" },
                        "REG_DATE"          : { field: "REG_DATE", type: "string" }
                       
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/erms/tenant/update",
                     QUERY : "UPDATE ma_category_major " +
                             "SET " +
                             "MAJOR_NAME=?, REG_DATE=? " + // 20180412 jesse
                             "WHERE " +
                             "MAJOR_ID=?",
                     ARGS : {
                        "MAJOR_NAME"       : { field: "MAJOR_NAME", type: "string" },
                        "REG_DATE"          : { field: "REG_DATE", type: "string" },
                        "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/erms/tenant/delete",
                     QUERY : "DELETE FROM ma_category_major " +
                             "WHERE " +
                             "MAJOR_ID=?",
                     ARGS : {
                        "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" }
                     }
                  }
               }, // major


               DBMS_MIDDLE : {
                SELECT_ALL : {
                   URL : "/cairo/selector/master/erms",
                   QUERY : "SELECT MAJOR_ID, MIDDLE_ID , MIDDLE_NAME, REG_DATE " +
                           "FROM ma_category_middle"
                },
                INSERT : {
                   URL : "/cairo/erms/tenant/insert",
                   QUERY : "INSERT INTO ma_category_middle (" +
                           "MAJOR_ID, MIDDLE_ID,MIDDLE_NAME, REG_DATE " +
                           ") VALUES (" +
                           "?, ?, ?" +
                           ")",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "MIDDLE_ID"         : { field: "MIDDLE_ID", type: "number" },
                      "MIDDLE_NAME"       : { field: "MAJOR_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" }
                     
                   }
                },
                UPDATE : {
                   URL : "/cairo/erms/tenant/update",
                   QUERY : "UPDATE ma_category_middle " +
                           "SET " +
                           "MIDDLE_NAME=?, REG_DATE=? " + // 20180412 jesse
                           "WHERE " +
                           "MAJOR_ID=? AND MIDDLE_ID=?",
                   ARGS : {
                      "MIDDLE_NAME"       : { field: "MIDDLE_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" },
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "MIDDLE_ID"         : { field: "MIDDLE_ID", type: "number" }
                   }
                },
                DELETE : {
                   URL : "/cairo/erms/tenant/delete",
                   QUERY : "DELETE FROM ma_category_middle " +
                           "WHERE " +
                           "MAJOR_ID=? AND MIDDLE_ID=?",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "MIDDLE_ID"         : { field: "MIDDLE_ID", type: "number" }
                   }
                }
             }, // middle

             DBMS_SUB : {
                SELECT_ALL : {
                   URL : "/cairo/selector/master/erms",
                   QUERY : "SELECT MAJOR_ID, MIDDLE_ID ,SUB_ID, SUB_NAME, REG_DATE " +
                           "FROM ma_category_sub"
                },
                INSERT : {
                   URL : "/cairo/erms/tenant/insert",
                   QUERY : "INSERT INTO ma_category_sub (" +
                           "MAJOR_ID, MIDDLE_ID,SUB_ID , SUB_NAME, REG_DATE " +
                           ") VALUES (" +
                           "?, ?, ?" +
                           ")",
                   ARGS : {
                      "MAJOR_ID"          : { field: "MAJOR_ID", type: "number" },
                      "MIDDLE_ID"         : { field: "MIDDLE_ID", type: "number" },
                      "SUB_ID"            : { field: "SUB_ID", type: "number" },
                      "SUB_NAME"          : { field: "SUB_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" }
                     
                   }
                },
                UPDATE : {
                   URL : "/cairo/erms/tenant/update",
                   QUERY : "UPDATE ma_category_sub " +
                           "SET " +
                           "SUB_NAME=?, REG_DATE=? " + // 20180412 jesse
                           "WHERE " +
                           "MAJOR_ID=? AND MIDDLE_ID=? AND SUB_ID=?",
                   ARGS : {
                      "SUB_NAME"       : { field: "SUB_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" },
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "MIDDLE_ID"         : { field: "MIDDLE_ID", type: "number" },
                      "SUB_ID"         : { field: "SUB_ID", type: "number" }
                   }
                },
                DELETE : {
                   URL : "/cairo/erms/tenant/delete",
                   QUERY : "DELETE FROM ma_category_sub " +
                           "WHERE " +
                           "MAJOR_ID=? AND MIDDLE_ID=? AND SUB_ID=?",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "MIDDLE_ID"         : { field: "MIDDLE_ID", type: "number" },
                      "SUB_ID"         : { field: "SUB_ID", type: "number" }
                   }
                }
             }, // sub







         },


         /**
          * ContainerScenario
          */
         CONTAINER_SCENARIO : {
               DBMS_SCENARIO : {
                  SELECT : {
                     URL : "/cairo/selector/master/scenario",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, SCENARIO_ID, SCENARIO_NAME, " +
                             "SCENARIO_DESC, CREATE_DATE, CREATE_IP, CREATE_EMPID, " +
                             "MODIFY_DATE, MODIFY_IP, MODIFY_EMPID " +
                             "FROM MA_SCENARIO"
                  },
                  INSERT : {
                     URL : "/cairo/admin/scenario/insert",
                     ARGS : {
                        "user_id"       : { field: "%.nexus.userId", type: "string" },
                        "center_id"     : { field: "CENTER_ID", type: "number" },
                        "tenant_id"     : { field: "TENANT_ID", type: "number" },
                        "scenario_id"   : { field: "SCENARIO_ID", type: "number" },
                        "scenario_name" : { field: "SCENARIO_NAME", type: "string" },
                        "scenario_desc" : { field: "SCENARIO_DESC", type: "string" },
                        /* server add
                        "user_ip"       : { field: "CREATE_IP", type: "string" }
                        */
                        /*
                        "create_date"   : { field: "CREATE_DATE", type: "string" },
                        "create_ip"     : { field: "CREATE_IP", type: "string" },
                        "create_user"   : { field: "CREATE_EMPID", type: "string" },
                        "modify_date"   : { field: "MODIFY_DATE", type: "string" },
                        "modify_ip"     : { field: "MODIFY_IP", type: "string" },
                        "modify_user"   : { field: "MODIFY_EMPID", type: "string" }
                        */
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/scenario/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"     : { field: "CENTER_ID", type: "number" },
                           "tenant_id"     : { field: "TENANT_ID", type: "number" },
                           "scenario_id"   : { field: "SCENARIO_ID", type: "number" }
                        },
                        "then": {
                           "scenario_name" : { field: "SCENARIO_NAME", type: "string" },
                           "scenario_desc" : { field: "SCENARIO_DESC", type: "string" },
                           /* server add
                           "user_ip"       : { field: "CREATE_IP", type: "string" }
                           */
                           /*
                           "create_date"   : { field: "CREATE_DATE", type: "string" },
                           "create_ip"     : { field: "CREATE_IP", type: "string" },
                           "create_user"   : { field: "CREATE_EMPID", type: "string" },
                           "modify_date"   : { field: "MODIFY_DATE", type: "string" },
                           "modify_ip"     : { field: "MODIFY_IP", type: "string" },
                           "modify_user"   : { field: "MODIFY_EMPID", type: "string" }
                           */
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/scenario/delete",
                     ARGS : {
                        "user_id"       : { field: "%.nexus.userId", type: "string" },
                        "center_id"     : { field: "CENTER_ID", type: "number" },
                        "tenant_id"     : { field: "TENANT_ID", type: "number" },
                        "scenario_id"   : { field: "SCENARIO_ID", type: "number" }
                     }
                  }
               }, // scenario
         },


         /**
          * ContainerApply
          */
         CONTAINER_APPLY : {
               DBMS_DAILYSCHEDULE : {
                  SELECT : {
                     URL : "/cairo/selector/master/dailySchedule",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, QUEUE_ID, SET_HOUR, SCENARIO_ID, SCHEDULE_NAME, " +
                             "CREATE_DATE, CREATE_IP, CREATE_EMPID, " +
                             "MODIFY_DATE, MODIFY_IP, MODIFY_EMPID " +
                             "FROM MA_DAILYSCHEDULE " +
                             "WHERE CENTER_ID=? AND TENANT_ID=? AND QUEUE_ID=?",
                     ARGS : {
                        "CENTER_ID": "number",
                        "TENANT_ID": "number",
                        "QUEUE_ID" : "string"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/dailySchedule/insert",
                     ARGS : {
                        "user_id"       : { field: "%.nexus.userId", type: "string" },
                        "center_id"     : { field: "CENTER_ID", type: "number" },
                        "tenant_id"     : { field: "TENANT_ID", type: "number" },
                        "queue_id"      : { field: "QUEUE_ID", type: "string" },
                        "set_hour"      : { field: "SET_HOUR", type: "string" },
                        "scenario_id"   : { field: "SCENARIO_ID", type: "number" },
                        //"schedule_name" : { field: "SCHEDULE_NAME", type: "string" },
                        /* server add
                        "user_ip"       : { field: "CREATE_IP", type: "string" },
                        */
                        /*
                        "create_date"   : { field: "CREATE_DATE", type: "string" },
                        "create_ip"     : { field: "CREATE_IP", type: "string" },
                        "create_user"   : { field: "CREATE_EMPID", type: "string" },
                        "modify_date"   : { field: "MODIFY_DATE", type: "string" },
                        "modify_ip"     : { field: "MODIFY_IP", type: "string" },
                        "modify_user"   : { field: "MODIFY_EMPID", type: "string" }
                        */
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/dailySchedule/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "queue_id"   : { field: "QUEUE_ID", type: "string" },
                        "set_hour"   : { field: "SET_HOUR", type: "string" }
                     }
                  }
               }, // scenario apply
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
