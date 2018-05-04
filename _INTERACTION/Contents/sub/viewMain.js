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
             components = nxBlock.get("components");

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
                  viewModel : componentVM,
                  pushHandle: null
               };

               if ( define[idx].push )
                  this._setObservablePush(domID, model, componentVM, components);
               else
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

      ViewMainViewModel.prototype._setObservablePush = function( domID, model, componentVM, components ) {
         if ( model === undefined ) return;

         model.getData({
            onOpen : function(param) {},
            onMessage : function(data, param) {
               componentVM.setDataSource(data, param);
            },
            onError : function(error, param) {},
            onClose : function(param) {},
            onResult : function(result, error, param) {
               if ( result !== null ) components[domID].pushHandle = result.handle;
            }
         });
      };


      return {
         viewModel: ViewMainViewModel,
         domID: "nx-contents-main"
      };
   }
);