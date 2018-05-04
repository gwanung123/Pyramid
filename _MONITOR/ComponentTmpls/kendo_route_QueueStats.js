'use strict';

define(["./models/model.kendo.route.QueueStats", "kendo.all.min"],
   function( model ) {

      function KendoMonitorQueueStatsVM( tag, domID, options ) {

         console.log("[KendoMonitorQueueStatsVM] :: TmplQueueStats : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //kendo
         this._viewModel = kendo.observable({
            queueStats: []
         });

         kendo.bind($("#nx-monitor-queue-stats"), this._viewModel);

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorQueueStatsVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorQueueStatsVM.prototype.setData = function( data, param ) {
         var self = this;
         var nexus = self.nexus.join,
             finalData;

         if ( data === undefined ) {
            finalData = self.model.makeDataDefault(self.nexus.bind, param);
            data = self.model.makeDataDefaultASIS(self.param.fields);
         }
         else {
            finalData = self.model.makeData(data, self.nexus.bind, param);
         }

         self._viewModel.set("queueStats", finalData);

         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
         if ( nexus.setData !== undefined ) {
            var len = nexus.setData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setData[i];
               cb.callback(self.TAG, data, self, cb.callbackParam);
            }
         }
      };

      KendoMonitorQueueStatsVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         var nexus = self.nexus.join;

         self._viewModel.set("queueStats", self.model.makeData(data, self.nexus.bind));

         if ( nexus.setPushData !== undefined ) {
            var len = nexus.setPushData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setPushData[i];
               cb.callback(self.TAG, action, service, id, data, bind, self, cb.callbackParam);
            }
         }
      };


      return KendoMonitorQueueStatsVM;
   }
);