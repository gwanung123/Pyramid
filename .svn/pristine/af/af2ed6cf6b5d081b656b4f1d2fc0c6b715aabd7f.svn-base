'use strict';

define(["kendo.all.min"],
   function( kendo ) {

      var DEFAULT_PAGE_SIZE = 10;

      var dataSource = {
         json: function( options, pageSize ) {
            return new kendo.data.DataSource({
               data: options,
               pageSize: pageSize || DEFAULT_PAGE_SIZE
            });
         },
         jsonp: function( options, pageSize ) {
            return new kendo.data.DataSource({
               transport: {
                  read: {
                     url: options.url,
                     dataType: "jsonp"
                  }
               },
               schema: {
                  model: options.model
               },
               pageSize: pageSize || DEFAULT_PAGE_SIZE
            });
         }
      };

      var config = {
         columns: function( param, array ) {
            param.columns = array;
            return param;
         },
         dataSource: function( param, dataType, value, pageSize ) {
            switch ( dataType ) {
               case "json": param.dataSource = dataSource.json(value, pageSize);
                  break;
               case "jsonp": param.dataSource = dataSource.jsonp(value, pageSize);
                  break;
            }
            return param;
         },
         columnMenu: function( param, value ) {
            param.columnMenu = value;
            return param;
         },
         sortable: function( param, value ) {
            param.sortable = value;
            return param;
         },
         pageable: function( param, value ) {
            param.pageable = {
               pageSizes: true,
               refresh: true
            };
            return param;
         },
         excel: function( param, bool ) {
            if ( param.toolbar !== undefined ) param.toolbar.push("excel");
            else param.toolbar = ["excel"];
            param.excel = {
               allPages: true
            };
            return param;
         },
         pdf: function( param, bool ) {
            if ( param.toolbar !== undefined ) param.toolbar.push("pdf");
            else param.toolbar = ["pdf"];
            param.pdf = {
               allPages: true
            };
            return param;
         },
         groupable: function( param, value ) {
            param.groupable = value;
            return param;
         }
      };

      var event = {

      };

      /************************************************************************************
         options = {
         }
       ************************************************************************************/
      return function( options ) {
         var param = {};

         for ( var prop in options ) {
            switch ( prop ) {
               case "data": param = config.dataSource(param, options.dataType, options[prop], options.pageSize);
                  break;
               case "columns": param = config.columns(param, options[prop]);
                  break;
               case "columnMenu": param = config.columnMenu(param, options[prop]);
                  break;
               case "sortable": param = config.sortable(param, options[prop]);
                  break;
               case "pageable": param = config.pageable(param, options[prop]);
                  break;
               case "excel": param = config.excel(param, options[prop]);
                  break;
               case "pdf": param = config.pdf(param, options[prop]);
                  break;
               case "groupable": param = config.groupable(param, options[prop]);
                  break;
            }
         }

         return param;
      };

   }
);
