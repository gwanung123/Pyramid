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
       *     dragAndDrop: false
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
            var len = data.length;
            for ( var i=0; i<len; i++ ) {
               var item = data[i];
               items.push(item[itemField]);
            }
            return;
         }

         for ( var i=0; i<len; i++ ) {
            var item = data[i];
            if ( item[field] !== selected[field] ) continue;
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
               var item = items[i];
               if ( item[field] !== selected ) continue;
               return item;
            }
         }

         return selected;
      };

      ptt.makeDataSubLevelItems = function( level, selected, dataTextField ) {
         var self = this;
         var data = self.makeDataGet("TO_BE"),
             fields = self.makeDataFieldGet(level+1, dataTextField);
         var itemField = fields.pop(),
             items = [];

         if ( level === dataTextField.length-1 ) {
            items.push(selected);
         }
         else {
            selected = self.makeDataSelected(level, selected, dataTextField[level]);
            self.makeDataSubLevelItemsLoop(fields, itemField, selected, data, items);
         }

         return items;
      };

      /********************************************************
       *
       */
      ptt.makeDataDepthGet = function( key ) {
         var self = this;
         var len = self.DEPTH.length;

         for ( var i=0; i<len; i++ ) {
            if ( self.DEPTH[i] !== key ) continue;
            return i;
         }

         return -1;
      };

      ptt.makeDataDepthSet = function( bind ) {
         var self = this;

         for ( var depth in bind ) {
            var key = bind[depth].TAG;
            self.DEPTH.push(key);
         }
      };

      ptt.makeDataFieldGet = function( depth, dataTextField ) {
         var len = dataTextField.length,
             fields = [];

         for ( var i=0; i<len; i++ ) {
            if ( i > depth ) break;
            fields.push(dataTextField[i]);
         }

         return fields;
      };

      ptt.makeDataSort = function( parsed ) {
         parsed.sort(function( a, b ) {
            var aval,
                bval;

            for ( var akey in a ) {
               if ( akey === "items" ) continue;
               if ( akey === "id" ) continue;
               aval = a[akey];
               break;
            }

            for ( var bkey in b ) {
               if ( bkey === "items" ) continue;
               if ( bkey === "id" ) continue;
               bval = b[bkey];
               break;
            }

             return aval-bval;
         });
      };

      ptt.makeDataLoop = function( fields, val, parsed, objID ) {
         var self = this;
         var field = fields.shift(),
             len = parsed.length;

         if ( fields.length === 0 ) {
            for ( var i=0; i<len; i++ ) {
               var item = parsed[i];
               if ( item[field] === val[field] ) return;
            }

            var obj = { id:objID.id, items:[] };
            obj[field] = val[field];
            parsed.push(obj);
            self.makeDataSort(parsed);
            objID.id += 1;
            return;
         }

         for ( var i=0; i<len; i++ ) {
            var item = parsed[i];
            if ( item[field] !== val[field] ) continue;
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
         var parsed = [],
             objID = { id:1 };

         clone = self.makeDataCheck(clone, dataTextField);

         self.makeDataSet("AS_IS", clone);

         self.makeDataDepthSet(bind);

         for ( var key in clone ) {
            var depth = self.makeDataDepthGet(key);
            if ( depth < 0 ) return;

            var vals = clone[key],
                valsLen = vals.length;

            for ( var i=0; i<valsLen; i++ ) {
               var fields = self.makeDataFieldGet(depth, dataTextField);
               self.makeDataLoop(fields, vals[i], parsed, objID);
            }
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoTreeview;

   }
);
