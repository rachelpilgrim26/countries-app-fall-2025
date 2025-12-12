import React, { useState } from "react";
import CountryCard from "../components/CountryCard.jsx";

export default function Home({ countries }) {
  const list = countries || [];

  // keep track of which region is selected in the dropdown
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");

  // build a unique list of regions for the dropdown
  const regions = ["Filter by Region"];

  for (let index = 0; index < list.length; index = index + 1) {
    const country = list[index];

    if (country.region && !regions.includes(country.region)) {
      regions.push(country.region);
    }
  }

  regions.sort();

  // filter by region first (or show all)
  const filteredByRegion =
    selectedRegion === "Filter by Region"
      ? list
      : list.filter((countryItem) => countryItem.region === selectedRegion);

  // sort alphabetically by country name
  const sortedCountries = [...filteredByRegion].sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  return (
    <div className="home">
      <select
        className="region-select"
        value={selectedRegion}
        onChange={(event) => setSelectedRegion(event.target.value)}
      >
        {regions.map((regionName) => (
          <option key={regionName} value={regionName}>
            {regionName}
          </option>
        ))}
      </select>

      <div className="grid">
        {sortedCountries.map((countryItem) => (
          <div className="cell" key={countryItem.cca3}>
            <CountryCard country={countryItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
