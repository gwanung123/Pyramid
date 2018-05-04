'use strict';

define([],
   function() {

      /***********************************************************
       * name        : field.en
       * url         : Defines/language/field.en.js
       * description :
       ************************************************************/

      var define = {
         SIDEBAR : {
            BUTTON_MONITOR_1_TITLE : "HOME",
            BUTTON_MONITOR_2_TITLE : "AGENT",
            BUTTON_MONITOR_3_TITLE : "QUEUE",
            BUTTON_MONITOR_4_TITLE : "QUEUE(ACD) / AGENT",
            BUTTON_MONITOR_5_TITLE : "QUEUE / AGENT",
            BUTTON_MONITOR_6_TITLE : "USER DEFINE",
            BUTTON_MONITOR_7_TITLE : "PERSONAL BOARD"
         },
         CONTENTS : {
            /**
             * queue
             */
            INTERACTION : {
               HEADER : {
                  LOGIN : {
                     SELECT_LOGON  : "LOG ON",
                     SELECT_READY  : "READY",
                     SELECT_NOTREADY  : "NOTREADY",
                     SELECT_ACW  : "AFTER CALL",
                     SELECT_LOGOUT : "LOG OUT"
                  },
                  STATS : {
                     TEXT_CALL_HELP : "CALL HELP",
                     TEXT_MAIL_HELP : "MAIL HELP",
                     TEXT_CHAT_HELP : "CHAT HELP"
                  }
               },
              
               LEFT : {
                CALLBACK :{
                 GRID :[
                   { field: "NAME",  title: "Customer"     },
                   { field: "PHONE",  title: "Number"     },
                   { field: "REG_DATE",  title: "date"     },
               
                 ]
                },

                RECONTACT :{
                  GRID :[
                    { field: "NAME",  title: "Customer"     },
                    { field: "PHONE",  title: "Number"     },
                    { field: "REG_DATE",  title: "date"     },
                
                  ]
                 },

                 CAMPAIGN :{
                  GRID :[
                    { field: "NAME",  title: "Customer"     },
                    { field: "PHONE",  title: "Number"     },
                    { field: "REG_DATE",  title: "date"     },
                
                  ]
                 },
                 CRM :{
                   GRID :[
                    { field: "NAME",  title: "Customer"     },
                    { field: "PHONE",  title: "Number"     },
                    { field: "REG_DATE",  title: "date"     },
                   ]
                 },


                INTERCHAT : {
                  GRID :[
                    { field: "ANI",  title: "Customer info"     },
                    { field: "EVENT_STARTTIME",  title: "Time" },
                   
                  ]

                }

              },


               RIGHT : {
                INTERCALL :{
                  GRID :[
                    { field: "EVENT_STARTTIME",  title: "Time"     },
                    { field: "CALL_KIND",  title: "Kind"     },
                    { field: "CALL_TYPE",  title: "Type"     },
                    { field: "QUEUE_ID",  title: "Queue"     },
                  
                  ]
                 },
                 INTERCHAT :{
                  GRID :[
                    { field: "EVENT_STARTTIME",  title: "Time"     },
                    { field: "CALL_KIND",  title: "Kind"     },
                    { field: "CALL_TYPE",  title: "Type"     },
                    { field: "QUEUE_ID",  title: "Queue"     },
                  
                  ]
                 },
                 INTERMAIL :{
                  GRID :[
                    { field: "EVENT_STARTTIME",  title: "Time"     },
                    { field: "CALL_KIND",  title: "Kind"     },
                    { field: "CALL_TYPE",  title: "Type"     },
                    { field: "QUEUE_ID",  title: "Queue"     },
                  
                  ]
                 },
                 KMS :{
                  GRID :[
                    { field: "MAJOR_NAME",  title: "Major"     },
                    { field: "SUB_NAME",  title: "Sub"     },

                    { field: "KMS_TITLE",  title: "Title"     },
                    // { field: "KMS_CONTENTS",  title: "Contents"     }
                 
                  ]

                 }

               },

               MAIN : {
                  INTERHOME :{
                    GRID :[
                      /*
                      { field: "QUEUE_NAME",  title: "Task"     },
                      { field: "qcall_count",  title: "CALL "     },
                      
                      { field: "abandonqcall_count",   title: "Abandon"   },
                      { field: "directcall_count",   title: "Direct"   },
                      */

                     { field: "CALL_KIND",  title: "Kind"     },
                     { field: "SKILL_NAME",  title: "Task "     },
                     { field: "answer_count",  title: "Answer"     },
                     { field: "abandon_count",  title: "Abandon "     }
                   
                    
                    ]
                  },
                  QUEUE : {
                     GRID1 : [
                        { id: 1, field: "TENANT_ID", title: "Tenant ID", locked: true, width: 70, pk: true },
                        { id: 2, field: "ROUTE_ID", title: "Route ID", locked: true, width: 70, pk: true,
                          sortable: { initialDirection: "desc" }
                        },
                        { id: 3, field: "ENTER", title: "enter", width: 70 },
                        { id: 4, field: "DISTRIBUTE", title: "distribute", width: 70 },
                        { id: 5, field: "ANSWER", title: "answer", width: 70 },
                        /*
                        { id: 6, field: "ABANDON", title: "abandon", width: 70 },
                        { id: 7, field: "NONSERVICE", title: "nonservice", width: 70 },
                        { id: 8, field: "FAIL_CALL", title: "fail", width: 70 },
                        { id: 9, field: "TRANSFER", title: "transfer", width: 70 },
                        { id: 10, field: "CALLBACK", title: "callback", width: 70 },
                        { id: 11, field: "TO_CENTER", title: "to center", width: 70 },
                        { id: 12, field: "TO_CENTER_FAIL", title: "to center fail", width: 70 },
                        { id: 13, field: "FROM_CENTER", title: "from center", width: 70 },
                        { id: 14, field: "ENTER_SYS", title: "enter sys", width: 70 },
                        { id: 15, field: "EXTENAL", title: "external", width: 70 },
                        { id: 16, field: "REENTRY", title: "reentry", width: 70 },
                        { id: 17, field: "REENTRY_ABANDON", title: "reentry abandon", width: 70 },
                        { id: 18, field: "EXP_DISTRIBUTE", title: "exp distribute", width: 70 },
                        { id: 19, field: "EXP_ABANDON", title: "exp abandon", width: 70 },
                        { id: 20, field: "GROUP_TRANSFER", title: "group transfer", width: 70 },
                        { id: 21, field: "GROUP_TRANSFER_ANSWER", title: "group transfer answer", width: 70 },
                        { id: 22, field: "GROUP_TRANSFER_DISTRIBUTE", title: "group transfer distribute", width: 70 },
                        { id: 23, field: "GROUP_TRANSFER_ABANDON", title: "group transfer abandon", width: 70 },
                        { id: 24, field: "GROUP_TRANSFER_NONSERVICE", title: "group transfer nonservice", width: 70 },
                        { id: 25, field: "GROUP_TRANSFER_FAIL", title: "group transfer fail", width: 70 },
                        { id: 26, field: "GROUP_TRANSFER_EXP_DT", title: "group transfer expdt", width: 70 },
                        { id: 27, field: "GROUP_TRANSFER_EXP_AB", title: "group transfer expab", width: 70 },
                        { id: 28, field: "GROUP_TRANSFER_TR", title: "group transfer tr", width: 70 },
                        */
                        { id: 29, field: "WAIT_NO", title: "wait call", width: 70 }
                     ],
                     GRID2 : [
                        //{ id: 1, field: "TENANT_ID", title: "Tenant ID", locked: true, width: 70, pk: true },
                        { id: 2, field: "GROUP_ID", title: "Group ID", locked: true, width: 70, pk: true },
                        { id: 3, field: "TEAM_ID", title: "Team ID", locked: true, width: 70, pk: true },
                        { id: 4, field: "AGENT_ID", title: "Employee ID", locked: true, width: 70, pk: true },
                        { id: 5, field: "AGENT_MODE", title: "agent mode", locked: true, width: 70 },
                        { id: 6, field: "AGENT_TIME", title: "agent time", locked: true, width: 70 },
                        { id: 7, field: "INBOUND_COUNT", title: "ib cnt", width: 70 },
                        { id: 8, field: "INBOUND_TIME", title: "ib time", width: 70 },
                        { id: 9, field: "OUTBOUND_COUNT", title: "ob cnt", width: 70 },
                        { id: 10, field: "OUTBOUND_TIME", title: "ob time", width: 70 },
                        /*
                        { id: 11, field: "SEND_INTERNAL_COUNT", title: "in send cnt", width: 70 },
                        { id: 12, field: "SEND_INTERNAL_TIME", title: "in send time", width: 70 },
                        { id: 13, field: "RECV_INTERNAL_COUNT", title: "in recv cnt", width: 70 },
                        { id: 14, field: "RECV_INTERNAL_TIME", title: "in recv time", width: 70 },
                        { id: 15, field: "SEND_CONSULT_COUNT", title: "co send cnt", width: 70 },
                        { id: 16, field: "SEND_CONSULT_TIME", title: "co send time", width: 70 },
                        { id: 17, field: "RECV_CONSULT_COUNT", title: "co recv cnt", width: 70 },
                        { id: 18, field: "RECV_CONSULT_TIME", title: "co recv time", width: 70 },
                        { id: 19, field: "SEND_TRANSFER_COUNT", title: "tr send cnt", width: 70 },
                        { id: 20, field: "SEND_TRANSFER_TIME", title: "tr send time", width: 70 },
                        { id: 21, field: "RECV_TRANSFER_COUNT", title: "tr recv cnt", width: 70 },
                        { id: 22, field: "RECV_TRANSFER_TIME", title: "tr recv time", width: 70 },
                        { id: 23, field: "SEND_CONFERENCE_COUNT", title: "cf send cnt", width: 70 },
                        { id: 24, field: "SEND_CONFERENCE_TIME", title: "cf send time", width: 70 },
                        { id: 25, field: "RECV_CONFERENCE_COUNT", title: "cf recv cnt", width: 70 },
                        { id: 26, field: "RECV_CONFERENCE_TIME", title: "cf recv time", width: 70 },
                        { id: 27, field: "HOLD_COUNT", title: "hold cnt", width: 70 },
                        { id: 28, field: "HOLD_TIME", title: "hold time", width: 70 },
                        { id: 29, field: "OBSERVATION_COUNT", title: "ob cnt", width: 70 },
                        { id: 30, field: "OBSERVATION_TIME", title: "ob time", width: 70 },
                        { id: 31, field: "INBOUND_DID_COUNT", title: "ib did cnt", width: 70 },
                        { id: 32, field: "INBOUND_DID_TIME", title: "ib did time", width: 70 },
                        { id: 33, field: "OUTBOUND_DOD_COUNT", title: "ob dod cnt", width: 70 },
                        { id: 34, field: "OUTBOUND_DOD_TIME", title: "ob dod time", width: 70 },
                        { id: 35, field: "QUEUE_IB_COUNT", title: "queue cnt", width: 70 },
                        { id: 36, field: "QUEUE_IB_TIME", title: "queue time", width: 70 },
                        { id: 37, field: "SEND_GROUPTRANSFER_COUNT", title: "group tr send cnt", width: 70 },
                        { id: 38, field: "SEND_GROUPTRANSFER_TIME", title: "group tr send time", width: 70 },
                        { id: 39, field: "RECV_GROUPTRANSFER_COUNT", title: "group tr recv cnt", width: 70 },
                        { id: 40, field: "RECV_GROUPTRANSFER_TIME", title: "group tr recv time", width: 70 },
                        */
                        { id: 41, field: "READY_COUNT", title: "ready cnt", width: 70 },
                        { id: 42, field: "READY_TIME", title: "ready time", width: 70 },
                        { id: 43, field: "NOTREADY_COUNT", title: "notready cnt", width: 70 },
                        { id: 44, field: "NOTREADY_TIME", title: "notready time", width: 70 },
                        { id: 45, field: "ACW_COUNT", title: "acw cnt", width: 70 },
                        { id: 46, field: "ACW_TIME", title: "acw time", width: 70 },
                        { id: 47, field: "OTHERWORK_COUNT", title: "otherwork cnt", width: 70 },
                        { id: 48, field: "OTHERWORK_TIME", title: "otherwork time", width: 70 }
                     ]
                  }
               }
            }
         },
         COMMENT : {
         }
      }; //end of define


      return define;
   }
);
