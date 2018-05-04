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
               DBMS_TEAM : {
                  URL    : "/cairo/selector/master/team",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEEPART_NAME, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEEPART " +
                           "WHERE EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID
               },
               DBMS_AGENT: {
                  URL    : "/cairo/selector/master/agent",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, EMPLOYEE_NAME, MEDIA_ID, MONITOR_FLAG " +
                           "FROM MA_EMPLOYEE " +
                           "WHERE EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID
               },
               DBMS_SUB : {
                  URL    : "/cairo/selector/master/dnsub",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DNSUB_NAME " +
                           "FROM MA_DNSUBCATEGORY " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_DN : {
                  URL    : "/cairo/selector/master/dn",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, MEDIA_ID, DN, MONITOR_FLAG " +
                           "FROM MA_DN " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_QUEUE : {
                  URL    : "/cairo/selector/master/queue",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, MONITOR_FLAG " +
                           "FROM MA_QUEUE " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               }
         }, // end of resource

         /**
          * ContainerGrid
          */
         CONTAINER_GRID : {
               DBMS_AGENT : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, TEL_HOME, EMPLOYEE_CLASS, BLEND_KIND, " +
                             "UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE " +
                             "WHERE EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, TEL_HOME, EMPLOYEE_CLASS, BLEND_KIND, " +
                             "UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE " +
                             "WHERE TENANT_ID=? AND EMPLOYEEGRP_ID=? AND EMPLOYEEPART_ID=? AND EMPLOYEE_ID=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "EMPLOYEEGRP_ID": "number",
                        "EMPLOYEEPART_ID": "number",
                        "EMPLOYEE_ID": "string"
                     }
                  }
               }, // agent
               DBMS_DN : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/dn",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DN, " +
                             "MEDIA_ID, SUBMEDIA_ID, DN_KIND, DN_TYPE, OBSERVER_FLAG " +
                             "FROM MA_DN " +
                             "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
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
                  }
               }, // dn
               DBMS_QUEUE : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/queue",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, " +
                             "QUEUE_NAME, MEDIA_ID, SUBMEDIA_ID, QUEUE_KIND, QUEUE_TYPE, OPTIONS, " +
                             "QUEUE_MAXTIME, QUEUE_SLTIME, LAST_SKILLID " +
                             "FROM MA_QUEUE " +
                             "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
                  },
                  SELECT : {
                     URL : "/cairo/selector/master/queue",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID, " +
                             "QUEUE_NAME, MEDIA_ID, SUBMEDIA_ID, QUEUE_KIND, QUEUE_TYPE, OPTIONS, " +
                             "QUEUE_MAXTIME, QUEUE_SLTIME, LAST_SKILLID " +
                             "FROM MA_QUEUE " +
                             "WHERE TENANT_ID=? AND DNMAJOR_ID=? AND DNSUB_ID=? AND QUEUE_ID=?",
                     ARGS : {
                        "TENANT_ID": "number",
                        "DNMAJOR_ID": "number",
                        "DNSUB_ID": "number",
                        "QUEUE_ID": "string"
                     }
                  }
               }, // queue
         },

         /**
          * ContainerGridAll
          */
         CONTAINER_GRID_ALL : {
               DBMS_AGENT_CALL : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, TEL_HOME, EMPLOYEE_CLASS, BLEND_KIND, " +
                             "UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE " +
                             "WHERE " +
                             "EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "MEDIA_ID<10"
                  },
               },
               DBMS_LOGIN : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/loginid",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, MEDIA_ID, LOGIN_ID, CREATE_DATE " +
                             "FROM MA_LOGINID"
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
               DBMS_ERMS : {
                  SELECT_ALL : {
                     URL : "/cairo/selector/master/erms",
                     QUERY : "SELECT TENANT_ID, TENANT_NAME, QUEUE_DN, " +
                             "EMAIL_SERVICE_NAME, EMAIL_SERVICE_USER, EMAIL_PASSWORD, DESC_TEXT " +
                             "FROM ERMS_TENANT"
                  },
                  INSERT : {
                     URL : "/cairo/erms/tenant/insert",
                     QUERY : "INSERT INTO ERMS_TENANT (" +
                             "TENANT_ID, TENANT_NAME, QUEUE_DN, " +
                             "EMAIL_SERVICE_NAME, EMAIL_SERVICE_USER, EMAIL_PASSWORD, DESC_TEXT" +
                             ") VALUES (" +
                             "?, ?, ?, ?, ?, ?, ?" +
                             ")",
                     ARGS : {
                        "TENANT_ID"         : { field: "TENANT_ID", type: "string" },
                        "TENANT_NAME"       : { field: "TENANT_NAME", type: "string" },
                        "QUEUE_DN"          : { field: "QUEUE_DN", type: "string" },
                        "EMAIL_SERVICE_NAME": { field: "EMAIL_SERVICE_NAME", type: "string" },
                        "EMAIL_SERVICE_USER": { field: "EMAIL_SERVICE_USER", type: "string" },
                        "EMAIL_PASSWORD"    : { field: "EMAIL_PASSWORD", type: "string" },
                        "DESC_TEXT"         : { field: "DESC_TEXT", type: "string" }
                     }
                  },
                  UPDATE : {
                     URL : "/cairo/erms/tenant/update",
                     QUERY : "UPDATE ERMS_TENANT " +
                             "SET " +
                             "TENANT_NAME=?, QUEUE_DN=?, " +
                             "EMAIL_SERVICE_NAME=?, EMAIL_SERVICE_USER=?, " +
                             "EMAIL_PASSWORD=?, DESC_TEXT=? " +
                             "WHERE " +
                             "TENANT_ID=?",
                     ARGS : {
                        "TENANT_NAME"       : { field: "TENANT_NAME", type: "string" },
                        "QUEUE_DN"          : { field: "QUEUE_DN", type: "string" },
                        "EMAIL_SERVICE_NAME": { field: "EMAIL_SERVICE_NAME", type: "string" },
                        "EMAIL_SERVICE_USER": { field: "EMAIL_SERVICE_USER", type: "string" },
                        "EMAIL_PASSWORD"    : { field: "EMAIL_PASSWORD", type: "string" },
                        "DESC_TEXT"         : { field: "DESC_TEXT", type: "string" },
                        "TENANT_ID"         : { field: "TENANT_ID", type: "string" }
                     }
                  },
                  DELETE : {
                     URL : "/cairo/erms/tenant/delete",
                     QUERY : "DELETE FROM ERMS_TENANT " +
                             "WHERE " +
                             "TENANT_ID=?",
                     ARGS : {
                        "TENANT_ID"         : { field: "TENANT_ID", type: "string" }
                     }
                  }
               }, // erms

               DBMS_MAJOR : {
                SELECT_ALL : {
                   URL : "/cairo/selector/master/erms",
                   QUERY : "SELECT MAJOR_ID, MAJOR_NAME, REG_DATE " +
                           "FROM ma_kms_major"
                },
                INSERT : {
                   URL : "/cairo/erms/tenant/insert",
                   QUERY : "INSERT INTO ma_kms_major (" +
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
                   QUERY : "UPDATE ma_kms_major " +
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
                   QUERY : "DELETE FROM ma_kms_major " +
                           "WHERE " +
                           "MAJOR_ID=?",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" }
                   }
                }
             }, // major

             DBMS_SUB : {
                SELECT_ALL : {
                   URL : "/cairo/selector/master/erms",
                   QUERY : "SELECT MAJOR_ID,SUB_ID, SUB_NAME, REG_DATE,REG_EMPLOYEE " +
                           "FROM ma_kms_sub"
                },
                INSERT : {
                   URL : "/cairo/erms/tenant/insert",
                   QUERY : "INSERT INTO ma_kms_sub (" +
                           "MAJOR_ID, SUB_ID, SUB_NAME, REG_DATE,REG_EMPLOYEE " +
                           ") VALUES (" +
                           "?, ?, ?, ?, ?" +
                           ")",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_NAME"       : { field: "MAJOR_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" },
                      "REG_EMPLOYEE"          : { field: "REG_EMPLOYEE", type: "string" }
                     
                   }
                },
                UPDATE : {
                   URL : "/cairo/erms/tenant/update",
                   QUERY : "UPDATE ma_kms_major " +
                           "SET " +
                           "MAJOR_NAME=?, REG_DATE=?, " +
                           "WHERE " +
                           "MAJOR_ID=? AMD SUB_ID=?",
                   ARGS : {
                      "SUB_NAME"       : { field: "MAJOR_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" },
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_ID"         : { field: "MAJOR_ID", type: "number" }
                   }
                },
                DELETE : {
                   URL : "/cairo/erms/tenant/delete",
                   QUERY : "DELETE FROM ma_kms_sub " +
                           "WHERE " +
                           "MAJOR_ID=? AND SUB_ID=?",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_ID"           : { field: "SUB_ID", type: "number" }
                   }
                }
             }, // sub

             DBMS_MANAGE : {
                SELECT_ALL : {
                   URL : "/cairo/selector/master/erms",
                //    QUERY : "SELECT KMS_MAJOR_ID,KMS_SUB_ID, KMS_TITLE, KMS_CONTENTS,REG_DATE,REG_EMPLOYEE " +
                //            "FROM ma_kms"
                
                    QUERY :" SELECT a.KMS_ID,b.MAJOR_NAME , c.SUB_NAME ,a.KMS_TITLE ,a.KMS_CONTENTS ,a.REG_DATE,a.REG_EMPLOYEE "
                           + " FROM ma_kms a ,ma_kms_major b , ma_kms_sub c "
                           +"  WHERE a.KMS_MAJOR_ID = b.MAJOR_ID "
                           + " AND b.MAJOR_ID = c.MAJOR_ID "
                           +" AND a.KMS_MAJOR_ID = c.MAJOR_ID "
                           +" AND a.KMS_SUB_ID = c.SUB_ID "

                },
                // INSERT : {
                //    URL : "/cairo/erms/tenant/insert",
                //    QUERY : "INSERT INTO ma_kms_sub (" +
                //            "MAJOR_ID, SUB_ID, SUB_NAME, REG_DATE,REG_EMPLOYEE " +
                //            ") VALUES (" +
                //            "?, ?, ?, ?, ?" +
                //            ")",
                //    ARGS : {
                //       "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                //       "SUB_ID"         : { field: "MAJOR_ID", type: "number" },
                //       "SUB_NAME"       : { field: "MAJOR_NAME", type: "string" },
                //       "REG_DATE"          : { field: "REG_DATE", type: "string" },
                //       "REG_EMPLOYEE"          : { field: "REG_EMPLOYEE", type: "string" }
                     
                //    }
                // },
                // UPDATE : {
                //    URL : "/cairo/erms/tenant/update",
                //    QUERY : "UPDATE ma_kms_major " +
                //            "SET " +
                //            "MAJOR_NAME=?, REG_DATE=?, " +
                //            "WHERE " +
                //            "MAJOR_ID=? AMD SUB_ID=?",
                //    ARGS : {
                //       "SUB_NAME"       : { field: "MAJOR_NAME", type: "string" },
                //       "REG_DATE"          : { field: "REG_DATE", type: "string" },
                //       "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                //       "SUB_ID"         : { field: "MAJOR_ID", type: "number" }
                //    }
                // },
                DELETE : {
                   URL : "/cairo/erms/tenant/delete",
                   QUERY : "DELETE FROM ma_kms " +
                           "WHERE " +
                           "KMS_ID=? ",
                   ARGS : {
                      "KMS_ID"         : { field: "KMS_ID", type: "string" },
                   }
                }
             }, // manange

             DBMS_STAT : {
                SELECT_ALL : {
                   URL : "/cairo/selector/master/erms",
                   QUERY : "SELECT a.KMS_TITLE,a.REG_DATE, a.REG_EMPLOYEE,b.RATE_COUNT, b.HITS_COUNT  " +
                           "FROM MA_KMS a,  RE_KMS b WHERE  a.KMS_ID = b.KMS_ID "
                },
                INSERT : {
                   URL : "/cairo/erms/tenant/insert",
                   QUERY : "INSERT INTO ma_kms_sub (" +
                           "MAJOR_ID, SUB_ID, SUB_NAME, REG_DATE,REG_EMPLOYEE " +
                           ") VALUES (" +
                           "?, ?, ?, ?, ?" +
                           ")",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_NAME"       : { field: "MAJOR_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" },
                      "REG_EMPLOYEE"          : { field: "REG_EMPLOYEE", type: "string" }
                     
                   }
                },
                UPDATE : {
                   URL : "/cairo/erms/tenant/update",
                   QUERY : "UPDATE ma_kms_major " +
                           "SET " +
                           "MAJOR_NAME=?, REG_DATE=?, " +
                           "WHERE " +
                           "MAJOR_ID=? AMD SUB_ID=?",
                   ARGS : {
                      "SUB_NAME"       : { field: "MAJOR_NAME", type: "string" },
                      "REG_DATE"          : { field: "REG_DATE", type: "string" },
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_ID"         : { field: "MAJOR_ID", type: "number" }
                   }
                },
                DELETE : {
                   URL : "/cairo/erms/tenant/delete",
                   QUERY : "DELETE FROM ma_kms_sub " +
                           "WHERE " +
                           "MAJOR_ID=? AND SUB_ID=?",
                   ARGS : {
                      "MAJOR_ID"         : { field: "MAJOR_ID", type: "number" },
                      "SUB_ID"           : { field: "SUB_ID", type: "number" }
                   }
                }
             }, // manange




         },

         /**
          * ContainerGridAgent
          */
         CONTAINER_GRID_AGENT : {
               DBMS_AGENT_CALL : {
                  SELECT : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, TEL_HOME, EMPLOYEE_CLASS, BLEND_KIND, " +
                             "UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE " +
                             "WHERE " +
                             "EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "MEDIA_ID<10"
                  },
               },
               DBMS_AGENT_UQ : {
                  SELECT : {
                     URL : "/cairo/selector/master/agent",
                     QUERY : "SELECT MONITOR_FLAG, CENTER_ID, TENANT_ID, EMPLOYEEGRP_ID, EMPLOYEEPART_ID, EMPLOYEE_ID, " +
                             "EMPLOYEE_NAME, EMPLOYEE_PAWD, MEDIA_ID, LOGIN_ID, TEL_HOME, EMPLOYEE_CLASS, BLEND_KIND, " +
                             "UPDATE_USER, END_UPDATEDATE " +
                             "FROM MA_EMPLOYEE " +
                             "WHERE " +
                             "EMPLOYEEPART_ID=" + _PARAM.EMPLOYEEPART_ID + " AND " +
                             "MEDIA_ID>10"
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
               }
         },

         /**
          * ContainerGridSubAgent
          */
         CONTAINER_GRID_SUBAGENT : {
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
