// import react so we can write a component and use hooks
import React, { useEffect, useState } from "react";
// import hooks from react router to read url parts and make a back link
import { useParams, Link } from "react-router-dom";

// export a component that shows details for one country
export default function CountryDetails({ countries }) {
  // read the :countryName piece from the url like /country/France
  const { countryName } = useParams();
  // I used find not filte because you want one item not a list filter would return an array of all matches
  const country = countries.find(
    (countryItem) => countryItem.name.common === countryName
  );
  // make a setter in usestate number to show how many times this page was viewed
  const [views, setViews] = useState(0);

  useEffect(() => {
    // if there is no matching country do nothing
    if (!country) return;
    // use the country name as the storage key
    const countryId = country.name.common;
    // read the current count (string or null) and default to "0"
    const countString = localStorage.getItem(countryId) || "0";
    // make it a number and add 1
    const nextCountNumber = Number(countString) + 1;
    // write it back under the country name key one key per country
    localStorage.setItem(countryId, JSON.stringify(nextCountNumber));

    // update state so the screen shows the new number
    setViews(nextCountNumber);
  }, [country]);
  // run again if the country changes

  function handleSave() {
    // read the savedCountries array from localStorage parse it or use an empty array if nothing is saved yet
    // bascilly destringfy and parse doing two steps in one concatenation
    let saved = JSON.parse(localStorage.getItem("saved-countries")) || [];
    // check if this exact country is already in saved by comparing the same name.common returns the object or undefined
    const already = saved.find((savedItem) => savedItem === countryName);
    // this conditional only add if not saved add it and write the new array back to storage
    if (!already) {
      saved.push(countryName); // push the name string not the whole object
      localStorage.setItem("saved-countries", JSON.stringify(saved));
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
