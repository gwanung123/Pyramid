'use strict';

/****************************************************************************
 * @fileoverview    NEXUS PLUGIN (jQuery plugin)
 * @namespace       redis
 * @author          NEXUS Community
 * @version         1.0.0
 * @since           2017.06
 ****************************************************************************/
if ( $ === undefined ) alert("Check import jQuery");
else if ( $.nexus === undefined ) alert("Check import nexus.js");

var _modules_root_redis;
var _plugin_root_redis;
/****************************************************************************
 * @namespace       jquery.nexus.modules.redis
 * @options
 * @description     redis interface
 * @example
 ****************************************************************************/
(function($) {
   var _redis = function() {
      console.log("[plugin] redis load");
   };

   var _ptt = _redis.prototype;

   _ptt.version = {
      author : "NEXUS Community",
      name   : "NEXUS PLUGIN - redis",
      ver    : "1.0.0"
   };

   _ptt.router = function(option) {
      var action = option.config.action;

      switch ( action ) {
         case "read"   : _plugin_root_redis.reader.load(option);  break;
         case "save"   : _plugin_root_redis.saver.load(option);   break;
         case "remove" : _plugin_root_redis.remover.load(option); break;
      }
   };


   _modules_root_redis = $.nexus.modules.redis = _redis;
   _plugin_root_redis = $.nexus.addPlugin("redis", $.nexus.modules.redis);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.redis.read
 * @options
    ~ action        (required)

 * @description     redis interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _reader = function() {
      console.log("[redis] reader load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _reader.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config;

      self.onRead(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "redis",
        redis : {
            config : {
               url : "/cairo/caching/master/agent",
               action : "read"
            },
            params : {
               items : [],
               fields : []
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onRead = function( url, isReady, option ) {
      var self = this;

      self.log("redis:: onRead : " + url);

      if ( option.params === undefined ) option.params = {};

      $.nexus({
         core : "net",
         net : {
            config : {
               hosts : $.nexus.getHosts("main").hosts,
               url : url,
               isReady : isReady
            },
            params : option.params,
            onResult : option.onResult,
            onResultParam : option.onResultParam
         }
      });
   };


   _modules_root_redis.reader = _reader;
   $.nexus.addPluginSub("redis", "reader", _modules_root_redis.reader);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.redis.save
 * @options
    ~ action        (required)

 * @description     redis interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _saver = function() {
      console.log("[redis] saver load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _saver.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config;

      self.onSave(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "redis",
        redis : {
            config : {
               url : "/cairo/cachingExe/agent/save",
               action : "save"
            },
            params : {
               item : "",
               values : []
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onSave = function( url, isReady, option ) {
      var self = this;

      self.log("redis:: onSave : " + url);

      if ( option.params === undefined ) option.params = {};

      $.nexus({
         core : "net",
         net : {
            config : {
               hosts : $.nexus.getHosts("main").hosts,
               url : url,
               isReady : isReady
            },
            params : option.params,
            onResult : option.onResult,
            onResultParam : option.onResultParam
         }
      });
   };


   _modules_root_redis.saver = _saver;
   $.nexus.addPluginSub("redis", "saver", _modules_root_redis.saver);
})(jQuery);



/****************************************************************************
 * @namespace       jquery.nexus.modules.redis.remove
 * @options
    ~ action        (required)

 * @description     redis interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _remover = function() {
      console.log("[redis] remover load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _remover.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config;

      self.onRemove(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "redis",
        redis : {
            config : {
               url : "/cairo/cachingExe/agent/remove",
               action : "remove"
            },
            params : {
               item : "",
               fields : []
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onRemove = function( url, isReady, option ) {
      var self = this;

      self.log("redis:: onRemove : " + url);

      if ( option.params === undefined ) option.params = {};

      $.nexus({
         core : "net",
         net : {
            config : {
               hosts : $.nexus.getHosts("main").hosts,
               url : url,
               isReady : isReady
            },
            params : option.params,
            onResult : option.onResult,
            onResultParam : option.onResultParam
         }
      });
   };


   _modules_root_redis.remover = _remover;
   $.nexus.addPluginSub("redis", "remover", _modules_root_redis.remover);
})(jQuery);