'use strict';

define(["./models/model.kendo.board.AgentState", "kendo.all.min"],
   function( model ) {

      function KendoMonitorAgentStateVM( tag, domID, options ) {

         console.log("[KendoMonitorAgentStateVM] :: TmplAgentState : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //kendo
         this._viewModel = kendo.observable({
            agentState: []
         });

         kendo.bind($("#nx-monitor-agent-state"), this._viewModel);

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorAgentStateVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorAgentStateVM.prototype.setData = function( data, param ) {
         var self = this;
         self._viewModel.set("agentState", self.model.makeData(data, self.nexus.bind, param));
         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
      };

      KendoMonitorAgentStateVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;

         self._viewModel.set("agentState", self.model.makeData(data, self.nexus.bind));
      };


      return KendoMonitorAgentStateVM;
   }
);