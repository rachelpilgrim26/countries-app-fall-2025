import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";

export default function App() {
  const [countryList, setCountryList] = useState([]);

  const getCountriesAsync = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      const data = await response.json();
      setCountryList(data);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  useEffect(() => {
    getCountriesAsync();
  }, []);

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
