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

      var _base_path = "/_WALLBOARD/Contents/";

      var _menu = {
         LOADING : { TAG : "loading" },
         SETTING : { TAG : "setting", LOCATION : "Setting/setting.html" },
         BOARD   : { TAG : "board", LOCATION : "Board/board.html" },
      };

      var _define = {
         "loading" : [
               {
                  tag   : "AGENT",
                  model : modelLoading.modelLoading_agent,
                  shared: "_master"
               },
               {
                  tag   : "WALLBOARD_SETTING",
                  model : modelLoading.modelLoading_setting,
                  shared: "_ccc"
               },
               {
                  tag   : "WALLBOARD_BOARD",
                  model : modelLoading.modelLoading_board,
                  shared: "_ccc"
               },
         ],
         "setting" : {
               parent   : "nx-contents",
               title    : "SETTING",
               windowID : "nx-contents-div-" + _menu.SETTING.TAG,
               content  : _base_path + _menu.SETTING.LOCATION,
               view     : contents.contentsVs.setting,
               viewModel: contents.contentsVMs.setting,
               window   : {
                     "viewCenter" : {
                           components : [
                              {
                                 TAG   : "SETTING_GRID",
                                 type  : "KENDO.GRID",
                                 domID : "nxSettingCenter",
                                 model : modelTemplates.modelSettingCenter,
                                 push  : ["master"]
                              }
                           ],
                           parent: "nx-contents-setting-center",
                           view  : templates.templatesVs.viewSettingCenter,
                           viewModel : templates.templatesVMs.viewSettingCenter
                     }
               }
         },
         "board" : {
               parent   : "nx-contents",
               title    : "BOARD",
               windowID : "nx-contents-div-" + _menu.BOARD.TAG,
               content  : _base_path + _menu.BOARD.LOCATION,
               view     : contents.contentsVs.board,
               viewModel: contents.contentsVMs.board,
               window   : {
                     "viewCenter" : {
                           componentTmpls : [
                              {
                                 TAG   : "WALLBOARD_ITEM",
                                 type  : "KENDO.WALLBOARD.ITEM",
                                 domID : "nxBoardCenter",
                                 model : modelTemplates.modelBoardCenter,
                                 join  : ["setting.viewCenter.SETTING_GRID"],
                                 push  : ["wallboard"]
                              }
                           ],
                           parent: "nx-contents-board-center",
                           view  : templates.templatesVs.viewBoardCenter,
                           viewModel : templates.templatesVMs.viewBoardCenter
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


