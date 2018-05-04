'use strict';

define(["../../../Library/monitor.caching"],
   function(_caching ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
         this.options = undefined;
         this.text = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {},

               pk: []
            },
            url    : "",
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
         var columns = self.options.columns,
             dataLen = arrData.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx].DATA;

            for ( var i=0; i<columns.length; i++ ) {
               var column = columns[i],
                   field = column.field;
               if ( column.type === undefined ) continue;
               data[field] = self.getValue(data[field], column.type);
            }

            parsed.push(data);
         }

         return parsed;
      };

      Grid.prototype.getPushData = function( data ) {
         return data.DATA;
      };

      Grid.prototype.setItems = function( data ) {
         var self = this;
         var len = data.length;
         var items = [];

         for ( var i=0; i<len; i++ ) {
            if ( data[i].level !== data[i].depth ) continue;
            items.push(data[i].item);
         }

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;

         if ( options.items === undefined ) return;

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

      Grid.prototype.setColumns = function( tag, options ) {
         var self = this;
         var columns = self.text[tag].COLUMN,
             pk = [],
             sort = [],
             fields = [];

         for ( var idx=0; idx<columns.length; idx++ ) {
            var field = columns[idx].field;

            fields.push(field);

            if ( columns[idx].pk ) {
               pk.push(field);
               sort.push({
                  field: field,
                  dir: "asc" //"desc"
               });
            }
         }

         options.url = self.text[tag].URL;
         options.nexus.pk = pk;

         options.columns = columns;
         options.fields = fields;
         options.sort = sort;

         self.options = options;

         return {
            columns : columns,
            fields : fields,
            sort : sort
         };
      };

      Grid.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.text = text;

         options.columnMenu = true;
         options.filter = true;

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
         switch ( tag ) {
            case "AGENT_STATS_GRID": return new Grid(tag);
         }
         return null;
      };

   }
);
