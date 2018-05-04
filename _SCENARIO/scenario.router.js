'use strict';

define(['sammy', "nxbinder", "nxdefine", "Defines/text.define", "Components/components"],
   function( _SAMMY, _BINDER, _DEFINE, _TEXT, _Components ) {

      /***********************************************************
       * name        : scenario.router
       * url         : /
       * description : router
       *               1. container append / bind
       ************************************************************/

      var _location = "";
      var _nxWinBlock;
      var _nxPusher;
      var _spliter;

      var run = function( nxBlock, nxPusher, spliterVM ) {
         console.log("current: "+application.getLocation());

         var path = application.getLocation();
         var url = _location = path.split("#")[0];

         //sammy start
         _nxWinBlock = nxBlock;
         _nxPusher = nxPusher;
         _spliter = spliterVM;

         application.run(url);

         //home url set
         var define = _DEFINE.getComponent();

         for ( var prop in define ) {
            if ( define[prop]["TAG"] === "HOME" ) {
               url += define[prop]["location"]; break;
            }
         }

         //home
         application.setLocation(url);
      };

      var changeURL = function( tag ) {
         var url = _location,
             change = _DEFINE.getComponent(tag, "location");

         if ( change === undefined ) {
            console.log("[scenario.router] :: sammy : changeURL = "+tag);
            return;
         }

         url += change;
         application.setLocation(url);
      };

      var _init = {
         _pusherCallback: function( pushed, param ) {
            var that = param;
            var content = pushed.data[0].CONTENT,
                service = pushed.data[0].SERVICE,
                bind = _TEXT.CONTENTS.PUSH[content][service];
            var tenant_id = _nxWinBlock.get("tenantId", "nexus"),
                pushCallbacks = _nxWinBlock.get("pushCallbacks", "shared"),
                callbacks = [],
                len = 0;

            if ( bind["TENANT_ID"] !== undefined ) {
               var data = pushed.data[0]["DATA"];
               if ( data[bind["TENANT_ID"]] !== tenant_id.toString() ) return;
            }

            if ( content === "stats" )
               callbacks = pushCallbacks[content][service];
            else {
               callbacks = pushCallbacks[content];
            }

            that.loadingCallback(pushed.data[0], bind);

            len = callbacks.length;
            for ( var i=0; i<len; i++ ) {
               var callback = callbacks[i];
               callback.func(pushed, bind, callback.param);
            }
         },
         pusher: function() {
            var that = this;
            var pushParams = _nxPusher.getParams(pushParams, "TREEVIEW_AGENT", "master");

            _nxPusher.onEventPushing(pushParams, that._pusherCallback, that);

            _nxWinBlock.set({pusher : _nxPusher}, "shared");
         },
         resource: function() {
            var root = _DEFINE.MENU.RESOURCE.TAG,
                parent = _DEFINE.getComponent(root, "parent"),
                windowID = "nx-contents-div-"+root,
                options = {},
                windowVM;

            options.iframe = true;
            options.width = "250px";
            options.height = "100%";
            options.draggable = false;
            options.resizable = false;
            options.position = { top: "56px", left: "150px" };
            options.title = false;
            options.animation = {
               open: {
                  effects: "slideIn:right",
                  duration: 500
               },
               close: {
                  effects: "slideIn:right",
                  reverse: true,
                  duration: 500
               },
            },
            options.container = "nx-contents";
            options.content = _DEFINE.getComponent(root, "content");
            options._nexus = _nxWinBlock;

            _BINDER.appendDIV(parent, windowID);
            windowVM = _Components.onComponentLoad(root, "KENDO.WINDOW", windowID, options);
            windowVM.doPin();

            _nxWinBlock.setWindow(root, windowID, windowVM);
         },
         loadingCallback: function(pushed, bind) {
            var service = pushed.SERVICE,
                root = _DEFINE.MENU.LOADING.TAG,
                txt = _TEXT.CONTENTS.LOADING,
                items = _DEFINE.getComponent(root),
                len = items.length;

            for ( var i=0; i<len; i++ ) {
               var item = items[i],
                   tag = item.tag,
                   m = item.model(tag, txt[tag].TAG);
               var asis = _nxWinBlock.get(item.shared, "shared");

               if ( txt[tag].TAG !== service ) continue;

               var tobe = {};
               tobe[item.shared] = m.getPushData(asis, pushed, bind);
               _nxWinBlock.set(tobe, "shared");
               break;
            }
         },
         loading: function() {
            var root = _DEFINE.MENU.LOADING.TAG,
                items = _DEFINE.getComponent(root),
                len = items.length;
            var txt = _TEXT.CONTENTS.LOADING;

            for ( var i=0; i<len; i++ ) {
               var nexus = _nxWinBlock.get("nexus");
               var item = items[i],
                   tag = item.tag,
                   options = txt[tag],
                   m = item.model(tag, options.TAG),
                   cbCount = 1;

               m.requestData(options, nexus, {
                  onResult : function( result, error, param ) {
                     cbCount += 1;

                     if ( error !== null ) return;
                     if ( result.hasOwnProperty("result") ) return;

                     var item = param.define;
                     var shared = _nxWinBlock.get(item.shared, "shared");
                     shared[param.tag] = result;

                     if ( cbCount === len ) callback();
                  },
                  onResultParam : {
                     define: item,
                     tag: options.TAG
                  }
               });
            }
         },
         container: function() {
            var root = _DEFINE.MENU.CONTAINER.TAG,
                parent = _DEFINE.getComponent(root, "parent"),
                windowID = _DEFINE.getComponent(root, "windowID"),
                options = {},
                windowVM;

            options.iframe = true;
            options.height = "100%";
            options.draggable = false;
            options.resizable = false;
            options.position = { top: "56px", left: "400px" };
            options.title = false;
            options.container = "nx-contents";
            options.content = _DEFINE.getComponent(root, "content");
            options._nexus = _nxWinBlock;

            _BINDER.appendDIV(parent, windowID);
            windowVM = _Components.onComponentLoad(root, "KENDO.WINDOW", windowID, options);
            windowVM.doPin();

            _nxWinBlock.setWindow(root, windowID, windowVM);
         }
      };

      /**
       * - sidebar에서 click
       * location 설정이 있을 경우
       */
      var application = _SAMMY(function() {

         this.get("scenario.html", function(context) {
            console.log("[scenario.router] :: sammy : application = "+application.getLocation());

            var element = $(document.body);

            kendo.ui.progress(element, true);

            //resource-load
            _init.resource();

            //websocket
            _init.pusher();

            setTimeout(function() {

               //tabstrip-load
               _init.container();

               kendo.ui.progress(element, false);
            }, 2000);

         });

      });


      return {
         run       : run,
         changeURL : changeURL
      };

   }
);
