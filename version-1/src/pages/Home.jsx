import React from "react";
import CountryCard from "../components/CountryCard.jsx";

export default function Home({ countries }) {
  const list = countries || [];

  return (
    <div className="home">
      <div className="grid">
        {list.map((item) => (
          <div className="cell" key={item.cca3}>
            <CountryCard country={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
