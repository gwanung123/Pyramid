'use strict';

define(["knockout", 
    "../../Library/interaction.nxproxy",
    "../../Library/interaction.selector",
    "../../Components/components"],
   function( ko, nxproxy,dbselector ,nxcomponent ) {

    var _cubeProxy = nxproxy;

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

     var ServerIP = nexus_signin.mainHosts.toString().split(":")[0];
     var messageID ="";
     var mailCallID ="";
     var customerEmail ="";
     var toEmailAddr ="";
     var _answerTime ="";
     var mailBodyUUID="";

     String.prototype.format = function (args) {
        var str = this;
        return str.replace(String.prototype.format.regex, function(item) {
            var intVal = parseInt(item.substring(1, item.length - 1));
            var replace;
            if (intVal >= 0) {
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }
            return replace;
        });
    };
    String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");



      function ViewMainMailViewModel( param ) {
         console.log("[viewMailMain] :: ViewMainMailViewModel : load");

         _cubeProxy.Proxy.prototype.addViewModel(this);

         $('#submit').click(function () {

            sendMail();
               
         });

      };

      ViewMainMailViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewMain] :: ViewMainMailViewModel : onInit");
        // this._setObservableInit(nxBlock);
      };

    
      ViewMainMailViewModel.prototype.mailAnswer = function() {

        _cubeProxy.Proxy.prototype.mailAnswer(
            _cubeProxy.Proxy.prototype.getActiveMailDn(),
            mailCallID);
        
        getBody(mailBodyUUID);
        
        console.log ("mail answer");

      };


      ViewMainMailViewModel.prototype.mailSubmit = function() {

        sendMail();

        customerDataSave();

        _cubeProxy.Proxy.prototype.mailClearConnection(
            _cubeProxy.Proxy.prototype.getActiveMailDn(),
            mailCallID);

        clearFieldData();

        console.log ("mail clearConnnection");

      };

      var queryCustomer = function(emailAddress) {
        var query = "SELECT NAME , MOBILE ,SEX, EMAIL FROM counseling_customer WHERE EMAIL ='emaildata' " ;
        query= query.replace("emaildata",emailAddress );


        getData(query,function(result, error, param){
            console.log("result {}" , result);

            if ( result !== null  && result.length !==0) {

                console.log("result {}" , result);

                $("#name").val(result[0].NAME);
                $("#mobile").val(result[0].MOBILE);
                $("#gender").val(result[0].SEX);
                $("#email").val(result[0].EMAIL);
            }
        } );

      };

      var customerDataSave= function() {

        var query = " INSERT INTO COUNSELING_DATA ( "
            //+ " CUSTOMER_IDX, " 
            + " AGENT_ID, "         //0
            + " AGENT_DN, "         //1 
            // + " CALL_FLAG, " 
            // + " CALL_NUM, " 
            // + " CATEGORY_IDX, "
            // + " CALL_ID, "
            + " DESCRIPT, "          //2 
            + " START_TIME, "        //3  
            // + " END_TIME, " 
            + " REG_AGENTID, "       //4 
            // + " CENTER_ID, "
            + " TENANT_ID, "         //5 
            // + " CALL_TYPE, "         
            + " category1, "        
            + " category2, "
            + " category3, "
            + " CUBE_CALL_KIND  "  
            // + " GROUP_ID "
            //, CALL_ID_ALL
            + " ) VALUES ( "
            + " '{0}','{1}','{2}' ,'{3}' ,'{4}', {5} ,'mail','mail','mail', 10  ) ";

            query= query.format([ nexus_signin.userId ,
                _cubeProxy.Proxy.prototype.getActiveMailDn(),
                $("#editor").val(),
                answerDate(),
                nexus_signin.userId,
                "10" ]);      
                
                
            getData(query,function(result, error, param){
                console.log("result {}" , result);
    
                if ( result !== null ) {
    
                    console.log("save ok" );
                  
                }
            } );
      };


      var answerDate = function () {

        return _answerTime.substr(0,4) + "-" + _answerTime.substr(4,2) +  "-" + _answerTime.substr(6,2)
        + " " + _answerTime.substr(8,2) +":" + _answerTime.substr(10,2) +":" + _answerTime.substr(10,2);  

      };


      var getData = function(query,callback) {

        var fds= [];

        dbselector("agent", {
            //url : "/cairo/caching/master/agent", 
            url : "/cairo/selector/master/agent",
            params : {
               fields: fds,
               query: query,
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


     ViewMainMailViewModel.prototype.eventpush= function(obj,mailMain) {

        var attachUei="";

        if (_cubeProxy.Proxy.prototype.getActiveMailDnCheck(obj.this) == 1  ) {

            switch(obj.id) {
                case 4:
                    console.log("Delivered ..");
                    //attachUei = obj.attach.uei;
                    messageID= obj.attach.uei;
                    getMail(messageID);

                    mailCallID = String(obj.call.c1);
                    break;
                case 6:
                    console.log("established ..");
                    _answerTime = obj.ftime;
                    break;
            }
        }


      };

      var sendMail = function() {

        var emailJson = {
			
            tenantId: "1",
            inReplyToMessageId :  messageID,
            replyReasonCode : "2",  //(1:sent,2:reply,3:no reply)
            refMessageId : "" ,
            agentId : nexus_signin.userId,
            agentDn : _cubeProxy.Proxy.prototype.getActiveMailDn(),
            fromAddr : toEmailAddr ,//"elmo1011@naver.com",
            toAddr :  customerEmail,// "eric@nexus.co.kr",
            subject : $("#service").val() ,
            mimeType : "TEXT/PLAIN",
            mailBody : $("#editor").val(),

        };
        
        $.ajax({
            url: "http://" + ServerIP +":6868/sendMail",
			//processData: false,
			//contentType: false,			
            type: 'POST',
            
			dataType: "json",
			data : emailJson,
			success: function (result) {
				switch (result) {
					case true:	//response parameter value
						console.log('response is ' + result);
						break;
					default:
						console.log('response is ' + JSON.stringify(result));
						//$("#resultDiv").html(JSON.stringify(result));
						// $("#resultDiv").html(JSON.stringify(result, undefined, 2));
						//document.getElementById("resultDiv").innerHTML = JSON.stringify(result, undefined, 2);
				}
				// CancelUpload();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
				alert(thrownError);
			}
		});



      };


      var getMail = function (ueidata) {

        var emailJson = {
			tenantId: "1",
			mailBox : "0",
			messageId : ueidata,  				//"<033d01d35db8$7b118df0$7134a9d0$@nexus.co.kr>"
			handlingTime : '', 		//20171228160400
			getCount : "1",  				//10
			replyReasonCode : "1",  //(1:sent,2:reply,3:no reply)
		};

        $.ajax({
            // url: "http://10.10.30.12:6868/getMail",
            url: "http://" + ServerIP +":6868/getMail",
			//processData: false,
			//contentType: false,			
			type: 'POST',
			dataType: "json",
			data : emailJson,
			success: function (result) {
				switch (result) {
					case true:	//response parameter value
						console.log('response is ' + result);
						break;
					default:
                        console.log('response is ' + JSON.stringify(result));
                        mailSetting(result);
						//$("#resultDiv").html(JSON.stringify(result, undefined, 2));
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
				alert(thrownError);
			}
		});
		return false;
      };

      var mailSetting = function(result) {
       
        $("#mailtitle").text(result[0].SUBJECT);
        // $("#recvtime").text(result[0].RECEIVED_TIME);

        console.log("FROM ADDR" +  result[0].FROM_ADDR );

        customerEmail = result[0].FROM_ADDR;
        toEmailAddr = result[0].TO_ADDR;

        queryCustomer( returnMailAddress (result[0].FROM_ADDR) );


        mailBodyUUID = result[0].MAIL_BODY_FILE_NAME;

        //getBody(result[0].MAIL_BODY_FILE_NAME);

      };

      var returnMailAddress = function (mailAddr) {

        var n = mailAddr.indexOf("<");
        var rtnEmail ="";

        if ( n > 0 ) {
            var strarray = mailAddr.split('<');
            rtnEmail = strarray[1].replace('>','');
            return  rtnEmail ;

        } else {
            return mailAddr;
        }
     
      };

      var clearFieldData = function() {

        $("#name").val('');
        $("#mobile").val('');
        $("#gender").val('');
        $("#email").val('');

        $("#mailtitle").text('');
        $("#recvtime").text('');

        $("#mailbody").text('');

        // 보내는 메일함  enable 시키기

        $("#service").val('');
        $("#editor").val('');


        var editor = $("#editor").data("kendoEditor");
        // set value
        editor.value("");

        customerEmail ="";
        toEmailAddr ="";

      };


      var getBody  = function(bodyUUID) {

        var downloadJson = { 
            tenantId: "1",
            filename: bodyUUID, 
            fileChoice: "0" 
        }; 

        $.ajax({
            // url: url,	
            // url: "http://10.10.30.12:6868/mailbox/inbox",
            url: "http://" + ServerIP +":6868/mailbox/inbox",
            type: 'post',	//'get',	//$('#downloadFilename').attr('method'),//'POST',
            dataType: "json",
            data : downloadJson,
            success: function (result) {
                switch (result) {
                    case true:	//response parameter value
                        console.log('response is ' + result);
                        break;
                    default:
                        console.log('response is ' + JSON.stringify(result));
                        maiBodySetting(JSON.stringify(result));
                        //$("#resultDiv").html(JSON.stringify(result, undefined, 2));
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                alert(thrownError);
            }
        });

      };

      var maiBodySetting = function (result) {

        var bodyresult = String(result);

        bodyresult = bodyresult.substring(1);
		bodyresult = bodyresult.substring(0  ,bodyresult.length-2);

        var object ="<object type='text/html' data="
		 			 + bodyresult 
		 			 +"</object>";

        $("#mailbody").html(object);
      };


      ViewMainMailViewModel.prototype._setObservableInit = function( nxBlock ) {
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

      ViewMainMailViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };

      ViewMainMailViewModel.prototype._setObservablePush = function( domID, model, componentVM, components ) {
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
         viewModel: ViewMainMailViewModel,
         domID: "nx-contents-main"
         
      };
   }
);
