// console.log(process.pid, "L1") //get the process ID
// console.log(process.versions.node, "L2") //verson of Node being used
// console.log(process.argv, "L3") //ARGument Variables sent to the process when we run it, if you add stuff in the command line after  "node [filename]", it gets added to the array

// const [,,fname,lname] = process.argv;
// console.log(`Your name is ${fname} ${lname}`)

const grab = flag => { //flag is argument of grab function
  let indexAfterflag = process.argv.indexOf(flag) + 1; //indexOf(flag) looks for --[flag] in command line promt and returns index number
  return process.argv[indexAfterflag];
}

const greeting = grab("--greeting"); //greeting flag, command line version of a varialbe I guess
const user = grab("--user") //user flag

console.log(`${greeting}, ${user}`);