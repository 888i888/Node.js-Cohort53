/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const fetch = require("node-fetch");

async function makeReservation() {
  const url = "https://reservation100-sandbox.mxapps.io/rest/reservations";

  const reservationData = {
    name: "Igor",
    numberOfPeople: 3,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    const data = await response.json();
    console.log("Reservation Response:", data);
  } catch (error) {
    console.error("Error making reservation:", error.message);
  }
}

makeReservation();
