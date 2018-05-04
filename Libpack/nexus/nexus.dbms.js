'use strict';

/****************************************************************************
 * @fileoverview    NEXUS PLUGIN (jQuery plugin)
 * @namespace       dbms
 * @author          NEXUS Community
 * @version         1.0.0
 * @since           2017.06
 ****************************************************************************/
if ( $ === undefined ) alert("Check import jQuery");
else if ( $.nexus === undefined ) alert("Check import nexus.js");

var _modules_root_dbms;
var _plugin_root_dbms;
/****************************************************************************
 * @namespace       jquery.nexus.modules.dbms
 * @options
 * @description     dbms interface
 * @example
 ****************************************************************************/
(function($) {
   var _dbms = function() {
      console.log("[plugin] dbms load");
   };

   var _ptt = _dbms.prototype;

   _ptt.version = {
      author : "NEXUS Community",
      name   : "NEXUS PLUGIN - dbms",
      ver    : "1.0.0"
   };

   _ptt.router = function(option) {
      var action = option.config.action;

      switch ( action ) {
         case "select": _plugin_root_dbms.select.load(option); break;
         case "insert": _plugin_root_dbms.insert.load(option); break;
         case "update": _plugin_root_dbms.update.load(option); break;
         case "delete": _plugin_root_dbms.delete.load(option); break;
      }
   };


   _modules_root_dbms = $.nexus.modules.dbms = _dbms;
   _plugin_root_dbms = $.nexus.addPlugin("dbms", $.nexus.modules.dbms);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.dbms.select
 * @options
    ~ action        (required)

 * @description     dbms interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _select = function() {
      console.log("[dbms] select load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _select.prototype;

   _ptt.load = function( option ) {
      var self = this,
          config = option.config;

      self.onSelect(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "dbms",
        dbms : {
            config : {
               url : "/cairo/selector/master/agent",
               action : "select"
            },
            params : {
               query: ""
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onSelect = function( url, isReady, option ) {
      var self = this;

      self.log("dbms:: onSelect : " + url);

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


   _modules_root_dbms.select = _select;
   $.nexus.addPluginSub("dbms", "select", _modules_root_dbms.select);
})(jQuery);



/****************************************************************************
 * @namespace       jquery.nexus.modules.dbms.insert
 * @options
    ~ action        (required)

 * @description     dbms interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _insert = function() {
      console.log("[dbms] insert load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _insert.prototype;

   _ptt.load = function( option ) {
      var self = this,
          config = option.config;

      self.onInsert(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "dbms",
        dbms : {
            config : {
               url : "/cairo/admin/master/agent",
               action : "insert"
            },
            params : {
               query: ""
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onInsert = function( url, isReady, option ) {
      var self = this;

      self.log("dbms:: onInsert : " + url);

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


   _modules_root_dbms.insert = _insert;
   $.nexus.addPluginSub("dbms", "insert", _modules_root_dbms.insert);
})(jQuery);



/****************************************************************************
 * @namespace       jquery.nexus.modules.dbms.update
 * @options
    ~ action        (required)

 * @description     dbms interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _update = function() {
      console.log("[dbms] update load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _update.prototype;

   _ptt.load = function( option ) {
      var self = this,
          config = option.config;

      self.onUpdate(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "dbms",
        dbms : {
            config : {
               url : "/cairo/admin/master/agent",
               action : "update"
            },
            params : {
               query: ""
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onUpdate = function( url, isReady, option ) {
      var self = this;

      self.log("dbms:: onUpdate : " + url);

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


   _modules_root_dbms.update = _update;
   $.nexus.addPluginSub("dbms", "update", _modules_root_dbms.update);
})(jQuery);



/****************************************************************************
 * @namespace       jquery.nexus.modules.dbms.delete
 * @options
    ~ action        (required)

 * @description     dbms interface
    ~

 * @example
    ~
 ****************************************************************************/
(function($) {
   var _delete = function() {
      console.log("[dbms] delete load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _delete.prototype;

   _ptt.load = function( option ) {
      var self = this,
          config = option.config;

      self.onDelete(config.url, config.isReady, option);
   };

   /****************************************************************************
    $.nexus({
        plugin : "dbms",
        dbms : {
            config : {
               url : "/cairo/admin/master/agent",
               action : "delete"
            },
            params : {
               query: ""
            },
            onResult : function(result, error, param) {
               _log.log(message);
               if ( error !== null ) _log.log(error);
            },
            onResultParam : {}
        }
    });
    ****************************************************************************/

   _ptt.onDelete = function( url, isReady, option ) {
      var self = this;

      self.log("dbms:: onDelete : " + url);

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


   _modules_root_dbms.delete = _delete;
   $.nexus.addPluginSub("dbms", "delete", _modules_root_dbms.delete);
})(jQuery);
