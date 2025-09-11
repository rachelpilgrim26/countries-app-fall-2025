import CountryCard from "../components/CountryCard.jsx";
// one card for one country

export default function Home({ countriesData }) {
  // the home page gets one prop: countriesData (should be a list/array)

  // make a safe list: if countriesData is not a real array, use an empty array
  const countryList = Array.isArray(countriesData) ? countriesData : [];

  return (
    // start the home page
    <section>
      {/* page wrapper around everything */}
      <div className="list-header">
        {/* row above the grid with title and count */}
        <h1 className="page-title">All Countries</h1>
        {/* big title for the page */}
        <p className="page-subtitle">{countryList.length} total</p>
        {/* show how many items we have */}
      </div>

      <div className="cards-grid">
        {/* grid that holds all the country cards */}
        {countryList.map((oneCountry) => (
          // loop over every country and draw a card for each
          <CountryCard
            key={
              // pick a stable key so react can track list items
              oneCountry && typeof oneCountry === "object" && oneCountry.cca3
                ? oneCountry.cca3
                : //  the unique 3-letter code if it exists
                  oneCountry?.name?.common ||
                  oneCountry?.name ||
                  String(Math.random())
              // fallback if data is weird
            }
            country={oneCountry}
            // pass the whole country object into the card
          />
        ))}
        {/* end of the loop */}
      </div>
    </section>
    // finished the home page
  );
  // done with the home component
}
