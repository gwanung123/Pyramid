'use strict';

define([],
   function() {

      var KendoAgentState = function() {
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

      var ptt = KendoAgentState.prototype;

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

      ptt.makeDataMode = function( mode ) {
         switch ( mode ) {
            case "201": return "LOGIN";
            case "202": return "LOGOUT";
            case "203": return "NOT READY";
            case "204": return "READY";
            case "205": return "OTHERWORK";
            case "206": return "AFTER CALL WORK";
         }
         return "UNKNOWN";
      };

      ptt.makeDataCallType = function( callType ) {
         switch ( callType ) {
            case "1": return "INBOUND";
            case "2": return "OUTBOUND";
            case "3": return "INTERNAL";
            case "4": return "CONSULT";
            case "5": return "TRANSFER";
            case "6": return "CONFERENCE";
         }
         return "UNKNOWN";
      };

      ptt.makeDataCallKind = function( callKind ) {
         switch ( callKind ) {
            case "1": return "VOICE";
            case "2": return "TWITTER";
            case "4": return "FACEBOOK";
            case "8": return "RESERVED";
            case "16": return "CHAT";
            case "32": return "VIDEO";
            case "64": return "EMAIL";
         }
         return "UNKNOWN";
      };
      //20180423 Sam #22980
      ptt.makeDataTimeBySec = function( sec ) {
        var date = new Date(sec *1000);
        var nowDate = new Date();        

        var returnDate = (nowDate - date) /1000;       
       
        var hh = Math.floor(returnDate/3600),
            hhTmp = returnDate%3600,
            mm = Math.floor(hhTmp/60),
            ss = Math.floor(hhTmp%60);

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

            if ( valKey === "AGENT_MODE" ) obj.val = self.makeDataMode(data[valKey]);
            else if ( valKey === "CALL_TYPE" ) obj.val = self.makeDataCallType(data[valKey]);
            else if ( valKey === "CALL_KIND" ) obj.val = self.makeDataCallKind(data[valKey]);
            else if ( valKey === "AGENT_TIME" ) obj.val = self.makeDataTimeBySec(data[valKey]);//20180423 Sam #22980
            else obj.val = data[valKey];
         
            parsed.push(obj);
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoAgentState;

   }
);
