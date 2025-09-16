import React, { useEffect, useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import localData from "../localData.js";

export default function App() {
  const [list, setList] = useState([]);

  async function pull() {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      const countrys = await res.json();
      setList(Array.isArray(countrys) ? countrys : localData);
      console.log(countrys);
    } catch {
      setList(localData);
    }
  }

  useEffect(() => {
    pull();
  }, []);

  return (
    <BrowserRouter>
      <div className="site">
        <div className="header">
          <Link to="/" className="brand">
            Where in the World?
          </Link>
          <Link to="/saved" className="nav">
            Saved Countries
          </Link>
        </div>
        <Routes>
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
