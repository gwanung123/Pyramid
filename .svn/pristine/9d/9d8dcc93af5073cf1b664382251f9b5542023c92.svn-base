'use strict';

define(["./models/model.kendo.board.AgentStats", "kendo.all.min"],
   function( model ) {

      function KendoMonitorAgentStatsVM( tag, domID, options ) {

         console.log("[KendoMonitorAgentStatsVM] :: TmplAgentStats : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //kendo
         this._viewModel = kendo.observable({
            agentStats: []
         });

         kendo.bind($("#nx-monitor-agent-stats"), this._viewModel);

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorAgentStatsVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorAgentStatsVM.prototype.setData = function( data, param ) {
         var self = this;
         var nexus = self.nexus.join;

         self._viewModel.set("agentStats", self.model.makeData(data, self.nexus.bind, param));

         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
         if ( nexus.setData !== undefined ) {
            var len = nexus.setData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setData[i];
               cb.callback(self.TAG, data, self, cb.callbackParam);
            }
         }
      };

      KendoMonitorAgentStatsVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         var nexus = self.nexus.join;

         self._viewModel.set("agentStats", self.model.makeData(data, self.nexus.bind));

         if ( nexus.setPushData !== undefined ) {
            var len = nexus.setPushData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setPushData[i];
               cb.callback(self.TAG, action, service, id, data, bind, self, cb.callbackParam);
            }
         }
      };


      return KendoMonitorAgentStatsVM;
   }
);