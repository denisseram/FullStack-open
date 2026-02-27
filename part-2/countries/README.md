# Data for Countries - Exercise 2.18

This application allows you to search and view information about different countries using the REST Countries API.

## Features

- Search for countries by name
- Display "Too many matches" message when more than 10 countries match
- Show list of matching countries when 2-10 countries match
- Display detailed country information when only 1 country matches:
  - Country name
  - Capital city
  - Area
  - Languages
  - Flag

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## How to Use

1. Type a country name in the search field
2. The application will automatically filter and display matching countries
3. If multiple countries are shown, click the "show" button next to a country name to view its details

## API Used

- REST Countries API: https://studies.cs.helsinki.fi/restcountries/
