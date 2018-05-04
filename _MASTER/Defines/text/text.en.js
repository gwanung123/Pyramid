'use strict';

define(["../../Library/master.validation"],
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
            _CENTER : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     role: { "checkAll": { domID: "MonitorCheckAll", rowID: "MONITOR_FLAG" } },
                     id: 1, field: "MONITOR_FLAG", width: "120px",
                     headerTemplate: "<input type='checkbox' disabled=true id='MonitorCheckAll'> Monitor</div>",
                     template: "<input type='checkbox' disabled=true data-bind='checked:MONITOR_FLAG' />",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [ { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 },
                               { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 },
                               { text: "7", value: 7 }, { text: "8", value: 8 }, { text: "9", value: 9 } ]
                  },
                  {
                     id: 3, field: "CENTER_RID", title: "Center RID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     pk: true,
                     values: [ { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 },
                               { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 },
                               { text: "7", value: 7 }, { text: "8", value: 8 }, { text: "9", value: 9 } ]
                  },
                  {
                     id: 4, field: "CENTER_NAME", title: "Center Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Center Name",
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
                     id: 5, field: "CENTER_TYPE", title: "Center Type", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [ { text: "0 : Me", value: 0 }, { text: "1 : Other", value: 1 } ]
                  },
                  {
                     id: 6, field: "CENTER_IP", title: "Center IP", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Center IP",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 30;
                              },
                              format: function( input ) {
                                 return _Validation.isIP(input.val());
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 30!",
                              format: "Please enter only IP!"
                           }
                        }
                     }
                  },
                  {
                     id: 7, field: "CENTER_IP2", title: "Center IP2", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Center IP2",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 30;
                              },
                              format: function( input ) {
                                 return _Validation.isIP(input.val());
                              }
                           },
                           messages: {
                              length: "The maximum length is 30!",
                              format: "Please enter only IP!"
                           }
                        }
                     }
                  },
                  {
                     id: 8, field: "DUPLEXING_FLAG", title: "HA", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [ { text: "0 : Single", value: 0 }, { text: "1 : HA", value: 1 } ]
                  },
                  {
                     id: 9, field: "DB_KIND", title: "DB Kind", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : ORACLE", value: 1 }, { text: "2 : MYSQL", value: 2 },
                        { text: "3 : DB2", value: 3 }, { text: "4 : MS-SQL", value: 4 },
                        { text: "5 : SYSBASE", value: 5 }, { text: "6 : INFOMIX", value: 6 },
                        { text: "7 : ALTIBASE", value: 7 }, { text: "8 : MARIADB", value: 8 }
                     ]
                  },
                  {
                     id: 10, field: "UIUPDATE_ADDRESS", title: "Update Address", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Update Address",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 100;
                              }
                           },
                           messages: {
                              length: "The maximum length is 100!"
                           }
                        }
                     }
                  },
                  /*
                  {
                     id: 11, hidden: true, field: "CENTER_ALIAS", title: "Center Alias", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 4;
                              },
                              format: function( input ) {
                                 return _Validation.isNumEng_underbar(input.val());
                              }
                           },
                           messages: {
                              length: "The maximum length is 4!",
                              format: "Please enter only English and numbers!"
                           }
                        }
                     }
                  },
                  {
                     id: 12, hidden: true, field: "TRUNK_ACCESSCODE", title: "Trunk Access Code", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     //format: "{0:n0}"
                  },
                  {
                     id: 13, hidden: true, field: "TRUNK_GROUPCODE", title: "Trunk Group Code", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     //format: "{0:n0}"
                  },
                  {
                     id: 14, hidden: true, field: "MINUTE_CLOSEING", title: "Closing", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "5 : 5 minute", value: 5 }, { text: "10 : 10 minute", value: 10 },
                        { text: "15 : 15 minute", value: 15 }, { text: "30 : 30 minute", value: 30 }
                     ]
                  },
                  {
                     id: 15, hidden: true, field: "H_SAVETERM", title: "H_SAVETERM", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     //format: "{0:n0}"
                  },
                  {
                     id: 16, hidden: true, field: "U_SAVETERM", title: "U_SAVETERM", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     //format: "{0:n0}"
                  }
                  */
               ],
               SCHEMA : {
                  model : {
                     id : "CENTER_ID",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true }
                        },
                        CENTER_RID: {
                              type: "number",
                              defaultValue: 1,
                              validation: { required: true }
                        },
                        CENTER_NAME: {
                              type: "string"
                        },
                        CENTER_TYPE: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true }
                        },
                        CENTER_IP: {
                              type: "string",
                              validation: { required: true }
                        },
                        CENTER_IP2: {
                              type: "string"
                        },
                        DUPLEXING_FLAG: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true }
                        },
                        DB_KIND: {
                              type: "number",
                              defaultValue: 1,
                              validation: { required: true }
                        },
                        UIUPDATE_ADDRESS: {
                              type: "string"
                        },
                        /*
                        CENTER_ALIAS: {
                              type: "string",
                              defaultValue: ""
                        },
                        TRUNK_ACCESSCODE: {
                              type: "number",
                              defaultValue: 0,
                        },
                        TRUNK_GROUPCODE: {
                              type: "number",
                              defaultValue: 0,
                        },
                        MINUTE_CLOSEING: {
                              type: "number",
                              defaultValue: 0,
                        },
                        H_SAVETERM: {
                              type: "number",
                              defaultValue: 0,
                        },
                        U_SAVETERM: {
                              type: "number",
                              defaultValue: 0,
                        }
                        */
                     }
                  }
               }
            }, // center
            _TENANT : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 2, field: "TENANT_ID", title: "Tenant ID", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     pk: true,
                     format: "{0:###}"
                  },
                  {
                     id: 3, field: "TENANT_NAME", title: "Tenant Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Tenant Name",
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
                     id: 4, field: "SERVICELEVEL_CALC", title: "Service Level Formula", width: "500px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : (일정시간내응답호수 + 일정시간내포기호수) / 실인입호수 * 100", value: 1 },
                        { text: "2 : 일정시간내응답호수 / 실인입호수 * 100", value: 2 },
                        { text: "3 : (일정시간내응답호수 + 일정시간내포기호수) / 총인입호수 * 100", value: 3 },
                        { text: "4 : 일정시간내응답호수 / 총인입호수 * 100", value: 4 },
                        { text: "5 : (일정시간내응답호수 + 일정시간내포기호수 + 타센터라우팅 - 타센터실패) / 실인입호수 * 100", value: 5 }
                     ]
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "TENANT_ID",
                     fields : {
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 999 }
                        },
                        TENANT_NAME: {
                              type: "string"
                        },
                        SERVICELEVEL_CALC: {
                              type: "number",
                              defaultValue: 1
                        }
                     }
                  }
               }
            }, // tenant
            _GROUP : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     role: { "checkAll": { domID: "MonitorCheckAll", rowID: "MONITOR_FLAG" } },
                     id: 1, field: "MONITOR_FLAG", width: "110px",
                     headerTemplate: "<input type='checkbox' disabled=true id='MonitorCheckAll'> Monitor</div>",
                     template: "<input type='checkbox' disabled=true id='MonitorCheck' data-bind='checked:MONITOR_FLAG' />",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "TENANT_ID", title: "Tenant ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._master.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "EMPLOYEEGRP_ID", title: "Group ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:######}"
                  },
                  {
                     id: 5, field: "EMPLOYEEGRP_NAME", title: "Group Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Group Name",
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
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEEGRP_ID",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEEGRP_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 999999 }
                        },
                        EMPLOYEEGRP_NAME: {
                              type: "string"
                        }
                     }
                  }
               }
            }, // group
            _TEAM : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     role: { "checkAll": { domID: "MonitorCheckAll", rowID: "MONITOR_FLAG" } },
                     id: 1, field: "MONITOR_FLAG", width: "110px",
                     headerTemplate: "<input type='checkbox' disabled=true id='MonitorCheckAll'> Monitor</div>",
                     template: "<input type='checkbox' disabled=true data-bind='checked:MONITOR_FLAG' />",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "TENANT_ID", title: "Tenant ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._master.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "EMPLOYEEGRP_ID", title: "Group ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "TENANT_ID",
                           cascadeFromField: "TENANT_ID",
                           optionLabel: {
                              text: "Group ID",
                              value: 0
                           },
                           data: "%.shared._master.group",
                           text: "@=EMPLOYEEGRP_ID: @=EMPLOYEEGRP_NAME",
                           value: "EMPLOYEEGRP_ID"
                        }
                     }
                  },
                  {
                     id: 5, field: "EMPLOYEEPART_ID", title: "Team ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:######}"
                  },
                  {
                     id: 6, field: "EMPLOYEEPART_NAME", title: "Team Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Team Name",
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
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEEPART_ID",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEEGRP_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEEPART_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 999999 }
                        },
                        EMPLOYEEPART_NAME: {
                              type: "string"
                        }
                     }
                  }
               }
            }, // team
            _AGENT : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     role: { "checkAll": { domID: "MonitorCheckAll", rowID: "MONITOR_FLAG" } },
                     id: 1, field: "MONITOR_FLAG", width: "110px",
                     headerTemplate: "<input type='checkbox' disabled=true id='MonitorCheckAll'> Monitor</div>",
                     template: "<input type='checkbox' disabled=true data-bind='checked:MONITOR_FLAG' />",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "100px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "TENANT_ID", title: "Tenant ID", width: "100px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._master.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "EMPLOYEEGRP_ID", title: "Group ID", width: "100px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "TENANT_ID",
                           cascadeFromField: "TENANT_ID",
                           optionLabel: {
                              text: "Group ID",
                              value: 0
                           },
                           data: "%.shared._master.group",
                           text: "@=EMPLOYEEGRP_ID: @=EMPLOYEEGRP_NAME",
                           value: "EMPLOYEEGRP_ID"
                        }
                     }
                  },
                  {
                     id: 5, field: "EMPLOYEEPART_ID", title: "Team ID", width: "100px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "EMPLOYEEGRP_ID",
                           cascadeFromField: "EMPLOYEEGRP_ID",
                           optionLabel: {
                              text: "Team ID",
                              value: 0
                           },
                           data: "%.shared._master.team",
                           text: "@=EMPLOYEEPART_ID: @=EMPLOYEEPART_NAME",
                           value: "EMPLOYEEPART_ID"
                        }
                     }
                  },
                  {
                     id: 6, field: "EMPLOYEE_ID", title: "Agent ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Agent ID",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 10;
                              },
                              format: function( input ) {
                                 return _Validation.isNumEng_upper(input.val());
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 10!",
                              format: "Please enter only English(Upper) and numbers!"
                           }
                        }
                     }
                  },
                  {
                     id: 7, field: "EMPLOYEE_NAME", title: "Agent Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Agent Name",
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
                     id: 8, field: "EMPLOYEE_PAWD", title: "Agent Password", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Password",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 16;
                              },
                              format: function( input ) {
                                 return _Validation.isPassword(input.val());
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 16!",
                              format: "Please enter only English and numbers, '~!@#$%^&*|?'!"
                           }
                        }
                     }
                  },
                  {
                     id: 9, field: "MEDIA_ID", title: "Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 10, field: "LOGIN_ID", title: "Login ID", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "MEDIA_ID",
                           cascadeFromField: "MEDIA_ID",
                           optionLabel: {
                              text: "Login ID",
                              value: "0"
                           },
                           data: "%.shared._login",
                           text: "@=LOGIN_ID",
                           value: "LOGIN_ID"
                        }
                     }
                  },
                  {
                     id: 11, field: "EMPLOYEE_CLASS", title: "Agent Class", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Agent", value: 1 },
                        { text: "2 : Team Manager", value: 2 },
                        { text: "3 : Group Manager", value: 3 },
                        { text: "4 : Center Manager", value: 4 }
                     ]
                  },
                  {
                     id: 12, field: "BLEND_KIND", title: "Blending", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Inbound", value: 1 },
                        { text: "2 : Outbound", value: 2 },
                        { text: "3 : Blend", value: 3 }
                     ]
                  },
                  {
                     id: 13, field: "EMPLOYEE_DUTY", title: "CCC Permit", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "CCC Permit",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 30;
                              }
                           },
                           messages: {
                              length: "The maximum length is 30!"
                           }
                        }
                     }
                  },
                  {
                     id: 14, field: "TEL_HOME", title: "CCC DN", width: "100px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "CCC DN",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 25;
                              }
                           },
                           messages: {
                              length: "The maximum length is 25!"
                           }
                        }
                     }
                  },
                  {
                     id: 15, field: "PERMIT_ID", title: "Permit ID", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:#####}"
                  },
                  {
                     id: 16, field: "UPDATE_USER", title: "Update Agent", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                  },
                  {
                     id: 17, field: "END_UPDATEDATE", title: "Update Date", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEEGRP_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEEPART_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEE_ID: {
                              type: "string"
                        },
                        EMPLOYEE_NAME: {
                              type: "string"
                        },
                        EMPLOYEE_PAWD: {
                              type: "string"
                        },
                        MEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        LOGIN_ID: {
                              type: "string"
                        },
                        EMPLOYEE_CLASS: {
                              type: "number",
                              defaultValue: 1
                        },
                        BLEND_KIND: {
                              type: "number",
                              defaultValue: 1
                        },
                        EMPLOYEE_DUTY: {
                              type: "string"
                        },
                        TEL_HOME: {
                              type: "string"
                        },
                        PERMIT_ID: {
                              type: "number",
                              defaultValue: 1000,
                              validation: { required: true, min: 1, max: 99999 }
                        },
                        UPDATE_USER: {
                              type: "string", editable: false
                        },
                        END_UPDATEDATE: {
                              type: "string", editable: false
                        }
                     }
                  }
               }
            }, // agent
            _SUBAGENT : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 2, field: "TENANT_ID", title: "Tenant ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._master.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "EMPLOYEE_ID", title: "Sub Agent ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Sub Agent ID",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 10;
                              },
                              format: function( input ) {
                                 return _Validation.isNumEng_upper(input.val());
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 10!",
                              format: "Please enter only English and numbers!"
                           }
                        }
                     }
                  },
                  {
                     id: 4, field: "MASTER_EMPLOYEE_ID", title: "Master Agent ID", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Agent ID",
                              value: ""
                           },
                           data: "%.shared._master.agent",
                           text: "@=EMPLOYEE_ID: @=EMPLOYEE_NAME",
                           value: "EMPLOYEE_ID"
                        }
                     }
                  },
                  {
                     id: 5, field: "SUB_MEDIA_ID", title: "Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 6, field: "SUB_DN", title: "DN", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "SUB_MEDIA_ID",
                           cascadeFromField: "MEDIA_ID",
                           optionLabel: {
                              text: "DN",
                              value: ""
                           },
                           data: "%.shared._dn.dn",
                           text: "@=DN",
                           value: "DN"
                        }
                     }
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        EMPLOYEE_ID: {
                              type: "string",
                              validation: { required: true }
                        },
                        MASTER_EMPLOYEE_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        SUB_MEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        SUB_DN: {
                              type: "number",
                              validation: { required: true }
                        }
                     }
                  }
               }
            }, // subagent
            _MAJOR : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._dn.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 2, field: "TENANT_ID", title: "Tenant ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._dn.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "DNMAJOR_ID", title: "Major ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:######}"
                  },
                  {
                     id: 4, field: "DNMAJOR_NAME", title: "Major Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Major Name",
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
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "DNMAJOR_ID",
                     fields : {
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNMAJOR_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 999999 }
                        },
                        DNMAJOR_NAME: {
                              type: "string"
                        }
                     }
                  }
               }
            }, // major
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
                     id: 1, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._dn.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 2, field: "TENANT_ID", title: "Tenant ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._dn.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "DNMAJOR_ID", title: "Major ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "TENANT_ID",
                           cascadeFromField: "TENANT_ID",
                           optionLabel: {
                              text: "Major ID",
                              value: 0
                           },
                           data: "%.shared._dn.dnmajor",
                           text: "@=DNMAJOR_ID: @=DNMAJOR_NAME",
                           value: "DNMAJOR_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "DNSUB_ID", title: "Sub ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:######}"
                  },
                  {
                     id: 5, field: "DNSUB_NAME", title: "Sub Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Sub Name",
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
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "DNSUB_ID",
                     fields : {
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNMAJOR_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNSUB_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 999999 }
                        },
                        DNSUB_NAME: {
                              type: "string"
                        }
                     }
                  }
               }
            }, // sub
            _DN : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     role: { "checkAll": { domID: "MonitorCheckAll", rowID: "MONITOR_FLAG" } },
                     id: 1, field: "MONITOR_FLAG", locked: false, width: 120,
                     headerTemplate: "<input type='checkbox' disabled=true id='MonitorCheckAll'> Monitor</div>",
                     template: "<input type='checkbox' disabled=true data-bind='checked:MONITOR_FLAG' />",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           data: "%.shared._dn.center",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "TENANT_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._dn.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "DNMAJOR_ID", title: "Major ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "TENANT_ID",
                           cascadeFromField: "TENANT_ID",
                           optionLabel: {
                              text: "Major ID",
                              value: 0
                           },
                           data: "%.shared._dn.dnmajor",
                           text: "@=DNMAJOR_ID: @=DNMAJOR_NAME",
                           value: "DNMAJOR_ID"
                        }
                     }
                  },
                  {
                     id: 5, field: "DNSUB_ID", title: "Sub ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "DNMAJOR_ID",
                           cascadeFromField: "DNMAJOR_ID",
                           optionLabel: {
                              text: "Sub ID",
                              value: 0
                           },
                           data: "%.shared._dn.dnsub",
                           text: "@=DNSUB_ID: @=DNSUB_NAME",
                           value: "DNSUB_ID"
                        }
                     }
                  },
                  {
                     id: 6, field: "DN", title: "DN", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "DN",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 10;
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 10!"
                           }
                        }
                     }
                  },
                  {
                     id: 7, field: "MEDIA_ID", title: "Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 8, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Sub Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 9, field: "DN_KIND", title: "DN Kind", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : PSTN", value: 1 },
                        { text: "2 : ARS", value: 2 },
                        { text: "3 : PSTN/VoIP", value: 3 },
                        { text: "4 : PSTN/Chat", value: 4 },
                        { text: "5 : PSTN/eMail", value: 5 },
                        { text: "6 : PSTN/Fax", value: 6 },
                        { text: "7 : CITG", value: 7 }
                     ]
                  },
                  {
                     id: 10, field: "DN_TYPE", title: "DN Type", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Normal Phone", value: 1 },
                        { text: "2 : Digital Phone", value: 2 },
                        { text: "3 : Virtual Phone", value: 3 }
                     ]
                  },
                  {
                     id: 11, field: "OBSERVER_FLAG", title: "Observer", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "0 : FALSE", value: 0 },
                        { text: "1 : TRUE", value: 1 }
                     ]
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "DN",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNMAJOR_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNSUB_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DN: {
                              type: "string"
                        },
                        MEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        SUBMEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DN_KIND: {
                              type: "number",
                              validation: { required: true },
                              defaultValue: 1
                        },
                        DN_TYPE: {
                              type: "number",
                              validation: { required: true },
                              defaultValue: 2
                        },
                        OBSERVER_FLAG: {
                              type: "number",
                              validation: { required: true }
                        },
                        TAG: {
                              type: "number",
                              defaultValue: 0
                        }
                     }
                  }
               }
            }, // dn
            _ROUTE : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     role: { "checkAll": { domID: "MonitorCheckAll", rowID: "MONITOR_FLAG" } },
                     id: 1, field: "MONITOR_FLAG", width: "120px",
                     headerTemplate: "<input type='checkbox' disabled=true id='MonitorCheckAll'> Monitor</div>",
                     template: "<input type='checkbox' disabled=true data-bind='checked:MONITOR_FLAG' />",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._route.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "TENANT_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._route.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "DNMAJOR_ID", title: "Major ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "TENANT_ID",
                           cascadeFromField: "TENANT_ID",
                           optionLabel: {
                              text: "Major ID",
                              value: 0
                           },
                           data: "%.shared._route.dnmajor",
                           text: "@=DNMAJOR_ID: @=DNMAJOR_NAME",
                           value: "DNMAJOR_ID"
                        }
                     }
                  },
                  {
                     id: 5, field: "DNSUB_ID", title: "Sub ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "DNMAJOR_ID",
                           cascadeFromField: "DNMAJOR_ID",
                           optionLabel: {
                              text: "Sub ID",
                              value: 0
                           },
                           data: "%.shared._route.dnsub",
                           text: "@=DNSUB_ID: @=DNSUB_NAME",
                           value: "DNSUB_ID"
                        }
                     }
                  },
                  {
                     id: 6, field: "QUEUE_ID", title: "Route ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Route ID",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 10;
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 10!"
                           }
                        }
                     }
                  },
                  {
                     id: 7, field: "MEDIA_ID", title: "Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 8, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Sub Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 9, field: "QUEUE_NAME", title: "Route Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Route Name",
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
                     id: 10, field: "QUEUE_KIND", title: "Route Kind", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "3 : Queue", value: 3 },
                        { text: "4 : RoutePoint", value: 4 },
                        { text: "5 : Hunt", value: 5 }
                     ]
                  },
                  {
                     id: 11, field: "QUEUE_TYPE", title: "Route Type", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Service Queue", value: 1 },
                        { text: "2 : Callback Queue", value: 2 },
                        { text: "3 : Virtual Queue", value: 3 },
                        { text: "4 : Initial VDN", value: 4 }
                     ]
                  },
                  {
                     id: 12, field: "QUEUE_MAXTIME", title: "Max Waiting Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:#####}"
                  },
                  {
                     id: 13, field: "QUEUE_SLTIME", title: "Service Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:#####}"
                  },
                  {
                     id: 14, field: "OPTIONS", title: "Options", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Options",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 30;
                              }
                           },
                           messages: {
                              length: "The maximum length is 30!"
                           }
                        }
                     }
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "QUEUE_ID",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNMAJOR_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        DNSUB_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        QUEUE_ID: {
                              type: "string"
                        },
                        MEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        SUBMEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        QUEUE_NAME: {
                              type: "string"
                        },
                        QUEUE_KIND: {
                              type: "number",
                              validation: { required: true },
                              defaultValue: 4
                        },
                        QUEUE_TYPE: {
                              type: "number",
                              validation: { required: true },
                              defaultValue: 4
                        },
                        QUEUE_MAXTIME: {
                              type: "number",
                              defaultValue: 100,
                              validation: { required: true, min: 1, max: 99999 }
                        },
                        QUEUE_SLTIME: {
                              type: "number",
                              defaultValue: 20,
                              validation: { required: true, min: 1, max: 99999 }
                        },
                        OPTIONS: {
                              type: "string"
                        },
                        LAST_SKILLID: {
                              type: "number",
                              defaultValue: 0
                        },
                        MATCH_QUEUE: {
                              type: "number",
                              defaultValue: 0
                        },
                        QUEUE_NACD: {
                              type: "number",
                              defaultValue: 0
                        }
                     }
                  }
               }
            }, // route
            _LOGIN : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "MONITOR_FLAG", title: "Used", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "0 : Not Use", value: false },
                        { text: "1 : Used", value: true }
                     ]
                  },
                  {
                     id: 2, field: "CENTER_ID", title: "Center ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "MEDIA_ID", title: "Media ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Media ID",
                              value: 0
                           },
                           data: "%.shared._media",
                           text: "@=MEDIA_ID: @=MEDIA_NAME",
                           value: "MEDIA_ID"
                        }
                     }
                  },
                  {
                     id: 4, field: "LOGIN_ID", title: "Login ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Login ID",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 10;
                              }
                           },
                           messages: {
                              required: "Required!",
                              length: "The maximum length is 10!"
                           }
                        }
                     }
                  },
                  {
                     id: 5, field: "CREATE_DATE", title: "Create Date", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:yyyy-MM-dd}"
                  }
               ],
               SCHEMA : {
                  model : {
                     //id : "LOGIN_ID",
                     fields : {
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: false
                        },
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        MEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        LOGIN_ID: {
                              type: "string",
                              validation: { required: true }
                        },
                        CREATE_DATE: {
                              type: "date", editable: false,
                              defaultValue: new Date()
                        }
                     }
                  }
               }
            }, // login
            _SKILL : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "CENTER_ID", title: "Center ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Center ID",
                              value: 0
                           },
                           data: "%.shared._master.center",
                           text: "@=CENTER_ID: @=CENTER_NAME",
                           value: "CENTER_ID"
                        }
                     }
                  },
                  {
                     id: 2, field: "TENANT_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           cascadeFrom: "CENTER_ID",
                           cascadeFromField: "CENTER_ID",
                           optionLabel: {
                              text: "Tenant ID",
                              value: 0
                           },
                           data: "%.shared._master.tenant",
                           text: "@=TENANT_ID: @=TENANT_NAME",
                           value: "TENANT_ID"
                        }
                     }
                  },
                  {
                     id: 3, field: "SKILL_ID", title: "Skill ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:###}"
                  },
                  {
                     id: 4, field: "SKILL_NAME", title: "Skill Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Skill Name",
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
                     id: 5, field: "SKILL_DESC", title: "Skill Description", width: "300px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Skill Description",
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
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "SKILL_ID",
                     fields : {
                        CENTER_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        TENANT_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        SKILL_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 512 }
                        },
                        SKILL_NAME: {
                              type: "string"
                        },
                        SKILL_DESC: {
                              type: "string"
                        }
                     }
                  }
               }
            }, // skill
            _SKILL_ASSIGN : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "CENTER_ID", title: "Center ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "TENANT_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "EMPLOYEE_ID", title: "Agent ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "SKILL_LEVEL", title: "Skill Level", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "LEVEL 1", value: 1 }, { text: "LEVEL 2", value: 2 },
                        { text: "LEVEL 3", value: 3 }, { text: "LEVEL 4", value: 4 },
                        { text: "LEVEL 5", value: 5 }, { text: "LEVEL 6", value: 6 },
                        { text: "LEVEL 7", value: 7 }, { text: "LEVEL 8", value: 8 },
                        { text: "LEVEL 9", value: 9 }, { text: "LEVEL 10", value: 10 },
                     ]
                  },
                  {
                     id: 5, field: "SKILL_ID", title: "Skill ID", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           filterField: "TENANT_ID",
                           optionLabel: {
                              text: "Skill ID",
                              value: 0
                           },
                           data: "%.shared._skill",
                           text: "@=SKILL_ID: @=SKILL_NAME",
                           value: "SKILL_ID"
                        }
                     }
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "SKILL_ID",
                     fields : {
                        CENTER_ID: {
                              type: "number", editable: false,
                              autoDefault: true
                        },
                        TENANT_ID: {
                              type: "number", editable: false,
                              autoDefault: true
                        },
                        EMPLOYEE_ID: {
                              type: "string", editable: false,
                              autoDefault: true
                        },
                        SKILL_LEVEL: {
                              type: "number",
                              validation: { required: true },
                              defaultValue: 1
                        },
                        SKILL_ID: {
                              type: "number",
                              validation: { required: true }
                        }
                     }
                  }
               }
            }, // skill assign
      };



      /**
       * DEFINE
       */
      var _DEFINE = {
         SIDEBAR : {
            BUTTON_1  : "HOME",
            BUTTON_2  : "RESOURCE",
            BUTTON_3  : "CENTER",
            BUTTON_4  : "TENANT",
            BUTTON_5  : "AGENT",
            BUTTON_6  : "DN",
            BUTTON_7  : "ROUTE",
            BUTTON_8  : "LOGIN",
            BUTTON_9  : "SKILL",
            BUTTON_10 : "SCENARIO",
         },
         CONTENTS : {
            /**
             * loading
             */
            LOADING : {
               MEDIA : {
                  TAG    : "media",
                  DATA   : "DBMS_MEDIA"
               },
               LOGIN : {
                  TAG    : "loginid",
                  DATA   : "DBMS_LOGIN"
               },
               SKILL : {
                  TAG    : "skill",
                  DATA   : "DBMS_SKILL"
               }
            },

            /**
             * push
             */
            PUSH : {
               "master" : {
                  "center" : {
                     PK : ["CENTER_ID"],
                     DATA : {
                        "CENTER_ID"       : { field: "CENTER_ID", type: "number" },
                        "CENTER_RID"      : { field: "CENTER_RID", type: "number" },
                        "CENTER_NAME"     : { field: "CENTER_NAME", type: "string" },
                        "CENTER_TYPE"     : { field: "CENTER_TYPE", type: "number" },
                        "CENTER_IP"       : { field: "CENTER_IP", type: "string" },
                        "CENTER_IP2"      : { field: "CENTER_IP2", type: "string" },
                        "DUPLEXING_FLAG"  : { field: "DUPLEXING_FLAG", type: "number" },
                        "DB_KIND"         : { field: "DB_KIND", type: "number" },
                        "UIUPDATE_ADDRESS": { field: "UIUPDATE_ADDRESS", type: "string" },
                        //"CENTER_ALIAS"    : { field: "CENTER_ALIAS", type: "string" },
                        //"TRUNK_ACCESSCODE": { field: "TRUNK_ACCESSCODE", type: "string" },
                        //"TRUNK_GROUPCODE" : { field: "TRUNK_GROUPCODE", type: "string" },
                        //"MINUTE_CLOSEING" : { field: "MINUTE_CLOSEING", type: "number" },
                        //"H_SAVETERM"      : { field: "H_SAVETERM", type: "number" },
                        //"U_SAVETERM"      : { field: "U_SAVETERM", type: "number" }
                     }
                  },
                  "tenant" : {
                     PK : ["CENTER_ID", "TENANT_ID"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "TENANT_NAME"  : { field: "TENANT_NAME", type: "string" },
                        "SERVICELEVEL_CALC" : { field: "SERVICELEVEL_CALC", type: "string" }
                     }
                  },
                  "group" : {
                     PK : ["CENTER_ID", "TENANT_ID", "EMPLOYEEGRP_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "EMPLOYEEGRP_ID"   : { field: "EMPLOYEEGRP_ID", type: "number" },
                        "EMPLOYEEGRP_NAME" : { field: "EMPLOYEEGRP_NAME", type: "string" }
                     }
                  },
                  "team" : {
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
                  "subagent" : {
                     PK : ["CENTER_ID", "TENANT_ID", "EMPLOYEE_ID"],
                     DATA : {
                        "CENTER_ID"     : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"     : { field: "TENANT_ID", type: "number" },
                        "EMPLOYEE_ID"   : { field: "EMPLOYEE_ID", type: "string" },
                        "MASTER_EMPLOYEE_ID" : { field: "MASTER_EMPLOYEE_ID", type: "string" },
                        "SUB_DN"        : { field: "SUB_DN", type: "string" },
                        "SUB_MEDIA_ID"  : { field: "SUB_MEDIA_ID", type: "number" },
                     }
                  },
                  "dnmajor" : {
                     PK : ["CENTER_ID", "TENANT_ID", "DNMAJOR_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNMAJOR_NAME" : { field: "DNMAJOR_NAME", type: "string" }
                     }
                  },
                  "dnsub" : {
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
                        "OBSERVER_FLAG": { field: "OBSERVER_FLAG", type: "number" },
                        "TAG"          : { field: "TAG", type: "number" }
                     }
                  },
                  "route" : {
                     PK : ["CENTER_ID", "TENANT_ID", "DNMAJOR_ID", "DNSUB_ID", "QUEUE_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "TENANT_ID"    : { field: "TENANT_ID", type: "number" },
                        "DNMAJOR_ID"   : { field: "DNMAJOR_ID", type: "number" },
                        "DNSUB_ID"     : { field: "DNSUB_ID", type: "number" },
                        "QUEUE_ID"     : { field: "QUEUE_ID", type: "string" },
                        "MEDIA_ID"     : { field: "MEDIA_ID", type: "number" },
                        "SUBMEDIA_ID"  : { field: "SUBMEDIA_ID", type: "number" },
                        "QUEUE_NAME"   : { field: "QUEUE_NAME", type: "string" },
                        "QUEUE_KIND"   : { field: "QUEUE_KIND", type: "number" },
                        "QUEUE_TYPE"   : { field: "QUEUE_TYPE", type: "number" },
                        "QUEUE_MAXTIME": { field: "QUEUE_MAXTIME", type: "number" },
                        "QUEUE_SLTIME" : { field: "QUEUE_SLTIME", type: "number" },
                        "OPTIONS"      : { field: "OPTIONS", type: "string" },
                        "LAST_SKILLID" : { field: "LAST_SKILLID", type: "number" }
                     }
                  },
                  "loginid" : {
                     PK : ["CENTER_ID", "LOGIN_ID"],
                     DATA : {
                        "MONITOR_FLAG" : { field: "MONITOR_FLAG", type: "number" },
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "MEDIA_ID"     : { field: "MEDIA_ID", type: "number" },
                        "LOGIN_ID"     : { field: "LOGIN_ID", type: "string" },
                        "CREATE_DATE"  : { field: "CREATE_DATE", type: "string" }
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
                  "media" : {
                     PK : ["CENTER_ID", "MEDIA_ID"],
                     DATA : {
                        "CENTER_ID"    : { field: "CENTER_ID", type: "number" },
                        "MEDIA_ID"     : { field: "MEDIA_ID", type: "number" },
                        "MEDIA_NAME"   : { field: "MEDIA_NAME", type: "string" },
                        "MEDIA_KIND"   : { field: "MEDIA_KIND", type: "number" }
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
               },
               "stats" : {

               }
            },

            /**
             * resource
             */
            RESOURCE : {
               LEFT : {
                  TREEVIEW_TENANT : {
                     TEXT_FIELD: ["center", "tenant"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        }
                     }
                  },
                  TREEVIEW_GROUP : {
                     TEXT_FIELD: ["center", "tenant", "group"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]"
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH3 : {
                           TAG    : "group",
                           DATA   : "%.shared._master.group",
                           PIN    : "EMPLOYEEGRP_ID",
                           TXT    : "@=EMPLOYEEGRP_ID [@=EMPLOYEEGRP_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  TREEVIEW_TEAM : {
                     TEXT_FIELD: ["center", "tenant", "group", "team"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH3 : {
                           TAG    : "group",
                           DATA   : "%.shared._master.group",
                           PIN    : "EMPLOYEEGRP_ID",
                           TXT    : "@=EMPLOYEEGRP_ID [@=EMPLOYEEGRP_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH4 : {
                           TAG    : "team",
                           DATA   : "%.shared._master.team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  TREEVIEW_AGENT : {
                     TEXT_FIELD: ["center", "tenant", "group", "team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "DBMS_CENTER",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]"
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "DBMS_TENANT",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]"
                        },
                        DEPTH3 : {
                           TAG    : "group",
                           DATA   : "DBMS_GROUP",
                           PIN    : "EMPLOYEEGRP_ID",
                           TXT    : "@=EMPLOYEEGRP_ID [@=EMPLOYEEGRP_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH4 : {
                           TAG    : "team",
                           DATA   : "DBMS_TEAM",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH5: {
                           TAG    : "agent",
                           DATA   : "DBMS_AGENT",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  TREEVIEW_DN : {
                     TEXT_FIELD: ["center", "tenant", "dnmajor", "dnsub", "dn"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH3 : {
                           TAG    : "dnmajor",
                           DATA   : "DBMS_MAJOR",
                           PIN    : "DNMAJOR_ID",
                           TXT    : "@=DNMAJOR_ID [@=DNMAJOR_NAME]",
                        },
                        DEPTH4 : {
                           TAG    : "dnsub",
                           DATA   : "DBMS_SUB",
                           PIN    : "DNSUB_ID",
                           TXT    : "@=DNSUB_ID [@=DNSUB_NAME]",
                        },
                        DEPTH5 : {
                           TAG    : "dn",
                           DATA   : "DBMS_DN",
                           PIN    : "DN",
                           TXT    : "@=DN",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  TREEVIEW_ROUTE : {
                     TEXT_FIELD: ["center", "tenant", "dnmajor", "dnsub", "route"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH3 : {
                           TAG    : "dnmajor",
                           DATA   : "%.shared._dn.dnmajor",
                           PIN    : "DNMAJOR_ID",
                           TXT    : "@=DNMAJOR_ID [@=DNMAJOR_NAME]",
                        },
                        DEPTH4 : {
                           TAG    : "dnsub",
                           DATA   : "%.shared._dn.dnsub",
                           PIN    : "DNSUB_ID",
                           TXT    : "@=DNSUB_ID [@=DNSUB_NAME]",
                        },
                        DEPTH5 : {
                           TAG    : "route",
                           DATA   : "DBMS_ROUTE",
                           PIN    : "QUEUE_ID",
                           TXT    : "@=QUEUE_ID",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  },
                  TREEVIEW_SCENARIO : {
                     TEXT_FIELD: ["center", "tenant", "scenario"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH3 : {
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
                     CENTER          : { TITLE : "Center" },
                     TENANT          : { TITLE : "Tenant" },
                     GROUP           : { TITLE : "Group" },
                     TEAM            : { TITLE : "Team" },
                     AGENT           : { TITLE : "Agent" },
                     SUBAGENT        : { TITLE : "Sub Agent" },
                     MAJOR           : { TITLE : "Major" },
                     SUB             : { TITLE : "Sub" },
                     DN              : { TITLE : "Dn" },
                     ROUTE           : { TITLE : "Route" },
                     LOGIN           : { TITLE : "Login" },
                     SKILL           : { TITLE : "Skill" },
                     ASSIGN          : { TITLE : "Skill Assign" },
                     SCENARIO        : { TITLE : "Scenario" },

                     TREEVIEW_TENANT : { TITLE : "Tenant Select" },
                     TREEVIEW_GROUP  : { TITLE : "Group Select" },
                     TREEVIEW_TEAM   : { TITLE : "Team Select" },
                     TREEVIEW_AGENT  : { TITLE : "Agent Select" },
                     TREEVIEW_DN     : { TITLE : "Dn Select" },
                     TREEVIEW_ROUTE  : { TITLE : "Route Select" }
                  }
               }
            },

            /**
             * ContainerGrid
             */
            CONTAINER_GRID : {
               TOP : {
                  MENU_LIST : {
                     TREEVIEW_TENANT : {
                        TEXT_FIELD : "TENANT_ID"
                     },
                     TREEVIEW_GROUP : {
                        TEXT_FIELD : "EMPLOYEEGRP_ID"
                     },
                     TREEVIEW_TEAM : {
                        TEXT_FIELD : "EMPLOYEEPART_ID"
                     },
                     TREEVIEW_AGENT : {
                        TEXT_FIELD : "EMPLOYEE_ID"
                     },
                     TREEVIEW_DN : {
                        TEXT_FIELD : "DN"
                     },
                     TREEVIEW_ROUTE : {
                        TEXT_FIELD : "QUEUE_ID"
                     }
                  }
               },
               BOTTOM : {
                  SELECTED_GRID : {
                     TREEVIEW_TENANT : {
                        PUSH : "tenant",
                        DATA : "DBMS_TENANT",
                        COLUMN : _GRID_DEFINE._TENANT.COLUMN,
                        SCHEMA : _GRID_DEFINE._TENANT.SCHEMA
                     }, // tenant
                     TREEVIEW_GROUP : {
                        PUSH : "group",
                        DATA : "DBMS_GROUP",
                        COLUMN : _GRID_DEFINE._GROUP.COLUMN,
                        SCHEMA : _GRID_DEFINE._GROUP.SCHEMA
                     }, // group
                     TREEVIEW_TEAM : {
                        PUSH : "team",
                        DATA : "DBMS_TEAM",
                        COLUMN : _GRID_DEFINE._TEAM.COLUMN,
                        SCHEMA : _GRID_DEFINE._TEAM.SCHEMA
                     }, // team
                     TREEVIEW_AGENT : {
                        PUSH : "agent",
                        DATA : "DBMS_AGENT",
                        COLUMN : _GRID_DEFINE._AGENT.COLUMN,
                        SCHEMA : _GRID_DEFINE._AGENT.SCHEMA
                     }, // agent
                     TREEVIEW_DN : {
                        PUSH : "dn",
                        DATA : "DBMS_DN",
                        COLUMN : _GRID_DEFINE._DN.COLUMN,
                        SCHEMA : _GRID_DEFINE._DN.SCHEMA
                     }, // dn
                     TREEVIEW_ROUTE : {
                        PUSH : "route",
                        DATA : "DBMS_ROUTE",
                        COLUMN : _GRID_DEFINE._ROUTE.COLUMN,
                        SCHEMA : _GRID_DEFINE._ROUTE.SCHEMA
                     }, // route
                  }
               }
            },

            /**
             * ContainerGridAll
             */
            CONTAINER_GRID_ALL : {
               CENTER : {
                  ALL_GRID : {
                     CENTER : {
                        PUSH : "center",
                        DATA : "DBMS_CENTER",
                        COLUMN : _GRID_DEFINE._CENTER.COLUMN,
                        SCHEMA : _GRID_DEFINE._CENTER.SCHEMA
                     }, // center
                     SUBAGENT : {
                        PUSH : "subagent",
                        DATA : "DBMS_SUBAGENT",
                        COLUMN : _GRID_DEFINE._SUBAGENT.COLUMN,
                        SCHEMA : _GRID_DEFINE._SUBAGENT.SCHEMA
                     }, // center
                     MAJOR : {
                        TITLE : "MAJOR CATEGORY",
                        PUSH : "dnmajor",
                        DATA : "DBMS_MAJOR",
                        COLUMN : _GRID_DEFINE._MAJOR.COLUMN,
                        SCHEMA : _GRID_DEFINE._MAJOR.SCHEMA
                     }, // major
                     SUB : {
                        TITLE : "SUB CATEGORY",
                        PUSH : "dnsub",
                        DATA : "DBMS_SUB",
                        COLUMN : _GRID_DEFINE._SUB.COLUMN,
                        SCHEMA : _GRID_DEFINE._SUB.SCHEMA
                     }, // sub
                     LOGIN : {
                        PUSH : "loginid",
                        DATA : "DBMS_LOGIN",
                        COLUMN : _GRID_DEFINE._LOGIN.COLUMN,
                        SCHEMA : _GRID_DEFINE._LOGIN.SCHEMA
                     }, // login
                     SKILL : {
                        PUSH : "skill",
                        DATA : "DBMS_SKILL",
                        COLUMN : _GRID_DEFINE._SKILL.COLUMN,
                        SCHEMA : _GRID_DEFINE._SKILL.SCHEMA
                     }, // skill
                  }
               }
            },


            /**
             * ContainerGridSkill
             */
            CONTAINER_GRID_SKILL : {
               LEFT : {
                  SKILL_AGENT_TREEVIEW : {
                     TEXT_FIELD: ["center", "tenant", "group", "team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]",
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]",
                        },
                        DEPTH3 : {
                           TAG    : "group",
                           DATA   : "%.shared._master.group",
                           PIN    : "EMPLOYEEGRP_ID",
                           TXT    : "@=EMPLOYEEGRP_ID [@=EMPLOYEEGRP_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH4 : {
                           TAG    : "team",
                           DATA   : "%.shared._master.team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH5 : {
                           TAG    : "agent",
                           DATA   : "%.shared._master.agent",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "@=EMPLOYEE_ID [@=EMPLOYEE_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        }
                     }
                  }
               },
               CENTER : {
                  SKILL_SELECTED_GRID : {
                     DATA   : "DBMS_SKILL_ASSIGN",
                     COLUMN : _GRID_DEFINE._SKILL_ASSIGN.COLUMN,
                     SCHEMA : _GRID_DEFINE._SKILL_ASSIGN.SCHEMA
                  }
               },
               RIGHT : {
                  SKILL_SKILL_TREEVIEW : {
                     TEXT_FIELD: ["center", "tenant", "skill", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "center",
                           DATA   : "%.shared._master.center",
                           PIN    : "CENTER_ID",
                           TXT    : "@=CENTER_ID [@=CENTER_NAME]"
                        },
                        DEPTH2 : {
                           TAG    : "tenant",
                           DATA   : "%.shared._master.tenant",
                           PIN    : "TENANT_ID",
                           TXT    : "@=TENANT_ID [@=TENANT_NAME]"
                        },
                        DEPTH3 : {
                           TAG    : "skill",
                           DATA   : "%.shared._skill",
                           PIN    : "SKILL_ID",
                           TXT    : "@=SKILL_ID [@=SKILL_NAME]"
                        },
                        DEPTH4 : {
                           TAG    : "agent",
                           DATA   : "DBMS_SKILL_ASSIGN",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "(@=SKILL_LEVEL) @=EMPLOYEE_ID [@=EMPLOYEE_NAME]"
                        }
                     }
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
                           id: 1, field: "CENTER_ID", title: "Center ID", width: "120px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: center;" },
                           onEdit: {
                              component: "kendoDropDownList",
                              options: {
                                 required: "Required!",
                                 dataTextField: "text",
                                 dataValueField: "value",
                                 optionLabel: {
                                    text: "Center ID",
                                    value: 0
                                 },
                                 data: "%.shared._scenario.center",
                                 text: "@=CENTER_ID: @=CENTER_NAME",
                                 value: "CENTER_ID"
                              }
                           }
                        },
                        {
                           id: 2, field: "TENANT_ID", title: "Tenant ID", width: "120px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: center;" },
                           onEdit: {
                              component: "kendoDropDownList",
                              options: {
                                 required: "Required!",
                                 dataTextField: "text",
                                 dataValueField: "value",
                                 cascadeFrom: "CENTER_ID",
                                 cascadeFromField: "CENTER_ID",
                                 optionLabel: {
                                    text: "Tenant ID",
                                    value: 0
                                 },
                                 data: "%.shared._scenario.tenant",
                                 text: "@=TENANT_ID: @=TENANT_NAME",
                                 value: "TENANT_ID"
                              }
                           }
                        },
                        {
                           id: 3, field: "SCENARIO_ID", title: "Scenario ID", width: "150px",
                           pk: true,
                           attributes: { "class": "table-cell", style: "text-align: center;" },
                           format: "{0:######}"
                        },
                        {
                           id: 4, field: "SCENARIO_NAME", title: "Scenario Name", width: "150px",
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
                           id: 5, field: "SCENARIO_DESC", title: "Scenario", width: "150px",
                           onEdit: {
                              component: "kendoValidator",
                              options: {
                                 style: "width: 100%",
                                 required: "Please enter required!",
                                 rules: {
                                    length: function( input ) {
                                       return input.val().length <= 4000;
                                    }
                                 },
                                 messages: {
                                    length: "The maximum length is 4000!"
                                 }
                              }
                           }
                        },
                        */
                        {
                           id: 5, field: "CREATE_DATE", title: "Create", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 6, field: "CREATE_IP", title: "Create IP", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 7, field: "CREATE_EMPID", title: "Create User", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 8, field: "MODIFY_DATE", title: "Update", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 9, field: "MODIFY_IP", title: "Update IP", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        },
                        {
                           id: 10, field: "MODIFY_EMPID", title: "Update User", width: "120px",
                           attributes: { "class": "table-cell", style: "text-align: center;" }
                        }
                     ],
                     SCHEMA : {
                        model : {
                           id : "SCENARIO_ID",
                           fields : {
                              CENTER_ID: {
                                    type: "number",
                                    validation: { required: true }
                              },
                              TENANT_ID: {
                                    type: "number",
                                    validation: { required: true }
                              },
                              SCENARIO_ID: {
                                    type: "number",
                                    defaultValue: 0,
                                    validation: { required: true, min: 1, max: 999999 }
                              },
                              SCENARIO_NAME: {
                                    type: "string"
                              },
                              SCENARIO_DESC: {
                                    type: "string",
                                    defaultValue: ""
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
                              }
                           }
                        }
                     },
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
