'use strict';

define(["../../../Library/kms.caching"],
   function( caching ) {
    // define(["_", "../../../Library/kms.caching"],
    // function( _, caching ) {

      /*****************************************************
       *
       */
      var TeamTree1 = function( title ) {
         this.title = title;
         this.options = {};
      };

      var ptt1 = TeamTree1.prototype;

      ptt1.move = function( field ) {
         var self = this;
        //  var depth = _.split(self.title, "."),
         var depth = self.title.split("."),
             root = field[depth[0]];
         return root[depth[1]];
      };

      ptt1.parsing = function( it ) {
         var self = this,
             field = self.options.field,
             depth = field.length,
             buffer = [],
             itemsPos,
             parsed = {};


         for ( var idx=0; idx<depth; idx++ ) {
            var key = field[idx],
                obj = {};

            obj[key] = it[key];
            if ( idx === depth-1 ) obj[key] = obj[key] + "(" + it["GROUP_NAME"] + ")";
            else obj.items = [];
            buffer.push(obj);
         }

         for ( var idx=0; idx<buffer.length; idx++ ) {
            if ( idx === 0 ) {
               parsed = buffer[idx];
               itemsPos = parsed.items;
               continue;
            }

            if ( itemsPos !== undefined ) {
               itemsPos.push(buffer[idx]);
               itemsPos = buffer[idx].items;
            }
         }

         return parsed;
      };

      ptt1.getData = function( callback ) {
         var self = this;

         caching("group", {
            url : "/cairo/caching/master/group",
            onResult : function(result, error, param) {
               var parse = [];
               /**
                * ## parsing
                * - before
                * [{"nx.group-0-100":{"TENANT_ID":"10","GROUP_ID":"100","GROUP_NAME":"NEXUS"}}]
                * - after
                * {"TENANT_ID":"10", items:[{"GROUP_ID":"100"}]}
                */
               if ( result !== null ) {
                  for( var idx=0; idx<result.length; idx++ ) {
                     parse.push(self.parsing(_.values(result[idx])[0]));
                  }
               }

               callback(parse, error, param);
            }
         });
      };

      ptt1.getOptions = function( field, data ) {
         var self = this,
             optField = self.move(field);

         self.options = {
            dataType: "json",
            data: (data)? data : undefined,
            field: optField,
            drag: true
         };

         return self.options;
      };


      /*****************************************************
       *
       */
      var TeamTree2 = function( title ) {
         this.title = title;
         this.options = {};
      };

      var ptt2 = TeamTree2.prototype;

      ptt2.move = function( field ) {
         var self = this;
         var depth = _.split(self.title, "."),
             root = field[depth[0]];
         return root[depth[1]];
      };

      ptt2.parsing = function( it ) {
         var self = this,
             field = self.options.field,
             depth = field.length,
             buffer = [],
             itemsPos,
             parsed = {};


         for ( var idx=0; idx<depth; idx++ ) {
            var key = field[idx],
                obj = {};

            obj[key] = it[key];
            if ( idx === depth-1 ) obj[key] = obj[key] + "(" + it["TEAM_NAME"] + ")";
            else obj.items = [];
            buffer.push(obj);
         }

         for ( var idx=0; idx<buffer.length; idx++ ) {
            if ( idx === 0 ) {
               parsed = buffer[idx];
               itemsPos = parsed.items;
               continue;
            }

            if ( itemsPos !== undefined ) {
               itemsPos.push(buffer[idx]);
               itemsPos = buffer[idx].items;
            }
         }

         return parsed;
      };

      ptt2.getData = function( callback ) {
         var self = this;

         caching("team", {
            url : "/cairo/caching/master/team",
            onResult : function(result, error, param) {
               var parse = [];
               /**
                * ## parsing
                * - before
                * [{"nx.team-0-101":{"TENANT_ID":"10","GROUP_ID":"100","TEAM_ID":"101","TEAM_NAME":"NEXUS-Team"}}]
                * - after
                * {"TENANT_ID":"10", items:[{"GROUP_ID":"100", items:["TEAM_ID":"101"]}]}
                */
               if ( result !== null ) {
                  for( var idx=0; idx<result.length; idx++ ) {
                     parse.push(self.parsing(_.values(result[idx])[0]));
                  }
               }

               callback(parse, error, param);
            }
         });
      };

      ptt2.getOptions = function( field, data ) {
         var self = this,
             optField = self.move(field);

         self.options = {
            dataType: "json",
            data: (data)? data : undefined,
            field: optField,
            drag: true
         };

         return self.options;
      };

      /************************************************************************************
         options = {
            dataType : "json",
            data : [{center:"1", items:[{tenent:"10"}, {tenent:"20"}]},{center: "2"}],
            field : ["center", "tenent"],
            checkbox : true,
            scroll : true,
            drag : true,
            onSelect : function( e ) {
               console.log("Selecting", e.node);
            }
         }
       ************************************************************************************/
      return function( title ) {
         switch ( title ) {
            case "TEAM.TREE1": return new TeamTree1(title);
               break;
            case "TEAM.TREE2": return new TeamTree2(title);
               break;
         }
      };

   }
);
