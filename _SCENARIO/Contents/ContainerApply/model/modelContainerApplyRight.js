'use strict';

define(["../../../Library/scenario.dbms"],
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
               push: undefined,
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
            columnMenu: false,
            toolbar: [],
            resize: false,
            filter: false,
            group: false
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
      Grid.prototype.getData = function( arrData ) {
         var self = this;
         var parsed = $.extend(true, [], self.options.data),
             dataLen = arrData.length;

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx],
                setHour = data["SET_HOUR"];

            for ( var i=0; parsed.length; i++ ) {
               if ( parsed[i].HOUR !== setHour ) continue;
               parsed[i] = $.extend(parsed[i], data);
               parsed[i].SCENARIO = data["SCENARIO_ID"].toString();
               break;
            }
         }

         return parsed;
      };

      Grid.prototype.getPushData = function( action, data, bind ) {
         var parsed = {},
             pushBind = {};

         switch ( action ) {
            case "save":
               parsed = $.extend(true, {}, data),
               pushBind = $.extend(true, {}, bind);
               parsed["SCENARIO"] = data["SCENARIO_ID"];
               break;

            case "delete":
               parsed = {};
               pushBind = { PK: [], DATA: {} };
               parsed["SCENARIO"] = "";
               break;
         }

         pushBind.PK = ["HOUR"];
         pushBind.DATA["HOUR"] = { field: "HOUR", type: "string" };
         pushBind.DATA["TIME"] = { field: "TIME", type: "string" };
         pushBind.DATA["SCENARIO"] = { field: "SCENARIO", type: "string" };

         parsed["HOUR"] = data["SET_HOUR"];
         parsed["TIME"] = "FIXED";

         return {
            DATA: parsed,
            BIND: pushBind
         };
      };

      Grid.prototype.getDataForObj = function( action, options, objData ) {
         var fields = options.fields,
             data = {},
             parsed = [];

         for( var idx=0; idx<fields.length; idx++ ) {
            var field = fields[idx];
            data[field] = objData[field];
         }

         if ( action === "DELETE" ) data["SCENARIO"] = "";

         parsed.push(data);

         return parsed;
      };

      Grid.prototype.getValue = function( data, type ) {
         var value;

         switch ( type ) {
            case "number":
               if ( typeof(data) === "boolean" ) {
                  value = ( data === true )? 1:0;
               }
               else {
                  value = parseInt(data);
               }
               break;

            default: value = data;
         }

         return value;
      };

      Grid.prototype.setItems = function( action, itemData, options ) {
         var self = this;
         var dbms = options.nexus.dbms[action],
             argsFields = $.extend(true, {}, dbms.ARGS),
             items = [],
             args = [],
             arr = [];

         for ( var field in argsFields ) {
            arr.push(self.getValue(itemData[field], argsFields[field]));
         }

         args.push(arr);

         self.options.url = dbms.URL;
         self.options.query = dbms.QUERY;
         self.options.args = args;
         self.options.nexus.items = self.options.items = itemData;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.checkItems = function( data ) {
         var self = this;
         var items = self.options.nexus.items;
         if ( items["QUEUE_ID"] === data["QUEUE_ID"] ) return true;
         return false;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;

         if ( options.args === undefined ) return;

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

      Grid.prototype.requestAdminArgs = function( action, values, data, nexus ) {
         var self = this;
         var args = {};
         var argsFields = $.extend(true, {}, self.options.nexus.dbms[action].ARGS);

         for ( var key in argsFields ) {
            var arg = argsFields[key];
            if ( arg.field.indexOf("%") >= 0 ) {
               var depth = arg.field.split(".");
               var vals = nexus.get(depth[1]);
               args[key] = vals[depth[2]];
            }
            else {
               var value;
               if ( values[arg.field] !== undefined ) value = values[arg.field];
               else value = data[arg.field];

               if ( arg.field === "SET_HOUR" ) value = values["HOUR"];
               if ( arg.field === "SCENARIO_ID" ) value = values["SCENARIO"];
               args[key] = self.getValue(value, arg.type);
            }
         }

         return args;
      };

      Grid.prototype.requestAdminArgsUpdate = function( data, nexus ) {
         var self = this;
         var args = {};
         var argsFields = $.extend(true, {}, self.options.nexus.dbms["UPDATE"].ARGS);

         for ( var key in argsFields ) {
            var arg = argsFields[key];

            // if, then
            if ( arg.field === undefined ) {
               var sub = args[key] = {};

               for ( var subKey in arg ) {
                  var subArg = arg[subKey];
                  sub[subKey] = self.getValue(data[subArg.field], subArg.type);
               }

               continue;
            }

            if ( arg.field.indexOf("%") >= 0 ) {
               var depth = arg.field.split(".");
               var vals = nexus.get(depth[1]);
               args[key] = vals[depth[2]];
            }
            else {
               args[key] = self.getValue(data[arg.field], arg.type);
            }
         }

         return args;
      };

      Grid.prototype.requestAdmin = function( action, args, callback ) {
         var self = this;

         _DBMS({
            url : self.options.nexus.dbms[action].URL,
            params : args,
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  callback.onResult(null, error, param);
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  callback.onResult({}, null, param);
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
      Grid.prototype.isDirty = function( values ) {
         var dirty = values.dirtyFields;

         if ( values.dirty === false ) return false;

         for ( var field in dirty ) {
            if ( values[field] === undefined ) return false;
            if ( values[field] === "" ) return false;
         }

         return true;
      };

      Grid.prototype.isChanged = function( old, now ) {
         if ( old["SCENARIO"] === undefined ) return false;
         if ( old["SCENARIO"] === "" ) return false;
         if ( old["SCENARIO"] === now["SCENARIO"] ) return false;
         return true;
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

         options.height = params.height;
         options.required = params.required;
         options.dataTextField = params.dataTextField;
         options.dataValueField = params.dataValueField;
         options.cascadeFrom = params.cascadeFrom;
         options.cascadeFromField = params.cascadeFromField;
         options.optionLabel = params.optionLabel;
         options.filterField = params.filterField;
         options.dataSource = data;

         return options;
      };

      Grid.prototype.setColumnEdit = function( onEdit, shared ) {
         var self = this;

         switch ( onEdit.component ) {
            case "kendoDropDownList":
               onEdit.options = self.makeDropDownList(onEdit.options, shared);
               break;

            case "kendoValidator":
               break;
         }
      };

      Grid.prototype.setColumns = function( text, options, _shared ) {
         var self = this;
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
               self.setColumnEdit(columns[idx].onEdit, _shared);
            }
         }

         for ( var key in schema ) {
            fields.push(key);
         }

         options.nexus.pk = pk;
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

         options.nexus.push = text.PUSH;
         options.nexus.dbms = dbms[text.DATA];
         options.data = text.DATASOURCE;
         options.selectable = false;
         options.editable = { mode: "inline" };

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
