'use strict';

define([
      "./Board/model/modelBoardCenter",
      "./Setting/model/modelSettingCenter"
   ],
   function(
      modelBoardCenter,
      modelSettingCenter
   ) {

      /************************************************************
       * name        : modelTemplates
       * url         : Contents/sub/models/modelTemplates.js
       * description :
       ************************************************************/


      return {
         modelBoardCenter    : modelBoardCenter,
         modelSettingCenter  : modelSettingCenter
      };

   }
);