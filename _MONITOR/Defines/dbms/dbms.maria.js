'use strict';

define([],
   function() {

      /***********************************************************
       * name        : dbms.maria
       * url         : Defines/dbms/dbms.maria.js
       * description :
       ************************************************************/

      var _DEFINE = function( _PARAM ) {

         return {
         //////////////////////////////////////////////////////////
         //////////////////////////////////////////////////////////

         /**
          * loading
          */
         LOADING : {
         },

         /**
          * resource
          */
         RESOURCE : {
               DBMS_SUB : {
                  URL    : "/cairo/selector/master/dnsub",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, DNSUB_NAME " +
                           "FROM MA_DNSUBCATEGORY " +
                           "WHERE DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_QUEUE : {
                  URL    : "/cairo/selector/master/route",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, DNMAJOR_ID, DNSUB_ID, QUEUE_ID " +
                           "FROM MA_QUEUE " +
                           "WHERE MONITOR_FLAG=1 AND " +
                           "DNSUB_ID=" + _PARAM.DNSUB_ID
               },
               DBMS_SKILL : {
                  URL    : "/cairo/selector/master/skill",
                  QUERY  : "SELECT CENTER_ID, TENANT_ID, SKILL_ID, SKILL_NAME " +
                           "FROM MA_SKILL"
               }
         }, // end of resource

         //////////////////////////////////////////////////////////
         //////////////////////////////////////////////////////////
         };
      }; //end of _DEFINE

      return _DEFINE;
   }
);
