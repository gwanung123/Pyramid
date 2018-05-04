'use strict';

/****************************************************************************
 * @fileoverview    NEXUS PLUGIN (jQuery plugin)
 * @namespace       ws
 * @author          NEXUS Community
 * @version         1.0.0
 * @since           2017.06
 ****************************************************************************/
if ( $ === undefined ) alert("Check import jQuery");
else if ( $.nexus === undefined ) alert("Check import nexus.js");

var _modules_root_ws;
var _plugin_root_ws;
/****************************************************************************
 * @namespace       jquery.nexus.modules.ws
 * @options
 * @description     ws interface
 * @example
 ****************************************************************************/
(function($) {
   var _ws = function() {
      console.log("[plugin] ws load");
   };

   var _ptt = _ws.prototype;

   _ptt.version = {
      author : "NEXUS Community",
      name   : "NEXUS PLUGIN - websocket",
      ver    : "1.0.0"
   };

   _ptt.router = function(option) {
      var self = this;
      _plugin_root_ws.register.load(option);
   };


   _modules_root_ws = $.nexus.modules.ws = _ws;
   _plugin_root_ws = $.nexus.addPlugin("ws", $.nexus.modules.ws);
})(jQuery);



/****************************************************************************
 * @namespace       jquery.nexus.modules.ws.register
 * @options
    ~ action        (required)

 * @description     ws interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _register = function() {
      console.log("[ws] register load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _register.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config;

      self.onRegister(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "ws",
        ws : {
            config : {
               url : "/cairo/monitor/stats/route"
            },
            params : {
               items : [],
               fields : []
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
    });
    ****************************************************************************/

   _ptt.onRegister = function( url, isReady, option ) {
      var self = this;

      self.log("ws:: onRegister : " + url);

      if ( option.params === undefined ) option.params = {};

      $.nexus({
         core : "websocket",
         websocket : {
            config : {
               hosts : $.nexus.getHosts("push").hosts,
               url : url,
               isReady : isReady
            },
            params : option.params,
            onOpen : option.onOpen,
            onMessage : option.onMessage,
            onError : option.onError,
            onClose : option.onClose,
            onResult : option.onResult,
            onResultParam : option.onResultParam
         }
      });
   };


   _modules_root_ws.register = _register;
   $.nexus.addPluginSub("ws", "register", _modules_root_ws.register);
})(jQuery);