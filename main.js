const API_KEY = 'a23a2e333fd2e4f2e40a854e266d7ad2';

async function getCurrentWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const weatherData = getNeededData(data);
    console.log(weatherData);
}

function getNeededData(data) {
    const weather = data.weather[0].main;
    const temp = data.main.temp;
    return { weather, temp };
}

getCurrentWeather('hanoi');