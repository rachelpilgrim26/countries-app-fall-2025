import React, { useState } from "react";
// react and state

export default function SavedCountries({ countriesData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    countryName: "",
    shortBio: "",
  });
  // all fields in one
  const handleChange = (event) =>
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value,
    }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      emailAddress: "",
      countryName: "",
      shortBio: "",
    });
  };
  // clear on submit

  return (
    <section className="saved-page">
      <h1 className="page-title">My Profile</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="fullName" className="form-label">
            name
          </label>
          <input
            id="fullName"
            name="fullName"
            className="form-input"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="emailAddress" className="form-label">
            email
          </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            className="form-input"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="countryName" className="form-label">
            country
          </label>
          <input
            id="countryName"
            name="countryName"
            className="form-input"
            value={formData.countryName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="shortBio" className="form-label">
            bio
          </label>
          <textarea
            id="shortBio"
            name="shortBio"
            rows={5}
            className="form-textarea"
            value={formData.shortBio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button">
            save profile
          </button>
        </div>
      </form>
    </section>
  );
}
