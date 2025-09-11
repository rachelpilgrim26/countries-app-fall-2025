import React from "react";
// import react so we can write a component
import { Link } from "react-router-dom";
// import Link so the whole card can be clickable

export default function CountryCard({ country }) {
  // get a safe display name for the card title
  const displayNameText = country?.name?.common || country?.name || "Unknown"; // prefer common name

  // get a safe name to use in the url path (diplay but empty string if missing if not it with throw error
  const routeNameText = country?.name?.common || country?.name || "";

  // the population with commas or show a dash if missing
  const populationText =
    typeof country?.population === "number"
      ? country.population.toLocaleString()
      : //  with commas and stuff
        "—";
  // dash when not a number

  // show the first capital if it is an array, or use the string, or a dash
  const capitalText = Array.isArray(country?.capital)
    ? country.capital[0]
    : // first item like
      country?.capital || "—";
  // string or dash

  // show region or a dash
  const regionText = country?.region || "—";

  // pick a flag image url from common locations or leave empty
  const flagImageUrl =
    country?.flags?.png || country?.flags?.svg || country?.flag || "";
  // try png then svg

  // accessible alt text for the image
  const imageAltText = country?.flags?.alt || `${displayNameText} flag`;
  // readable alt text

  // true when we have a real name to build a link
  const hasValidRouteName =
    typeof routeNameText === "string" && routeNameText.trim().length > 0;
  // non-empty string

  // built the link path safely put spaces and special char
  const detailPath = hasValidRouteName
    ? `/country-detail/${encodeURIComponent(routeNameText)}`
    : "";
  // empty when no link

  // wrapper Link when we can navigate plain div when we cannot
  const WrapperElement = hasValidRouteName ? Link : "div";
  // made the card clickable only when valid

  // props for the wrapper so styles stay the same in both cases
  const wrapperProps = hasValidRouteName
    ? { to: detailPath, className: "card-link" }
    : // clickable card
      { className: "card-link card-link--disabled", "aria-disabled": "true" };
  // not clickable

  // show the card
  return (
    <WrapperElement {...wrapperProps}>
      {/* outer card box */}
      <article className="card">
        {/* flag at the top with a fixed aspect ratio */}
        <div className="flag-wrap">
          {flagImageUrl ? (
            <img src={flagImageUrl} alt={imageAltText} loading="lazy" />
          ) : (
            <div className="flag-fallback" />
          )}
        </div>

        {/* text area with name and small facts */}
        <div className="card-body">
          <h2 className="country-name">{displayNameText}</h2>
          <ul className="meta">
            <li>
              <span className="label">Population:</span> {populationText}
            </li>
            <li>
              <span className="label">Capital:</span> {capitalText}
            </li>
            <li>
              <span className="label">Region:</span> {regionText}
            </li>
          </ul>
        </div>
      </article>
    </WrapperElement>
  );
}
