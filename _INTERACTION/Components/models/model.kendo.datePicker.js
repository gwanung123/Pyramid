'use strict';

define([],
   function() {

      var config = {
         dateInput: function( param, bool ) {
            param.dateInput = bool;
            return param;
         },
         value: function( param, date ) {
            param.value = new Date();
            return param;
         },
         disableDates: function( param, array ) {
            param.disableDates = array;
            return param;
         },
         format: function( param, format ) {
            param.format = format;
            return param;
         },
         max: function( param, date ) {
            param.max = date;
            return param;
         },
         min: function( param, date ) {
            param.min = date;
            return param;
         }
      };

      var event = {
         onChange: function( param, func ) {
            param.change = func;
            return param;
         }
      };

      /************************************************************************************
         options = {
            input : true,
            value : new Date(),
            disable : ["Su"],
            format : "yyyy-MM-dd",
            max : new Date(2020, 0, 1),
            min : new Date(2010, 0, 1),
            onChange : function() {
               var value = this.value();
               console.log(value);
            }
         }
       ************************************************************************************/
      return function( options ){
         var param = {};

         for ( var prop in options ) {
            switch ( prop ) {
               case "input": param = config.dateInput(param, options[prop]);
                  break;
               case "value": param = config.value(param, options[prop]);
                  break;
               case "disable": param = config.disableDates(param, options[prop]);
                  break;
               case "format": param = config.format(param, options[prop]);
                  break;
               case "max": param = config.max(param, options[prop]);
                  break;
               case "min": param = config.min(param, options[prop]);
                  break;
               case "onChange": param = event.onChange(param, options[prop]);
                  break;
            }
         }

         return param;
      };

   }
);
