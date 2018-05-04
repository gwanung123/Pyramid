'use strict';

define(["kendo.all.min"],
   function( kendo ) {

      var dataSource = {
         json: function( options ) {
            return new kendo.data.HierarchicalDataSource({
               data: options
            });
         },
         jsonp: function( options ) {
            return new kendo.data.HierarchicalDataSource({
               transport: {
                  read: {
                     url: options.url,
                     dataType: "jsonp"
                  }
               },
               schema: {
                  model: options.model
               }
            });
         }
      };

      var config = {
         dataSource: function( param, dataType, value ) {
            switch ( dataType ) {
               case "json": param.dataSource = dataSource.json(value);
                  break;
               case "jsonp": param.dataSource = dataSource.jsonp(value);
                  break;
               case "image":
                  param.dataSource = value;
                  param.dataImageUrlField = "image";
                  break;
            }
            return param;
         },
         dataTextField: function( param, value ) {
            param.dataTextField = value;
            return param;
         },
         checkboxes: function( param, bool ) {
            if ( bool ) {
               param.checkboxes = { checkChildren: true };
            }
            return param;
         },
         autoBind: function( param, bool ) {
            param.autoBind = bool;
            return param;
         },
         autoScroll: function( param, bool ) {
            param.autoScroll = bool;
            return param;
         },
         dragAndDrop: function( param, bool ) {
            param.dragAndDrop = bool;
            return param;
         }
      };

      var event = {
         onSelect: function( param, func ) {
            param.select = func;
            return param;
         }
      };

      /************************************************************************************
         options = {
            dataType : "json",
            data : [{center:"1", items:[{tenent:"10"}, {tenent:"20"}]},{center: "2"}],
            field : ["center", "tenent"],
            checkbox : true,
            scroll : true,
            drag : true,
            onSelect : function( e ) {
               console.log("Selecting", e.node);
            }
         }
       ************************************************************************************/
      return function( options ){
         var param = {};

         for ( var prop in options ) {
            switch ( prop ) {
               case "data": param = config.dataSource(param, options.dataType, options[prop]);
                  break;
               case "field": param = config.dataTextField(param, options[prop]);
                  break;
               case "checkbox": param = config.checkboxes(param, options[prop]);
                  break;
               case "scroll": param = config.autoScroll(param, options[prop]);
                  break;
               case "drag": param = config.dragAndDrop(param, options[prop]);
                  break;
               case "onSelect": param = event.onSelect(param, options[prop]);
                  break;
            }
         }

         if ( param.dataSource === undefined ) return null;
         return param;
      };

   }
);
