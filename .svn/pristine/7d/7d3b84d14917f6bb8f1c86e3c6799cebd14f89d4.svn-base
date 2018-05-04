'use strict';

define(["./models/model.kendo.board", "kendo.all.min"],
   function( model ) {

      function KendoWallboardBoardVM( tag, domID, options ) {

         console.log("[KendoWallboardBoardVM] :: TmplBoard : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //kendo DataSource
         var _dataSource = new kendo.data.DataSource({
            data: [],
            pageSize: this.param.pageSize
         });

         //kendo Pager
         this.pager = $("#nx-wallboard-item-pager").kendoPager({
            dataSource: _dataSource
         }).data("kendoPager");

         //kendo Listview
         this.listView = $("#nx-wallboard-item-listview").kendoListView({
            dataSource: _dataSource,
            template: kendo.template($("#item-template").html())
         }).data("kendoListView");

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoWallboardBoardVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoWallboardBoardVM.prototype.setData = function( data ) {
         var self = this;
         var nexus = self.nexus.join,
             finalData;

         if ( data === undefined ) data = [];

         finalData = self.model.makeData(data);

         self.listView.dataSource.data(finalData);

         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
         if ( nexus.setData !== undefined ) {
            var len = nexus.setData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setData[i];
               cb.callback(self.TAG, data, self, cb.callbackParam);
            }
         }
      };

      KendoWallboardBoardVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         var nexus = self.nexus.join;

         self.setData(data);

         if ( nexus.setPushData !== undefined ) {
            var len = nexus.setPushData.length;
            for ( var i=0; i<len; i++ ) {
               var cb = nexus.setPushData[i];
               cb.callback(self.TAG, action, service, id, data, bind, self, cb.callbackParam);
            }
         }
      };


      return KendoWallboardBoardVM;
   }
);