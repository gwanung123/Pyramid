'use strict';

define(["../../../Library/scenario.caching"],
   function( _caching ) {

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
      RouteTreeview.prototype.getData = function( arrRead, arrData ) {
         var clone = $.extend(true, [], arrRead),
             parsed = [];

         for( var idx=0; idx<clone.length; idx++ ) {
            var read = clone[idx].DATA;

            read["SCENARIO"] = JSON.parse(read["SCENARIO"]);
            for ( var id in read["SCENARIO"] ) {
               if ( id === "" ) break;
               read["SCENARIO_ID"] = id;
               read["SCENARIO_NAME"] = read["SCENARIO"][id];
            }

            if ( read["SCENARIO_ID"] === undefined ) {
               clone.splice(idx, 1);
               idx = idx - 1;
               continue;
            }

            for ( var i=0; i<arrData.length; i++ ) {
               var data = arrData[i];
               if ( data["CENTER_ID"].toString() !== read["CENTER_ID"] ) continue;
               if ( data["TENANT_ID"].toString() !== read["TENANT_ID"] ) continue;
               if ( data["QUEUE_ID"] !== read["ROUTE_ID"] ) continue;

               read["CENTER_ID"] = data["CENTER_ID"];
               read["TENANT_ID"] = data["TENANT_ID"];
               read["DNMAJOR_ID"] = data["DNMAJOR_ID"];
               read["DNSUB_ID"] = data["DNSUB_ID"];
               read["QUEUE_ID"] = data["QUEUE_ID"];
               delete(read["ROUTE_ID"]);
            }

            parsed.push(read);
         }

         return parsed;
      };

      RouteTreeview.prototype.getPushData = function( action, service, asis, data ) {
         var self = this;

         if ( service === "route_scenario" ) {
            var items = asis[service],
                obj = { DATA: data },
                parsed = self.getData(new Array(obj), items),
                isExist = false;

            parsed = parsed[0];

            for ( var i=0; i<items.length; i++ ) {
               var item = items[i];
               if ( item["CENTER_ID"] !== parsed["CENTER_ID"] ) continue;
               if ( item["TENANT_ID"] !== parsed["TENANT_ID"] ) continue;
               if ( item["DNMAJOR_ID"] !== parsed["DNMAJOR_ID"] ) continue;
               if ( item["DNSUB_ID"] !== parsed["DNSUB_ID"] ) continue;
               if ( item["QUEUE_ID"] !== parsed["QUEUE_ID"] ) continue;
               isExist = true;
               break;
            }
            if ( isExist === true ) return { ACTION: "update", DATA: parsed };
         }
         else if ( service === "route" ) {
            switch ( action ) {
               case "save":
                  if ( !(data["QUEUE_KIND"] === "4" && data["QUEUE_TYPE"] !== "3" && data["QUEUE_TYPE"] !== "4") ) {
                     return null;
                  }
                  break;

               case "update":
                  if ( !(data["QUEUE_KIND"] === "4" && data["QUEUE_TYPE"] !== "3" && data["QUEUE_TYPE"] !== "4") ) {
                     return { ACTION: "delete", DATA: data };
                  }

                  var items = asis[service],
                      isExist = false;
                  for ( var i=0; i<items.length; i++ ) {
                     var item = items[i];
                     if ( item["CENTER_ID"].toString() !== data["CENTER_ID"] ) continue;
                     if ( item["TENANT_ID"].toString() !== data["TENANT_ID"] ) continue;
                     if ( item["DNMAJOR_ID"].toString() !== data["DNMAJOR_ID"] ) continue;
                     if ( item["DNSUB_ID"].toString() !== data["DNSUB_ID"] ) continue;
                     if ( item["QUEUE_ID"] !== data["QUEUE_ID"] ) continue;
                     isExist = true;
                     break;
                  }
                  if ( isExist === false ) return { ACTION: "save", DATA: data };
                  break;
            }
         }

         return {
            ACTION: action,
            DATA: data
         }
      };

      RouteTreeview.prototype.requestDepth1 = function( bind, self ) {
         var depth = bind.DEPTH1,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]] || shared
         };
      };

      RouteTreeview.prototype.requestDepth2 = function( bind, self ) {
         var depth = bind.DEPTH2,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]] || shared
         };
      };

      RouteTreeview.prototype.requestDepth3 = function( bind, self ) {
         var deferred = $.Deferred();
         var depth = bind.DEPTH3,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]],
             arrData = shared[arrPath[3]] || shared;

         _caching({
            url : depth.URL,
            params : {
               tag : depth.TAG,
               fields : depth.FIELDS
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
                     data: self.getData(output, arrData)
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
             f3 = self.requestDepth3;

         $.when( f3(bind, self) )
          .done(
            function( v3 ) {
               var result = {};

               result[v1.tag] = v1.data;
               result[v2.tag] = v2.data;
               result[v3.tag] = v3.data;

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
