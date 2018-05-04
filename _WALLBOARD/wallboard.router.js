'use strict';

define(['sammy', "nxbinder", "nxdefine", "Defines/text.define", "Components/components"],
   function( _SAMMY, _BINDER, _DEFINE, _TEXT, _Components ) {

      /***********************************************************
       * name        : wallboard.router
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
            console.log("[wallboard.router] :: sammy : changeURL = "+tag);
            return;
         }

         url += change;
         application.setLocation(url);
      };

      var _init = {
         pusherCallback: function( pushed, param ) {
            var that = param;
            var content = pushed.data[0].CONTENT,
                service = pushed.data[0].SERVICE,
                bind = _TEXT.CONTENTS.PUSH[content][service];
            var tenant_id = _nxWinBlock.get("tenantId", "nexus"),
                pushCallbacks = _nxWinBlock.get("pushCallbacks", "shared"),
                callbacks = [],
                len = 0;

            // 상담원의 tenant 만 적용하기 위해
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
            var master = _nxWinBlock.get("_master", "shared");

            var pushParams = _nxPusher.getParams(pushParams, "SETTING_GRID", "master", {
               items: new Array(master.agent[0]["EMPLOYEE_ID"])
            });

            pushParams = _nxPusher.getParams(pushParams, "WALLBOARD_ITEM", "wallboard", {
               items: new Array(master.agent[0]["EMPLOYEEPART_ID"].toString())
            });

            _nxPusher.onEventPushing(pushParams, that.pusherCallback, that);

            _nxWinBlock.set({pusher: _nxPusher}, "shared");
         },
         setting: function() {
            var root = _DEFINE.MENU.SETTING.TAG,
                parent = _DEFINE.getComponent(root, "parent"),
                windowID = _DEFINE.getComponent(root, "windowID"),
                options = {},
                windowVM;

            options.iframe = true;
            options.height = "100%";
            options.width = "745px";
            options.draggable = false;
            options.resizable = false;
            options.position = { top: "56px", left: "150px" };
            options.title = false;
            options.animation = {
               open: {
                  effects: "fade:in",
                  duration: 500
               },
               close: {
                  effects: "fade:out",
                  duration: 500
               },
            },
            options.container = parent;
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
         loading: function( callback ) {
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
      };

      /**
       * - sidebar에서 click
       * location 설정이 있을 경우
       */
      var application = _SAMMY(function() {

         this.get("wallboard.html", function(context) {
            console.log("[wallboard.router] :: sammy : application = "+application.getLocation());

            var element = $(document.body);

            kendo.ui.progress(element, true);

            //loading
            _init.loading(function() {
               //setting-load
               _init.setting();

               //websocket
               _init.pusher();

               kendo.ui.progress(element, false);
            });

         });

      });


      return {
         run       : run,
         changeURL : changeURL
      };

   }
);
