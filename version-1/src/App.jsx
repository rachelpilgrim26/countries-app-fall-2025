import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";

export default function App() {
  // export this component so other files can use it
  const [countryList, setCountryList] = useState([]);
  // make a state value to hold the countries as an empty array

  const getCountriesAsync = async () => {
    // define an async function to grab countries
    try {
      // try the network call and parsing
      const response = await fetch(
        // send a request to the rest countries api
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      // ask only for the things we actually need
      const data = await response.json();
      // turn the http response body into usable java varible
      setCountryList(data);
      // save the countries in state so the ui can render with them
    } catch (error) {
      // if something goes wrong with fetch
      console.log("error: " + error.message);
      // show the error message to the console for debugging
    }
  };
  // end of getCountriesAsync function

  useEffect(() => {
    // run some side effect code after the component first shows up
    getCountriesAsync();
    // start the fetch once right after the first render
  }, []);
  // empty array means this effect runs only once

  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            Where in the world?
          </Link>
          <nav className="main-nav">
            <Link to="/saved" className="nav-link">
              Saved Countries
            </Link>
          </nav>
        </div>
      </header>

      <main className="page">
        <Routes>
          <Route path="/" element={<Home countriesData={countryList} />} />
          <Route
            path="/saved"
            element={<SavedCountries countriesData={countryList} />}
          />
          <Route
            path="/country-detail/:countryName"
            element={<CountryDetails countriesData={countryList} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
