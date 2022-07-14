// Set up global DOM variables
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const history = document.getElementById('search-history');
const city = document.getElementById('city');
const currDate = document.getElementById('curr-date');
const currIcon = document.getElementById('curr-icon');
const currInfo = document.querySelectorAll('.curr-info');
const forecastDate = document.querySelectorAll('.forecast-date');

function initialDisplay() {
  let search = searchBar.value;
  console.log(search);
  city.innerHTML = search + ' ' + moment().format('(M/D/YYYY)');
  currIcon.innerHTML = '☁️';
  for (i=0; i<forecastDate.length; i++) {
    forecastDate[i].innerHTML = moment().add(i + 1, 'days').format('M/D/YYYY');
  }
}

searchBtn.addEventListener('click', initialDisplay);


// const APIKey = 'dd6c4adf0524e9123c18fdc111337e48';

// let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;


// function searchCity() {
//   city = searchBar.value;
//   console.log(fetch(queryURL));
// }