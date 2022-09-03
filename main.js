const API_KEY = "a23a2e333fd2e4f2e40a854e266d7ad2";

const weatherDisplay = document.querySelector("#weather");
const tempDisplay = document.querySelector("#temp");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", displayWeather);

const locationInput = document.querySelector("#location");

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return getNeededData(data);
  } catch (err) {
    throw err;
  }
}

function getNeededData(data) {
  const weather = data.weather[0].main;
  const temp = data.main.temp;
  return { weather, temp };
}

function displayWeather() {
  const location = locationInput.value;

  getWeatherData(location).then((data) => {
    const { weather, temp } = data;
    weatherDisplay.textContent = weather;
    tempDisplay.textContent = temp;
  });
}
