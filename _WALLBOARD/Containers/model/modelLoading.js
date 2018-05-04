'use strict';

define([
      "./modelLoading_agent",
      "./modelLoading_board",
      "./modelLoading_setting",
   ],
   function(
      modelLoading_agent,
      modelLoading_board,
      modelLoading_setting,
   ) {

      /************************************************************
       * name        : modelLoading
       * url         : Containers/model/modelLoading.js
       * description :
       ************************************************************/


      return {
         modelLoading_agent     : modelLoading_agent,
         modelLoading_board     : modelLoading_board,
         modelLoading_setting   : modelLoading_setting,
      };

   }
);