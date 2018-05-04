'use strict';

define([
      "./Resource/model/modelResourceLeft_agent",
      "./Resource/model/modelResourceLeft_dn",
      "./Resource/model/modelResourceLeft_queue",

      "./Container/model/modelContainerCenter",

      "./ContainerGrid/model/modelContainerGridTop",
      "./ContainerGrid/model/modelContainerGridBottom",

      "./ContainerGridAll/model/modelContainerGridAllCenter",

      "./ContainerGridAgent/model/modelContainerGridAgent1",
      "./ContainerGridAgent/model/modelContainerGridAgent2",

      "./ContainerGridSubAgent/model/modelContainerGridSubAgent",

      "./ContainerGridSkill/model/modelContainerGridSkillLeft",
      "./ContainerGridSkill/model/modelContainerGridSkillCenter",
      "./ContainerGridSkill/model/modelContainerGridSkillRight",
   ],
   function(
      modelResourceLeft_agent,
      modelResourceLeft_dn,
      modelResourceLeft_queue,
      modelContainerCenter,
      modelContainerGridTop,
      modelContainerGridBottom,
      modelContainerGridAllCenter,
      modelContainerGridAgent1,
      modelContainerGridAgent2,
      modelContainerGridSubAgent,
      modelContainerGridSkillLeft,
      modelContainerGridSkillCenter,
      modelContainerGridSkillRight,
   ) {

      /************************************************************
       * name        : modelTemplates
       * url         : Contents/sub/models/modelTemplates.js
       * description :
       ************************************************************/


      return {
         modelResourceLeft_agent       : modelResourceLeft_agent,
         modelResourceLeft_dn          : modelResourceLeft_dn,
         modelResourceLeft_queue       : modelResourceLeft_queue,
         modelContainerCenter          : modelContainerCenter,
         modelContainerGridTop         : modelContainerGridTop,
         modelContainerGridBottom      : modelContainerGridBottom,
         modelContainerGridAllCenter   : modelContainerGridAllCenter,
         modelContainerGridAgent1      : modelContainerGridAgent1,
         modelContainerGridAgent2      : modelContainerGridAgent2,
         modelContainerGridSubAgent    : modelContainerGridSubAgent,
         modelContainerGridSkillLeft   : modelContainerGridSkillLeft,
         modelContainerGridSkillCenter : modelContainerGridSkillCenter,
         modelContainerGridSkillRight  : modelContainerGridSkillRight,
      };

   }
);