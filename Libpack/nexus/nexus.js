'use strict';

/****************************************************************************
 * @fileoverview    NEXUS FRAMEWORK (jQuery plugin)
 * @namespace       jquery.nexus
 * @author          NEXUS Community
 * @version         1.0.0
 * @since           2017.06
 ****************************************************************************/
(function($) {

   var _nexus = $.nexus = function( options ) {
      console.log("$.nexus");

      var result = null,
          nxapi = $.nexus.core.nxapi,
          ecode = $.nexus.core.ecode.define;

      //try {
         var checked = _nexus.checkOptions(options);

         if ( checked === "core" ) {
            var name = _nexus.getName("core", options),
                option = _nexus.getOptions(name, options);

            if ( nxapi.isNull(name) || nxapi.isNull(option) ) {
               if ( options.hasOwnProperty("onResult") ) options.onResult(ecode.eINVAILED_PARAM);
               else return ecode.eINVAILED_PARAM;
            }

            result = _nexus.coreRouter(name, option);
         }
         else if ( checked === "plugin" ) {
            var name = _nexus.getName("plugin", options),
                option = _nexus.getOptions(name, options);

            if ( nxapi.isNull(name) || nxapi.isNull(option) ) {
               if ( options.hasOwnProperty("onResult") ) options.onResult(ecode.eINVAILED_PARAM);
               else return ecode.eINVAILED_PARAM;
            }

            result = _nexus.plugins[name].router(option);
         }

         if ( result !== undefined ) {
            if ( options.hasOwnProperty("onResult") ) options.onResult(result);
            else return result;
         }
      //}
      //catch ( result ) {
      //   console.log(result);
      //   if ( options.hasOwnProperty("onResult") ) options.onResult(result);
      //   else return result;
      //}
   };

   _nexus.version = {
      author : "NEXUS Community",
      name   : "NEXUS FRAMEWORK",
      ver    : "1.0.0"
   };

   _nexus.modules = {};
   _nexus.core = {};
   _nexus.plugins = {};
   _nexus.hosts = {};

   _nexus.checkOptions = function( options ) {
      if ( options.hasOwnProperty("core") ) return "core";
      else if ( options.hasOwnProperty("plugin") ) return "plugin";
   };

   _nexus.getName = function( kind, options ) {
      return options[kind];
   };

   _nexus.getOptions = function( name, options ) {
      if( $.isArray(name) ) {

      }
      else {
         for ( var prop in options ) {
            if ( prop === name ) return options[prop];
         }
      }
      return undefined;
   };

   _nexus.coreRouter = function( name, option ) {
      var ecode = $.nexus.core.ecode.define;

      switch ( name ) {
         case "net":
            var net = new _nexus.core.net();
            net.load(option);
            break;
         case "isReady":
            var net = new _nexus.core.net();
            net.isReady(option);
            break;
         case "auth":
            _nexus.core.auth.load(option);
            break;
         case "nxapi":
            return _nexus.core.nxapi.load(option);
         case "cookie":
            return _nexus.core.cookie.load(option);
         case "cipher":
            return _nexus.core.cipher.load(option);
         case "remoteLog":
            //return _nexus.core.remoteLog.load(option);
         case "websocket":
            var ws = new _nexus.core.websocket();
            ws.load(option);
            break;
         default :
            console.log("check the nexus.js version.  (nexus framework core error)");
            return ecode.eFAILED_NEXUS_CORE;
      }
   };

   _nexus.setHosts = function( config ) {
      _nexus.hosts = config;
   };

   _nexus.getHosts = function( name ) {
      if ( !_nexus.hosts.hasOwnProperty("main") ) {
         var payload = _nexus.core.nxapi.getJWTPayload();
         _nexus.setHosts(payload.config);
      }

      if ( _nexus.hosts.hasOwnProperty(name) ) return _nexus.hosts[name];
      return null;
   };

   _nexus.addCore = function( name, constructor, isInstance ) {
      var core = constructor;
      if ( core ) {
         _nexus.core[name] = core = (isInstance === true)? new core():core;
      }
   };

   _nexus.addPlugin = function( name, constructor ) {
      var plugin = constructor;
      if ( plugin ) _nexus.plugins[name] = plugin = new plugin();
      return _nexus.plugins[name];
   };

   _nexus.addPluginSub = function( plugin_name, name, constructor ) {
      var sub = constructor,
          plugin = _nexus.plugins[plugin_name];
      if ( sub && plugin ) plugin[name] = sub = new sub();
   };

})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.ecode
 * @options
 * @description     ecode interface
 * @example
 ****************************************************************************/
