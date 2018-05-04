'use strict';

define(["./models/model.kendo.splitter", "kendo.all.min"],
   function( model ) {

      function KendoSplitter( tag, domID, options ) {
         console.log("[KendoSplitter] :: Splitter : load");

         if ( options === null ) {
            console.log("[KendoSplitter] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoSplitter parameter
         this.param = this.model.makeOption(domID, options);
         this.param.expand = this.onExpand;
         this.param.collapse = this.onCollapse;

         if ( this.param === null ) {
            console.log("[KendoSplitter] :: error > invalid options");
            return null;
         }

         this.param._nexus = options._nexus;

         //dom
         this.location = $("#" + domID);

         //splitter
         this.splitter = this.location.kendoSplitter(this.param).data("kendoSplitter");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoSplitter.prototype.onDestroy = function() {
         var self = this;
         self.splitter.destroy();
      };

      /*
      KendoSplitter.prototype.getData = function( type ) {
         var self = this;
      };

      KendoSplitter.prototype.setData = function( data, param ) {
         var self = this;
      };

      KendoSplitter.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };
      */

      KendoSplitter.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onExpand = function( e ) {
            console.log("[KendoSplitter] :: splitter : onExpand");
            if ( options.onExpand !== undefined ) options.onExpand(self.TAG, e.pane, self);
            if ( nexus.onExpand !== undefined ) {
               var len = nexus.onExpand.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onExpand[i];
                  cb.callback(self.TAG, e.pane, self);
               }
            }
         };

         self.onCollapse = function( e ) {
            console.log("[KendoSplitter] :: splitter : onCollapse");
            if ( options.onCollapse !== undefined ) options.onCollapse(self.TAG, e.pane, self);
            if ( nexus.onCollapse !== undefined ) {
               var len = nexus.onCollapse.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onCollapse[i];
                  cb.callback(self.TAG, e.pane, self);
               }
            }
         };
      };

      KendoSplitter.prototype.doMethods = function() {
         var self = this;

         self.doCollapse = function( pane ) {
            self.splitter.collapse(pane);
         };

         self.doExpand = function( pane ) {
            self.splitter.expand(pane);
         };
      };

      return KendoSplitter;
   }
);