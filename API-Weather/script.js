document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temp");
  const descDisplay = document.getElementById("desc");
  const errorMsgDisplay = document.getElementById("error-msg");

  const API_KEY = "9fd7582fb58a94a6818ddfdf5496662a";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      return;
    }
    // it may thrown in error
    // server/database always in another conitnetn

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError();
    }
  });

  async function fetchWeatherData(city) {
    // gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    console.log(typeof response);
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("City not Found");
    } else {
      const data = await response.json();
      return data;
    }
  }

  function displayWeatherData(weatherData) {
    // display the data
    console.log(weatherData);
    const { name, main, weather } = weatherData;
    cityNameDisplay.textContent = name;
    tempDisplay.textContent = `${main.temp} ˚C`;
    descDisplay.textContent = `Weather: ${weather[0].description}`;
    //// unlock the display
    weatherInfo.classList.remove("hidden");
    errorMsgDisplay.classList.add("hidden");
  }

  function displayError() {
    weatherInfo.classList.add("hidden");
    errorMsgDisplay.classList.remove("hidden");
  }
});
