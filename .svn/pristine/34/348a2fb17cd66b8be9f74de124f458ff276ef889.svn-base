'use strict';

define(["knockout", "../../Components/components"],
   function( ko, nxcomponent ) {
  
      function ViewRightViewModel( param ) {
         console.log("[viewRight] :: ViewRightViewModel : load");

         this._define= null;
         this._field = null;
         this._selectQuery= null;
         this._fromQuery = null;
         this._endQuery = null;

         this._dateFrom ;
         this._dateTo;
        
         this._componentVM = new Array();
         this._components= null;
          
      };

      ViewRightViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewRight] :: ViewRightViewModel : onInit");
        
         this._setObservableInit(nxBlock);
      };

    //   ViewRightViewModel.prototype.queryResult = function () {
        
    //     for ( var idx=0; idx<this._define.length; idx++ ) {
    //         var type = this._define[idx].type,
    //             domID = this._define[idx].domID,
    //             model = this._define[idx].model;

    //         var options = null,
    //             componentVM;

    //         if ( model !== undefined ) {
    //            model = model(this._define[idx].title);
    //            options = model.getOptions(this._field);

    //            model.getQuery(this._completeQuery());

    //         }
   
    //         if ( this._componentVM[idx] ) {
    //            this._components[domID] = {
    //               type      : type,
    //               model     : model,
    //               viewModel : this._componentVM[idx]
    //            };

    //            this._setObservableData(domID, model, this._componentVM[idx]);
    //         }

    //      }

    //   };

    //   ViewRightViewModel.prototype._completeQuery = function () {

    //     var query =""
    //     query =     this._selectQuery 
    //             +  this._fromQuery  
    //             + " WHERE a.END_DATE BETWEEN '" 
    //             + this._dateFrom.getDate() 
    //             + "' AND '" 
    //             + this._dateTo.getDate() + "'"
    //             + this._endQuery;

    //     return query;
       
    //   }

    ViewRightViewModel.prototype.OnSearch = function () {

        // var q = $("#txtSearchString").val();
        // var grid = $("#kGrid").data("kendoGrid");
        
        // grid.dataSource.query({
        //   page:1,
        //   pageSize:20,
        //   filter:{
        //     logic:"or",
        //     filters:[
        //       {field:"CustomerID", operator:"contains",value:q},
        //       {field:"CompanyName", operator:"contains",value:q},
        //       {field:"ContactName", operator:"contains",value:q}
        //       ]
        //    }
        // });



    }



      ViewRightViewModel.prototype._setObservableInit = function( nxBlock ) {
        //  var define = nxBlock.get("define"),
        //      field = nxBlock.get("field"),
        //      query = nxBlock.get("query"),
        //      selectQuery = nxBlock.get("selectQuery"),
        //      fromQuery = nxBlock.get("fromQuery"),
        //      endQuery = nxBlock.get("endQuery"),

        var query = nxBlock.get("query");


        this._components = nxBlock.get("components");

        this._define = nxBlock.get("define");
        this._field = nxBlock.get("field");
        this._selectQuery = nxBlock.get("selectQuery");
        this._fromQuery  = nxBlock.get("fromQuery");
        this._endQuery = nxBlock.get("endQuery");

         for ( var idx=0; idx<this._define.length; idx++ ) {
            var type = this._define[idx].type,
                domID = this._define[idx].domID,
                model = this._define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(this._define[idx].title);
               options = model.getOptions(this._field);

               model.getQuery(query);

            }

            componentVM = nxcomponent.onComponentLoad("",type, domID, options);
            this._componentVM.push(componentVM);

            if (domID == "nxDatePickerFrom") {
                console.log(componentVM.getDate());
                this._dateFrom = componentVM ;
            } else if (domID == "nxDatePickerTo" ) {
                console.log(componentVM.getDate());
                this._dateTo = componentVM;
            }
            

            if ( componentVM ) {
               this._components[domID] = {
                  type      : type,
                  model     : model,
                  viewModel : componentVM
               };

               this._setObservableData(domID, model, componentVM);
            }



         }
      };

      ViewRightViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;
        

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewRightViewModel,
         domID: "nx-contents-right"
      };
   }
);
