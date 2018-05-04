'use strict';

define(["../../Library/wallboard.caching"],
   function( _caching ) {

      /*********************************************************************************
       * LOGIN
       *********************************************************************************/
      var Loading = function( tag, sharedTag ) {
         this.tag = tag;
         this.sharedTag = sharedTag;
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
      Loading.prototype.getSecToTime = function( sec ) {
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

      Loading.prototype.getValue = function( data, type ) {
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

      Loading.prototype.getData = function( arrData, args ) {
         var self = this;
         var items = arrData[0].DATA,
             parsed = {};

         items = $.extend(true, {}, items);

         for ( var key in args ) {
            var arg = args[key],
                field = arg.field,
                type = arg.type;
            var value = items[field];

            if ( value === undefined ) continue;

            parsed[key] = self.getValue(value, type);
         }

         return parsed;
      };

      Loading.prototype.getPushData = function( asis, pushed, pushBind ) {
         var self = this;
         var action = pushed.ACTION,
             data = pushed.DATA;

         var asisData = asis[self.sharedTag],
             bind = pushBind.DATA;

         for ( var key in asisData ) {
            var item = bind[key];
            asisData[key] = self.getValue(data[item.field], item.type);
         }

         return asis;
      };

      Loading.prototype.requestData = function( options, nexus, callback ) {
         var self = this;
         var item = nexus.userId,
             fields = [];

         for ( var key in options.ARGS ) {
            var arg = options.ARGS[key];
            fields.push(arg.field);
         }

         _caching({
            url : options.URL,
            params : {
               tag : options.TAG,
               item: item,
               field: fields
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  callback.onResult(null, error, param);
                  return;
               }

               var reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  callback.onResult(self.getData(output, options.ARGS), null, param);
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
      return function( tag, sharedTag ) {
         return new Loading(tag, sharedTag);
      };

   }
);
