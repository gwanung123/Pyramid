'use strict';

(function () {

   requirejs.config({
      baseUrl: "./",
      paths: {
         "jquery"        : "Libpack/jquery/jquery-3.3.1.min",
         "knockout"      : "Libpack/knockout/knockout-3.4.2",
         "bootstrap"     : "Libpack/bootstrap/js/bootstrap.min",
         "nexus"         : "Libpack/nexus/nexus",
         "error"         : "Error/error",
         "vms.signin"    : "ViewModels/vms.signin",
         "models.signin" : "Models/models.signin"
      },
      shim: {
         "bootstrap": {
            deps: ["jquery"]
         },
         "nexus": {
            deps: ["jquery"]
         }
      }
   });

   require([
      "knockout",
      "vms.signin",
      "bootstrap"
   ],
   function( ko, SignInVM ) {

      ko.applyBindings(new SignInVM());

      $("#opt_wrap").hide();
      $("#opt").click(function(){
          $("#opt_wrap").fadeIn();
          if($(".close").click(function(){
              $("#opt_wrap").fadeOut();
          }));
          if($(".modal-footer .btn-default").click(function(){
              $("#opt_wrap").fadeOut();
          }));
      });

      $("#errorModal").hide();
      $("#errorModal button").click(function(){
          $("#errorModal").fadeOut();
      });
   });

})();