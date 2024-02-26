// Example
// Before: const fs = require('fs');
// After: import fs from 'fs';

// const readline = require("readline");
// eslint-disable-next-line import/no-import-module-exports
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let number = 0;

export function incrementNumberByUserInput() {
  rl.question("Enter a number to increment by: ", (input) => {
    const increment = parseInt(input);
    if (!isNaN(increment)) {
      number += increment;
      console.log(`Number incremented to: ${number}`);
    } else {
      console.log("Please enter a valid number.");
    }
    incrementNumberByUserInput();
  });
}
incrementNumberByUserInput();

export default incrementNumberByUserInput;
