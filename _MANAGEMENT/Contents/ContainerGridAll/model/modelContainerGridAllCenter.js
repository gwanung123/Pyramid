'use strict';

define(["../../../Library/manage.dbms"],
   function( _DBMS ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
         this.subTag = undefined;
         this.options = undefined;

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
         var dataLen = arrData.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx];

            if ( data["MONITOR_FLAG"] !== undefined ) {
               data["MONITOR_FLAG"] = ( data["MONITOR_FLAG"] === 1 )? true:false;
            }

            if ( data["SERVICELEVEL_CALC"] === null ) {
               data["SERVICELEVEL_CALC"] = 0;
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

            default:
               if ( data === undefined || data === null ) value = "";
               else value = data;
         }

         return value;
      };

      Grid.prototype.setItems = function( arrData, options ) {
         var self = this;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;

         _DBMS({
            url : options.url,
            params : {
               query : options.query
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
       * Parameter for nxwasapi
       */
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
            else if ( key === "login_id" ) {
               args[key] = ( data[arg.field] === "" || data[arg.field] === undefined )? "0":data[arg.field];
            }
            else {
               args[key] = self.getValue(data[arg.field], arg.type);
            }
         }

         return args;
      };

      /**
       * Parameter for nxwasapi
       */
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
                  if ( subKey === "login_id" ) {
                     sub[subKey] = ( data[subArg.field] === "" || data[subArg.field] === undefined )? "0":data[subArg.field];
                  }
                  else {
                     sub[subKey] = self.getValue(data[subArg.field], subArg.type);
                  }
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

      /**
       * Request Function for nxwasapi
       */
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

      /**
       * Parameter for jdbc
       */
      Grid.prototype.requestJdbcArgs = function( action, data, nexus ) {
         var self = this;
         var item = [],
             args = [];
         var argsFields = $.extend(true, {}, self.options.nexus.dbms[action].ARGS);

         for ( var key in argsFields ) {
            var arg = argsFields[key];
            item.push(self.getValue(data[arg.field], arg.type));
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

      Grid.prototype.makeDropDownList = function( field, params, shared ) {
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

      Grid.prototype.setColumnEdit = function( field, onEdit, shared ) {
         var self = this;

         switch ( onEdit.component ) {
            case "kendoDropDownList":
               onEdit.options = self.makeDropDownList(field, onEdit.options, shared);
               break;

            case "kendoValidator":
               break;
         }
      };

      Grid.prototype.setColumns = function( action, text, options, _shared ) {
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
               self.setColumnEdit(field, columns[idx].onEdit, _shared);
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

      Grid.prototype.getOptions = function( myTag, text, dbms ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.subTag = myTag;

         options.nexus.dbms = dbms;

         options.columnMenu = true;

         if ( text.EDIT ) {
            options.editable = {
               mode: "inline",
               createAt: "top",
               //confirmation: false
            };
            options.toolbar = ["create"];
         }

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
