const path = require('path'); //core modules such as path came when nodejs was installed.
const {log} = require('util'); //getting specific function from the util library
// const v8 = require('v8');
const {getHeapStatistics} = require('v8') //getting specific function from the v8 library rather than the whole library

// const dirUploads = path.join(__dirname,"www","files","uploads"); creates a file patheach arguement is a step deeper down the path
// console.log(__dirname)
// console.log(dirUploads);

// util.log(path.basename(__filename));
// util.log(" ^ The name of the current file");

log(getHeapStatistics());