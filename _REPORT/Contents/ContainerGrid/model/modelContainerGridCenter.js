'use strict';

define(["../../../Library/report.dbms"],
   function( _DBMS ) {

      /*********************************************************************************
       * GRID
       *********************************************************************************/
      var Grid = function( TAG ) {
         this.tag = TAG;
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

      Grid.prototype.getData_AgentStats = function( data ) {
         var self = this;
      };

      Grid.prototype.getData_AgentState = function( data ) {
         var self = this;
         var sumCount = 0,
             sumTime = 0;

         for ( var field in data ) {
            if ( field.indexOf("_TIME") >= 0 ) {
               sumTime += data[field];
               data[field] = (data[field] === 0)? "00:00:00":self.getSecToTime(data[field]);
            }

            if ( field.indexOf("_COUNT") >= 0 ) {
               sumCount += data[field];
            }
         }

         data["TOTAL_COUNT"] = sumCount;
         data["TOTAL_TIME"] = self.getSecToTime(sumTime);
      };

      Grid.prototype.getData_Route = function( data ) {
         var self = this;
         var sumCount = 0;

         for ( var field in data ) {
            if ( field.indexOf("_COUNT") >= 0 ) {
               sumCount += data[field];
            }
         }

         data["TOTAL_COUNT"] = sumCount;
      };

      Grid.prototype.getData_Skill = function( data ) {
         var self = this;
      };
      Grid.prototype.getData_IVR = function( data ) {
        var self = this;
     };
      Grid.prototype.getData = function( arrData, service ) {
         var self = this;
         var dataLen = arrData.length,
             parsed = [];

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx];

            switch ( service ) {
               case "agentStats": self.getData_AgentStats(data); break;
               case "agentState": self.getData_AgentState(data); break;
               case "queue"     : self.getData_Route(data);      break;
               case "skill"     : self.getData_Skill(data);      break;
               case "ivr"       : self.getData_IVR(data);        break;
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

            default: value = data;
         }

         return value;
      };

      Grid.prototype.setItems = function( arrData, options ) {
         var self = this;
         var len = arrData.length;
         var items = [];

         for ( var i=0; i<len; i++ ) {
            if ( arrData[i].level !== arrData[i].depth ) continue;

            var data = arrData[i];

            items.push(data.item);
         }

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.requestArgs = function( action, data, options ) {
         var self = this;
         var items = self.options.nexus.items,
             argsFields = $.extend(true, {}, options.nexus.dbms[action].ARGS),
             args = [];

         for ( var i=0; i<items.length; i++ ) {
            var item = items[i],
                arr = [];

            arr.push(item);

            for ( var field in argsFields ) {
               arr.push(self.getValue(data[field], argsFields[field]));
            }

            args.push(arr);
         }

         self.options.args = args;
      };

      Grid.prototype.requestData = function( options, callback ) {
         var self = this;
         var service = options.url.split("/")[4];

         if ( options.items === undefined ) return;

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
                  callback.onResult(self.getData(output, service), null, param);
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

      Grid.prototype.setColumns = function( myTag, action, text, options ) {
         var self = this;
         var txt = text[myTag],
             dbms = options.nexus.dbms[txt.DATA];
         var columns = $.extend(true, [], txt.COLUMN),
             pk = [],
             sort = [],
             fields = [];

         for ( var idx=0; idx<columns.length; idx++ ) {
            var field = columns[idx].field;

            if ( field === undefined ) continue;

            fields.push(field);

            if ( columns[idx].pk ) {
               pk.push(field);
               sort.push({
                  field: field,
                  dir: "asc" //"desc"
               });
            }
         }

         options.url = dbms[action].URL;
         options.query = dbms[action].QUERY;

         options.nexus.pk = pk;
         options.nexus.dbms = dbms;
         options.nexus.sort = sort;
         options.nexus.schema = txt.SCHEMA;

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

      Grid.prototype.getOptions = function( text, dbms, myTag ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.dbms = dbms;

         options.columnMenu = true;
         options.toolbar = ["excel", "pdf"];
         options.excel = {
            allPages: true,
            fileName: text[myTag].FILENAME + ".xlsx"
         };
         options.pdf = {
            allPages: true,
            fileName: text[myTag].FILENAME + ".pdf",
            author: "iPECS",
            date: new Date()
         };

         self.setColumns(myTag, "SELECT", text, options);

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
