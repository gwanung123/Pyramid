'use strict';

define([],
   function() {

      /************************************************************
       * name        : manage.validation
       * url         : Library/manage.validation.js
       * description :
       ************************************************************/

      var validation = {

         isNum : function(val) {
            var pattern = /^[\d]*$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isNum_star_sharp : function(val) {
            var pattern = /^[0-9\*\#]*$/gi;
            if (val == "") {
                return true;
            }
            return pattern.test(val);
         },

         isEng : function(val) {
            var pattern = /^[a-z]*$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isEng_upper : function(val) {
            var pattern = /^[A-Z]*$/g;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isEng_lower : function(val) {
            var pattern = /^[a-z]*$/g;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isNumEng : function(val) {
            var pattern = /^[0-9a-z]*$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isNumEng_upper : function(val) {
            var pattern = /^[0-9A-Z]*$/g;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isNumEng_lower : function(val) {
            var pattern = /^[0-9a-z]*$/g;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isNumEng_underbar : function(val) {
            var pattern = /^[0-9a-z_]*$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isNumEngKo_underbar : function(val) {
            var pattern = /^[가-힣0-9a-z_]*$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isIP : function(val) {
            var pattern =  /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isPassword : function(val) {
            var pattern =  /^[0-9a-z~!@#$%^&*|?]*$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

         isEmail : function(val) {
            var pattern =  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi;
            if (val == "") {
               return true;
            }
            return pattern.test(val);
         },

      };

      return {
         isNum                 : validation.isNum,
         isNum_star_sharp      : validation.isNum_star_sharp,
         isEng                 : validation.isEng,
         isEng_upper           : validation.isEng_upper,
         isEng_lower           : validation.isEng_lower,
         isNumEng              : validation.isNumEng,
         isNumEng_upper        : validation.isNumEng_upper,
         isNumEng_lower        : validation.isNumEng_lower,
         isNumEng_underbar     : validation.isNumEng_underbar,
         isNumEngKo_underbar   : validation.isNumEngKo_underbar,
         isIP                  : validation.isIP,
         isPassword            : validation.isPassword,
         isEmail               : validation.isEmail,
      };
   }
);


