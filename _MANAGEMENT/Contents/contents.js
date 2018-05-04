'use strict';

define([
      "text!./Resource/resource.html", "./Resource/resource",
      "text!./Container/container.html", "./Container/container",
      "./ContainerGrid/containerGrid",
      "./ContainerGridAll/containerGridAll",
      "./ContainerGridAgent/containerGridAgent",
      "./ContainerGridLoginId/containerGridLoginId",//20180425 Sam #23757
      "./ContainerGridDN/containerGridDN",//20180426 Sam #23757
      "./ContainerGridQueue/containerGridQueue",//20180427 Sam #23757      
      "./ContainerGridSubAgent/containerGridSubAgent",
      "./ContainerGridSkill/containerGridSkill",
   ],
   function(
      resourceV, resourceVM,
      containerV, containerVM,
      containerGridVM,
      containerGridAllVM,
      containerGridAgentVM,
      containerGridLoginIdVM,//20180425 Sam #23757
      containerGridDNVM,//20180426 Sam #23757
      containerGridQueueVM,//20180427 Sam #23757      
      containerGridSubAgentVM,
      containerGridSkillVM
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
         resource           : resourceVM,
         container          : containerVM,
         containerGrid      : containerGridVM,
         containerGridAll   : containerGridAllVM,
         containerGridAgent    : containerGridAgentVM,

         containerGridLoginId    : containerGridLoginIdVM,//20180425 Sam #23757
         containerGridDN    : containerGridDNVM,//20180426 Sam #23757
         containerGridQueue    : containerGridQueueVM,//20180427 Sam #23757         
         containerGridSubAgent : containerGridSubAgentVM,
         containerGridSkill : containerGridSkillVM
      };


      return {
         contentsVs  : contentsVs,
         contentsVMs : contentsVMs
      };
   }
);