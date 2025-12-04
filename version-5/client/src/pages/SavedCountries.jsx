import React, { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard.jsx";

export default function SavedCountries({ countries }) {
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };

  const [formData, setFormData] = useState(emptyFormState);
  const [userInfo, setUserInfo] = useState(null);
  const [saved, setSaved] = useState([]);

  // made an async function so we can use await inside it
  const storeUserData = async () => {
    // send an http request to the backend to add one user
    await fetch("/api/add-one-user", {
      // use POST because we are sending data to create or update something on the server
      method: "POST",
      // tell the server that the request body is json text
      headers: { "Content-Type": "application/json" },
      // turn our js object into a json string before sending
      body: JSON.stringify({
        // use the users full name from your form state
        name: formData.fullName,
        // use the selected country name from your form state
        country_name: formData.country,
        // use the user email from your form state
        email: formData.email,
        // use the user bio from your form state
        bio: formData.bio,
      }),
    });
  };

  // made an async function so we can pause
  const getNewestUser = async () => {
    // call your backend API to get the newest user
    const response = await fetch("/api/get-newest-user");

    // turn the http response body into a js object or array
    const data = await response.json();

    // grab the first item from the array (the newest user)
    const newestUserFromAPI = data[0];

    // save the user fields into react state so the UI shows them
    setUserInfo({
      fullName: newestUserFromAPI.name,
      email: newestUserFromAPI.email,
      country: newestUserFromAPI.country_name,
      bio: newestUserFromAPI.bio,
    });
  };

  // made an async function so we can pause using await
  const getSavedCountries = async () => {
    // call your backend to get the full list of saved countries
    const response = await fetch("/api/get-all-saved-countries");

    // turn the http response body from json text into a real JS value like an array
    const data = await response.json();

    // build a new array called result by getting each item from the API
    const result = data.map((item) =>
      // for each saved item find the matching country object in your local countries array
      countries.find((country) => country.name.common === item.country_name)
    );

    // put the final array into react state so the UI can render those country objects
    setSaved(result);
  };

  // made an async function to unsave one country by its name
  const handleUnsaveCountry = async (countryNameToUnsave) => {
    // send a POST request to the backend unsave endpoint
    await fetch("/api/unsave-one-country", {
      // use POST because the backend expects a POST request
      method: "POST",
      // tell the server that we are sending JSON in the request body
      headers: { "Content-Type": "application/json" },
      // send the country_name in the body so the backend knows which country to unsave
      body: JSON.stringify({ country_name: countryNameToUnsave }),
    });

    // create a new array without the country that was just unsaved
    const updatedSavedCountries = saved.filter(
      (savedCountryItem) =>
        savedCountryItem && savedCountryItem.name.common !== countryNameToUnsave
    );

    // update the saved state so the UI no longer shows the unsaved country
    setSaved(updatedSavedCountries);
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    storeUserData();
    setUserInfo(formData);
    setFormData(emptyFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // after react renders run this effect and also re run whenever countries changes
  useEffect(() => {
    // only call getSavedCountries() if countries exists and has at least one item
    if (countries.length) getSavedCountries();
    // dependency array run on mount and again any time countries becomes a new value
  }, [countries]);

  useEffect(() => {
    getNewestUser();
  }, []);

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
        {saved.map(
          (countryItem) =>
            countryItem && (
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
            )
        )}
      </div>
    </section>
  );
}
