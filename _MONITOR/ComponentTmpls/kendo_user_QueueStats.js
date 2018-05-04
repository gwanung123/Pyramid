'use strict';

define(["./models/model.kendo.user.QueueStats", "kendo.all.min"],
   function( model ) {

      function KendoMonitorQueueStatsVM( tag, domID, options ) {

         console.log("[KendoMonitorQueueStatsVM] :: TmplAgentStats : load");

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

         kendo.bind($("#nx-monitor-user-queueStats"), this._viewModel);

         //수정 후 삭제
         this.setData([]);

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
         self._viewModel.set("queueStats", self.model.makeData(data, self.nexus.bind, param));
         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
      };

      KendoMonitorQueueStatsVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._viewModel.set("queueStats", self.model.makeData(data, self.nexus.bind));
      };


      return KendoMonitorQueueStatsVM;
   }
);