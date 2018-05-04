'use strict';

define([],
   function() {

      /************************************************************
       * name        : wallboard.block
       * url         : Library/wallboard.block.js
       * description :
       ************************************************************/

      var nxBlock = function() {
         this.block = {
            createTime : new Date().getTime(),
            nexus : {},
            dbms : "",
            shared : {
               _master: {},
               _ccc: {},
               pusher: null,
               pushCallbacks: {
                  master: [],
                  stats: {
                     wallboard: []
                  }
               }
            },
            windows : {}
         };

         return this;
      };

      nxBlock.prototype.get = function( key, depthKey ) {
         var block = this.block;

         if ( depthKey === undefined ) {
            for ( var prop in block ) {
               if ( prop === key ) {
                  return block[prop];
               }
            }
         }
         else {
            var subBlock = this.block[depthKey];

            for ( var prop in subBlock ) {
               if ( prop === key ) {
                  return subBlock[prop];
               }
            }
         }

         return null;
      };

      nxBlock.prototype.getBlock = function() {
         var block = this.block;
         return block;
      };

      nxBlock.prototype.set = function( obj, depthKey ) {
         var block = this.block;

         if ( depthKey === undefined ) {
            for ( var prop in obj ) {
               if ( block.hasOwnProperty(prop) ) block[prop] = obj[prop];
               else console.log( "[nxBlock] :: nxBlock : set - block has not " + prop);
            }
         }
         else {
            var subBlock = this.block[depthKey];

            for ( var prop in obj ) {
               if ( subBlock.hasOwnProperty(prop) ) subBlock[prop] = obj[prop];
               else console.log( "[nxBlock] :: nxBlock : set - subBlock has not " + prop);
            }
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

      /**
       * for windows
       */
      nxBlock.prototype.setWindow = function( key, domID, handle ) {
         var block = this.block;
         var windows = block.windows;

         if ( windows[key] === undefined ) windows[key] = {};

         var win = windows[key];

         win[domID] = {
            vm: handle,
            view: new nxWindow()
         };

         return this;
      };

      nxBlock.prototype.getWindow = function( key, domID ) {
         var block = this.block;
         var windows = block.windows;

         if ( windows[key] === undefined ) return null;

         var win = windows[key];

         return (win[domID] === undefined)? null:win[domID];
      };

      nxBlock.prototype.delWindow = function( key, domID ) {
         var block = this.block;
         var windows = block.windows;

         if ( windows[key] === undefined ) return this;

         var win = windows[key];
         delete win[domID];

         return this;
      };

      /************************************************************
       * sub class
       ************************************************************/
      var nxWindow = function() {
         this.win = {
            createTime : new Date().getTime(),
            root : "",
            dbms : {},
            viewTop : {
               define : {},
               text : {},
               components : {},
               methods : undefined
            },
            viewBottom : {
               define : {},
               text : {},
               components : {},
               methods : undefined
            },
            viewLeft : {
               define : {},
               text : {},
               components : {},
               methods : undefined
            },
            viewRight : {
               define : {},
               text : {},
               components : {},
               methods : undefined
            },
            viewCenter : {
               define : {},
               text : {},
               components : {},
               methods : undefined
            }
         };

         return this;
      };

      nxWindow.prototype.get = function( key, depthKey ) {
         var win = this.win;

         if ( depthKey === undefined ) {
            for ( var prop in win ) {
               if ( prop === key ) {
                  return win[prop];
               }
            }
         }
         else {
            var subBlock = this.win[depthKey];

            for ( var prop in subBlock ) {
               if ( prop === key ) {
                  return subBlock[prop];
               }
            }
         }

         return null;
      };

      nxWindow.prototype.getBlock = function() {
         var win = this.win;
         return win;
      };

      nxWindow.prototype.set = function( obj, depthKey ) {
         var win = this.win;

         if ( depthKey === undefined ) {
            for ( var prop in obj ) {
               if ( win.hasOwnProperty(prop) ) win[prop] = obj[prop];
               else console.log( "[nxWindow] :: nxWindow : set - window has not " + prop);
            }
         }
         else {
            var subBlock = this.win[depthKey];

            for ( var prop in obj ) {
               if ( subBlock.hasOwnProperty(prop) ) subBlock[prop] = obj[prop];
               else console.log( "[nxWindow] :: nxWindow : set - subBlock has not " + prop);
            }
         }

         return this;
      };

      nxWindow.prototype.setBlock = function( obj ) {
         this.win = obj;
         return this;
      };

      nxWindow.prototype.clone = function() {
         var clone = $.extend(true, {}, this.win);
         return new nxWindow().setBlock(clone);
      };

      return {
         block: nxBlock,
         win: nxWindow
      };
   }
);


