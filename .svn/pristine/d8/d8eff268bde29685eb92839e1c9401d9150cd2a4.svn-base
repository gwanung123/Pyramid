'use strict';

define(["../../../Library/campaign.dbms"],
   function( _DBMS ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               dbms: undefined,
               bind: undefined,
               items: undefined,
               join: {},

               pk: [],
               schema: {}
            },
            url    : "",
            query  : "",
            args   : [],
            items  : undefined,
            fields : undefined,
            columns: [],
            data: []
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /**
       * - data
       * [
       *    {
       *       "ACTION": "read",
       *       "CONTENT":"caching",
       *       "SERVICE":"agent",
       *       "ID":"6002",
       *       "DATA":{"TENANT_ID":"10","GROUP_ID":"200","TEAM_ID":"2001",…}
       *    }
       * ]
       *
       * - parsed
       * [{"TENANT_ID":"10","GROUP_ID":"200","TEAM_ID":"2001",…}]
       */

      Grid.prototype.getSecToTime = function( sec ) {
         var HOUR = 60 * 60,
             MINUTE = 60;
         var h = Math.floor(sec / HOUR),
             hTmp = sec % HOUR,
             m = Math.floor(hTmp / MINUTE),
             s = hTmp % MINUTE;

         if ( h.toString().length === 1 ) h = "0" + h.toString();
         if ( m.toString().length === 1 ) m = "0" + m.toString();
         if ( s.toString().length === 1 ) s = "0" + s.toString();

         return h + ":" + m + ":" + s;
      };

      Grid.prototype.getValue = function( data, type ) {
         var self = this;
         var value;

         switch ( type ) {
            case "number":
               if ( typeof(data) === "boolean" ) {
                  value = ( data === true )? 1:0;
               }
               else if ( typeof(data) === "number" ) {
                  value = data;
               }
               else {
                  value = parseInt(data);
               }
               break;

            case "boolean":
               value = (data === "1")? true:false;
               break;

            case "time":
               value = (data === 0)? "00:00:00":self.getSecToTime(data);
               break;

            case "sysTime":
               if ( typeof(data) === "string" ) {
                  var arr = data.split(":");
                  value = (parseInt(arr[0]) * 3600) +
                          (parseInt(arr[1]) * 60) +
                          parseInt(arr[2]);
               }
               else if ( typeof(data) === "object" ) {
                  value = data.getTime();
               }
               else {
                  value = data;
               }
               break;

            default:
               if ( data === undefined || data === null ) value = "";
               else value = data;
         }

         return value;
      };

      Grid.prototype.getData = function( arrData ) {
         var self = this;
         var dataLen = arrData.length,
             parsed = [];

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx];

            for ( var field in data ) {
               if ( field === "CHARGED_TIME" ) {
                  if ( typeof(data[field]) === "string" ) data[field] = parseInt(data[field]);
                  data[field] = new Date(data[field]);
               }
            }

            parsed.push(data);
         }

         return parsed;
      };

      Grid.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Grid.prototype.getDataForObj = function( options, objData ) {
         var fields = options.fields,
             data = {},
             parsed = [];

         for( var idx=0; idx<fields.length; idx++ ) {
            var field = fields[idx];
            data[field] = objData[field] || 0;
         }

         parsed.push(data);

         return parsed;
      };

      Grid.prototype.setItems = function( arrData, options ) {
         var self = this;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.requestArgs = function( action, data, options ) {
         var self = this;
         var dbms = options.nexus.dbms[action],
             argsFields = $.extend(true, [], dbms.ARGS),
             query = dbms.QUERY,
             args = [],
             arr = [];

         for ( var i=0; i<argsFields.length; i++ ) {
            var param = argsFields[i],
                field = param.field,
                type = param.type,
                value = data[field];

            if ( typeof(value) === "string" && value.trim() === "" ) continue;
            if ( value === "A" ) continue;

            arr.push(self.getValue(value, type));
         }

         args.push(arr);

         options.query = query;

         self.options.args = args;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;

         _DBMS({
            url : options.url,
            params : {
               query : options.query,
               args : options.args
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

      /************************************************************************************

       ************************************************************************************/

      Grid.prototype.makeDropDownList_text = function( item, bind ) {
         var self = this;

         for ( var dataKey in item ) {
            var regex = new RegExp("@="+dataKey, "g");
            bind = bind.replace(regex, item[dataKey]);
         }

         return bind;
      };

      Grid.prototype.makeDropDownList_value = function( item, bind ) {
         var self = this;
         return item[bind];
      };

      Grid.prototype.makeCodeData = function( field ) {
         var self = this;
         var bind = self.options.nexus.bind[field],
             path = bind.DATA,
             arrPath = path.split("."),
             shmem = self.shared[arrPath[2]],
             data = [];

         if ( arrPath[3] !== undefined ) {
            data = $.extend(true, [], shmem[arrPath[3]]);
         }
         else {
            data = $.extend(true, [], shmem);
         }

         for ( var i=0; i<data.length; i++ ) {
            var item = data[i];
            item.id = i + 1;
            item.text = self.makeDropDownList_text(item, bind.TEXT);
            item.value = self.makeDropDownList_value(item, bind.VALUE);
         }

         return data;
      };

      Grid.prototype.setColumns = function( text, options, shared ) {
         var self = this;
         var dbms = options.nexus.dbms[text.DATA];
         var columns = $.extend(true, [], text.COLUMN),
             schema = text.SCHEMA.model.fields,
             pk = [],
             fields = [];

         for ( var idx=0; idx<columns.length; idx++ ) {
            var field = columns[idx].field;

            if ( field === undefined ) continue;

            if ( columns[idx].pk ) {
               pk.push(field);
            }
         }

         for ( var key in schema ) {
            fields.push(key);
         }

         options.url = dbms.URL;
         options.query = dbms.QUERY;

         options.nexus.pk = pk;
         options.nexus.schema = text.SCHEMA;
         options.nexus.bind = text.BIND;

         options.columns = columns;
         options.fields = fields;

         self.options = options;

         return {
            columns : columns,
            fields : fields,
            pk : pk
         };
      };

      Grid.prototype.getOptions = function( text, dbms, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.nexus.dbms = dbms;

         options.scroll = false;
         options.height = 130;

         options.data = [{
            LIST_COUNT: 0,
            NOTROUTED_COUNT: 0,
            ROUTED_COUNT: 0,
            COMPLETE_COUNT: 0,
            WAITING_COUNT: 0
         }];

         self.setColumns(text, options, shared);

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


      /************************************************************************************

       ************************************************************************************/
      return function( tag ) {
         return new Grid(tag);
      };

   }
);
