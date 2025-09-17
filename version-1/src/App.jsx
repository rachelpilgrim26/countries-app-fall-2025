import React, { useEffect, useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import localData from "../localData.js";

// export a react function component for the whole app
export default function App() {
  // declare state to hold the list of countries and a setter to update it
  const [list, setList] = useState([]);

  // define an async function that fetches country data and updates state
  async function pull() {
    try {
      // request a list of fields from the rest countries api
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      // parse the json body from the response
      const countrys = await res.json();
      // if the result is an array use it otherwise fall back to local data
      setList(Array.isArray(countrys) ? countrys : localData);
      // log it to make sure you getting the correct ogjecft
      console.log(countrys);
    } catch {
      // if the network request fails then use the local data
      setList(localData);
    }
  }

  // run the pull function once when the app first mounts
  useEffect(() => {
    pull();
  }, []);

  // shoe the router the header nav and the route views
  return (
    <BrowserRouter>
      <div className="site">
        <div className="header">
          {/* brand link that navigates to the home route */}
          <Link to="/" className="brand">
            Where in the World?
          </Link>
          {/* link to the saved countries page */}
          <Link to="/saved" className="nav">
            Saved Countries
          </Link>
        </div>
        <Routes>
          {/* passing data from parent to child */}
          <Route path="/" element={<Home countries={list} />} />
          <Route path="/saved" element={<SavedCountries countries={list} />} />
          <Route
            path="/country/:countryName"
            element={<CountryDetails countries={list} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
