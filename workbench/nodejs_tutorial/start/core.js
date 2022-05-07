const path = require('path'); //core modules such as path came when nodejs was installed.
const util = require('util');

util.log(path.basename(__filename));
util.log(" ^ The name of the current file");

// const dirUploads = path.join(__dirname,"www","files","uploads");
// console.log(__dirname)
// console.log(dirUploads);