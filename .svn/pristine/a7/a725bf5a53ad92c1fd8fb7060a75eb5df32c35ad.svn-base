'use strict';

define(["knockout"],
   function( ko ) {

      /***********************************************************
       * name        : Binder
       * url         : root/report.binder
       * description :
       * - knockout의 binding을 위한 API
       * - dom을 위한 API
       ************************************************************/

      var Binder = function() {
         this.bindComponents = [];
         return this;
      };

      /************************************************************
       * prototype
       ************************************************************/

      /**
       * [ko] viewModel을 binding
       */
      Binder.prototype.bind = function( component, param ) {
         var vm = component.viewModel;
         var domID = component.domID;

         //this.bindComponents.push(component);

         if ( !domID ) {
            return console.log("[report.binder] :: Binder : bind, check domID");
         }

         if ( typeof vm === "function" ) {
            var handle = new vm(param);

            if ( !Array.isArray(domID) ) {
               console.log(domID)
               console.log($("#"+domID)[0])
               if ( $("#"+domID)[0] === undefined ) {
                  return console.log("[report.binder] :: Binder : bind, not find DOM");
               }
               ko.applyBindings(handle, $("#"+domID)[0]);
               return handle;
            }

            for ( var i=0; i<domID.length; i++ ) {
               if ( $("#"+domID[i])[0] === undefined ) continue;
               ko.applyBindings(handle, $("#"+domID[i])[0]);
            }

            return handle;
         }
         else if ( typeof vm === "object" ) {
            ko.applyBindings(vm, $("#"+domID)[0]);
            return vm;
         }
      };

      /**
       * [ko] viewModel을 unbinding
       */
      Binder.prototype.unBind = function( component ) {
         var bindComponents = this.bindComponents;
         var domID = component.domID;

         for ( var i=0; i<bindComponents.length; i++ ) {
            if ( bindComponents[i]["domID"] === domID ) bindComponents.splice(i, 1);
         }

         ko.cleanNode($("#"+domID)[0]);
         return this;
      };

      /**
       * [ko] viewModel을 rebinding
       */
      Binder.prototype.reBind = function( component ) {
         this.bind( component );
      };

      /**
       * viewModel instance를 생성
       */
      Binder.prototype.noneBind = function( vm, param ) {
         var handle = new vm(param),
             domID = handle._domID;

         if ( !Array.isArray(domID) ) {
            console.log(domID)
            console.log($("#"+domID)[0])
            if ( $("#"+domID)[0] === undefined ) {
               return console.log("[report.binder] :: Binder : bind, not find DOM");
            }
            return handle;
         }

         return handle;
      };

      /**
       * [ko] viewModel을 binding
       */
      Binder.prototype.appendHTMLs = function( groupVM ) {
         /* view(HTML) binding -knockout- */
         ko.applyBindings(new groupVM());
         return this;
      };

      /**
       * [ko] viewModel을 삭제
       */
      Binder.prototype.removeHTMLs = function( groupVM ) {
         /* view(HTML) unbinding  -knockout- */
         ko.cleanNode(new groupVM());
         return this;
      };

      /**
       * [dom] html을 append
       */
      Binder.prototype.appendHTML = function( parentID, HTML, notEmpty ) {
         /* view(HTML) append  -jquery- */
         if ( notEmpty === undefined ) this.emptyHTML(parentID);
         $("#" + parentID).append(HTML);
         return this;
      };

      /**
       * [dom] div를 append
       */
      Binder.prototype.appendDIV = function( parentID, divID, css ) {
         if ( css !== undefined ) {
            $("#" + parentID).append("<div id=\"" + divID + "\" class=\"" + css + "\"></div>");
         }
         else {
            $("#" + parentID).append("<div id=\"" + divID + "\"></div>");
         }
         return this;
      };

      /**
       * [dom] html 삭제
       */
      Binder.prototype.removeHTML = function( id ) {
         /* view(HTML) remove  -jquery- */
         $("#" + id).remove();
         return this;
      };

      /**
       * [dom] html 삭제
       */
      Binder.prototype.emptyHTML = function( id ) {
         /* view(HTML) empty  -jquery- */
         $("#" + id).empty();
         return this;
      };

      /************************************************************
       *
       ************************************************************/

      return new Binder();
   }
);


