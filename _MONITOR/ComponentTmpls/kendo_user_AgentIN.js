'use strict';

define(["./models/model.kendo.user.AgentIN", "kendo.all.min"],
   function( model ) {

      function KendoMonitorUserAgentINVM( tag, domID, options ) {

         console.log("[KendoMonitorUserAgentINVM] :: TmplAgentIN : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //dom empty
         this.location = $("#nxUserAgentINGrid");
         this.location.empty();

         //grid
         this.grid = this.location.kendoGrid(this.param).data("kendoGrid");

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorUserAgentINVM.prototype.onDestroy = function() {
         var self = this;
         self.grid.destroy();
      };

      KendoMonitorUserAgentINVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorUserAgentINVM.prototype.setDataSource = function( data, sort ) {
         var self = this;
         var nextId = data.length + 1;

         var dataSource = new kendo.data.DataSource({
            transport: {
                  read: function( e ) {
                     console.log("[KendoMonitorUserAgentINVM] :: DataSource : read");
                     e.success(data);
                  }
            },
            sort: sort
         });

         self.grid.setDataSource(dataSource);
      };

      KendoMonitorUserAgentINVM.prototype.setData = function( data ) {
         var self = this;
         var finalData = data || [],
             isChange = false;

         console.log("[KendoMonitorUserAgentINVM] :: Grid : setData: " + finalData.length);

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

      KendoMonitorUserAgentINVM.prototype.setDataDelete = function( data ) {
         console.log("[KendoMonitorUserAgentINVM] :: Grid : setDataDelete: "+data.length);
         var self = this;
         var finalData = self.model.makeDataDelete(data, self.nexus.pk);

         finalData = self.model.makeDataSet(finalData, self.nexus.bind);
         self.setDataSource(finalData, self.nexus.sort);
      };

      KendoMonitorUserAgentINVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;

         if ( bind === undefined ) return;

         var finalData = self.model.makeDataPush(action, data, bind);
         finalData = self.model.makeDataSet(finalData, self.nexus.bind);

         self.setDataSource(finalData, self.nexus.sort);
      };


      return KendoMonitorUserAgentINVM;
   }
);