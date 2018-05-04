'use strict';

define(["./text/text.en"],
   function( en ) {

      /***********************************************************
       * name        : text.define
       * url         : Defines/text.define.js
       * description : broswer language 를 기준으로 맞춤 (default) 영어
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


