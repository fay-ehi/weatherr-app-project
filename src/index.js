function getWeather(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature-number");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector(".date-time");
  dateElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = ` <img
          src=${response.data.condition.icon_url}
          alt="temperature-icon"
          class="temperature-icon"
        />`;
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

searchCity("new york");

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
  if (hour < 1) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
     <div class="blur">
          <div class="weather-forecast-day">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong> <strong>18°</strong>
            </div>
            <div class="weather-forecast-temperature">22°</div>
          </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
