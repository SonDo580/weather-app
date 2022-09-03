const WEATHER_KEY = "a23a2e333fd2e4f2e40a854e266d7ad2";
const GIPHY_KEY = "AdaPGYNfBgmb9TU4RleQTI8KoEvD9pXA";

const weatherDisplay = document.querySelector("#weather");
const tempDisplay = document.querySelector("#temp");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", displayWeather);

const locationInput = document.querySelector("#location");
const unitInput = document.querySelector("#unit");

async function getWeatherData(location, unit) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_KEY}&units=${unit}`
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
  const unit = unitInput.value === "1" ? "metric" : "imperial";

  getWeatherData(location, unit).then((data) => {
    const { weather, temp } = data;
    weatherDisplay.textContent = weather;
    tempDisplay.textContent = temp;
  });
}

async function getIllustration(weather) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${weather}`,
      { mode: "cors" }
    );
    const imageData = await response.json();
    return imageData.data.images.original.url;
  } catch (err) {
    throw err;
  }
}
