'use strict';

define([
      "text!./interactionHome.html", "./interactionHome",
      "text!./interactionCall.html", "./interactionCall",
      "text!./interactionChat.html", "./interactionChat",
      "text!./interactionMail.html", "./interactionMail",
      "text!./interactionHistory.html", "./interactionHistory"
   ],
   function(
      interactionHomeV, interactionHomeVM,
      interactionCallV, interactionCallVM,
      interactionChatV, interactionChatVM,
      interactionMailV, interactionMailVM,
      interactionHistoryV, interactionHistoryVM
   ) {

      /************************************************************
       * name        : templates
       * url         : Templates/templates.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var contentsVs = {
            interactionHome    : interactionHomeV,
            interactionCall    : interactionCallV,
            interactionChat    : interactionChatV,
            interactionMail    : interactionMailV,
            interactionHistory    : interactionHistoryV
      };

      var contentsVMs = {
            interactionHome    : interactionHomeVM,
            interactionCall    : interactionCallVM,
            interactionChat    : interactionChatVM,
            interactionMail    : interactionMailVM,
            interactionHistory    : interactionHistoryVM
      };


      return {
         contentsVs  : contentsVs,
         contentsVMs : contentsVMs
      };
   }
);