'use strict';

define(["../../../Library/wallboard.caching", "../../../Library/wallboard.validation"],
   function( _caching, _validation ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {},

               pk: [],
               sort: [],
               schema: {}
            },
            url     : "",
            items   : undefined,
            fields  : undefined,
            columns : [],
            args    : [],
            data    : [],
            dataPath: "",
            columnMenu: false,
            toolbar : [],
            resize  : false,
            filter  : false,
            group   : false
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

            default:
               if ( data === undefined || data === null ) value = "";
               else value = data;
         }

         return value;
      };

      Grid.prototype.getData = function( arrData, args ) {
         var self = this;
         var items = $.extend(true, [], arrData),
             parsed = [];

         for ( var i=0; i<items.length; i++ ) {
            var item = items[i],
                obj = {};

            for ( var key in args ) {
               var arg = args[key];

               if ( key === "WARNING" ) {
                  var value = item["WARNING"].value,
                      type = item["WARNING"].type;
                  obj[key] = self.getValue(value, type);
                  obj["WARNING_TYPE"] = type;
               }
               else {
                  obj[key] = self.getValue(item[arg.field], arg.type);
               }
            }

            parsed.push(obj);
         }

         return parsed;
      };

      Grid.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Grid.prototype.setItems = function( text, nexus ) {
         var self = this;
         var item = nexus.userId;
         self.options.nexus.items = self.options.items = item;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.checkValidation = function( values ) {
         var self = this;
         var dirtyFields = values.dirtyFields;

         if ( values.dirty === false ) return true;

         for ( var key in dirtyFields ) {
            var data = values[key];

            if ( key === "WARNING" ) {
               var type = values["WARNING_TYPE"];

               switch ( type ) {
                  case "number": return _validation.isNum(data);
                  case "time"  : return _validation.isTime(data);
               }
            }
         }

         return true;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;
         var arrPath = options.dataPath.split("."),
             shared = self.shared[arrPath[2]];

         callback.onResult(shared[arrPath[3]], null, callback.onResultParam);
      };

      Grid.prototype.getSaveValue = function( data, type ) {
         var value;

         switch ( type ) {
            case "time":
               var arr = data.split(":");
               value = (parseInt(arr[0]) * 3600) +
                       (parseInt(arr[1]) * 60) +
                       parseInt(arr[2]);
               break;

            default: value = data;
         }

         return value;
      };

      Grid.prototype.requestUpdateArgs = function( values, asis ) {
         var self = this;
         var fields = self.options.fields,
             args = [];

         for ( var i=0; i<asis.length; i++ ) {
            var data = asis[i],
                obj = {};

            for ( var j=0; j<fields.length; j++ ) {
               var field = fields[j];

               switch ( field ) {
                  case "ISUSE":
                     if ( data["INDEX"] === values["INDEX"] ) obj[field] = values[field];
                     else obj[field] = data[field];
                     break;

                  case "WARNING":
                     var warn = {};
                     if ( data["INDEX"] === values["INDEX"] ) {
                        warn.value = self.getSaveValue(values[field], values["WARNING_TYPE"]);
                        warn.type = values["WARNING_TYPE"];
                     }
                     else {
                        warn.value = self.getSaveValue(data[field], data["WARNING_TYPE"]);
                        warn.type = data["WARNING_TYPE"];
                     }
                     obj[field] = warn;
                     break;

                  default:
                     obj[field] = data[field];
               }
            }

            args.push(obj);
         }

         return args;
      };

      Grid.prototype.requestUpdate = function( options, args, callback ) {
         var self = this;

         _caching({
            url : options.url,
            params : {
               item : options.items,
               value: args
            },
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

      Grid.prototype.setColumns = function( text, options ) {
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
         }

         for ( var key in schema ) {
            fields.push(key);
         }

         options.url = text.SAVE.URL;
         options.args = text.SAVE.ARGS;

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

      Grid.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.dataPath = text.DATA;
         options.selectable = false;
         options.editable = { mode: "inline" };

         self.setColumns(text, options);
         self.setItems(text, nexus);

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
