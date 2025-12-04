# 📝 Countries App

## 📌 Project Description & Purpose

This project is a full-stack geography app built to help users explore the world in a fun, interactive way.
It features a “Where in the World?” browsing page, detailed country cards, a user profile form, and a personalized Saved Countries dashboard.
Users can save and unsave countries with one click, making it easy to track places they’re interested in.
This project showcases real API usage, data persistence, dynamic rendering, and modern UI design.

## 🚀 Live Site

Check out the app: https://countries-version-5.netlify.app

## 🖼️ Screenshots

Here is where you'll include a screenshot of your project to show it off!

Your instructor will walk you through this process with the rest of the class. Please be patient until the time comes! In the meantime, you can fill out all other sections of this template.

1. Use `Command + Control + Shift + 4` to take a screenshot of your site and copy the screenshot to your clipboard
2. Find your Github README.md file on the Github website
3. Edit the site by clicking on the Pencil icon ✏️
4. Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an `<img>` tag
5. Select "Commit changes..." to save your changes

## ✨ Features

This is what you can do on the app:

- ***
  Discover countries with a dynamic “Where in the World?” interface
- ***
  Save and unsave countries instantly
- ***
  Build a personal list of countries you love
- ***
  Fill out your own user profile
- ***
  Access a clean, well-structured Saved Countries page
- ***
  View rich details for every country including flags, population, capital city, and region

## 🛠️ Tech Stack

**Frontend**

- **Languages:** JavaScript, HTML, CSS
- **Framework:** React
- **Deployment:** Netlify

**Server/API**

- **Languages:** JavaScript (Node.js)
- **Framework:** Express
- **Deployment:** Render

**Database**

- **Languages:** SQL (PostgreSQL)
- **Deployment:** Neon

## 🔹 API Documentation

These are the API endpoints I built:

1. /get-newest-user
2. /get-all-users
3. /get-all-saved-countries
4. /add-one-user
5. /update-one-country-count

Learn more about the API endpoints here: _**https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-3/api-documentation.md**_

## 🗄️ Database Schema

Here's the SQL I used to create my tables:

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  bio VARCHAR NOT NULL
);
CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR NOT NULL UNIQUE
);
CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR NOT NULL UNIQUE,
  count INTEGER NOT NULL
);
```

## 💭 Reflections

**What I learned:** I learned how to build a full-stack application that fetches data from an external API, displays it on the frontend, and saves user selections in a database. I also learned how to connect React to an Express backend, send and receive JSON, and manage state across multiple pages. This project helped me understand how real apps handle routing, forms, and database interactions.

**What I'm proud of:** I’m proud that I built a working app with multiple pages, live API data, and full save/unsave functionality. I’m also proud of how clean the UI feels and how smooth the user flow is from exploring countries to saving favorites. This project pushed me, and I still delivered something real and functional.

**What challenged me:** Connecting the frontend to the backend was the biggest challenge — especially getting the API routes, fetch calls, and database queries to communicate correctly. Debugging state, fixing async issues, and making sure the saved countries updated in real time definitely tested my skills.

**Future ideas for how I'd continue building this project:**

1. Add user authentication so different users can save their own sets of countries
2. Add search, filter, and region sorting
3. Add more detailed country information (languages, currencies, maps, etc.)
4. Improve UI animations and loading states
5. Build a “Visited” and “Want to Visit” list

## 🙌 Credits & Shoutouts

Thanks to Arianna for teaching, supporting, and guiding me through this project!
And thanks to AnnieCannons for giving me the opportunity, structure, and skills to build real-world applications — and Bakari for the extra help and TA support along the way!
