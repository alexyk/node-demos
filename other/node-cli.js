// main demo
console.log('-- SIMPLE --')
const chalk = require("chalk")
const boxen = require("boxen")

let greeting = chalk.white.bold("Hello!")

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
}
const msgBox = boxen( greeting, boxenOptions )

console.log(msgBox)

console.log(`\n--- SIMPLE END ---\n\n`)


// args
console.log(`--- ARGS ---`)
const yargs = require("yargs")

let options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv

greeting = `Hello, ${options.name}!`
console.log(greeting)
console.log(`\n--- ARGS END ---\n\n`)


// axios with args
console.log(`--- AXIOS ---`)
const axios = require("axios")

options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv

greeting = `Hello, ${options.name}!`
console.log(greeting)

console.log("Here's a random joke for you:")

const url = "https://icanhazdadjoke.com/"

axios
  .get(url, { headers: { Accept: "application/json" } })
  .then(res => {
    console.log(res.data.joke)
    console.log(`\n--- AXIOS END ---\n\n`)
  })
  .catch(err => {
    console.error('Axios error -', err)
    console.log(`\n--- AXIOS END ---\n\n`)
  })