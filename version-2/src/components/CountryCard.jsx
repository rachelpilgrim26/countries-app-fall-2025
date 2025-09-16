import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  const name = country.name.common;
  const flag = country.flags.svg || country.flags.png;
  const pop = country.population;
  const cap = Array.isArray(country.capital)
    ? country.capital[0]
    : country.capital;
  const reg = country.region;
  const countryName = country.name.common;

  return (
    <Link to={`/country/${countryName}`} className="card">
      <img className="flag" src={flag} alt={name + " flag"} />
      <div className="nm">{name}</div>
      <p>Population: {pop}</p>
      <p>Capital: {cap}</p>
      <p>Region: {reg}</p>
    </Link>
  );
}
