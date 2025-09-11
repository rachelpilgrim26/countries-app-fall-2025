export default function CountryCard({ country }) {
  // this component draws one card for one country

  // pick the country name, or use "unknown" if data is missing
  let displayCountryName = "Unknown";
  // start with a safe default
  if (country) {
    // make sure we have a country object
    if (
      country.name &&
      typeof country.name === "object" &&
      country.name.common
    ) {
      displayCountryName = country.name.common;
      // use the common name if it exists
    } else if (typeof country.name === "string") {
      displayCountryName = country.name;
      // else use the simple string name
    }
  }

  // build the population text (format numbers with commas) or show a dash
  let displayPopulation = "—";
  // start with a dash
  if (country && typeof country.population === "number") {
    displayPopulation = country.population.toLocaleString();
    // turn 67391582 into "67,391,582"
  }

  // pick the capital city, handling both array and string cases, or show a dash
  let displayCapital = "—";
  // default to a dash
  if (country) {
    if (Array.isArray(country.capital) && country.capital.length > 0) {
      displayCapital = country.capital[0];
      // if it is an array, show the first city
    } else if (typeof country.capital === "string") {
      displayCapital = country.capital;
      // if it is a string, show it directly
    }
  }

  // pick the region or show a dash
  const displayRegion = country && country.region ? country.region : "—";
  // region name or dash

  // find a flag image url if one exists
  let flagImageUrl = ""; // start empty
  if (country && country.flags) {
    if (country.flags.png) {
      flagImageUrl = country.flags.png;
      // prefer png if present
    } else if (country.flags.svg) {
      flagImageUrl = country.flags.svg;
      // otherwise try svg
    }
  }
  if (!flagImageUrl && country && country.flag) {
    flagImageUrl = country.flag;
    // last chance: a generic "flag" field
  }

  // write the text that screen readers will read for the image
  const imageAltText =
    country && country.flags && country.flags.alt
      ? country.flags.alt
      : // use provided alt text if given
        `${displayCountryName} flag`;
  // or build a simple alt text

  // now draw the card ui
  return (
    <article className="card">
      {/* outer card box */}
      <div className="flag-wrap">
        {/* space for the flag image */}
        {flagImageUrl ? (
          <img src={flagImageUrl} alt={imageAltText} loading="lazy" />
        ) : (
          // show the image and lazy-load it
          <div className="flag-fallback" />
          // show a blank box so layout stays neat
        )}
      </div>

      <div className="card-body">
        {/* area for the text info */}
        <h2 className="country-name">{displayCountryName}</h2>
        {/* country name */}
        <ul className="meta">
          {/* small list of facts */}
          <li>
            <span className="label">Population:</span> {displayPopulation}
          </li>
          {/* population or dash */}
          <li>
            <span className="label">Capital:</span> {displayCapital}
          </li>
          {/* capital or dash */}
          <li>
            <span className="label">Region:</span> {displayRegion}
          </li>
          {/* region or dash */}
        </ul>
      </div>
    </article>
  ); // done the card
} // finished country card
