'use strict';

define([],
   function() {

      /*********************************************************************************
       * Selected
       *********************************************************************************/
      var Selected = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            data: [],
            selectable: false
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
      Selected.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Selected.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Selected.prototype.setItems = function( data ) {
         var self = this;
         var len = data.length;
         var items = [],
             newData = [];

         for ( var i=0; i<len; i++ ) {
            if ( data[i].level !== data[i].depth ) continue;
            items.push(data[i].item);
            newData.push(data[i]);
         }

         self.options.nexus.items = self.options.items = items;

         return newData;
      };

      Selected.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Selected.prototype.requestData = function( options, callback ) {
         var self = this;
      };

      Selected.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         options.nexus.bind = text.BIND;

         return self.options = options;
      };

      Selected.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new Selected(tag);
      };

   }
);
