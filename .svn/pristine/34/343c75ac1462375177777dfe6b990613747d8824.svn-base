'use strict';

define([],
    function() {

        // var nowtime = new Date();

        // var  pad = function(n,width) {
        //     if ( n < 10) {
        //         n = n + '';
        //        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        //     } else {
        //       return n;
        //     }
        //   };
        
        // var varToday = function () {

        //     return   nowtime.getFullYear() 
        //     + pad(nowtime.getMonth()+1,2 )
        //     + pad(nowtime.getDate(),2) ; 
        // }

        var define ={

            CONTENTS : {
                INTER_CALL : {
                    select :  "SELECT a.EVENT_STARTTIME,a.CALL_KIND,IFNULL(a.EMPLOYEEGRP_ID,0) , IFNULL(a.EMPLOYEEPART_ID,0), a.EMPLOYEE_ID  , IFNULL(a.QUEUE_ID,'0') ",
                    from : "FROM  OT_CALLSTAT a" ,
                    where : "",
                    groupby : "",
                    orderby : "",
                    getQuery :function () {
                        return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    }

                },

                CUSTMER_HIS : {
                    select : "SELECT EVENT_STARTTIME , CALL_KIND ,CALL_TYPE , QUEUE_ID  " ,
                    // "OT_CALLSTAT WHERE ANI =' " ,
                    // + ohterParty + "'"
                    // + "AND EVENT_STARTTIME like '"
                    // + nowtime.getFullYear
                    // + nowtime.getMonth 
                    // + nowtime.getDay
                    // + "%'";  
                    from : "FROM OT_CALLSTAT  " ,
                    where : " where EVENT_STARTTIME like '2018012913%'",
                    groupby : "",
                    orderby : "",
                    getQuery :function () {
                        return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    }
                                        

                },

                INTER_KMS : {
                 
                    // SELECT: " SELECT b.MAJOR_NAME , c.SUB_NAME ,a.KMS_TITLE ,a.KMS_CONTENTS ",
                    SELECT: " SELECT b.MAJOR_NAME , c.SUB_NAME ,a.KMS_TITLE  ",
                    FROM  : " FROM ma_kms a ,ma_kms_major b , ma_kms_sub c " ,
                    WHERE : " WHERE a.KMS_MAJOR_ID = b.MAJOR_ID" 
                            +" AND b.MAJOR_ID = c.MAJOR_ID "
                            + "AND a.KMS_MAJOR_ID = c.MAJOR_ID " 
                            +" AND a.KMS_SUB_ID = c.SUB_ID ",
                                      
                    getQuery :function () {
                        return this.SELECT+ this.FROM + this.WHERE  ;
                    }


                },

                INTER_KMS_SEARCH : {
                    // SELECT : "SELECT a.KMS_TITLE ,a.KMS_CONTENTS ",
                    // FROM  : "FROM ma_kms a ",
                    // WHERE : " WHERE a.KMS_TITLE LIKE '%{0}%' OR  a.KMS_CONTENTS LIKE '%{0}%'  ",

                    // SELECT: " SELECT b.MAJOR_NAME , c.SUB_NAME ,a.KMS_TITLE ,a.KMS_CONTENTS ",
                    SELECT: " SELECT b.MAJOR_NAME , c.SUB_NAME ,a.KMS_TITLE  ",
                    FROM  : " FROM ma_kms a ,ma_kms_major b , ma_kms_sub c " ,
                    WHERE : " WHERE a.KMS_MAJOR_ID = b.MAJOR_ID" 
                            +" AND b.MAJOR_ID = c.MAJOR_ID "
                            + "AND a.KMS_MAJOR_ID = c.MAJOR_ID " 
                            +" AND a.KMS_SUB_ID = c.SUB_ID "
                            +" AND ( a.KMS_TITLE LIKE '%{0}%' OR  a.KMS_CONTENTS LIKE '%{0}%' ) ",

                    getQuery :function () {
                        return this.SELECT+ this.FROM + this.WHERE  ;
                    }
                },

                

                INTER_HOME :{
                    SELECT :" SELECT a.CALL_KIND ,a.SKILL_NAME , IFNULL(SUM(a.ANSWER_COUNT),0) answer_count, IFNULL(SUM(a.ABANDON_COUNT),0) abandon_count  ",
                    FROM : " FROM VIEW_RE_EMPQSKILL_D a" ,
                    WHERE : " WHERE a.CALL_TYPE = 11 AND a.END_DATE IN ('TODAY') AND a.EMPLOYEE_ID IN ('USER_ID') ",
                    GROUPBY : " GROUP BY a.CALL_KIND ,a.SKILL_NAME " ,
                    ORDERBY : " ORDER BY a.CALL_KIND ,a.SKILL_NAME " ,

                    getQuery :function () {
                        return this.SELECT+ this.FROM + this.WHERE + this.GROUPBY + this.ORDERBY ;
                    }

                    /*
                    SELECT : "SELECT  a.QUEUE_NAME  ,IFNULL(SUM(a.QCALL_COUNT),0) qcall_count,IFNULL(SUM(a.ABANDONQCALL_COUNT),0) abandonqcall_count ,IFNULL(SUM(a.DIRECTCALL_COUNT),0)  directcall_count" ,
                    FROM : " FROM VIEW_RE_EMPQIB_D a " ,
                    GROUPBY : "GROUP BY a.QUEUE_NAME  " ,
                    ORDERBY : "ORDER BY a.QUEUE_NAME " ,
                    WHERE : " WHERE  a.END_DATE BETWEEN '20171025' AND '20171226'",
                    getQuery :function () {
                        return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    },
                    endQuery: function () {
                        return this.GROUPBY + this.ORDERBY ;
                    }
                    */

                },

                INTER_HIS : {
                    SELECT : " SELECT CUBE_CALL_KIND,CUSTOMER_IDX , category1 , category2, category3 ,START_TIME ,AGENT_ID,CUBE_CALL_KIND",
                    FROM : " FROM counseling_data",
                    WHERE: " WHERE START_TIME like 'TODAY%' ",

                    getQuery :function () {
                        return this.SELECT+ this.FROM + this.WHERE  ;
                    }

                },

                

                CALLBACK : {
                    // SELECT : "SELECT b.CUSTOMER_NAME , b.MOBILE_PHONE_NO , b.RESERVATION_TIME ",
                    // FROM :" FROM MA_CAMPAIGN a, CAMPAIGN_LIST b " ,
                    // WHERE : " WHERE a.CAMP_CODE = b.CAMP_CODE AND a.CAMP_TYPE ='B' "


                    // jesse
                    SELECT :" SELECT a.NAME , a.PHONE, b.REG_DATE",
                    FROM : " FROM ccc_campaign_list a , ccc_campaign b",
                    WHERE : " WHERE a.CCC_CODE = b.CCC_CODE AND b.CCC_TYPE = 'B' AND CHARGER ='USER_ID'",



                    getQuery :function () {
                        return this.SELECT+ this.FROM + this.WHERE;
                    }

                },

                CHATLIST : {
                    SELECT : "SELECT ANI,EVENT_STARTTIME   ",
                    FROM :" FROM OT_CALLSTAT   WHERE  CALL_KIND = 16 AND CALL_TYPE = 11 AND  employee_dn = '1011'"
                         +" AND  EVENT_STARTTIME like '20180201%'"
                    
                    // WHERE : " WHERE  CALL_KIND = 16 AND CALL_TYPE = 11 AND  employee_dn = '1011'"
                    // +" AND  EVENT_STARTTIME like '20180201%'",
                },
                MAILLIST : {
                    SELECT : "SELECT ANI,EVENT_STARTTIME   ",
                    FROM :" FROM OT_CALLSTAT   WHERE  CALL_KIND = 16 AND CALL_TYPE = 11 AND  employee_dn = '1011'"
                            +" AND  EVENT_STARTTIME like '20180201%'"

                },



               

                REPORT_QUEUE :{
                    SELECT : "SELECT a.EMPLOYEE_ID, a.employeegrp_id,IFNULL(SUM(a.IBCALL_COUNT),0) ibcall_count,IFNULL(SUM(a.OBCALL_COUNT),0) obcall_count,IFNULL(SUM(a.GRPTR_COUNT),0) grptr_count FROM RE_EMPLOYEECALL_H a GROUP BY a.EMPLOYEE_ID, a.employeegrp_id ORDER BY a.EMPLOYEE_ID, a.employeegrp_id"
                },
                
                QUEUESTATL : {
                    select : "SELECT a.QUEUE_ID , a.QUEUE_NAME, "  + 
                                " a.CALL_KIND , " +
                                "  IFNULL(SUM(a.ENTER_COUNT),0) enter_count ,IFNULL(SUM(a.ORGENTER_COUNT),0) orgenter_count, "  +
                                "  IFNULL(SUM(a.DISTRIBUTE_COUNT),0) distribute_count ,IFNULL(SUM(a.ABANDON_COUNT),0) abandon_count, "  +
                                "  IFNULL(SUM(a.NONSERVICE_COUNT),0) nonservice_count ,IFNULL(SUM(a.OUTDISTRIBUTE_COUNT),0) outdistribute_count, "  +
                                "  IFNULL(SUM(a.FAIL_COUNT),0) fail_count ,IFNULL(SUM(a.CALLBACK_COUNT),0) callback_count ",
                            
                    from : " FROM VIEW_RE_QUEUESTATL_H a " ,
                    where : "",
                    groupby :" GROUP BY " +
                            " a.QUEUE_ID , a.QUEUE_NAME, a.CALL_KIND " ,
                    orderby : "ORDER BY " + 
                            " a.QUEUE_ID , a.QUEUE_NAME, a.CALL_KIND " ,    
                    getQuery :function () {
                                return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    }
            

                },
   

                EMPLOYEECALL :{
                    select : "SELECT a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                            " a.EMPLOYEEPART_ID,a.EMPLOYEEPART_NAME, a.EMPLOYEE_ID ,a.EMPLOYEE_NAME, " +
                            " a.CALL_KIND , " +
                            "  IFNULL(SUM(a.IBCALL_COUNT),0) ibcall_count ,IFNULL(SUM(a.IBCALL_TIME),0) ibcall_time, "  +
                            "  IFNULL(SUM(a.OBCALL_COUNT),0) obcall_count ,IFNULL(SUM(a.OBCALL_TIME),0) obcall_time, "  +
                            "  IFNULL(SUM(a.ITCALL_SCOUNT),0) itcall_scount ,IFNULL(SUM(a.ITCALL_STIME),0) itcall_stime, "  +
                            "  IFNULL(SUM(a.ITCALL_RCOUNT),0) itcall_rcount ,IFNULL(SUM(a.ITCALL_RTIME),0) itcall_rtime, "  +
                            "  IFNULL(SUM(a.CSCALL_SCOUNT),0) cscall_scount ,IFNULL(SUM(a.CSCALL_STIME),0) cscall_stime, "  +
                            "  IFNULL(SUM(a.CSCALL_RCOUNT),0) cscall_rcount ,IFNULL(SUM(a.CSCALL_RTIME),0) cscall_rtime, "  +
                            "  IFNULL(SUM(a.TRCALL_SCOUNT),0) trcall_scount ,IFNULL(SUM(a.TRCALL_STIME),0) trcall_stime, "  +
                            "  IFNULL(SUM(a.TRCALL_RCOUNT),0) trcall_rcount ,IFNULL(SUM(a.TRCALL_RTIME),0) trcall_rtime, "  +
                            "  IFNULL(SUM(a.CFCALL_SCOUNT),0) cfcall_scount ,IFNULL(SUM(a.CFCALL_STIME),0) cfcall_stime, "  +
                            "  IFNULL(SUM(a.CFCALL_RCOUNT),0) cfcall_rcount ,IFNULL(SUM(a.CFCALL_RTIME),0) cfcall_rtime " ,
                    
                    from : " FROM VIEW_RE_EMPLOYEECALL_H a " ,
                    where : "",
                    groupby :" GROUP BY " +
                            " a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                            " a.EMPLOYEEPART_ID,a.EMPLOYEEPART_NAME, a.EMPLOYEE_ID ,a.EMPLOYEE_NAME, " +
                            " a.CALL_KIND ",
                    orderby : "ORDER BY " + 
                            " a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                            " a.EMPLOYEEPART_ID,a.EMPLOYEEPART_NAME, a.EMPLOYEE_ID ,a.EMPLOYEE_NAME, " +
                            " a.CALL_KIND ",

                    getQuery :function () {
                        return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    }


                },


                DNCALL :{
                    select : "SELECT a.DN , a.CALL_KIND, "  +
                            "  IFNULL(SUM(a.IBCALL_COUNT),0) ibcall_count ,IFNULL(SUM(a.IBCALL_TIME),0) ibcall_time, "  +
                            "  IFNULL(SUM(a.OBCALL_COUNT),0) obcall_count ,IFNULL(SUM(a.OBCALL_TIME),0) obcall_time, "  +
                            "  IFNULL(SUM(a.ITCALL_SCOUNT),0) itcall_scount ,IFNULL(SUM(a.ITCALL_STIME),0) itcall_stime, "  +
                            "  IFNULL(SUM(a.ITCALL_RCOUNT),0) itcall_rcount ,IFNULL(SUM(a.ITCALL_RTIME),0) itcall_rtime, "  +
                            "  IFNULL(SUM(a.CSCALL_SCOUNT),0) cscall_scount ,IFNULL(SUM(a.CSCALL_STIME),0) cscall_stime, "  +
                            "  IFNULL(SUM(a.CSCALL_RCOUNT),0) cscall_rcount ,IFNULL(SUM(a.CSCALL_RTIME),0) cscall_rtime, "  +
                            "  IFNULL(SUM(a.TRCALL_SCOUNT),0) trcall_scount ,IFNULL(SUM(a.TRCALL_STIME),0) trcall_stime, "  +
                            "  IFNULL(SUM(a.TRCALL_RCOUNT),0) trcall_rcount ,IFNULL(SUM(a.TRCALL_RTIME),0) trcall_rtime, "  +
                            "  IFNULL(SUM(a.CFCALL_SCOUNT),0) cfcall_scount ,IFNULL(SUM(a.CFCALL_STIME),0) cfcall_stime, "  +
                            "  IFNULL(SUM(a.CFCALL_RCOUNT),0) cfcall_rcount ,IFNULL(SUM(a.CFCALL_RTIME),0) cfcall_rtime " ,

                    from : " FROM VIEW_RE_DNCALL_H a " ,
                    where : "",
                    groupby :" GROUP BY " +
                            " a.DN , a.CALL_KIND " ,
                    orderby : "ORDER BY " + 
                            " a.DN , a.CALL_KIND " ,    
                    getQuery :function () {
                                return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    }
                },

                EMPLOYEESTATE : {
                    select : "SELECT a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                            "a.EMPLOYEEPART_ID,a.EMPLOYEEPART_NAME, a.EMPLOYEE_ID ,a.EMPLOYEE_NAME, " +
                            "a.CALL_KIND , " +
                            " IFNULL(SUM(a.READY_COUNT),0) ready_count ,IFNULL(SUM(a.READY_TIME),0) ready_time, "  +
                            " IFNULL(SUM(a.BUSY_COUNT),0) busy_count ,IFNULL(SUM(a.BUSY_TIME),0) busy_time, "  +
                            " IFNULL(SUM(a.ACW_COUNT),0) acw_count ,IFNULL(SUM(a.ACW_TIME),0) acw_time, "  +
                            " IFNULL(SUM(a.NRD_COUNT),0) nrd_count ,IFNULL(SUM(a.NRD_TIME),0) nrd_time" , 
                    from : " FROM VIEW_RE_EMPLOYEESTATE_H a " ,
                    where : "",
                    groupby :" GROUP BY " +
                            " a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                            " a.EMPLOYEEPART_ID,a.EMPLOYEEPART_NAME, a.EMPLOYEE_ID ,a.EMPLOYEE_NAME, " +
                            " a.CALL_KIND ",
                    orderby : "ORDER BY " + 
                            " a.EMPLOYEEGRP_ID, a.EMPLOYEEGRP_NAME, " +
                            " a.EMPLOYEEPART_ID,a.EMPLOYEEPART_NAME, a.EMPLOYEE_ID ,a.EMPLOYEE_NAME, " +
                            " a.CALL_KIND ",

                    getQuery :function () {
                        return this.select+ this.from + this.where + this.groupby + this.orderby ;
                    }
                }


            }

        }; //end of define

        return define;
    }
);