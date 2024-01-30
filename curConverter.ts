#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
async function welcome() {
  let title = chalkAnimation.pulse(
    "~Develp by Sheikh Hamid\nStart Your Currency Converter"
  );
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  title.stop();
}
await welcome();

let convertion = {
  PKR: {
    USD: 0.0036,
    GBP: 0.0028,
    PKR: 1,
  },
  GBP: {
    USD: 1.27,
    PKR: 354.9,
    GBP: 1,
  },
  USD: {
    PKR: 279.5,
    GBP: 0.79,
    USD: 1,
  },
};
async function currencyConverter() {
  const answers: {
    from: "PKR" | "GBP" | "USD";
    to: "PKR" | "GBP" | "USD";
    amount: number;
  } = await inquirer.prompt([
    {
      type: "list",
      name: "from",
      choices: ["PKR", "USD", "GBP"],
      message: "Select your Currency",
    },
    {
      type: "list",
      name: "to",
      choices: ["PKR", "USD", "GBP"],
      message: "Select Your Convertion Currency",
    },
    {
      type: "number",
      name: "amount",
      message: "Enter Your Convertion Amount",
    },
  ]);
  const { from, to, amount } = answers;

  if (from && to && amount) {
    let result = convertion[from][to] * amount;
    console.log(chalk.green.bold.italic.underline(`Your convertion from ${from} to ${to} is = ${result}`));
  } else {
    console.log(chalk.redBright.underline("invalid inputs"));
  }
}
async function startAgain() {
  do {
    await currencyConverter();
    var again = await inquirer.prompt({
      type: "input",
      name: "restart",
      message: "do you want to continue convertion? Press (y/n)",
    });
  } while (
    again.restart === "y" ||
    again.restart === "Y" ||
    again.restart === "yes" ||
    again.restart === "YES"
  );
}
startAgain()