'use strict';

define(["../../Library/master.dbms"],
   function( _DBMS ) {

      /*********************************************************************************
       * LOGIN
       *********************************************************************************/
      var Loading = function( tag ) {
         this.tag = tag;
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
      Loading.prototype.getData = function( arrData ) {
         var dataLen = arrData.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx];
            parsed.push(data);
         }

         return parsed;
      };

      Loading.prototype.getValue = function( data, type ) {
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

            case "time":
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

      Loading.prototype.getPushData = function( asis, pushed, pushBind ) {
         var self = this;
         var action = pushed.ACTION,
             data = pushed.DATA;

         var pk = pushBind.PK,
             bind = pushBind.DATA,
             len = asis.length,
             fined = -1;

         for ( var i=0; i<len; i++ ) {
            var item = asis[i],
                isFined = false;

            for ( var j=0; j<pk.length; j++ ) {
               var dataKey = pk[j],
                   itemBind = bind[dataKey];

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
                  if ( asis[0][field] === undefined ) continue;
                  obj[field] = self.getValue(data[key], type);
               }

               asis.push(obj);
               break;

            case "update":
               var obj = {};

               for ( var key in bind ) {
                  var itemBind = bind[key],
                      field = itemBind.field,
                      type = itemBind.type;
                  if ( asis[0][field] === undefined ) continue;
                  obj[field] = self.getValue(data[key], type);
               }

               if ( fined >= 0 ) {
                  asis[fined] = obj;
               }
               break;

            case "delete":
               if ( fined >= 0 ) {
                  asis.splice(fined, 1);
               }
               break;
         }

         return asis;
      };

      Loading.prototype.requestData = function( options, callback ) {
         var self = this;

         _DBMS({
            url : options.URL,
            params : {
               query : options.QUERY
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


      /************************************************************************************

       ************************************************************************************/
      return function( tag ) {
         return new Loading(tag);
      };

   }
);
