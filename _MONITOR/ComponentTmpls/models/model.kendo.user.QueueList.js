'use strict';

define([],
   function() {

      var KendoGrid = function() {
         /**
          * Variables
          */
         this.DATA = {
            AS_IS: [],
            TO_BE: []
         };
         this.isChangeFlag = false;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      var ptt = KendoGrid.prototype;

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
       *     group: false,
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

      ptt.makeOption = function( options ) {
         var self = this;
         var param = {
            columns: [
               { field: "QUEUE" },
               { field: "NAME" },
               { field: "ENTER" },
               { field: "DISTRIBUTE" },
               { field: "ABANDON" },
               { field: "NONSERVICE" },
               { field: "WAITING" },
            ],
            height: 330,
            pageable: {
               pageSize: 10,
               info: false
            },
            //scrollable: false
         };

         options.nexus.pk = "QUEUE";
         options.nexus.sort = [{ field: "QUEUE", dir: "asc" }];

         return param;
      };


      /******************************************************
       *
       * ~ input
       * [{"TENANT_ID":"10","AGENT_ID":"100",...}]
       *
       * ~ output
       * [{"AGENT":"100","NAME":"100",...}]
       *
       ******************************************************/

      ptt.makeDataGet = function( type ) {
         var self = this;
         if ( type === undefined ) return self.DATA;
         return self.DATA[type];
      };

      ptt.makeDataSet = function( data, bind ) {
         var self = this;
         var parsed = [];

         // AS_IS
         self.DATA["AS_IS"] = $.extend(true, [], data);

         // TO_BE
         for ( var i=0; i<data.length; i++ ) {
            var item = data[i],
                obj = {};

            for ( var key in bind ) {
               var valKey = bind[key];
               obj[key] = item[valKey];
            }

            parsed.push(obj);
         }

         self.DATA["TO_BE"] = parsed;

         return parsed;
      };

      ptt.makeDataIsChanged = function( bool ) {
         var self = this;
         if ( bool === undefined ) return self.isChangeFlag;
         self.isChangeFlag = bool;
      };

      ptt.makeDataAdd = function( data ) {
         var self = this;
         self.DATA["AS_IS"].push(data);
      };

      ptt.makeDataLen = function( type ) {
         var self = this;
         if ( type === undefined ) return self.DATA["AS_IS"].length;
         return self.DATA[type].length;
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

      ptt.makeData = function( data, pk ) {
         var self = this;
         var dt = self.makeDataGet("AS_IS"),
             dtLen = self.makeDataLen("AS_IS");
         var dataLen = data.length;

         // AS_IS
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
         var dt = self.makeDataGet("AS_IS"),
             dtLen = self.makeDataLen("AS_IS");
         var dataLen = data.length;

         // AS_IS
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

         // AS_IS
         self.makeDataPushAction(action, arrData, data, pushBind);

         return arrData;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoGrid;

   }
);
