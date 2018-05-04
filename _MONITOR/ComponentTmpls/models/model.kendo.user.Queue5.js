'use strict';

define([],
   function() {

      var KendoQueue = function() {
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

      var ptt = KendoQueue.prototype;

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

      ptt.makeDataPush = function( arrData, bind ) {
         var self = this;
         var src = self.makeDataGet("AS_IS");
         var parsed = [];

         for ( var i=0; i<arrData.length; i++ ) {
            var data = arrData[i];

            for ( var j=0; j<src.length; j++ ) {
               var asis = src[j];
               if ( data[bind["AgentID"]] !== asis[bind["AgentID"]] ) continue;
               src[j] = arrData[i];
            }
         }

         parsed = self.makeData(self.makeDataGet("AS_IS"), bind);

         return parsed;
      };

      ptt.makeData = function( arrData, bind, param ) {
         var self = this;
         var len = arrData.length;
         var parsed = [];

         self.makeDataSet("AS_IS", arrData);

         for ( var i=0; i<len; i++ ) {
            var data = arrData[i],
                obj = {};

            for ( var key in bind ) {
               var valKey = bind[key];

               if ( valKey === "AGENT_MODE" ) obj[key] = self.makeDataMode(data[valKey]);
               else if ( valKey === "CALL_TYPE" ) obj[key] = self.makeDataCallType(data[valKey]);
               else obj[key] = data[valKey];
            }

            parsed.push(obj);
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoQueue;

   }
);
