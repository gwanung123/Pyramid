'use strict';

define(["../../../Library/monitor.caching", "../../../Library/monitor.calc"],
   function( _caching, _calc ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {},
            },
            items  : undefined,
            columns: [],
            data: [],
            columnMenu: false
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /**
       * - parsed
       * [{"TENANT_ID":"10","GROUP_ID":"200","TEAM_ID":"2001",…}]
       */
      Grid.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Grid.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Grid.prototype.defaultData = function( bind ) {
         var self = this;
         var obj = {},
             parsed = [];

         for ( var key in bind ) {
            obj[key] = "0";
         }

         parsed.push(obj);

         return parsed;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;
      };

      Grid.prototype.getCalcData = function( arrData ) {
         var self = this;
         var bind = $.extend(true, {}, self.options.nexus.bind),
             len = arrData.length,
             result = [],
             obj = {};

         // !=
         for ( var key in bind ) {
            if ( bind[key].value === "!=DATA_LENGTH" ) obj[key] = len*1;
            else obj[key] = 0;
         }

         // data
         for ( var i=0; i<len; i++ ) {
            var data = arrData[i];

            for ( var key in bind ) {
               var val = bind[key];

               if ( val.value.indexOf("!=") >= 0 ) continue;
               if ( val.value.indexOf("@=") >= 0 ) continue;

               if ( data[val.field] === val.value ) obj[key] += 1;
            }
         }

         // @=
         for ( var key in bind ) {
            var val = bind[key];

            if ( val.value.indexOf("@=") < 0 ) continue;

            for ( var dataKey in obj ) {
               var regex = new RegExp("@="+dataKey, "g");
               val.value = val.value.replace(regex, obj[dataKey]);
            }

            obj[key] = _calc(val.value);
         }

         result.push(obj);

         return result;
      };

      Grid.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.data = self.defaultData(text.BIND);
         options.columns = text.COLUMN;
         options.columnMenu = true;
         options.scroll = false;

         options.nexus.bind = text.BIND;

         return self.options = options;
      };

      Grid.prototype.setNexusJoin = function( name, cb, cbParam ) {
         var self = this;
         var nexus = self.options.nexus;

         if ( nexus.join[name] === undefined ) {
            nexus.join[name] = [];
         }

         nexus.join[name].push({
            callback: cb,
            callbackParam: cbParam
         });
      };


      /*********************************************************************************
       * AGENT STATE
       *********************************************************************************/
      var AgentState = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            url    : "/cairo/caching/stats/agent",
            items  : undefined,
            fields : undefined,
            data: [],
            pageSize: false
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /******************************************************
       * ~ AS-IS
       * [
       *    { "AGENT_ID":"1004", "AGENT_MODE":"201", "LOGIN_ID":"10041", "CALL_TYPE":"1" },
       *    { "AGENT_ID":"1005", "AGENT_MODE":"201", "LOGIN_ID":"10042", "CALL_TYPE":"1" },
       *    { "AGENT_ID":"1006", "AGENT_MODE":"201", "LOGIN_ID":"10043", "CALL_TYPE":"1" },
       * ]
       *
       * ~ TO-BE
       * [
       *    {AgentID: "1004", AgentState:"201", LoginID:"10041", AgentMode:"1"},
       *    {AgentID: "1005", AgentState:"201", LoginID:"10042", AgentMode:"1"},
       *    {AgentID: "1006", AgentState:"201", LoginID:"10043", AgentMode:"1"},
       * ]
       ******************************************************/

      AgentState.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      AgentState.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      AgentState.prototype.setItems = function( data ) {
         var self = this;
         var len = data.length;
         var items = [];

         for ( var i=0; i<len; i++ ) {
            items.push(data[i].item);
         }

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      AgentState.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      AgentState.prototype.defaultData = function( bind ) {
         var self = this;
         var obj = {},
             parsed = [];

         for ( var key in bind ) {
            obj[key] = "0";
         }

         parsed.push(obj);

         return parsed;
      };

      AgentState.prototype.requestData = function( options, callback ) {
         var self = this;

         _caching({
            url : options.url,
            params : {
               items : options.items,
               fields: options.fields
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  callback.onResult(null, error, param);
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  callback.onResult(self.getData(output), null, param);
               }
               else {
                  callback.onResult(result, null, param);
               }
            },
            onResultParam : callback.onResultParam
         });
      };

      AgentState.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.bind = text.BIND;

         options.pageSize = text.PAGESIZE;
         options.fields = text.FIELDS;

         return self.options = options;
      };

      AgentState.prototype.setNexusJoin = function( name, cb, cbParam ) {
         var self = this;
         var nexus = self.options.nexus;

         if ( nexus.join[name] === undefined ) {
            nexus.join[name] = [];
         }

         nexus.join[name].push({
            callback: cb,
            callbackParam: cbParam
         });
      };

      /************************************************************************************

       ************************************************************************************/
      return function( tag ) {
         switch ( tag ) {
            case "AGENT_GRID": return new Grid(tag);
            case "AGENT_STATE": return new AgentState(tag);
         }
         return null;
      };

   }
);
