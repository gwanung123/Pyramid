'use strict';

define(['sammy', "nxbinder", "nxdefine"],
function( sammy, binder, define ) {
    
      /***********************************************************
       * name        : interaction.router
       * url         : /
       * description : router
       *               1. container append / bind
       ************************************************************/

      var _location = "";

      var run = function( interactionRun ) {
         console.log("current: "+application.getLocation());

         var url = application.getLocation();
         url = url.split("#")[0];

         //sammy start
         application.run(url);

         var _define = define.getComponent();
         //home url set
         for ( var prop in _define ) {
            if ( _define[prop]["TAG"] === "HOME" ) {
               url += _define[prop]["location"]; break;
            }
         }

         application.setLocation(url);
      };

      var changeURL = function( kind ) {
        var url = application.getLocation(),
        change = "";

         switch ( kind ) {
            case define.ENUM.ROUTE.INTER_HOME.KIND :
                change = define.getComponent(define.ENUM.ROUTE.INTER_HOME.KIND, "location");
                break;
            case define.ENUM.ROUTE.INTER_CALL.KIND:
                change = define.getComponent(define.ENUM.ROUTE.INTER_CALL.KIND, "location");
                break;
            case define.ENUM.ROUTE.INTER_CHAT.KIND:
                change = define.getComponent(define.ENUM.ROUTE.INTER_CHAT.KIND, "location");
                break;
            case define.ENUM.ROUTE.INTER_MAIL.KIND:
                change = define.getComponent(define.ENUM.ROUTE.INTER_MAIL.KIND, "location");
                break;
            case define.ENUM.ROUTE.INTER_HISTORY.KIND:
                change = define.getComponent(define.ENUM.ROUTE.INTER_HISTORY.KIND, "location");
                break;
            
         }



        if ( change === null ) {
            console.log("[interacton.router] :: sammy : changeURL failed = "+kind);
            return;
         }

        //  url += change;
        //  application.setLocation(url);

         url = url.split("#")[0] + change;
         application.setLocation(url);
      };


      var application = sammy(function() {

         this.get("interaction.html", function(context) {
            console.log("[interaction.router] :: sammy : changeURL = "+application.getLocation());
         });

        // Home
        this.get(define.ENUM.ROUTE.INTER_HOME.LOCATION, function(context) {
            console.log("[interaction.router] :: sammy : changeURL = " + define.ENUM.ROUTE.INTER_HOME.LOCATION);
            binder.appendHTML(
               define.getComponent(define.ENUM.ROUTE.INTER_HOME.KIND, "parent"),
               define.getComponent(define.ENUM.ROUTE.INTER_HOME.KIND, "view")
            ).bind(
               define.getComponent(define.ENUM.ROUTE.INTER_HOME.KIND, "viewModel")
            );
         });

         //Call 
         this.get(define.ENUM.ROUTE.INTER_CALL.LOCATION, function(context) {
            console.log("[interaction.router] :: sammy : changeURL = " + define.ENUM.ROUTE.INTER_CALL.LOCATION);
            binder.appendHTML(
               define.getComponent(define.ENUM.ROUTE.INTER_CALL.KIND, "parent"),
               define.getComponent(define.ENUM.ROUTE.INTER_CALL.KIND, "view")
            ).bind(
               define.getComponent(define.ENUM.ROUTE.INTER_CALL.KIND, "viewModel")
            );
         });

         //메일 
         this.get(define.ENUM.ROUTE.INTER_MAIL.LOCATION, function(context) {
            console.log("[interaction.router] :: sammy : changeURL = " + define.ENUM.ROUTE.INTER_MAIL.LOCATION);
            binder.appendHTML(
               define.getComponent(define.ENUM.ROUTE.INTER_MAIL.KIND, "parent"),
               define.getComponent(define.ENUM.ROUTE.INTER_MAIL.KIND, "view")
            ).bind(
               define.getComponent(define.ENUM.ROUTE.INTER_MAIL.KIND, "viewModel")
            );
         });

         //Chat
         this.get(define.ENUM.ROUTE.INTER_CHAT.LOCATION, function(context) {
            console.log("[interaction.router] :: sammy : changeURL = " + define.ENUM.ROUTE.INTER_CHAT.LOCATION);
            binder.appendHTML(
               define.getComponent(define.ENUM.ROUTE.INTER_CHAT.KIND, "parent"),
               define.getComponent(define.ENUM.ROUTE.INTER_CHAT.KIND, "view")
            ).bind(
               define.getComponent(define.ENUM.ROUTE.INTER_CHAT.KIND, "viewModel")
            );
         });


         //History
         this.get(define.ENUM.ROUTE.INTER_HISTORY.LOCATION, function(context) {
            console.log("[interaction.router] :: sammy : changeURL = " + define.ENUM.ROUTE.INTER_HISTORY.LOCATION);
            binder.appendHTML(
               define.getComponent(define.ENUM.ROUTE.INTER_HISTORY.KIND, "parent"),
               define.getComponent(define.ENUM.ROUTE.INTER_HISTORY.KIND, "view")
            ).bind(
               define.getComponent(define.ENUM.ROUTE.INTER_HISTORY.KIND, "viewModel")
            );
         });
    
     });


      return {
         run       : run,
         changeURL : changeURL
      };
   }
);
