'use strict';

define(["../../Library/manage.validation"],
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
            _AGENT_CALL : {
               COLUMN : [
                  {
                     id: 1, field: "EMPLOYEEPART_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:##########}"
                  },
                  {
                     id: 2, field: "EMPLOYEE_ID", title: "ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "EMPLOYEE_NAME", title: "Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "EMPLOYEE_PAWD", title: "Password", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "MEDIA_ID", title: "Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:##}"
                  },
                  {
                     id: 6, field: "LOGIN_ID", title: "Login ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 7, field: "TEL_HOME", title: "DN", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  }
                  /*
                  ,
                  {
                     id: 8, field: "EMPLOYEE_CLASS", title: "Class", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Agent", value: 1 },
                        { text: "2 : Team Manager", value: 2 },
                        { text: "3 : Group Manager", value: 3 },
                        { text: "4 : Center Manager", value: 4 }
                     ]
                  },
                  {
                     id: 9, field: "BLEND_KIND", title: "Blending", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Inbound", value: 1 },
                        { text: "2 : Outbound", value: 2 },
                        { text: "3 : Blend", value: 3 }
                     ]
                  },
                  {
                     id: 10, field: "UPDATE_USER", title: "Update Agent", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                  },
                  {
                     id: 11, field: "END_UPDATEDATE", title: "Update Date", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                  }
                  */
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
                        EMPLOYEEPART_ID: { type: "number" },
                        EMPLOYEE_ID: { type: "string" },
                        EMPLOYEE_NAME: { type: "string" },
                        EMPLOYEE_PAWD: { type: "string" },
                        MEDIA_ID: { type: "number" },
                        LOGIN_ID: { type: "string" },
                        TEL_HOME: { type: "string" },
                        /*
                        EMPLOYEE_CLASS: { type: "number" },
                        BLEND_KIND: { type: "number" },
                        UPDATE_USER: { type: "string" },
                        END_UPDATEDATE: { type: "string" }
                        */
                     }
                  }
               }
            }, // agent-call
            _AGENT_UQ : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "EMPLOYEEPART_ID", title: "Tenant ID", width: "120px",
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
                     id: 2, field: "EMPLOYEE_ID", title: "ID", width: "150px",
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
                     id: 3, field: "EMPLOYEE_NAME", title: "Name", width: "150px",
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
                     id: 4, field: "EMPLOYEE_PAWD", title: "Password", width: "150px",
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
                     id: 5, field: "MEDIA_ID", title: "Media ID", width: "120px",
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
                     id: 6, field: "LOGIN_ID", title: "Login ID", width: "120px",
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
                     id: 7, field: "TEL_HOME", title: "DN", width: "150px",
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
                     id: 8, field: "EMPLOYEE_CLASS", title: "Class", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Agent", value: 1 },
                        { text: "2 : Team Manager", value: 2 },
                        { text: "3 : Group Manager", value: 3 },
                        { text: "4 : Center Manager", value: 4 }
                     ]
                  },
                  {
                     id: 9, field: "BLEND_KIND", title: "Blending", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Inbound", value: 1 },
                        { text: "2 : Outbound", value: 2 },
                        { text: "3 : Blend", value: 3 }
                     ]
                  },
                  {
                     id: 10, field: "UPDATE_USER", title: "Update Agent", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                  },
                  {
                     id: 11, field: "END_UPDATEDATE", title: "Update Date", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "EMPLOYEE_ID",
                     fields : {
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
                        TEL_HOME: {
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
                        UPDATE_USER: {
                              type: "string", editable: false
                        },
                        END_UPDATEDATE: {
                              type: "string", editable: false
                        },
                        MONITOR_FLAG: {
                              type: "boolean",
                              defaultValue: true
                        },
                        CENTER_ID: {
                              type: "number",
                              defaultValue: 1
                        },
                        TENANT_ID: {
                              type: "number",
                              defaultValue: 10
                        },
                        EMPLOYEEGRP_ID: {
                              type: "number",
                              defaultValue: 100
                        },
                        PERMIT_ID: {
                              type: "number",
                              defaultValue: 1000
                        },
                     }
                  }
               }
            }, // agent-uq
            _SUBAGENT : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "EMPLOYEE_ID", title: "Sub ID", width: "200px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
                           optionLabel: {
                              text: "Sub ID",
                              value: ""
                           },
                           data: "%.shared._master.agent",
                           text: "@=EMPLOYEE_ID: @=EMPLOYEE_NAME",
                           value: "EMPLOYEE_ID"
                        }
                     }
                  },
                  {
                     id: 2, field: "MASTER_EMPLOYEE_ID", title: "Master ID", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     groupFooterTemplate: "TOTAL : #= count #",
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
                     id: 3, field: "SUB_MEDIA_ID", title: "Media ID", width: "200px",
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
                     id: 4, field: "SUB_DN", title: "DN", width: "200px",
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
                              value: 0
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
                        EMPLOYEE_ID: {
                              type: "string",
                              validation: { required: true }
                        },
                        MASTER_EMPLOYEE_ID: {
                              type: "string",
                              validation: { required: true }
                        },
                        SUB_MEDIA_ID: {
                              type: "number",
                              validation: { required: true }
                        },
                        SUB_DN: {
                              type: "string",
                              validation: { required: true }
                        },
                        CENTER_ID: {
                              type: "number",
                              defaultValue: 1
                        },
                        TENANT_ID: {
                              type: "number",
                              defaultValue: 10
                        },
                     }
                  }
               }
            }, // subagent
            _DN : {
               COLUMN : [
                  {
                     id: 1, field: "DNSUB_ID", title: "Tenant ID", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:##########}"
                  },
                  {
                     id: 2, field: "DN", title: "DN", width: "150px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "MEDIA_ID", title: "Media ID", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:##}"
                  },
                  {
                     id: 4, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:##}"
                    
                  },
                  {
                     id: 5, field: "DN_KIND", title: "DN Kind", width: "150px",
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
                     id: 6, field: "DN_TYPE", title: "DN Type", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Normal Phone", value: 1 },
                        { text: "2 : Digital Phone", value: 2 },
                        { text: "3 : Virtual Phone", value: 3 }
                     ]
                  }
                  /*
                  ,
                  {
                     id: 7, field: "OBSERVER_FLAG", title: "Observer", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "0 : FALSE", value: 0 },
                        { text: "1 : TRUE ", value: 1 }
                     ]
                  }
                  */
               ],
               SCHEMA : {
                  model : {
                     id : "DN",
                     fields : {
                        DNSUB_ID: { type: "number" },
                        DN: { type: "string" },
                        MEDIA_ID: { type: "number" },
                        SUBMEDIA_ID: { type: "number" },
                        DN_KIND: { type: "number" },
                        DN_TYPE: { type: "number" },
                        //OBSERVER_FLAG: { type: "number" }
                        DN_TYPE: { type: "number" },
                        OBSERVER_FLAG: { type: "number" },
                        DN_TYPE: { type: "number" }
                        //,
                        //OBSERVER_FLAG: { type: "number" }
                     }
                  }
               }
            }, // dn
            //20180430 Sam #23757
            _DN_CALL : {
                  COLUMN : [
                     {
                        id: 1, field: "DNSUB_ID", title: "Tenant ID", width: "150px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:##########}"
                     },
                     {
                        id: 2, field: "DN", title: "DN", width: "150px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 3, field: "MEDIA_ID", title: "Media ID", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:##}",
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"1 : call", value:1}                             
                        ]
                     },
                     {
                        id: 4, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:##}",
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"1 : call", value:1}                             
                        ]
                     },
                     {
                        id: 5, field: "DN_KIND", title: "DN Kind", width: "150px",
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
                        id: 6, field: "DN_TYPE", title: "DN Type", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "1 : Normal Phone", value: 1 },
                           { text: "2 : Digital Phone", value: 2 },
                           { text: "3 : Virtual Phone", value: 3 }
                        ]
                     }
                  ],
                  SCHEMA : {
                     model : {
                        id : "DN",
                        fields : {
                           DNSUB_ID: { type: "number" },
                           DN: { type: "string" },
                           MEDIA_ID: { type: "number" },
                           SUBMEDIA_ID: { type: "number" },
                           DN_KIND: { type: "number" },
                           DN_TYPE: { type: "number" },
                           //OBSERVER_FLAG: { type: "number" }
                        }
                     }
                  }
               }, // dn_call
                //20180430 Sam #23757
               _DN_UQ : {
                  COLUMN : [
                     {
                        command: [
                              { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                              { name: "destroy", text: "&nbsp;"}
                            ],
                            locked: true, title: "&nbsp;", width: "97px"

                     },
                     {
                        id: 1, field: "DNSUB_ID", title: "Tenant ID", width: "150px",
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
                        id: 2, field: "DN", title: "DN", width: "150px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 3, field: "MEDIA_ID", title: "Media ID", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:##}",
                        //20180430 Sam #22938
                        values:[
                              {text:"10 : email", value:10},
                              {text:"31 : wchat", value:31}
                        ]
                     },
                     {
                        id: 4, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:##}",
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"10 : email", value:10},
                              {text:"31 : wchat", value:31}
                        ]
                     },
                     {
                        id: 5, field: "DN_KIND", title: "DN Kind", width: "150px",
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
                        id: 6, field: "DN_TYPE", title: "DN Type", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "1 : Normal Phone", value: 1 },
                           { text: "2 : Digital Phone", value: 2 },
                           { text: "3 : Virtual Phone", value: 3 }
                        ]
                      }                    
                  ],
                  SCHEMA : {
                     model : {
                        id : "DN",
                        fields : {
                           DNSUB_ID: { type: "number" },
                           DN: { type: "string" },
                           MEDIA_ID: { type: "number" },
                           SUBMEDIA_ID: { type: "number" },
                           DN_KIND: { type: "number" },
                           DN_TYPE: { type: "number" },
                           CENTER_ID:{type:"number", defaultValue :1},
                           TENANT_ID:{type:"number", defaultValue :10},
                           DNMAJOR_ID:{type:"number", defaultValue :100},
                           //OBSERVER_FLAG: { type: "number" }
                        }
                     }
                  }
               }, // dn_uq
            _QUEUE : {
               COLUMN : [
                  {
                     id: 1, field: "DNSUB_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "QUEUE_ID", title: "Queue", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "QUEUE_NAME", title: "Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "MEDIA_ID", title: "Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 5, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 6, field: "QUEUE_KIND", title: "Kind", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "3 : Queue", value: 3 },
                        { text: "4 : RoutePoint", value: 4 },
                        { text: "5 : Hunt", value: 5 }
                     ]
                  },
                  {
                     id: 7, field: "QUEUE_TYPE", title: "Type", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "1 : Service Queue", value: 1 },
                        { text: "2 : Callback Queue", value: 2 },
                        { text: "3 : Virtual Queue", value: 3 },
                        { text: "4 : Initial VDN", value: 4 }
                     ]
                  },
                  {
                     id: 8, field: "OPTIONS", title: "Options", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 9, field: "QUEUE_MAXTIME", title: "Max Waiting Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:#####}"
                  },
                  {
                     id: 10, field: "QUEUE_SLTIME", title: "Service Time", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:#####}"
                  },
                  {
                     id: 11, field: "LAST_SKILLID", title: "Last Skill ID", width: "120px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:###}"
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "QUEUE_ID",
                     fields : {
                        DNSUB_ID: { type: "number" },
                        QUEUE_ID: { type: "string" },
                        QUEUE_NAME: { type: "string" },
                        MEDIA_ID: { type: "number" },
                        SUBMEDIA_ID: { type: "number" },
                        QUEUE_KIND: { type: "number" },
                        QUEUE_TYPE: { type: "number" },
                        OPTIONS: { type: "string" },
                        QUEUE_MAXTIME: { type: "number" },
                        QUEUE_SLTIME: { type: "number" },
                        LAST_SKILLID: { type: "number" }
                     }
                  }
               }
            }, // queue

             //20180430 Sam #23757
            _QUEUE_CALL : {
                  COLUMN : [
                     {
                        id: 1, field: "DNSUB_ID", title: "Tenant ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 2, field: "QUEUE_ID", title: "Queue", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 3, field: "QUEUE_NAME", title: "Name", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 4, field: "MEDIA_ID", title: "Media ID", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"1 : call", value:1}                             
                        ]
                     },
                     {
                        id: 5, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"1 : call", value:1}                             
                        ]
                     },
                     {
                        id: 6, field: "QUEUE_KIND", title: "Kind", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "3 : Queue", value: 3 },
                           { text: "4 : RoutePoint", value: 4 },
                           { text: "5 : Hunt", value: 5 }
                        ]
                     },
                     {
                        id: 7, field: "QUEUE_TYPE", title: "Type", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "1 : Service Queue", value: 1 },
                           { text: "2 : Callback Queue", value: 2 },
                           { text: "3 : Virtual Queue", value: 3 },
                           { text: "4 : Initial VDN", value: 4 }
                        ]
                     },
                     {
                        id: 8, field: "OPTIONS", title: "Options", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 9, field: "QUEUE_MAXTIME", title: "Max Waiting Time", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:#####}"
                     },
                     {
                        id: 10, field: "QUEUE_SLTIME", title: "Service Time", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:#####}"
                     },
                     {
                        id: 11, field: "LAST_SKILLID", title: "Last Skill ID", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:###}"
                     }
                  ],
                  SCHEMA : {
                     model : {
                        id : "QUEUE_ID",
                        fields : {
                           DNSUB_ID: { type: "number" },
                           QUEUE_ID: { type: "string" },
                           QUEUE_NAME: { type: "string" },
                           MEDIA_ID: { type: "number" },
                           SUBMEDIA_ID: { type: "number" },
                           QUEUE_KIND: { type: "number" },
                           QUEUE_TYPE: { type: "number" },
                           OPTIONS: { type: "string" },
                           QUEUE_MAXTIME: { type: "number" },
                           QUEUE_SLTIME: { type: "number" },
                           LAST_SKILLID: { type: "number" }
                        }
                     }
                  }
               }, // queue_call
             //20180430 Sam #23757
               _QUEUE_UQ : {
                  COLUMN : [
                     {
                        command: [
                              { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                              { name: "destroy", text: "&nbsp;"}
                              ],
                              locked: true, title: "&nbsp;", width: "97px"
                     },   
                     {
                        id: 1, field: "DNSUB_ID", title: "Tenant ID", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 2, field: "QUEUE_ID", title: "Queue", width: "120px",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 3, field: "QUEUE_NAME", title: "Name", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 4, field: "MEDIA_ID", title: "Media ID", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"10 : email", value:10},
                              {text:"31 : wchat", value:31}                             
                        ]
                     },
                     {
                        id: 5, field: "SUBMEDIA_ID", title: "Sub Media ID", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"10 : email", value:10},
                              {text:"31 : wchat", value:31}                             
                        ]
                     },
                     {
                        id: 6, field: "QUEUE_KIND", title: "Kind", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "3 : Queue", value: 3 },
                           { text: "4 : RoutePoint", value: 4 },
                           { text: "5 : Hunt", value: 5 }
                        ]
                     },
                     {
                        id: 7, field: "QUEUE_TYPE", title: "Type", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "1 : Service Queue", value: 1 },
                           { text: "2 : Callback Queue", value: 2 },
                           { text: "3 : Virtual Queue", value: 3 },
                           { text: "4 : Initial VDN", value: 4 }
                        ]
                     },
                     {
                        id: 8, field: "OPTIONS", title: "Options", width: "150px",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 9, field: "QUEUE_MAXTIME", title: "Max Waiting Time", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:#####}"
                     },
                     {
                        id: 10, field: "QUEUE_SLTIME", title: "Service Time", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:#####}"
                     },
                     {
                        id: 11, field: "LAST_SKILLID", title: "Last Skill ID", width: "120px",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        format: "{0:###}"
                     }
                  ],
                  SCHEMA : {
                     model : {
                        id : "QUEUE_ID",
                        fields : {
                           DNSUB_ID: { type: "number" },
                           QUEUE_ID: { type: "string" },
                           QUEUE_NAME: { type: "string" },
                           MEDIA_ID: { type: "number" },
                           SUBMEDIA_ID: { type: "number" },
                           QUEUE_KIND: { type: "number" },
                           QUEUE_TYPE: { type: "number" },
                           OPTIONS: { type: "string" },
                           QUEUE_MAXTIME: { type: "number" },
                           QUEUE_SLTIME: { type: "number" },
                           LAST_SKILLID: { type: "number" }
                        }
                     }
                  }
               }, // queue_uq


            _LOGIN : {
               COLUMN : [
                  {
                     id: 1, field: "MONITOR_FLAG", title: "Is Used", width: "20%",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     values: [
                        { text: "0 : Not Use", value: false },
                        { text: "1 : Used", value: true }
                     ]
                  },
                  {
                     id: 2, field: "MEDIA_ID", title: "Media ID", width: "20%",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 3, field: "LOGIN_ID", title: "Login ID", width: "20%",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 4, field: "CREATE_DATE", title: "Create Date", width: "20%",
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  }
               ],
               SCHEMA : {
                  model : {
                     id : "LOGIN_ID",
                     fields : {
                        MONITOR_FLAG: { type: "boolean" },
                        MEDIA_ID: { type: "number" },
                        LOGIN_ID: { type: "string" },
                        CREATE_DATE: { type: "string" }
                     }
                  }
               }
            }, // login

             //20180430 Sam #23757
            _LOGINID_CALL : {
                  COLUMN : [
                     {
                        id: 1, field: "MONITOR_FLAG", title: "Is Used", width: "20%",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "0 : Not Use", value: false },
                           { text: "1 : Used", value: true }
                        ]
                     },
                     {
                        id: 2, field: "MEDIA_ID", title: "Media ID", width: "20%",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        //20180430 Sam #22938
                        values:[
                              {text:"0 : default",value:0},
                              {text:"1 : call", value:1}                            
                        ]
                     },
                     {
                        id: 3, field: "LOGIN_ID", title: "Login ID", width: "20%",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 4, field: "CREATE_DATE", title: "Create Date", width: "20%",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     }
                  ],
                  SCHEMA : {
                     model : {
                        id : "LOGIN_ID",
                        fields : {
                           MONITOR_FLAG: { type: "boolean" },
                           MEDIA_ID: { type: "number" },
                           LOGIN_ID: { type: "string" },
                           CREATE_DATE: { type: "string" }
                        }
                     }
                  }
               }, // login call
                //20180430 Sam #23757
               _LOGINID_UQ : {
                  COLUMN : [
                    {
                        command: [
                              { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                              { name: "destroy", text: "&nbsp;"}
                            ],
                            locked: true, title: "&nbsp;", width: "97px"
                    },                  
                    {
                        id: 1, field: "MONITOR_FLAG", title: "Is Used", width: "20%",
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values: [
                           { text: "0 : Not Use", value: false },
                           { text: "1 : Used", value: true }
                        ]
                     },
                     {
                        id: 2, field: "MEDIA_ID", title: "Media ID", width: "20%",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" },
                        values:[
                              {text:"0 : default",value:0},
                              {text:"10 : email", value:10},
                              {text:"31 : wchat", value:31}                             
                        ]
                     },
                     {
                        id: 3, field: "LOGIN_ID", title: "Login ID", width: "20%",
                        pk: true,
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     },
                     {
                        id: 4, field: "CREATE_DATE", title: "Create Date", width: "20%",
                        attributes: { "class": "table-cell", style: "text-align: center;" }
                     }
                  ],
                  SCHEMA : {
                     model : {
                        id : "LOGIN_ID",
                        fields : {
                           MONITOR_FLAG: { type: "boolean",editable: false, defaultValue:0 },
                           MEDIA_ID: { type: "number" },
                           LOGIN_ID: { type: "string" },
                           CREATE_DATE: { 
                                 type: "string", 
                                 editable: false, 
                                 defaultValue:
                                    function(){
                                          var date =new Date();
                                          
                                          var yy = date.getFullYear();
                                          var mm = date.getMonth()+1;
                                          var dd = date.getDate();

                                          
                                          if ( mm.toString().length === 1 ) mm = "0" + mm.toString();
                                          if ( dd.toString().length === 1 ) dd = "0" + dd.toString();

                                          return yy+"-"+mm+"-"+dd;
                                    }
                                                               
                              },
                           CENTER_ID: { type: "number", editable: false , defaultValue : 1 }
                        }
                     }
                  }
               }, // login call          

            _SKILL : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "SKILL_ID", title: "Skill ID", width: "20%",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     format: "{0:###}"
                  },
                  {
                     id: 2, field: "SKILL_NAME", title: "Skill Name", width: "20%",
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
                              format: "Please enter only English, numbers and underbar!"
                           }
                        }
                     }
                  },
                  {
                     id: 3, field: "SKILL_DESC", title: "Skill Description",
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
                        SKILL_ID: {
                              type: "number",
                              defaultValue: 0,
                              validation: { required: true, min: 1, max: 512 }
                        },
                        SKILL_NAME: {
                              type: "string",
                        },
                        SKILL_DESC: {
                              type: "string",
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
               }
            }, // skill
            _SKILL_ASSIGN : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "EMPLOYEE_ID", title: "Agent ID", width: "30%",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" }
                  },
                  {
                     id: 2, field: "SKILL_LEVEL", title: "Skill Level", width: "35%",
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
                     id: 3, field: "SKILL_ID", title: "Skill ID", width: "35%",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoDropDownList",
                        options: {
                           required: "Required!",
                           dataTextField: "text",
                           dataValueField: "value",
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
                        },
                        CENTER_ID: {
                              type: "number",
                              defaultValue: 1
                        },
                        TENANT_ID: {
                              type: "number",
                              defaultValue: 10
                        },
                     }
                  }
               }
            }, // skill assign
            _ERMS : {
               COLUMN : [
                  {
                     command: [
                       { name: "edit", text: { edit: "&nbsp;", cancel: "&nbsp;", update: "&nbsp;" } },
                       { name: "destroy", text: "&nbsp;"}
                     ],
                     locked: true, title: "&nbsp;", width: "97px"
                  },
                  {
                     id: 1, field: "TENANT_ID", title: "Tenant ID", width: "120px",
                     pk: true,
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Tenant ID",
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
                     id: 2, field: "TENANT_NAME", title: "Tenant Name", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Tenant Name",
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
                     id: 3, field: "QUEUE_DN", title: "Queue DN", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Queue DN",
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
                     id: 4, field: "EMAIL_SERVICE_NAME", title: "E-Mail Service", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "E-Mail Service",
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
                     id: 5, field: "EMAIL_SERVICE_USER", title: "E-Mail User", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "E-Mail Address",
                           rules: {
                              length: function( input ) {
                                 return input.val().length <= 256;
                              },
                              format: function( input ) {
                                 return _Validation.isEmail(input.val());
                              }
                           },
                           messages: {
                              length: "The maximum length is 256!",
                              format: "Please enter only E-Mail!"
                           }
                        }
                     }
                  },
                  {
                     id: 6, field: "EMAIL_PASSWORD", title: "E-Mail Password", width: "150px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "E-Mail Password",
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
                     id: 7, field: "DESC_TEXT", title: "Description", width: "200px",
                     attributes: { "class": "table-cell", style: "text-align: center;" },
                     onEdit: {
                        component: "kendoValidator",
                        options: {
                           style: "width: 100%",
                           placeholder: "Description",
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
                     id : "TENANT_ID",
                     fields : {
                        TENANT_ID: {
                              type: "string",
                              validation: { required: true }
                        },
                        TENANT_NAME: {
                              type: "string"
                        },
                        QUEUE_DN: {
                              type: "string"
                        },
                        EMAIL_SERVICE_NAME: {
                              type: "string"
                        },
                        EMAIL_SERVICE_USER: {
                              type: "string"
                        },
                        EMAIL_PASSWORD: {
                              type: "string"
                        },
                        DESC_TEXT: {
                              type: "string"
                        }
                     }
                  }
               }
            }, // erms
      };



      /**
       * DEFINE
       */
      var _DEFINE = {
         SIDEBAR : {
            BUTTON_1  : "HOME",
            BUTTON_2  : "RESOURCE",
            BUTTON_3  : "AGENT",
            BUTTON_4  : "AGENT",
            BUTTON_5  : "DN",
            BUTTON_6  : "QUEUE",
            BUTTON_7  : "LOGIN",
            BUTTON_8  : "SKILL",
            BUTTON_9  : "ERMS"
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
               },
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

                  "login" : {
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
                           TXT    : "@=DN",
                           MONITOR: "MONITOR_FLAG"
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
                           TXT    : "@=QUEUE_ID",
                           MONITOR: "MONITOR_FLAG"
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
                     AGENT           : { TITLE : "AGENT" },
                     SUBAGENT        : { TITLE : "SUB-AGENT" },
                     AGENT_ONLY      : { TITLE : "AGENT" },
                     DN              : { TITLE : "DN" },
                     QUEUE           : { TITLE : "QUEUE" },
                     LOGIN           : { TITLE : "LOGIN" },
                     SKILL           : { TITLE : "SKILL" },
                     ASSIGN          : { TITLE : "SKILL ASSIGN" },
                     ERMS            : { TITLE : "ERMS" },

                     TREEVIEW_AGENT  : { TITLE : "AGENT SELECT" },
                     TREEVIEW_DN     : { TITLE : "DN SELECT" },
                     TREEVIEW_QUEUE  : { TITLE : "QUEUE SELECT" }
                  }
               }
            },

            /**
             * ContainerGrid
             */
            CONTAINER_GRID : {
               TOP : {
                  MENU_LIST : {
                     TREEVIEW_AGENT : {
                        TEXT_FIELD : "EMPLOYEE_ID"
                     },
                     TREEVIEW_DN : {
                        TEXT_FIELD : "DN"
                     },
                     TREEVIEW_QUEUE : {
                        TEXT_FIELD : "QUEUE_ID"
                     }
                  }
               },
               BOTTOM : {
                  SELECTED_GRID : {
                     TREEVIEW_AGENT : {
                        PUSH : "agent",
                        DATA : "DBMS_AGENT",
                        COLUMN : _GRID_DEFINE._AGENT_CALL.COLUMN,
                        SCHEMA : _GRID_DEFINE._AGENT_CALL.SCHEMA,
                        EDIT   : false
                     }, // agent
                     TREEVIEW_DN : {
                        PUSH : "dn",
                        DATA : "DBMS_DN",
                        COLUMN : _GRID_DEFINE._DN.COLUMN,
                        SCHEMA : _GRID_DEFINE._DN.SCHEMA,
                        EDIT   : false
                     }, // dn
                     TREEVIEW_QUEUE : {
                        PUSH : "route",
                        DATA : "DBMS_QUEUE",
                        COLUMN : _GRID_DEFINE._QUEUE.COLUMN,
                        SCHEMA : _GRID_DEFINE._QUEUE.SCHEMA,
                        EDIT   : false
                     }, // queue
                  }
               }
            },

            /**
             * ContainerGridAll
             */
            CONTAINER_GRID_ALL : {
               CENTER : {
                  ALL_GRID : {
                     AGENT_CALL_GRID : {
                        PUSH   : "agent",
                        DATA   : "DBMS_AGENT_CALL",
                        COLUMN : _GRID_DEFINE._AGENT_CALL.COLUMN,
                        SCHEMA : _GRID_DEFINE._AGENT_CALL.SCHEMA,
                        EDIT   : false
                     },
                     
                     LOGIN : {
                        PUSH : "loginid",
                        DATA : "DBMS_LOGIN",
                        COLUMN : _GRID_DEFINE._LOGIN.COLUMN,
                        SCHEMA : _GRID_DEFINE._LOGIN.SCHEMA,
                        EDIT   : false
                     }, // login
                     
                     SKILL : {
                        PUSH : "skill",
                        DATA : "DBMS_SKILL",
                        COLUMN : _GRID_DEFINE._SKILL.COLUMN,
                        SCHEMA : _GRID_DEFINE._SKILL.SCHEMA,
                        EDIT   : true
                     }, // skill
                     ERMS : {
                        DATA : "DBMS_ERMS",
                        COLUMN : _GRID_DEFINE._ERMS.COLUMN,
                        SCHEMA : _GRID_DEFINE._ERMS.SCHEMA,
                        EDIT   : true
                     }, // erms
                  }
               }
            },

            /**
             * ContainerGridAgent
             */
            CONTAINER_GRID_AGENT : {
               CENTER : {
                  AGENT_CALL_GRID : {
                     TITLE  : "CALL",
                     PUSH   : "agent",
                     DATA   : "DBMS_AGENT_CALL",
                     COLUMN : _GRID_DEFINE._AGENT_CALL.COLUMN,
                     SCHEMA : _GRID_DEFINE._AGENT_CALL.SCHEMA,
                     EDIT   : false
                  },
                  AGENT_UQ_GRID : {
                     TITLE  : "CHAT / E-MAIL",
                     PUSH   : "agent",
                     DATA   : "DBMS_AGENT_UQ",
                     COLUMN : _GRID_DEFINE._AGENT_UQ.COLUMN,
                     SCHEMA : _GRID_DEFINE._AGENT_UQ.SCHEMA,
                     EDIT   : true
                  }
               }
            },
            
              /** 20180425 Sam #23575
             * ContainerGridLoginId
             */
            CONTAINER_GRID_LOGINID : {
                  CENTER : {
                     LOGINID_CALL_GRID : {
                        TITLE  : "CALL",
                        PUSH   : "login",
                        DATA   : "DBMS_LOGINID_CALL",
                        COLUMN : _GRID_DEFINE._LOGINID_CALL.COLUMN,
                        SCHEMA : _GRID_DEFINE._LOGINID_CALL.SCHEMA,
                        EDIT   : false
                     },
                     LOGINID_UQ_GRID : {
                        TITLE  : "CHAT / E-MAIL",
                        PUSH   : "login",
                        DATA   : "DBMS_LOGINID_UQ",
                        COLUMN : _GRID_DEFINE._LOGINID_UQ.COLUMN,
                        SCHEMA : _GRID_DEFINE._LOGINID_UQ.SCHEMA,
                        EDIT   : true
                     }
                  }
               },
                  /** 20180426 Sam #23575
             * ContainerGridLoginId
             */
            CONTAINER_GRID_DN : {
                  CENTER : {
                     DN_CALL_GRID : {
                        TITLE  : "CALL",
                        PUSH   : "dn",
                        DATA   : "DBMS_DN_CALL",
                        COLUMN : _GRID_DEFINE._DN_CALL.COLUMN,
                        SCHEMA : _GRID_DEFINE._DN_CALL.SCHEMA,
                        EDIT   : false
                     },
                     DN_UQ_GRID : {
                        TITLE  : "CHAT / E-MAIL",
                        PUSH   : "dn",
                        DATA   : "DBMS_DN_UQ",
                        COLUMN : _GRID_DEFINE._DN_UQ.COLUMN,
                        SCHEMA : _GRID_DEFINE._DN_UQ.SCHEMA,
                        EDIT   : true
                     }
                  }
               },
           /** 20180427 Sam #23575
             * ContainerGridQueue
             */
            CONTAINER_GRID_QUEUE : {
                  CENTER : {
                     QUEUE_CALL_GRID : {
                        TITLE  : "CALL",
                        PUSH   : "queue",
                        DATA   : "DBMS_QUEUE_CALL",
                        COLUMN : _GRID_DEFINE._QUEUE_CALL.COLUMN,
                        SCHEMA : _GRID_DEFINE._QUEUE_CALL.SCHEMA,
                        EDIT   : false
                     },
                     QUEUE_UQ_GRID : {
                        TITLE  : "CHAT / E-MAIL",
                        PUSH   : "queue",
                        DATA   : "DBMS_QUEUE_UQ",
                        COLUMN : _GRID_DEFINE._QUEUE_UQ.COLUMN,
                        SCHEMA : _GRID_DEFINE._QUEUE_UQ.SCHEMA,
                        EDIT   : true
                     }
                  }
               },   

            /**
             * ContainerGridSubAgent
             */
            CONTAINER_GRID_SUBAGENT : {
               CENTER : {
                  SUBAGENT_GRID : {
                     PUSH : "subagent",
                     DATA : "DBMS_SUBAGENT",
                     COLUMN : _GRID_DEFINE._SUBAGENT.COLUMN,
                     SCHEMA : _GRID_DEFINE._SUBAGENT.SCHEMA
                  }
               }
            },

            /**
             * ContainerGridSkill
             */
            CONTAINER_GRID_SKILL : {
               LEFT : {
                  SKILL_AGENT_TREEVIEW : {
                     TEXT_FIELD: ["team", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "team",
                           DATA   : "%.shared._master.team",
                           PIN    : "EMPLOYEEPART_ID",
                           TXT    : "@=EMPLOYEEPART_ID [@=EMPLOYEEPART_NAME]",
                           MONITOR: "MONITOR_FLAG"
                        },
                        DEPTH2 : {
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
                     TEXT_FIELD: ["skill", "agent"],
                     BIND : {
                        DEPTH1 : {
                           TAG    : "skill",
                           DATA   : "%.shared._skill",
                           PIN    : "SKILL_ID",
                           TXT    : "@=SKILL_ID [@=SKILL_NAME]"
                        },
                        DEPTH2 : {
                           TAG    : "agent",
                           DATA   : "DBMS_SKILL_ASSIGN",
                           PIN    : "EMPLOYEE_ID",
                           TXT    : "(@=SKILL_LEVEL) @=EMPLOYEE_ID [@=EMPLOYEE_NAME]"
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
   }, 

);
