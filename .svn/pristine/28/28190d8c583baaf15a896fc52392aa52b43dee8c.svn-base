'use strict';

define(["./models/model.kendo.user.QueueList", "kendo.all.min"],
   function( model ) {

      function KendoMonitorUserQueueListVM( tag, domID, options ) {

         console.log("[KendoMonitorUserQueueListVM] :: TmplQueueList : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //dom empty
         this.location = $("#nxUserQueueListGrid");
         this.location.empty();

         //grid
         this.grid = this.location.kendoGrid(this.param).data("kendoGrid");

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorUserQueueListVM.prototype.onDestroy = function() {
         var self = this;
         self.grid.destroy();
      };

      KendoMonitorUserQueueListVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorUserQueueListVM.prototype.setDataSource = function( data, sort ) {
         var self = this;
         var nextId = data.length + 1;

         var dataSource = new kendo.data.DataSource({
            transport: {
                  read: function( e ) {
                     console.log("[KendoMonitorUserQueueListVM] :: DataSource : read");
                     e.success(data);
                  }
            },
            sort: sort
         });

         self.grid.setDataSource(dataSource);
      };

      KendoMonitorUserQueueListVM.prototype.setData = function( data ) {
         var self = this;
         var finalData = data || [],
             isChange = false;

         console.log("[KendoMonitorUserQueueListVM] :: Grid : setData: " + finalData.length);

         if ( finalData.length === 0 ) {
            self.setDataSource(finalData, self.nexus.sort);
            finalData = self.model.makeDataSet(finalData, self.nexus.bind);
            return;
         }

         if ( self.model.makeDataLen() > 0 ) {
            finalData = self.model.makeData(data, self.nexus.pk);
         }

         finalData = self.model.makeDataSet(finalData, self.nexus.bind);
         self.setDataSource(finalData, self.nexus.sort);
      };

      KendoMonitorUserQueueListVM.prototype.setDataDelete = function( data ) {
         console.log("[KendoMonitorUserQueueListVM] :: Grid : setDataDelete: "+data.length);
         var self = this;
         var finalData = self.model.makeDataDelete(data, self.nexus.pk);

         finalData = self.model.makeDataSet(finalData, self.nexus.bind);
         self.setDataSource(finalData, self.nexus.sort);
      };

      KendoMonitorUserQueueListVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;

         if ( bind === undefined ) return;

         var finalData = self.model.makeDataPush(action, data, bind);
         finalData = self.model.makeDataSet(finalData, self.nexus.bind);

         self.setDataSource(finalData, self.nexus.sort);
      };


      return KendoMonitorUserQueueListVM;
   }
);