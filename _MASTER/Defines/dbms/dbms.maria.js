'use strict';

define([],
   function() {

      /***********************************************************
       * name        : dbms.maria
       * url         : Defines/dbms/dbms.maria.js
       * description :
       ************************************************************/

      var _DEFINE = {
         /**
          * loading
          */
         LOADING : {
               DBMS_MEDIA : {
                  URL    : "/cairo/selector/master/media",
                  QUERY  : "SELECT CENTER_ID, MEDIA_ID, MEDIA_NAME, MEDIA_KIND " +
                           "FROM MA_MEDIA " +
                           "WHERE MONITOR_FLAG=1"
               },
               DBMS_LOGIN : {
                  URL    : "/cairo/selector/master/login",
                  QUERY  : "SELECT CENTER_ID, MEDIA_ID, LOGIN_ID " +
                           "FROM MA_LOGINID"
               },
               DBMS_SKILL : {
                  URL    : "/cairo/selector/master/skill",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, SKILL_ID, SKILL_NAME " +
                           "FROM MA_SKILL"
               }
         },

         /**
          * resource
          */
         RESOURCE : {
               DBMS_CENTER : {
                  URL    : "/cairo/selector/master/center",
                  QUERY  : "SELECT CENTER_ID, CENTER_NAME " +
                           "FROM MA_CENTER"
               },
               DBMS_TENANT : {
                  URL    : "/cairo/selector/master/tenant",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, TENANT_NAME " +
                           "FROM MA_TENANT"
               },
               DBMS_GROUP : {
                  URL    : "/cairo/selector/master/group",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEGRP_NAME, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEEGRP"
               },
               DBMS_TEAM : {
                  URL    : "/cairo/selector/master/team",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEEPART_NAME, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEEPART"
               },
               DBMS_AGENT: {
                  URL    : "/cairo/selector/master/agent",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, EMPLOYEE_NAME, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEE"
               },
               DBMS_MAJOR : {
                  URL    : "/cairo/selector/master/dnmajor",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNMAJOR_NAME " +
                           "FROM MA_DNMAJORCATEGORY"
               },
               DBMS_SUB : {
                  URL    : "/cairo/selector/master/dnsub",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DNSUB_NAME " +
                           "FROM MA_DNSUBCATEGORY"
               },
               DBMS_DN : {
                  URL    : "/cairo/selector/master/dn",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, MEDIA_ID, DN, MONITOR_FLAG " +
                           "FROM MA_DN"
               },
               DBMS_ROUTE : {
                  URL    : "/cairo/selector/master/route",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, MONITOR_FLAG " +
                           "FROM MA_QUEUE"
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
               DBMS_TENANT : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/tenant",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, TENANT_NAME, SERVICELEVEL_CALC " +
                             "FROM MA_TENANT"
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/tenant",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, TENANT_NAME, SERVICELEVEL_CALC " +
                             "FROM MA_TENANT " +
                             "WHERE TENANT_ID=?",
                     ARGS : {
                        "TENANT_ID": "number"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/tenant/insert",
                     ARGS : {
                        "user_id"     : { field: "%.nexus.userId", type: "string" },
                        "center_id"   : { field: "CENTER_ID", type: "number" },
                        "tenant_id"   : { field: "TENANT_ID", type: "number" },
                        "tenant_name" : { field: "TENANT_NAME", type: "string" },
                        "servicelevel_calc" : { field: "SERVICELEVEL_CALC", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/tenant/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" }
                        },
                        "then": {
                           "tenant_name" : { field: "TENANT_NAME", type: "string" },
                           "servicelevel_calc" : { field: "SERVICELEVEL_CALC", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/tenant/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "tenant_name" : { field: "TENANT_NAME", type: "string" },
                        "servicelevel_calc" : { field: "SERVICELEVEL_CALC", type: "number" }
                     }
                  }
               }, // tenant
               DBMS_GROUP : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/group",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEGRP_NAME " +
                             "FROM MA_EMPLOYEEGRP"
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/group",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEGRP_NAME " +
                             "FROM MA_EMPLOYEEGRP " +
                             "WHERE TENANT_ID=? AND EMPLOYEEGRP_ID=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "EMPLOYEEGRP_ID": "number"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/group/insert",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "group_name" : { field: "EMPLOYEEGRP_NAME", type: "string" },
                        "enable"     : { field: "MONITOR_FLAG", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/group/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" }
                        },
                        "then": {
                           "group_name" : { field: "EMPLOYEEGRP_NAME", type: "string" },
                           "enable"     : { field: "MONITOR_FLAG", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/group/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" }
                     }
                  }
               }, // group
               DBMS_TEAM : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/team",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEEPART_NAME " +
                             "FROM MA_EMPLOYEEPART"
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/team",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEEPART_NAME " +
                             "FROM MA_EMPLOYEEPART " +
                             "WHERE TENANT_ID=? AND EMPLOYEEGRP_ID=? AND EMPLOYEEPART_ID=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "EMPLOYEEGRP_ID": "number",
                        "EMPLOYEEPART_ID": "number"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/team/insert",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "team_id"    : { field: "EMPLOYEEPART_ID", type: "number" },
                        "team_name"  : { field: "EMPLOYEEPART_NAME", type: "string" },
                        "enable"     : { field: "MONITOR_FLAG", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/team/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" },
                           "team_id"    : { field: "EMPLOYEEPART_ID", type: "number" }
                        },
                        "then": {
                           "team_name"  : { field: "EMPLOYEEPART_NAME", type: "string" },
                           "enable"     : { field: "MONITOR_FLAG", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/team/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "team_id"    : { field: "EMPLOYEEPART_ID", type: "number" }
                     }
                  }
               }, // team
               DBMS_AGENT : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, EMPLOYEE_CLASS, BLEND_KIND, EMPLOYEE_DUTY, TEL_HOME, PERMIT_ID, " +
                             "SEND_FILESIZE, UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE"
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, EMPLOYEE_CLASS, BLEND_KIND, EMPLOYEE_DUTY, TEL_HOME, PERMIT_ID, " +
                             "SEND_FILESIZE, UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE " +
                             "WHERE TENANT_ID=? AND EMPLOYEEGRP_ID=? AND EMPLOYEEPART_ID=? AND EMPLOYEE_ID=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "EMPLOYEEGRP_ID": "number",
                        "EMPLOYEEPART_ID": "number",
                        "EMPLOYEE_ID": "string"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/agent/insert",
                     ARGS : {
                        "user_id"       : { field: "%.nexus.userId", type: "string" },
                        "center_id"     : { field: "CENTER_ID", type: "number" },
                        "tenant_id"     : { field: "TENANT_ID", type: "number" },
                        "group_id"      : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "team_id"       : { field: "EMPLOYEEPART_ID", type: "number" },
                        "agent_id"      : { field: "EMPLOYEE_ID", type: "string" },
                        "agent_name"    : { field: "EMPLOYEE_NAME", type: "string" },
                        "media_id"      : { field: "MEDIA_ID", type: "number" },
                        "login_id"      : { field: "LOGIN_ID", type: "string" },
                        "password"      : { field: "EMPLOYEE_PAWD", type: "string" },
                        "position"      : { field: "EMPLOYEE_CLASS", type: "number" },
                        "blend"         : { field: "BLEND_KIND", type: "number" },
                        "duty"          : { field: "EMPLOYEE_DUTY", type: "string" },
                        "tel_home"      : { field: "TEL_HOME", type: "string" },
                        "permit_id"     : { field: "PERMIT_ID", type: "number" },
                        "send_filesize" : { field: "SEND_FILESIZE", type: "number" },
                        "enable"        : { field: "MONITOR_FLAG", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/agent/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "agent_id"      : { field: "EMPLOYEE_ID", type: "string" }
                        },
                        "then": {
                           "group_id"      : { field: "EMPLOYEEGRP_ID", type: "number" },
                           "team_id"       : { field: "EMPLOYEEPART_ID", type: "number" },
                           "agent_name"    : { field: "EMPLOYEE_NAME", type: "string" },
                           "media_id"      : { field: "MEDIA_ID", type: "number" },
                           "login_id"      : { field: "LOGIN_ID", type: "string" },
                           "password"      : { field: "EMPLOYEE_PAWD", type: "string" },
                           "position"      : { field: "EMPLOYEE_CLASS", type: "number" },
                           "blend"         : { field: "BLEND_KIND", type: "number" },
                           "duty"          : { field: "EMPLOYEE_DUTY", type: "string" },
                           "tel_home"      : { field: "TEL_HOME", type: "string" },
                           "permit_id"     : { field: "PERMIT_ID", type: "number" },
                           "send_filesize" : { field: "SEND_FILESIZE", type: "number" },
                           "enable"        : { field: "MONITOR_FLAG", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/agent/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "group_id"   : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "team_id"    : { field: "EMPLOYEEPART_ID", type: "number" },
                        "agent_id"      : { field: "EMPLOYEE_ID", type: "string" }
                     }
                  }
               }, // agent
               DBMS_DN : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/dn",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DN, " +
                             "MEDIA_ID, SUBMEDIA_ID, DN_KIND, DN_TYPE, OBSERVER_FLAG " +
                             "FROM MA_DN"
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/dn",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DN, " +
                             "MEDIA_ID, SUBMEDIA_ID, DN_KIND, DN_TYPE, OBSERVER_FLAG " +
                             "FROM MA_DN " +
                             "WHERE TENANT_ID=? AND DNMAJOR_ID=? AND DNSUB_ID=? AND DN=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "DNMAJOR_ID": "number",
                        "DNSUB_ID": "number",
                        "DN": "string"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/dn/insert",
                     ARGS : {
                        "user_id"       : { field: "%.nexus.userId", type: "string" },
                        "center_id"     : { field: "CENTER_ID", type: "number" },
                        "tenant_id"     : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id"    : { field: "DNMAJOR_ID", type: "number" },
                        "dnsub_id"      : { field: "DNSUB_ID", type: "number" },
                        "dn"            : { field: "DN", type: "string" },
                        "media_id"      : { field: "MEDIA_ID", type: "number" },
                        "submedia_id"   : { field: "SUBMEDIA_ID", type: "number" },
                        "dn_kind"       : { field: "DN_KIND", type: "number" },
                        "dn_type"       : { field: "DN_TYPE", type: "number" },
                        "observer_flag" : { field: "OBSERVER_FLAG", type: "number" },
                        "enable"        : { field: "MONITOR_FLAG", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/dn/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" },
                           "dnsub_id"   : { field: "DNSUB_ID", type: "number" },
                           "dn"         : { field: "DN", type: "string" }
                        },
                        "then": {
                           "media_id"      : { field: "MEDIA_ID", type: "number" },
                           "submedia_id"   : { field: "SUBMEDIA_ID", type: "number" },
                           "dn_kind"       : { field: "DN_KIND", type: "number" },
                           "dn_type"       : { field: "DN_TYPE", type: "number" },
                           "observer_flag" : { field: "OBSERVER_FLAG", type: "number" },
                           "enable"        : { field: "MONITOR_FLAG", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/dn/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" },
                        "dnsub_id"   : { field: "DNSUB_ID", type: "number" },
                        "dn"         : { field: "DN", type: "string" }
                     }
                  }
               }, // dn
               DBMS_ROUTE : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/queue",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, " +
                             "MEDIA_ID, SUBMEDIA_ID, QUEUE_NAME, QUEUE_KIND, QUEUE_TYPE, QUEUE_MAXTIME, " +
                             "QUEUE_SLTIME, OPTIONS, LAST_SKILLID, MATCH_QUEUE, QUEUE_NACD " +
                             "FROM MA_QUEUE"
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/queue",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, " +
                             "MEDIA_ID, SUBMEDIA_ID, QUEUE_NAME, QUEUE_KIND, QUEUE_TYPE, QUEUE_MAXTIME, " +
                             "QUEUE_SLTIME, OPTIONS, LAST_SKILLID, MATCH_QUEUE, QUEUE_NACD " +
                             "FROM MA_QUEUE " +
                             "WHERE TENANT_ID=? AND DNMAJOR_ID=? AND DNSUB_ID=? AND QUEUE_ID=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "DNMAJOR_ID": "number",
                        "DNSUB_ID": "number",
                        "QUEUE_ID": "string"
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/queue/insert",
                     ARGS : {
                        "user_id"       : { field: "%.nexus.userId", type: "string" },
                        "center_id"     : { field: "CENTER_ID", type: "number" },
                        "tenant_id"     : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id"    : { field: "DNMAJOR_ID", type: "number" },
                        "dnsub_id"      : { field: "DNSUB_ID", type: "number" },
                        "queue_id"      : { field: "QUEUE_ID", type: "string" },
                        "media_id"      : { field: "MEDIA_ID", type: "number" },
                        "submedia_id"   : { field: "SUBMEDIA_ID", type: "number" },
                        "queue_name"    : { field: "QUEUE_NAME", type: "string" },
                        "queue_kind"    : { field: "QUEUE_KIND", type: "number" },
                        "queue_type"    : { field: "QUEUE_TYPE", type: "number" },
                        "queue_maxtime" : { field: "QUEUE_MAXTIME", type: "number" },
                        "queue_sltime"  : { field: "QUEUE_SLTIME", type: "number" },
                        "options"       : { field: "OPTIONS", type: "string" },
                        "last_skillid"  : { field: "LAST_SKILLID", type: "number" },
                        "match_queue"   : { field: "MATCH_QUEUE", type: "number" },
                        "queue_nacd"    : { field: "QUEUE_NACD", type: "number" },
                        "enable"        : { field: "MONITOR_FLAG", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/queue/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" },
                           "dnsub_id"   : { field: "DNSUB_ID", type: "number" },
                           "queue_id"   : { field: "QUEUE_ID", type: "string" }
                        },
                        "then": {
                           "media_id"      : { field: "MEDIA_ID", type: "number" },
                           "submedia_id"   : { field: "SUBMEDIA_ID", type: "number" },
                           "queue_name"    : { field: "QUEUE_NAME", type: "string" },
                           "queue_kind"    : { field: "QUEUE_KIND", type: "number" },
                           "queue_type"    : { field: "QUEUE_TYPE", type: "number" },
                           "queue_maxtime" : { field: "QUEUE_MAXTIME", type: "number" },
                           "queue_sltime"  : { field: "QUEUE_SLTIME", type: "number" },
                           "options"       : { field: "OPTIONS", type: "string" },
                           "last_skillid"  : { field: "LAST_SKILLID", type: "number" },
                           "match_queue"   : { field: "MATCH_QUEUE", type: "number" },
                           "queue_nacd"    : { field: "QUEUE_NACD", type: "number" },
                           "enable"        : { field: "MONITOR_FLAG", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/queue/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" },
                        "dnsub_id"   : { field: "DNSUB_ID", type: "number" },
                        "queue_id"   : { field: "QUEUE_ID", type: "string" }
                     }
                  }
               }, // route
         },

         /**
          * ContainerGridAll
          */
         CONTAINER_GRID_ALL : {
               DBMS_CENTER : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/center",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, CENTER_RID, CENTER_NAME, CENTER_TYPE, " +
                             "CENTER_IP, CENTER_IP2, DUPLEXING_FLAG, DB_KIND, UIUPDATE_ADDRESS " +
                             "FROM MA_CENTER"
                  },
                  INSERT : {
                     URL : "/cairo/admin/center/insert",
                     ARGS : {
                        "user_id"     : { field: "%.nexus.userId", type: "string" },
                        "center_id"   : { field: "CENTER_ID", type: "number" },
                        "center_rid"  : { field: "CENTER_RID", type: "number" },
                        "center_name" : { field: "CENTER_NAME", type: "string" },
                        "center_type" : { field: "CENTER_TYPE", type: "number" },
                        "center_ip"   : { field: "CENTER_IP", type: "string" },
                        "center_ip2"  : { field: "CENTER_IP2", type: "string" },
                        "duplexing_flag"   : { field: "DUPLEXING_FLAG", type: "number" },
                        "db_kind"     : { field: "DB_KIND", type: "number" },
                        "uiupdate_address" : { field: "UIUPDATE_ADDRESS", type: "string" },
                        "center_alias": { field: "CENTER_ALIAS", type: "string" },
                        "trunk_accesscode" : { field: "TRUNK_ACCESSCODE", type: "string" },
                        "trunk_groupcode"  : { field: "TRUNK_GROUPCODE", type: "string" },
                        "minute_closeing"  : { field: "MINUTE_CLOSEING", type: "number" },
                        "enable"      : { field: "MONITOR_FLAG", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/center/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "center_rid" : { field: "CENTER_RID", type: "number" }
                        },
                        "then": {
                           "center_name" : { field: "CENTER_NAME", type: "string" },
                           "center_type" : { field: "CENTER_TYPE", type: "number" },
                           "center_ip"   : { field: "CENTER_IP", type: "string" },
                           "center_ip2"  : { field: "CENTER_IP2", type: "string" },
                           "duplexing_flag" : { field: "DUPLEXING_FLAG", type: "number" },
                           "db_kind"     : { field: "DB_KIND", type: "number" },
                           "uiupdate_address" : { field: "UIUPDATE_ADDRESS", type: "string" },
                           "center_alias": { field: "CENTER_ALIAS", type: "string" },
                           "trunk_accesscode" : { field: "TRUNK_ACCESSCODE", type: "string" },
                           "trunk_groupcode"  : { field: "TRUNK_GROUPCODE", type: "string" },
                           "minute_closeing"  : { field: "MINUTE_CLOSEING", type: "number" },
                           "enable"      : { field: "MONITOR_FLAG", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/center/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "center_rid" : { field: "CENTER_RID", type: "number" }
                     }
                  }
               }, // center
               DBMS_SUBAGENT : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/subAgent",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, EMPLOYEE_ID, MASTER_EMPLOYEE_ID, " +
                             "SUB_DN, SUB_MEDIA_ID " +
                             "FROM MA_SUBEMPLOYEE"
                  },
                  INSERT : {
                     URL : "/cairo/admin/subAgent/insert",
                     ARGS : {
                        "user_id"   : { field: "%.nexus.userId", type: "string" },
                        "center_id" : { field: "CENTER_ID", type: "number" },
                        "tenant_id" : { field: "TENANT_ID", type: "number" },
                        "child_id"  : { field: "EMPLOYEE_ID", type: "string" },
                        "parent_id" : { field: "MASTER_EMPLOYEE_ID", type: "string" },
                        "child_dn"  : { field: "SUB_DN", type: "string" },
                        "child_media_id"  : { field: "SUB_MEDIA_ID", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/subAgent/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id" : { field: "CENTER_ID", type: "number" },
                           "tenant_id" : { field: "TENANT_ID", type: "number" },
                           "child_id"  : { field: "EMPLOYEE_ID", type: "string" }
                        },
                        "then": {
                           "parent_id" : { field: "MASTER_EMPLOYEE_ID", type: "string" },
                           "child_dn"  : { field: "SUB_DN", type: "string" },
                           "child_media_id"  : { field: "SUB_MEDIA_ID", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/subAgent/delete",
                     ARGS : {
                        "user_id"   : { field: "%.nexus.userId", type: "string" },
                        "center_id" : { field: "CENTER_ID", type: "number" },
                        "tenant_id" : { field: "TENANT_ID", type: "number" },
                        "child_id"  : { field: "EMPLOYEE_ID", type: "string" }
                     }
                  }
               }, // subAgent
               DBMS_MAJOR : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/dnmajor",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNMAJOR_NAME " +
                             "FROM MA_DNMAJORCATEGORY"
                  },
                  INSERT : {
                     URL : "/cairo/admin/dnmajor/insert",
                     ARGS : {
                        "user_id"      : { field: "%.nexus.userId", type: "string" },
                        "center_id"    : { field: "CENTER_ID", type: "number" },
                        "tenant_id"    : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id"   : { field: "DNMAJOR_ID", type: "number" },
                        "dnmajor_name" : { field: "DNMAJOR_NAME", type: "string" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/dnmajor/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" }
                        },
                        "then": {
                           "dnmajor_name" : { field: "DNMAJOR_NAME", type: "string" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/dnmajor/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" }
                     }
                  }
               }, // major
               DBMS_SUB : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/dnsub",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DNSUB_NAME " +
                             "FROM MA_DNSUBCATEGORY"
                  },
                  INSERT : {
                     URL : "/cairo/admin/dnsub/insert",
                     ARGS : {
                        "user_id"      : { field: "%.nexus.userId", type: "string" },
                        "center_id"    : { field: "CENTER_ID", type: "number" },
                        "tenant_id"    : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id"   : { field: "DNMAJOR_ID", type: "number" },
                        "dnsub_id"     : { field: "DNSUB_ID", type: "number" },
                        "dnsub_name"   : { field: "DNSUB_NAME", type: "string" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/dnsub/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" },
                           "dnsub_id"   : { field: "DNSUB_ID", type: "number" }
                        },
                        "then": {
                           "dnsub_name" : { field: "DNSUB_NAME", type: "string" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/dnsub/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "dnmajor_id" : { field: "DNMAJOR_ID", type: "number" },
                        "dnsub_id"   : { field: "DNSUB_ID", type: "number" }
                     }
                  }
               }, // sub
               DBMS_LOGIN : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/loginid",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, MEDIA_ID, LOGIN_ID, CREATE_DATE " +
                             "FROM MA_LOGINID"
                  },
                  INSERT : {
                     URL : "/cairo/admin/loginid/insert",
                     ARGS : {
                        "user_id"     : { field: "%.nexus.userId", type: "string" },
                        "center_id"   : { field: "CENTER_ID", type: "number" },
                        "media_id"    : { field: "MEDIA_ID", type: "number" },
                        "login_id"    : { field: "LOGIN_ID", type: "string" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/loginid/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "login_id"   : { field: "LOGIN_ID", type: "string" }
                        },
                        "then": {
                           "media_id"   : { field: "MEDIA_ID", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/loginid/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "media_id"   : { field: "MEDIA_ID", type: "number" },
                        "login_id"   : { field: "LOGIN_ID", type: "string" }
                     }
                  }
               }, // login
               DBMS_SKILL : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/skill",
                     QUERY : "SELECT CENTER_ID, TENANT_ID, SKILL_ID, SKILL_NAME, SKILL_DESC " +
                             "FROM MA_SKILL"
                  },
                  INSERT : {
                     URL : "/cairo/admin/skill/insert",
                     ARGS : {
                        "user_id"     : { field: "%.nexus.userId", type: "string" },
                        "center_id"   : { field: "CENTER_ID", type: "number" },
                        "tenant_id"   : { field: "TENANT_ID", type: "number" },
                        "skill_id"    : { field: "SKILL_ID", type: "number" },
                        "skill_name"  : { field: "SKILL_NAME", type: "string" },
                        "skill_desc"  : { field: "SKILL_DESC", type: "string" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/skill/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "skill_id"   : { field: "SKILL_ID", type: "number" }
                        },
                        "then": {
                           "skill_name" : { field: "SKILL_NAME", type: "string" },
                           "skill_desc" : { field: "SKILL_DESC", type: "string" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/skill/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "skill_id"   : { field: "SKILL_ID", type: "number" }
                     }
                  }
               }, // skill
         },


         /**
          * ContainerGridSkill
          */
         CONTAINER_GRID_SKILL : {
               DBMS_SKILL_ASSIGN : {
                  CACHING : {
                     URL : "/cairo/caching/master/agent",
                     FIELDS : ["CENTER_ID", "TENANT_ID", "GROUP_ID", "TEAM_ID", "AGENT_ID",
                               "AGENT_NAME", "SKILL"],
                     ARGS : {
                        "CENTER_ID"   : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"   : { field: "TENANT_ID", type: "number" },
                        "GROUP_ID"    : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "TEAM_ID"     : { field: "EMPLOYEEPART_ID", type: "number" },
                        "AGENT_ID"    : { field: "EMPLOYEE_ID", type: "string" },
                        "AGENT_NAME"  : { field: "EMPLOYEE_NAME", type: "string" },
                        "SKILL_ID"    : { field: "SKILL_ID", type: "number" },
                        "SKILL_LEVEL" : { field: "SKILL_LEVEL", type: "number" },
                     }
                  },
                  INSERT : {
                     URL : "/cairo/admin/skillalloc/insert",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "agent_id"   : { field: "EMPLOYEE_ID", type: "string" },
                        "skill_id"   : { field: "SKILL_ID", type: "number" },
                        "skill_level": { field: "SKILL_LEVEL", type: "number" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/admin/skillalloc/update",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "if" : {
                           "center_id"  : { field: "CENTER_ID", type: "number" },
                           "tenant_id"  : { field: "TENANT_ID", type: "number" },
                           "agent_id"   : { field: "EMPLOYEE_ID", type: "string" },
                           "skill_id"   : { field: "SKILL_ID", type: "number" }
                        },
                        "then": {
                           "skill_level": { field: "SKILL_LEVEL", type: "number" }
                        }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/admin/skillalloc/delete",
                     ARGS : {
                        "user_id"    : { field: "%.nexus.userId", type: "string" },
                        "center_id"  : { field: "CENTER_ID", type: "number" },
                        "tenant_id"  : { field: "TENANT_ID", type: "number" },
                        "agent_id"   : { field: "EMPLOYEE_ID", type: "string" },
                        "skill_id"   : { field: "SKILL_ID", type: "number" },
                        "skill_level": { field: "SKILL_LEVEL", type: "number" }
                     }
                  }
               }, // skill assign
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
          * Container
          */
         CONTAINER : {
         },
      }; //end of _DEFINE

      return _DEFINE;
   }
);
