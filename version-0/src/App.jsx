// App.jsx

import React from "react"; // load react so we can write components
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// router tools so we can switch pages without a full reload
import Home from "./pages/Home.jsx"; // the home page
import SavedCountries from "./pages/SavedCountries.jsx";
// the saved countries page
import CountryDetails from "./pages/CountryDetails.jsx";
// the country details page (uses url like /country/usa)
import countriesFromLocalFile from "../localData.js";
// our local country data

export default function App() {
  // this is the main app component
  return (
    // everything inside here is our app ui
    <BrowserRouter>
      {/* turn on client-side routing so clicks are fast and no full page refresh */}

      <header className="site-header">
        {/* the top bar you see on every page */}
        <div className="header-inner">
          {/* wrapper so brand and nav sit on one line */}
          <Link to="/" className="brand">
            {/* when you click this, go to the home page */}
            Where in the world?
          </Link>

          <nav className="main-nav">
            {/* small right-side menu with links */}
            <Link to="/saved" className="nav-link">
              {/* when you click this, go to the saved page */}
              Saved Countries
            </Link>
          </nav>
        </div>
      </header>

      <main className="page">
        {/* the part of the screen where pages show up */}
        <Routes>
          {/* the router looks at the url and picks one route to show */}

          <Route
            path="/"
            // if the url is exactly "/"
            element={
              <Home
                countriesData={countriesFromLocalFile}
                // show the home page and pass in the list of countries
              />
            }
          />

          <Route
            path="/saved"
            // if the url is "/saved"
            element={<SavedCountries />}
            // show the saved countries page
          />

          <Route
            path="/country/:cca3"
            // if the url is like "/country/usa" where "usa" is a 3-letter code
            element={<CountryDetails />}
            // show the details page for that code
          />
        </Routes>
        {/* done picking which page to show */}
      </main>
    </BrowserRouter>
    // done using the router
  );
  // finished the app component
}
