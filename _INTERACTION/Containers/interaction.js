'use strict';

(function () {

   requirejs.config({
      baseUrl: "../",
      config: {},
      paths: {
        "jquery": "../Libpack/jquery/jquery-3.3.1.min",
        "knockout": "../Libpack/knockout/knockout-3.4.2",
        "sammy": "../Libpack/sammy/sammy-0.7.6.min",
        "text": "../Libpack/require_text/text",
        "kendo.all.min": "../Libpack/kendo/js/kendo.all.min",

        "nxerror"  : "../Error/error",
        "nexus"    : "../Libpack/nexus/nexus",
        "nxredis"  : "../Libpack/nexus/nexus.redis",
        "nxdbms"   : "../Libpack/nexus/nexus.dbms",
        "nxws"     : "../Libpack/nexus/nexus.ws",

        "nxpermit" : "../Models/models.permit",

         "nxdefine": "./interaction.define",
         "nxbinder": "./interaction.binder",
         "nxrouter": "./interaction.router"
         // "../../Library/interaction.nxproxy"

      },
      shim: {
        "kendo.all.min": {
           deps: ["jquery"]
        },
        "nexus": {
           deps: ["jquery"]
        },
        "nxredis": {
           deps: ["nexus"]
        },
        "nxdbms": {
           deps: ["nexus"]
        },
        "nxws": {
           deps: ["nexus"]
        }
      },
   });

   require([
      "nxdefine",
      "nxbinder",
      "nxrouter",
      "Containers/sub/containers",
      "Library/interaction.nxproxy",
      "Library/interaction.selector"
   ],
   function(
      define,
      binder,
      router,
      containers,
      nxproxy,
      dbselector
   ) {

    var cubeProxy = nxproxy;
    // var userID="";
    // var userDN="";

    var _useQuery =""; 

    
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



    var init = function() {
        
         //append container
         binder.appendHTMLs(containers.viewModels);

         //container vm bind
         for ( var prop in containers.containersVMs ) {
            binder.bind(containers.containersVMs[prop]);
         }

         router.run();
    };

    var main = function () {
        console.log("[interaction] :: main : start");

        init();
    };


    var getData = function(query ,callback) {

        var fds= [];

        dbselector("agent", {
            url : "/cairo/selector/master/agent",
            params : {
                fields: fds,
                query: query//"SELECT IDX , ID, NAME, SEX,JUMIN,TEL,FAX,MOBILE,ZIPCODE,EMAIL, ADDRESS FROM counseling_customer"
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
                        parse.push(result.output[idx]);
                    }
                }

                callback(parse, error, param);
            },
            onResultParam : fds
            });

        };

    var nxproxyOpen = function () {
        console.log("[interaction] :: nxproxy : open");

        var userDn = $.nexus({
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
         
         if (userDn ==="") {
             userDn = nexus_signin.userId;
         }
         

         //nexus_signin.userDn = userDn;


        var wsProtocol = "ws://";
        var ServerIP = nexus_signin.mainHosts.toString().split(":")[0];
        var ServerPort ="8877";
        

        if (cubeProxy.Proxy.prototype.UseWebSocket() == null) {
            cubeProxy.Proxy.prototype.openServer(wsProtocol,ServerIP,ServerPort, nexus_signin.userId,userDn);


            /* 이건  Multti Add Device 요청  */
            var query = " SELECT a.SUB_DN , a.EMPLOYEE_ID ,a.SUB_MEDIA_ID "
                        +" FROM MA_SUBEMPLOYEE a, MA_EMPLOYEE b "
                        +" WHERE a.MASTER_EMPLOYEE_ID = b.EMPLOYEE_ID "
                        +" AND b.EMPLOYEE_ID ='"+ nexus_signin.userId +"'"
                        +" ORDER BY a.SUB_MEDIA_ID ";


            getData(query,function(result, error, param){
                console.log("result {}" , result);
                
                cubeProxy.Proxy.prototype.MultiChannelAddDevice(result);
                // for(var idx = 0; idx < result.length; idx++ ) {
                //     console.log("sub dn {}" , result[idx].SUB_DN);
                //     cubeProxy.Proxy.prototype.MultiChannelAddDevice(result[idx].SUB_DN
                //         ,result[idx].EMPLOYEE_ID
                //         ,result[idx].SUB_MEDIA_ID );
                // }
    
            } );
           
        
        }
    };
   

      //=====================================================================
      //    interaction Start
      //=====================================================================
     
      nxproxyOpen();
      
      main();

   });

   


})();
