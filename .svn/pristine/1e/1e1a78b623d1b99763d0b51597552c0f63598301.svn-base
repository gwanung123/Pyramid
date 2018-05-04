'use strict';

define([],
    function() {

        var define ={

            CONTENTS : {
                
                MANAGEMENT : {
                    
                    select : "SELECT  a.REG_DATE, "  + 
                    // select : "SELECT a.ADOPT_YN , a.REG_DATE, "  +     
                            " a.KMS_TITLE, a.REG_EMPLOYEE," +    
                            " b.RATE_COUNT, b.HITS_COUNT" ,    
                            
                    from : " FROM MA_KMS a,  RE_KMS b " ,
                    where : " WHERE  a.KMS_ID = b.KMS_ID ",
                    // groupby :" GROUP BY " +
                    //         " a.QUEUE_ID , a.QUEUE_NAME, a.CALL_KIND " ,
                    // orderby : "ORDER BY " + 
                    //         " a.QUEUE_ID , a.QUEUE_NAME, a.CALL_KIND " ,    
                    getQuery :function () {
                                return this.select+ this.from + this.where  ;
                    }

                    // endQuery: function () {
                    //     return this.groupby + this.orderby ;
                    // }
            

                },

                STAT :{
                    select : "SELECT  a.REG_DATE, "  + 
                             " 'Group','Part' ,   "  + 
                            " a.REG_EMPLOYEE," +    
                            " b.RATE_COUNT, b.HITS_COUNT" ,    
                            
                    from : " FROM MA_KMS a,  RE_KMS b " ,
                    where : " WHERE  a.KMS_ID = b.KMS_ID ",
                    // groupby :" GROUP BY " +
                    //         " a.QUEUE_ID , a.QUEUE_NAME, a.CALL_KIND " ,
                    // orderby : "ORDER BY " + 
                    //         " a.QUEUE_ID , a.QUEUE_NAME, a.CALL_KIND " ,    
                    getQuery :function () {
                                return this.select+ this.from + this.where  ;
                    }

                }
               

                

            }

        }; //end of define

        return define;
    }
);