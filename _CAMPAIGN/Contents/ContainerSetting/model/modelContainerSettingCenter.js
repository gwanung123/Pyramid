'use strict';

define(["../../../Library/campaign.dbms"],
   function( _DBMS ) {

      /*********************************************************************************
       * SPREAD SHEET
       *********************************************************************************/
      var Spreadsheet = function( TAG ) {
         this.tag = TAG;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               dbms: undefined,
               bind: undefined,
               items: undefined,
               join: {},
            },
            url    : "",
            query  : "",
            args   : [],
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

      Spreadsheet.prototype.getSecToTime = function( sec ) {
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

      Spreadsheet.prototype.getValue = function( data, type ) {
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

      Spreadsheet.prototype.makeDropDownList_text = function( item, bind ) {
         var self = this;

         for ( var dataKey in item ) {
            var regex = new RegExp("@="+dataKey, "g");
            bind = bind.replace(regex, item[dataKey]);
         }

         return bind;
      };

      Spreadsheet.prototype.makeDropDownList_value = function( item, bind ) {
         var self = this;
         return item[bind];
      };

      Spreadsheet.prototype.getData = function( arrData ) {
         var self = this;
         var bind = self.options.nexus.bind,
             dataLen = arrData.length,
             parsed = [];

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx],
                item = {};
            item.id = idx + 1;
            item.text = self.makeDropDownList_text(data, bind.CODE_TEXT);
            item.value = self.makeDropDownList_value(data, bind.CODE_VALUE);
            parsed.push(item);
         }

         return parsed;
      };

      Spreadsheet.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Spreadsheet.prototype.setItems = function( arrData, options ) {
         var self = this;
      };

      Spreadsheet.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Spreadsheet.prototype.requestArgs = function( action, data, options ) {
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

            switch ( field ) {
               case "CCC_TYPE":
                  query += dbms.WHERE[field];
                  break;
            }

            arr.push(self.getValue(value, type));
         }

         args.push(arr);

         options.url = dbms.URL;
         options.query = query + dbms.FINAL;

         self.options.args = args;
      };

      Spreadsheet.prototype.requestData = function( options, callback ) {
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
      Spreadsheet.prototype.requestJdbcArgs = function( action, data, values ) {
         var self = this;
         var args = [];
         var argsFields = $.extend(true, {}, self.options.nexus.dbms[action].ARGS),
             dataFields = values[0].cells;

         for ( var i=1; i<values.length; i++ ) {
            var cells = values[i].cells,
                item = [];

            for ( var j=0; j<dataFields.length; j++ ) {
               var field = dataFields[j].value,
                   arg = argsFields[field],
                   value;

               if ( field === "NAME" && cells[j].value === "" ) break;

               value = self.getValue(cells[j].value, arg.type);

               item.push(value);
            }

            item.push(data["CCC_CODE"]);

            args.push(item);
         }

         return args;
      };

      /**
       * Request Function for jdbc
       */
      Spreadsheet.prototype.requestJdbc = function( action, args, callback ) {
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
      Spreadsheet.prototype.getOptions = function( text, dbms, shared, customCallback ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.nexus.dbms = dbms[text.DATA];
         options.nexus.bind = text.BIND;

         options.toolbar = {
            home: [
               [{
                  type  : "button",
                  text  : "Setting",
                  icon  : "clock",
                  id    : "nx-setting-button",
                  click : customCallback
               }],
               "open",
               "exportAs",
               ["cut", "copy", "paste"],
               ["bold", "italic", "underline"],
               "backgroundColor", "textColor",
               "borders",
               "fontSize", "fontFamily",
               "alignment",
               "format",
               "freeze",
               "filter",
               "toggleGridlines"
            ],
            insert: false,
            data: false
         };
         options.columns = text.COLUMNS;
         options.rows = text.ROWS;
         options.sheets = text.SHEETS;
         options.sheetsbar = false;

         return self.options = options;
      };

      Spreadsheet.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new Spreadsheet(tag);
      };

   }
);
