define([], function() {

   var error = {

        /* error level
            success
            info
            warn
            fault
        */

        /*
         *  success (0001~0009)
         */
        e0001 : {
            isuse : true,
            errno : 1,
            errid : "RESPONSE_SUCCESS",
            task  : "",     //사용자 정의 ex) nxrio_http/nxpub
            level : "success",
            desc  : "",     //사용자 정의
            solve : undefined,
            data  : undefined //(arrRow)
        },

        /*
         *  fail (0000)
         */
        e0000 : {
            isuse : true,
            errno : 0,
            errid : "RESPONSE_FAIL",
            task  : "",     //사용자 정의 ex) nxrio_http/nxpub
            level : "",     //사용자 정의 ex) warn, fault
            desc  : "",     //사용자 정의
            solve : "관리자에게 문의바랍니다.",
            data  : undefined // not use
        },


        /*
         *  info (7777)
         */
        e7777 : {
            isuse : true,
            errno : 1,
            errid : undefined,
            task  : undefined,     //사용자 정의 ex) nxrio_http/nxpub
            level : "info",     //사용자 정의 ex) warn, fault
            desc  : "",     //사용자 정의
            solve : undefined,
            data  : undefined // not use
        },

      /*
       * nxpub error (5100~5199)
       */
      e5100 : {
         isuse : true,
         errno : -5100,
         errid : "PUB_FAULT_STATE_DISCONNECTED",
         task  : "nxpub",
         level : "fault",
         desc  : "NEXUSCUBE(nxstat)서버와의 연결이 끊어졌습니다.",
         solve : "NEXUSCUBE서버의 상태 확인이 필요합니다."
      },

      e5111 : {
         isuse : true,
         errno : -5111,
         errid : "PUB_WARN_WAS_STATUS_INVALID",
         task  : "nxpub",
         level : "warn",
         desc  : "ORI-NXWAS상태에 문제가 발생하였습니다.",
         solve : "ORI-NXWAS 상태확인이 필요합니다."
      },

      e5112 : {
         isuse : true,
         errno : -5112,
         errid : "PUB_WARN_WAS_REQUEST_FAILED",
         task  : "nxpub",
         level : "warn",
         desc  : "ORI-NXWAS에 대한 요청에 실패하였습니다..",
         solve : "NXPUB 로그확인 및 ORI-NXWAS 로그확인이 필요합니다."
      },

      e5113 : {
         isuse : true,
         errno : -5113,
         errid : "PUB_WARN_WAS_RESPONSE_FAILED",
         task  : "nxpub",
         level : "warn",
         desc  : "ORI-NXWAS로 부터의 응답에 대해 오류가 발생하였습니다.",
         solve : "NXPUB 와 ORI-NXWAS 로그 확인이 필요합니다."
      },

      e5114 : {
         isuse : true,
         errno : -5114,
         errid : "PUB_WARN_MULTICAST_FAILED",
         task  : "nxpub",
         level : "warn",
         desc  : "NXPUB 의 멀티케스트에 실패하였습니다.",
         solve : "NXPUB 로그 확인이 필요합니다."
      },

      e5121 : {
         isuse : true,
         errno : -5121,
         errid : "PUB_WARN_SM_NOTFIND",
         task  : "nxpub",
         level : "warn",
         desc  : "NEXUSCUBE 공유메모리에 존재하지 않습니다.",
         solve : "NXPUB 로그와 NEXUSCUBE 공유메모리 확인이 필요합니다."
      },

      e5122 : {
         isuse : true,
         errno : -5122,
         errid : "PUB_WARN_MDB_NOTFIND",
         task  : "nxpub",
         level : "warn",
         desc  : "NXPUB Memory DB에 존재하지 않습니다.",
         solve : "NXPUB 로그와 Memory DB 확인이 필요합니다."
      },

      e5123 : {
         isuse : true,
         errno : -5123,
         errid : "PUB_WARN_XMLPARSE_FAILED",
         task  : "nxpub",
         level : "warn",
         desc  : "xml parsing을 실패하였습니다.",
         solve : "NXPUB 로그 확인이 필요합니다."
      },

      e5124 : {
         isuse : true,
         errno : -5124,
         errid : "PUB_WARN_LICENSE_FAILED",
         task  : "nxpub",
         level : "warn",
         desc  : "xml 이벤트에 license 정보에 대하여 문제가 있습니다.",
         solve : "NXPUB 로그 확인이 필요합니다."
      },

      e5131 : {
         isuse : true,
         errno : -5131,
         errid : "PUB_WARN_INVALID_INVOKE",
         task  : "nxpub",
         level : "warn",
         desc  : "invoke id에 문제가 있습니다.",
         solve : "NXPUB 로그 확인이 필요합니다."
      },

      e5132 : {
         isuse : false,
         errno : -5132,
         errid : "PUB_WARN_PARAM_INVALID",
         task  : "nxpub",
         level : "warn",
         desc  : "파라메터에 문제가 있습니다.",
         solve : "NXPUB 로그 확인이 필요합니다."
      },

      e5199 : {
         isuse : true,
         errno : -5199,
         errid : "PUB_WARN_NOTSUPPORTED",
         task  : "nxpub",
         level : "warn",
         desc  : "지원되지 않는 기능입니다.",
         solve : "NXPUB 로그 확인이 필요합니다."
      },

      /*
       * nxrio-http error(5300~5399)
       */
      e5300 : {
         isuse : true,
         errno : -5300,
         errid : "RIO_FAULT_PUB_DISCONNECTED",
         task  : "nxrio-http",
         level : "fault",
         desc  : "NXPUB과의 연결이 끊어졌습니다.",
         solve : "NXPUB 상태 확인이 필요합니다."
      },

      e5301 : {
         isuse : true,
         errno : -5301,
         errid : "RIO_FAULT_WAS_DISCONNECTED",
         task  : "nxrio-http",
         level : "fault",
         desc  : "REP-NXWAS과의 연결이 끊어졌습니다.",
         solve : "REP-NXWAS 상태 확인이 필요합니다."
      },

      e5311 : {
         isuse : true,
         errno : -5311,
         errid : "RIO_FAULT_QUEUE_INVALID",
         task  : "nxrio-http",
         level : "fault",
         desc  : "Queue에 문제가 발생 하였습니다.",
         solve : "NXRIO-HTTP 로그 확인이 필요합니다."
      },

      e5321 : {
         isuse : true,
         errno : -5321,
         errid : "RIO_WARN_WAS_REQUEST_FAILED",
         task  : "nxrio-http",
         level : "warn",
         desc  : "REP-NXWAS로 요청이 실패하였습니다.",
         solve : "NXRIO-HTTP 와 REP-NXWAS 로그 확인이 필요합니다."
      },

      e5322 : {
         isuse : true,
         errno : -5322,
         errid : "RIO_WARN_WAS_RESPONSE_FAILED",
         task  : "nxrio-http",
         level : "warn",
         desc  : "REP-NXWAS에 대한 응답이 실패 하였습니다.",
         solve : "NXRIO-HTTP 와 REP-NXWAS 로그 확인이 필요합니다."
      },

      e5331 : {
         isuse : true,
         errno : -5331,
         errid : "RIO_WARN_USER_NOTFIND",
         task  : "nxrio-http",
         level : "fault",
         desc  : "사용자를 찾을 수 없습니다. 다시 로그인 하시기 바랍니다.",
         solve : "NXRIO-HTTP 로그 확인이 필요합니다."
      },

      e5332 : {
         isuse : true,
         errno : -5332,
         errid : "RIO_WARN_DATA_NOTEXIST",
         task  : "nxrio-http",
         level : "warn",
         desc  : "monitor 삭제 파라메터에 문제가 있습니다.",
         solve : "NXRIO-HTTP 로그 확인이 필요합니다."
      },

      e5333 : {
         isuse : true,
         errno : -5333,
         errid : "RIO_WARN_USER_EXIST",
         task  : "nxrio-http",
         level : "warn",
         desc  : "사용자가 이미 로그인 되어있습니다.",
         solve : "NXRIO-HTTP 로그 확인이 필요합니다."
      },

      e5341 : {
         isuse : true,
         errno : -5341,
         errid : "RIO_WARN_UUID_INVALID",
         task  : "nxrio-http",
         level : "warn",
         desc  : "UUID에 문제가 발생하였습니다.",
         solve : "NXRIO-HTTP 로그 확인이 필요합니다."
      },

      e5342 : {
         isuse : true,
         errno : -5342,
         errid : "RIO_WARN_PARAM_INVALID",
         task  : "nxrio-http",
         level : "warn",
         desc  : "파라메터에 문제가 발생하였습니다.",
         solve : "NXRIO-HTTP 로그 확인이 필요합니다."
      },

      /*
       * nxwas error(5500~5599)
       */


      /*
         *  error(5500~5599)
         */
        e5501 : {
            isuse : true,
            errno : -5501,
            errid : "NXWAS_FAULT_INVALID_CREDENTIALS",
            task  : "NXWAS",
            level : "fault",
            desc  : "EMPLOYEE ID 조회에 대해 센터와 테넌트의 정보가 없습니다.",
            solve : "로그인 정보를 확인하여 주시기 바랍니다."
        },

        e5507 : {
            isuse : true,
            errno : -5507,
            errid : "NXWAS_FAULT_PRE-LOGIN_FAILED",
            task  : "NXWAS",
            level : "fault",
            desc  : "인증 중 문제가 발생하였습니다.",
            solve : "NXRIO-HTTP 로그와 NXWAS(AUTH) 로그의 확인이 필요합니다."
        },

        e5518 : {
            isuse : true,
            errno : -5518,
            errid : "NXWAS_FAULT_DB-REP_CONNECTION_PROBLEM",
            task  : "NXWAS",
            level : "fault",
            desc  : "POSTGRESQL과의 커넥션 문제가 발생하였습니다.",
            solve : "POSTGRESQL의 상태를 확인하여 주시기 바랍니다."
        },

        e5530 : {
            isuse : true,
            errno : -5530,
            errid : "NXWAS_WARN_EXECUTING_SQL_PROBLEM",
            task  : "NXWAS",
            level : "warn",
            desc  : "DB의 SQL 실행 중 문제가 발생하였습니다.",
            solve : "요청 데이터를 확인하여 주시기 바랍니다. NXWAS(DBMASTER) 로그 확인이 필요합니다."
        },

        e5531 : {
            isuse : true,
            errno : -5531,
            errid : "NXWAS_FAULT_DB_CLONE_PROGRESS",
            task  : "NXWAS",
            level : "fault",
            desc  : "서비스가 준비되지 않았습니다.",
            solve : "잠시 후 다시 시도해 주시기 바랍니다."
        },

        e5533 : {
            isuse : true,
            errno : -5533,
            errid : "NXWAS_FAULT_DB_CLONE_MANAGER_PROBLEM",
            task  : "NXWAS",
            level : "fault",
            desc  : "서비스가 준비되지 않았습니다.",
            solve : "NXWAS(DBMASTER) 로그 확인이 필요합니다."
        },

        e5541 : {
            isuse : true,
            errno : -5541,
            errid : "NXWAS_WARN_EXECUTING_SQL_PROBLEM",
            task  : "NXWAS",
            level : "warn",
            desc  : "DB의 SQL 실행 중 문제가 발생하였습니다.",
            solve : "NXWAS(DBREPLICA) 로그 확인이 필요합니다."
        },

        e5542 : {
            isuse : true,
            errno : -5542,
            errid : "NXWAS_WARN_VIRTUAL_TABLES_UPDATE_PROBLEM",
            task  : "NXWAS",
            level : "warn",
            desc  : "DB의 가상 테이블 업데이트 중 문제가 발생하였습니다.",
            solve : "NXWAS(DBREPLICA) 로그 확인이 필요합니다."
        },

        e5548 : {
            isuse : true,
            errno : -5548,
            errid : "NXWAS_FAULT_NOT_FIND_NXRIO-HTTP",
            task  : "NXWAS",
            level : "fault",
            desc  : "NXRIO-HTTP를 찾을 수 없습니다.",
            solve : "NXWAS(LOADBALANCE) 로그 확인이 필요합니다."
        },
   };

   return error;
} //end of function
);
