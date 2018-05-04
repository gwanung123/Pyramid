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
         this.nxTXTSidebarButton8 = ko.observable(_TEXT.SIDEBAR.BUTTON_8);
         this.nxTXTSidebarButton9 = ko.observable(_TEXT.SIDEBAR.BUTTON_9);
         this.nxTXTSidebarButton10 = ko.observable(_TEXT.SIDEBAR.BUTTON_10);

         //sub menu
         var self = this;

         this._menu5 = _Components.onComponentLoad(_DEFINE.MENU.AGENT.TAG, "KENDO.MENU", "nx-sidebar-menu5", {
            orientation: "vertical",
            direction: "right",
            openOnClick: { rootMenuItems: true },
            onSelect: function( tag, item, methods ) {
               var btn = $(item);
               if ( btn.children().length > 1 ) return;
               self.nxDoSidebarButton5($.trim(btn.text()));
            }
         });

         this._menu6 = _Components.onComponentLoad(_DEFINE.MENU.DN.TAG, "KENDO.MENU", "nx-sidebar-menu6", {
            orientation: "vertical",
            direction: "right",
            openOnClick: { rootMenuItems: true },
            onSelect: function( tag, item, methods ) {
               var btn = $(item);
               if ( btn.children().length > 1 ) return;
               self.nxDoSidebarButton6($.trim(btn.text()));
            }
         });

         this._menu9 = _Components.onComponentLoad(_DEFINE.MENU.SKILL.TAG, "KENDO.MENU", "nx-sidebar-menu9", {
            orientation: "vertical",
            direction: "right",
            openOnClick: { rootMenuItems: true },
            onSelect: function( tag, item, methods ) {
               var btn = $(item);
               if ( btn.children().length > 1 ) return;
               self.nxDoSidebarButton9($.trim(btn.text()));
            }
         });

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
               containerWin.vm.setOptions({ position: { left: "70px"} });
               this.isResourceOpen = false;
            }
            else {
               win.vm.doOpen();
               containerWin.vm.setOptions({ position: { left: "370px"} });
               this.isResourceOpen = true;
            }
         };

         this.nxDoSidebarButton3 = function() {
            console.log("[sidebar] :: sidebarViewModel : CENTER");
            var tag = "CENTER",
                root = _DEFINE.MENU.CENTER.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton4 = function() {
            console.log("[sidebar] :: sidebarViewModel : TENANT");
            var tag = "TENANT",
                root = _DEFINE.MENU.TENANT.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton5 = function( menu ) {
            console.log("[sidebar] :: sidebarViewModel : AGENT : " + menu);
            var root = _DEFINE.MENU.AGENT.TAG;

            if ( this._onContainerCheck(menu, root, menu) === true ) {
               this._onContainerActive(menu, root, menu);
            }
            else {
               this._onContainerLoad(menu, root, menu);
            }
         };

         this.nxDoSidebarButton6 = function( menu ) {
            console.log("[sidebar] :: sidebarViewModel : DN : " + menu);
            var root = _DEFINE.MENU.DN.TAG;

            if ( this._onContainerCheck(menu, root, menu) === true ) {
               this._onContainerActive(menu, root, menu);
            }
            else {
               this._onContainerLoad(menu, root, menu);
            }
         };

         this.nxDoSidebarButton7 = function() {
            console.log("[sidebar] :: sidebarViewModel : ROUTE");
            var tag = "ROUTE",
                root = _DEFINE.MENU.ROUTE.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton8 = function() {
            console.log("[sidebar] :: sidebarViewModel : LOGIN");
            var tag = "LOGIN",
                root = _DEFINE.MENU.LOGIN.TAG;

            if ( this._onContainerCheck(tag, root) === true ) {
               this._onContainerActive(tag, root);
            }
            else {
               this._onContainerLoad(tag, root);
            }
         };

         this.nxDoSidebarButton9 = function( menu ) {
            console.log("[sidebar] :: sidebarViewModel : SKILL : " + menu);
            var root = _DEFINE.MENU.SKILL.TAG;

            if ( this._onContainerCheck(menu, root, menu) === true ) {
               this._onContainerActive(menu, root, menu);
            }
            else {
               this._onContainerLoad(menu, root, menu);
            }
         };

         this.nxDoSidebarButton10 = function() {
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

      };

      /***************************************************************************
       * prototype
       ***************************************************************************/
      sidebarViewModel.prototype._getParent = function( root, menu ) {
         var self = this;
         var define = _DEFINE.getComponent(root, "window");

         if ( menu !== undefined ) define = define[menu];

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

      sidebarViewModel.prototype._onContainerCheck = function( tag, root, menu ) {
         var self = this;
         var component = self._getParent(root, menu).component;
         var title = component.text[tag].TITLE,
             items = component.viewModel.getItems();

         for ( var i=0; i<items.length; i++ ) {
            var item = items[i];
            if ( item.textContent !== title ) continue;
            return true;
         }

         return false;
      };

      sidebarViewModel.prototype._onContainerLoad = function( tag, root, menu ) {
         var self = this;
         var parent = self._getParent(root, menu),
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

      sidebarViewModel.prototype._onContainerActive = function( tag, root, menu ) {
         var self = this;
         var component = self._getParent(root, menu).component;
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