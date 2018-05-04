'use strict';

define(["./dbms/dbms.maria"],
   function( maria ) {

      /***********************************************************
       * name        : dbms.define
       * url         : Defines/dbms.define.js
       * description : dbms 종류에 따라 결정
       *               dbms 종류는 인증 정보에 있음
       *               param은 고정 조건 값 (reference) /Containers/report.js
       ************************************************************/

      return function( dbms, param ) {
         switch ( dbms ) {
            case "maria" : return maria(param);
         }
      };
   }
);


