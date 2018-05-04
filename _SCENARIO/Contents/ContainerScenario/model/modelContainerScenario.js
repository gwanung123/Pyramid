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
         this.text = undefined;

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

      Grid.prototype.getInsertData = function(objData) {
         var self = this;
         var scenario = self.shared._scenario.scenario;

         for ( var i=0; i<scenario.length; i++ ) {
            var scan = scenario[i];
            if ( scan["CENTER_ID"] !== objData["CENTER_ID"] ) continue;
            if ( scan["TENANT_ID"] !== objData["TENANT_ID"] ) continue;
            if ( scan["SCENARIO_ID"] !== objData["SCENARIO_ID"] ) continue;
            return $.extend(true, {}, scan);
         }
      };

      Grid.prototype.getDataForObj = function( options, objData ) {
         var fields = options.fields,
             data = {},
             parsed = [];

         for ( var idx=0; idx<fields.length; idx++ ) {
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
               var value = data[arg.field];

               if ( arg.field === "SCENARIO_DESC" ) {
                  var last = value.charAt(value.length-1);
                  if ( last !== "\n" ) value = value + "\n";
               }

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
                  var subArg = arg[subKey],
                      value = data[subArg.field];

                  if ( subArg.field === "SCENARIO_DESC" ) {
                     var last = value.charAt(value.length-1);
                     if ( last !== "\n" ) value = value + "\n";
                  }

                  sub[subKey] = self.getValue(value, subArg.type);
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

      Grid.prototype.makeDropDownList = function( params ) {
         var self = this;
         var options = {};

         var arrPath = params.data.split("."),
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

      Grid.prototype.setColumnEdit = function( onEdit ) {
         var self = this;

         switch ( onEdit.component ) {
            case "kendoDropDownList":
               onEdit.options = self.makeDropDownList(onEdit.options);
               break;

            case "kendoValidator":
               break;
         }
      };

      Grid.prototype.setColumns = function( action, options ) {
         var self = this;
         var dbms = options.nexus.dbms[self.text.DATA];
         var columns = $.extend(true, [], self.text.COLUMN),
             schema = self.text.SCHEMA.model.fields,
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
               self.setColumnEdit(columns[idx].onEdit);
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
         options.nexus.schema = self.text.SCHEMA;

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

      Grid.prototype.getDetailData_skill = function( clone ) {
         var self = this;
         var arrPath = clone.DATA.split("."),
             shmem = self.shared[arrPath[2]],
             skills = shmem[arrPath[3]],
             data = [];

         for ( var i=0; i<skills.length; i++ ) {
            var skill = skills[i],
                obj = {};

            for ( var key in clone ) {
               var value = clone[key];

               switch ( key ) {
                  case "VAL":
                     obj[key] = skill[value];
                     break;

                  case "TXT":
                     for ( var item in skill ) {
                        var itemVal = skill[item];
                        if ( typeof(itemVal) === "object" ) continue;
                        var regex = new RegExp("@="+item, "g");
                        value = value.replace(regex, itemVal);
                     }
                     obj[key] = value;
                     break;
               }
            }

            data.push(obj);
         }

         return data;
      };

      Grid.prototype.getDetailData_parse = function( scen ) {
         var arrSkill = scen.split(/[(|)]/g)[1],
             skills = [];

         if ( arrSkill === undefined ) return skills;

         skills = arrSkill.split(",");

         return skills;
      };

      Grid.prototype.getDetailData_make = function( clone, selected ) {
         return clone.replace("@=SKILLS", selected.toString());
      };

      Grid.prototype.getDetailData = function( kind, text, data ) {
         var self = this;

         switch ( kind ) {
            case "SKILL" :
               var clone = $.extend(true, {}, text[kind]);
               return self.getDetailData_skill(clone);
            case "SCENARIO_PARSE": return self.getDetailData_parse(data);
            case "SCENARIO_MAKE" : return self.getDetailData_make(text[kind], data);
         }
      };

      Grid.prototype.getOptions = function( text, dbms, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;
         self.text = text;

         options.nexus.dbms = dbms;

         options.columnMenu = true;
         options.editable = {
            mode: "inline",
            createAt: "top"
         };
         options.toolbar = ["create"];
         options.detailTemplate = kendo.template(
            "<h6 class=\"nx-scenario-title\">Scenario Description</h6>" +
            "<table id=\"nx-scenario-container\" style=\"height: 30px;\">" +
               "<tbody>" +
               "<tr>" +
                  "<td>" +
                     "<div>" +
                        "DESCRIPTION." +
                        "<div class=\"nx-scenario-desc\" style=\"font-weight: 600;padding: 10px 20px;\">" +
                        //"<textarea style=\"font-weight: 600;\" class=\"nx-scenario-desc\" rows=\"1\" cols=\"50\" data-bind=\"value:SCENARIO_DESC\">" +
                           "<span data-bind=\"text: SCENARIO_DESC\">" +
                           "#: SCENARIO_DESC #" +
                           "</span>" +
                        //"</textarea>" +
                        "</div>" +
                     "</div>" +
                  "</td>" +
                  "<td>" +
                     "<div>" +
                        "EDITOR." +
                        "<div class=\"nx-scenario-editor\" style=\"padding: 6px 20px;\">" +
                           "<select id=\"nx-scenario-skill\"  multiple=\"multiple\" />" +
                        "</div>" +
                     "</div>" +
                  "</td>" +
               "</tr>" +
               "</tbody>" +
            "</table>"
         );

         self.setColumns("SELECT", options);

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
