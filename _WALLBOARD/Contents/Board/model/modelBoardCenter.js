'use strict';

define([],
   function() {

      /*********************************************************************************
       * BORDER
       *********************************************************************************/
      var Board = function( tag ) {
         this.tag = tag;
         this.options = undefined;
         this.shared = undefined;

         this.DEFAULT_OPTION = {
            nexus: {
               bind: undefined,
               items: undefined,
               join: {}
            },
            url    : undefined,
            items  : undefined,
            fields : undefined,
            data   : undefined,
            pageSize: false
         };
      };

      //===============================================================================//
      // prototype
      //===============================================================================//

      /******************************************************
       * ~ AS-IS
       * [
       *    { "AGENT_ID":"1004", "AGENT_MODE":"201", "LOGIN_ID":"10041", "CALL_TYPE":"1" },
       *    { "AGENT_ID":"1005", "AGENT_MODE":"201", "LOGIN_ID":"10042", "CALL_TYPE":"1" },
       *    { "AGENT_ID":"1006", "AGENT_MODE":"201", "LOGIN_ID":"10043", "CALL_TYPE":"1" },
       * ]
       *
       * ~ TO-BE
       * [
       *    {AgentID: "1004", Board:"201", LoginID:"10041", AgentMode:"1"},
       *    {AgentID: "1005", Board:"201", LoginID:"10042", AgentMode:"1"},
       *    {AgentID: "1006", Board:"201", LoginID:"10043", AgentMode:"1"},
       * ]
       ******************************************************/

      Board.prototype.getData = function( shared ) {
         var self = this;
         var board = shared["wallboard"],
             setting = shared["setting"],
             parsed = [];

         for( var idx=0; idx<setting.length; idx++ ) {
            var item = setting[idx],
                obj = {};

            if ( item["ISUSE"] === 0 ) continue;

            obj[item["NAME"]] = board[item["NAME"]];

            parsed.push(obj);
         }

         return parsed;
      };

      Board.prototype.getPushData = function( data, bind ) {
         var self = this;
         var arrPath = self.options.data.split("."),
             shared = self.shared[arrPath[2]];
         return self.getData(shared);
      };

      Board.prototype.setItems = function( path ) {
         var self = this;
         var arrPath = path.split("."),
             shared = self.shared[arrPath[2]][arrPath[3]],
             items = new Array(shared[0]["EMPLOYEEPART_ID"].toString());

         self.options.nexus.items = self.options.items = items;

         return items.length;
      };

      Board.prototype.getItems = function() {
         var self = this;
         return self.options.nexus.items;
      };

      Board.prototype.requestData = function( options, callback ) {
         var self = this;
         var arrPath = options.data.split("."),
             shared = self.shared[arrPath[2]],
             result = self.getData(shared);

         callback.onResult(result, null, callback.onResultParam);
      };

      Board.prototype.getOptions = function( text, nexus, shared ) {
         var self = this;
         var options = $.extend(true, {}, self.DEFAULT_OPTION);

         self.shared = shared;

         options.data = text.DATA;
         options.pageSize = text.PAGESIZE;

         self.options = options;

         self.setItems(text.ITEMS);

         return self.options = options;
      };

      Board.prototype.setNexusJoin = function( name, cb, cbParam ) {
         var self = this;
         var nexus = self.options.nexus;

         if ( nexus.join[name] === undefined ) {
            nexus.join[name] = [];
         }

         nexus.join[name].push({
            callback: cb,
            callbackParam: cbParam
         });
      };

      /************************************************************************************

       ************************************************************************************/
      return function( tag ) {
         return new Board(tag);
      };

   }
);
