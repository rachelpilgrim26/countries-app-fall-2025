import React, { useEffect, useState } from "react";

// bring in react and the hooks
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// router tools
import Home from "./pages/Home.jsx";
// home page file
import SavedCountries from "./pages/SavedCountries.jsx";
// saved page file
import CountryDetail from "./pages/CountryDetails.jsx";
// detail page file

export default function App() {
  const [countryList, setCountryList] = useState([]);
  // hold all countries here
  const [isLoading, setIsLoading] = useState(true);
  // true while we are fetching

  async function loadCountries() {
    // this function gets the countries from the api
    const apiUrl = // this is the web address we will fetch from
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders";
    // we only ask for fields we need to keep it fast
    try {
      // try the network call
      const apiResponse = await fetch(apiUrl);
      // fetch() asks the server for data and gives back a response object
      if (!apiResponse.ok) throw new Error(`HTTP ${apiResponse.status}`);
      // if status is not right we throw an error so we jump to catch
      const apiData = await apiResponse.json();
      // turn the response body into real javascript data so we can use it
      setCountryList(Array.isArray(apiData) ? apiData : []);
      // make sure it is an array before we put it in state
    } catch (fetchError) {
      // if anything goes wrong above we get here
      console.error("api failed, using localData backup:", fetchError);
      // log what happened so we can debug later
      setCountryList(Array.isArray(localData) ? localData : []);
      // use our local backup so the page still works
    } finally {
      // this runs whether we succeeded or failed
      setIsLoading(false);
      // stop the loading state so the ui can update
    }
  }

  useEffect(() => {
    // run this one time when the page first opens
    loadCountries();
    // call our fetch function
  }, []);
  // empty list means it runs only once

  return (
    // the app shell and the pages inside it
    <BrowserRouter>
      {/* top bar with brand and a link */}
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

      {/* main area where each route shows */}
      <main className="page">
        <Routes>
          <Route
            path="/country-detail/:countryName"
            element={
              <CountryDetail
                countriesData={countryList}
                isLoading={isLoading}
              />
            }
          />
          {/* home gets the data and the loading flag */}
          <Route
            path="/"
            element={<Home countriesData={countryList} isLoading={isLoading} />}
          />
          {/* saved page also receives the data (even if it dont use it yet) */}
          <Route
            path="/saved"
            element={<SavedCountries countriesData={countryList} />}
          />
          {/* this page needs the data to look up one country by code */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}
