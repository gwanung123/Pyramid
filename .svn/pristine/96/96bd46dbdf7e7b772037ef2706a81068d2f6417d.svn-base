'use strict';

define([
      "Contents/contents",
      "Contents/contents.templates",
      "Contents/contents.templates.model",
      "Containers/model/modelLoading"
   ],
   function( contents, templates, modelTemplates, modelLoading ) {

      /***********************************************************
       * name        : Define
       * url         : /
       * description :
       ************************************************************/

      var _base_path = "/_KMS/Contents/";

      var _menu = {
         LOADING            : { TAG : "loading" },
         RESOURCE           : { TAG : "resource", LOCATION : "Resource/resource.html" },
         CONTAINER          : { TAG : "container", LOCATION : "Container/container.html" },
         CONTAINER_GRID     : { TAG : "containerGrid" },
         CONTAINER_GRID_ALL : { TAG : "containerGridAll" },
         
         CONTAINER_GRID_AGENT    : { TAG : "containerGridAgent" },
         CONTAINER_GRID_SUBAGENT : { TAG : "containerGridSubAgent" },
         CONTAINER_GRID_SKILL    : { TAG : "containerGridSkill" },
      //    AGENT              : { TAG : "agent" },
      //    AGENT_ONLY         : { TAG : "agentOnly" },
      //    DN                 : { TAG : "dn" },
      //    QUEUE              : { TAG : "queue" },
      //    LOGIN              : { TAG : "login" },
      //    SKILL              : { TAG : "skill" },
      //    ERMS               : { TAG : "erms" },

         MAJOR              : { TAG : "major" },
         SUB                : { TAG : "sub" },
         MANAGE             : { TAG : "manage" },
         STAT               : { TAG : "stat" },



      };

      var _define = {
         "loading" : [
               {
                  tag   : "MEDIA",
                  model : modelLoading.modelLoading_media,
                  shared: "_media"
               },
               {
                  tag   : "LOGIN",
                  model : modelLoading.modelLoading_login,
                  shared: "_login"
               },
               {
                  tag   : "SKILL",
                  model : modelLoading.modelLoading_skill,
                  shared: "_skill"
               }
         ],

         "resource" : {
               parent   : "nx-contents",
               title    : "RESOURCE",
               content  : _base_path + _menu.RESOURCE.LOCATION,
               view     : contents.contentsVs.resource,
               viewModel: contents.contentsVMs.resource,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "TREEVIEW_AGENT",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewAgent",
                                 model : modelTemplates.modelResourceLeft_agent,
                                 push  : ["master"]
                              },
                              {
                                 TAG   : "TREEVIEW_DN",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewDn",
                                 model : modelTemplates.modelResourceLeft_dn,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_QUEUE",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewQueue",
                                 model : modelTemplates.modelResourceLeft_queue,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                           ],
                           parent: "nx-contents-resource-left",
                           view  : templates.templatesVs.viewResourceLeft,
                           viewModel : templates.templatesVMs.viewResourceLeft
                     }
               }
         },
         "container" : {
               parent   : "nx-contents",
               title    : "CONTAINER",
               windowID : "nx-contents-div-" + _menu.CONTAINER.TAG,
               content  : _base_path + _menu.CONTAINER.LOCATION,
               view     : contents.contentsVs.container,
               viewModel: contents.contentsVMs.container,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "TABSTRIP",
                                 type  : "KENDO.TABSTRIP",
                                 domID : "nxContainer",
                                 model : modelTemplates.modelContainerCenter,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT",
                                          "resource.viewLeft.TREEVIEW_DN",
                                          "resource.viewLeft.TREEVIEW_QUEUE"],
                                 joinBind : {
                                    TREEVIEW_AGENT  : {
                                       TAG     : "AGENT_GRID",
                                       domID   : "nxContainerGridAgent",
                                       content : "containerGrid",
                                    },
                                    TREEVIEW_DN : {
                                       TAG     : "DN_GRID",
                                       domID   : "nxContainerGridDN",
                                       content : "containerGrid",
                                    },
                                    TREEVIEW_QUEUE : {
                                       TAG     : "QUEUE_GRID",
                                       domID   : "nxContainerGridQueue",
                                       content : "containerGrid",
                                    }
                                 }
                              }
                           ],
                           parent: "nx-contents-container-center",
                           view  : templates.templatesVs.viewContainerCenter,
                           viewModel : templates.templatesVMs.viewContainerCenter
                     }
               }
         },

         "containerGrid" : {
               css      : "nx-containerGrid",
               viewModel: contents.contentsVMs.containerGrid,
               window   : {
                     "viewTop" : {
                           components : [
                              {
                                 TAG   : "MENU_LIST",
                                 type  : "KENDO.MENU",
                                 domID : "nxContainerGridTop",
                                 model : modelTemplates.modelContainerGridTop
                              }
                           ],
                           css: "nx-containerGrid-top"
                     },
                     "viewBottom" : {
                           components : [
                              {
                                 TAG   : "SELECTED_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridBottom",
                                 model : modelTemplates.modelContainerGridBottom
                              }
                           ],
                           css: "nx-containerGrid-bottom"
                     }
               }
         },

         "containerGridAll" : {
               css      : "nx-containerGridAll",
               viewModel: contents.contentsVMs.containerGridAll,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "ALL_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridAllCenter",
                                 model : modelTemplates.modelContainerGridAllCenter
                              }
                           ],
                           css: "nx-containerGridAll-center"
                     }
               }
         },

         "containerGridAgent" : {
               css      : "nx-containerGridAgent",
               viewModel: contents.contentsVMs.containerGridAgent,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "AGENT_CALL_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridAgent1",
                                 model : modelTemplates.modelContainerGridAgent1
                              },
                              {
                                 TAG   : "AGENT_UQ_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridAgent2",
                                 model : modelTemplates.modelContainerGridAgent2
                              }
                           ],
                           css: "nx-containerGridAgent-center"
                     }
               }
         },

      //    "containerGridSubAgent" : {
      //          css      : "nx-containerGridSubAgent",
      //          viewModel: contents.contentsVMs.containerGridSubAgent,
      //          window   : {
      //                "viewCenter" : {
      //                      components : [
      //                         {
      //                            TAG   : "SUBAGENT_GRID",
      //                            type  : "KENDO.GRID",
      //                            domID : "nxContainerGridSubAgent",
      //                            model : modelTemplates.modelContainerGridSubAgent
      //                         }
      //                      ],
      //                      css: "nx-containerGridSubAgent-center"
      //                }
      //          }
      //    },

      //    "containerGridSkill" : {
      //          css      : "nx-containerGridSkill",
      //          viewModel: contents.contentsVMs.containerGridSkill,
      //          window   : {
      //                "viewLeft" : {
      //                      components : [
      //                         {
      //                            TAG   : "SKILL_AGENT_TREEVIEW",
      //                            type  : "KENDO.TREEVIEW",
      //                            domID : "nxContainerGridSkillLeft",
      //                            model : modelTemplates.modelContainerGridSkillLeft
      //                         }
      //                      ],
      //                      css: "nx-containerGridSkill-left"
      //                },
      //                "viewCenter" : {
      //                      components : [
      //                         {
      //                            TAG   : "SKILL_SELECTED_GRID",
      //                            type  : "KENDO.GRID",
      //                            domID : "nxContainerGridSkillCenter",
      //                            model : modelTemplates.modelContainerGridSkillCenter
      //                         }
      //                      ],
      //                      css: "nx-containerGridSkill-center"
      //                },
      //                "viewRight" : {
      //                      components : [
      //                         {
      //                            TAG   : "SKILL_SKILL_TREEVIEW",
      //                            type  : "KENDO.TREEVIEW",
      //                            domID : "nxContainerGridSkillRight",
      //                            model : modelTemplates.modelContainerGridSkillRight
      //                         }
      //                      ],
      //                      css: "nx-containerGridSkill-right"
      //                }
      //          }
      //    },

        
         "major" :{
            parent      : "container",
            title       : "MAJOR",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "ERMS_GRID_ALL",
                        domID   : "nxContainerGridAll_E",
                        content : "containerGridAll",
                        dbms    : "CONTAINER_GRID_ALL",
                        text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.MAJOR",
                  }
            }
         },

         "sub" :{
            parent      : "container",
            title       : "SUB",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "ERMS_GRID_ALL",
                        domID   : "nxContainerGridAll_E",
                        content : "containerGridAll",
                        dbms    : "CONTAINER_GRID_ALL",
                        text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.SUB",
                  }
            }

         },

         "manage" :{
            parent      : "container",
            title       : "MANAGE",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "ERMS_GRID_ALL",
                        domID   : "nxContainerGridAll_E",
                        content : "containerGridAll",
                        dbms    : "CONTAINER_GRID_ALL",
                        text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.MANAGE",
                  }
            }

         },

         "stat" :{
            parent      : "container",
            title       : "STAT",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "ERMS_GRID_ALL",
                        domID   : "nxContainerGridAll_E",
                        content : "containerGridAll",
                        dbms    : "CONTAINER_GRID_ALL",
                        text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.STAT",
                  }
            }

         },

        
      }; // end of _define



      var method = {
         MENU : _menu,
         getComponent : function( rootComponent, propName ) {
            if ( rootComponent === undefined ) return _define;
            if ( _define[rootComponent] === undefined ) return null;
            if ( propName === undefined ) return _define[rootComponent];
            return _define[rootComponent][propName];
         },
         getComponentView : function( rootComponent ) {
            return _define[rootComponent]["view"];
         },
         getComponentChild : function( rootComponent, tag ) {
            return _define[rootComponent]["window"][tag];
         }
      };


      return method;
   }
);


