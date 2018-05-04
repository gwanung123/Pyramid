'use strict';

define(["knockout", 
    "../../Library/interaction.nxproxy",
    "../../Library/interaction.selector",
    "../../Components/components","nexus"],
   function( ko, nxproxy,dbselector, nxcomponent, nexus ) {

    var _cubeProxy = nxproxy;
    var _useQuery ="";
    var _answerTime ="";
    var _callType ="1"
    var _newCustFlag ="0" // 0 : NEW 1: Already cust

    var nexus_signin = $.nexus({
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



     var userID = nexus_signin.userId;
    // userDN = nexus_signin.userDn || "DN Number"; 

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


     function ViewMainCallViewModel( param ) {
         console.log("[viewCallMain] :: ViewMainCallViewModel : load");

         //userDN = nexus_signin.userId ; //일단 임시 

         _cubeProxy.Proxy.prototype.addViewModel(this);
  
      };

      ViewMainCallViewModel.prototype.saveReady = function() {
        console.log("[ViewMainCallViewModel] :: ViewMainCallViewModel : saveReady");

        _useQuery = this.insertConsultQuery();

        getData(function(result, error, param){
            console.log("result {}" , result);

            if ( result != null) {
                //_cubeProxy.prototype.changeAgentStatus("ready",userDN,userID);
                changeAgentStatus("ready");
            }
        } );

        if (_newCustFlag==0)  { // 신규고객 

            _useQuery = insertNewCustomerQuery();
            
            getData(function(result, error, param){
                console.log("result {}" , result);

                if ( result != null) {
                   // _cubeProxy.prototype.changeAgentStatus("ready",userDN,userID);
                   changeAgentStatus("ready");
                }
            } );
        }

        this.customerFieldInital();
        $("#content").val('');

      };

      var changeAgentStatus = function(status) {
        _cubeProxy.Proxy.prototype.changeAgentStatus(status,userID,userDN);
      };


      ViewMainCallViewModel.prototype.saveNotReady = function() {

        console.log("[ViewMainCallViewModel] :: ViewMainCallViewModel : saveNotReady");

        _useQuery = this.insertConsultQuery();

        getData(function(result, error, param){
            console.log("result {}" , result);

            if ( result != null) {
                //_cubeProxy.prototype.changeAgentStatus("notready",userDN,userID);
                changeAgentStatus("notready");
            }
        } );

        if (_newCustFlag==0)  { // 신규고객 

            _useQuery = insertNewCustomerQuery();
            
            getData(function(result, error, param){
                console.log("result {}" , result);

                if ( result != null) {
                   // _cubeProxy.prototype.changeAgentStatus("notready",userDN,userID);
                   changeAgentStatus("notready");
                }
            } );
        }

        this.customerFieldInital();
        $("#content").val('');

    };




      ViewMainCallViewModel.prototype.customerFieldInital = function() {

        $("#c_name").val("");
        $("#c_id").val("");
        //$("#addressc_id").val("");
        $("#p_num").val("");
        $("#c_num").val("");
        $("#email").val("");
        $("#fax").val("");

        $("#service").val("");
        $("#c_id").val("");
        $("#address").val("");

      };
      

      ViewMainCallViewModel.prototype.getCampaignCode = function() {
          return "0";
      };

      var  pad = function(n,width) {
        if ( n < 10) {
            n = n + '';
           return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        } else {
          return n;
        }
      };

      var answerDate = function () {

        return _answerTime.substr(0,4) + "-" + _answerTime.substr(4,2) +  "-" + _answerTime.substr(6,2)
        + " " + _answerTime.substr(8,2) +":" + _answerTime.substr(10,2) +":" + _answerTime.substr(10,2);  

      };

      var getcalltype = function() {

        if (_callType == 2) {
            return "1";
        } else  {
            return "2";    
        }
      
      };

      var insertNewCustomerQuery = function () {
        var query="";
        

        query = " INSERT INTO counseling_customer ( "
            + "ID ,"
            + "NAME ,"
            + "ADDRESS ,"
            + "MOBILE ,"
            + "TEL ,"
            + "EMAIL ,"
            + "FAX "
            + " ) VALUES ( "
            + "'" + guid() + "',"
            + "'" + $("#c_name").val() + "',"
            + "'" + $("#address").val() + "',"
            + "'" + $("#p_num").val() + "',"
            + "'" + $("#c_num").val() + "',"
            + "'" + $("#email").val() + "',"
            + "'" + $("#fax").val() + "'"
            + ")";


        return query;
      };

      var guid = function() {
        function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4();// + '-' + s4() + '-' + s4() + s4() + s4();
      };



      ViewMainCallViewModel.prototype.insertConsultQuery= function() {
            var query="";

            var type1 = $("#type1 option:selected").val();
            var type2 = $("#type2 option:selected").val();
            var type3 = $("#type3 option:selected").val();
            
            query = " INSERT INTO COUNSELING_DATA ( "
                    + " CAMPAIGN_CODE, "
                    //+ " CUSTOMER_IDX, " 
                    + " AGENT_ID, "
                    + " AGENT_DN, "
                    // + " CALL_FLAG, " 
                    // + " CALL_NUM, " 
                    // + " CATEGORY_IDX, "
                    + " CALL_ID, "
                    + " DESCRIPT, " 
                    + " START_TIME, "
                    // + " END_TIME, " 
                     + " REG_AGENTID, "  
                    // + " CENTER_ID, "
                     + " TENANT_ID, "
                     + " CALL_TYPE, "
                    + " category1, "
                    + " category2, "
                    + " category3, "
                    + " CUBE_CALL_KIND , "
                     + " GROUP_ID "
                    //, CALL_ID_ALL
                    + " ) VALUES ( "
                   + "'"+ this.getCampaignCode() + "',"
                   + "'"+ userID +"',"   //AGENT_ID
                   + "'" +userDN +"',"   // AGENT_DN
                   + "'" + _cubeProxy.Proxy.prototype.getActiveCall(userDN) +"'," // CALL_ID
                   + "'" + $("#content").val() +"',"  //DESCRIPT
                   + "'" + answerDate() +"',"   //START_TIME
                   + "'"+ userID +"',"   //REG_AGENTID
                   + "10," //TENANT_ID
                   + getcalltype() +","  //CALL_TYPE
                   //+ "1,'1',1,"   //CATEGORY 
                   + "'"+ type1 +"',"
                   + "'"+ type2 +"',"
                   + "'"+ type3 +"',"
                   + "1,"
                   + "1" //GROUP_ID  -> CM_ID + TENNAT_ID
                    + ")";
            return query;

      };



      ViewMainCallViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewMain] :: ViewMainCallViewModel : onInit");


         this._setObservableInit(nxBlock);
      };

      ViewMainCallViewModel.prototype.eventpush= function(obj) {

        if ( obj.fname =="event") {
            console.log(obj.id);
            switch(obj.id) {
                case 6: // ES
                    if (userDN == obj.this )
                    {
                        _answerTime = obj.ftime;
                        //_call_type = obj.
                        checkCustomer(obj.call.other);

                        
                    }

                    break;

            }

        }

      };

      var getData = function(callback) {

        var fds= [];

        dbselector("agent", {
            //url : "/cairo/caching/master/agent", 
            url : "/cairo/selector/master/agent",
            params : {
               fields: fds,
               query: _useQuery,//"SELECT IDX , ID, NAME, SEX,JUMIN,TEL,FAX,MOBILE,ZIPCODE,EMAIL, ADDRESS FROM counseling_customer"
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


      var checkCustomer = function(otherParty) {
        // //고객 정보 팝업 
        // // $("#c_name").val("EKR C.C.C");
        // $("#c_name").text("EKR C.C.C");
        // $("#service").val("vUCP Customer");

        _useQuery = customerInfoQuery(otherParty);

        $("#p_num").val(otherParty);

        getData(function(result, error, param){

            if ( result !== null  && result.length !==0) {

                console.log("result {}" , result);

                $("#c_name").val(result[0].NAME);
                $("#c_id").val(result[0].ID);
                $("#address").val(result[0].ADDRESS);
                //$("#p_num").val(result[0].MOBILE);
                $("#c_num").val(result[0].TEL);
                $("#email").val(result[0].EMAIL);
                $("#fax").val(result[0].FAX);
                _newCustFlag = 1; //기존 고객 
            }  else {
                _newCustFlag = 0; // 신규고객 
            } 


        } );

        /*
       SELECT IDX , ID, NAME, SEX,JUMIN,TEL,FAX,MOBILE,ZIPCODE,EMAIL, ADDRESS FROM counseling_customer
        
        */
      };


      var customerInfoQuery= function(otherPary) {
        var query=  "SELECT IDX , ID, NAME, SEX,JUMIN,TEL,FAX,MOBILE,ZIPCODE,EMAIL, ADDRESS FROM counseling_customer WHERE TEL = '"
         + otherPary + "' OR MOBILE = '"
         + otherPary + "'";

         return query;
    
    };

    

      ViewMainCallViewModel.prototype._setObservableInit = function( nxBlock ) {
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

            //    if ( define[idx].push )
            //       this._setObservablePush(domID, model, componentVM, components);
            //    else
            //       this._setObservableData(domID, model, componentVM);
            }
         }
      };

      ViewMainCallViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

        //  if ( model.getData ) {
        //     model.getData(function(result, error, param) {
        //        if ( error === null ) componentVM.setDataSource(result, param);
        //     });
        //  }
      };

      ViewMainCallViewModel.prototype._setObservablePush = function( domID, model, componentVM, components ) {
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
         viewModel: ViewMainCallViewModel,
         domID: "nx-contents-interaction-main"//"nx-contents-interaction-main" 
      };
   }
);
