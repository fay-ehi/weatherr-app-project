function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function getWeather(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature-number");
  let temperatureCelsius = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperatureCelsius;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector(".date-time");
  dateElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `
    <img
      src=${response.data.condition.icon_url}
      alt="temperature-icon"
      class="temperature-icon"
    />
  `;

  let unit = document.querySelector(".temperature-unit");
  unit.innerHTML = "°C |";
  farenheitButton.innerHTML = "°F";
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "8d8ob1t4a343b0f13b62705ad423c092";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-form");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector(".searchForm");
searchElement.addEventListener("submit", handleSearch);

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "8d8ob1t4a343b0f13b62705ad423c092";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function changeUnit() {
  let temperatureElement = document.querySelector("#temperature-number");
  let unit = document.querySelector(".temperature-unit");

  if (unit.innerHTML === "°C |") {
    let currentCelsius = parseInt(temperatureElement.innerHTML, 10);
    let fahrenheitTemp = celsiusToFahrenheit(currentCelsius);

    temperatureElement.innerHTML = fahrenheitTemp;
    unit.innerHTML = "°F |";
    farenheitButton.innerHTML = "°C";
  } else {
    let currentFahrenheit = parseInt(temperatureElement.innerHTML, 10);
    let celsiusTemp = fahrenheitToCelsius(currentFahrenheit);

    temperatureElement.innerHTML = celsiusTemp;
    unit.innerHTML = "°C |";
    farenheitButton.innerHTML = "°F";
  }
}

let farenheitButton = document.querySelector(".farenheit-button");
farenheitButton.addEventListener("click", changeUnit);

searchCity("new york");
