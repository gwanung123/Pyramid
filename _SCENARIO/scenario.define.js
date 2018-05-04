'use strict';

define([
      "Contents/contents",
      "Contents/contents.templates",
      "Contents/contents.templates.model"
   ],
   function( contents, templates, modelTemplates ) {

      /***********************************************************
       * name        : Define
       * url         : /
       * description :
       ************************************************************/

      var _base_path = "/_SCENARIO/Contents/";

      var _menu = {
         LOADING            : { TAG : "loading" },
         RESOURCE           : { TAG : "resource", LOCATION : "Resource/resource.html" },
         CONTAINER          : { TAG : "container", LOCATION : "Container/container.html" },
         CONTAINER_SCENARIO : { TAG : "containerScenario" },

         CONTAINER_GRID_ALL : { TAG : "containerGridAll" }, // 2018.04.19 eric

         CONTAINER_APPLY    : { TAG : "containerApply" },
         SCENARIO           : { TAG : "scenario" },
         DAILY              : { TAG : "daily" },

         COUNSEL_CATEGORY     : { TAG : "counselCategory" },

         MAJOR              : { TAG : "major" }, // 2018.04.19 eric
         MIDDLE             : { TAG : "middle" }, // 2018.04.19 eric
         SUB                : { TAG : "sub" }, // 2018.04.19 eric
 
      };

      var _define = {
         "loading" : [
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
                                 TAG   : "TREEVIEW_SKILL",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewSkill",
                                 model : modelTemplates.modelResourceLeft_skill,
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
                                 TAG   : "TREEVIEW_QUEUE",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewQueue",
                                 model : modelTemplates.modelResourceLeft_queue,
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
                                 join  : ["resource.viewLeft.TREEVIEW_AGENT"]
                              }
                           ],
                           parent: "nx-contents-container-center",
                           view  : templates.templatesVs.viewContainerCenter,
                           viewModel : templates.templatesVMs.viewContainerCenter
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
         "containerApply" : {
               css      : "nx-containerApply",
               viewModel: contents.contentsVMs.containerApply,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "APPLY_QUEUE_TREEVIEW",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxContainerApplyLeft",
                                 model : modelTemplates.modelContainerApplyLeft
                              }
                           ],
                           css: "nx-containerApply-left"
                     },
                     "viewRight" : {
                           components : [
                              {
                                 TAG   : "APPLY_QUEUE_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerApplyRight",
                                 model : modelTemplates.modelContainerApplyRight
                              }
                           ],
                           css: "nx-containerApply-right"
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
         "daily" : {
               parent   : "container",
               title    : "DAILY",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           domID   : "nxContainerApply_daily",
                           content : "containerApply",
                           "viewLeft" : {
                                 TAG     : "APPLY_QUEUE_TREEVIEW_D",
                                 dbms    : "CONTAINER_APPLY",
                                 text    : "CONTAINER_APPLY.LEFT.APPLY_QUEUE_TREEVIEW",
                                 title   : "QUEUE"
                           },
                           "viewRight" : {
                                 TAG     : "APPLY_QUEUE_GRID_D",
                                 dbms    : "CONTAINER_APPLY",
                                 text    : "CONTAINER_APPLY.RIGHT.APPLY_QUEUE_GRID"
                           }
                     }
               }
         }, // daily

         "containerGridAll" : {
            css      : "nx-containerGridAll",
            viewModel: contents.contentsVMs.containerGridAll,
            window   : {
                  "viewCenter" : {
                        components : [
                           {
                              TAG   : "ALL_GRID",
                              type  : "KENDO.GRID2",
                              domID : "nxContainerGridAllCenter",
                              model : modelTemplates.modelContainerGridAllCenter
                           }
                        ],
                        css: "nx-containerGridAll-center"
                  }
            }
         },

         "counselCategory" :{
            parent      : "container",
            title       : "CATEGORY",
            window   : {
                  "MAJOR" : {
                        join : "container.viewCenter.TABSTRIP",
                        joinBind : {
                              TAG     : "ERMS_GRID_ALL",
                              domID   : "nxContainerGridAll_E",
                              content : "containerGridAll",
                              dbms    : "CONTAINER_GRID_ALL",
                              text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.MAJOR",
                        }
                  },

                  "MIDDLE" : {
                        join : "container.viewCenter.TABSTRIP",
                        joinBind : {
                              TAG     : "ERMS_GRID_ALL",
                              domID   : "nxContainerGridAll_E",
                              content : "containerGridAll",
                              dbms    : "CONTAINER_GRID_ALL",
                              text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.MIDDLE",
                        }
                  },

                  "SUB" : {
                        join : "container.viewCenter.TABSTRIP",
                        joinBind : {
                              TAG     : "SKILL_GRID_ALL",
                              domID   : "nxContainerGridAll_S",
                              content : "containerGridAll",
                              dbms    : "CONTAINER_GRID_ALL",
                              text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.SUB",
                        }
                  },
            }

         },

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

         "middle" :{
            parent      : "container",
            title       : "MIDDLE",
            window   : {
                  join : "container.viewCenter.TABSTRIP",
                  joinBind : {
                        TAG     : "ERMS_GRID_ALL",
                        domID   : "nxContainerGridAll_E",
                        content : "containerGridAll",
                        dbms    : "CONTAINER_GRID_ALL",
                        text    : "CONTAINER_GRID_ALL.CENTER.ALL_GRID.MIDDLE",
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


