'use strict';

define(["../../../Library/monitor.caching"],
   function( _caching ) {

      /*********************************************************************************
       * WINDOW
       *********************************************************************************/
      var Window = function( tag ) {
         this.tag = tag;
         this.options = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            iframe: true,
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      Window.prototype.getData = function( data ) {
         var dataLen = data.length,
             parsed = [];

         for( var idx=0; idx<dataLen; idx++ ) {
            parsed.push(data[idx].DATA);
         }

         return parsed;
      };

      Window.prototype.getPushData = function( data ) {
         var parsed = [];

         parsed.push(data.DATA);

         return parsed;
      };

      Window.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         //options.nexus.bind = text.BIND;

         //options.resizable = false;
         //options.width = "275px";
         //options.height = "310px";
         
         return self.options = options;
      };

      Window.prototype.setNexusJoin = function( name, cb, cbParam ) {
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
         return new Window(tag);
      };

   }
);
