'use strict';

define(["../../Library/scenario.validation"],
   function( _Validation ) {

      /***********************************************************
       * name        : text.en
       * url         : Defines/text/text.en.js
       * description :
       ************************************************************/


      var _GRID_DEFINE = {

            _MAJOR : {
                  COLUMN : [
                     {
                        command: [
                          { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                          { name: "destroy", text: "&nbsp;"}
                        ],
                        locked: true, title: "&nbsp;", width: "197px"
                     },
                     {
                        id: 1, field: "MAJOR_ID", title: "Major ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Major ID",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 required: "Required!",
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     {
                        id: 2, field: "MAJOR_NAME", title: "Major Name", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Major Name",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     {
                        id: 3, field: "REG_DATE", title: "Reg date", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Reg date",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     
                  ],
                  SCHEMA : {
                     model : {
                        id : "MAJOR_ID",
                        fields : {
                           MAJOR_ID: {
                                 type: "number",
                                 validation: { required: true }
                           },
                           MAJOR_NAME: {
                                 type: "string"
                           },
                           REG_DATE: {
                                 type: "string"
                           }
                        }
                     }
                  }
               }, // major


               _MIDDLE : {
                  COLUMN : [
                     {
                        command: [
                          { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                          { name: "destroy", text: "&nbsp;"}
                        ],
                        locked: true, title: "&nbsp;", width: "97px"
                     },
                     {
                        id: 1, field: "MAJOR_ID", title: "Major ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Major ID",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 required: "Required!",
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },

                     {
                        id: 2, field: "MIDDLE_ID", title: "Middle ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Middle ID",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 required: "Required!",
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },

                     {
                        id: 3, field: "MIDDLE_NAME", title: "Middle Name", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Middle Name",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     {
                        id: 4, field: "REG_DATE", title: "Reg date", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Reg date",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     
                  ],
                  SCHEMA : {
                     model : {
                        id : "MAJOR_ID",
                        fields : {
                           MAJOR_ID: {
                                 type: "number",
                                 validation: { required: true }
                           },
                           MIDDLE_ID: {
                              type: "number",
                              validation: { required: true }
                           },
                           MIDDLE_NAME: {
                                 type: "string"
                           },
                           REG_DATE: {
                                 type: "string"
                           }
                        }
                     }
                  }
               }, // middle

               _SUB : {
                  COLUMN : [
                     {
                        command: [
                          { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                          { name: "destroy", text: "&nbsp;"}
                        ],
                        locked: true, title: "&nbsp;", width: "97px"
                     },
                     {
                        id: 1, field: "MAJOR_ID", title: "Major ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Major ID",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 required: "Required!",
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },

                     {
                        id: 2, field: "MIDDLE_ID", title: "Middle ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Middle ID",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 required: "Required!",
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },

                     {
                        id: 3, field: "SUB_ID", title: "Sub ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "sub ID",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 required: "Required!",
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },

                     {
                        id: 4, field: "SUB_NAME", title: "Sub Name", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Sub Name",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     {
                        id: 5, field: "REG_DATE", title: "Reg date", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        onEdit: {
                           component: "kendoValidator",
                           options: {
                              style: "width: 100%",
                              placeholder: "Reg date",
                              rules: {
                                 length: function( input ) {
                                    return input.val().length <= 256;
                                 }
                              },
                              messages: {
                                 length: "The maximum length is 256!"
                              }
                           }
                        }
                     },
                     
                  ],
                  SCHEMA : {
                     model : {
                        id : "MAJOR_ID",
                        fields : {
                           MAJOR_ID: {
                                 type: "number",
                                 validation: { required: true }
                           },
                           MIDDLE_ID: {
                              type: "number",
                              validation: { required: true }
                           },
                           SUB_ID: {
                              type: "number",
                              validation: { required: true }
                           },
                           SUB_NAME: {
                                 type: "string"
                           },
                           REG_DATE: {
                                 type: "string"
                           }
                        }
                     }
                  }
               }, // sub

      };



      /**
       * DEFINE
       */
      var _DEFINE = {
         SIDEBAR : {
            BUTTON_1 : "HOME",
            BUTTON_2 : "RESOURCE",
            BUTTON_3 : "SCENARIO",
            BUTTON_4 : "DAILY",

            BUTTON_5 : "CONSULT",
            BUTTON_6 : "MIDDLE",
            BUTTON_7 : "SUB",


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
                        "EMPLOYEEGRP_ID" : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "EMPLOYEEPART_ID": { field: "EMPLOYEEPART_ID", type: "number" },
                        "EMPLOYEE_ID"    : { field: "EMPLOYEE_ID", type: "string" },
                        "EMPLOYEE_NAME"  : { field: "EMPLOYEE_NAME", type: "string" },
                        "EMPLOYEE_PAWD" : { field: "EMPLOYEE_PAWD", type: "string" },
                        "LOGIN_ID"      : { field: "LOGIN_ID", type: "string" },
                        "EMPLOYEE_CLASS": { field: "EMPLOYEE_CLASS", type: "number" },
                        "BLEND_KIND"    : { field: "BLEND_KIND", type: "number" },
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
                  "dn" : {
                     TENANT_ID : "DNSUB_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "DNMAJOR_ID", "DNSUB_ID", "DN"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNSUB_ID"     : { field: "DNSUB_ID", type: "number" },
                        "DN"           : { field: "DN", type: "string" },
                        "MEDIA_ID"     : { field: "MEDIA_ID", type: "number" },
                        "SUBMEDIA_ID"  : { field: "SUBMEDIA_ID", type: "number" },
                        "DN_KIND"      : { field: "DN_KIND", type: "number" },
                        "DN_TYPE"      : { field: "DN_TYPE", type: "number" },
                        "OBSERVER_FLAG": { field: "OBSERVER_FLAG", type: "number" }
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
                  "scenario" : {
                     PK : ["CENTER_ID", "TENANT_ID", "SCENARIO_ID"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "SCENARIO_ID"  : { field: "SCENARIO_ID", type: "number" },
                        "SCENARIO_NAME": { field: "SCENARIO_NAME", type: "string" },
                        "SCENARIO_DESC": { field: "SCENARIO_DESC", type: "string" },
                        "CREATE_DATE"  : { field: "CREATE_DATE", type: "string" },
                        "CREATE_IP"    : { field: "CREATE_IP", type: "string" },
                        "MODIFY_DATE"  : { field: "MODIFY_DATE", type: "string" },
                        "MODIFY_IP"    : { field: "MODIFY_IP", type: "string" },
                        "CREATE_EMPID" : { field: "CREATE_EMPID", type: "string" },
                        "MODIFY_EMPID" : { field: "MODIFY_EMPID", type: "string" }
                     }
                  },
                  "queue_scenario" : {
                     TENANT_ID : "DNSUB_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "QUEUE_ID"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNSUB_ID"     : { field: "DNSUB_ID", type: "number" },
                        "QUEUE_ID"     : { field: "QUEUE_ID", type: "string" },
                        "SCENARIO"     : { field: "SCENARIO", type: "string" },
                        "SCENARIO_ID"  : { field: "SCENARIO_ID", type: "number" },
                        "SCENARIO_NAME": { field: "SCENARIO_NAME", type: "string" }
                     }
                  },
                  "daily_schedule" : {
                     PK : ["CENTER_ID", "TENANT_ID", "QUEUE_ID", "SET_HOUR"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "QUEUE_ID"     : { field: "QUEUE_ID", type: "string" },
                        "SET_HOUR"     : { field: "SET_HOUR", type: "string" },
                        "SCENARIO_ID"  : { field: "SCENARIO_ID", type: "number" },
                        "CREATE_DATE"  : { field: "CREATE_DATE", type: "string" },
                        "CREATE_IP"    : { field: "CREATE_IP", type: "string" },
                        "MODIFY_DATE"  : { field: "MODIFY_DATE", type: "string" },
                        "MODIFY_IP"    : { field: "MODIFY_IP", type: "string" },
                        "CREATE_EMPID" : { field: "CREATE_EMPID", type: "string" },
                        "MODIFY_EMPID" : { field: "MODIFY_EMPID", type: "string" }
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
                        DEPTH2: {
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
                  TREEVIEW_DN : {
                     TEXT_FIELD: ["dnsub", "dn"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "dnsub",
                           DATA   : "DBMS_SUB",
                           PIN    : "DNSUB_ID",
                           TXT    : "@=DNSUB_ID [@=DNSUB_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "dn",
                           DATA   : "DBMS_DN",
                           PIN    : "DN",
                           TXT    : "@=DN"
                        }
                     }
                  },
                  TREEVIEW_QUEUE : {
                     TEXT_FIELD: ["dnsub", "queue"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "dnsub",
                           DATA   : "%.shared._dn.dnsub",
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
                  TREEVIEW_SCENARIO : {
                     TEXT_FIELD: ["scenario"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "scenario",
                           DATA   : "DBMS_SCENARIO",
                           PIN    : "SCENARIO_ID",
                           TXT    : "@=SCENARIO_ID [@=SCENARIO_NAME]"
                        }
                     }
                  }
               }
            }, // end of resource


            /**
             * Container
             */
            CONTAINER : {
               CENTER : {
                  TABSTRIP : {
                     SCENARIO : { TITLE : "SCENARIO" },
                     DAILY    : { TITLE : "DAILY SCENARIO SCHEDULER" },

                     MAJOR            : { TITLE : "MAJOR" },
                     MIDDLE           : { TITLE : "MIDDLE" },
                     SUB              : { TITLE : "SUB" },

                  }
               }
            },


            /**
             * ContainerScenario
             */
            CONTAINER_SCENARIO : {
               CENTER : {
                  SCENARIO_GRID : {
                     PUSH : "scenario",
                     DATA : "DBMS_SCENARIO",
                     COLUMN : [
                        {
                           command: [
                             { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                             { name: "destroy", text: "&nbsp;"}
                           ],
                           title: "&nbsp;", width: "97px"
                        },
                        {
                           id: 1, field: "SCENARIO_ID", title: "Scenario ID", width: "150px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: center;" },
                           format: "{0:######}"
                        },
                        {
                           id: 2, field: "SCENARIO_NAME", title: "Scenario Name", width: "150px",
                           attributes: { "class": "table-cell", style: "text-align: center;" },
                           onEdit: {
                              component: "kendoValidator",
                              options: {
                                 style: "width: 100%",
                                 placeholder: "Scenario Name",
                                 rules: {
                                    length: function( input ) {
                                       return input.val().length <= 30;
                                    },
                                    format: function( input ) {
                                       return _Validation.isNumEng_underbar(input.val());
                                    }
                                 },
                                 messages: {
                                    required: "Required!",
                                    length: "The maximum length is 30!",
                                    format: "Please enter only English and numbers!"
                                 }
                              }
                           }
                        },
                        /*
                        {
                           id: 3, field: "SCENARIO_DESC", title: "Scenario", width: "150px",
                           onEdit: {
                              component: "kendoValidator",
                              options: {
                                 style: "width: 100%",
                                 placeholder: "Scenario",
                                 rules: {
                                    length: function( input ) {
                                       return input.val().length <= 4000;
                                    }
                                 },
                                 messages: {
                                    required: "Required!",
                                    length: "The maximum length is 4000!"
                                 }
                              }
                           }
                        },
                        */
                        {
                           id: 4, field: "CREATE_DATE", title: "Create", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 5, field: "CREATE_IP", title: "Create IP", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 6, field: "CREATE_EMPID", title: "Create User", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 7, field: "MODIFY_DATE", title: "Update", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 8, field: "MODIFY_IP", title: "Update IP", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 9, field: "MODIFY_EMPID", title: "Update User", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        }
                     ],
                     SCHEMA : {
                        model : {
                           id : "SCENARIO_ID",
                           fields : {
                              SCENARIO_ID: {
                                    type: "number",
                                    defaultValue: 0,
                                    validation: { required: true, min: 1, max: 999999 }
                              },
                              SCENARIO_NAME: {
                                    type: "string"
                              },
                              SCENARIO_DESC: {
                                    type: "string"
                              },
                              CREATE_DATE: {
                                    type: "string", editable: false
                              },
                              CREATE_IP: {
                                    type: "string", editable: false
                              },
                              CREATE_EMPID: {
                                    type: "string", editable: false
                              },
                              MODIFY_DATE: {
                                    type: "string", editable: false
                              },
                              MODIFY_IP: {
                                    type: "string", editable: false
                              },
                              MODIFY_EMPID: {
                                    type: "string", editable: false
                              },
                              CENTER_ID: {
                                    type: "number",
                                    defaultValue: 1
                              },
                              TENANT_ID: {
                                    type: "number",
                                    defaultValue: 10
                              }
                           }
                        }
                     },
                     DETAIL : {
                        SCENARIO_MAKE : "Default ->>(@=SKILLS)",
                        SKILL : {
                           DATA   : "%.shared._skill.skill",
                           VAL    : "SKILL_ID",
                           TXT    : "@=SKILL_ID [@=SKILL_NAME]"
                        },
                     }
                  }
               }
            },

            /**
             * ContainerApply
             */
            CONTAINER_APPLY : {
               LEFT : {
                  APPLY_QUEUE_TREEVIEW : {
                     TEXT_FIELD: ["dnsub", "queue", "queue_scenario"],
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
                        },
                        DEPTH3 : {
                           TAG    : "queue_scenario",
                           URL    : "/cairo/caching/master/route",
                           DATA   : "%.shared._queue.queue",
                           PIN    : "ROUTE_ID",
                           TXT    : "scenario: @=SCENARIO_ID [@=SCENARIO_NAME]",
                           FIELDS : ["CENTER_ID", "TENANT_ID", "ROUTE_ID", "SCENARIO"]
                        }
                     }
                  }
               },
               RIGHT : {
                  APPLY_QUEUE_GRID : {
                     PUSH : "daily_schedule",
                     DATA : "DBMS_DAILYSCHEDULE",
                     DATASOURCE : [
                        { HOUR: "00", TIME: "00:00 ~ 01:00", SCENARIO: "" }, { HOUR: "01", TIME: "01:00 ~ 02:00", SCENARIO: "" },
                        { HOUR: "02", TIME: "02:00 ~ 03:00", SCENARIO: "" }, { HOUR: "03", TIME: "03:00 ~ 04:00", SCENARIO: "" },
                        { HOUR: "04", TIME: "04:00 ~ 05:00", SCENARIO: "" }, { HOUR: "05", TIME: "05:00 ~ 06:00", SCENARIO: "" },
                        { HOUR: "06", TIME: "06:00 ~ 07:00", SCENARIO: "" }, { HOUR: "07", TIME: "07:00 ~ 08:00", SCENARIO: "" },
                        { HOUR: "08", TIME: "08:00 ~ 09:00", SCENARIO: "" }, { HOUR: "09", TIME: "09:00 ~ 10:00", SCENARIO: "" },
                        { HOUR: "10", TIME: "10:00 ~ 11:00", SCENARIO: "" }, { HOUR: "11", TIME: "11:00 ~ 12:00", SCENARIO: "" },
                        { HOUR: "12", TIME: "12:00 ~ 13:00", SCENARIO: "" }, { HOUR: "13", TIME: "13:00 ~ 14:00", SCENARIO: "" },
                        { HOUR: "14", TIME: "14:00 ~ 15:00", SCENARIO: "" }, { HOUR: "15", TIME: "15:00 ~ 16:00", SCENARIO: "" },
                        { HOUR: "16", TIME: "16:00 ~ 17:00", SCENARIO: "" }, { HOUR: "17", TIME: "17:00 ~ 18:00", SCENARIO: "" },
                        { HOUR: "18", TIME: "18:00 ~ 19:00", SCENARIO: "" }, { HOUR: "19", TIME: "19:00 ~ 20:00", SCENARIO: "" },
                        { HOUR: "20", TIME: "20:00 ~ 21:00", SCENARIO: "" }, { HOUR: "21", TIME: "21:00 ~ 22:00", SCENARIO: "" },
                        { HOUR: "22", TIME: "22:00 ~ 23:00", SCENARIO: "" }, { HOUR: "23", TIME: "23:00 ~ 24:00", SCENARIO: "" }
                     ],
                     COLUMN : [
                        {
                           id: 1, field: "TIME", title: "TIME", width: "120px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: center; font-weight: 600;" },
                        },
                        {
                           id: 2, field: "SCENARIO", title: "SCENARIO",
                           attributes: { "class": "table-cell", style: "text-align: center; font-weight: 600;" },
                           onEdit: {
                              component: "kendoDropDownList",
                              options: {
                                 dataTextField: "text",
                                 dataValueField: "value",
                                 optionLabel: {
                                    text: "SCENARIO",
                                    value: "0"
                                 },
                                 data: "%.shared._scenario.scenario",
                                 text: "@=SCENARIO_ID: @=SCENARIO_NAME",
                                 value: "SCENARIO_ID"
                              }
                           }
                        },
                        {
                           command: [
                             { name: "edit", text: { edit: "EDIT", cancel: "CANCEL", update: "UPDATE" } },
                             { name: "destroy", text: "DELETE"}
                           ],
                           title: "&nbsp;", width: "225px"
                        }
                     ],
                     SCHEMA : {
                        model : {
                           id : "HOUR",
                           fields : {
                              HOUR: {
                                    type: "string", editable: false
                              },
                              TIME: {
                                    type: "string", editable: false
                              },
                              SCENARIO: {
                                    type: "string"
                              }
                           }
                        }
                     }
                  },
               }
            },

            /**
             * ContainerGridAll
             * 2018.04.19 eric
             */
            CONTAINER_GRID_ALL : {
                  CENTER : {
                        ALL_GRID : {
                              MAJOR :{
                                    DATA : "DBMS_MAJOR",
                                    COLUMN : _GRID_DEFINE._MAJOR.COLUMN,
                                    SCHEMA : _GRID_DEFINE._MAJOR.SCHEMA,
                                    EDIT   : true
            
                              },
                              MIDDLE :{
                                    DATA : "DBMS_SUB",
                                    COLUMN : _GRID_DEFINE._MIDDLE.COLUMN,
                                    SCHEMA : _GRID_DEFINE._MIDDLE.SCHEMA,
                                    EDIT   : true
                              
                              },

                              SUB :{
                                    DATA : "DBMS_SUB",
                                    COLUMN : _GRID_DEFINE._SUB.COLUMN,
                                    SCHEMA : _GRID_DEFINE._SUB.SCHEMA,
                                    EDIT   : true
                              
                              },

                        }

                  }
            },// container grid all


         },


         COMMENT : {
         }
      }; //end of _DEFINE



      return _DEFINE;
   }
);
