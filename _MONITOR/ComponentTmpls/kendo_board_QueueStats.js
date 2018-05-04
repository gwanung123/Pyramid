'use strict';

define([
      "./models/model.kendo.board.QueueStats",
      "../Components/components",
      "kendo.all.min"
   ],
   function( model, _Components ) {

      function KendoMonitorQueueStatsVM( tag, domID, options ) {

         console.log("[KendoMonitorQueueStatsVM] :: TmplQueueStats : load");

         this.TAG = tag;
         this.nexus = options.nexus;

         //model
         this.model = new model();
         this.setEvents(domID, options);

         //parameter
         this.param = this.model.makeOption(options);
         this.param.setData = options.setData;

         //kendo template
         this._viewModel = kendo.observable({
            queueStats: []
         });

         kendo.bind($("#nx-monitor-queue-stats"), this._viewModel);

         //kendo multiSelect
         this.param.onOpen = options.onOpen;
         this.param.onSelect = options.onSelect;
         this.param.onDeselect = options.onDeselect;

         this.select = _Components.onComponentLoad(this.TAG,
                                     "KENDO.MULTISELECT",
                                     "nx-monitor-queue-stats-select",
                                     this.param);

         this.setData();

         return this;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      KendoMonitorQueueStatsVM.prototype.getData = function( type ) {
         var self = this;
         return self.model.makeDataGet(type);
      };

      KendoMonitorQueueStatsVM.prototype.setData = function( data, param ) {
         var self = this;
         var finalData;

         if ( data === undefined ) {
            finalData = self.model.makeDataDefault(self.nexus.bind, param);
            data = self.model.makeDataDefaultASIS(self.nexus.fields);
         }
         else {
            finalData = self.model.makeData(data, self.nexus.bind, param);
         }

         self._viewModel.set("queueStats", finalData);

         if ( self.param.setData !== undefined ) self.param.setData(self.TAG, data, self);
      };

      KendoMonitorQueueStatsVM.prototype.setDataSelect = function( data ) {
         var self = this;
         var asis = self.select.getData("AS_IS");

         if ( asis === undefined || asis.length !== data.length ) self.select.setData(data);
      };

      KendoMonitorQueueStatsVM.prototype.setPushData = function( action, service, id, data, bind ) {
         var self = this;
         self._viewModel.set("queueStats", self.model.makeData(data, self.nexus.bind));
      };

      KendoMonitorQueueStatsVM.prototype.setEvents = function( domID, options ) {
         var self = this;
      };

      return KendoMonitorQueueStatsVM;
   }
);