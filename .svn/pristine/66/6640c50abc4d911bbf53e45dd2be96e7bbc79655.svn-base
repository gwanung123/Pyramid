'use strict';

define(["Contents/contents", "Contents/sub/templates", "Contents/sub/models/modelTemplates"],
   function( contents, templates, modelTemplates ) {

      /***********************************************************
       * name        : interaction  define
       * url         : /
       * description :
       ************************************************************/

      var _ROUTE = {
            INTER_HOME :{KIND: "interactionHome",LOCATION: "#/r_ihome" },
            INTER_CALL :{KIND: "interactionCall",LOCATION: "#/r_icall" },
            INTER_MAIL :{KIND: "interactionMail",LOCATION: "#/r_imail" },
            INTER_CHAT :{KIND: "interactionChat",LOCATION: "#/r_ichat" },
            INTER_HISTORY :{KIND: "interactionHistory",LOCATION: "#/r_ihis" }
      };

      var _define = {
            "interactionHome" : {
                  TAG :"HOME",
                  location : _ROUTE.INTER_HOME.LOCATION,
                  parent   : "nx-contents",
                  view     : contents.contentsVs.interactionHome,
                  viewModel: contents.contentsVMs.interactionHome,
                  children :{
                        "main" : {
                              components : [
                                    {
                                          title : "INTERHOME.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxHomeGrid",
                                          model : modelTemplates.interGrid
                                    }

                              ],
                              parent: "nx-contents-interaction-main",
                              view  : templates.templatesVs.viewMainHome,
                              viewModel : templates.templatesVMs.viewMainHome
                        } // main


                  } // children

            },
            "interactionCall" : {
                  TAG :"INTER_CALL",
                  location : _ROUTE.INTER_CALL.LOCATION,
                  parent   : "nx-contents",
                  view     : contents.contentsVs.interactionCall,
                  viewModel: contents.contentsVMs.interactionCall,
                  children : {

                        "left" : {
                              components : [
                                    {
                                          title : "CALLBACK.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxHomeGrid",
                                          model : modelTemplates.OutboundGrid
                                    },
                                    {
                                          title : "RECONTACT.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxRecontactGrid",
                                          model : modelTemplates.OutboundGrid
                                    },
                                    {
                                          title : "CAMPAIGN.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxCampGrid",
                                          model : modelTemplates.OutboundGrid
                                    },
                                    {
                                          title : "CRM.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxCRMGrid",
                                          model : modelTemplates.OutboundGrid
                                    }
                              ],
                              parent: "nx-contents-interaction-call-left",
                              view  : templates.templatesVs.viewLeftCall,
                              viewModel : templates.templatesVMs.viewLeftCall
                        },
                        "main" : {
                              components : [],
                              parent: "nx-contents-interactioncall",
                              view  : templates.templatesVs.viewMainCall,
                              viewModel : templates.templatesVMs.viewMainCall
                        },
                        "right" : {
                              components : [
                                    {
                                          title : "INTERCALL.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxCustomerGrid",
                                          model : modelTemplates.interGrid
                                    },
                                    {
                                          title : "KMS.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxKmsGrid",
                                          model : modelTemplates.KMSGrid
                                    }

                              ],
                              parent: "nx-contents-interaction-right",
                              view  : templates.templatesVs.viewRight,
                              viewModel : templates.templatesVMs.viewRight
                        }


                  }//children


            },
            "interactionMail" : {
                  TAG :"INTER_MAIL",
                  location : _ROUTE.INTER_MAIL.LOCATION,
                  parent   : "nx-contents",
                  view     : contents.contentsVs.interactionMail,
                  viewModel: contents.contentsVMs.interactionMail,
                  children : {

                        "left" : {
                              components : [
                                    {
                                          title : "INTERCHAT.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxChatListGrid",
                                          model : modelTemplates.chatListGrid

                                    }

                              ],
                              parent: "nx-contents-interaction-mail-left",
                              view  : templates.templatesVs.viewLeftMail,
                              viewModel : templates.templatesVMs.viewLeftMail
                        },
                        "main" : {
                              components : [],
                              parent: "nx-contents-interaction-mail-main",
                              view  : templates.templatesVs.viewMainMail,
                              viewModel : templates.templatesVMs.viewMainMail
                        },
                        "right" : {
                              components : [
                                    {
                                          title : "INTERCALL.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxCustomerGrid",
                                          model : modelTemplates.interGrid
                                    },
                                    {
                                          title : "KMS.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxKmsGrid",
                                          model : modelTemplates.KMSGrid
                                    }


                              ],
                              parent: "nx-contents-interaction-right",
                              view  : templates.templatesVs.viewRight,
                              viewModel : templates.templatesVMs.viewRight
                        }

                  }//children

            },
            "interactionChat" :{
                  TAG :"INTER_CHAT",
                  location : _ROUTE.INTER_CHAT.LOCATION,
                  parent   : "nx-contents",
                  view     : contents.contentsVs.interactionChat,
                  viewModel: contents.contentsVMs.interactionChat,
                  children :{
                        "left" : {
                              components : [
                                    {
                                          title : "INTERCHAT.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxChatListGrid",
                                          model : modelTemplates.chatListGrid

                                    }
                              ],
                              parent: "x-contents-interaction-left",
                              view  : templates.templatesVs.viewLeftChat,
                              viewModel : templates.templatesVMs.viewLeftChat
                        },
                        "main" : {
                              components : [],
                              parent: "nx-contents-interaction-main",
                              view  : templates.templatesVs.viewMainChat,
                              viewModel : templates.templatesVMs.viewMainChat
                        },
                        "right" : {
                              components : [
                                    {
                                          title : "INTERCALL.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxCustomerGrid",
                                          model : modelTemplates.interGrid
                                    },
                                    {
                                          title : "KMS.GRID",
                                          type  : "KENDO.GRID",
                                          domID : "nxKmsGrid",
                                          model : modelTemplates.KMSGrid
                                    }
                              ],
                              parent: "nx-contents-interaction-right",
                              view  : templates.templatesVs.viewRight,
                              viewModel : templates.templatesVMs.viewRight
                        }
                  }


            },
            "interactionHistory" : {
                  TAG :"INTER_HISTORY",
                  location : _ROUTE.INTER_HISTORY.LOCATION,
                  parent   : "nx-contents",
                  view     : contents.contentsVs.interactionHistory,
                  viewModel: contents.contentsVMs.interactionHistory,
                  children :{
                        "main" : {
                              components : [
                                    // {
                                    //       title : "INTERHOME.GRID",
                                    //       type  : "KENDO.GRID",
                                    //       domID : "nxHomeGrid",
                                    //       model : modelTemplates.interGrid
                                    // }

                              ],
                              parent: "nx-contents-interactionhistory-main",
                              view  : templates.templatesVs.viewMainHistory,
                              viewModel : templates.templatesVMs.viewMainHistory
                        } // main

                  } // children

            }
      
      };// end of _define


      var method = {
         ENUM : {
            ROUTE : _ROUTE
         },
         getComponent : function( rootComponent, propName ) {
            if ( rootComponent === undefined ) return _define;
            else {
               if ( propName === undefined ) return _define[rootComponent];
               else return _define[rootComponent][propName];
            }
         },
         getComponentView : function( rootComponent ) {
            return _define[rootComponent]["view"];
         },
         getComponentChild : function( rootComponent, tag ) {
            return _define[rootComponent]["children"][tag];
         },
         getComponentType : function( rootComponent, tag ) {
            return _define[rootComponent]["children"][tag]["ctype"];
         }
      };


      return method;
   }
);


