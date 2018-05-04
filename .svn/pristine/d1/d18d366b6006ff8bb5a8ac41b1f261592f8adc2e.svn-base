'use strict';

define(["./language/field.en"],
   function( en ) {

      /***********************************************************
       * name        : field.define
       * url         : Defines/field.define.js
       * description :
       ************************************************************/

      var type = navigator.appName,
          lang = "",
          language = (type=="Netscape") ? lang = navigator.language : lang = navigator.userLanguage,
          language = lang.substr(0,2);

      switch ( language ) {
         case "en": return en;
      }

      return en;
   }
);


