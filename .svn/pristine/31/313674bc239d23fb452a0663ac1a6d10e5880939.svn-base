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


      function ViewLeftMailViewModel( param ) {
         console.log("[viewLeftMail] :: ViewLeftMailViewModel : load");

        //  this.nxFieldTeamTreeview1 = ko.observable();
        //  this.nxFieldTeamTreeview2 = ko.observable();
      };

      ViewLeftMailViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewLeft] :: ViewLeftMailViewModel : onInit");
        //  this._setObservableInit(nxBlock);

        _cubeProxy.Proxy.prototype.addViewModel(this);

        initDisplayMailUser();

        displayMailList();

      };


      ViewLeftMailViewModel.prototype.eventpush= function(obj) {
        
        if (_cubeProxy.Proxy.prototype.getActiveMailDnCheck(obj.this) == 1  ) {
            if ( obj.fname =="event") {
                switch(obj.id) {
                    case 201:
                        console.log("logon 상태 입니다. ");
                        $("#mailstatus").text('Log on..');
                        break;
                    case 202:
                        console.log("logoff 상태 입니다. ");
                        $("#mailstatus").text('Log off..');
                        break;
                    case 203:
                        console.log("NotReady 상태 입니다. ");
                        $("#mailstatus").text('Notready..');
                        break;
                    case 204:
                        console.log("Ready 상태 입니다. ");
                        $("#mailstatus").text('Ready..');
                        
                        break;
                    case 206:
                        $("#mailstatus").text('After call work..');
                        break;

                }
            }
        }

     };





      var initDisplayMailUser = function() {

        var query = " SELECT a.SUB_DN , a.EMPLOYEE_ID ,a.SUB_MEDIA_ID "
                        +" FROM MA_SUBEMPLOYEE a, MA_EMPLOYEE b "
                        +" WHERE a.MASTER_EMPLOYEE_ID = b.EMPLOYEE_ID AND a.SUB_MEDIA_ID = 10"
                        +" AND b.EMPLOYEE_ID ='"+ nexus_signin.userId +"'"
                        +" ORDER BY a.SUB_MEDIA_ID ";

        getData(query,function(result, error, param){
            console.log("result {}" , result);

            if ( result !== null && result.length !==0 ) {
                for( var idx=0; idx<result.length; idx++ ) {

                    console.log("result {}" , result);

                    var clist =" <li> <img src='./../Styles/img/counselor.png'> "
                    +" <span class='mail_list_name' style='width:63%; line-height:40px'> "+ result[idx].SUB_DN +" </span> "
                    +" <span class='mail_list_time' id  ='mailstatus' style='line-height:40px'>"  +"Log off"+ "</span> </li>"
        
                     $("#list_col").append(clist); 
                
                
                    }
                }
            }
        );
    
      };


      var displayMailList = function() {
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
                    + " WHERE CALL_TYPE = 11 AND CALL_KIND= 64 "
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
                +" <span class='mail_list_name'> " + result[idx].ANI +" </span> "
                // +" <span class='chat_list_new'>N</span> "
                +" <span class='mail_list_cnt'>" + result[idx].QUEUE_ID + "</span> "
                +" <span class='mail_list_time'>"+ displayEventtime(result[idx].EVENT_STARTTIME) +" </span> ";

                $("#list_col").append(clist); 
              
            
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
               query: query,
            },
            onResult : function(result, error, param) {
               var parse = [];
               
               if ( result !== null ) {
                  for( var idx=0; idx<result.output.length; idx++ ) {
                     parse.push(result.output[idx]);
                  }
               }

               callback(parse, error, param);
            },
            onResultParam : fds
         });

      };



      ViewLeftMailViewModel.prototype._setObservableInit = function( nxBlock ) {
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

            //componentVM = nxcomponent.onInit(type, domID, options);
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

      ViewLeftMailViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewLeftMailViewModel,
         domID: "nx-contents-left"
      };
   }
);

