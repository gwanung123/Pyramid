'use strict';

define(["Library/scenario.monitoring", "nxws"],
   function( _monitoring ) {

      /*********************************************************************************
       * Scenario Push
       *********************************************************************************/
      var ScenarioPush = function() {
         this.pushHandle = null;
         this.pushCallback = null;
         this.pushCallbackParam = null;

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      var ptt = ScenarioPush.prototype;

      ptt.getParams = function( pushParams, tag, pushTag, param ) {
         var self = this;

         var _PUSHES = {
            "TREEVIEW_AGENT" : {
                  "master": function( other ) {
                     var params = {
                        subject : "monitor",
                        content : "master",
                        tag     : tag
                     };

                     if ( other === undefined ) return params;
                     if ( other.items !== undefined ) params.items = other.items;
                     return params;
                  }
            }
         };

         if ( pushParams === undefined || pushParams === null ) pushParams = { services: [] };

         var _push = _PUSHES[tag],
             _getParam = _push[pushTag];

         if ( _getParam === undefined ) return null;

         pushParams.services.push(_getParam(param));

         return pushParams;
      };

      /****************************************************************************
      {
         url : "/cairo/monitor/event",
         params : {
            services : []
         },
         onOpen : function(param) {},
         onMessage : function(data, param) {},
         onError : function(error, param) {},
         onClose : function(param) {},
         onResult : function(result, error, param) {
            _log.log("websocket handle: " + result);
            if ( error !== null ) _log.log(error);
         },
         onResultParam : {}
      }
      ****************************************************************************/
      ptt.onEventPushing = function( pushParams, callback, callbackParam ) {
         var self = this;

         if ( pushParams === undefined || pushParams === null ) return;

         if ( self.pushCallback === null ) {
            self.pushCallback = callback;
            self.pushCallbackParam = callbackParam;
         }

         if ( self.pushHandle === null ) {
            _monitoring({
               url : "/cairo/monitor/event",
               params : pushParams,
               onOpen : function() {
                  self.onOpen();
               },
               onMessage : function( data ) {
                  var result = data.result;

                  if ( result.code === 1 ) {
                     self.onMessage(data);
                  }
                  else {
                     self.onError(result);
                  }
               },
               onError : self.onError,
               onClose : self.onClose,
               onResult : function( result, error ) {
                  if ( result !== null ) self.pushHandle = result.handle;
               }
            });
         }
         else {
            self.doSend(pushParams);
         }
      };

      ptt.onOpen = function() {
         console.log("## ScenarioPush >> onOpen");
      };

      ptt.onClose = function() {
         console.log("## ScenarioPush >> onClose");
      };

      ptt.onError = function( error ) {
         console.log("## ScenarioPush >> onError => "+error);
      };

      ptt.onMessage = function( data ) {
         var self = this;
         console.log("## ScenarioPush >> onMessage => "+JSON.stringify(data));

         self.pushCallback({
            tag  : data.tag,
            data : data.output
         }, self.pushCallbackParam);
      };

      ptt.doClose = function() {
         var self = this;
         console.log("## ScenarioPush >> doClose");
         self.pushHandle.close();
      };

      ptt.doSend = function( data ) {
         var self = this;
         var strData = JSON.stringify(data);
         console.log("## ScenarioPush >> doSend :: "+strData);
         self.pushHandle.send(strData);
      };

      /*********************************************************************************
       *
       *********************************************************************************/
      return ScenarioPush;

   }
);
