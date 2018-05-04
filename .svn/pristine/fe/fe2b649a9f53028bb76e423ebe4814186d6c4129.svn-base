'use strict';

define(["knockout", "nxrouter", "nxdefine", "../../Defines/field.define"],
   function( ko, router, define, field ) {

      function sidebarViewModel() {

        this.nxInteractionHome = function() {
            console.log("[sidebar] :: sidebarViewModel : InteractionHome");
            router.changeURL(define.ENUM.ROUTE.INTER_HOME.KIND);
         };

         this.nxInteractionCall = function() {
            console.log("[sidebar] :: sidebarViewModel : InteractionCall");
            router.changeURL(define.ENUM.ROUTE.INTER_CALL.KIND);
         };

         this.nxInteractionMail = function() {
            console.log("[sidebar] :: sidebarViewModel : nxInteractionMail");
            router.changeURL(define.ENUM.ROUTE.INTER_MAIL.KIND);
         };

         this.nxInteractionChat = function() {
            console.log("[sidebar] :: sidebarViewModel : InteractionChat");
            router.changeURL(define.ENUM.ROUTE.INTER_CHAT.KIND);
         };


         this.nxInteractionHistory = function() {
            console.log("[sidebar] :: sidebarViewModel : InteractionHistory");
             router.changeURL(define.ENUM.ROUTE.INTER_HISTORY.KIND);
         };
       


      };


      return {
         viewModel: sidebarViewModel,
         domID: "nx-sidebar"
      };
   }
);