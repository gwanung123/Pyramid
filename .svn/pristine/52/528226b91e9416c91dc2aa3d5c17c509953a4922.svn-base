'use strict';

define(["./models/model.kendo.user.AgentChart", "kendo.all.min"],
   function( model ) {

      function KendoMonitorUserAgentStateVM( tag, domID, options ) {

         console.log("[KendoMonitorUserAgentStateVM] :: TmplAgentStateChart : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //dom empty
         this.location = $("#nxUserAgentStateChart");
         this.location.empty();

         //Donutchart
         this.donutchart = this.location.kendoChart(this.param).data("kendoChart");

         //kendo
         this._viewModel = kendo.observable({
            agentStateChart: []
         });
         kendo.bind($(".nx-user-agentState-bottom"), this._viewModel);

         //수정 후 삭제
         this.setData();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorUserAgentStateVM.prototype.onDestroy = function() {
         var self = this;
         self.donutchart.destroy();
      };

      KendoMonitorUserAgentStateVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorUserAgentStateVM.prototype.setData = function( data, param ) {
         var self = this;
         var finalData;

         if ( data === undefined ) {
            data = [];
            finalData = self.model.makeDataDefault(self.nexus.bind, param);
         }
         else {
            finalData = self.model.makeData(data, self.nexus.bind, param);
         }

         self.donutchart.dataSource.data(finalData);
         self._viewModel.set("agentStateChart", self.model.makeDataBottom(data, self.nexus.bind));
      };

      KendoMonitorUserAgentStateVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };


      return KendoMonitorUserAgentStateVM;
   }
);