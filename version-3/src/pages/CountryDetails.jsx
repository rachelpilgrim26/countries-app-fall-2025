import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const [views, setViews] = useState(0);

export default function CountryDetails({ countries }) {
  const { countryName } = useParams();
  // look through the "countries" array and return one matching country object
  const country = countries.find(
    // for each item in the array call it "countryItem" so its very clear what it is
    (countryItem) =>
      // check if this countrys "common" name is exactly the same as "countryName"
      countryItem.name.common === countryName
    // if a match is found .find() stops and returns that object if no match it returns undefined
  );

  // made an async function named CountryCount so we can use await inside it
  const getCountryCount = async () => {
    // send a network request to the server using fetch()
    const response = await fetch(
      // the exact API endpoint that updates the view count for one country
      "https://backend-answer-keys.onrender.com/update-one-country-count",
      {
        // tell the server were making a POST request we are sending data
        method: "POST",
        // tell the server the body we send is JSON text
        headers: { "Content-Type": "application/json" },
        // turn our js object into a json string and include the country name
        body: JSON.stringify({ country_name: country.name.common }),
      }
    );
    // read the servers reply body as JSON turns the text back into a JavaScript object
    const data = await response.json();
    // save the new count from the server into React state so the UI updates
    setViews(data.count);
  };

  // made a function named handleSave that can use await indide
  async function handleSave() {
    // send a request to your backend to save one country
    // base URL host for your API endpoint path being called
    await fetch("https://backend-answer-keys.onrender.com/save-one-country", {
      // Use POST because were sending data to change something on the server
      method: "POST",
      // tell the server our request body is json text
      headers: { "Content-Type": "application/json" },
      // turn our object into a json string before sending it over the network
      body: JSON.stringify({ country_name: country.name.common }),
    });
  }

  // run some code after react renders and again whenever country changes
  useEffect(() => {
    // only do the work if we actually have a matching country object
    if (country) {
      // call the function that posts to the API and updates the views count
      getCountryCount();
    }
    // putting country in the dependency list means
    //  run once after the first render
    //  run again any time country becomes a different value
  }, [country]); // dependency array tells react when to re run this effect

  if (!country) return <div className="detail">Not found</div>;

  return (
    <div className="detail">
      <Link to="/">← Back</Link>
      <img
        className="flag"
        src={country.flags.svg || country.flags.png}
        alt={`${country.name.common} flag`}
      />
      <h1>{country.name.common}</h1>
      <p>Population: {Number(country.population).toLocaleString("en-US")}</p>
      <p> Capital: {country.capital} </p>
      <p>Region: {country.region}</p>
      <p>Views: {views}</p>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
