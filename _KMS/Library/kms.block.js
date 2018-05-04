'use strict';

define([],
   function() {

      /************************************************************
       * name        : report.block
       * url         : Library/report.block.js
       * description :
       ************************************************************/

      var nxBlock = function() {
         this.block = {
            createTime : new Date().getTime(),
            root : "",
            define : {},
            query : "", //eric
            selectQuery : "",
            fromQuery : "",
            whereQuery : "",
            endQuery : "",
            field : {},
            components : {}
         };

         return this;
      };

      nxBlock.prototype.get = function( key ) {
         var block = this.block;

         for ( var prop in block ) {
            if ( prop === key ) {
               return block[prop];
            }
         }

         return null;
      };

      nxBlock.prototype.getBlock = function() {
         var block = this.block;
         return block;
      };

      nxBlock.prototype.set = function( obj ) {
         var block = this.block;

         for ( var prop in obj ) {
            if ( block.hasOwnProperty(prop) ) block[prop] = obj[prop];
            else console.log( "[nxBlock] :: nxBlock : set - block has not " + prop);
         }

         return this;
      };

      nxBlock.prototype.setBlock = function( obj ) {
         this.block = obj;
         return this;
      };

      nxBlock.prototype.clone = function() {
         var clone = $.extend(true, {}, this.block);
         return new nxBlock().setBlock(clone);
      };

      return nxBlock;
   }
);


