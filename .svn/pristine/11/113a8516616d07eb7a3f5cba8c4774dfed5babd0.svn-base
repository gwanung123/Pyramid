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

      var _base_path = "/_MASTER/Contents/";

      var _menu = {
         LOADING            : { TAG : "loading" },
         RESOURCE           : { TAG : "resource", LOCATION : "Resource/resource.html" },
         CONTAINER          : { TAG : "container", LOCATION : "Container/container.html" },
         CONTAINER_GRID     : { TAG : "containerGrid" },
         CONTAINER_GRID_ALL : { TAG : "containerGridAll" },
         CONTAINER_GRID_SKILL : { TAG : "containerGridSkill" },
         CONTAINER_SCENARIO : { TAG : "containerScenario" },
         CENTER             : { TAG : "center" },
         TENANT             : { TAG : "tenant" },
         AGENT              : { TAG : "agent" },
         DN                 : { TAG : "dn" },
         ROUTE              : { TAG : "route" },
         LOGIN              : { TAG : "login" },
         SKILL              : { TAG : "skill" },
         SCENARIO           : { TAG : "scenario" },
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
                                 TAG   : "TREEVIEW_TENANT",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewTenant",
                                 model : modelTemplates.modelResourceLeft_tenant,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_GROUP",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewGroup",
                                 model : modelTemplates.modelResourceLeft_group,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_TEAM",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewTeam",
                                 model : modelTemplates.modelResourceLeft_team,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_DN",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewDn",
                                 model : modelTemplates.modelResourceLeft_dn,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_ROUTE",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewRoute",
                                 model : modelTemplates.modelResourceLeft_route,
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              },
                              {
                                 TAG   : "TREEVIEW_SCENARIO",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewScenario",
                                 model : modelTemplates.modelResourceLeft_scenario,
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
                                 join  : ["resource.viewLeft.TREEVIEW_TENANT",
                                          "resource.viewLeft.TREEVIEW_GROUP",
                                          "resource.viewLeft.TREEVIEW_TEAM",
                                          "resource.viewLeft.TREEVIEW_AGENT",
                                          "resource.viewLeft.TREEVIEW_DN",
                                          "resource.viewLeft.TREEVIEW_ROUTE"],
                                 joinBind : {
                                    TREEVIEW_TENANT : {
                                       TAG     : "TENANT_GRID",
                                       domID   : "nxContainerGridTenant",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_GROUP  : {
                                       TAG     : "GROUP_GRID",
                                       domID   : "nxContainerGridGroup",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_TEAM   : {
                                       TAG     : "TEAM_GRID",
                                       domID   : "nxContainerGridTeam",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_AGENT  : {
                                       TAG     : "AGENT_GRID",
                                       domID   : "nxContainerGridAgent",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_DN : {
                                       TAG     : "DN_GRID",
                                       domID   : "nxContainerGridDN",
                                       content : "containerGrid"
                                    },
                                    TREEVIEW_ROUTE : {
                                       TAG     : "ROUTE_GRID",
                                       domID   : "nxContainerGridRoute",
                                       content : "containerGrid"
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
         "containerScenario" : {
               css      : "nx-containerScenario",
               viewModel: contents.contentsVMs.containerScenario,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "SCENARIO_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerScenario",
                                 model : modelTemplates.modelContainerScenario
                              }
                           ],
                           css: "nx-containerScenario-center"
                     }
               }
         },
         "center" : {
               parent   : "container",
               title    : "CENTER",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "CENTER_GRID_ALL",
                           domID   : "nxContainerGridAll_C",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID_ALL",
                           text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.CENTER"
                     }
               }
         },
         "tenant" : {
               parent   : "container",
               title    : "TENANT",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "TENANT_GRID_ALL",
                           domID   : "nxContainerGridAll_T",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID",
                           text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_TENANT"
                     }
               }
         },
         "agent" : {
               parent   : "container",
               title    : "AGENT",
               window   : {
                     "GROUP" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "GROUP_GRID_ALL",
                                 domID   : "nxContainerGridAll_A_G",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID",
                                 text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_GROUP"
                           }
                     },
                     "TEAM" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "TEAM_GRID_ALL",
                                 domID   : "nxContainerGridAll_A_T",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID",
                                 text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_TEAM"
                           }
                     },
                     "AGENT" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "AGENT_GRID_ALL",
                                 domID   : "nxContainerGridAll_A",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID",
                                 text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_AGENT"
                           }
                     },
                     "SUBAGENT" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "SUBAGENT_GRID_ALL",
                                 domID   : "nxContainerGridAll_A_SUB",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID_ALL",
                                 text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.SUBAGENT"
                           }
                     }
               }
         },
         "dn" : {
               parent   : "container",
               title    : "DN",
               window   : {
                     "MAJOR" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "MAJOR_GRID_ALL",
                                 domID   : "nxContainerGridAll_D_M",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID_ALL",
                                 text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.MAJOR"
                           }
                     },
                     "SUB" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "SUB_GRID_ALL",
                                 domID   : "nxContainerGridAll_D_S",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID_ALL",
                                 text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.SUB"
                           }
                     },
                     "DN" : {
                           join : "container.viewCenter.TABSTRIP",
                           joinBind : {
                                 TAG     : "DN_GRID_ALL",
                                 domID   : "nxContainerGridAll_D",
                                 content : "containerGridAll",
                                 dbms    : "CONTAINER_GRID",
                                 text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_DN"
                           }
                     }
               }
         },
         "route" : {
               parent   : "container",
               title    : "ROUTE",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "ROUTE_GRID_ALL",
                           domID   : "nxContainerGridAll_R",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID",
                           text    : "CONTAINER_GRID.BOTTOM.SELECTED_GRID.TREEVIEW_ROUTE"
                     }
               }
         },
         "login" : {
               parent   : "container",
               title    : "LOGIN",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "LOGIN_GRID_ALL",
                           domID   : "nxContainerGridAll_L",
                           content : "containerGridAll",
                           dbms    : "CONTAINER_GRID_ALL",
                           text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.LOGIN"
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
                                 text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.SKILL"
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
         "scenario" : {
               parent   : "container",
               title    : "SCENARIO",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "SCENARIO_CRUD_GRID",
                           domID   : "nxContainerScenario_body",
                           content : "containerScenario",
                           dbms    : "CONTAINER_SCENARIO",
                           text    : "CONTAINER_SCENARIO.CENTER.SCENARIO_GRID"
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


