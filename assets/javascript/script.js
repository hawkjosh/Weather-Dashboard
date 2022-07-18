// Set up global DOM variables
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const history = document.getElementById('search-history');
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

searchBtn.addEventListener('click', searchCity);

function searchCity() {
  city.innerHTML = searchBar.value + ' ' + moment().format('(M/D/YYYY)');
  for (i=0; i<forecastDate.length; i++) {
    forecastDate[i].innerHTML = moment().add(i + 1, 'days').format('M/D/YYYY');
  }

  let queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchBar.value + '&appid=' + APIKey;

  fetch(queryURL).then(function(response) {
    return response.json();
    }).then(function(data) {
      let conversionURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&exclude=minutely,hourly,alerts&appid=' + APIKey + '&units=imperial';
      fetch(conversionURL).then(function(response) {
        return response.json();
      }).then(function(data) {

        // TODO → Need to figure out how to get the icon to line up on the right side of the city name and date...
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
        if (currUVI <= 2) {
          currInfo[3].classList.add('uvi-green');
        } else if (2 < currUVI <= 5) {
          currInfo[3].classList.add('uvi-yellow');
          } else if (5 < currUVI <= 7) {
            currInfo[3].classList.add('uvi-orange');
            } else {
              currInfo[3].classList.add('uvi-red');
              }

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
    })

    // TODO → This needs some more work...
    let prevSearch = document.createElement('button');
    prevSearch.innerHTML = searchBar.value;
    prevSearch.classList.add('history');
    localStorage.setItem('prevSearch', JSON.stringify(searchBar.value));
    let historyCheck = JSON.parse(localStorage.getItem('prevSearch'));
    if (historyCheck !== null) {
      history.appendChild(prevSearch);
    }
}