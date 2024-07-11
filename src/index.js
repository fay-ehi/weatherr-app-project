function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-form");

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = searchInput.value;
}

let searchElement = document.querySelector(".searchForm");
searchElement.addEventListener("submit", searchCity);
