'use strict';

define(["knockout", 
"../../Library/interaction.selector",
"../../Components/components"],
   function( ko, dbselector,nxcomponent ) {
    
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

    // jesse
    nexus_signin.tenantId = parseInt(
      $.nexus({
         core : "nxapi",
         nxapi : {
            config : {
               kind : "jwt"
            },
            params : {
               key : "tenant"
            }
         }
      })
   );

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


    var nowtime = new Date();

    var  pad = function(n,width) {
      if ( n < 10) {
          n = n + '';
         return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
      } else {
        return n;
      }
    };


      function ViewMainHomeViewModel( param ) {
         console.log("[ViewMainHome] :: ViewMainHomeViewModel : load");

         this._define= null;
         this._field = null;

        //  this._selectQuery= null;
        //  this._fromQuery = null;
        //  this._endQuery = null;

        //  this._dateFrom ;
        //  this._dateTo;

        this._query = null;
        
         this._componentVM = new Array();
         this._components= null;

         this.displayStat();
          
      };


      ViewMainHomeViewModel.prototype.displayStat = function() {
        console.log("[ViewMainHome] :: ViewMainHomeViewModel : displayStat : Main");
        
        // var query = "SELECT a.CALL_KIND "
        //         +" ,IFNULL(SUM(a.IBCALL_COUNT),0) ibcall_count "
        //         +" ,IFNULL(SUM(a.OBCALL_COUNT),0) obcall_count "
        //         +" ,IFNULL(SUM(a.CALLWAIT_TIME),0)  callwait_time " 
        //         +" ,IFNULL(SUM(a.DIALRING_TIME),0)  dialing_time "
        //         +" ,IFNULL(SUM(a.READY_TIME),0)      ready_time " 
        //         +" ,IFNULL(SUM(a.ACW_TIME),0)       acw_time " 
        //         +" ,IFNULL(SUM(a.NRD_TIME),0)        nrd_time " 
        //         +" ,IFNULL(SUM(a.BUSY_TIME),0)       busy_time " 
        //         +" FROM VIEW_RE_EKRCCC_EMPDAILYSTATIC_D a " 
        //         +" WHERE a.END_DATE IN ('{0}') "
        //         +" AND a.EMPLOYEE_ID IN ('{1}') ";

        // query = query.format([nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2), nexus_signin.userId]);

        
                
        // getData(query,function(result, error, param){
        //   console.log("result {}" , result);

        //   if ( result !== null ) {
        //       // for( var idx=0; idx<result.length; idx++ ) {

        //       console.log("result {}" , result);

        //       $("#li_logintime").text(changeTimeFormat (result[0].ready_time + result[0].acw_time +result[0].nrd_time + result[0].busy_time ));
        //       $("#li_ibcall").text(result[0].ibcall_count);
        //       $("#li_obcall").text(result[0].obcall_count);
        //       $("#li_calltime").text(changeTimeFormat(result[0].callwait_time + result[0].dialing_time));

                            
        //       // }
        //   }
               
        // } );

        displayStat_Main();

        console.log("[ViewMainHome] :: ViewMainHomeViewModel : displayStat : LongestTalkTime");
        displayStat_LongestTalkTime();

        console.log("[ViewMainHome] :: ViewMainHomeViewModel : displayStat : Avg_Top");
        displayStat_Avg_Top();


      };


      // jesse
      var displayStat_Avg_Top = function(){
        var query = "SELECT a.CALL_KIND ,Employee_id "
                 +" ,IFNULL(SUM(a.IBCALL_COUNT),0) ibcall_count "
                 +" ,IFNULL(SUM(a.OBCALL_COUNT),0) obcall_count "
                 +" ,IFNULL(SUM(a.CALLWAIT_TIME),0)  callwait_time "
                 +" ,IFNULL(SUM(a.DIALRING_TIME),0)  dialing_time "
                 +" ,IFNULL(SUM(a.READY_TIME),0)      ready_time "
                 +" ,IFNULL(SUM(a.ACW_TIME),0)       acw_time "
                 +" ,IFNULL(SUM(a.NRD_TIME),0)        nrd_time "
                 +" ,IFNULL(SUM(a.BUSY_TIME),0)       busy_time "
                +" FROM VIEW_RE_EKRCCC_EMPDAILYSTATIC_D a " 
                +" WHERE a.END_DATE IN ('{0}') "
                +" AND a.EMPLOYEEPART_ID IN ('{1}') "
                +" group by a.CALL_KIND ,Employee_id "
                +" order by a.CALL_KIND ,Employee_id ";


        query = query.format([nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2), nexus_signin.tenantId]);
    
        getData(query,function(result, error, param){
          console.log("result {}" , result);

          if ( result !== null ) {

            var currentLoginTime;
            var currentIbCall;
            var currentObCall;
            var currentCalltime;

            var top_logintime = 0;
            var top_ibcall = 0;
            var top_obcall = 0;
            var top_calltime = 0;

            var tot_logintime = 0;
            var tot_ibcall = 0;
            var tot_obcall = 0;
            var tot_calltime = 0;

              // for( var idx=0; idx<result.length; idx++ ) {

              console.log("result {}" , result);

              for(var i = 0; i < result.length; i++)
              {
                // Top
                currentLoginTime = result[i].ready_time + result[i].acw_time +result[i].nrd_time + result[i].busy_time;
                currentIbCall = result[i].ibcall_count;
                currentObCall = result[i].obcall_count;
                currentCalltime = result[i].callwait_time + result[i].dialing_time;

                if(currentLoginTime > top_logintime)
                {
                  top_logintime = currentLoginTime;
                }
                if(currentIbCall > top_ibcall)
                {
                  top_ibcall = currentIbCall;
                }
                if(currentObCall > top_obcall)
                {
                  top_obcall = currentObCall;
                }
                if(currentCalltime > top_calltime)
                {
                  top_calltime = currentCalltime;
                }
                
                // tot
                tot_logintime += currentLoginTime;
                tot_ibcall += currentIbCall;
                tot_obcall += currentObCall;
                tot_calltime += currentCalltime;
              }

              $("#li_logintime_top").text(changeTimeFormat (top_logintime));
              $("#li_ibcall_top").text(top_ibcall);
              $("#li_obcall_top").text(top_obcall);
              $("#li_calltime_top").text(changeTimeFormat(top_calltime));

              // Avg
              $("#li_logintime_avg").text(changeTimeFormat(top_logintime/result.length));
              $("#li_ibcall_avg").text(Math.round(top_ibcall/result.length));
              $("#li_obcall_avg").text(top_obcall/result.length);
              $("#li_calltime_avg").text(changeTimeFormat(top_calltime/result.length));
             
              // }
          }
               
        } );
      
      };


      // jesse
      var displayStat_LongestTalkTime = function() {
        var query = "SELECT MAX(CALL_TIME) call_time "
                +" FROM OT_CALLSTAT " 
                +" WHERE EVENT_STARTTIME between '{0}000000' and '{0}235959' "
                +" and CALL_TYPE=11 and EMPLOYEE_ID <>'0' and IFNULL(NONSERVICE_FLAG,0)<>5 and CALL_TIME IS NOT NULL "
                +" AND EMPLOYEE_ID IN ('{1}') ";

        query = query.format([nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2), nexus_signin.userId]);
    
        getData(query,function(result, error, param){
          console.log("result {}" , result);

          if ( result !== null ) {
              // for( var idx=0; idx<result.length; idx++ ) {

              console.log("result {}" , result);

              $("#li_longtalktime").text(changeTimeFormat(result[0].call_time));
             
              // }
          }
               
        } );
      
      };


      var displayStat_Main = function () {
        var query = "SELECT a.CALL_KIND "
                +" ,IFNULL(SUM(a.IBCALL_COUNT),0)  ibcall_count "
                +" ,IFNULL(SUM(a.OBCALL_COUNT),0)  obcall_count "
                +" ,IFNULL(SUM(a.CALLWAIT_TIME),0) callwait_time " 
                +" ,IFNULL(SUM(a.DIALRING_TIME),0) dialing_time "
                +" ,IFNULL(SUM(a.READY_TIME),0)    ready_time " 
                +" ,IFNULL(SUM(a.ACW_TIME),0)      acw_time " 
                +" ,IFNULL(SUM(a.NRD_TIME),0)      nrd_time " 
                +" ,IFNULL(SUM(a.BUSY_TIME),0)     busy_time " 
                +" FROM VIEW_RE_EKRCCC_EMPDAILYSTATIC_D a " 
                +" WHERE a.END_DATE IN ('{0}') "
                +" AND a.EMPLOYEE_ID IN ('{1}') ";

        query = query.format([nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2), nexus_signin.userId]);
    
        getData(query,function(result, error, param){
          console.log("result {}" , result);

          if ( result !== null ) {
              // for( var idx=0; idx<result.length; idx++ ) {

              console.log("result {}" , result);

              $("#li_logintime").text(changeTimeFormat (result[0].ready_time + result[0].acw_time +result[0].nrd_time + result[0].busy_time ));
              $("#li_ibcall").text(result[0].ibcall_count);
              $("#li_obcall").text(result[0].obcall_count);
              $("#li_calltime").text(changeTimeFormat(result[0].callwait_time + result[0].dialing_time));
             
              // }
          }
               
        } );
      
      };

      var changeTimeFormat= function(seconds) {

        return (seconds < 3600 * 10 ? "0" : "") +
        Math.floor(seconds / (3600)) +
        new Date(seconds * 1000).toISOString().slice(13, 19);

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
    



      ViewMainHomeViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[ViewMainHome] :: ViewMainHomeViewModel : onInit");
        
         this._setObservableInit(nxBlock);
      };

    

      ViewMainHomeViewModel.prototype._completeQuery = function () {
       
        var query= this._query.replace("USER_ID",nexus_signin.userId );
        query= query.replace("TODAY",nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2)  );
       
        return query;
       
      }


      ViewMainHomeViewModel.prototype._setObservableInit = function( nxBlock ) {

        this._components = nxBlock.get("components");

        this._define = nxBlock.get("define");
        this._field = nxBlock.get("field");

        this._query = nxBlock.get("query");



         for ( var idx=0; idx<this._define.length; idx++ ) {
            var type = this._define[idx].type,
                domID = this._define[idx].domID,
                model = this._define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(this._define[idx].title);
               options = model.getOptions(this._field);

               model.getQuery(this._completeQuery());

            }

            componentVM = nxcomponent.onComponentLoad("",type, domID, options);
            this._componentVM.push(componentVM);

            if ( componentVM ) {
               this._components[domID] = {
                  type      : type,
                  model     : model,
                  viewModel : componentVM
               };

               this._setObservableData(domID, model, componentVM);
            }



         }
      };

      ViewMainHomeViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;
        

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewMainHomeViewModel,
         domID: "nx-contents-main"
      };
   }
);
