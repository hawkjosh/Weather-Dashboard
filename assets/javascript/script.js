// Set up global DOM variables
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const historyEl = document.getElementById('search-history');
const city = document.getElementById('city');
const cityIcon = document.getElementById('city-icon');
const currDate = document.getElementById('curr-date');
const currInfo = document.querySelectorAll('.curr-info');
const forecastDate = document.querySelectorAll('.forecast-date');
const forecastIcon1 = document.getElementById('forecast-icon1');
const forecastIcon2 = document.getElementById('forecast-icon2');
const forecastIcon3 = document.getElementById('forecast-icon3');
const forecastIcon4 = document.getElementById('forecast-icon4');
const forecastIcon5 = document.getElementById('forecast-icon5');
const forecastInfo = document.getElementById('forecast-info');
const APIKey = 'dd6c4adf0524e9123c18fdc111337e48';

// Created empty array to store searches
let history = [];

// Event listener to run functions once the search button is clicked
searchBtn.addEventListener('click', function(event) {
  event.preventDefault();
  searchCity();
  searchInfo();
})

// Main function to fetch API info and fill in all page information
function searchCity() {
  // Sets the city name and current date in the current weather area
  city.innerHTML = searchBar.value + ' ' + moment().format('(M/D/YYYY)');
  // Sets the date for each of the upcoming five days in the forecast weather area
  for (i=0; i<forecastDate.length; i++) {
    forecastDate[i].innerHTML = moment().add(i + 1, 'days').format('M/D/YYYY');
  }

  // Fetch call using openweathermap API info
  let queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchBar.value + '&appid=' + APIKey;

  fetch(queryURL).then(function(response) {
    return response.json();
    }).then(function(data) {
      let conversionURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&exclude=minutely,hourly,alerts&appid=' + APIKey + '&units=imperial';
      fetch(conversionURL).then(function(response) {
        return response.json();
      }).then(function(data) {

        // Sets current weather info
        let currIcon = data.current.weather[0].icon;
        let iconURL = 'http://openweathermap.org/img/wn/' + currIcon + '@4x.png';
        cityIcon.src = iconURL;

        let currTemp = data.current.temp;
        currInfo[0].innerHTML = currTemp + '℉';

        let currWind = data.current.wind_speed;
        currInfo[1].innerHTML = currWind + ' MPH';

        let currHum = data.current.humidity;
        currInfo[2].innerHTML = currHum + '%';

        let currUVI = data.current.uvi;
        currInfo[3].innerHTML = currUVI + ' of 10';
        // Conditional to color code UV index info
        if (currUVI <= 2) {
          currInfo[3].classList.add('uvi-green');
        } else if (currUVI > 2 && currUVI <= 5) {
          currInfo[3].classList.add('uvi-yellow');
          } else if (currUVI > 5 && currUVI <= 7) {
            currInfo[3].classList.add('uvi-orange');
            } 
          else {
              currInfo[3].classList.add('uvi-red');
              }

        // Sets the icon for each of the upcoming five days in the forecast weather area
        let fiveDayIcon1 = data.daily[1].weather[0].icon;
        let icon1URL = 'http://openweathermap.org/img/wn/' + fiveDayIcon1 + '@2x.png';
        forecastIcon1.src = icon1URL;

        let fiveDayIcon2 = data.daily[2].weather[0].icon;
        let icon2URL = 'http://openweathermap.org/img/wn/' + fiveDayIcon2 + '@2x.png';
        forecastIcon2.src = icon2URL;

        let fiveDayIcon3 = data.daily[3].weather[0].icon;
        let icon3URL = 'http://openweathermap.org/img/wn/' + fiveDayIcon3 + '@2x.png';
        forecastIcon3.src = icon3URL;

        let fiveDayIcon4 = data.daily[4].weather[0].icon;
        let icon4URL = 'http://openweathermap.org/img/wn/' + fiveDayIcon4 + '@2x.png';
        forecastIcon4.src = icon4URL;

        let fiveDayIcon5 = data.daily[5].weather[0].icon;
        let icon5URL = 'http://openweathermap.org/img/wn/' + fiveDayIcon5 + '@2x.png';
        forecastIcon5.src = icon5URL;

        // Sets the temp for each of the upcoming five days in the forecast weather area
        let fiveDayTemp1 = data.daily[1].temp.day;
        forecastInfo.children[0].children[0].children[2].children[0].innerHTML = fiveDayTemp1 + '℉';

        let fiveDayTemp2 = data.daily[2].temp.day;
        forecastInfo.children[1].children[0].children[2].children[0].innerHTML = fiveDayTemp2 + '℉';

        let fiveDayTemp3 = data.daily[3].temp.day;
        forecastInfo.children[2].children[0].children[2].children[0].innerHTML = fiveDayTemp3 + '℉';

        let fiveDayTemp4 = data.daily[4].temp.day;
        forecastInfo.children[3].children[0].children[2].children[0].innerHTML = fiveDayTemp4 + '℉';

        let fiveDayTemp5 = data.daily[5].temp.day;
        forecastInfo.children[4].children[0].children[2].children[0].innerHTML = fiveDayTemp5 + '℉';

        // Sets the wind speed for each of the upcoming five days in the forecast weather area
        let fiveDayWind1 = data.daily[1].wind_speed;
        forecastInfo.children[0].children[0].children[3].children[0].innerHTML = fiveDayWind1 + ' MPH';

        let fiveDayWind2 = data.daily[2].wind_speed;
        forecastInfo.children[1].children[0].children[3].children[0].innerHTML = fiveDayWind2 + ' MPH';

        let fiveDayWind3 = data.daily[3].wind_speed;
        forecastInfo.children[2].children[0].children[3].children[0].innerHTML = fiveDayWind3 + ' MPH';

        let fiveDayWind4 = data.daily[4].wind_speed;
        forecastInfo.children[3].children[0].children[3].children[0].innerHTML = fiveDayWind4 + ' MPH';

        let fiveDayWind5 = data.daily[5].wind_speed;
        forecastInfo.children[4].children[0].children[3].children[0].innerHTML = fiveDayWind5 + ' MPH';

        // Sets the humidity for each of the upcoming five days in the forecast weather area
        let fiveDayHum1 = data.daily[1].humidity;
        forecastInfo.children[0].children[0].children[4].children[0].innerHTML = fiveDayHum1 + '%';

        let fiveDayHum2 = data.daily[2].humidity;
        forecastInfo.children[1].children[0].children[4].children[0].innerHTML = fiveDayHum2 + '%';

        let fiveDayHum3 = data.daily[3].humidity;
        forecastInfo.children[2].children[0].children[4].children[0].innerHTML = fiveDayHum3 + '%';

        let fiveDayHum4 = data.daily[4].humidity;
        forecastInfo.children[3].children[0].children[4].children[0].innerHTML = fiveDayHum4 + '%';

        let fiveDayHum5 = data.daily[5].humidity;
        forecastInfo.children[4].children[0].children[4].children[0].innerHTML = fiveDayHum5 + '%';
      })
    });
}

// Function to help manipulate searches to the DOM
function renderHistory() {
  // Clears the search history area
  historyEl.innerHTML = '';

  // Creates a new <button> element for each search
  for (var i=0; i<history.length; i++) {
    var prevSearches = history[i];

    var historyBtn = document.createElement('button');
    historyBtn.innerText = prevSearches;
    historyBtn.setAttribute('data-index', i);
    historyBtn.classList.add('btn', 'btn-secondary', 'col-12', 'm-2');

    historyEl.appendChild(historyBtn);
  }
}

// Function to run on page load
function init() {
  // Get stored searches from local storage
  var storedHistory = JSON.parse(localStorage.getItem('history'));

  // If stored searches retrieved from local storage, update history array to it
  if (storedHistory !== null) {
    history = storedHistory;
  }

  renderHistory();
}

// Function to save searches to local storage
function saveHistory() {
  localStorage.setItem('history', JSON.stringify(history));
}

// Function to add new searches to history array and clear search bar input
function searchInfo() {
  var searchInput = searchBar.value.trim();
  if (searchInput === '') {
    return;
  }

  history.push(searchInput);
  searchInput.value = '';

  saveHistory();
  renderHistory();
}

init();