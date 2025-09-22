// import react so we can build a component and use hooks
import React, { useState, useEffect } from "react";
// import the card so saved countries look the same as on the home page
import CountryCard from "../components/CountryCard.jsx";

// export the saved countries page component
export default function SavedCountries() {
  // a blank shape for the form so we can reset it after submit
  const emptyFormState = { name: "", email: "", country: "", bio: "" };

  // formData holds what the user types
  const [formData, setFormData] = useState(emptyFormState);
  // userInfo holds the saved profile or null when there is none
  const [userInfo, setUserInfo] = useState(null);
  // saved holds the list of saved country objects for the grid
  const [saved, setSaved] = useState([]);

  // update formData when any input changes

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // stop page reload
    console.log(formData, "form was submitted");
    // show what was sent
    const stringified = JSON.stringify(formData);
    // make text for storage
    localStorage.setItem("profile", stringified);
    // save to localStorage
    setUserInfo(formData);
    // show welcome
    setFormData(emptyFormState);
    // reset inputs
  };

  useEffect(() => {
    // check if a profile was saved before
    if (localStorage.getItem("profile")) {
      // read the saved profile text
      const profileText = localStorage.getItem("profile");
      // turn the text back into an object
      const profileObject = JSON.parse(profileText);
      // store it in state so the welcome shows
      setUserInfo(profileObject);
    }
    // check if any countries were saved before
    if (localStorage.getItem("savedCountries")) {
      // read the saved countries text
      const savedCountriesText = localStorage.getItem("savedCountries");
      // turn the text back into a list
      const savedCountriesList = JSON.parse(savedCountriesText);
      // store it in state so the grid can render
      setSaved(savedCountriesList);
    }
  }, []);

  const welcome = userInfo && <h2>welcome, {userInfo.name}</h2>;

  // decide if we should show the form only when there is no saved profile
  let formSection = null;
  if (userInfo === null) {
    formSection = (
      <>
        <h1>my profile</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="country"
            value={formData.country}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <button type="submit">save</button>
        </form>
      </>
    );
  }

  // show the saved countries page
  return (
    <section className="saved">
      {/* show welcome if we have a saved profile */}
      {welcome}

      {/* show the form only when there is no saved profile */}
      {formSection}

      {/* show the saved countries grid */}
      <h2>saved countries</h2>
      <div className="grid">
        {/* if statement is jsx its called logical && conditional rendering*/}
        {saved.length === 0 && <p>no saved countries yet</p>}
        {saved.map((savedCountry) => (
          <div key={savedCountry.name.common} className="cell">
            <CountryCard country={savedCountry} />
          </div>
        ))}
      </div>
    </section>
  );
}
