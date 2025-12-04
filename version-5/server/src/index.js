/* --------------------------------
// Server/API for Countries App Version 4

// DB Fiddle Link:
// https://www.db-fiddle.com/f/ijdjLrN7d7ZqwYauNEDpgR/9
// ----------------------------------*/

/*----------------------------------
// Boilerplate Code to Set Up Server
// ----------------------------------*/

import express from "express";
import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // use SSL encryption when connecting to the database
});
const app = express();
app.use(express.json());
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`);
});

/*----------------------------------
// Helper Functions
// ----------------------------------*/

async function getNewestUser() {
  const dataText = `
    SELECT * FROM users
    ORDER BY user_id DESC
    LIMIT 1
  `;
  const data = await db.query(dataText);
  return data.rows;
}

// get all users from the users table
async function getAllUsers() {
  const dataText = `
    SELECT * FROM users
  `;
  const data = await db.query(dataText);
  return data.rows;
}

// add one user
async function addOneUser(name, country_name, email, bio) {
  const dataText = `
    INSERT INTO users (name, country_name, email, bio)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const data = await db.query(dataText, [name, country_name, email, bio]);
  return data.rows[0];
}

// get all saved countries
async function getAllSavedCountries() {
  const dataText = `
    SELECT * FROM saved_countries
  `;
  const data = await db.query(dataText);
  return data.rows;
}

// save one country
async function saveOneCountry(country_name) {
  const dataText = `
    INSERT INTO saved_countries (country_name)
    VALUES ($1)
    ON CONFLICT (country_name) DO NOTHING
    RETURNING *
  `;
  const data = await db.query(dataText, [country_name]);
  return data.rows[0] || null;
}

// Update one country count
async function updateOneCountryCount(country_name) {
  const dataText = `
    INSERT INTO country_counts (country_name, count)
    VALUES ($1, 1)
    ON CONFLICT (country_name)
    DO UPDATE SET count = country_counts.count + 1
    RETURNING count
  `;
  const data = await db.query(dataText, [country_name]);
  return data.rows[0].count;
}

// unsave
async function unsaveOneCountry(countryName) {
  const deleteCountryText = `
    DELETE FROM saved_countries
    WHERE country_name = $1
    RETURNING *
  `;
  const deleteCountryData = await db.query(deleteCountryText, [countryName]);
  return deleteCountryData.rows[0];
}

/*----------------------------------
// API Endpoints
// ----------------------------------*/

// get /get-newest-user
app.get("/get-newest-user", async (req, res) => {
  const newestUserRows = await getNewestUser();
  res.json(newestUserRows);
});

// get /get-all-users
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

// post /add-one-user
app.post("/add-one-user", async (req, res) => {
  const data = req.body;
  await addOneUser(data.name, data.country_name, data.email, data.bio);
  res.send("Success: user was added");
});

// get /get-all-saved-countries
app.get("/get-all-saved-countries", async (req, res) => {
  const data = await getAllSavedCountries();
  res.json(data);
});

// post /save-one-country
app.post("/save-one-country", async (req, res) => {
  const data = req.body;
  await saveOneCountry(data.country_name);
  res.send("Success: country was saved");
});

// post /update-one-country-count
app.post("/update-one-country-count", async (req, res) => {
  const data = req.body;
  const dataCount = await updateOneCountryCount(data.country_name);
  res.json({ count: dataCount });
});

app.post("/unsave-one-country", async (req, res) => {
  const data = req.body;
  await unsaveOneCountry(data.country_name);
  res.send("Success! The country is unsaved.");
});
