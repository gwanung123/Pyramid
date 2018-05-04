'use strict';

define(["../../../Library/manage.dbms"],
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
               parent: undefined,
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
      Grid.prototype.getData = function( arrData ) {
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
            data[field] = objData[field];
         }

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

      Grid.prototype.setItems = function( field, item, options ) {
         var self = this;
         var assign = self.shared._skill_assign.agent,
             items = [];

         for ( var i=0; i<assign.length; i++ ) {
            var agent = assign[i];
            if ( agent[field] !== item ) continue;
            items.push(agent);
         }

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.requestData = function( options, item, callback ) {
         var self = this;
         var fields = self.options.nexus.schema.model.fields;

         for ( var field in fields ) {
            var opt = fields[field];
            if ( opt.autoDefault === undefined ) continue;
            opt.defaultValue = item[field];
         }

         callback.onResult(self.getItems(), null, callback.onResultParam);
      };

      Grid.prototype.requestAdminArgs = function( action, data, nexus ) {
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
               args[key] = self.getValue(data[arg.field], arg.type);
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

         options.nexus.dbms = dbms[text.DATA];

         options.columnMenu = true;
         options.editable = {
            mode: "inline",
            createAt: "top",
         };
         options.toolbar = ["create"];

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
