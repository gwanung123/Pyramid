'use strict';

define(["../../../Library/campaign.caching"],
   function( _caching ) {

      /*********************************************************************************
       * CONTEAINER TABSTRIP
       *********************************************************************************/
      var Tabstrip = function( tag ) {
         this.tag = tag;
         this.options = undefined;
         this.text = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            data: [],
            animation: undefined,
            scrollable: true,
            tabPosition: "top",
            dataTextField: undefined,
            dataContentField: undefined,
            sortable: true,
            closable: true
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /**
       *
       */
      Tabstrip.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Tabstrip.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Tabstrip.prototype.requestData = function( options, callback ) {
         var self = this;
      };

      Tabstrip.prototype.getOptions = function( text, nexus, shared, dbms ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.text = text;

         return self.options = options;
      };

      Tabstrip.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new Tabstrip(tag);
      };

   }
);
