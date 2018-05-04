'use strict';

define(["../../../Library/master.caching"],
   function( _caching ) {

      /*********************************************************************************
       * SKILL TREEVIEW
       *********************************************************************************/
      var SkillTreeview = function( tag ) {
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

      SkillTreeview.prototype.getValue = function( data, type ) {
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

      SkillTreeview.prototype.getData = function( arrData, args ) {
         var self = this;
         var dataLen = arrData.length,
             parsed = [];

         for ( var idx=0; idx<dataLen; idx++ ) {
            var data = arrData[idx].DATA,
                skills = data["SKILL"] = JSON.parse(data["SKILL"]);

            if ( skills === null ) continue;
            if ( skills.length === 0 ) continue;

            for ( var i=0; i<skills.length; i++ ) {
               var skill = skills[i];

               for ( var id in skill ) {
                  var level = skill[id];
                  var newData = {};

                  for ( var key in args ) {
                     if ( data[key] === undefined ) continue;
                     var field = args[key].field,
                         type = args[key].type;
                     newData[field] = self.getValue(data[key], type);
                  }

                  newData["SKILL"] = skills;
                  newData["SKILL_ID"] = self.getValue(id, args["SKILL_ID"].type);
                  newData["SKILL_LEVEL"] = self.getValue(level, args["SKILL_LEVEL"].type);

                  parsed.push(newData);
               }
            }
         }

         return parsed;
      };

      SkillTreeview.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      SkillTreeview.prototype.requestDepth1 = function( bind, self ) {
         var depth = bind.DEPTH1,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]] || shared
         };
      };

      SkillTreeview.prototype.requestDepth2 = function( bind, self ) {
         var depth = bind.DEPTH2,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]] || shared
         };
      };

      SkillTreeview.prototype.requestDepth3 = function( bind, self ) {
         var depth = bind.DEPTH3,
             depthData = depth.DATA,
             arrPath = depthData.split("."),
             shared = self.shared[arrPath[2]];

         return {
            tag: depth.TAG,
            data: shared[arrPath[3]] || shared
         };
      };

      SkillTreeview.prototype.requestDepth4 = function( bind, self ) {
         var deferred = $.Deferred();
         var depth = bind.DEPTH4,
             dbms = self.options.nexus.dbms[depth.DATA],
             caching = dbms.CACHING,
             args = caching.ARGS;

         _caching({
            url : caching.URL,
            params : {
               tag : depth.TAG,
               fields : caching.FIELDS
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
                     data: self.getData(output, args)
                  });
               }
               else {
                  deferred.resolve();
               }
            }
         });

         return deferred.promise();
      };

      SkillTreeview.prototype.requestData = function( options, callback ) {
         var self = this;

         var bind = options.nexus.bind,
             v1 = self.requestDepth1(bind, self),
             v2 = self.requestDepth2(bind, self),
             v3 = self.requestDepth3(bind, self),
             f4 = self.requestDepth4;

         $.when( f4(bind, self) )
          .done(
            function( v4 ) {
               var result = {};

               result[v1.tag] = v1.data;
               result[v2.tag] = v2.data;
               result[v3.tag] = v3.data;
               result[v4.tag] = v4.data;

               callback.onResult(result, null, callback.onResultParam);
            }
         );
      };

      SkillTreeview.prototype.getOptions = function( text, dbms, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.nexus.dbms = dbms;
         options.nexus.bind = text.BIND;

         options.dataTextField = text.TEXT_FIELD;
         options.template = "<b>#= item[item.textField] #</b>";

         return self.options = options;
      };

      SkillTreeview.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new SkillTreeview(tag);
      };

   }
);
