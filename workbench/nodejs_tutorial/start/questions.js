// process.stdin; //standard input
// process.stdout.write("Hellow"); //standard output
// console.log("Honest")

const questions = [
  "What is your name?",
  "What wouldl you rather be doing?",
  "What is your preferred programming language?"
]

const ask = (i=0) => {
  process.stdout.write(`\n\\n ${questions[i]}`);
  process.stdout.write( ` > `);
}

ask();