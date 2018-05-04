'use strict';

define([],
   function() {

      var KendoQueueStats = function() {
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

      var ptt = KendoQueueStats.prototype;

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
         var param = {
            nexus: {},
            data: [],
            dataTextField: options.select.TEXT_FIELD,
            placeholder: options.select.PLACEHOLDER,
            autoWidth: true,
            clearButton: true,
            tagMode: "single"
         };

         return param;
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

      ptt.makeDataDefaultASIS = function( fields ) {
         var self = this;
         var arrData = [];
         var len= fields.length,
             data = {};

         for ( var i=0; i<len; i++ ) {
            data[fields[i]] = "0";
         }

         arrData.push(data);

         return arrData;
      };

      ptt.makeDataDefault = function( bind, param ) {
         var self = this;
         var parsed = [];

         for ( var key in bind ) {
            var obj = {
               key: key,
               val: 0
            };

            parsed.push(obj);
         }

         return parsed;
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
               val: data[valKey] || "none"
            };

            parsed.push(obj);
         }

         self.makeDataSet("TO_BE", parsed);

         return parsed;
      };

      /************************************************************************************

       ************************************************************************************/
      return KendoQueueStats;

   }
);
