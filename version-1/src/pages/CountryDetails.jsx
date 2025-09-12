import React from "react"; // react so we can write components
import { useParams, Link } from "react-router-dom"; // tools for reading url and making links

export default function CountryDetails({ countriesData = [] }) {
  const { countryName } = useParams(); // read the name from the url
  const country =
    countriesData.find(
      (item) => (item?.name?.common || item?.name || "") === countryName
    ) || null;
  // try to find the country in the list

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

  const name = country?.name?.common || country?.name || "Unknown";
  // safe country name
  const population = country?.population
    ? country.population.toLocaleString()
    : "—";
  // commas in number
  const capital = Array.isArray(country?.capital)
    ? country.capital[0]
    : country?.capital || "—";
  // show first capital
  const region = country?.region || "—";
  // region or dash
  const flag = country?.flags?.png || country?.flags?.svg || "";
  // flag picture link

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
            <img src={flag} alt={`${name} flag`} />
          ) : (
            <div className="flag-fallback" />
          )}
        </div>
        <div>
          <h1 className="details-title">{name}</h1>
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
