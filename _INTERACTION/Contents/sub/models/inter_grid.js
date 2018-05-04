'use strict';

define(["_", "../../../Library/interaction.selector"],
   function( _, dbselector ) {

      /**
       * GRID1
       */
      var interGrid = function( title ) {
         this.title = title;
         this.options = {};
         this.gridquery ="";
      };

      var ptt = interGrid.prototype;

    //   ptt.getHandle = function() {
    //      var self = this;
    //      return self.pushHandle;
    //   };

      ptt.move = function( field ) {
         var self = this;
         var depth = _.split(self.title, "."),
             root = field[depth[0]];
         return root[depth[1]];
      };

      ptt.getData = function( callbacks ) {
         var self = this;
         var fds = [],
             fds_pk = [],
             cols = self.options.columns;

        //  for ( var idx=0; idx<cols.length; idx++ ) {
        //     fds.push(cols[idx].field);
        //     if ( cols[idx].pk ) fds_pk.push(cols[idx].field);
        //  }

        for ( var idx=0; idx<cols.length; idx++ ) {
            fds.push(cols[idx].field);
         }

         dbselector("agent", {
            //url : "/cairo/caching/master/agent", 
            url : "/cairo/selector/master/agent",
            params : {
               fields: fds,
               /*query: "SELECT a.EMPLOYEE_ID, a.employeegrp_id,NVL(SUM(a.IBCALL_COUNT),0) ibcall_count,NVL(SUM(a.OBCALL_COUNT),0) obcall_count,NVL(SUM(a.GRPTR_COUNT),0) grptr_count FROM RE_EMPLOYEECALL_H a GROUP BY a.EMPLOYEE_ID, a.employeegrp_id ORDER BY a.EMPLOYEE_ID, a.employeegrp_id"*/
               query: self.gridquery
            },
            onResult : function(result, error, param) {
               var parse = [];
               /**
                * ## parsing
                * - before
                * [{"nx.agent-3-1004":{"TENANT_ID":"10","GROUP_ID":"100","TEAM_ID":"101","AGENT_ID":"1004","AGENT_NAME":"1004"}}]
                * - after
                * [{"TENANT_ID":"10","GROUP_ID":"100","TEAM_ID":"101","AGENT_ID":"1004","AGENT_NAME":"1004"}]
                */
               if ( result !== null ) {
                  for( var idx=0; idx<result.length; idx++ ) {
                     /*parse.push(_.values(result[idx])[0]);*/
                     parse.push(result[idx]);
                  }
               }

               callback(parse, error, param);
            },
            onResultParam : fds
         });
      };

      ptt.getOptions = function( field, data ) {
         var self = this,
             columns = self.move(field);

         if ( field === undefined ) return self.options;

         self.options = {
            dataType: "json",
            columns: columns,
            data: (data)? data : [],
            // columnMenu: true,
            sortable: true,
            // pageable: true,
            // pageSize: 5,
            // excel: true,
            // pdf: true,
            // groupable: true,
            resizable: true
         };

         return self.options;
      };

      ptt.getQuery = function(query) {
        this.gridquery = query;
      };


      /************************************************************************************
         options = {
         }
       ************************************************************************************/
      return function( title ) {
         switch ( title ) {
            case "INTER_HOME.GRID": return new interGrid(title);
            case "INTER_CALL.GRID": return new interGrid(title); 
         }
      };

   }
);
