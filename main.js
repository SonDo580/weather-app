const API_KEY = "a23a2e333fd2e4f2e40a854e266d7ad2";

const weatherDisplay = document.querySelector("#weather");
const tempDisplay = document.querySelector("#temp");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", getCurrentWeather);

const locationInput = document.querySelector("#location");

// Need: add error handling
async function getCurrentWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();

  console.log(getNeededData(data));
  return getNeededData(data);
}

function getNeededData(data) {
  const weather = data.weather[0].main;
  const temp = data.main.temp;
  return { weather, temp };
}

function displayWeather() {
  const location = locationInput.value;
  const { weather, temp } = getCurrentWeather(location);
  weatherDisplay.textContent = weather;
  tempDisplay.textContent = temp;
}

getCurrentWeather("hanoi");
