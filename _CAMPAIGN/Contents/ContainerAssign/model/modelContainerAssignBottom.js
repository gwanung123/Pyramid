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
            topData: undefined,
            notAssign   : undefined,
            agentAssign : undefined,
            url    : "",
            query  : "",
            args   : [],
            treeItems: undefined,
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
            refresh: false,
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
             items = [],
             parsed = [];

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx];
            data["ROUTING_INPUT"] = 0;
            data["RETRIEVAL_INPUT"] = 0;
            parsed.push(data);
            items.push(data["CHARGER"]);
         }

         self.options.treeItems = items;

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

      Grid.prototype.setItems = function( asis, arrData ) {
         var self = this;
         var clones = $.extend(true, [], asis),
             fields = self.options.fields,
             pk = self.options.nexus.pk,
             len = arrData.length,
             items = [];

         for ( var i=0; i<len; i++ ) {
            var checked = arrData[i].source,
                data = {},
                isPushed = false;

            checked["CHARGER"] = checked["EMPLOYEE_ID"];

            for ( var j=0; j<clones.length; j++ ) {
               var clone = clones[j],
                   isFined = false;

               for ( var l=0; l<pk.length; l++ ) {
                  var pkField = pk[l];

                  if ( checked[pkField] !== clone[pkField] ) {
                     isFined = false;
                     break;
                  }

                  isFined = true;
               }

               if ( isFined ) {
                  items.push($.extend(true, {}, clone));
                  clones.splice(j, 1);
                  isPushed = true;
               }
            }

            if ( isPushed ) continue;

            for ( var k=0; k<fields.length; k++ ) {
               var field = fields[k];

               if ( checked[field] === undefined ) data[field] = 0;
               else data[field] = checked[field];
            }

            items.push(data);
         }

         self.options.nexus.items = self.options.items = items;

         return items;
      };

      Grid.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Grid.prototype.sumRouted = function( arrData ) {
         var self = this;
         var sum = 0;

         for ( var i=0; i<arrData.length; i++ ) {
            var data = arrData[i];
            sum += data["ROUTED_COUNT"];
         }

         return sum;
      };

      Grid.prototype.requestNotAssign = function( args, self ) {
         var deferred = $.Deferred();
         var bind = self.options.nexus.bind["NOT_ASSIGN"],
             dbms = self.options.nexus.dbms[bind.DATA];

         _DBMS({
            url : dbms.URL,
            params : {
               query : dbms.QUERY,
               args : args
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  deferred.resolve();
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  var items = [];

                  for ( var i=0; i<output.length; i++ ) {
                     items.push(output[i]["SEQNO"]);
                  }

                  deferred.resolve(items);
               }
               else {
                  deferred.resolve();
               }
            },
            onResultParam : undefined
         });

         return deferred.promise();
      };

      Grid.prototype.requestAgentAssign = function( args, self ) {
         var deferred = $.Deferred();
         var bind = self.options.nexus.bind["AGENT_ASSIGN"],
             dbms = self.options.nexus.dbms[bind.DATA];

         _DBMS({
            url : dbms.URL,
            params : {
               query : dbms.QUERY,
               args : args
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  deferred.resolve();
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  deferred.resolve(output);
               }
               else {
                  deferred.resolve();
               }
            },
            onResultParam : undefined
         });

         return deferred.promise();
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
                  var f1 = self.requestNotAssign,
                      f2 = self.requestAgentAssign;

                  $.when( f1(options.args, self), f2(options.args, self) )
                   .done(
                     function( v1, v2 ) {
                        var result = {};

                        options.notAssign = v1;
                        options.agentAssign = v2;

                        callback.onResult(self.getData(output), null, param);
                     }
                  );
               }
               else {
                  callback.onResult(result, null, param);
               }
            },
            onResultParam : callback.onResultParam
         });
      };

      Grid.prototype.requestJdbcArgs_assign = function( argsFields, code, arrData ) {
         var self = this;
         var info = $.extend(true, [], self.options.notAssign),
             time = new Date().getTime(),
             args = [];

         for ( var i=0; i<arrData.length; i++ ) {
            var data = arrData[i],
                routing = data["ROUTING_INPUT"];

            for ( var j=0; j<routing; j++ ) {
               var item = [];

               for ( var key in argsFields ) {
                  var arg = argsFields[key],
                      value;

                  switch ( arg.field ) {
                     case "CHARGED_TIME":
                        value = time;
                        break;

                     case "CCC_CODE":
                        value = code;
                        break;

                     case "SEQNO":
                        value = info.shift();
                        break;

                     default:
                        value = self.getValue(data[arg.field], arg.type);
                  }

                  item.push(value);
               }

               args.push(item);
            }
         }

         return args;
      };

      Grid.prototype.requestJdbcArgs_retrieval = function( argsFields, code, arrData ) {
         var self = this;
         var info = $.extend(true, [], self.options.agentAssign),
             args = [];

         for ( var i=0; i<arrData.length; i++ ) {
            var data = arrData[i],
                agent = data["CHARGER"],
                retrieval = data["RETRIEVAL_INPUT"];

            for ( var j=0; j<retrieval; j++ ) {
               var item = [],
                   isFined = false;

               for ( var key in argsFields ) {
                  var arg = argsFields[key],
                      value;

                  switch ( arg.field ) {
                     case "CCC_CODE":
                        value = code;
                        break;

                     case "SEQNO":
                        for ( var k=0; k<info.length; k++ ) {
                           var list = info[k];
                           if ( list["CHARGER"] !== agent ) continue;
                           value = list["SEQNO"];
                           info.splice(k, 1);
                           isFined = true;
                           break;
                        }
                        break;
                  }

                  if ( isFined ) item.push(value);
               }

               if ( item.length > 0 ) args.push(item);
            }
         }

         return args;
      };


      /**
       * Parameter for jdbc
       */
      Grid.prototype.requestJdbcArgs = function( action, arrData, nexus ) {
         var self = this;
         var code = self.options.topData["CCC_CODE"],
             argsFields = $.extend(true, {}, self.options.nexus.dbms[action].ARGS),
             args = [];

         switch ( action ) {
            case "ASSIGN"   :
               args = self.requestJdbcArgs_assign(argsFields, code, arrData);
               break;

            case "RETRIEVAL":
               args = self.requestJdbcArgs_retrieval(argsFields, code, arrData);
               break;
         }

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
         options.nexus.bind = text.BIND;

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
         options.editable = true;

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
