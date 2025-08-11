/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */

const fetch = require("node-fetch");

async function printChuckNorrisJoke() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();

    console.log("Full API Response:", data);
    console.log("Joke:", data.value);
  } catch (error) {
    console.error("Error fetching Chuck Norris joke:", error.message);
  }
}

printChuckNorrisJoke();
