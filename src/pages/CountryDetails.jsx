import React from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetails({ countries }) {
  const { countryName } = useParams();
  const country = countries.find((item) => item.name.common === countryName);

  if (!country) return <div className="detail">Not found</div>;

  const name = country.name.common;
  const flag = country.flags.svg || country.flags.png;
  const pop = country.population;
  const cap = country.capital[0];
  const reg = country.region;

  return (
    <div className="detail">
      <Link to="/">← Back</Link>
      <img className="flag" src={flag} alt={name + " flag"} />
      <h1>{name}</h1>
      <p>Population: {pop}</p>
      <p>Capital: {cap}</p>
      <p>Region: {reg}</p>
    </div>
  );
}
