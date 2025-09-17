import React from "react";
import { Link } from "react-router-dom";

// export a react function component that takes a single prop named country
export default function CountryCard({ country }) {
  // read the common name for this country out of the nested name object
  const name = country.name.common;
  // pick the svg flag if present otherwise use to png
  const flag = country.flags.svg || country.flags.png;

  // if capital is an array pick the first entry otherwise use the value as is
  const cap = Array.isArray(country.capital)
    ? country.capital[0]
    : country.capital;
  // save the top level region for display
  const reg = country.region;
  // store the common name again for use in the link path
  const countryName = country.name.common;

  // show a this side navigation link that goes to a country details page
  return (
    <Link to={`/country/${countryName}`} className="card">
      {/* render the flag image with an alt text that includes the country name */}
      <img className="flag" src={flag} alt={name + " flag"} />
      {/* show the country name as a heading like element */}
      <div className="nm">{name}</div>
      {/* use the population with thousands separators for us english */}
      <p>Population: {Number(country.population).toLocaleString("en-US")}</p>
      {/* show the first capital value we resolved above */}
      <p>Capital: {cap}</p>
      {/* show the region we pulled from the object */}
      <p>Region: {reg}</p>
    </Link>
  );
}
