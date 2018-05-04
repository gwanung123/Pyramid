'use strict';

define(["knockout", 
"../../Library/interaction.nxproxy",
"../../Library/interaction.selector",
"../../Components/components"],
   function( ko,nxproxy, dbselector,nxcomponent ) {

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

      function ViewLeftChatViewModel( param ) {
         console.log("[viewLeftChat] :: ViewLeftChatViewModel : load");

         _cubeProxy.Proxy.prototype.addViewModel(this);

         this._selectQuery= null;
         this._fromQuery = null;
         this._endQuery = null;

      };

      ViewLeftChatViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewLeft] :: ViewLeftChatViewModel : onInit");

        //  this._setObservableInit(nxBlock);

         initDisplayChatUser();

        displayChatList();
      };

      var initDisplayChatUser =function () {

        var query = " SELECT a.SUB_DN , a.EMPLOYEE_ID ,a.SUB_MEDIA_ID "
                        +" FROM MA_SUBEMPLOYEE a, MA_EMPLOYEE b "
                        +" WHERE a.MASTER_EMPLOYEE_ID = b.EMPLOYEE_ID AND a.SUB_MEDIA_ID = 31"
                        +" AND b.EMPLOYEE_ID ='"+ nexus_signin.userId +"'"
                        +" ORDER BY a.SUB_MEDIA_ID ";


        getData(query,function(result, error, param){
            console.log("result {}" , result);

            if ( result !== null ) {
                for( var idx=0; idx<result.length; idx++ ) {

                console.log("result {}" , result);

                var clist =" <li> <img src='./../Styles/img/counselor.png'> "
                    +" <span class='chat_list_name' style='width:63%; line-height:40px'> "+ result[idx].SUB_DN +" </span> "
                    +" <span class='chat_list_time' id ='chat_list_time' style='line-height:40px'>"  +"Log off"+ "</span> </li>"
        
                $("#listUp_agent").append(clist); 
                
                }
            }
        
            
        } );

      };

      ViewLeftChatViewModel.prototype.eventpush= function(obj) {


        if (_cubeProxy.Proxy.prototype.getActiveChatDnCheck(obj.this) == 1  ) {

            if ( obj.fname =="event") {
                console.log(obj.id);
                switch(obj.id) {
                    case 3: // CC
                        $("#listDown_cus").empty();
                        //initDisplayChatUser();
                        displayChatList();

                        break;
                    case 6:
                        // newChat(obj.call.other);
                        break;

                    case 201:
                        console.log("logon 상태 입니다. ");
                        $("#chat_list_time").text('Log on..');
                        break;
                    case 202:
                        console.log("logoff 상태 입니다. ");
                        $("#chat_list_time").text('Log off..');
                        break;
                    case 203:
                        console.log("NotReady 상태 입니다. ");
                        $("#chat_list_time").text('Notready..');
                        break;
                    case 204:
                        console.log("Ready 상태 입니다. ");
                        $("#chat_list_time").text('Ready..');
                        //callmanage.removeItem(obj.call.c1);
                        break;
                    case 206:
                        $("#chat_list_time").text('After call work..');
                        break;

                }

            }
        }

      };

      var newChat = function(ani) {
        var nowtime = new Date();
        var sztime = nowtime.getHours() + ":" + nowtime.getMinutes();

        var his =" <li> <img src='./../Styles/img/customer_circle.png'> "
            + "<span class='chat_list_name'> " + ani + "</span> "
             + "<span class='chat_list_new'>N</span> "
            // + "<span class='chat_list_cnt'>"+result[idx].QUEUE_ID +  "</span> "
            + "<span class='chat_list_time'>"+ sztime + "</span> </br> </li>";
    
            $("#ul_his").append(his); 


      };

      var displayChatList = function() {
        var nowtime = new Date();

        var  pad = function(n,width) {
          if ( n < 10) {
              n = n + '';
             return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
          } else {
            return n;
          }
        };


         var query =  " SELECT ANI ,EVENT_STARTTIME ,QUEUE_ID "
                    + " FROM OT_CALLSTAT " 
                    + " WHERE CALL_TYPE = 11 AND CALL_KIND= 16 "
                    + " AND QUEUE_ID <>0 "
                    + " AND ABANDON_TIME IS NULL "
                    +" AND EVENT_STARTTIME like '" 
                    + nowtime.getFullYear() 
                    + pad(nowtime.getMonth()+1,2 )
                    + pad(nowtime.getDate(),2) 
                    +"%'"
                    +" AND MASTER_EMPLOYEE_ID ='" + nexus_signin.userId  +"'"
                    +" ORDER BY EVENT_STARTTIME DESC";

        getData(query,function(result, error, param){

            if ( result !== null ) {
                for( var idx=0; idx<result.length; idx++ ) {

                console.log("result {}" , result);

                var clist =" <li> <img src='./../Styles/img/person.png'> "
                        +" <span class='chat_list_name'> " + result[idx].ANI +" </span> "
                        // +" <span class='chat_list_new'>N</span> "
                        +" <span class='chat_list_cnt'>" + result[idx].QUEUE_ID + "</span> "
                        +" <span class='chat_list_time'>"+ displayEventtime(result[idx].EVENT_STARTTIME) +" </span> ";
        
                $("#listDown_cus").append(clist); 
              
            
            }
        }

        } );
      };

      var displayEventtime = function (evttime) {

        // return evttime.substr(0,4) + "-" + evttime.substr(4,2) +  "-" + evttime.substr(6,2)
        // + " " + evttime.substr(8,2) +":" + evttime.substr(10,2) +":" + evttime.substr(10,2);  
        return evttime.substr(8,2) +":" + evttime.substr(10,2) +":" + evttime.substr(10,2);

      };


    
      var getData = function(query,callback) {

        var fds= [];

        dbselector("agent", {
            //url : "/cairo/caching/master/agent", 
            url : "/cairo/selector/master/agent",
            params : {
               fields: fds,
               query: query,//"SELECT IDX , ID, NAME, SEX,JUMIN,TEL,FAX,MOBILE,ZIPCODE,EMAIL, ADDRESS FROM counseling_customer"
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


      



      ViewLeftChatViewModel.prototype._setObservableInit = function( nxBlock ) {
         var define = nxBlock.get("define"),
             field = nxBlock.get("field"),
             components = nxBlock.get("components");

             this._selectQuery = nxBlock.get("selectQuery");
             this._fromQuery  = nxBlock.get("fromQuery");
             this._endQuery = nxBlock.get("endQuery");    

         for ( var idx=0; idx<define.length; idx++ ) {
            var type = define[idx].type,
                domID = define[idx].domID,
                model = define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(define[idx].title);
               options = model.getOptions(field);

               model.getQuery(this._completeQuery());
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

      ViewLeftChatViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewLeftChatViewModel,
         domID: "nx-contents-left"
      };
   }
);

