'use strict';

define(["./models/model.kendo.user.QueueChart", "kendo.all.min"],
   function( model ) {

      function KendoMonitorUserQueueVM( tag, domID, options ) {

         console.log("[KendoMonitorUserQueueVM] :: TmplQueueChart : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //dom empty
         this.location = $("#nxUserQueueChart");
         this.location.empty();

         //Donutchart
         this.donutchart = this.location.kendoChart(this.param).data("kendoChart");
         
         //kendo
         this._viewModel = kendo.observable({
            queueChart: []
         });
         kendo.bind($(".nx-user-queue-bottom"), this._viewModel);
         
         //수정 후 삭제
         this.setData();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorUserQueueVM.prototype.onDestroy = function() {
         var self = this;
         self.donutchart.destroy();
      };

      KendoMonitorUserQueueVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorUserQueueVM.prototype.setData = function( data, param ) {
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
         self._viewModel.set("queueChart", self.model.makeDataBottom(data, self.nexus.bind));
      };

      KendoMonitorUserQueueVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
      };


      return KendoMonitorUserQueueVM;
   }
);