'use strict';

define(["./models/model.kendo.donutchart", "kendo.all.min"],
   function( model ) {

      function KendoDonutchart( tag, domID, options ) {
         console.log("[KendoDonutchart] :: Donutchart : load");

         if ( options === null ) {
            console.log("[KendoDonutchart] :: error > options is null");
            return null;
         }

         this.TAG = tag;
         this.nexus = options.nexus || {};

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //KendoDonutchart parameter
         this.param = this.model.makeOption(options);
         this.param.seriesHover = this.onSeriesHover;

         if ( this.param === null ) {
            console.log("[KendoDonutchart] :: error > invalid options");
            return null;
         }

         //dom empty
         this.location = $("#" + domID);
         this.location.empty();

         //Donutchart
         this.donutchart = this.location.kendoChart(this.param).data("kendoChart");
         this.doMethods();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoDonutchart.prototype.onDestroy = function() {
         var self = this;
         self.donutchart.destroy();
      };

      KendoDonutchart.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoDonutchart.prototype.setData = function( data, param ) {
         var self = this;
         var finalData;

         if ( data === undefined ) {
            finalData = self.model.makeDataDefault(self.nexus.bind, param);
         }
         else {
            finalData = self.model.makeData(data, self.nexus.bind, param);
         }

         self.donutchart.dataSource.data(finalData);
      };

      KendoDonutchart.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };

      KendoDonutchart.prototype.setEvents = function( domID, options ) {
         var self = this;
         var nexus = self.nexus.join || {};

         self.onSeriesHover = function( e ) {
            console.log("[KendoDonutchart] :: Donutchart : onSeriesHover");
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

      KendoDonutchart.prototype.doMethods = function() {
         var self = this;
      };

      return KendoDonutchart;
   }
);