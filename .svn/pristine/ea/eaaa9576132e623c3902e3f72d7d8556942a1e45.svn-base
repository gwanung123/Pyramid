'use strict';

define([
      "knockout",
      "nxrouter",
      "nxbinder",
      "nxdefine",
      "../../Defines/text.define",
      "../../Components/components"
   ],
   function( ko, _ROUTER, _BINDER, _DEFINE, _TEXT, _Components ) {

      var DOMID = "nx-sidebar";

      function sidebarViewModel( param ) {

         // veriable
         this.nxBlock = param._block;

         // for resource
         this._boardVM = undefined;
         this.isBoardOpen = false;
         this.isSettingOpen = true;

         this.DEFAULT_OPTIONS = {
            iframe: true,
            container: "nx-contents",
            _nexus: this.nxBlock
         };

         //knockout observable
         this.nxTXTSidebarButton1 = ko.observable(_TEXT.SIDEBAR.BUTTON_1);
         this.nxTXTSidebarButton2 = ko.observable(_TEXT.SIDEBAR.BUTTON_2);
         this.nxTXTSidebarButton3 = ko.observable(_TEXT.SIDEBAR.BUTTON_3);


         // button event
         this.nxDoSidebarButton2 = function( forceClose ) {
            console.log("[sidebar] :: sidebarViewModel : SETTING");
            var root = _DEFINE.MENU.SETTING.TAG,
                windowID = "nx-contents-div-"+root,
                win = this.nxBlock.getWindow(root, windowID);

            if ( forceClose === true || this.isSettingOpen ) {
               win.vm.doClose();
               this.isSettingOpen = false;
            }
            else {
               win.vm.doOpen();
               this.isSettingOpen = true;
            }
         };

         this.nxDoSidebarButton3 = function() {
            console.log("[sidebar] :: sidebarViewModel : BOARD");

            var options = $.extend(true, options, this.DEFAULT_OPTIONS);

            options.resizable = true;
            options.actions = [ "Pin", "Maximize" ];
            options.height = "840px";
            options.width = "1287px";

            this._board(options);
         };

      };

      /*****************************************************************************
       * prototype
       *****************************************************************************/
      sidebarViewModel.prototype._board = function( options ) {
         var self = this;

         if ( self._boardVM === undefined ) {
            var root = _DEFINE.MENU.BOARD.TAG,
                parent = _DEFINE.getComponent(root, "parent"),
                windowID = "nx-contents-div-"+root;

            options.title = _DEFINE.getComponent(root, "title");
            options.content = _DEFINE.getComponent(root, "content");
            /*
            options.onMaximize = function( tag, e, methods ) {
               var container = methods.param.container,
                   maxWidth = container.width(),
                   maxHeight = container.height();

               methods.setOptions({
                  position: {
                    top: "56px",
                    left: "150px"
                  },
                  width: maxWidth,
                  height: maxHeight,
               });
            };
            */

            _BINDER.appendDIV(parent, windowID);
            self._boardVM = _Components.onComponentLoad(root, "KENDO.WINDOW", windowID, options);

            self.nxBlock.setWindow(root, windowID, self._boardVM);
         }

         if ( self.isBoardOpen ) {
            self._boardVM.doClose();
            self.isBoardOpen = false;
         }
         else {
            self.nxDoSidebarButton2( true );
            self._boardVM.doOpen();
            self.isBoardOpen = true;
         }
      };


      return {
         viewModel: sidebarViewModel,
         domID: DOMID
      };
   }
);
