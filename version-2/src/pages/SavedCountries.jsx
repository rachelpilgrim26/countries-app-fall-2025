// import react so we can build a component and use hooks
import React, { useState, useEffect } from "react";
// import the card so saved countries look the same as on the home page
import CountryCard from "../components/CountryCard.jsx";

// export the saved countries page component
export default function SavedCountries({ countries }) {
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
  // localStorage.setItem("profile") stringified makes that string under the key "profile" it works page reload
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
  useEffect(() => {
    // get the saved profile text from the browser storage
    const profileText = localStorage.getItem("profile");
    if (profileText) {
      try {
        // turn the text into an object i can use
        const profileObject = JSON.parse(profileText);
        // save it into state so the page can show "welcome, name"
        setUserInfo(profileObject);
      } catch (err) {
        // if the saved text is broken skip it so the app doesnt break the code
      }
    }
    // get the saved countries text from the browser storage
    const savedNamesText = localStorage.getItem("saved-countries");
    // start with an empty list in case nothing is saved
    let savedNamesList = [];
    // if we found some text for saved countries
    if (savedNamesText) {
      try {
        // turn the text into an array of names  ["Jamaica","Comoros"])
        savedNamesList = JSON.parse(savedNamesText);
      } catch (err) {
        // if the text is broken just use empty array so no eroors
        savedNamesList = [];
      }
    }
    // make a new empty list where we will store the real country objects
    const savedObjects = [];
    // go through every saved name string we found
    for (let i = 0; i < savedNamesList.length; i++) {
      // pick one saved name
      const savedName = savedNamesList[i];

      // look for the full country object in the big countries list
      const match = countries.find(
        (countryItem) => countryItem.name.common === savedName
      );
      // if we found it add it to the savedObjects list
      if (match) {
        savedObjects.push(match);
      }
    }
    // update the state with the real country objects
    // this makes React show the page and show CountryCard components
    setSaved(savedObjects);
    // run this effect again every time countries changes
  }, [countries]);

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
