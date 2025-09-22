// import react so we can build a component and use hooks
import React, { useState, useEffect } from "react";
// import the card so saved countries look the same as on the home page
import CountryCard from "../components/CountryCard.jsx";

// export the saved countries page component
export default function SavedCountries() {
  //  a blank state for the form so we can reset it after submit
  const emptyFormState = { name: "", email: "", country: "", bio: "" };

  // formData holds what the user types
  const [formData, setFormData] = useState(emptyFormState);
  // userInfo holds the saved profile or null when there is none
  const [userInfo, setUserInfo] = useState(null);
  // saved holds the list of saved country objects for the grid
  const [saved, setSaved] = useState([]);

  //  arrow function assigned to a varilbe this is an event handler for input onChange.

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setFormData({ ...formData, [name]: value });
  };

  // eventpreventDefault prevents the browsers default form submit then console.log logs the form data for debugging or to see the data
  // JSON.stringify(formData) creates a string because localStorage can only store strings
  // localStorage.setItem("profile", stringified) makes that string under the key "profile" it works page reload
  // setUserInfo(formData) updates state so the UI switches to the welcome view immediately without waiting for a reload
  // setFormData(emptyFormState) clears the inputs making the form blank again
  const handleSubmit = (event) => {
    event.preventDefault();
    // stop page reload
    console.log(formData, "form was submitted");
    // show what was sent  we have to stringify because local stoage can only read strings
    const stringified = JSON.stringify(formData);
    // make text for storage
    localStorage.setItem("profile", stringified);
    // save to localStorage meaning only stores to the local storage instead of the hole page reload
    setUserInfo(formData);
    // show welcome view immediatly without waiting for reload
    setFormData(emptyFormState);
    // reset inputs making the form look new and ready to fill out
  };

  // useeffct hook with an empty dependency list ([]) means it runs once after the first render
  // reads strings with localStorage.getItem returns null if missing
  // JSON.parse turns those strings back to objects/arrays
  // updates userInfo and saved so your UI loads with prior state
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
      // turn the text back into a list of objects/arrays
      const savedCountriesList = JSON.parse(savedCountriesText);
      // store it in state so i can render
      setSaved(savedCountriesList);
    }
  }, []);
  // useeffect is bascially synchoronizing your componet with an external system in the browsers stoarge
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
            required
          />
          <input
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="country"
            placeholder="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <textarea
            name="bio"
            placeholder="bio"
            value={formData.bio}
            onChange={handleChange}
            required
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
        {/* if saved is empty show no saved yet otherwise loop using .map to show country card */}
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
