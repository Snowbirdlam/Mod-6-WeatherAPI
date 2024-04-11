const goCountry = document.querySelector(".countryName");
const searchHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

const dated1 = document.querySelector(".date1");
const dated2 = document.querySelector(".date2");
const dated3 = document.querySelector(".date3");
const dated4 = document.querySelector(".date4");
const dated5 = document.querySelector(".date5");

const Day1 = document.querySelector(".Temp1");
const Day2 = document.querySelector(".Temp2");
const Day3 = document.querySelector(".Temp3");
const Day4 = document.querySelector(".Temp4");
const Day5 = document.querySelector(".Temp5");

const humid1 = document.querySelector(".humidity1");
const humid2 = document.querySelector(".humidity2");
const humid3 = document.querySelector(".humidity3");
const humid4 = document.querySelector(".humidity4");
const humid5 = document.querySelector(".humidity5");

const weathering1 = document.querySelector(".weather1");
const weathering2 = document.querySelector(".weather2");
const weathering3 = document.querySelector(".weather3");
const weathering4 = document.querySelector(".weather4");
const weathering5 = document.querySelector(".weather5");

const speeding1 = document.querySelector(".windSpeed1");
const speeding2 = document.querySelector(".windSpeed2");
const speeding3 = document.querySelector(".windSpeed3");
const speeding4 = document.querySelector(".windSpeed4");
const speeding5 = document.querySelector(".windSpeed5");

function getAPI(city) {
  const searchBar = document.getElementById("searchInput");
  const cityName = city || searchBar.value.trim();

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const requestCity = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=64628cb92ba6fdcb031f5b980e145cff`;

  const cityDisplay = document.getElementById("Container");
  const fiveDayForecast = document.getElementById("5D-row");

  fetch(requestCity)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (!city) {
            searchHistory.push(cityName);
            localStorage.setItem("cityHistory", JSON.stringify(searchHistory));
            renderSearchHistory();
          }
          console.log("works");
          processData(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
}

function processData(data) {
  console.log("Processing data:", data);

  const countryName = data.city.country;
  const cityName = data.city.name;

  const dating1 = data.list[0].dt_txt;
  const dating2 = data.list[8].dt_txt;
  const dating3 = data.list[16].dt_txt;
  const dating4 = data.list[24].dt_txt;
  const dating5 = data.list[32].dt_txt;

  const temp1 = data.list[0].main.temp;
  const temp2 = data.list[8].main.temp;
  const temp3 = data.list[16].main.temp;
  const temp4 = data.list[24].main.temp;
  const temp5 = data.list[32].main.temp;

  const wetness1 = data.list[0].main.humidity;
  const wetness2 = data.list[8].main.humidity;
  const wetness3 = data.list[16].main.humidity;
  const wetness4 = data.list[24].main.humidity;
  const wetness5 = data.list[32].main.humidity;

  const icon1 = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
  const icon2 = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png`;
  const icon3 = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png`;
  const icon4 = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png`;
  const icon5 = `https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}.png`;

  const fastSlow1 = data.list[0].wind.speed;
  const fastSlow2 = data.list[8].wind.speed;
  const fastSlow3 = data.list[16].wind.speed;
  const fastSlow4 = data.list[24].wind.speed;
  const fastSlow5 = data.list[32].wind.speed;

  cityName.textContent = "City: " + cityName;
  goCountry.textContent = "Country: " + countryName;
  weathering1.src = icon1;
  dated1.textContent = "Date and Time: " + dating1;
  Day1.textContent = "Today's temperature: " + temp1 + " F";
  humid1.textContent = "Humidity:" + wetness1;
  (speeding1.textContent = "Wind Speed: " + fastSlow1), "mph";

  weathering2.src = icon2;
  dated2.textContent = "Date and Time: " + dating2;
  Day2.textContent = "Tomorrow's temperature: " + temp2 + " F";
  humid2.textContent = "Humidity:" + wetness2;
  (speeding2.textContent = "Wind Speed: " + fastSlow2), "mph";

  weathering3.src = icon3;
  dated3.textContent = "Date and Time: " + dating3;
  Day3.textContent = "Day 3 temperature: " + temp3 + " F";
  humid3.textContent = "Humidity:" + wetness3;
  (speeding3.textContent = "Wind Speed: " + fastSlow3), "mph";

  weathering4.src = icon4;
  dated4.textContent = "Date and Time: " + dating4;
  Day4.textContent = "Day 4 temperature: " + temp4 + " F";
  humid4.textContent = "Humidity:" + wetness4;
  (speeding4.textContent = "Wind Speed: " + fastSlow4), "mph";

  weathering5.src = icon5;
  dated5.textContent = "Date and Time: " + dating5;
  Day5.textContent = "Day 5 temperature: " + temp5 + " F";
  humid5.textContent = "Humidity:" + wetness5;
  (speeding5.textContent = "Wind Speed: " + fastSlow5), "mph";
}

function renderSearchHistory() {
  const searchWeatherContainer = document.querySelector(".searchWeather");
  searchWeatherContainer.innerHTML = "";

  for (let i = searchHistory.length - 1; i >= 0; i--) {
    const btn = document.createElement("button");
    btn.classList.add("appendCityName");
    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchWeatherContainer.appendChild(btn);

    btn.addEventListener("click", function (e) {
      const city = e.target.dataset.search;
      getAPI(city);
    });
  }
}

renderSearchHistory();
