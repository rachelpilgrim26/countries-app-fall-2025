import React from "react";
// use React hook
import { Link } from "react-router-dom";
// use Link for clicks

export default function CountryCard({ country }) {
  // one card for one country
  const nameText = country?.name?.common || country?.name || "Unknown";
  // show a name
  const populationText =
    typeof country?.population === "number"
      ? country.population.toLocaleString()
      : "—";
  // number or dash
  const capitalText = Array.isArray(country?.capital)
    ? country.capital[0]
    : country?.capital || "—";
  // first capital or dash
  const regionText = country?.region || "—";
  // region or dash
  const flagUrl = country?.flags?.png || country?.flags?.svg || "";
  // flag picture
  const altText = country?.flags?.alt || `${nameText} flag`;
  // alt text

  return (
    <Link to={`/country-detail/${nameText}`} className="card-link">
      {" "}
      {/* simple link using the name */}
      <article className="card">
        {" "}
        {/* card box */}
        <div className="flag-wrap">
          {" "}
          {/* flag on top */}
          {flagUrl ? (
            <img src={flagUrl} alt={altText} />
          ) : (
            <div className="flag-fallback" />
          )}
        </div>
        <div className="card-body">
          {" "}
          {/* text area */}
          <h2 className="country-name">{nameText}</h2>
          <ul className="meta">
            <li>
              <span className="label">Population:</span> {populationText}
            </li>
            <li>
              <span className="label">Capital:</span> {capitalText}
            </li>
            <li>
              <span className="label">Region:</span> {regionText}
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}
