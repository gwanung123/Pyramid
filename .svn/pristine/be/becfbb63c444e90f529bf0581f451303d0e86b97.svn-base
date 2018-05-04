'use strict';

define(["knockout", "../../Components/components"],
   function( ko, nxcomponent ) {

      function ViewLeftViewModel( param ) {
         console.log("[viewLeft] :: ViewLeftViewModel : load");

        //  this.nxFieldTeamTreeview1 = ko.observable();
        //  this.nxFieldTeamTreeview2 = ko.observable();
      };

      ViewLeftViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewLeft] :: ViewLeftViewModel : onInit");
         this._setObservableInit(nxBlock);
      };

      ViewLeftViewModel.prototype._setObservableInit = function( nxBlock ) {
         var define = nxBlock.get("define"),
             field = nxBlock.get("field"),
             components = nxBlock.get("components");

        //  this.nxFieldTeamTreeview1(field.TEAM.TEXT_TREEVIEW_TITLE1);
        //  this.nxFieldTeamTreeview2(field.TEAM.TEXT_TREEVIEW_TITLE2);

         for ( var idx=0; idx<define.length; idx++ ) {
            var type = define[idx].type,
                domID = define[idx].domID,
                model = define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(define[idx].title);
               options = model.getOptions(field);
            }

            componentVM = nxcomponent.onInit(type, domID, options);

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

      ViewLeftViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewLeftViewModel,
         domID: "nx-contents-left"
      };
   }
);

