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

searchCity("chicago");
