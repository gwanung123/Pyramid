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
               sort: [],
               schema: {}
            },
            url    : "",
            query  : "",
            args   : [],
            items  : undefined,
            fields : undefined,
            columns: [],
            data: [],
            page: 30,  //pageable:true
            sort: [],  //sortable:true
            columnMenu: false,
            toolbar: [],
            resize: false,
            filter: false,
            group: false,
            refresh: false
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

      /**
       * Parameter for jdbc
       */
      Grid.prototype.requestJdbcArgs = function( action, data, nexus ) {
         var self = this;
         var item = [],
             args = [];
         var argsFields = $.extend(true, {}, self.options.nexus.dbms[action].ARGS);

         for ( var key in argsFields ) {
            var arg = argsFields[key],
                value;

            if ( typeof(data[arg.field]) === "string" && data[arg.field].indexOf("%") >= 0 ) {
               var depth = data[arg.field].split(".");
               var vals = nexus.get(depth[1]);
               value = data[arg.field] = vals[depth[2]];
            }
            else {
               value = self.getValue(data[arg.field], arg.type);
               if ( arg.type !== "sysTime" ) data[arg.field] = value;
            }

            item.push(value);
         }

         args.push(item);

         return args;
      };

      /**
       * Request Function for jdbc
       */
      Grid.prototype.requestJdbc = function( action, args, callback ) {
         var self = this;

         _DBMS({
            url : self.options.nexus.dbms[action].URL,
            params : {
               query : self.options.nexus.dbms[action].QUERY,
               args : args
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  callback.onResult(null, error, param);
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  callback.onResult(output, null, param);
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

      Grid.prototype.makeCodeData = function( field, text ) {
         var self = this;
         var bind = text.BIND[field],
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

      Grid.prototype.makeDropDownList = function( params, shared ) {
         var self = this;
         var options = {};

         var arrPath = params.data.split("."),
             shmem = shared[arrPath[2]],
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
            item.text = self.makeDropDownList_text(item, params.text);
            item.value = self.makeDropDownList_value(item, params.value);
         }

         options.required = params.required;
         options.dataTextField = params.dataTextField;
         options.dataValueField = params.dataValueField;
         options.cascadeFrom = params.cascadeFrom;
         options.cascadeFromField = params.cascadeFromField;
         options.optionLabel = params.optionLabel;
         options.dataSource = data;

         return options;
      };

      Grid.prototype.makeDatePicker = function( params, shared ) {
         var self = this;
         var options = {};

         options.value = params.value;
         options.format = params.format;

         return options;
      };

      Grid.prototype.setColumnEdit = function( onEdit, shared ) {
         var self = this;

         switch ( onEdit.component ) {
            case "kendoDropDownList":
               onEdit.options = self.makeDropDownList(onEdit.options, shared);
               break;

            case "kendoDatePicker":
               onEdit.options = self.makeDatePicker(onEdit.options);
               break;

            case "kendoValidator":
               break;
         }
      };

      Grid.prototype.setColumns = function( action, text, options, shared ) {
         var self = this;
         var dbms = options.nexus.dbms[text.DATA];
         var columns = $.extend(true, [], text.COLUMN),
             schema = text.SCHEMA.model.fields,
             pk = [],
             sort = [],
             fields = [];

         for ( var idx=0; idx<columns.length; idx++ ) {
            var field = columns[idx].field;

            if ( field === undefined ) continue;

            if ( columns[idx].pk ) {
               pk.push(field);
               sort.push({
                  field: field,
                  dir: "asc" //"desc"
               });
            }

            if ( columns[idx].onEdit !== undefined ) {
               self.setColumnEdit(columns[idx].onEdit, shared);
            }
         }

         for ( var key in schema ) {
            fields.push(key);
         }

         options.url = dbms[action].URL;
         options.query = dbms[action].QUERY;

         options.nexus.pk = pk;
         options.nexus.dbms = dbms;
         options.nexus.sort = sort;
         options.nexus.schema = text.SCHEMA;

         options.columns = columns;
         options.fields = fields;
         options.sort = sort;

         self.options = options;

         return {
            columns : columns,
            fields : fields,
            sort : sort,
            pk : pk
         };
      };

      Grid.prototype.getOptions = function( text, dbms, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.nexus.dbms = dbms;

         options.group = true;
         options.columnMenu = true;
         options.editable = {
            mode: "inline"
         };

         self.setColumns("SELECT", text, options, shared);

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
