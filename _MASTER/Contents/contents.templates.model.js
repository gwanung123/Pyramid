'use strict';

define([
      "./Resource/model/modelResourceLeft_tenant",
      "./Resource/model/modelResourceLeft_group",
      "./Resource/model/modelResourceLeft_team",
      "./Resource/model/modelResourceLeft_agent",
      "./Resource/model/modelResourceLeft_dn",
      "./Resource/model/modelResourceLeft_route",
      "./Resource/model/modelResourceLeft_scenario",
      "./Container/model/modelContainerCenter",
      "./ContainerGrid/model/modelContainerGridTop",
      "./ContainerGrid/model/modelContainerGridBottom",
      "./ContainerGridAll/model/modelContainerGridAllCenter",
      "./ContainerGridSkill/model/modelContainerGridSkillLeft",
      "./ContainerGridSkill/model/modelContainerGridSkillCenter",
      "./ContainerGridSkill/model/modelContainerGridSkillRight",
      "./ContainerScenario/model/modelContainerScenario",
   ],
   function(
      modelResourceLeft_tenant,
      modelResourceLeft_group,
      modelResourceLeft_team,
      modelResourceLeft_agent,
      modelResourceLeft_dn,
      modelResourceLeft_route,
      modelResourceLeft_scenario,
      modelContainerCenter,
      modelContainerGridTop,
      modelContainerGridBottom,
      modelContainerGridAllCenter,
      modelContainerGridSkillLeft,
      modelContainerGridSkillCenter,
      modelContainerGridSkillRight,
      modelContainerScenario,
   ) {

      /************************************************************
       * name        : modelTemplates
       * url         : Contents/sub/models/modelTemplates.js
       * description :
       ************************************************************/


      return {
         modelResourceLeft_tenant    : modelResourceLeft_tenant,
         modelResourceLeft_group     : modelResourceLeft_group,
         modelResourceLeft_team      : modelResourceLeft_team,
         modelResourceLeft_agent     : modelResourceLeft_agent,
         modelResourceLeft_dn        : modelResourceLeft_dn,
         modelResourceLeft_route     : modelResourceLeft_route,
         modelResourceLeft_scenario  : modelResourceLeft_scenario,
         modelContainerCenter        : modelContainerCenter,
         modelContainerGridTop       : modelContainerGridTop,
         modelContainerGridBottom    : modelContainerGridBottom,
         modelContainerGridAllCenter : modelContainerGridAllCenter,
         modelContainerGridSkillLeft : modelContainerGridSkillLeft,
         modelContainerGridSkillCenter : modelContainerGridSkillCenter,
         modelContainerGridSkillRight: modelContainerGridSkillRight,
         modelContainerScenario      : modelContainerScenario,
      };

   }
);