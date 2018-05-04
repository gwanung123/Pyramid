'use strict';

define([],
   function() {

      var KendoAgentStats = function() {
         /**
          * Variables
          */
         this.DATA = {
            AS_IS: undefined,
            TO_BE: undefined
         };
         this.isChangeFlag = false;
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      var ptt = KendoAgentStats.prototype;

      /******************************************************
       * Option
       *
       * DEFAULT_OPTION = {
       *     nexus: {},
       *     url: "",
       *     items: [],
       *     fields: []
       * };
       *
       ******************************************************/

      ptt.makeOption = function( options ) {
         return options;
      };

      /******************************************************
       *
       * ~ input
       * [{"TENANT_ID":"10","GROUP_ID":"100",...}]
       *
       * ~ output
       * [{key:"tenant id", val:"1"}, {key:"group id", val:"1"}]
       *
       ******************************************************/
      ptt.makeDataGet = function( type ) {
         var self = this;
         if ( type === undefined ) return self.DATA;
         return self.DATA[type];
      };

      ptt.makeDataSet = function( type, data ) {
         var self = this;
         self.DATA[type] = $.extend(true, [], data);
      };

      ptt.makeDataIsChanged = function( bool ) {
         var self = this;
         if ( bool === undefined ) return self.isChangeFlag;
         self.isChangeFlag = bool;
      };

      ptt.makeDataTimeBySec = function( sec ) {
         var hh = Math.floor(sec/3600),
             hhTmp = sec%3600,
             mm = Math.floor(hhTmp/60),
             ss = hhTmp%60;

         if ( hh.toString().length === 1 ) hh = "0" + hh;
         if ( mm.toString().length === 1 ) mm = "0" + mm;
         if ( ss.toString().length === 1 ) ss = "0" + ss;

         return hh+":"+mm+":"+ss;
      };

      ptt.makeData = function( arrData, bind, param ) {
         var self = this;
         var data = arrData[0];
         var parsed = [];

         self.makeDataSet("AS_IS", arrData);

         for ( var key in bind ) {
            var valKey = bind[key];
            var obj = {
               key: key,
               val: ""
            };

            if ( valKey.indexOf("TIME") >= 0 ) {
               obj.val = self.makeDataTimeBySec(data[valKey]);
            }
            else if ( valKey.indexOf("$=") >= 0 ) {
               var arrVal = valKey.split("$=");
               obj.val = arrVal[1];
            }
            else obj.val = data[valKey];

            parsed.push(obj);
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoAgentStats;

   }
);
