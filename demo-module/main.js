const test = require('./test.js');
// import test from './test.js'


console.log('main:' + test.count);
console.log('main:obj' + JSON.stringify(test));
test.inc();
console.log('main:' + test.count);
console.log('main:obj' + JSON.stringify(test));











