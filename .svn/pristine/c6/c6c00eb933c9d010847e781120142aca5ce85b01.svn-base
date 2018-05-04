'use strict';

define(["./text/text.en"],
   function( en ) {

      /***********************************************************
       * name        : text.define
       * url         : Defines/text.define.js
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


