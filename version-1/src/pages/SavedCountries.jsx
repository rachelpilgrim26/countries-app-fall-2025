// import react and the hooks we need
import React, { useState, useEffect } from "react";
// useState stores form and user useEffect runs once on load

// export the SavedCountries page so the compponet can show it
export default function SavedCountries() {
  // make state for the form inputs your same variable names
  const [form, setForm] = useState({
    // holds what the user types
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // make state for the saved user profile null means none saved yet
  const [userInfo, setUserInfo] = useState(null);

  // run once when the page loads to see if we already saved a profile before
  useEffect(() => {
    // this effect runs after the first render
    const saved = localStorage.getItem("profile");
    if (saved) {
      // if something was found
      try {
        // try to turn the string back into an object
        const obj = JSON.parse(saved);
        // may fail if the saved data is broken
        setUserInfo(obj);
        // if it worked, remember it so we can say "Welcome"
      } catch {
        // if JSON.parse fails bad data
        localStorage.removeItem("profile");
        // remove the bad value so the page can show the form
      }
    }
  }, []);
  // empty array means run only once on page load

  // handle typing in the inputs
  function onChange(e) {
    // called every time the user types
    setForm({ ...form, [e.target.name]: e.target.value });
    // copy old form and update just one
  }

  // handle the form submit
  function onSubmit(e) {
    // called when the user clicks Save
    e.preventDefault();
    // stop page refresh
    localStorage.setItem("profile", JSON.stringify(form));
    // save the form to localStorage as a string
    setUserInfo(form);
    // switch to the welcome view right away
    setForm({ name: "", email: "", country: "", bio: "" });
    // clear inputs back to empty
  }

  // if we already have a saved profile just show Welcome user
  if (userInfo) {
    // true when data exists in userInfo
    return (
      // show only the welcome message
      <section className="saved">
        {/* {" "} */}
        <h2>Welcome, {userInfo.name}!</h2>
      </section>
    );
  }

  // if there is no saved profile yet show the form
  return (
    // render the form
    <section className="saved">
      {" "}
      {/* page wrapper */}
      <h1>My Profile</h1>
      <form onSubmit={onSubmit}>
        {" "}
        <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={onChange}
          type="text"
          required
        />
        <input
          name="email"
          placeholder="email"
          value={form.email}
          onChange={onChange}
          type="email"
          required
        />
        <input
          name="country"
          placeholder="country"
          value={form.country}
          onChange={onChange}
          type="text"
          required
        />
        <textarea
          name="bio"
          placeholder="bio"
          value={form.bio}
          onChange={onChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </section>
  );
}
