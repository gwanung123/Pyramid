'use strict';

define(["./dbms/dbms.maria"],
   function( maria ) {

      /***********************************************************
       * name        : dbms.define
       * url         : Defines/dbms.define.js
       * description :
       ************************************************************/

      return function( dbms, param ) {
         switch ( dbms ) {
            case "maria" : return maria(param);
         }
      };
   }
);


