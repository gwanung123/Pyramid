'use strict';

define([],
   function() {

      /************************************************************
       * name        : report.calc
       * url         : Library/report.calc.js
       * description : string 연산을 위한 API(+,-,*,/,괄호)
       ************************************************************/

      var nxCalc = function() {
         return this;
      };

      /************************************************************
       * nxCalc prototype
       ************************************************************/
      var ptt = nxCalc.prototype;

      // +
      ptt.doSum = function( op1, op2 ) {
         op1 = $.trim(op1);
         op2 = $.trim(op2);
         return parseFloat(op1) + parseFloat(op2);
      };

      // -
      ptt.doSub = function( op1, op2 ) {
         op1 = $.trim(op1);
         op2 = $.trim(op2);
         return parseFloat(op1) - parseFloat(op2);
      };

      // *
      ptt.doMulti = function( op1, op2 ) {
         op1 = $.trim(op1);
         op2 = $.trim(op2);
         return parseFloat(op1) * parseFloat(op2);
      };

      // /
      ptt.doDiv = function( op1, op2 ) {
         op1 = $.trim(op1);
         op2 = $.trim(op2);
         if ( op2 === "0" ) return 0;
         return parseFloat(op1) / parseFloat(op2);
      };

      ptt.doCalcLoop = function( arrData, arrResult, index, wrap ) {
         var self = this;
         var operation = null;

         for ( var i=index; i<arrData.length; i++ ) {
            var val = arrData[i];

            switch ( val ) {
               case "(":
                  if ( operation !== null ) wrap.push(operation);
                  wrap.push(val);
                  self.doCalcLoop(arrData, arrResult, i+1, wrap);
                  return;

               case ")":
                  do {
                     var num = wrap.pop(),
                         sym = wrap.pop(); // ( or operation

                     if ( typeof(sym) === "function" ) {
                        wrap.push(sym(wrap.pop(), num));
                     }
                     else {
                        if ( wrap.length === 0 ) arrResult.push(num);
                        else wrap.push(num);
                        break;
                     }
                  } while(1);
                  break;

               case "+":
                  if ( wrap.length === 0 ) arrResult.push(val);
                  else operation = self.doSum;
                  break;

               case "-":
                  if ( wrap.length === 0 ) arrResult.push(val);
                  else operation = self.doSub;
                  break;

               case "*":
                  if ( wrap.length === 0 ) arrResult.push(val);
                  else operation = self.doMulti;
                  break;

               case "/":
                  if ( wrap.length === 0 ) arrResult.push(val);
                  else operation = self.doDiv;
                  break;

               default:
                  if ( wrap.length === 0 ) arrResult.push(val);
                  else {
                     if ( operation === null ) wrap.push(val);
                     else {
                        wrap.push(operation(wrap.pop(), val));
                        operation = null;
                     }
                  }
            }
         }
      };

      ptt.doCalcuration = function( arrData ) {
         var self = this;
         var result = 0,
             operation = null;

         for ( var i=0; i<arrData.length; i++ ) {
            var val = arrData[i];

            switch ( val ) {
               case "+":
                  operation = self.doSum;
                  break;

               case "-":
                  operation = self.doSub;
                  break;

               case "*":
                  operation = self.doMulti;
                  break;

               case "/":
                  operation = self.doDiv;
                  break;

               default:
                  if ( i === 0 ) result = val;
                  else result = operation(result, val);
            }
         }

         return result;
      };

      ptt.doCalc = function( str ) {
         var self = this;
         var regex = /[0-9]+|[+|\-|\/|*|(|)]/g,
             arrStr = str.match(regex);
         var wrap = [],
             wrapResult = [],
             result = 0;

         self.doCalcLoop(arrStr, wrapResult, 0, wrap);
         result = self.doCalcuration(wrapResult);

         return result;
      };


      /************************************************************
       *
       ************************************************************/

      return function( str ) {
         var _calc = new nxCalc();
         return _calc.doCalc(str);
      };
   }
);


