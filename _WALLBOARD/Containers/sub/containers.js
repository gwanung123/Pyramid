'use strict';

define([
      "knockout",
      "text!./top.html", "./top",
      "text!./sidebar.html", "./sidebar",
      "text!./contents.html", "./contents"
   ],
   function(
      ko,
      topV, topVM,
      sidebarV, sidebarVM,
      contentsV, contentsVM
   ) {

      /************************************************************
       * name        : containers
       * url         : Containers/sub/containers.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var containersVs = {
         top             : topV,
         sidebar         : sidebarV,
         contents        : contentsV
      };

      var containersVMs = {
         top             : topVM,
         sidebar         : sidebarVM,
         contents        : contentsVM
      };

      return {
         containersVs  : containersVs,
         containersVMs : containersVMs,
         viewModels    : function() {
            this.nxTop = ko.observable(containersVs.top);
            this.nxSidebarmenu = ko.observable(containersVs.sidebar);
            this.nxContents = ko.observable(containersVs.contents);
         }
      };
   }

);