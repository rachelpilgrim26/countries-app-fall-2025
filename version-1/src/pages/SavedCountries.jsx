import React, { useState } from "react";

export default function SavedCountries() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    setForm({ name: "", email: "", country: "", bio: "" });
  }

  return (
    <section className="saved">
      <h1>My Profile</h1>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="email"
          placeholder="email"
          value={form.email}
          onChange={onChange}
        />
        <input
          name="country"
          placeholder="country"
          value={form.country}
          onChange={onChange}
        />
        <textarea
          name="bio"
          placeholder="bio"
          value={form.bio}
          onChange={onChange}
        />
        <button type="submit">Save</button>
      </form>
    </section>
  );
}
