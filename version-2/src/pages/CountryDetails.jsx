// import react so we can write a component and use hooks
import React, { useEffect, useState } from "react";
// import hooks from react router to read url parts and make a back link
import { useParams, Link } from "react-router-dom";

// export a component that shows details for one country
// prop countries array of country objects
export default function CountryDetails({ countries }) {
  // read the :countryName piece from the url like /country/France
  const { countryName } = useParams();
  // I used find not filte because you want one item not a list filter would return an array of all matches
  const country = countries.find(
    (countryItem) => countryItem.name.common === countryName
  );
  // make a little state number to show how many times this page was viewed
  const [views, setViews] = useState(0);
  // when the country changes or the page loads, update the view counter
  useEffect(() => {
    // if there is no matching country do nothing
    if (!country) return;

    // fetches a string or null parse means turn it to json || gives it an empty ogbject
    let counts = JSON.parse(localStorage.getItem("viewCounts")) || {};

    // get the unique id this will be the key in counts
    // variable countryId string
    const countryId = country.name.common;

    // increase the number for this country by 1 start at 0 if missing
    counts[countryId] = (counts[countryId] || 0) + 1;

    // save the updated counts object back into localStorage turns into a string for storage
    localStorage.setItem("viewCounts", JSON.stringify(counts));

    // update our views so the screen shows the new number
    setViews(counts[countryId]);
  }, [country]); // dependency array for the effect
  // run again if the country changes

  // when the user clicks save store this country in localStorage if not already there
  function handleSave() {
    // Read the savedCountries array from localStorage parse it or use an empty array if nothing is saved yet
    // bascilly destringfy and parse doing two steps in one concatenation
    let saved = JSON.parse(localStorage.getItem("savedCountries")) || [];

    // check if this exact country is already in saved by comparing the same name.common returns the object or undefined
    const already = saved.find(
      (savedItem) => savedItem.name.common === country.name.common
    );

    // this conditional only add if not saved add it and write the new array back to storage
    if (!already) {
      saved.push(country);
      localStorage.setItem("savedCountries", JSON.stringify(saved));
    }
  }

  // conditional render if the URL dont match any country show a simple message instead of the full details
  if (!country) return <div className="detail">Not found</div>;

  // show the details for this one country
  return (
    // outside wrapper with detail styles in css
    <div className="detail">
      {/* link to go back to the home page without full page load  */}
      <Link to="/">← Back</Link>

      {/*  flag image for the country use svg first then png if missing) */}
      <img
        className="flag"
        src={country.flags.svg || country.flags.png}
        // template litarl to country name
        alt={`${country.name.common} flag`}
      />

      {/* country name as a heading */}
      <h1>{country.name.common}</h1>
      {/* population with commas so it is easier to read */}
      <p>Population: {Number(country.population).toLocaleString("en-US")}</p>
      {/* capital city use both array and string shapes from the api */}
      <p> Capital: {country.capital} </p>
      <p>Region: {country.region}</p>
      {/* how many times this details page has been viewed */}
      <p>Views: {views}</p>
      {/* button to save this country into localStorage */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
