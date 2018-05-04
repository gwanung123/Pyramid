'use strict';

define(["./models/model.kendo.user.AgentList", "kendo.all.min"],
   function( model ) {

      function KendoMonitorUserAgentListVM( tag, domID, options ) {

         console.log("[KendoMonitorUserAgentListVM] :: TmplAgentList : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //dom empty
         this.location = $("#nxUserAgentListGrid");
         this.location.empty();

         //grid
         this.grid = this.location.kendoGrid(this.param).data("kendoGrid");

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorUserAgentListVM.prototype.onDestroy = function() {
         var self = this;
         self.grid.destroy();
      };

      KendoMonitorUserAgentListVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorUserAgentListVM.prototype.setDataSource = function( data, sort ) {
         var self = this;
         var nextId = data.length + 1;

         var dataSource = new kendo.data.DataSource({
            transport: {
                  read: function( e ) {
                     console.log("[KendoMonitorUserAgentListVM] :: DataSource : read");
                     e.success(data);
                  }
            },
            sort: sort
         });

         self.grid.setDataSource(dataSource);
      };

      KendoMonitorUserAgentListVM.prototype.setData = function( data ) {
         var self = this;
         var finalData = data || [],
             isChange = false;

         console.log("[KendoMonitorUserAgentListVM] :: Grid : setData: " + finalData.length);

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

      KendoMonitorUserAgentListVM.prototype.setDataDelete = function( data ) {
         console.log("[KendoMonitorUserAgentListVM] :: Grid : setDataDelete: "+data.length);
         var self = this;
         var finalData = self.model.makeDataDelete(data, self.nexus.pk);

         finalData = self.model.makeDataSet(finalData, self.nexus.bind);
         self.setDataSource(finalData, self.nexus.sort);
      };

      KendoMonitorUserAgentListVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;

         if ( bind === undefined ) return;

         var finalData = self.model.makeDataPush(action, data, bind);
         finalData = self.model.makeDataSet(finalData, self.nexus.bind);

         self.setDataSource(finalData, self.nexus.sort);
      };


      return KendoMonitorUserAgentListVM;
   }
);