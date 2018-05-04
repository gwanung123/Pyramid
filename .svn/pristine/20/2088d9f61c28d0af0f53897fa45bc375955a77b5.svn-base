'use strict';

define([],
   function() {

      var KendoGrid2 = function() {
         /**
          * Variables
          */
         this.DATA = [];
         this.isChangeFlag = false;
         this.checkAll = {
            isExist: false,
            domID: undefined,
            rowID: undefined
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      var ptt = KendoGrid2.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     columns: [],
       *     data: [],
       *     //page: 15,  //pageable:true
       *     sort: [],  //sortable:true
       *     columnMenu: false,
       *     toolbar: [],
       *     resize: true,
       *     filter: false,
       *     group: {},
       *     groupable: false,
       *     refresh: true,
       *     scroll: false,
       *     editable: {},
       *     detailTemplate: "",
       *     selectable: "multiple, row",
       *     excel: {},
       *     pdf: {}
       * };
       *
       ******************************************************/

      ptt.setOption = function( options, prop, param ) {
         var value = options[prop];

         switch ( prop ) {
            case "columns":
               param.columns = value;
               break;

            case "data":
               param.dataSource.data = value;
               break;

            case "group":
               param.dataSource.group = value;
               break;

            case "page":
               if ( param.pageable === undefined ) param.pageable = {};
               param.pageable.pageSize = value;
               break;

            case "refresh":
               if ( param.pageable === undefined ) param.pageable = {};
               param.pageable.refresh = value;
               break;

            case "sort":
               param.dataSource.sort = value;
               param.sortable = true;
               break;

            case "columnMenu":
               param.columnMenu = value;
               break;

            case "toolbar":
               param.toolbar = value;
               break;

            case "resize":
               param.resizable = value;
               break;

            case "filter":
               param.filterable = value;
               break;

            case "groupable":
               param.groupable = value;
               break;

            case "scroll":
               param.scrollable = value;
               break;

            case "editable":
               param.editable = value;
               break;

            case "detailTemplate":
               param.detailTemplate = value;
               break;

            case "selectable":
               param.selectable = value;
               break;

            case "excel":
               param.excel = value;
               break;

            case "pdf":
               param.pdf = value;
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

      ptt.compareColumnsData = function( src, dst ) {
         var isExist = false;

         if ( src === undefined ) return true;
         if ( dst === undefined ) return true;
         if ( src.length !== dst.length ) return true;

         for ( var i=0; i<src.length; i++ ) {
            isExist = false;
            for ( var j=0; i<dst.length; j++ ) {
               if ( src[i].field !== dst[j].field ) continue;
               isExist = true;
               break;
            }
            if ( isExist === false ) return true;
         }

         return false;
      };

      /******************************************************
       * role
       ******************************************************/
      ptt.checkRole = function( columns ) {
         var self = this;
         var len = columns.length;

         for ( var i=0; i<len; i++ ) {
            var column = columns[i];

            if ( column.role === undefined ) continue;

            for ( var key in column.role ) {
               var val = column.role[key];

               switch ( key ) {
                  case "checkAll":
                     self.checkAll.isExist = true;
                     self.checkAll.domID = val.domID;
                     self.checkAll.rowID = val.rowID;
                     break;

                  case "check":
                     self.check.isExist = true;
                     self.check.domID = val.domID;
                     self.check.rowID = val.rowID;
                     break;
               }
            }
         }
      };

      /**
       * checkAll
       */
      ptt.isCheckAll = function() {
         var self = this;
         return self.checkAll.isExist;
      };

      ptt.getCheckAll = function( name ) {
         var self = this;
         return self.checkAll[name];
      };


      /******************************************************
       * kendoDropDownList
       ******************************************************/
      ptt.dropDownListFilter = function( arrData, field, value ) {
         var self = this;

         if ( value === 0 ) return;

         for ( var i=0; i<arrData.length; i++ ) {
            var data = arrData[i];
            if ( data[field] === value ) continue;
            arrData.splice(i, 1);
         }
      };


      /******************************************************
       *
       * ~ input
       * [{"TENANT_ID":"10","GROUP_ID":"100",...}]
       *
       * ~ output
       * [{"TENANT_ID":"10","GROUP_ID":"100",...}]
       *
       ******************************************************/

      ptt.makeDataGet = function() {
         var self = this;
         return self.DATA;
      };

      ptt.makeDataSet = function( data ) {
         var self = this;
         self.DATA = $.extend(true, [], data);
      };

      ptt.makeDataIsChanged = function( bool ) {
         var self = this;
         if ( bool === undefined ) return self.isChangeFlag;
         self.isChangeFlag = bool;
      };

      ptt.makeDataAdd = function( data ) {
         var self = this;
         self.DATA.push(data);
      };

      ptt.makeDataLen = function() {
         var self = this;
         return self.DATA.length;
      };

      ptt.comparePrimaryKey = function( pk, src, dst ) {
         if ( pk === undefined ) return true;

         var len = pk.length,
             isResult = false;

         for ( var i=0; i<len; i++ ) {
            var name = pk[i];
            if ( name === undefined ) continue;
            if ( src[name] === dst[name] ) {
               isResult = true;
               continue;
            }
            isResult = false;
            break;
         }

         return isResult;
      };

      ptt.makeData = function( data, pk, param ) {
         var self = this;
         var dt = self.makeDataGet(),
             dtLen = self.makeDataLen();
         var dataLen = data.length;

         for ( var k=0; k<dataLen; k++ ) {
            var dst = data[k],
                isExist = false,
                isPK = false;

            for ( var i=0; i<dtLen; i++ ) {
               var src = dt[i];

               isPK = self.comparePrimaryKey(pk, src, dst);

               if ( isPK ) {
                  for ( var key in src ) {
                     if ( dst[key] !== undefined ) src[key] = dst[key];
                  }
                  isExist = true;
                  break;
               }
            }

            if ( !isExist ) {
               self.makeDataAdd(dst);
            }
         }

         return dt;
      };

      ptt.makeDataDelete = function( data, pk ) {
         var self = this;
         var dt = self.makeDataGet(),
             dtLen = self.makeDataLen();
         var dataLen = data.length;

         for ( var k=0; k<dataLen; k++ ) {
            var dst = data[k],
                isPK = false;

            for ( var i=0; i<dtLen; i++ ) {
               var src = dt[i];

               isPK = self.comparePrimaryKey(pk, src, dst);

               if ( isPK ) {
                  dt.splice(i, 1);
                  break;
               }
            }
         }

         return dt;
      };

      /********************************************************
       *
       */

      ptt.getSecToTime = function( sec ) {
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

      ptt.getValue = function( data, type ) {
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

               if ( item[itemBind.field] === undefined ) continue;
               if ( item[itemBind.field].toString() !== data[dataKey] ) {
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

                  if ( data[key] === "FIXED" ) obj[field] = arrData[0][field];
                  else obj[field] = self.getValue(data[key], type);
               }

               arrData.push(obj);
               break;

            case "update":
               var obj = {};

               for ( var key in bind ) {
                  var itemBind = bind[key],
                      field = itemBind.field,
                      type = itemBind.type;

                  if ( data[key] === "FIXED" ) obj[field] = arrData[fined][field];
                  else obj[field] = self.getValue(data[key], type);
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

      ptt.makeDataPush = function( action, data, pushBind ) {
         var self = this;
         var arrData = self.makeDataGet("AS_IS");

         self.makeDataPushAction(action, arrData, data, pushBind);

         return arrData;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoGrid2;

   }
);
