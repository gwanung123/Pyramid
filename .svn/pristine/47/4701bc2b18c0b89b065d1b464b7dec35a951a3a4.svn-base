'use strict';

define(["knockout", 
    "../../Library/interaction.nxproxy",
    "../../Defines/query.define",
    "../../Library/interaction.selector",
    "../../Components/components","nexus"],
   function( ko,nxproxy,query,dbselector, nxcomponent,nexus ) {
    
    var _useQuery ="";
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

     var userID = nexus_signin.userId ;

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

    

     var self = null;

     var _define= null;
     var _field = null;

     var _componentVM = new Array();
     var _components= null;
     var _query = null;


      function ViewRightViewModel( param ) {
         console.log("[viewRight] :: ViewRightViewModel : load");


         // //kms_pop 숨기기 기능
		$(".kms_pop").css("display","none");
		$(".mc_contact span img").click(function(){
			if($(".kms_pop").css("display")=="none"){
				$(".kms_pop").css("display","block");
			}
			else{
				$(".kms_pop").css("display","none");
			}
			return false;
		});
		
		// //kms 이미지 대체
		$(".mc_contact span img").click(function(){
			if($(".kms_pop").css("display")=="block"){
				$(".mc_contact span img").attr("src","../../Styles/img/kms_close.png");
				return false;
			}
			else{
				$(".mc_contact span img").attr("src","../../Styles/img/menu_kms_btn.png");
			}              
		});
		
		// //.kms_page_num li 마우스올렸을 때
		$(".kms_page_num li:eq(0)").css("backgroundColor","#e8ecef");
		$(".kms_page_num li:not(:eq(0))").mouseenter(function(){
			$(this).css({"backgroundColor":"#e8ecef"});
		}).mouseleave(function(){
			$(this).css({"backgroundColor":"#fff"});
		});
        

         //userDN = nexus_signin.userId ; //일단 임시 

         self = this;

      };



      ViewRightViewModel.prototype.getDefine = function() {
          return _define;
      };

      ViewRightViewModel.prototype.getField = function() {
        return _field;
     };

     ViewRightViewModel.prototype.getComponentVM = function() {
        return _componentVM;
     };


      ViewRightViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[viewRight] :: ViewRightViewModel : onInit");
         this._setObservableInit(nxBlock);
      };

      ViewRightViewModel.prototype.customerHistoryQuery = function(ohterParty) {
        var nowtime = new Date();
        
        var query ="SELECT EVENT_STARTTIME , CALL_KIND ,CALL_TYPE , QUEUE_ID  FROM OT_CALLSTAT WHERE ANI ='"
            + ohterParty + "'"
            + "AND EVENT_STARTTIME like '"
            + nowtime.getFullYear()
            + nowtime.getMonth() 
            + nowtime.getDay()
            + "%'";  


            return query;

      };


      ViewRightViewModel.prototype.kmsSave = function() {
        var nowtime = new Date();

        console.log("KMS Save" );

        var query ="INSERT INTO ma_kms ("
            + "KMS_ID,KMS_MAJOR_ID,KMS_SUB_ID,KMS_TITLE,KMS_CONTENTS,REG_DATE,REG_EMPLOYEE,ADOPT_YN) " 
            +" VALUES ( '{0}',{1},{2}, '{3}' ,'{4}','{5}','{6}',0 ) " ;

        query= query.format ([ 
            guid() ,  // KMS_ID
            0,         //KMS_MAJOR_ID
            0,          // KMS_SUB_ID
            $("#kmstitle").val() ,  //KMS_TITLE
            $("#kmscontent").text(), //KMS_CONTENTS
            nowtime.getFullYear() + nowtime.getMonth()  + nowtime.getDay(), //REG_DATE
            userID ]);


        getData(query,function(result, error, param){
            console.log("result {}" , result);

            if ( result !== null ) {

                console.log("kms save ok" );
                $("#kmstitle").val('');   //KMS_TITLE
                $("#kmscontent").text(''); //KMS_CONTENTS
                
            }
        } );
       

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


      var guid = function() {
        function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4();// + '-' + s4() + '-' + s4() + s4() + s4();
      };


      ViewRightViewModel.prototype.kmsSearch = function() {

        var search = $("#txtSearchString").val();
        var rtnQuery = query.CONTENTS.INTER_KMS_SEARCH.getQuery();


        rtnQuery= rtnQuery.format ([ 
            search
         ]);    



         for ( var idx=0; idx<_define.length; idx++ ) {
            var type = _define[idx].type,
                domID = _define[idx].domID,
                model = _define[idx].model;

            var options = null,
                componentVM;

            if (_define[idx].title == "KMS.GRID" )     {
       
                if ( model !== undefined ) {
                model = model(_define[idx].title);
                options = model.getOptions(_field);
                model.getQuery(rtnQuery);
                }

            // componentVM = nxcomponent.onInit(type, domID, options);
                componentVM = nxcomponent.onComponentLoad("",type, domID, options);
                

                if ( componentVM ) {
                    _components[domID] = {
                    type      : type,
                    model     : model,
                    viewModel : componentVM
                };

                this._setObservableData(domID, model, componentVM);
                }

            }
         }
         

      };


      ViewRightViewModel.prototype.refreshHistoryData = function(view,otherParty) {

        for ( var idx=0; idx<view.viewModel.prototype.getDefine().length; idx++ ) {
            var type = view.viewModel.prototype.getDefine()[idx].type,
                domID = view.viewModel.prototype.getDefine()[idx].domID,
                model = view.viewModel.prototype.getDefine()[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(view.viewModel.prototype.getDefine()[idx].title);
               options = model.getOptions(view.viewModel.prototype.getField());

               model.getQuery(view.viewModel.prototype.customerHistoryQuery(otherParty));

            }
   
            if ( view.viewModel.prototype.getComponentVM()[idx] ) {
                view.viewModel.prototype.getComponentVM()[domID] = {
                  type      : type,
                  model     : model,
                  viewModel : view.viewModel.prototype.getComponentVM()[idx]
               };

               view.viewModel.prototype._setObservableData(domID, model, view.viewModel.prototype.getComponentVM()[idx]);
            }

         }

      };


      ViewRightViewModel.prototype.eventpush = function(obj,rightview) {
        if ( obj.fname =="event") {
            console.log(obj.id);
            switch(obj.id) {
                case 6: // ES
                    if (userDN == obj.this )
                    {
                        //데이터 조회 
                        //obj.call.other  --> any
                        rightview.viewModel.prototype.refreshHistoryData(rightview,obj.call.other);

                    }

                    break;

            }

        }

      };

    
      ViewRightViewModel.prototype.getGridQuery = function (title) {

        var rtnQuery="";

        switch (title) {
            case "INTERCALL.GRID":
                rtnQuery = query.CONTENTS.CUSTMER_HIS.getQuery();
                break;
            case "KMS.GRID":
                rtnQuery = query.CONTENTS.INTER_KMS.getQuery();
                break;

        }

        return rtnQuery;


      };



      ViewRightViewModel.prototype._setObservableInit = function( nxBlock ) {
        
        _define = nxBlock.get("define");
        _field = nxBlock.get("field");
        _query = nxBlock.get("query");
        _components = nxBlock.get("components");
        
        // var define = nxBlock.get("define"),
        //      field = nxBlock.get("field"),
        //      query = nxBlock.get("query"),
        //      components = nxBlock.get("components");
        

         for ( var idx=0; idx<_define.length; idx++ ) {
            var type = _define[idx].type,
                domID = _define[idx].domID,
                model = _define[idx].model;

            var options = null,
                componentVM;

            if ( model !== undefined ) {
               model = model(_define[idx].title);
               options = model.getOptions(_field);
               model.getQuery(this.getGridQuery(model.title));
            }

           // componentVM = nxcomponent.onInit(type, domID, options);
            componentVM = nxcomponent.onComponentLoad("",type, domID, options);
            _componentVM.push(componentVM);

            if ( componentVM ) {
                _components[domID] = {
                  type      : type,
                  model     : model,
                  viewModel : componentVM
               };

               this._setObservableData(domID, model, componentVM);
            }
         }
      };

      ViewRightViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewRightViewModel,
         domID: "nx-contents-right"
      };
   }
);
