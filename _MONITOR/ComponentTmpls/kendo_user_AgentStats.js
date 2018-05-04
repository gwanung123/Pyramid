'use strict';

define(["./models/model.kendo.user.AgentStats", "kendo.all.min"],
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

         kendo.bind($("#nx-monitor-user-agentStats"), this._viewModel);

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
         self._viewModel.set("agentStats", self.model.makeData(data, self.nexus.bind, param));
         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
      };

      KendoMonitorAgentStatsVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._viewModel.set("agentStats", self.model.makeData(data, self.nexus.bind));
      };


      return KendoMonitorAgentStatsVM;
   }
);