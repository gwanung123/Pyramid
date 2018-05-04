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

      var _base_path = "/_MANAGEMENT/Contents/";

      var _menu = {
         LOADING            : { TAG : "loading" },
         RESOURCE           : { TAG : "resource", LOCATION : "Resource/resource.html" },
         CONTAINER          : { TAG : "container", LOCATION : "Container/container.html" },
         CONTAINER_GRID     : { TAG : "containerGrid" },
         CONTAINER_GRID_ALL : { TAG : "containerGridAll" },
         CONTAINER_GRID_AGENT    : { TAG : "containerGridAgent" },
         CONTAINER_GRID_LOGINID    : { TAG : "containerGridLoginId" },//20180425 Sam #23757
         CONTAINER_GRID_DN    : { TAG : "containerGridDN" },//20180426 Sam #23757
         CONTAINER_GRID_QUEUE    : { TAG : "containerGridQueue" },//20180427 Sam #23757
         CONTAINER_GRID_SUBAGENT : { TAG : "containerGridSubAgent" },
         CONTAINER_GRID_SKILL    : { TAG : "containerGridSkill" },
         AGENT              : { TAG : "agent" },
         AGENT_ONLY         : { TAG : "agentOnly" },
         DN                 : { TAG : "dn" },
         QUEUE              : { TAG : "queue" },
         LOGIN              : { TAG : "login" },
         SKILL              : { TAG : "skill" },
         ERMS               : { TAG : "erms" }
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

         //20180425 Sam #23757
         "containerGridLoginId" : {
            css      : "nx-containerGridLoginId",
            viewModel: contents.contentsVMs.containerGridLoginId,
            window   : {
                  "viewCenter" : {
                        components : [
                           {
                              TAG   : "LOGINID_CALL_GRID",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridLoginId1",
                              model : modelTemplates.modelContainerGridLoginId1
                           },
                           {
                              TAG   : "LOGINID_UQ_GRID",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridLoginId2",
                              model : modelTemplates.modelContainerGridLoginId2
                           }
                        ],
                        css: "nx-containerGridLoginId-center"
                  }
            }
         },
          //20180426 Sam #23757
          "containerGridDN" : {
            css      : "nx-containerGridDN",
            viewModel: contents.contentsVMs.containerGridDN,
            window   : {
                  "viewCenter" : {
                        components : [
                           {
                              TAG   : "DN_CALL_GRID",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridDN1",
                              model : modelTemplates.modelContainerGridDN1
                           },
                           {
                              TAG   : "DN_UQ_GRID",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridDN2",
                              model : modelTemplates.modelContainerGridDN2
                           }
                        ],
                        css: "nx-containerGridDN-center"
                  }
            }
         },
          //20180427 Sam #23757
          "containerGridQueue" : {
            css      : "nx-containerGridQueue",
            viewModel: contents.contentsVMs.containerGridQueue,
            window   : {
                  "viewCenter" : {
                        components : [
                           {
                              TAG   : "QUEUE_CALL_GRID",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridQueue1",
                              model : modelTemplates.modelContainerGridQueue1
                           },
                           {
                              TAG   : "QUEUE_UQ_GRID",
                              type  : "KENDO.GRID",
                              domID : "nxContainerGridQueue2",
                              model : modelTemplates.modelContainerGridQueue2
                           }
                        ],
                        css: "nx-containerGridQueue-center"
                  }
            }
         },
         "containerGridSubAgent" : {
               css      : "nx-containerGridSubAgent",
               viewModel: contents.contentsVMs.containerGridSubAgent,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "SUBAGENT_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridSubAgent",
                                 model : modelTemplates.modelContainerGridSubAgent
                              }
                           ],
                           css: "nx-containerGridSubAgent-center"
                     }
               }
         },
         "containerGridSkill" : {
               css      : "nx-containerGridSkill",
               viewModel: contents.contentsVMs.containerGridSkill,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "SKILL_AGENT_TREEVIEW",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxContainerGridSkillLeft",
                                 model : modelTemplates.modelContainerGridSkillLeft
                              }
                           ],
                           css: "nx-containerGridSkill-left"
                     },
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "SKILL_SELECTED_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerGridSkillCenter",
                                 model : modelTemplates.modelContainerGridSkillCenter
                              }
                           ],
                           css: "nx-containerGridSkill-center"
                     },
                     "viewRight" : {
                           components : [
                              {
                                 TAG   : "SKILL_SKILL_TREEVIEW",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxContainerGridSkillRight",
                                 model : modelTemplates.modelContainerGridSkillRight
                              }
                           ],
                           css: "nx-containerGridSkill-right"
                     }
               }
         },
         "agent" : {
               parent   : "container",
               title    : "AGENT",
               window   : {
                     "AGENT" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "AGENT_GRID_ALL",
                                 domID   : "nxContainerGridAgent_A",
                                 content : "containerGridAgent",
                                 dbms    : "CONTAINER_GRID_AGENT",
                                 text    : "CONTAINER_GRID_AGENT.CENTER",
                           }
                     },
                     "SUBAGENT" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "SUBAGENT_GRID_ALL",
                                 domID   : "nxContainerGridAgent_A_S",
                                 content : "containerGridSubAgent",
                                 dbms    : "CONTAINER_GRID_SUBAGENT",
                                 text    : "CONTAINER_GRID_SUBAGENT.CENTER.SUBAGENT_GRID",
                           }
                     }
               }
         },
         
         
         "agentOnly" : {
               parent   : "container",
               title    : "AGENT",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "AGENT_GRID_ONLY",
                           domID   : "nxContainerGridAll_A",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID_ALL",
                           text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.AGENT_CALL_GRID",
                     }
               }
         },

         "dn" : {
               parent   : "container",
               title    : "DN",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "DN_GRID_ALL",
                           domID   : "nxContainerGridAll_D",
                           content : "containerGridDN",
                           dbms    : "CONTAINER_GRID_DN",
                           text    : "CONTAINER_GRID_DN.CENTER",
                     }
               }
         },
         /*
         "queue" : {
               parent   : "container",
               title    : "QUEUE",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "QUEUE_GRID_ALL",
                           domID   : "nxContainerGridAll_R",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID",
                           text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_QUEUE",
                     }
               }
         },

         */
         "queue" : {
            parent   : "container",
            title    : "QUEUE",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "QUEUE_GRID_ALL",
                        domID   : "nxContainerGridQueue_R",
                        content : "containerGridQueue",
                        dbms    : "CONTAINER_GRID_QUEUE",
                        text    : "CONTAINER_GRID_QUEUE.CENTER",
                  }
            }
         },
         
         //20180425 Sam #23757

         "login" : {
               parent   : "container",
               title    : "LOGIN",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "LOGIN_GRID_ALL",
                           domID   : "nxContainerGridAll_L",
                           content : "containerGridLoginId",
                           dbms    : "CONTAINER_GRID_LOGINID",
                           text    : "CONTAINER_GRID_LOGINID.CENTER",
                     }
               }
         },
         
         "skill" : {
               parent   : "container",
               title    : "SKILL",
               window   : {
                     "SKILL" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "SKILL_GRID_ALL",
                                 domID   : "nxContainerGridAll_S",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID_ALL",
                                 text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.SKILL",
                           }
                     },
                     "ASSIGN" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 domID   : "nxContainerGridAll_S_A",
                                 content : "containerGridSkill",
                                 "viewLeft" : {
                                       TAG     : "ASSIGN_AGENT_TREEVIEW",
                                       dbms    : "CONTAINER_GRID_SKILL",
                                       text    : "CONTAINER_GRID_SKILL.LEFT.SKILL_AGENT_TREEVIEW",
                                       title   : "AGENT"
                                 },
                                 "viewCenter" : {
                                       TAG     : "ASSIGN_GRID",
                                       dbms    : "CONTAINER_GRID_SKILL",
                                       text    : "CONTAINER_GRID_SKILL.CENTER.SKILL_SELECTED_GRID",
                                       title   : "SKILL INFORMATION DETAIL"
                                 },
                                 "viewRight" : {
                                       TAG     : "ASSIGN_SKILL_TREEVIEW",
                                       dbms    : "CONTAINER_GRID_SKILL",
                                       text    : "CONTAINER_GRID_SKILL.RIGHT.SKILL_SKILL_TREEVIEW",
                                       title   : "SKILL"
                                 }
                           }
                     }
               }
         },
         "erms" : {
               parent   : "container",
               title    : "ERMS",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "ERMS_GRID_ALL",
                           domID   : "nxContainerGridAll_E",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID_ALL",
                           text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.ERMS",
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


