import React from "react";
// bring in React hook so we can make components
import CountryCard from "../components/CountryCard.jsx";
// a component that shows one country card

// this page shows every country as a grid of cards
export default function Home({ countriesData }) {
  // the parent sends us the list as countriesData
  const safeCountryList = Array.isArray(countriesData) ? countriesData : [];
  // make sure we have an array or use an empty one

  const alphabeticalCountryList = [...safeCountryList].sort(
    (firstCountryItem, secondCountryItem) => {
      // copy the list then sort it A→Z
      const firstCountryName =
        firstCountryItem?.name?.common || firstCountryItem?.name || "";
      // get the left name safely string or empty
      const secondCountryName =
        secondCountryItem?.name?.common || secondCountryItem?.name || "";
      // get the right name safely string or empty
      return firstCountryName.localeCompare(secondCountryName);
      // compare the two names to decide order
    }
  ); // done an A to Z list

  return (
    // show the page
    <section>
      {" "}
      {/* page wrapper */}
      <div className="list-header">
        {" "}
        {/* row with title and a simple count */}
        <h1 className="page-title">All Countries</h1>
        <p className="page-subtitle">{`${alphabeticalCountryList.length} total`}</p>{" "}
        {/* show how many countries we have */}
      </div>
      <div className="cards-grid">
        {" "}
        {/* grid that holds every country card */}
        {alphabeticalCountryList.map(
          (
            countryItem
            // go through the sorted lis one country at a time
          ) => (
            <CountryCard
              key={
                countryItem?.cca3 ||
                countryItem?.name?.common ||
                countryItem?.name
              } // a key so React can track each card
              country={countryItem}
              // pass the whole country object down to the card
            />
          )
        )}{" "}
        {/* end of the loop that makes one CountryCard per country */}
      </div>
    </section>
  ); // end of what we show on the screen
}
