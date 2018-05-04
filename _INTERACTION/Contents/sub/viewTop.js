'use strict';

define(["knockout"],
   function( ko ) {

      function ViewTopViewModel( param ) {
         console.log("[viewTop] :: ViewTopViewModel : load");

        //  this.nxFieldTopTitle = ko.observable();
        //  this.nxFieldTopGuide = ko.observable();
      };

      ViewTopViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewTop] :: ViewTopViewModel : onInit");
         this._setObservableInit(nxBlock);
      };

      ViewTopViewModel.prototype._response = function( nxBlock ) {
         console.log("[viewTop] :: ViewTopViewModel : inBound");
      };

      ViewTopViewModel.prototype._setObservableInit = function( nxBlock ) {
         var field = nxBlock.get("field");

        //  this.nxFieldTopTitle(field.TEXT_TITLE);
        //  this.nxFieldTopGuide(field.TEXT_GUIDE);
      };


      return {
         viewModel: ViewTopViewModel,
         domID: "nx-contents-top"
      };
   }
);

