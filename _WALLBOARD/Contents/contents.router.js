'use strict';

define(['sammy', "nxbinder", "nxdefine"],
   function( _SAMMY, _BINDER, _DEFINE ) {

      /***********************************************************
       * name        : content.router
       * url         : /
       * description : router
       *               1. container append / bind
       ************************************************************/

      var _windowID;
      var _windowVM;

      var run = function( nexus_signin ) {
         console.log("current: "+application.getLocation());

         var path = application.getLocation();
         var url = path.split("#")[0];

         _windowID = getUrlParam("windowID"),
         _windowVM = window.parent.$("#" + _windowID).data("kendoWindow");

         //sammy start
         application.run(url);
      };

      var getUrlParam = function( key, url ) {
         if ( url === undefined ) url = application.getLocation();
         key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
         var regexS = "[\\?&]"+key+"=([^&#]*)";
         var regex = new RegExp( regexS );
         var results = regex.exec( url );
         return results == null ? null : results[1];
      };

      var application = _SAMMY(function() {

         this.get(_DEFINE.MENU.BOARD.LOCATION, function(context) {
            console.log("[content.router] :: sammy : application = "+application.getLocation());

            var ROOT = _DEFINE.MENU.BOARD.TAG;

            _BINDER.bind(_DEFINE.getComponent(ROOT, "viewModel"), {winID: _windowID, winVM: _windowVM});
         });

         this.get(_DEFINE.MENU.SETTING.LOCATION, function(context) {
            console.log("[content.router] :: sammy : application = "+application.getLocation());

            var ROOT = _DEFINE.MENU.SETTING.TAG;

            _BINDER.bind(_DEFINE.getComponent(ROOT, "viewModel"), {winID: _windowID, winVM: _windowVM});
         });

      });


      return {
         run : run
      };

   }
);
