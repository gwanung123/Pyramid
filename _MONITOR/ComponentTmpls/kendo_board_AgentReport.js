'use strict';

define(["./models/model.kendo.board.AgentReport", "kendo.all.min"],
   function( model ) {

      function KendoMonitorAgentReportVM( tag, domID, options ) {

         console.log("[KendoMonitorAgentReportVM] :: TmplAgentReport : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //kendo
         this._viewModel = kendo.observable({
            agentReport: []
         });

         kendo.bind($("#nx-monitor-agent-report"), this._viewModel);

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorAgentReportVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorAgentReportVM.prototype.setData = function( data, param ) {
         var self = this;
         self._viewModel.set("agentReport", self.model.makeData(data, self.nexus.bind, param));
         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
      };

      KendoMonitorAgentReportVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._viewModel.set("agentReport", self.model.makeData(data, self.nexus.bind));
      };


      return KendoMonitorAgentReportVM;
   }
);