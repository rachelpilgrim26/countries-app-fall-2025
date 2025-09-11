import React from "react";
// react so we can write components
import CountryCard from "../components/CountryCard.jsx";
// each box for one country

// this component gets data from the parent; it does not fetch here

export default function Home({ countriesData, isLoading }) {
  const safeList = Array.isArray(countriesData) ? countriesData : [];
  //  this is the fetched data coming in as a prop
  const alphabeticalList = [...safeList].sort((firstCountry, secondCountry) => {
    // copy then sort by name so A→Z
    const firstName = firstCountry?.name?.common || firstCountry?.name || "";
    // safe left name
    const secondName = secondCountry?.name?.common || secondCountry?.name || "";
    // safe right name
    return firstName.localeCompare(secondName);
  });
  // done making an A→Z list

  return (
    // show the page
    <section>
      {/* title row with a simple count or loading text */}
      <div className="list-header">
        <h1 className="page-title">All Countries</h1>
        <p className="page-subtitle">
          {isLoading ? "loading…" : `${alphabeticalList.length} total`}
          {/* show how many after sorting */}
        </p>
      </div>

      {/* grid of cards */}
      <div className="cards-grid">
        {/*  only render cards after loading is done */}
        {!isLoading &&
          alphabeticalList.map((country) => (
            // loop over the fetched data and render each item
            <CountryCard
              key={country?.cca3 || country?.name?.common || country?.name}
              country={country}
              // give the whole country to the card
            />
          ))}
      </div>
    </section>
  );
}
