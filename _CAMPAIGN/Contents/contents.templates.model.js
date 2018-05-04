'use strict';

define([
      "./Resource/model/modelResourceLeft_campaign",
      "./Container/model/modelContainerCenter",
      "./ContainerCampaign/model/modelContainerCampaignCenter",
      "./ContainerCustomer/model/modelContainerCustomerCenter",
      "./ContainerSetting/model/modelContainerSettingCenter",
      "./ContainerAssign/model/modelContainerAssignTop",
      "./ContainerAssign/model/modelContainerAssignBottom",
      "./ContainerAssign/model/modelContainerAssignLeft",
   ],
   function(
      modelResourceLeft_campaign,
      modelContainerCenter,
      modelContainerCampaignCenter,
      modelContainerCustomerCenter,
      modelContainerSettingCenter,
      modelContainerAssignTop,
      modelContainerAssignBottom,
      modelContainerAssignLeft,
   ) {

      /************************************************************
       * name        : modelTemplates
       * url         : Contents/sub/models/modelTemplates.js
       * description :
       ************************************************************/


      return {
         modelResourceLeft_campaign    : modelResourceLeft_campaign,
         modelContainerCenter          : modelContainerCenter,
         modelContainerCampaignCenter  : modelContainerCampaignCenter,
         modelContainerCustomerCenter  : modelContainerCustomerCenter,
         modelContainerSettingCenter   : modelContainerSettingCenter,
         modelContainerAssignTop       : modelContainerAssignTop,
         modelContainerAssignBottom    : modelContainerAssignBottom,
         modelContainerAssignLeft      : modelContainerAssignLeft,
      };

   }
);