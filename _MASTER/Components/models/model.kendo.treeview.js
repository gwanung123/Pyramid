'use strict';

define([],
   function() {

      var KendoTreeview = function() {
         /**
          * Variables
          */
         this.DATA = {
            AS_IS: undefined,
            TO_BE: undefined
         };
         this.isChangeFlag = false;
         this.DEPTH = [];
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      var ptt = KendoTreeview.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     data: [],  //dataTextField
       *     dataTextField: [],
       *     checkbox: false,
       *     scroll: true,
       *     dragAndDrop: false,
       *     template: ""
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "data":
               param.dataSource.data = value;
               break;

            case "dataTextField":
               param.dataTextField = value;
               break;

            case "checkbox":
               if ( value ) param.checkboxes = { checkChildren: true };
               break;

            case "scroll":
               param.autoScroll = value;
               break;

            case "dragAndDrop":
               param.dragAndDrop = value;
               break;

            case "template":
               param.template = value;
               break;
         }

         return param;
      };

      ptt.makeOption = function( options ) {
         var self = this;
         var param = {
            dataSource: {}
         };

         for ( var prop in options ) {
            param = self.setOption(options, prop, param);
         }

         return param;
      };

      /******************************************************
       *
       * ~ input
       * {
       *    "tenant":[{"TENANT_ID":"10"}],
       *    "group":[{"TENANT_ID":"10","GROUP_ID":"100"}]
       * }
       *
       * ~ output
       * [{TENANT_ID:"1", items:[{GROUP_ID:"10"}, {GROUP_ID:"20"}]},{TENANT_ID: "2"}]
       *
       ******************************************************/
      ptt.makeDataGet = function( type ) {
         var self = this;
         if ( type === undefined ) return self.DATA;
         return self.DATA[type];
      };

      ptt.makeDataSet = function( type, data ) {
         var self = this;
         self.DATA[type] = data;
      };

      ptt.makeDataIsChanged = function( bool ) {
         var self = this;
         if ( bool === undefined ) return self.isChangeFlag;
         self.isChangeFlag = bool;
      };

      /********************************************************
       *
       */
      ptt.makeDataSubLevelItemsLoop = function( fields, itemField, selected, data, items ) {
         var self = this;
         var field = fields.shift(),
             len = data.length;

         if ( field === undefined ) {
            for ( var i=0; i<len; i++ ) {
               var item = data[i];
               items.push(item[itemField.pin]);
            }
            return;
         }

         for ( var i=0; i<len; i++ ) {
            var item = data[i];
            if ( item[field.pin] !== selected[field.pin] ) continue;
            self.makeDataSubLevelItemsLoop(fields, itemField, selected, item.items, items);
         }
      };

      ptt.makeDataSelected = function( level, selected, field ) {
         var self = this;
         var data = self.makeDataGet("AS_IS"),
             depth = 0;

         for ( var key in data ) {
            if ( depth !== level ) {
               depth += 1;
               continue;
            }

            var items = data[key],
                len = items.length;

            for ( var i=0; i<len; i++ ) {
               var item = items[i],
                   obj = self.makeDataItem(field, item);
               if ( obj[field.tag] !== selected ) continue;
               return item;
            }
         }

         return selected;
      };

      ptt.makeDataSubLevelItems = function( level, selected, dataTextField ) {
         var self = this;
         var data = self.makeDataGet("TO_BE"),
             fields = self.makeDataFieldsGet(level+1);
         var itemField = fields.pop(),
             items = [];

         if ( level === dataTextField.length-1 ) {
            items.push(selected);
         }
         else {
            selected = self.makeDataSelected(level, selected, self.DEPTH[level]);
            self.makeDataSubLevelItemsLoop(fields, itemField, selected, data, items);
         }

         return items;
      };

      /********************************************************
       *
       */

      ptt.makeDataDepthLength = function() {
         var self = this;
         return self.DEPTH.length-1;
      };

      ptt.makeDataDepth = function( key ) {
         var self = this;
         var len = self.DEPTH.length;

         for ( var i=0; i<len; i++ ) {
            if ( self.DEPTH[i].tag !== key ) continue;
            return i;
         }

         return -1;
      };

      ptt.makeDataDepthGet = function( key ) {
         var self = this;
         var len = self.DEPTH.length;

         for ( var i=0; i<len; i++ ) {
            if ( self.DEPTH[i].tag !== key ) continue;
            return self.DEPTH[i];
         }

         return null;
      };

      ptt.makeDataDepthSet = function( bind ) {
         var self = this;

         for ( var depth in bind ) {
            self.DEPTH.push({
               tag: bind[depth].TAG,
               pin: bind[depth].PIN,
               txt: bind[depth].TXT,
               monitor: bind[depth].MONITOR
            });
         }
      };

      ptt.makeDataFieldsGet = function( depth ) {
         var self = this;
         var len = self.DEPTH.length,
             fields = [];

         for ( var i=0; i<len; i++ ) {
            if ( i > depth ) break;
            fields.push(self.DEPTH[i]);
         }

         return fields;
      };

      ptt.makeDataSort = function( parsed ) {
         parsed.sort(function( a, b ) {
            var aval,
                bval;

            for ( var akey in a ) {
               if ( akey.indexOf("_ID") < 0 ) continue;
               aval = a[akey];
               break;
            }

            for ( var bkey in b ) {
               if ( bkey.indexOf("_ID") < 0 ) continue;
               bval = b[bkey];
               break;
            }

             return aval-bval;
         });
      };

      ptt.makeDataItem = function( field, data, objID ) {
         var tag = field.tag,
             pin = field.pin,
             txt = field.txt,
             monitor = field.monitor;
         var obj = {
            id: objID.id || 0,
            textField: tag,
            source: data,
            items: [],
            monitor: data[monitor],
            pin: pin
         };

         obj[pin] = data[pin];

         for ( var key in data ) {
            var val = data[key];
            if ( typeof(val) === "object" ) continue;
            var regex = new RegExp("@="+key, "g");
            txt = txt.replace(regex, val);
         }

         obj[tag] = txt;

         return obj;
      };

      ptt.makeDataLoop = function( fields, val, parsed, objID ) {
         var self = this;
         var field = fields.shift(),
             len = parsed.length;
         var pin = field.pin;

         if ( fields.length === 0 ) {
            for ( var i=0; i<len; i++ ) {
               var item = parsed[i];
               if ( item[pin] === val[pin] ) return;
            }

            parsed.push(self.makeDataItem(field, val, objID));
            self.makeDataSort(parsed);
            objID.id += 1;
            return;
         }

         for ( var i=0; i<len; i++ ) {
            var item = parsed[i];
            if ( item[pin] !== val[pin] ) continue;
            self.makeDataLoop(fields, val, item.items, objID);
         }
      };

      ptt.makeDataCheck = function( data, dataTextField ) {
         var len = dataTextField.length-1,
             depth = 0;

         for ( var key in data ) {
            if ( depth > len ) delete data[key];
            depth += 1;
         }

         return data;
      };

      ptt.makeData = function( data, dataTextField, bind, param ) {
         var self = this;
         var clone = $.extend(true, {}, data);
         var objID = { id:1 },
             parsed = [];

         clone = self.makeDataCheck(clone, dataTextField);

         self.makeDataSet("AS_IS", clone);

         self.DEPTH = [];
         self.makeDataDepthSet(bind);

         for ( var key in clone ) {
            var depth = self.makeDataDepth(key);
            if ( depth < 0 ) return;

            var vals = clone[key],
                valsLen = vals.length;

            for ( var i=0; i<valsLen; i++ ) {
               var fields = self.makeDataFieldsGet(depth);
               self.makeDataLoop(fields, vals[i], parsed, objID);
            }
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /********************************************************
       *
       */

      ptt.isPushService = function( dataTextField, service ) {
         var self = this;
         var len = dataTextField.length;

         for ( var i=0; i<len; i++ ) {
            if ( dataTextField[i] === service ) return true;
         }

         return false;
      };

      ptt.getValue = function( data, type ) {
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

      ptt.makeDataPushAction = function( action, arrData, data, pushBind ) {
         var self = this;
         var pk = pushBind.PK,
             bind = pushBind.DATA,
             len = arrData.length,
             fined = -1;

         for ( var i=0; i<len; i++ ) {
            var item = arrData[i],
                isFined = false;

            for ( var j=0; j<pk.length; j++ ) {
               var dataKey = pk[j],
                   itemBind = bind[dataKey];
               var itemVal = (typeof(item[itemBind.field]) === "string")? item[itemBind.field]:item[itemBind.field].toString(),
                   dataVal = (typeof(data[dataKey]) === "string")? data[dataKey]:data[dataKey].toString();

               if ( itemVal !== dataVal ) {
                  isFined = false;
                  break;
               }

               isFined = true;
            }

            if ( isFined === true ) {
               fined = i;
               break;
            }
         }

         switch ( action ) {
            case "save":
               var obj = {};

               for ( var key in bind ) {
                  var itemBind = bind[key],
                      field = itemBind.field,
                      type = itemBind.type;
                  if ( arrData[0][field] === undefined ) continue;
                  obj[field] = self.getValue(data[key], type);
               }

               arrData.push(obj);
               break;

            case "update":
               var obj = {};

               for ( var key in bind ) {
                  var itemBind = bind[key],
                      field = itemBind.field,
                      type = itemBind.type;
                  if ( arrData[0][field] === undefined ) continue;
                  obj[field] = self.getValue(data[key], type);
               }

               if ( fined >= 0 ) {
                  arrData[fined] = obj;
               }
               break;

            case "delete":
               if ( fined >= 0 ) {
                  arrData.splice(fined, 1);
               }
               break;
         }
      };

      ptt.makeDataPush = function( action, service, data, pushBind, dataTextField, bind ) {
         var self = this;
         var asis = self.makeDataGet("AS_IS"),
             arrData = asis[service];

         self.makeDataPushAction(action, arrData, data, pushBind);

         return self.makeData(asis, dataTextField, bind);
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoTreeview;

   }
);
