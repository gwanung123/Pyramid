'use strict';

(function () {

   requirejs.config({
      baseUrl: "../Views",
      paths: {
         "jquery"    : "../Libpack/jquery/jquery-3.3.1.min",
         "knockout"  : "../Libpack/knockout/knockout-3.4.2",
         "nexus"     : "../Libpack/nexus/nexus",
         "vms.intro" : "../ViewModels/vms.intro",
         "m.permit"  : "../Models/models.permit"
      },
      shim: {
         "nexus": {
            deps: ["jquery"]
         }
      }
   });

   require([
      "knockout",
      "m.permit",
      "vms.intro",
      "jquery",
   ],
   function( ko, _Permit, _IntroVM ) {

      /************************************************************************
       * main
       ************************************************************************/


      /************************************************************************
       * CSS - Permit
       ************************************************************************/
      var cccpermit = $.nexus({
         core : "nxapi",
         nxapi : {
            config : {
               kind : "jwt"
            },
            params : {
               key : "permit"
            }
         }
      });

      if ( cccpermit === null ) {
         alert("[INTRO] Please check Permit-Setting!!");
         location.href = "../../signin.html";
      }

      var permit = _Permit[cccpermit];

      if ( permit !== undefined ) {
         var none = permit["INTRO"];

         for ( var i=0; i<none.length; i++ ) {
            var domID = none[i];
            $("#" + domID).css("display", "none");
         }
      }

      $("#NX-CONTAINER").css("visibility", "visible");
      /************************************************************************
       * CSS - Permit
       ************************************************************************/

      // knockout ViewModel binding
      ko.applyBindings(new _IntroVM());

      /************************************************************************
       * CSS
       ************************************************************************/
      //.logon_ctn li에 마우스 올렸을 때 그림경로 바꾸기
      $(".logon_ctn li:eq(0)").mouseenter(function(){
          $(this).children().children().next("img").attr("src","../Styles/img/interaction_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children().next("img").attr("src","../Styles/img/interaction_dis_btn.png");
      });
      $(".logon_ctn li:eq(1)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/report_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/report_dis_btn.png");
      });
      $(".logon_ctn li:eq(2)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/monitoring_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/monitoring_dis_btn.png");
      });
      $(".logon_ctn li:eq(3)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/management_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/management_dis_btn.png");
      });
      $(".logon_ctn li:eq(4)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/scenario_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/scenario_dis_btn.png");
      });
      $(".logon_ctn li:eq(5)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/setting_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/setting_dis_btn.png");
      });
      $(".logon_ctn li:eq(6)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/kms_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/kms_dis_btn.png");
      });
      $(".logon_ctn li:eq(7)").mouseenter(function(){
          $(this).children().children("img").attr("src","../Styles/img/wallboard_act_btn.png");
      }).mouseleave(function(){
          $(this).children().children("img").attr("src","../Styles/img/wallboard_dis_btn.png");
      });

      /************************************************************************
       * CSS
       ************************************************************************/

   });
})();
