const API_KEY = 'a23a2e333fd2e4f2e40a854e266d7ad2';

async function getCurrentWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
    const weatherData = await response.json();
    
    console.log(weatherData);
}

getCurrentWeather('london');