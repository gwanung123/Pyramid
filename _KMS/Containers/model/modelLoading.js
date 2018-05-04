'use strict';

define([
      "./modelLoading_media",
      "./modelLoading_login",
      "./modelLoading_skill"
   ],
   function(
      modelLoading_media,
      modelLoading_login,
      modelLoading_skill
   ) {

      /************************************************************
       * name        : modelLoading
       * url         : Containers/model/modelLoading.js
       * description :
       ************************************************************/


      return {
         modelLoading_media    : modelLoading_media,
         modelLoading_login    : modelLoading_login,
         modelLoading_skill    : modelLoading_skill
      };

   }
);