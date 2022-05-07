// process.stdin; //standard input
// process.stdout.write("Hellow"); //standard output
// console.log("Honest")

const questions = [
  "What is your name?",
  "What wouldl you rather be doing?",
  "What is your preferred programming language?"
]

const ask = (i=0) => {
  process.stdout.write(`\n\n${questions[i]}`);
  process.stdout.write( ` > `);
}

ask();

const answers = [];
process.stdin.on('data',data => { //data event, you've typed something into the keyboard and pressed enter
  answers.push(data.toString().trim())

  if (answers.length < questions.length) {
    ask(answers.length); //i only equals 0 if no parameter is given when function is called
  }
  else {
    process.exit();//ends coded
  }

  process.on('exit',() => { //listens for when exit is called
    const [name, activity, lang] = answers;
    console.log(`Thank you for your answers. \nGo ${activity}, ${name}. You can learn ${lang} later!!\n\n`)
  })
}) 