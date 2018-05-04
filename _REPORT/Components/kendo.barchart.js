'use strict';

define(["./models/model.kendo.barchart", "kendo.all.min"],
   function( model ) {

      function KendoBarchart( tag, domID, options ) {
         console.log("[KendoBarchart] :: Barchart : load");

         if ( options === null ) {
            console.log("[KendoBarchart] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoBarchart parameter
         this.param = this.model.makeOption(options);
         this.param.seriesHover = this.onSeriesHover;

         if ( this.param === null ) {
            console.log("[KendoBarchart] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //Barchart
         this.barchart = this.location.kendoChart(this.param).data("kendoChart");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoBarchart.prototype.onDestroy = function() {
         var self = this;
         self.barchart.destroy();
      };

      KendoBarchart.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoBarchart.prototype.setData = function( data, param ) {
         var self = this;
         var finalData = self.model.makeData(data, self.nexus.bind, param);

         self.barchart.dataSource.data(finalData);
      };

      KendoBarchart.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoBarchart.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onSeriesHover = function( e ) {
            console.log("[KendoBarchart] :: Barchart : onSeriesHover");
            if ( options.onSeriesHover !== undefined ) options.onSeriesHover(self.TAG, e, self);
            if ( nexus.onSeriesHover !== undefined ) {
               var len = nexus.onSeriesHover.length;
               for ( var i=0; i<len; i++ ) {
                  var cb = nexus.onSeriesHover[i];
                  cb.callback(self.TAG, e, self, cb.callbackParam);
               }
            }
         };
      };

      KendoBarchart.prototype.doMethods = function() {
         var self = this;
      };

      return KendoBarchart;
   }
);