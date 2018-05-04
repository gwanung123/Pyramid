'use strict';

define(["knockout", "../../Components/components"],
   function( ko, nxcomponent ) {

      function ViewMainViewModel( param ) {
         console.log("[viewMain] :: ViewMainViewModel : load");
      };

      ViewMainViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewMain] :: ViewMainViewModel : onInit");
         this._setObservableInit(nxBlock);
      };

      ViewMainViewModel.prototype._setObservableInit = function( nxBlock ) {
         var define = nxBlock.get("define"),
             field = nxBlock.get("field"),
             query = nxBlock.get("query"),
             selectQuery = nxBlock.get("selectQuery"),
             fromQuery = nxBlock.get("fromQuery"),
             endQuery = nxBlock.get("endQuery"),
             components = nxBlock.get("components");

        var dateFrom =""; 
        var dateTo="";

         for ( var idx=0; idx<define.length; idx++ ) {
            var type = define[idx].type,
                domID = define[idx].domID,
                model = define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(define[idx].title);
               options = model.getOptions(field);

                var f_query = selectQuery + fromQuery + " WHERE a.END_DATE BETWEEN '" + dateFrom + "' AND '" + dateTo + "'";
                f_query += endQuery;

                model.getQuery(f_query);

            //    model.getQuery(selectQuery,
            //                 fromQuery,
            //                 "WHERE a.END_DATE BETWEEN '" + dateFrom + "' AND '" + dateTo + "'",
            //                 endQuery );
            }

            componentVM = nxcomponent.onInit(type, domID, options);

            if (domID == "nxDatePickerFrom") {
                console.log(componentVM.getDate());
                dateFrom = componentVM.getDate();
            } else if (domID == "nxDatePickerTo" ) {
                console.log(componentVM.getDate());
                dateTo = componentVM.getDate();
            }
             

            if ( componentVM ) {
               components[domID] = {
                  type      : type,
                  model     : model,
                  viewModel : componentVM
               };

               this._setObservableData(domID, model, componentVM);
            }
         }
      };

      ViewMainViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewMainViewModel,
         domID: "nx-contents-main"
      };
   }
);
