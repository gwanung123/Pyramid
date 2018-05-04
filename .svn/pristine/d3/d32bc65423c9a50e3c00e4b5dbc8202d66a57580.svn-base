'use strict';

define(["../../Library/campaign.validation", "kendo.all.min"],
   function( _Validation ) {

      /***********************************************************
       * name        : text.en
       * url         : Defines/text/text.en.js
       * description :
       ************************************************************/

      /**
       * GRID
       */
      var _GRID_DEFINE = {
            _CAMPAIGN : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "TENANT_ID", title: "Tenant", width: "90px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CCC_TYPE", title: "Type", width: "80px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "CCC_CODE", title: "Code", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "CCC_NAME", title: "Name", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Name",
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
                  {
                     id: 5, field: "START_DATE", title: "Start Date", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0: yyyy-MM-dd}"
                  },
                  {
                     id: 6, field: "END_DATE", title: "End Date", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0: yyyy-MM-dd}"
                  },
                  {
                     id: 7, field: "STATUS", title: "Status", width: "80px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [ { value: "0", text: "Ready" }, { value: "1", text: "Play" },
                               { value: "2", text: "Pause" }, { value: "3", text: "Finish" } ]
                  },
                  {
                     id: 8, field: "LIST_COUNT", title: "Total", width: "110px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 9, field: "NOTROUTED_COUNT", title: "Not Assign", width: "110px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 10, field: "ROUTED_COUNT", title: "Assign", width: "90px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 11, field: "COMPLETE_COUNT", title: "Complete", width: "90px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 12, field: "WAITING_COUNT", title: "Waiting", width: "90px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 13, field: "RATE", title: "Rate(%)", width: "90px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:p0}"
                  },
               ],
               SCHEMA : {
                  model : {
                     id : "CCC_CODE",
                     fields : {
                        TENANT_ID  : {
                              type: "number", editable: false,
                        },
                        CCC_TYPE   : {
                              type: "string", editable: false,
                        },
                        CCC_CODE   : {
                              type: "string", editable: false,
                        },
                        CCC_NAME   : {
                              type: "string"
                        },
                        START_DATE : {
                              type: "date"
                        },
                        END_DATE   : {
                              type: "date"
                        },
                        STATUS     : {
                              type: "string",
                              defaultValue: "0"
                        },
                        LIST_COUNT : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        NOTROUTED_COUNT : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        ROUTED_COUNT  : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        COMPLETE_COUNT: {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        WAITING_COUNT : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        RATE       : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        MEMO       : {
                              type: "string"
                        },
                        REG_ID     : {
                              type: "string", editable: false,
                              defaultValue: "%.nexus.userId"
                        },
                        REG_DATE   : {
                              type: "string", editable: false,
                              defaultValue: kendo.toString(new Date(), "yyyy-MM-dd")
                        },
                        MOD_ID     : {
                              type: "string", editable: false,
                              defaultValue: "%.nexus.userId"
                        },
                        MOD_DATE   : {
                              type: "string", editable: false,
                              defaultValue: kendo.toString(new Date(), "yyyy-MM-dd")
                        }
                     }
                  }
               }
            }, // campaign
            _CUSTOMER : {
               COLUMN : [
                  {
                     command: [
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     title: "&nbsp;", width: "50px"
                  },
                  {
                     id: 1, field: "SEQNO", title: "No", width: "100px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "NAME", title: "Name", width: "150px",
                     attributes: { "class": "table-cell" }
                  },
                  {
                     id: 3, field: "JUMIN", title: "Resident Number", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "PHONE", title: "Mobile", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "TELL", title: "Tel", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 6, field: "EMAIL", title: "E-Mail", width: "200px",
                     attributes: { "class": "table-cell" }
                  },
                  {
                     id: 7, field: "ADDRESS", title: "Address", width: "200px",
                     attributes: { "class": "table-cell" }
                  },
                  {
                     id: 8, field: "STATUS", title: "Status", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [ { value: "0", text: "Waiting" }, { value: "1", text: "Complete" } ]
                  },
                  {
                     id: 9, field: "CHARGER", title: "Agent", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 10, field: "CHARGED_TIME", title: "Assigned Time", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0: yyyy-MM-dd hh:mm:ss}"
                  },
               ],
               SCHEMA : {
                  model : {
                     id : "SEQNO",
                     fields : {
                        SEQNO        : { type: "number" },
                        NAME         : { type: "string" },
                        JUMIN        : { type: "string" },
                        PHONE        : { type: "string" },
                        TELL         : { type: "string" },
                        EMAIL        : { type: "string" },
                        ADDRESS      : { type: "string" },
                        STATUS       : { type: "number" },
                        CHARGER      : { type: "string" },
                        CHARGED_TIME : { type: "number" },
                     }
                  }
               }
            }, // customer
            _SETTING : {
               SHEETS : [{
                  name: "CUSTOMER LIST",
                  columns: [
                     { width: 120 },
                     { width: 250 },
                     { width: 120 },
                     { width: 120 },
                     { width: 200 },
                     { width: 250 }
                  ],
                  rows: [
                     {
                        height: 25,
                        cells: [
                           {
                              index: 0, value: "NAME", enable: false,
                              background: "rgb(236,239,241)", textAlign: "center", bold: "true", color: "black"
                           },
                           {
                              index: 1, value: "RESIDENT NUMBER", enable: false,
                              background: "rgb(236,239,241)", textAlign: "center", bold: "true", color: "black"
                           },
                           {
                              index: 2, value: "MOBILE", enable: false,
                              background: "rgb(236,239,241)", textAlign: "center", bold: "true", color: "black"
                           },
                           {
                              index: 3, value: "TEL", enable: false,
                              background: "rgb(236,239,241)", textAlign: "center", bold: "true", color: "black"
                           },
                           {
                              index: 4, value: "E-MAIL", enable: false,
                              background: "rgb(236,239,241)", textAlign: "center", bold: "true", color: "black"
                           },
                           {
                              index: 5, value: "ADDRESS", enable: false,
                              background: "rgb(236,239,241)", textAlign: "center", bold: "true", color: "black"
                           },
                        ],
                     },
                  ],
               }]
            }, // setting
            _ASSIGN_TOP : {
               COLUMN : [
                  {
                     id: 1, field: "LIST_COUNT", title: "TOTAL", width: "20%",
                     headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                     },
                     attributes: {
                        "class": "table-cell",
                        style: "height: 50px;text-align: center;" +
                               "font-size: 30px;font-weight: 600;" +
                               "padding-top: 5px;padding-bottom: 5px;"
                     },
                     format: "{0:n0}"
                  },
                  {
                     id: 2, field: "NOTROUTED_COUNT", title: "NOT ASSIGN", width: "20%",
                     headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                     },
                     attributes: {
                        "class": "table-cell",
                        style: "height: 50px;text-align: center;" +
                               "font-size: 30px;font-weight: 600;" +
                               "padding-top: 5px;padding-bottom: 5px;"
                     },
                     format: "{0:n0}"
                  },
                  {
                     id: 3, field: "ROUTED_COUNT", title: "ASSIGN", width: "20%",
                     headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                     },
                     attributes: {
                        "class": "table-cell",
                        style: "height: 50px;text-align: center;" +
                               "font-size: 30px;font-weight: 600;" +
                               "padding-top: 5px;padding-bottom: 5px;"
                     },
                     format: "{0:n0}"
                  },
                  {
                     id: 4, field: "COMPLETE_COUNT", title: "COMPLETE", width: "20%",
                     headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                     },
                     attributes: {
                        "class": "table-cell",
                        style: "height: 50px;text-align: center;" +
                               "font-size: 30px;font-weight: 600;" +
                               "padding-top: 5px;padding-bottom: 5px;"
                     },
                     format: "{0:n0}"
                  },
                  {
                     id: 5, field: "WAITING_COUNT", title: "WAITING", width: "20%",
                     headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                     },
                     attributes: {
                        "class": "table-cell",
                        style: "height: 50px;text-align: center;" +
                               "font-size: 30px;font-weight: 600;" +
                               "padding-top: 5px;padding-bottom: 5px;"
                     },
                     format: "{0:n0}"
                  },
               ],
               SCHEMA : {
                  model : {
                     fields : {
                        LIST_COUNT      : { type: "number" },
                        NOTROUTED_COUNT : { type: "number" },
                        ROUTED_COUNT    : { type: "number" },
                        COMPLETE_COUNT  : { type: "number" },
                        WAITING_COUNT   : { type: "number" },
                     }
                  }
               }
            }, // assign top
            _ASSIGN_BOTTOM : {
               COLUMN : [
                  {
                     id: 1, field: "TENANT_ID", title: "Tenant", width: "100px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:##########}"
                  },
                  {
                     id: 2, field: "CHARGER", title: "Agent", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "TOTAL_COUNT", title: "Total", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 4, field: "ROUTED_COUNT", title: "Assigned", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 5, field: "COMPLETE_COUNT", title: "Complete", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 6, field: "WAITING_COUNT", title: "Waiting", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 7, field: "ROUTING_INPUT", title: "Assign", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;background-color: aliceblue;" },
                     format: "{0:n0}"
                  },
                  {
                     id: 8, field: "RETRIEVAL_INPUT", title: "Retrieval", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;background-color: aliceblue;" },
                     format: "{0:n0}"
                  },
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
                        TENANT_ID : {
                              type: "number", editable: false
                        },
                        CHARGER : {
                              type: "string", editable: false
                        },
                        TOTAL_COUNT : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        ROUTED_COUNT  : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        COMPLETE_COUNT: {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        WAITING_COUNT : {
                              type: "number", editable: false,
                              defaultValue: 0
                        },
                        ROUTING_INPUT : {
                              type: "number", editable: true,
                              defaultValue: 0,
                              validation: { min: 0 }
                        },
                        RETRIEVAL_INPUT : {
                              type: "number", editable: true,
                              defaultValue: 0,
                              validation: { min: 0 }
                        },
                     }
                  }
               }
            }, // assign bottom
      };



      /**
       * DEFINE
       */
      var _DEFINE = {
         SIDEBAR : {
            BUTTON_1 : "HOME",
            BUTTON_2 : "RESOURCE",
            BUTTON_3 : "CAMPAIGN",
            BUTTON_4 : "CUSTOMER",
            BUTTON_5 : "UPLOAD",
            BUTTON_6 : "ASSIGN"
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
                  "dnsub" : {
                     TENANT_ID : "DNSUB_ID",
                     PK : ["CENTER_ID", "TENANT_ID", "DNMAJOR_ID", "DNSUB_ID"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNSUB_ID"     : { field: "DNSUB_ID", type: "number" },
                        "DNSUB_NAME"   : { field: "DNSUB_NAME", type: "string" }
                     }
                  }
               },
               "campaign" : {
                  "ccc_campaign" : {
                     PK : ["TENANT_ID", "CCC_TYPE", "CCC_CODE"],
                     DATA : {
                        "TENANT_ID"  : { field: "TENANT_ID", type: "number" },
                        "CCC_TYPE"   : { field: "CCC_TYPE", type: "number" },
                        "CCC_CODE"   : { field: "CCC_CODE", type: "string" },
                        "CCC_NAME"   : { field: "CCC_NAME", type: "string" },
                        "START_DATE" : { field: "START_DATE", type: "string" },
                        "END_DATE"   : { field: "END_DATE", type: "string" },
                        "STATUS"     : { field: "STATUS", type: "number" },
                        "MEMO"       : { field: "MEMO", type: "string" },
                        "REG_ID"     : { field: "REG_ID", type: "string" },
                        "REG_DATE"   : { field: "REG_DATE", type: "string" },
                        "MOD_ID"     : { field: "MOD_ID", type: "string" },
                        "MOD_DATE"   : { field: "MOD_DATE", type: "string" }
                     }
                  }
               }
            },


            /**
             * resource
             */
            RESOURCE : {
               LEFT : {
                  TREEVIEW_CAMPAIGN : {
                     TEXT_FIELD: ["dnsub", "campaign"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "dnsub",
                           DATA   : "DBMS_SUB",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "campaign",
                           DATA   : "DBMS_CAMPAIGN",
                           PIN    : "CCC_CODE",
                           TXT    : "@=CCC_TYPE: @=CCC_CODE [@=CCC_NAME]"
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
                     CAMPAIGN : { TITLE : "CAMPAIGN MANAGEMENT" },
                     CUSTOMER : { TITLE : "CAMPAIGN LIST" },
                     SETTING  : { TITLE : "CAMPAIGN UPLOAD" },
                     ASSIGN   : { TITLE : "CAMPAIGN ASSIGNMENT" },
                  }
               }
            },


            /**
             * ContainerCampaign
             */
            CONTAINER_CAMPAIGN : {
               CENTER : {
                  CAMPAIGN_GRID : {
                     CAMPAIGN : {
                        PUSH     : "campaign",
                        FILENAME : "ccc_campaign",
                        DATA     : "DBMS_CAMPAIGN",
                        COLUMN   : _GRID_DEFINE._CAMPAIGN.COLUMN,
                        SCHEMA   : _GRID_DEFINE._CAMPAIGN.SCHEMA,
                        BIND     : {
                           TENANT_ID : {
                              DATA : "%.shared._campaign.dnsub",
                              TEXT : "@=TENANT_ID: @=TENANT_NAME",
                              VALUE: "TENANT_ID"
                           }
                        }
                     },
                  }
               }
            },


            /**
             * ContainerCustomer
             */
            CONTAINER_CUSTOMER : {
               CENTER : {
                  CUSTOMER_GRID : {
                     CUSTOMER : {
                        PUSH     : "campaign",
                        DATA     : "DBMS_CUSTOMER",
                        COLUMN   : _GRID_DEFINE._CUSTOMER.COLUMN,
                        SCHEMA   : _GRID_DEFINE._CUSTOMER.SCHEMA,
                        BIND     : {
                           CCC_CODE : {
                              DATA : "%.shared._campaign.campaign",
                              TEXT : "@=CCC_TYPE: @=CCC_CODE [@=CCC_NAME]",
                              VALUE: "CCC_CODE"
                           }
                        }
                     },
                  }
               }
            },


            /**
             * ContainerSetting
             */
            CONTAINER_SETTING : {
               CENTER : {
                  SETTING_SHEET : {
                     SETTING : {
                        DATA    : "DBMS_SETTING",
                        COLUMNS : 6,
                        ROWS    : 10000,
                        SHEETS  : _GRID_DEFINE._SETTING.SHEETS,
                        BIND    : {
                           CODE_TEXT : "@=CCC_CODE: @=CCC_NAME",
                           CODE_VALUE: "CCC_CODE"
                        }
                     },
                  }
               }
            },


            /**
             * ContainerAssign
             */
            CONTAINER_ASSIGN : {
               LEFT : {
                  ASSIGN_TREEVIEW : {
                     TEXT_FIELD: ["team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           DATA   : "DBMS_TEAM",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]"
                        },
                        DEPTH2: {
                           TAG    : "agent",
                           DATA   : "DBMS_AGENT",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]"
                        }
                     }
                  }
               },
               TOP : {
                  ASSIGN_LIST_GRID : {
                     DATA   : "DBMS_LIST",
                     COLUMN : _GRID_DEFINE._ASSIGN_TOP.COLUMN,
                     SCHEMA : _GRID_DEFINE._ASSIGN_TOP.SCHEMA,
                     BIND   : {
                        CCC_CODE : {
                           DATA : "%.shared._campaign.campaign",
                           TEXT : "@=CCC_TYPE: @=CCC_CODE [@=CCC_NAME]",
                           VALUE: "CCC_CODE"
                        }
                     }
                  }
               },
               BOTTOM : {
                  ASSIGN_AGENT_GRID : {
                     DATA   : "DBMS_ASSIGN",
                     COLUMN : _GRID_DEFINE._ASSIGN_BOTTOM.COLUMN,
                     SCHEMA : _GRID_DEFINE._ASSIGN_BOTTOM.SCHEMA,
                     BIND   : {
                        NOT_ASSIGN : {
                           DATA: "DBMS_NOT_ASSIGN"
                        },
                        AGENT_ASSIGN: {
                           DATA: "DBMS_AGENT_ASSIGN"
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
