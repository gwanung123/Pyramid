'use strict';

define(["knockout", 
    "../../Library/interaction.nxproxy",
    "../../Components/components",
    "nexus",
    "../../Library/ContactsLib"],
   function( ko, nxproxy ,nxcomponent ,nexus,crm ) {

    var _cubeProxy = nxproxy;
    var _crm = crm;
    var nexus_signin =  $.nexus({
        core : "nxapi",
        nxapi : {
           config : {
              kind : "localStorage",
              action : "get"
           },
           params : {
              key : "nexus_signin"
           }
        }
     });

     var userID = null,
     userDN = null; 

     var activeCid = null;
     var btnTag = null;

     var userDN = $.nexus({
      core : "nxapi",
      nxapi : {
         config : {
            kind : "jwt"
         },
         params : {
            key : "cccdn"
         }
      }
    });

    if (userDN ==="") {
      userDN = nexus_signin.userId;
    }


      function ViewLeftCallViewModel( param ) {
         console.log("[viewLeftCall] :: ViewLeftViewCallModel : load");

          // userID = nexus_signin.userId || "anonymous",
          // userDN = nexus_signin.userDn || "DN Number";
      

         this._query = null;

      };

      ViewLeftCallViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewLeft] :: ViewLeftCallViewModel : onInit");

         this._setObservableInit(nxBlock);


         _cubeProxy.Proxy.prototype.addViewModel(this);

      };


      ViewLeftCallViewModel.prototype.answerCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : answerCall");

        _cubeProxy.Proxy.prototype.answer(userDN);

      };

      ViewLeftCallViewModel.prototype.clearCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : clearCall");

        _cubeProxy.Proxy.prototype.clearConnection(userDN);
      };

      ViewLeftCallViewModel.prototype.holdCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : holdcall");

        _cubeProxy.Proxy.prototype.holdCall(userDN);
      };

      ViewLeftCallViewModel.prototype.retrieveCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : retrievecall");

        _cubeProxy.Proxy.prototype.retrieve(userDN);
      };

      ViewLeftCallViewModel.prototype.consultCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : consultCall");

        var cunsultno = $("#inputTelno").val();

        _cubeProxy.Proxy.prototype.retrieve(userDN,cunsultno);

      };

      ViewLeftCallViewModel.prototype.transferCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : transferCall");

        var transno = $("#inputTelno").val();

        _cubeProxy.Proxy.prototype.transfer(userDN,transno);

      };

      ViewLeftCallViewModel.prototype.conferenceCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : conferenceCall");

        _cubeProxy.Proxy.prototype.confer(userDN,transno);
      };


      ViewLeftCallViewModel.prototype.makeCall = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : makeCall");

        var dialNo = $("#inputTelno").val();

        _cubeProxy.Proxy.prototype.makeCall(userDN,dialNo);
      };

      //20180504 Sam #16130
      ViewLeftCallViewModel.prototype.getCustInfo = function() {
        console.log("[ViewLeftCallViewModel] :: ViewLeftCallViewModel : getCustInfo");
        var telno = $("#inputTelno").val();
        if(telno.length != 0){
          _crm._CRM.prototype.AddLog("SetCallback",_crm._CRM.prototype.SetCallback(_crm._CRM.prototype.CallbackEvent),telno);
        }
        
      };
   
      ViewLeftCallViewModel.prototype.eventpush= function(obj) {

        //console.log(data);
        if ( obj.fname =="event") {
            console.log(obj.id);
            switch(obj.id) {
                case 3:
                    console.log("ConnectionCleared ..");

                    // $('#btnAnswer').css("background-color","green");
                    // $('#btnAnswer').html("Accept");

                                    //전화끊음
                    // $(".make_call .cc").click(function(){
                      $(".make_call").css("display","none");
                      $(".outbound_btn").css("display","block");
                    // });

                    $("#inputTelno").val("");
                    btnTag ="CC";
                    break;

                case 4:
                    console.log("Delivered ..");
                    $("#inputTelno").val(obj.call.other);

                                    //전화가 걸려옴
                    // $(".outbound_btn").click(function(){
                      $(".outbound_btn").css("display","none");
                      $(".make_call").css("display","block");
                      $(".make_call .ac").css("display","block");
                      $(".make_call .cc").css("width","50%");
                    // });

                    // jesse
                    $("#btnCC").text("Reject call");

                    activeCid = String(obj.call.c1);
                    btnTag ="DL";
                    break;
                case 6:
                    console.log("Established ..");
                    // $('#btnAnswer').css("background-color","red");
                    // $('#btnAnswer').html("End Call");

                                    //전화수락
                    // $(".make_call .ac").click(function(){
                      $(".make_call .ac").css("display","none");
                      $(".make_call .cc").css({"display":"block","width":"100%"});
                    // });
                    btnTag ="ES";

                     // jesse
                     $("#btnCC").text("End Call");
                    break;

                  case 201:
                    console.log("logon 상태 입니다. ");
                    $("#status").text('Log on..');
                    break;
                  case 202:
                    console.log("logoff 상태 입니다. ");
                    $("#status").text('Log off..');
                    break;
                  case 203:
                    console.log("NotReady 상태 입니다. ");
                    $("#status").text('Notready..');
                    break;
                  case 204:
                    console.log("Ready 상태 입니다. ");
                    $("#status").text('Ready..');
                    //callmanage.removeItem(obj.call.c1);
                    break;
                  case 206:
                    $("#status").text('After call work..');
                    break;


            }

        }



      };

      ViewLeftCallViewModel.prototype._completeQuery = function () {

        var query= this._query.replace("USER_ID",nexus_signin.userId );
        // query= query.replace("TODAY",nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2)  );

        //query= query.replace("TODAY",'2018-02-26' );
       
        return query ;
      };

      ViewLeftCallViewModel.prototype.setQuery = function(title) {

        var query= this._query.replace("USER_ID",nexus_signin.userId );
        
        switch(title) {
            case "CALLBACK.GRID":
              query = query.replace("b.CCC_TYPE = 'B'","b.CCC_TYPE = 'B'" );
              break;
            case "RECONTACT.GRID":
              query = query.replace("b.CCC_TYPE = 'B'","b.CCC_TYPE = 'H'" );
              break;
            case "CAMPAIGN.GRID":
              query = query.replace("b.CCC_TYPE = 'B'","b.CCC_TYPE = 'C'" );
              break;
              case "CRM.GRID":
              query = query.replace("b.CCC_TYPE = 'B'","b.CCC_TYPE = 'C'" );
              break;
        }

        return query ;


      }



      ViewLeftCallViewModel.prototype._setObservableInit = function( nxBlock ) {
         var define = nxBlock.get("define"),
             field = nxBlock.get("field"),
             components = nxBlock.get("components");

             this._query = nxBlock.get("query");

         for ( var idx=0; idx<define.length; idx++ ) {
            var type = define[idx].type,
                domID = define[idx].domID,
                model = define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(define[idx].title);
               options = model.getOptions(field);

               model.getQuery(this.setQuery(model.title));
            }

            // componentVM = nxcomponent.onInit(type, domID, options);
            componentVM = nxcomponent.onComponentLoad("",type, domID, options);

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

      ViewLeftCallViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewLeftCallViewModel,
         domID: "nx-contents-left"
      };
   }
);

