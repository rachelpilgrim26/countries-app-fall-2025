import React, { useState } from "react";

export default function SavedCountries() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    countryName: "",
    shortBio: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      emailAddress: "",
      countryName: "",
      shortBio: "",
    });
  };

  return (
    <section className="saved-page">
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          name="emailAddress"
          placeholder="email"
          value={formData.emailAddress}
          onChange={handleChange}
        />
        <input
          name="countryName"
          placeholder="country"
          value={formData.countryName}
          onChange={handleChange}
        />
        <textarea
          name="shortBio"
          placeholder="bio"
          value={formData.shortBio}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </section>
  );
}
