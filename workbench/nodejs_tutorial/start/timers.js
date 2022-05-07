const waitTime = 5000;
const waitInterval = 500;
let currentTime = 0;


const incTime = () => {
  currentTime += waitInterval;
  const percentage = Math.floor((currentTime/waitTime) * 100);
  // console.log(`waiting ${currentTime / 1000} seconds`);
  process.stdout.clearLine(); //clears last line of the terminal
  process.stdout.cursorTo(0); //moves cursor to start of the line because of 0 index, other wise text will continue as if previous output was invisible
  process.stdout.write(`waiting... ${percentage}%`)
}
console.log(`Setting a ${waitTime} second delay`);

const timerFinished = () => {
  clearInterval(interval)
  process.stdout.clearLine(); //clears line, other wise, text will be written over last output
  process.stdout.cursorTo(0);
  console.log('done') //
};


const interval = setInterval(incTime, waitInterval); //whenever we set an interval,it will return the interval 
setTimeout(timerFinished,waitTime); //(function, time)

