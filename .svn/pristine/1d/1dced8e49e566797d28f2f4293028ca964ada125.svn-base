'use strict';

define([
      "knockout",
      "text!./sidebar.html", "./sidebar",
      "text!./header.html", "./header",
      "text!./contents.html", "./contents"
   ],
   function(
      ko,
      sidebarV, sidebarVM,
      headerV, headerVM,
      contentsV, contentsVM
   ) {

      /************************************************************
       * name        : containers
       * url         : Containers/sub/containers.js
       * description : 모든 Views를 로드하여 관리한다. Views를 참조하여야 할 경우에는 이 파일을 로드하여 참조한다.
       ************************************************************/

      var containersVs = {
         sidebar         : sidebarV,
         header          : headerV,
         contents        : contentsV
      };

      var containersVMs = {
         sidebar         : sidebarVM,
         header          : headerVM,
         contents        : contentsVM
      };

      return {
         containersVs  : containersVs,
         containersVMs : containersVMs,
         viewModels    : function(){
            this.nxSidebarmenu = ko.observable(containersVs.sidebar);
            this.nxContents = ko.observable(containersVs.contents);
            this.nxHeader = ko.observable(containersVs.header);
         }
      };
   }

);