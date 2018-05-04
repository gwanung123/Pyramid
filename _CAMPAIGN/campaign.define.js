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

      var _base_path = "/_CAMPAIGN/Contents/";

      var _menu = {
         LOADING            : { TAG : "loading" },
         RESOURCE           : { TAG : "resource", LOCATION : "Resource/resource.html" },
         CONTAINER          : { TAG : "container", LOCATION : "Container/container.html" },
         CONTAINER_CAMPAIGN : { TAG : "containerCampaign" },
         CAMPAIGN           : { TAG : "campaign" },
         CONTAINER_CUSTOMER : { TAG : "containerCustomer" },
         CUSTOMER           : { TAG : "customer" },
         CONTAINER_SETTING  : { TAG : "containerSetting" },
         SETTING            : { TAG : "setting" },
         CONTAINER_ASSIGN   : { TAG : "containerAssign" },
         ASSIGN             : { TAG : "assign" }
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
                                 TAG   : "TREEVIEW_CAMPAIGN",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxTreeviewCampaign",
                                 model : modelTemplates.modelResourceLeft_campaign,
                                 push  : ["master", "campaign"]
                              }
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
                                 join  : ["resource.viewLeft.TREEVIEW_CAMPAIGN"]
                              }
                           ],
                           parent: "nx-contents-container-center",
                           view  : templates.templatesVs.viewContainerCenter,
                           viewModel : templates.templatesVMs.viewContainerCenter
                     }
               }
         },
         "containerCampaign" : {
               css      : "nx-containerCampaign",
               viewModel: contents.contentsVMs.containerCampaign,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "CAMPAIGN_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerCampaignCenter",
                                 model : modelTemplates.modelContainerCampaignCenter
                              }
                           ],
                           css: "nx-containerCampaign-center"
                     }
               }
         },
         "campaign" : {
               parent   : "container",
               title    : "CAMPAIGN",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "CAMPAIGN",
                           domID   : "nxContainerCampaign_C",
                           content : "containerCampaign",
                           dbms    : "CONTAINER_CAMPAIGN",
                           text    : "CONTAINER_CAMPAIGN.CENTER.CAMPAIGN_GRID.CAMPAIGN"
                     }
               }
         },
         "containerCustomer" : {
               css      : "nx-containerCustomer",
               viewModel: contents.contentsVMs.containerCustomer,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "CUSTOMER_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerCustomerCenter",
                                 model : modelTemplates.modelContainerCustomerCenter
                              }
                           ],
                           css: "nx-containerCustomer-center"
                     }
               }
         },
         "customer" : {
               parent   : "container",
               title    : "CUSTOMER",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "CUSTOMER",
                           domID   : "nxContainerCustomer_C",
                           content : "containerCustomer",
                           dbms    : "CONTAINER_CUSTOMER",
                           text    : "CONTAINER_CUSTOMER.CENTER.CUSTOMER_GRID.CUSTOMER"
                     }
               }
         },
         "containerSetting" : {
               css      : "nx-containerSetting",
               viewModel: contents.contentsVMs.containerSetting,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "SETTING_SHEET",
                                 type  : "KENDO.SPREADSHEET",
                                 domID : "nxContainerSettingCenter",
                                 model : modelTemplates.modelContainerSettingCenter
                              }
                           ],
                           css: "nx-containerSetting-center"
                     }
               }
         },
         "setting" : {
               parent   : "container",
               title    : "CAMPAIGN SETTING",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           TAG     : "SETTING",
                           domID   : "nxContainerSetting_S",
                           content : "containerSetting",
                           dbms    : "CONTAINER_SETTING",
                           text    : "CONTAINER_SETTING.CENTER.SETTING_SHEET.SETTING"
                     }
               }
         },
         "containerAssign" : {
               css      : "nx-containerAssign",
               viewModel: contents.contentsVMs.containerAssign,
               window   : {
                     "viewLeft" : {
                           components : [
                              {
                                 TAG   : "ASSIGN_TREEVIEW",
                                 type  : "KENDO.TREEVIEW",
                                 domID : "nxContainerAssignLeft",
                                 model : modelTemplates.modelContainerAssignLeft,
                                 join  : ["resource.viewLeft.TREEVIEW_CAMPAIGN"]
                              }
                           ],
                           css: "nx-containerAssign-left"
                     },
                     "viewTop" : {
                           components : [
                              {
                                 TAG   : "ASSIGN_LIST_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerAssignTop",
                                 model : modelTemplates.modelContainerAssignTop
                              }
                           ],
                           css: "nx-containerAssign-top"
                     },
                     "viewBottom" : {
                           components : [
                              {
                                 TAG   : "ASSIGN_AGENT_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxContainerAssignBottom",
                                 model : modelTemplates.modelContainerAssignBottom
                              }
                           ],
                           css: "nx-containerAssign-bottom"
                     }
               }
         },
         "assign" : {
               parent   : "container",
               title    : "CAMPAIGN ASSIGN",
               window   : {
                     join : "container.viewCenter.TABSTRIP",
                     joinBind : {
                           domID   : "nxContainerAssign_A",
                           content : "containerAssign",
                           "viewLeft" : {
                                 TAG     : "ASSIGN_TREEVIEW_A",
                                 dbms    : "CONTAINER_ASSIGN",
                                 text    : "CONTAINER_ASSIGN.LEFT.ASSIGN_TREEVIEW",
                                 title   : "AGENT"
                           },
                           "viewTop" : {
                                 TAG     : "ASSIGN_LIST_GRID_D",
                                 dbms    : "CONTAINER_ASSIGN",
                                 text    : "CONTAINER_ASSIGN.TOP.ASSIGN_LIST_GRID"
                           },
                           "viewBottom" : {
                                 TAG     : "ASSIGN_AGENT_GRID_D",
                                 dbms    : "CONTAINER_ASSIGN",
                                 text    : "CONTAINER_ASSIGN.BOTTOM.ASSIGN_AGENT_GRID"
                           }
                     }
               }
         }
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


