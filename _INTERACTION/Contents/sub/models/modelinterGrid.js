'use strict';

define(["../../../Library/interaction.selector"],
function( dbselector ) {
    // define(["_" ,"../../../Library/interaction.selector"],
    // function( _, dbselector ) {

    var modelinterGrid = function (title) {
        this.title = title;
        this.options = {};
        this.gridquery ="";
    };

    var prototypeV = modelinterGrid.prototype;

    prototypeV.move = function (field) {
        var self = this;
        // var depth = _.split(self.title, "."),
        var depth = self.title.split("."),
            root = field[depth[0]];
        return root[depth[1]];
    };
    
    /*############################ getData ################################ */
    prototypeV.getData = function(callback) {
        var self = this;
        var fds = [],
            cols = self.options.columns;

        for ( var idx=0; idx<cols.length; idx++ ) {
           fds.push(cols[idx].field);
        }

        dbselector("agent", {
            //url : "/cairo/caching/master/agent", 
            url : "/cairo/selector/master/agent",
            params : {
               fields: fds,
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
                  for( var idx=0; idx<result.output.length; idx++ ) {
                //   for( var idx=0; idx<result.length; idx++ ) {
                     /*parse.push(_.values(result[idx])[0]);*/
                     //parse.push(result[idx]);
                     parse.push(result.output[idx]);
                  }
               }

               callback(parse, error, param);
            },
            onResultParam : fds
         });
    };
    /*############################################################ */


    prototypeV.getOptions = function( field, data ) {
        var self = this,
            columns = self.move(field);

        self.options = {
           dataType: "json",
           columns: columns,
           data: (data)? data : undefined,
           scroll: false
        //    scrollable : false 
        //    columnMenu: true,
           //sortable: true,
            //pageable: true,
        //    excel: true,
        //    pdf: true,
            //pageSize: 5
           // groupable: true
        };

        return self.options;
    };


    prototypeV.getQuery = function(query) {
        this.gridquery = query;
    };

    return function( title ) {
        switch ( title ) {
            case "INTERHOME.GRID":
            case "INTERCALL.GRID":
                return new modelinterGrid(title);

        }
     };


    }
);
