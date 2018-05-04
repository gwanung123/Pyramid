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
         this.isResourceOpen = true;

         this.DEFAULT_OPTIONS = {
            iframe: true,
            container: "nx-contents",
            _nexus: this.nxBlock
         };

         //knockout observable
         this.nxTXTSidebarButton1 = ko.observable(_TEXT.SIDEBAR.BUTTON_1);
         this.nxTXTSidebarButton2 = ko.observable(_TEXT.SIDEBAR.BUTTON_2);
         this.nxTXTSidebarButton3 = ko.observable(_TEXT.SIDEBAR.BUTTON_3);
         this.nxTXTSidebarButton4 = ko.observable(_TEXT.SIDEBAR.BUTTON_4);

         this.nxTXTSidebarButton5 = ko.observable(_TEXT.SIDEBAR.BUTTON_5);
         this.nxTXTSidebarButton6 = ko.observable(_TEXT.SIDEBAR.BUTTON_6);
         this.nxTXTSidebarButton7 = ko.observable(_TEXT.SIDEBAR.BUTTON_7);



         //sub menu
         var self = this;


         // button event
         this.nxDoSidebarButton2 = function() {
            console.log("[sidebar] :: sidebarViewModel : RESOURCE");
            var root = _DEFINE.MENU.RESOURCE.TAG,
                windowID = "nx-contents-div-"+root,
                win = this.nxBlock.getWindow(root, windowID);
            var containerRoot = _DEFINE.MENU.CONTAINER.TAG,
                containerWindowID = "nx-contents-div-"+containerRoot,
                containerWin = this.nxBlock.getWindow(containerRoot, containerWindowID);

            if ( this.isResourceOpen === true ) {
               win.vm.doClose();
               containerWin.vm.setOptions({ position: { left: "150px"} });
               this.isResourceOpen = false;
            }
            else {
               win.vm.doOpen();
               containerWin.vm.setOptions({ position: { left: "400px"} });
               this.isResourceOpen = true;
            }
         };

         this.nxDoSidebarButton3 = function() {
            console.log("[sidebar] :: sidebarViewModel : SCENARIO");
            var tag = "SCENARIO",
                root = _DEFINE.MENU.SCENARIO.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton4 = function() {
            console.log("[sidebar] :: sidebarViewModel : DAILY");
            var tag = "DAILY",
                root = _DEFINE.MENU.DAILY.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };



         this.nxDoSidebarButton5 = function() {
            console.log("[sidebar] :: sidebarViewModel : Major");
            var tag = "MAJOR",
                root = _DEFINE.MENU.MAJOR.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton6 = function() {
            console.log("[sidebar] :: sidebarViewModel : Middle");
            var tag = "MIDDLE",
                root = _DEFINE.MENU.MIDDLE.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton7 = function() {
            console.log("[sidebar] :: sidebarViewModel : sub");
            var tag = "SUB",
                root = _DEFINE.MENU.SUB.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

      };

      /***************************************************************************
       * prototype
       ***************************************************************************/
      sidebarViewModel.prototype._getParent = function( root ) {
         var self = this;
         var define = _DEFINE.getComponent(root, "window");
         var path = define.join.split("."),
             joinRoot = path[0],
             joinWinID = _DEFINE.getComponent(joinRoot, "windowID"),
             joinPos = path[1],
             joinTag = path[2];
         var win = self.nxBlock.getWindow(joinRoot, joinWinID),
             components = win.view.get("components", joinPos),
             methods = win.view.get("methods", joinPos),
             component = components[joinTag];

         return {
            define    : define,
            methods   : methods,
            component : component
         };
      };

      sidebarViewModel.prototype._onContainerCheck = function( tag, root ) {
         var self = this;
         var component = self._getParent(root).component;
         var title = component.text[tag].TITLE,
             items = component.viewModel.getItems();

         for ( var i=0; i<items.length; i++ ) {
            var item = items[i];
            if ( item.textContent !== title ) continue;
            return true;
         }

         return false;
      };

      sidebarViewModel.prototype._onContainerLoad = function( tag, root ) {
         var self = this;
         var parent = self._getParent(root),
             define = parent.define,
             component = parent.component,
             methods = parent.methods;

         var vm = methods.doAppend.exe(methods.doAppend.arg,
                                       component,
                                       define.joinBind,
                                       component.text[tag],
                                       {
                                          joinBind: define.joinBind
                                       });

         return vm;
      };

      sidebarViewModel.prototype._onContainerActive = function( tag, root ) {
         var self = this;
         var component = self._getParent(root).component;
         var title = component.text[tag].TITLE,
             items = component.viewModel.getItems();

         for ( var i=0; i<items.length; i++ ) {
            var item = items[i];
            if ( item.textContent !== title ) continue;
            component.viewModel.doActivate(item);
            return;
         }
      };


      return {
         viewModel: sidebarViewModel,
         domID: DOMID
      };
   }
);
