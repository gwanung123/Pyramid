'use strict';

define([
      "text!./Resource/resource.html", "./Resource/resource",
      "text!./Container/container.html", "./Container/container",
      "./ContainerCampaign/containerCampaign",
      "./ContainerCustomer/containerCustomer",
      "./ContainerSetting/containerSetting",
      "./ContainerAssign/containerAssign",
   ],
   function(
      resourceV, resourceVM,
      containerV, containerVM,
      containerCampaignVM,
      containerCustomerVM,
      containerSettingVM,
      containerAssignVM
   ) {

      /************************************************************
       * name        : contents
       * url         : Contents/contents.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var contentsVs = {
         resource       : resourceV,
         container      : containerV
      };

      var contentsVMs = {
         resource         : resourceVM,
         container        : containerVM,

         containerCampaign : containerCampaignVM,
         containerCustomer : containerCustomerVM,
         containerSetting  : containerSettingVM,
         containerAssign   : containerAssignVM
      };


      return {
         contentsVs  : contentsVs,
         contentsVMs : contentsVMs
      };
   }
);