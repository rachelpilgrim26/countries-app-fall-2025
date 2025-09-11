import React, { useMemo } from "react";
// react and a hook called usememo to remember a value
import { useParams, Link } from "react-router-dom";
// these are hooks to read the url useparams and make links

export default function CountryDetails({ countriesData, isLoading }) {
  // this component shows details for one country it gets data and loading from the parent
  const { countryName } = useParams();
  // read the country name from the url like /country/united%20states
  // read the name from the URL
  const targetName = decodeURIComponent(countryName || "").toLowerCase();
  // turn "%20" into spaces and make it lowercase so matching is easy
  // decode and normalize to lower-case
  const list = Array.isArray(countriesData) ? countriesData : [];
  //  if the prop is not an arra use an empty list

  const match = useMemo(() => {
    // remember the result so we don't re-search on every render
    return (
      // try to find the country in the list
      list.find((countryItem) => {
        // look at each country object until we find a match
        const common = // get a readable name from the object
          (
            countryItem?.name?.common ||
            // first try name.common (the normal place)
            countryItem?.name ||
            // or try name if the shape is different
            ""
          ) // if nothing is there, use an empty string
            .toLowerCase(); // make it lowercase so it matches our targetname style
        return common === targetName; // true when the name from the list equals the name from the url
      }) || null // if not found use null so we can handle it later
    );
  }, [list, targetName]);
  // only redo the search when the list or the url name changes

  if (isLoading)
    // if we are still fetching data...
    return (
      // show a simple loading message
      <section className="details">
        {" "}
        {/* page section for details */}
        <p>loading country…</p>
        {/* tell the user we are still loading */}
      </section>
    );

  if (!match)
    // if we finished loading but did not find a match...
    return (
      // ...show a gentle error and a way back
      <section className="details">
        {" "}
        {/* details section */}
        <p>could not find that country.</p>{" "}
        {/* message when there is no country with that name */}
        <p>
          {" "}
          {/* paragraph for the back link */}
          <Link to="/" className="nav-link">
            {" "}
            {/* link that sends the user back to the home page */}← back{" "}
            {/* the link text */}
          </Link>
        </p>
      </section>
    );

  const displayName = match?.name?.common || match?.name || "Unknown Country";
  // pick the country name safely with fallbacks
  const population =
    // show population with commas if it is a number
    typeof match?.population === "number"
      ? // check that population is really a number
        match.population.toLocaleString()
      : // format the number like 12,345,678 so it is easy to read
        "—";
  // if not a number show a dash
  // pick the first capital if its an array otherwise use the string or a  dash
  const capital = Array.isArray(match?.capital)
    ? // sometimes capital is an array has more then 1
      match.capital[0] // if it is an array take the first one
    : match?.capital || "—"; // if it is a single string use it if not put a dash
  const region = match?.region || "—"; // dash if missing
  const flag = match?.flags?.png || match?.flags?.svg || match?.flag || "";
  // choose a flag image url if available
  const alt = match?.flags?.alt || `${displayName} flag`;
  // alt text for the image to help screen readers

  return (
    //  show the details on the screen
    <section className="details">
      {" "}
      {/* wrapper for the details page part */}
      <p>
        {" "}
        {/* top row with a back link */}
        <Link to="/" className="nav-link">
          {" "}
          {/* clicking this takes you back home */}← back{" "}
          {/* text for the link */}
        </Link>
      </p>
      <div className="details-header">
        {" "}
        {/* layout wrapper for the flag and facts */}
        <div className="details-flag">
          {" "}
          {/* spot where the flag image goes */}
          {flag /* if we have a flag url... */ ? (
            <img
              src={flag}
              alt={alt}
              loading="lazy"
            /> /* ...show the image and load it lazily to save bandwidth */
          ) : (
            /* otherwise... */
            <div className="flag-fallback" /> /*show a simple empty box so layout stays neat */
          )}
        </div>
        <div>
          {" "}
          {/* right side: name and facts list */}
          <h1 className="details-title">{displayName}</h1>{" "}
          {/* big title with the country name */}
          <ul className="details-meta">
            {" "}
            {/* bullet list of facts */}
            <li>
              {" "}
              {/* first fact row */}
              <span className="label">Population:</span> {population}{" "}
              {/* label + formatted population */}
            </li>
            <li>
              {" "}
              {/* second fact row */}
              <span className="label">Region:</span> {region}{" "}
              {/* label + region */}
            </li>
            <li>
              {" "}
              {/* third fact row */}
              <span className="label">Capital:</span> {capital}{" "}
              {/* label + capital */}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
