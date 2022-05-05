// console.log(__dirname); //shows the full path to the directory/folder that we are using
console.log(__filename); //shows the full path to the file that we are using

const path = require("path"); //ships Node.js and gives us tools that we can use to help us work with path strings
console.log(path)
console.log(`The file name is ${path.basename(__filename)}`); //see the exact file you are currently using, plucks file name from the filename path