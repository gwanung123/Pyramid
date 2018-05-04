'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * AGENT TREEVIEW
       *********************************************************************************/
      var AgentTreeview = function( tag ) {
         this.tag = tag;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               info: undefined,
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
      AgentTreeview.prototype.getValue = function( data, type ) {
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

      AgentTreeview.prototype.getData = function( arrData, args ) {
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

      AgentTreeview.prototype.getPushData = function( data ) {
         return data.DATA;
      };

      AgentTreeview.prototype.requestDepth1 = function( bind, self ) {
         var deferred = $.Deferred();
         var nx = self.options.nexus.info,
             depth = bind.DEPTH1,
             items = new Array(nx.tenantId.toString());

         _caching({
            url : depth.URL,
            params : {
               tag    : depth.TAG,
               fields : depth.FIELDS,
               items  : items
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
                     data: self.getData(output, depth.ARGS)
                  });
               }
               else {
                  deferred.resolve();
               }
            }
         });

         return deferred.promise();
      };

      AgentTreeview.prototype.requestDepth2 = function( bind, self ) {
         var deferred = $.Deferred();
         var nx = self.options.nexus.info,
             depth = bind.DEPTH2;

         _caching({
            url : depth.URL,
            params : {
               tag    : depth.TAG,
               fields : depth.FIELDS,
               tenant : nx.tenantId.toString()
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
                     data: self.getData(output, depth.ARGS)
                  });
               }
               else {
                  deferred.resolve();
               }
            }
         });

         return deferred.promise();
      };

      AgentTreeview.prototype.requestData = function( options, callback ) {
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

      AgentTreeview.prototype.getOptions = function( text, nexus, shared, dbms ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.info = nexus;
         options.nexus.bind = text.BIND;

         options.dataTextField = text.TEXT_FIELD;
         options.template = "<b>#= item[item.textField] #</b>";

         return self.options = options;
      };

      AgentTreeview.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new AgentTreeview(tag);
      };

   }
);
