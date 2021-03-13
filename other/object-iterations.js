const log = console.log;


// const createObject = function(n) {
//   let obj = {};
//   for (let i=0; i<n; i++) {
//     obj[`item${i}`] = i;
//   }
//   
//   return obj;
// }


let debug = false;
const N = Number.MAX_VALUE; //1000000;


/**
 * For in
 *
 */

const forIn = function(obj) {
//   let obj = createObject(N);
  
  log("\n");

  console.time('for..in');
  let sum = 0;
  for (let prop in obj) {
    sum += obj[prop];
  }
  console.timeEnd('for..in');

  log(sum);
  
  // debug object
  if (debug) log(obj)
}


/**
 * Iterator
 *
 */

// const iterator = function(obj) {
// //   let obj = createObject(N);
//   let ite = function()
//   
//   log("\n");
// 
//   console.time('for..in');
//   let sum = 0;
//   for (let prop in obj) {
//     sum += obj[prop];
//   }
//   console.timeEnd('for..in');
// 
//   log(sum);
//   
//   // debug object
//   if (debug) log(obj)
// }



/**
 * Create Sum Fun iterator
 *
 */

// create a custom test "type property set"
var testTypeProperties = [];
// for (var i = 0; i <= N; i++) {
//   testTypeProperties.push('item' + i);  // non-numeric properties to be on the safe side
// };
var createTestObject = function() {
  var objString = '({'
  for (var i = 0; i < testTypeProperties.length; ++i) {
      objString += testTypeProperties[i] + ': ' + (i+1) + ',\n';
  }
  objString += '});';

  return eval(objString);
};
var o1 = createTestObject();
var compileSumIterator = function(typeProperties) {
  // pre-compile constant iteration over object properties
  var iteratorFunStr = 'let func = (function(obj, cb) {\n var x = 0;\n';
  for (var i = 0; i < typeProperties.length; ++i) {
      iteratorFunStr += 'x += (obj.' + typeProperties[i] + ');\n';
  };
  
  iteratorFunStr += 'return x;});\n'

  iteratorFunStr += 'console.time("iterator sum");\n';
  iteratorFunStr += 'let res = func(o1);\n';
  iteratorFunStr += 'console.timeEnd("iterator sum");\n';

  iteratorFunStr += 'log(res);\n';
//     iteratorFunStr += 'log("\n");\n';
  
  // debug object
  iteratorFunStr += 'if (debug) log(o1)\n'


  // actually compile and return the function
  return eval(iteratorFunStr);
};


// Run Tests
log("\n")
log("---------------------- Starting tests ----------------------")

// debug = true
forIn(o1)
   log("\n")
compileSumIterator(testTypeProperties)

  log("\n")
log("----------------------   Tests ended   ----------------------")
  log("\n")