(function($) {
   var _ecode = function() {
      console.log("ecode load");
   };

   var _ptt = _ecode.prototype;

   _ptt.define = {
      eSUCCESS              : { reason : 1,    description : "Success." },

      eFAILED_NEXUS_CORE    : { reason : -500, description : "nexus framework core error." },
      ePYRAMID_SERVICE_DOWN : { reason : -501, description : "Pyramid service down." },
      eAUTH_SERVICE_DOWN    : { reason : -502, description : "Authenticate service down." },
      eCUBE_SERVICE_DOWN    : { reason : -503, description : "CUBE service down." },
      eADMIN_SERVICE_DOWN   : { reason : -504, description : "Admin service down." },
      eMASTER_SERVICE_DOWN  : { reason : -505, description : "Master service down." },
      eCALL_SERVICE_DOWN    : { reason : -506, description : "Call service down." },
      eAGENT_SERVICE_DOWN   : { reason : -507, description : "Agent service down." },
      ePYRAMID_DB_DOWN      : { reason : -508, description : "Pyramid-DB service down." },
      eCUBE_DB_DOWN         : { reason : -509, description : "CUBE-DB service down." },
      eSYSTEM_DOWN          : { reason : -510, description : "System down." },
      eAJAX_ERROR           : { reason : -511, description : "Ajax send error." },

      eINVAILED_TOKEN       : { reason : -520, description : "Invailed token." },
      eINVAILED_PARAM       : { reason : -521, description : "Invailed parameters." },
      eRESPONSE_TIMEOUT     : { reason : -522, description : "Response timeout." },
      eFAILED_LOAD          : { reason : -523, description : "Failed load js." },
      eNOT_SUPPORT_WEBSOCKET: { reason : -524, description : "WebSocket NOT supported by your Browser." },
      eWEBSOCKET_ERROR      : { reason : -525, description : "WebSocket Error." },
   };


   $.nexus.modules.ecode = _ecode;
   $.nexus.addCore('ecode', $.nexus.modules.ecode, true);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.nxapi
 * @options
 * @description     nxapi interface
    ~

 * @example
    ~ < sessionStorage >
    $.nexus({
        core : "nxapi",
        nxapi : {
            config : {
               kind : "sessionStorage",
               action : "set"
            },
            params : {
               key : "key",
               val : "value"
            }
        }
    });

    ~ < localStorage >
    $.nexus({
        core : "nxapi",
        nxapi : {
            config : {
               kind : "localStorage",
               action : "set"
            },
            params : {
               key : "key",
               val : "value"
            }
        }
    });
 ****************************************************************************/
(function($, document) {
   var _nxapi = function() {
      console.log("nxapi load");
      var self = this;

      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _nxapi.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config,
          data = option.params;

      switch ( config.kind ) {
         case "sessionStorage":
         {
            switch ( config.action ) {
               case "set"  :  return self.sessionStorage.set(data.key, data.val);
               case "get"  :  return self.sessionStorage.get(data.key);
               case "del"  :  return self.sessionStorage.del(data.key);
               case "clear":  return self.sessionStorage.clear();
            }
         }
         break;

         case "localStorage":
         {
            switch ( config.action ) {
               case "set"  :  return self.localStorage.set(data.key, data.val);
               case "get"  :  return self.localStorage.get(data.key);
               case "del"  :  return self.localStorage.del(data.key);
               case "clear":  return self.localStorage.clear();
            }
         }
         break;

         case "invokeId":
         {
            switch ( config.action ) {
               case "set"  :  return self.invoke.set(data.val);
               case "get"  :  return self.invoke.get();
               case "next" :  return self.invoke.next();
               case "reset":  return self.invoke.reset();
            }
         }
         break;

         case "jwt":
         {
            var payload = self.getJWTPayload();
            if ( payload == "null" )    return self.ecode.eINVAILED_TOKEN;

            return payload[data.key];
         }

         default:
            console.log("[nxapi] option property invalid - " + config.kind);
      }

      return self.ecode.eINVAILED_PARAM;
   };

   _ptt.getTime = function() {
      var date = new Date(),
          str = "[" + date.getHours() + ":" +
                date.getMinutes() + ":" +
                date.getSeconds() + "." +
                date.getMilliseconds() + "]";
      return str;
   };

   _ptt.isNull = function( arg ) {
      if ( arg === "" )        return true;
      if ( arg === undefined ) return true;
      if ( arg === null )      return true;
      if ( arg === "null" )    return true;
      return false;
   };

   _ptt.sessionStorage = {
      set   : function( key, value ) {
         if ( typeof(value) !== "string" ) value = JSON.stringify(value);
         sessionStorage.setItem(key, value);
      },
      get   : function( key )        {
         var item = sessionStorage.getItem(key);
         try { return JSON.parse(item); }
         catch ( error ) { return item; }
      },
      del   : function( key )        { sessionStorage.removeItem(key); },
      clear : function()             { sessionStorage.clear(); }
   };

   _ptt.localStorage = {
      set   : function( key, value ) {
         if ( typeof(value) !== "string" ) value = JSON.stringify(value);
         localStorage.setItem(key, value);
      },
      get   : function( key )        {
         var item = localStorage.getItem(key);
         try { return JSON.parse(item); }
         catch ( error ) { return item; }
      },
      del   : function( key )        { localStorage.removeItem(key); },
      clear : function()             { localStorage.clear(); }
   };

   _ptt.href = function( url ) {
      document.location.href = url;
   };

   _ptt.redirection = function( url ) {
      document.location.replace(url);
   };

   _ptt.getJWTPayload = function() {
      var access_token = this.sessionStorage.get("nexus_access_token"),
          tokens = [],
          payload;

      if ( this.isNull(access_token) ) return null;

      tokens = access_token.split(".");

      payload = $.nexus({
         core : "cipher",
         cipher : {
            config : {
               kind : "base64",
               action : "decode"
            },
            params : tokens[1]
         }
      });

      return JSON.parse(payload);
   };

   _ptt.nxhost = {
      caching : {},
      set : function( url, hosts, active ) {
         this.caching[url] = {
            hosts : hosts,
            active : active
         };
      },
      get : function( url, name ) {
         var cached = this.caching[url];
         if ( cached !== undefined ) {
            switch ( name ) {
               case "hosts": return cached.hosts;
               case "active": return cached.active;
            }
         }
         return cached;
      },
      del : function( url ) {
         delete this.caching[url];
      }
   };

   _ptt.nxinvoke = {
      invokeId : {
         id  : 0,
         MAX : 1457664,
         MIN : 0
      },
      set : function( val ) {
         this.invokeId.id = val;
      },
      get : function()      {
         return this.invokeId.id;
      },
      next : function()      {
         if ( this.invokeId.id >= this.invokeId.MAX ) this.invokeId.id = this.invokeId.MIN;
         else return this.invokeId.id++;
      },
      reset : function()      {
         this.invokeId.id = this.invokeId.MIN;
      }
   };


   $.nexus.modules.nxapi = _nxapi;
   $.nexus.addCore('nxapi', $.nexus.modules.nxapi, true);
})(jQuery, document);


/****************************************************************************
 * @namespace       jquery.nexus.modules.nxlog
 * @options
 * @description     nxlog interface
 * @example
 ****************************************************************************/
(function($) {
   var _nxlog = function() {
      console.log("nxlog load");
      var self = this;
   };

   _nxlog.memory = {
      DEFAULT_REMOTE_LOG_URL : "/cairo/log",
      hosts : [],
      url : null,
      isReady : null
   };

   _nxlog.setConfig = function( config ) {
      _nxlog.memory.hosts = config.hosts;
      _nxlog.memory.url = config.url || _nxlog.memory.DEFAULT_REMOTE_LOG_URL;
      _nxlog.memory.isReady = config.isReady;
      $.nexus.core.nxapi.nxhost.set(_nxlog.memory.url, _nxlog.memory.hosts, null);
   };

   _nxlog.log = function( message ) {
      var nxapi = $.nexus.core.nxapi;
      console.log(nxapi.getTime() + " " + message);
   };

   _nxlog.remoteLog = function( message ) {
      if ( _nxlog.memory.hosts.length > 0 ) {
         $.nexus({
            core : "net",
            net : {
               config : {
                  hosts : _nxlog.memory.hosts,
                  url : _nxlog.memory.url,
                  isReady : _nxlog.memory.isReady
               },
               params : { message : message },
               onResult : function(result, error, param) {
                  _nxlog.log(message);
                  if ( error !== null ) _nxlog.log(error);
               }
            }
         });
      }
      else {
         _nxlog.log(message);
      }
   };

   var _ptt = _nxlog.prototype;


   $.nexus.modules.nxlog = _nxlog;
   $.nexus.addCore('nxlog', $.nexus.modules.nxlog, false);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.net
 * @options
    ~ url           (required)
    ~ hosts         (required)
    ~ onResult      (required)
    ~ onResultParam (optional)

 * @description     network interface
    ~

 * @example
    ~ < default >
    $.nexus({
        core : "net",
        net : {
            config : {
               hosts : ["10.10.30.10:7070"],
               url : "/cairo/auth",
               isReady : "/cairo/isReady"
            },
            params : {},
            onResult : function(result, error, param) {},
            onResultParam : {}
        }
    });

    ~ < isReady >
    $.nexus({
        core : "isReady",
        isReady : {
            config : {
               hosts : ["10.10.30.10:7070"],
               url : "/cairo/isReady"
            },
            onResult : function(result, error, param) {},
            onResultParam : {}
        }
    });
 ****************************************************************************/
(function($) {
   var _net = function() {
      console.log("net load");
      var self = this;

      self.ecode = $.nexus.core.ecode.define;
      self.log = $.nexus.core.nxlog.remoteLog;
      self.nxapi = $.nexus.core.nxapi;

      self.DEFAULT_OPTIONS = {
         url : "",
         type : "POST",
         crossDomain : true,
         withCredentials: true,
         dataType : "json",
         cache : false,
         timeout : 30000,
         async : true,
         data : "",

         beforeSend : null,
         success    : null,
         error      : null,
         complete   : null
      };

      self.memory = {
         DEFAULT_ISREADY_URL : "/cairo/isReady"
      };
   };

   var _ptt = _net.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var hosts = option.config.hosts,
          url = option.config.url,
          isReady = option.config.isReady || self.memory.DEFAULT_ISREADY_URL,
          active = self.nxapi.nxhost.get(url, "active"),
          reqOpt = self.ajaxOption(option);

      if ( hosts.length === 1 ) {
         self.nxapi.nxhost.set(url, hosts, hosts[0]);
         active = hosts[0];
      }

      if ( self.nxapi.isNull(active) ) {
         self.checkReady(hosts, isReady, function(result) {
            if ( result.reason !== self.ecode.eSUCCESS.reason ) {
               if ( option.hasOwnProperty("onResult") ) option.onResult(null, result, option.onResultParam);
            }
            else {
               self.nxapi.nxhost.set(url, hosts, result.host);
               if ( option.config.https === true ) {
                  reqOpt.url = "https://" + result.host + url;
               }
               else {
                  reqOpt.url = "http://" + result.host + url;
               }
               self.doAjax(reqOpt, result.host);
            }
         });
      }
      else {
         if ( option.config.https === true ) {
            reqOpt.url = "https://" + active + url;
         }
         else {
            reqOpt.url = "http://" + active + url;
         }
         self.doAjax(reqOpt, active);
      }
   };

   _ptt.isReady = function( option ) {
      var self = this;
      var hosts = option.config.hosts,
          url = option.config.url || self.memory.DEFAULT_ISREADY_URL;

      self.checkReady(hosts, url, function(result) {
         if ( result.reason !== self.ecode.eSUCCESS.reason ) {
            if ( option.hasOwnProperty("onResult") ) option.onResult(null, result, option.onResultParam);
         }
         else {
            if ( option.hasOwnProperty("onResult") ) option.onResult(result, null, option.onResultParam);
         }
      });
   };

   _ptt.checkReady = function( hosts, url, callback ) {
      var self = this;
      var deferreds = [];

      hosts.forEach(function( host ) {
         var deferred = $.Deferred();

         deferreds.push(deferred);
         self.onIsReady(host, url, (function(deferred) {
            return function(data) {
               deferred.resolve(data);
            };
         })(deferred));
      });

      $.when.apply($, deferreds).then(function () {
         var result = self.ecode.eINVAILED_PARAM;
         for ( var index = 0; index < arguments.length; index++ ) {
            result = arguments[index];
            if ( result.reason === self.ecode.eSUCCESS.reason ) {
               self.log(">> checkReady : " + result.host);
               break;
            }
         }
         callback(result);
      });
   };

   _ptt.onIsReady = function( host, url, callback ) {
      var self = this;
      var reqOpt = self.ajaxOption({
         config : {
            type : "GET",
            url : "http://" + host + url
         },
         onResult : function( res, res_err, param ) {
            var result = res;
            if ( res_err !== null ) result = res_err;
            callback(result);
         }
      });

      self.doAjax(reqOpt, host);
   };

   _ptt.ajaxOption = function( option ) {
      var self = this,
          config = option.config,
          params = option.params,
          reqOpt = $.extend(true, reqOpt, this.DEFAULT_OPTIONS);

      reqOpt.url  = config.url;
      if ( params !== undefined ) reqOpt.data = JSON.stringify(params);
      if ( config.type !== undefined ) reqOpt.type = config.type;
      if ( config.async !== undefined ) reqOpt.async = config.async;

      reqOpt.beforeSend = function( jqXHR, settings ) {
         var access_token = self.nxapi.sessionStorage.get("nexus_access_token");
         //self.log(">> S] beforeSend : " + access_token);
         if ( !self.nxapi.isNull(access_token) ) {
            jqXHR.setRequestHeader("Authorization", "Bearer " + access_token);
         }
      };

      reqOpt.success = function( data, textStatus, jqXHR ) {
         self.log(">> R] success : " + config.url);
         data.host = reqOpt.host;
         if ( option.hasOwnProperty("onResult") ) option.onResult(data, null, option.onResultParam);
      };

      reqOpt.error = function( jqXHR, textStatus, message ) {
         self.log(">> R] error : " + config.url + " : " + message);
         self.nxapi.nxhost.del(config.url);
         var result = {
            host : reqOpt.host,
            reason : self.ecode.eAJAX_ERROR,
            description : message
         };
         if ( option.hasOwnProperty("onResult") ) option.onResult(null, result, option.onResultParam);
      };

      return reqOpt;
   };

   _ptt.doAjax = function( reqOpt, host ) {
      var self = this;
      self.log(">> ajax request : " + reqOpt.url);
      reqOpt.host = host;
      $.support.cors = true;
      $.ajax(reqOpt);
   };


   $.nexus.modules.net = _net;
   $.nexus.addCore('net', $.nexus.modules.net, false);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.websocket
 * @options
    ~ url           (required)
    ~ host          (required)
    ~ onResult      (required)
    ~ onResultParam (optional)

 * @description     network interface
    ~

 * @example
    ~ < default >
    $.nexus({
        core : "websocket",
        websocket : {
            config : {
               hosts : ["10.10.30.10:8888"],
               url : "/cairo/real",
               isReady : "/cairo/isReady"
            },
            params : {},
            onOpen : function(param) {},
            onMessage : function(data, param) {},
            onClose : function(param) {},
            onResult : function(handle, error, param) {},
            onResultParam : {}
        }
    });

    ~ < send >
    handle.onSend(message);
 ****************************************************************************/
(function($, window) {
   var _websocket = function() {
      console.log("auth load");
      var self = this;

      self.ecode = $.nexus.core.ecode.define;
      self.log = $.nexus.core.nxlog.remoteLog;
      self.nxapi = $.nexus.core.nxapi;

      self.memory = {
         WSHandle : null
      };
   };

   var _ptt = _websocket.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config,
          result = null,
          url = null;

      if ( config.hosts.length === 1 ) {
         self.nxapi.nxhost.set(config.url, config.hosts, config.hosts[0]);
         url = "ws://" + config.hosts[0] + config.url;
         result = self.doWebsocket(url, option);
         if ( option.hasOwnProperty("onResult") ) {
            if ( result.reason === self.ecode.eSUCCESS.reason ) {
               result.handle = self.memory.WSHandle;
               option.onResult(result, null, option.onResultParam);
            }
            else
               option.onResult(null, result, option.onResultParam);
         }
         return;
      }

      $.nexus({
         core : "isReady",
         isReady : {
            config : {
               hosts : config.hosts,
               url : config.isReady
            },
            onResult : function(res, error, param) {
               if ( error !== null ) {
                  if ( option.hasOwnProperty("onResult") ) {
                     option.onResult(null, error, param);
                  }
               }
               else {
                  self.nxapi.nxhost.set(config.url, config.hosts, res.host);
                  url = "ws://" + res.host + config.url;
                  result = self.doWebsocket(url, option);
                  if ( option.hasOwnProperty("onResult") ) {
                     if ( result.reason === self.ecode.eSUCCESS.reason ) {
                        result.handle = self.memory.WSHandle;
                        option.onResult(result, null, param);
                     }
                     else
                        option.onResult(null, result, option.onResultParam);
                  }
               }
            }
         }
      });

      return;
   };

   _ptt.doWebsocket = function( url, option ) {
      var self = this;
      var result = self.ecode.eSUCCESS;

      if ( "WebSocket" in window ) {
         self.log("WebSocket is supported by your Browser!");

         self.memory.WSHandle = new WebSocket(url);

         //Close the socket when the browser window is closed.
         window.onbeforeunload = function() {
            self.doClose();
         };

         self.memory.WSHandle.onopen = function() {
            self.log("[WebSocket] open!");
            self.onOpen(option);
            if ( option.params !== undefined ) self.doSend(option.params);
         };

         self.memory.WSHandle.onmessage = function( evt ) {
            self.log("[WebSocket] Message is received!");
            //self.log("[WebSocket] R> "+evt.data);
            self.onMessage(JSON.parse(evt.data), option);
         };

         self.memory.WSHandle.onerror = function( evt ) {
            self.log("[WebSocket] Connection is error!");
            self.onError(evt.data, option);
            result = self.ecode.eWEBSOCKET_ERROR;
         };

         self.memory.WSHandle.onclose = function() {
            self.log("[WebSocket] Connection is closed!");
            self.onClose(option);
         };
      }
      else {
         self.log("WebSocket NOT supported by your Browser!");
         result = self.ecode.eNOT_SUPPORT_WEBSOCKET;
      }

      return result;
   };

   _ptt.onOpen = function( option ) {
      if ( option.onOpen !== undefined ) option.onOpen(option.onResultParam);
   };

   _ptt.onMessage = function( data, option ) {
      if ( option.onMessage !== undefined ) option.onMessage(data, option.onResultParam);
   };

   _ptt.onError = function( error, option ) {
      if ( option.onError !== undefined ) option.onError(error, option.onResultParam);
   };

   _ptt.onClose = function( option ) {
      if ( option.onClose !== undefined ) option.onClose(option.onResultParam);
   };

   _ptt.doSend = function( message ) {
      var self = this;
      self.memory.WSHandle.send(JSON.stringify(message));
   };

   _ptt.doClose = function() {
      var self = this;
      self.memory.WSHandle.close();
   };


   $.nexus.modules.websocket = _websocket;
   $.nexus.addCore('websocket', $.nexus.modules.websocket, false);
})(jQuery, window);


/****************************************************************************
 * @namespace       jquery.nexus.modules.auth
 * @options
    ~ mainHost      (required)
    ~ authHost      (required)
    ~ rlogHost      (optional)
    ~ nextUrl       (optional)
    ~ expired       (optional)

 * @description     auth interface
    ~ rlogHost 가 없을 경우 서버에 client log를 남기지 않는다.
    ~ nextUrl 은 host 정보가 없을 경우 mainHost 정보를 따라간다.
    ~ config 정보는 token 정보에 포함된다.
    ~ token 정보는 sessionStorage 정보(or localStorage 정보)에 포함된다.
    ~ expired 는 발행된 token의 유효 시간을 의미한다.(sec)

 * @example
    ~ < default >
    $.nexus({
         core : "auth",
         auth : {
            config : {
               expired : 0,
               main : {
                  hosts : ["10.10.30.10:8080"],
                  url : "/lynn/cairo.html",
                  isReady : "/cairo/isReady"
               },
               push : {
                  hosts : ["10.10.30.10:9090"],
                  url : "/cairo/stats/route",
                  isReady : "/cairo/isReady"
               },
               log : {
                  hosts : ["10.10.30.10:6060"],
                  url : "/cairo/log",
                  isReady : "/cairo/isReady"
               },
               auth : {
                  hosts : ["10.10.30.10:7070"],
                  url : "/cairo/auth",
                  isReady : "/cairo/isReady"
               }
            },
            params : {
               id : "1005",
               password : "1"
            },
            onResult : function(result, error, param) {},
            onResultParam : {}
         }
    });
 ****************************************************************************/
(function($) {
   var _auth = function() {
      console.log("auth load");
      var self = this;

      self.ecode = $.nexus.core.ecode.define;
      self.nxlog = $.nexus.core.nxlog;
      self.log = self.nxlog.remoteLog;
      self.nxapi = $.nexus.core.nxapi;
      self.sessionStorage = self.nxapi.sessionStorage;

      self.memory = {
         DEFAULT_AUTHENTICATE_URL : "/cairo/auth"
      };
   };

   var _ptt = _auth.prototype;

   _ptt.load = function( option ) {
      var self = this;

      if ( !option.hasOwnProperty("config") || !option.hasOwnProperty("params") ) {
         if ( option.hasOwnProperty("onResult") )
            option.onResult(null, self.ecode.eINVAILED_PARAM, option.onResultParam);
      }

      self.doAuthenticate(option);
   };

   _ptt.doAuthenticate = function( option ) {
      var self = this;
      var config = option.config,
          params = option.params,
          auth = config.auth;

      self.sessionStorage.set("nexus_access_token", "");
      self.nxlog.setConfig(config.log);

      if ( auth.url === undefined ) auth.url = self.memory.DEFAULT_AUTHENTICATE_URL;

      $.nexus({
         core : "net",
         net : {
            config : {
               //https : true,
               hosts : auth.hosts,
               url : auth.url,
               isReady : auth.isReady
            },
            params : {
               config : config,
               params : params
            },
            onResult : function(res, error, param) {
               var isReady = false;

               if ( error === null && res.result.code === 1 ) {
                  self.nxapi.nxhost.set(auth.url, auth.hosts, res.host);
                  self.sessionStorage.set("nexus_access_token", res.access_token);
                  isReady = self.doNextUrl(option, param);
               }

               if ( !isReady && option.hasOwnProperty("onResult") ) {
                  option.onResult(res.result, error, param);
               }
            },
            onResultParam : option.onResultParam
         }
      });
   };

   _ptt.doNextUrl = function( option, param ) {
      var self = this;
      var main = option.config.main,
          isReady = option.config.isReady,
          result = self.ecode.eSUCCESS,
          url = null;

      if ( self.nxapi.isNull(main.url) ) return false;

      if ( main.hosts.length === 1 ) {
         self.nxapi.nxhost.set(main.url, main.hosts, main.hosts[0]);
         url = "http://" + main.hosts[0] + main.url;
         //$.nexus.core.nxapi.redirection(main.url);
         $.nexus.core.nxapi.href(url);
         if ( option.hasOwnProperty("onResult") ) {
            option.onResult(result, null, param);
         }
         return true;
      }

      $.nexus({
         core : "isReady",
         isReady : {
            config : {
               hosts : main.hosts,
               url : isReady
            },
            onResult : function(result, error, param) {
               if ( error !== null ) {
                  if ( option.hasOwnProperty("onResult") ) {
                     option.onResult(result, error, param);
                  }
               }
               else {
                  self.nxapi.nxhost.set(main.url, main.hosts, result.host);
                  url = "http://" + result.host + main.url;
                  //$.nexus.core.nxapi.redirection(url);
                  $.nexus.core.nxapi.href(url);
                  if ( option.hasOwnProperty("onResult") ) {
                     option.onResult(result, null, param);
                  }
               }
            }
         }
      });
      return true;
   };


   $.nexus.modules.auth = _auth;
   $.nexus.addCore('auth', $.nexus.modules.auth, true);
})(jQuery);


/****************************************************************************
 * @namespace       jquery.nexus.modules.cipher
 * @options
    ~ kind          (required)
    ~ action        (required)

 * @description     cipher interface
    ~

 * @example
    ~ < default >
    $.nexus({
        core : "cipher",
        cipher : {
            config : {
               kind : "base64",
               action : "encode"
            },
            params : ""
        }
    });
 ****************************************************************************/
(function($, window) {
   var _cipher = function() {
      console.log("cipher load");
      var self = this;

      self.log = $.nexus.core.nxlog.remoteLog;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _cipher.prototype;

   _ptt.load = function( option ) {
      var self = this;
      var config = option.config,
          data = option.params;

      switch ( config.kind ) {
         case "base64" :
            {
               switch ( config.action ) {
                  case "encode":  return self.encodeB64(data);
                  case "decode":  return self.decodeB64(data);
               }
            }
            break;

         default :
            console.log("[cipher] option property invalid - " + config.kind);
      }

      return self.ecode.eINVAILED_PARAM;
   };

   _ptt.loadScript = function() {
      var self = this;

   };

   _ptt.encodeB64 = function( txt ) {
      return window.btoa(unescape(encodeURIComponent(txt)));
   };

   _ptt.decodeB64 = function( txt ) {
      return decodeURIComponent(escape(window.atob(txt)));
   };


   $.nexus.modules.cipher = _cipher;
   $.nexus.addCore('cipher', $.nexus.modules.cipher, true);
})(jQuery, window);


/****************************************************************************
 * @namespace       jquery.nexus.modules.cookie
 * @options
 * @description     cookie interface
    ~ expire(만료시기) option은 1day = 1, 2day = 2
    ~ remove는 write option과 동일하게 해야 삭제가 가능하다 (path option)

 * @example
    ~ < write >
    $.nexus({
        core : "cookie",
        cookie : {
            write : [{ "key1" : value1, "key2" : value2 }, { expires : 7, path : '/' } ]
        }
    });

    ~ < read >
    $.nexus({
        core : "cookie",
        cookie : {
            read : ["key1", "key2"]
        }
    });

    $.nexus({
        core : "cookie",
        cookie : {
            read : []
        }
    });

    ~ < remove >
    $.nexus({
        core : "cookie",
        cookie : {
            remove : ["key1", "key2"]
        }
    });
 ****************************************************************************/
(function($, document) {
   var _cookie = function() {
      console.log("cookie load");
      var self = this;

      self.nxapi = $.nexus.core.nxapi;
      self.ecode = $.nexus.core.ecode.define;
   };

   var _ptt = _cookie.prototype;

   _ptt.load = function( option ) {
      var self = this;

      for ( var prop in option ) {
         var arrValue = option[prop],
             result = null;

         if ( self.nxapi.isNull(arrValue) || !$.isArray(arrValue) )
            return self.ecode.eINVAILED_PARAM;

         switch ( prop ) {
            case "write" : result = self.writeCookie(arrValue);
               break;
            case "read"  : return self.readCookie(arrValue);

            case "remove": result = self.removeCookie(arrValue);
               break;
            default      :
               console.log("[cookie] option property invalid - " + prop);
               break;
         }

         if ( result !== null ) return result;
      }

      return self.ecode.eINVAILED_PARAM;
   };

   _ptt.writeCookie = function( arrValue ) {
      var self = this,
          objCookie = arrValue[0],
          objOption = arrValue[1];

      if ( self.nxapi.isNull(objCookie) || typeof objCookie !== 'object' ) {
         console.log("[cookie] write : [first Object, ...] error");
         return self.ecode.eINVAILED_PARAM;
      }
      if ( self.nxapi.isNull(objOption) || typeof objOption !== 'object' ) {
         console.log("[cookie] write : [..., seconds Object] error");
         return self.ecode.eINVAILED_PARAM;
      }

      objOption = $.extend(true, {}, objOption);

      for ( var prop in objCookie ) {
         var key = prop,
             value = objCookie[prop];

         if ( value === null ) objOption.expires = -1;

         if ( typeof objOption.expires === 'number' ) {
            var days = objOption.expires,
                date = objOption.expires = new Date();
            date.setDate(date.getDate() + days);
         }

         var cookie = [
            encodeURIComponent(key), '=', encodeURIComponent(value),
            objOption.expires ? '; expires=' + objOption.expires.toUTCString() : ''
         ].join('');

         document.cookie = cookie;
      }
   };

   _ptt.readCookie = function( arrValue ) {
      var self = this,
          arrCookie = document.cookie.split("; ");

      var arrValueLength = arrValue.length,
          arrCookieLength = arrCookie.length,
          result = null;

      if ( arrValueLength === 0 ) {  //전체 read 요청일 경우
         result = {};
         for ( var i=0; i<arrCookieLength; i++ ) {
            var parts = arrCookie[i].split('='),
                name = self._decoded(parts.shift()),
                cookie = self._decoded(parts.join('='));

            result[name] = cookie;
         }
      }
      else {
         result = {};
         for ( var j=0; j<arrValueLength; j++ ) {
            var key = arrValue[j];

            for ( var i=0; i<arrCookieLength; i++ ) {
               var parts = arrCookie[i].split('='),
                   name = self._decoded(parts.shift()),
                   cookie = self._decoded(parts.join('='));

               if ( key && key === name ) result[name] = cookie;
            }
         }
      }

      return result;
   };

   //처음 write에 옵션이 있었다면 remove에도 옵션이 같아야한다.
   _ptt.removeCookie = function( arrValue ) {
      var self = this,
          arrValueLength = arrValue.length,
          objRemove = {};

      for ( var item in arrValue ) {
         var key = arrValue[item];
         objRemove[key] = null;
      }

      arrValue = [];
      arrValue[0] = objRemove;
      arrValue[1] = {};
      self.writeCookie(arrValue);
   };

   _ptt._decoded = function( s ) {
      var self = this,
          pluses = /\+/g;
      return self._unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
   };

   _ptt._unRfc2068 = function( value ) {
      if ( value.indexOf('"') === 0 ) {
         value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      }
      return value;
   };


   $.nexus.modules.cookie = _cookie;
   $.nexus.addCore('cookie', $.nexus.modules.cookie, true);
})(jQuery, document);
