'use strict';

define([],
   function() {

      /*********************************************************************************
       * MENU
       *********************************************************************************/
      var Menu = function( tag ) {
         this.tag = tag;
         this.myTag = undefined;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            data: [],
            scrollable: true
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /**
       *
       */
      Menu.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Menu.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Menu.prototype.setItems = function( data ) {
         var self = this;
         var len = data.length;
         var items = [];

         for ( var i=0; i<len; i++ ) {
            if ( data[i].level !== data[i].depth ) continue;
            items.push({
               text: data[i].item,
               cssClass: self.tag + "-" + data[i].item
            });
         }

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      Menu.prototype.addItems = function( data, text ) {
         var self = this;
         var items = self.getItems(),
             field = text[self.myTag].TEXT_FIELD;
         var result = {
            text: data[field],
            cssClass: self.tag + "-" + data[field]
         };

         items.push(result);

         return new Array(result);
      };

      Menu.prototype.delItems = function( data, text ) {
         var self = this;
         var items = self.getItems(),
             field = text[self.myTag].TEXT_FIELD;

         for ( var i=0; i<items.length; i++ ) {
            if ( items[i] !== data[field] ) continue;
            items.splice(i, 1);
            break;
         }

         return self.tag + "-" + data[field];
      };

      Menu.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Menu.prototype.requestData = function( options, callback ) {
         var self = this;
      };

      Menu.prototype.getOptions = function( text, dbms, myTag ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.myTag = myTag;

         return self.options = options;
      };

      Menu.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new Menu(tag);
      };

   }
);
