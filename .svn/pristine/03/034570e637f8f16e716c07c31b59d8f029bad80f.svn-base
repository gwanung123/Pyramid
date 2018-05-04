'use strict';

define(["./models/kendo_grid", "kendo.all.min"],
   function( model ) {

      function Grid( domID, options ) {
         console.log("[grid] :: Grid : load");
         var self = this;

         self.DEFAULT_PAGE_SIZE = 10;

         if ( options === null ) {
            console.log("[grid] :: error > options is null");
            return null;
         }

         //model
         self.model = new model();

         //grid set and start
         self.location = $("#" + domID);
         self.location.empty();

         //kendoGrid parameter
         self.param = self.model.makeOption(options);

         if ( self.param === null ) {
            console.log("[grid] :: error > invalid options");
            return null;
         }

         //grid
         self.grid = self.location.kendoGrid(self.param).data("kendoGrid");

         return self;
      };

      Grid.prototype.destroy = function() {
         var self = this;
         self.grid.destroy();
      };

      Grid.prototype.setDataSource = function( data, param ) {
         var self = this;
         var finalData = data;

         if ( self.model.makeDataLen() > 0 ) {
            finalData = self.model.makeData(data, param);
         }

$.nexus.modules.nxlog.log("@@@@ setDataSource makeData!!!!!=>"+param.pk[0]);

         var dataSource = new kendo.data.DataSource({
            data: finalData,
            pageSize: self.param.dataSource.pageSize || self.DEFAULT_PAGE_SIZE,
            sort: self.model.makeSort(param)
         });

         self.grid.setDataSource(dataSource);

$.nexus.modules.nxlog.log("@@@@ setDataSource add!!!!!=>"+finalData.length);

         self.model.makeDataSet(finalData);
      };

      return Grid;
   }
);