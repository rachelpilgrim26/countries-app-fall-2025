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
    // this runs after the page first draws and anytime countries change

    // get profile if saved
    const profileText = localStorage.getItem("profile");
    // look in the browsers storage for the "profile" text might be null
    if (profileText) {
      // only try to use it if something was found
      try {
        const profileObject = JSON.parse(profileText);
        // turn the saved text into a real javascript object we can use
        setUserInfo(profileObject);
        // put that object into state so the screen can say things like "welcome, name"
      } catch (error) {
        // if the saved text is broken or not real JSON ignore it so the app does not throw error
      }
    }
    //the useEffect hook ensures a seamless user experience by performing the following actions on the components initial load
    // * It checks for a previously saved user profile
    // * It safely parses the profile data
    // * It automatically logs the user in if the data is valid
    // * It gracefully handles corrupted data by deleting it allowing the application to reset and show the login form
    //this is where i got it at because the other way i had it didnt show me the correct data in my local storage so i looked up way on the internet and found this and it worked
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#:~:text=catch%20statement%20is%20comprised%20of,flow%20exits%20the%20entire%20construct.
    // get saved country names
    const savedNamesText = localStorage.getItem("saved-countries");
    // read the list of saved country names as readable text or null
    let savedNamesList = [];
    // start with an empty list in case nothing is saved or the text isnt working

    try {
      savedNamesList = savedNamesText ? JSON.parse(savedNamesText) : [];
      // if we do have text try to turn it into an array like ["Jamaica","Comoros"]
    } catch (error) {
      savedNamesList = [];
      // if the text is broken keep it safe by using an empty list
    }
    //I run a one-time useEffect to restore the users profile from the browsers storage after the first render Storage only stores string so I safely convert the string back to an object with JSON.parse. because JSON.parse can throw bad data because it might have # or . I wrap just that line in try/catch If it parses I update React state so the UI greets the user immediately if it fails I delete the bad value so we don’t keep breaking on future loads
    // filter countries keep only the ones in savedNamesList
    const savedObjects = countries.filter(
      (
        countryItem
        // go through every country object we got from props
      ) => savedNamesList.includes(countryItem.name.common)
      // keep it only if its common name is inside our saved names list
    );

    setSaved(savedObjects);
    // store the real country objects in state so the UI can show the CountryCard components
  }, [countries]);
  // run this whole effect again if and only if the "countries" list changes

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
