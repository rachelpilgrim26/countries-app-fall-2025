import React from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetails({ countriesData = [] }) {
  const { countryName } = useParams();
  const target = countryName || "";

  const country =
    countriesData.find(
      (item) => (item?.name?.common || item?.name || "") === target
    ) || null;

  if (!country) {
    return (
      <section className="details">
        <p>could not find that country.</p>
        <p>
          <Link to="/" className="nav-link">
            ← back
          </Link>
        </p>
      </section>
    );
  }

  const displayName = country?.name?.common || country?.name || "Unknown";
  const population =
    typeof country?.population === "number"
      ? country.population.toLocaleString()
      : "—";
  const capital = Array.isArray(country?.capital)
    ? country.capital[0]
    : country?.capital || "—";
  const region = country?.region || "—";
  const flag = country?.flags?.png || country?.flags?.svg || "";

  return (
    <section className="details">
      <p>
        <Link to="/" className="nav-link">
          ← back
        </Link>
      </p>
      <div className="details-header">
        <div className="details-flag">
          {flag ? (
            <img src={flag} alt={`${displayName} flag`} loading="lazy" />
          ) : (
            <div className="flag-fallback" />
          )}
        </div>
        <div>
          <h1 className="details-title">{displayName}</h1>
          <ul className="details-meta">
            <li>
              <span className="label">Population:</span> {population}
            </li>
            <li>
              <span className="label">Region:</span> {region}
            </li>
            <li>
              <span className="label">Capital:</span> {capital}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
