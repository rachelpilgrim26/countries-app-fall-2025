import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetails({ countries }) {
  const { countryName } = useParams();

  const country = countries.find(
    (countryItem) => countryItem.name.common === countryName
  );
  const [views, setViews] = useState(0);

  const CountryCount = async () => {
    const response = await fetch(
      "https://backend-answer-keys.onrender.com/update-one-country-count",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country_name: country.name.common }),
      }
    );
    const data = await response.json();
    setViews(data.count);
  };

  useEffect(() => {
    if (country) {
      CountryCount();
    }
  }, [country]);

  async function handleSave() {
    await fetch("https://backend-answer-keys.onrender.com/save-one-country", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country_name: country.name.common }),
    });
  }

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
