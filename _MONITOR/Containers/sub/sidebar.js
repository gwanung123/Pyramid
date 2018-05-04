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

         //veriable
         this.nxBlock = param._block;
         this.nxWindows = {
            _windows: [],
            len: function() {
               var that = this;
               return that._windows.length;
            },
            get: function( index ) {
               var that = this;
               return that._windows[index];
            },
            add: function( obj ) {
               var that = this;
               that._windows.push(obj);
            },
            del: function( index ) {
               var that = this;
               that._windows.splice(index, 1);
            },
            push: function( root, winID ) {
               var that = this;
               var obj = {};
               obj[winID] = root;
               that.add(obj);
            },
            remove: function( root, winID ) {
               var that = this;

               for( var i=0; i<that.len(); i++ ) {
                  var obj = that.get(i);
                  if ( obj[winID] === undefined ) continue;
                  that.del(i);
                  break;
               }
            }
         };

         // for spliter
         this.nxSpliter = param._spliter;
         this.nxSpliter.nexus.join["onExpand"].push({
            callback: this.onBoardOpen,
            callbackParam: this
         });
         this.nxSpliter.nexus.join["onCollapse"].push({
            callback: this.onBoardClose,
            callbackParam: this
         });
         this.isBoardOpen = true;

         // for resource
         this.isResourceOpen = false;

         // for user_define
         this.isUserDefineOpen = false;

         this.btn3ClickCount = 1;
         this.btn4ClickCount = 1;
         this.btn5ClickCount = 1;
         this.btn6ClickCount = 1;

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

         this.nxDoSidebarButton2 = function( isOpen ) {
            console.log("[sidebar] :: sidebarViewModel : RESOURCE");
            var root = _DEFINE.MENU.RESOURCE.TAG,
                windowID = "nx-contents-div-"+root,
                win = this.nxBlock.getWindow(root, windowID);
            var containerRoot = _DEFINE.MENU.USER_DEFINE.TAG,
                containerWindowID = "nx-contents-div-"+containerRoot,
                containerWin = this.nxBlock.getWindow(containerRoot, containerWindowID);

            if ( this.isBoardOpen === true ) this.nxDoSidebarButton6(true);

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
            console.log("[sidebar] :: sidebarViewModel : AGENT");

            if ( this.isBoardOpen === true ) this.nxDoSidebarButton6(true);

            var options = $.extend(true, options, this.DEFAULT_OPTIONS);

            options.resizable = false;
            options.width = "1200px";
            options.height = "470px";

            if ( this.btn4ClickCount > 10 ) this.btn4ClickCount = 1;
            this.agent(this.btn4ClickCount, options);
            this.btn4ClickCount += 1;
         };

         this.nxDoSidebarButton4 = function() {
            console.log("[sidebar] :: sidebarViewModel : AGENT_STATS");

            if ( this.isBoardOpen === true ) this.nxDoSidebarButton6(true);

            var options = $.extend(true, options, this.DEFAULT_OPTIONS);

            options.resizable = false;
            options.width = "1200px";
            options.height = "600px";

            if ( this.btn3ClickCount > 10 ) this.btn3ClickCount = 1;
            this.agentStats(this.btn3ClickCount, options);
            this.btn3ClickCount += 1;
         };

         this.nxDoSidebarButton5 = function() {
            console.log("[sidebar] :: sidebarViewModel : QUEUE");

            if ( this.isBoardOpen === true ) this.nxDoSidebarButton6(true);

            var options = $.extend(true, options, this.DEFAULT_OPTIONS);

            options.resizable = false;
            options.width = "1200px";
            options.height = "550px";

            if ( this.btn4ClickCount > 10 ) this.btn4ClickCount = 1;
            this.queue(this.btn4ClickCount, options);
            this.btn4ClickCount += 1;
         };

         this.nxDoSidebarButton6 = function( isOpen ) {
            console.log("[sidebar] :: sidebarViewModel : BOARD");
            if ( this.btn6ClickCount > 10 ) this.btn6ClickCount = 1;
            if ( isOpen === true ) this.btn6ClickCount = 1;
            this.board(this.btn6ClickCount);
         };

         this.nxDoSidebarButton7 = function( isOpen ) {
            console.log("[sidebar] :: sidebarViewModel : USER_DEFINE");
            var root = _DEFINE.MENU.USER_DEFINE.TAG,
                windowID = "nx-contents-div-"+root,
                win = this.nxBlock.getWindow(root, windowID);

            if ( this.isResourceOpen === true ) this.nxDoSidebarButton2(true);
            if ( this.isBoardOpen === true ) this.nxDoSidebarButton6(true);

            if ( this.isUserDefineOpen === true ) {
               win.vm.doClose();
               this.isUserDefineOpen = false;
            }
            else {
               win.vm.doOpen();
               this.isUserDefineOpen = true;
            }
         };
      };

      /****************************************************************************
       * prototype
       ****************************************************************************/
      sidebarViewModel.prototype.agent = function( clickCount, options ) {
         var self = this;
         var root = _DEFINE.MENU.AGENT.TAG,
             parent = _DEFINE.getComponent(root, "parent"),
             windowID = "nx-contents-div-"+root+clickCount,
             windowVM;

         options.title = _DEFINE.getComponent(root, "title");
         options.content = _DEFINE.getComponent(root, "content");
         options.onClose = function( tag, e, method ) {
            self.nxBlock.delWindow(root, e.sender.element[0].id);
            self.nxWindows.remove(root, e.sender.element[0].id);
         };

         _BINDER.appendDIV(parent, windowID);
         windowVM = _Components.onComponentLoad(root, "KENDO.WINDOW", windowID, options);

         self.nxBlock.setWindow(root, windowID, windowVM);
         self.nxWindows.push(root, windowID);
      };

      sidebarViewModel.prototype.agentStats = function( clickCount, options ) {
         var self = this;
         var root = _DEFINE.MENU.AGENT_STATS.TAG,
             parent = _DEFINE.getComponent(root, "parent"),
             windowID = "nx-contents-div-"+root+clickCount,
             windowVM;

         options.title = _DEFINE.getComponent(root, "title");
         options.content = _DEFINE.getComponent(root, "content");
         options.onClose = function( tag, e, method ) {
            self.nxBlock.delWindow(root, e.sender.element[0].id);
            self.nxWindows.remove(root, e.sender.element[0].id);
         };

         _BINDER.appendDIV(parent, windowID);
         windowVM = _Components.onComponentLoad(root, "KENDO.WINDOW", windowID, options);

         self.nxBlock.setWindow(root, windowID, windowVM);
         self.nxWindows.push(root, windowID);
      };

      sidebarViewModel.prototype.queue = function( clickCount, options ) {
         var self = this;
         var root = _DEFINE.MENU.QUEUE.TAG,
             parent = _DEFINE.getComponent(root, "parent"),
             windowID = "nx-contents-div-"+root+clickCount,
             windowVM;

         options.title = _DEFINE.getComponent(root, "title");
         options.content = _DEFINE.getComponent(root, "content");
         options.onClose = function( tag, e, method ) {
            self.nxBlock.delWindow(root, e.sender.element[0].id);
            self.nxWindows.remove(root, e.sender.element[0].id);
         };

         _BINDER.appendDIV(parent, windowID);
         windowVM = _Components.onComponentLoad(root, "KENDO.WINDOW", windowID, options);

         self.nxBlock.setWindow(root, windowID, windowVM);
         self.nxWindows.push(root, windowID);
      };

      sidebarViewModel.prototype.board = function( clickCount ) {
         var self = this;
         if ( clickCount%2 === 1 ) {
            self.onBoardClose();
            self.nxSpliter.doCollapse(".k-pane:first");
         }
         else {
            self.onBoardOpen();
            self.nxSpliter.doExpand(".k-pane:first");
         }
      };

      sidebarViewModel.prototype.onBoardOpen = function( tag, pane, methods, param ) {
         var self = this;

         if ( param !== undefined ) self = param;

         if ( self.isResourceOpen === true ) self.nxDoSidebarButton2(true);
         if ( self.isUserDefineOpen === true ) self.nxDoSidebarButton7(true);

         while( self.nxWindows.len() > 0 ) {
            var obj = self.nxWindows.get(0);
            for ( var winID in obj ) {
               var window = self.nxBlock.getWindow(obj[winID], winID);
               window.vm.doClose();
            }
         }

         self.isBoardOpen = true;
         self.btn6ClickCount += 1;
      };

      sidebarViewModel.prototype.onBoardClose = function( tag, pane, methods, param ) {
         var self = this;

         if ( param !== undefined ) self = param;

         self.isBoardOpen = false;
         self.btn6ClickCount += 1;
      };

      return {
         viewModel: sidebarViewModel,
         domID: DOMID
      };
   }
);