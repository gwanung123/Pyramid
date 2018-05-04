'use strict';

define(["../../../Library/monitor.dbms"],
   function( _DBMS ) {

      /*********************************************************************************
       * ROUTE TREEVIEW
       *********************************************************************************/
      var RouteTreeview = function( tag ) {
         this.tag = tag;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               dbms: undefined,
               bind: undefined,
               items: undefined,
               join: {}
            },
            data: [],
            dataTextField: [],
            checkbox: false,
            scroll: true,
            dragAndDrop: false
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
      RouteTreeview.prototype.getValue = function( data, type ) {
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

      RouteTreeview.prototype.getData = function( arrData, args ) {
         var self = this;
         var dataLen = arrData.length,
             parsed = [];

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx].DATA,
                obj = {};

            for ( var key in data ) {
               var arg = args[key];
               if ( arg === undefined ) continue;
               obj[arg.field] = self.getValue(data[key], arg.type);
            }

            parsed.push(obj);
         }

         return parsed;
      };

      RouteTreeview.prototype.getDBMSData = function( arrData ) {
         var dataLen = arrData.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx];
            parsed.push(data);
         }

         return parsed;
      };

      RouteTreeview.prototype.getPushData = function( data ) {
         return data.DATA;
      };

      RouteTreeview.prototype.requestDepth1 = function( bind, self ) {
         var deferred = $.Deferred();
         var depth = bind.DEPTH1,
             dbms = self.options.nexus.dbms[depth.DATA];

         _DBMS({
            url : dbms.URL,
            params : {
               tag : depth.TAG,
               query : dbms.QUERY
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  deferred.resolve();
                  return;
               }

               var tag = result.tag,
                   reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  deferred.resolve({
                     tag: tag,
                     data: self.getDBMSData(output)
                  });
               }
               else {
                  deferred.resolve();
               }
            }
         });

         return deferred.promise();
      };

      RouteTreeview.prototype.requestDepth2 = function( bind, self ) {
         var deferred = $.Deferred();
         var depth = bind.DEPTH2,
             dbms = self.options.nexus.dbms[depth.DATA];

         _DBMS({
            url : dbms.URL,
            params : {
               tag : depth.TAG,
               query : dbms.QUERY
            },
            onResult : function( result, error, param ) {
               if ( error !== null ) {
                  deferred.resolve();
                  return;
               }

               var tag = result.tag,
                   reason = result.result,
                   output = result.output;

               if ( reason.code === 1 ) {
                  deferred.resolve({
                     tag: tag,
                     data: self.getDBMSData(output)
                  });
               }
               else {
                  deferred.resolve();
               }
            }
         });

         return deferred.promise();
      };

      RouteTreeview.prototype.requestData = function( options, callback ) {
         var self = this;

         var bind = options.nexus.bind,
             f1 = self.requestDepth1,
             f2 = self.requestDepth2;

         $.when( f1(bind, self), f2(bind, self) )
          .done(
            function( v1, v2 ) {
               var result = {};

               result[v1.tag] = v1.data;
               result[v2.tag] = v2.data;

               callback.onResult(result, null, callback.onResultParam);
            }
         );
      };

      RouteTreeview.prototype.getOptions = function( text, nexus, shared, dbms ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.nexus.dbms = dbms;
         options.nexus.bind = text.BIND;

         options.dataTextField = text.TEXT_FIELD;
         options.template = "<b>#= item[item.textField] #</b>";

         return self.options = options;
      };

      RouteTreeview.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new RouteTreeview(tag);
      };

   }
);
