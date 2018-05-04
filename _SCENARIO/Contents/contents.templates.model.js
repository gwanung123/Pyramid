'use strict';

define([
      "./Resource/model/modelResourceLeft_agent",
      "./Resource/model/modelResourceLeft_skill",
      "./Resource/model/modelResourceLeft_dn",
      "./Resource/model/modelResourceLeft_queue",
      "./Resource/model/modelResourceLeft_scenario",
      "./Container/model/modelContainerCenter",
      "./ContainerScenario/model/modelContainerScenario",
      "./ContainerApply/model/modelContainerApplyLeft",
      "./ContainerApply/model/modelContainerApplyRight",
      "./ContainerGridAll/model/modelContainerGridAllCenter",

   ],
   function(
      modelResourceLeft_agent,
      modelResourceLeft_skill,
      modelResourceLeft_dn,
      modelResourceLeft_queue,
      modelResourceLeft_scenario,
      modelContainerCenter,
      modelContainerScenario,
      modelContainerApplyLeft,
      modelContainerApplyRight,
      modelContainerGridAllCenter,
   ) {

      /************************************************************
       * name        : modelTemplates
       * url         : Contents/sub/models/modelTemplates.js
       * description :
       ************************************************************/


      return {
         modelResourceLeft_agent     : modelResourceLeft_agent,
         modelResourceLeft_skill     : modelResourceLeft_skill,
         modelResourceLeft_dn        : modelResourceLeft_dn,
         modelResourceLeft_queue     : modelResourceLeft_queue,
         modelResourceLeft_scenario  : modelResourceLeft_scenario,
         modelContainerCenter        : modelContainerCenter,
         modelContainerScenario      : modelContainerScenario,
         modelContainerApplyLeft     : modelContainerApplyLeft,
         modelContainerApplyRight    : modelContainerApplyRight,
         modelContainerGridAllCenter   : modelContainerGridAllCenter,
      };

   }
);

