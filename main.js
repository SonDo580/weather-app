import citiesData from "./world-cities.json" assert { type: "json" };
const cities = citiesData.map((location) => location.name);

const WEATHER_KEY = "a23a2e333fd2e4f2e40a854e266d7ad2";
const GIPHY_KEY = "AdaPGYNfBgmb9TU4RleQTI8KoEvD9pXA";

const weatherDisplay = document.querySelector("#weather");
const tempDisplay = document.querySelector("#temp");
const illustrator = document.querySelector(".illustration img");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", displayWeather);

const locationInput = document.querySelector("#location");
const unitInput = document.querySelector("#unit");

const loading = document.querySelector(".loading");

async function getWeatherData(location, unit) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_KEY}&units=${unit}`
    );
    const data = await response.json();
    return getNeededData(data);
  } catch (err) {
    alert("Something's wrong! Check the console for more information!");
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

  showLoading();
  getWeatherData(location, unit)
    .then((data) => {
      const { weather, temp } = data;
      weatherDisplay.textContent = weather;
      tempDisplay.textContent = temp;

      getIllustration(weather).then((url) => {
        illustrator.src = url;
        illustrator.style.visibility = "visible";
      });
    })
    .then(() => hideLoading());
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
    alert("Something's wrong! Check the console for more information!");
    throw err;
  }
}

function showLoading() {
  loading.style.display = "flex";
}

function hideLoading() {
  loading.style.display = "none";
}
