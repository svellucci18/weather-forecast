// From the <form> element, listen to the "submit"

    // Select <input>, get its value, and provide it to the geo API

// From the <button> container element, listen to the <button> "click"

    // Get the city from the button's data attribute

// Fetch the geo data (lat, lon) (city name) http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

    // q = Name of the city as a query string (key value pairs)
    // limit = 5 cities (optional parameter)
    // appid = Your custom API key (make an account and then add it here)

// Fetch the one call weather data

    // lat
    // lon
    // appid
    // units = imperial
    // exclude = minutely,hourly
    
// Render the weather data to the page