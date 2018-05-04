'use strict';

define(["../../../Library/manage.dbms"],
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
            checkbox: true,
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
      RouteTreeview.prototype.getData = function( arrData ) {
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
         var depth = bind.DEPTH1,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]]
         };
      };

      RouteTreeview.prototype.requestDepth2 = function( bind, self ) {
         var depth = bind.DEPTH2,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]]
         };
      };

      RouteTreeview.prototype.requestDepth3 = function( bind, self ) {
         var depth = bind.DEPTH3,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]]
         };
      };

      RouteTreeview.prototype.requestDepth4 = function( bind, self ) {
         var depth = bind.DEPTH4,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]]
         };
      };

      RouteTreeview.prototype.requestDepth5 = function( bind, self ) {
         var deferred = $.Deferred();
         var depth = bind.DEPTH5,
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
                     data: self.getData(output)
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
             v1 = self.requestDepth1(bind, self),
             v2 = self.requestDepth2(bind, self),
             v3 = self.requestDepth3(bind, self),
             v4 = self.requestDepth4(bind, self),
             f5 = self.requestDepth5;

         $.when( f5(bind, self) )
          .done(
            function( v5 ) {
               var result = {};

               result[v1.tag] = v1.data;
               result[v2.tag] = v2.data;
               result[v3.tag] = v3.data;
               result[v4.tag] = v4.data;
               result[v5.tag] = v5.data;

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
         options.template = "#if ( item.monitor === 0 ) {#" +
                            "<b style='color: darkgrey;'>#= item[item.textField] #</b>" +
                            "#} else {#" +
                            "<b>#= item[item.textField] #</b>" +
                            "#}#";

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
