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

   
    var nowtime = new Date();

    var  pad = function(n,width) {
      if ( n < 10) {
          n = n + '';
         return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
      } else {
        return n;
      }
    };

    function ViewMainHistoryViewModel( param ) {
        console.log("[ViewMainHome] :: ViewMainHistoryViewModel : load");

        this._define= null;
        this._field = null;
        
        this._query = null;
       
        this._componentVM = new Array();
        this._components= null;

         
        
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

      

      ViewMainHistoryViewModel.prototype.displayCustomerHistroy = function () {

        var query = this._completeQuery();

        getData(query,function(result, error, param){
            console.log("result {}" , result);
  
            if ( result !== null ) {
                 for( var idx=0; idx<result.length; idx++ ) {
  
                console.log("result {}" , result);
                      
                var list = " <li> "
                           + " <span>" + result[idx].CUSTOMER_IDX + "</span> "
                           + " <span>000-000-0000</span> "
                           +" <img src='../Styles/img/call_30_btn.png'/> "
                           +" </li> "

                 $("#ul_list").append(list);   
                 
                var custInfo = "";

                if (result[idx].CUBE_CALL_KIND == "1") {
                    custInfo = "<ul class='c_type_info'>"
                            +"    <li> "
                            +"        <img src='../Styles/img/play_btn.png'/> "
                            +"        <span class='c_view'>VIEW</span> "
                                +" </li> "
                                 + " <li>"+result[idx].category1 + "</li> "
                                 + " <li>"+ result[idx].category2+ "</li> "
                                 + " <li>"+ result[idx].category3+ "</li> "
                                + " <li> " 
                                +" <span>" + result[idx].START_TIME + " </span> "
                                +" <span>00:00:00</span> "
                                + "</li> "
                                + "<li>" + result[idx].AGENT_ID + "</li>"
                            +" </ul> "; 

                } else if (result[idx].CUBE_CALL_KIND == "16") {
                    custInfo = "<ul class='c_type_info'>"
                            +"    <li> "
                             + " <img src='../Styles/img/chat_30_btn.png'/> "
                            // +"        <span class='c_view'>VIEW</span> "
                                +" </li> "
                                 + " <li>"+result[idx].category1 + "</li> "
                                 + " <li>"+ result[idx].category2+ "</li> "
                                 + " <li>"+ result[idx].category3+ "</li> "
                                + " <li> " 
                                +" <span>" + result[idx].START_TIME + " </span> "
                                +" <span>00:00:00</span> "
                                + "</li> "
                                + "<li>" + result[idx].AGENT_ID + "</li>"
                            +" </ul> "; 

                } else if (result[idx].CUBE_CALL_KIND == "10") {
                    custInfo = "<ul class='c_type_info'>"
                            +"    <li> "
                            +"         <img src='../Styles/img/mail_30_btn.png'/> "
                            // +"        <span class='c_view'>VIEW</span> "
                                +" </li> "
                                 + " <li>"+result[idx].category1 + "</li> "
                                 + " <li>"+ result[idx].category2+ "</li> "
                                 + " <li>"+ result[idx].category3+ "</li> "
                                + " <li> " 
                                +" <span>" + result[idx].START_TIME + " </span> "
                                +" <span>00:00:00</span> "
                                + "</li> "
                                + "<li>" + result[idx].AGENT_ID + "</li>"
                            +" </ul> "; 

                }




                 $("#c_history").append(custInfo);
                 
                              
                }
            }
                 
          } );


      };

     


      ViewMainHistoryViewModel.prototype._completeQuery = function () {

        var query= this._query.replace("USER_ID",nexus_signin.userId );
        // query= query.replace("TODAY",nowtime.getFullYear() + pad(nowtime.getMonth()+1,2 ) + pad(nowtime.getDate(),2)  );

        var today =nowtime.getFullYear() + "-" + pad(nowtime.getMonth()+1,2 ) + "-" +pad(nowtime.getDate(),2);

        query= query.replace("TODAY",today );
       
        return query ;
      };


      ViewMainHistoryViewModel.prototype.onInit = function( nxBlock ) {
         console.log("[ViewMainHome] :: ViewMainHistoryViewModel : onInit");
        
         this._setObservableInit(nxBlock);

         this.displayCustomerHistroy();
      };

        


      ViewMainHistoryViewModel.prototype._setObservableInit = function( nxBlock ) {
        //  var define = nxBlock.get("define"),
        //      field = nxBlock.get("field"),
        //      query = nxBlock.get("query"),
        //      selectQuery = nxBlock.get("selectQuery"),
        //      fromQuery = nxBlock.get("fromQuery"),
        //      endQuery = nxBlock.get("endQuery"),

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

            // if (domID == "nxDatePickerFrom") {
            //     console.log(componentVM.getDate());
            //     this._dateFrom = componentVM ;
            // } else if (domID == "nxDatePickerTo" ) {
            //     console.log(componentVM.getDate());
            //     this._dateTo = componentVM;
            // }
            

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

      ViewMainHistoryViewModel.prototype._setObservableData = function( domID, model, componentVM ) {
         if ( model === undefined ) return;
        

         if ( model.getData ) {
            model.getData(function(result, error, param) {
               if ( error === null ) componentVM.setDataSource(result, param);
            });
         }
      };


      return {
         viewModel: ViewMainHistoryViewModel,
         domID: "nx-contents-main"
      };
   }
);
