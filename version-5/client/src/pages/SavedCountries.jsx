import React, { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard.jsx";

export default function SavedCountries({ countries }) {
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };

  const [formData, setFormData] = useState(emptyFormState);
  const [userInfo, setUserInfo] = useState(null);
  const [saved, setSaved] = useState([]);

  const storeUserData = async () => {
    await fetch("/api/add-one-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.fullName,
        country_name: formData.country,
        email: formData.email,
        bio: formData.bio,
      }),
    });
  };

  const getNewestUser = async () => {
    const response = await fetch("/api/get-newest-user");
    const data = await response.json();
    const newestUserFromAPI = data[0];

    setUserInfo({
      fullName: newestUserFromAPI.name,
      email: newestUserFromAPI.email,
      country: newestUserFromAPI.country_name,
      bio: newestUserFromAPI.bio,
    });
  };

  const getSavedCountries = async () => {
    const response = await fetch("/api/get-all-saved-countries");
    const data = await response.json();

    const result = data.map((item) =>
      countries.find((country) => country.name.common === item.country_name)
    );

    setSaved(result);
  };

  const handleUnsaveCountry = async (countryNameToUnsave) => {
    await fetch("/api/unsave-one-country", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country_name: countryNameToUnsave }),
    });

    const updatedSavedCountries = [];

    for (let index = 0; index < saved.length; index = index + 1) {
      const savedCountryItem = saved[index];

      if (
        savedCountryItem &&
        savedCountryItem.name.common !== countryNameToUnsave
      ) {
        updatedSavedCountries.push(savedCountryItem);
      }
    }

    setSaved(updatedSavedCountries);
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    storeUserData();
    setUserInfo(formData);
    setFormData(emptyFormState);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (countries.length) {
      getSavedCountries();
    }
  }, [countries]);

  useEffect(() => {
    getNewestUser();
  }, []);

  const cleanedSavedCountries = [];

  for (let index = 0; index < saved.length; index = index + 1) {
    const savedCountry = saved[index];

    if (savedCountry) {
      cleanedSavedCountries.push(savedCountry);
    }
  }

  cleanedSavedCountries.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  return (
    <section className="saved">
      {userInfo && <h2>Welcome {userInfo.fullName}</h2>}

      <section className="Form">
        <h2>My Profile</h2>
        <form onSubmit={handleSubmit} name="my-profile">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      <h2>Saved Countries</h2>

      <div className="grid">
        {cleanedSavedCountries.map((countryItem) => (
          <div key={countryItem.name.common} className="cell">
            <CountryCard country={countryItem} />
            <button
              type="button"
              className="unsave-button"
              onClick={() => handleUnsaveCountry(countryItem.name.common)}
            >
              Unsave
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
