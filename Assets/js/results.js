//Global Scope Variables 

//Variable to Access Form
var form = document.querySelector('form');
//Variable to Access Search Input by Grabbing ID
var input = document.getElementById('search-input');
//Variable to Access Main Section
var view = document.querySelector('main');
//Styling to Set Main Section to take up 100% of viewport width and height (eliminates unneccessary white space)
view.style = 'width: 100vw; height: 100vh';

//Undefined globalQuery variable used later in getParams function
var globalQuery;
//Variable that stores an empty array that is used later in various functions
var InputArray = [];

//Function that grabs ids of all the buttons in previous searches section from html page and sets their text content and values
function previoussearch () {
//Button Variables
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var button5 = document.getElementById('button5');
var button6 = document.getElementById('button6');
var button7 = document.getElementById('button7');
var button8 = document.getElementById('button8');
//Array of All Button Variables
var buttons = [button1, button2, button3, button4, button5, button6, button7, button8];

//Setting textContent of Buttons by Pulling from Input Array Values
button1.textContent= InputArray[0];
button2.textContent= InputArray[1];
button3.textContent= InputArray[2];
button4.textContent= InputArray[3];
button5.textContent= InputArray[4];
button6.textContent= InputArray[5];
button7.textContent= InputArray[6];
button8.textContent= InputArray[7];

//For Loop that Detects if an Input Array Value is Present. If so, it removes the hidden styling of the button so it can be present on webpage
for (var i = 0; i < buttons.length; i++) {
if (InputArray[i]) {
buttons[i].style = '';
}
}
//Event listeners that takes the text content of a button and inserts it into search bar when it is clicked on
button1.addEventListener ('click', function () {
input.value = button1.textContent;
});

button2.addEventListener ('click', function () {
input.value = button2.textContent;
});

button3.addEventListener ('click', function () {
input.value = button3.textContent;
});

button4.addEventListener ('click', function () {
input.value = button4.textContent;
});

button5.addEventListener ('click', function () {
input.value = button5.textContent;
});

button6.addEventListener ('click', function () {
input.value = button6.textContent;
});

button7.addEventListener ('click', function () {
input.value = button7.textContent;
});

button8.addEventListener ('click', function () {
input.value = button8.textContent;
});


}

//Function that saves inputs into local storage
function saveme() {
   // Limit the number of elements to five
   if (InputArray.length > 8) {
    InputArray.shift(); // Remove the oldest element
  }
  //Saves Inputs to Local Storage in Input Array
  localStorage.setItem('InputArray', JSON.stringify(InputArray));
  previoussearch();
}
//Function that gets the search Parameters (Starts the entire execution of the JavaScript File)
function getParams() {
  var searchParams = document.location.search.substring(1);
  console.log(searchParams);
  var query = searchParams.split('=').pop();
  globalQuery = query;
  InputArray.push(globalQuery);
  saveme();
  searchApi(query);
}

// Retrieve previous query values from localStorage
var storedInputArray = localStorage.getItem('InputArray');
if (storedInputArray) {
  InputArray = JSON.parse(storedInputArray);
}

getParams();

//Function that takes the search parameters and inserts it into a requestUrl that is used to fetch data from the API
  function searchApi(query) {
    var Url = "https://api.openweathermap.org/geo/1.0/direct?q=";
    var requestUrl = Url + query + "&appid=8b61f61c77bff2de3b8dbec4350913b6";

    console.log(requestUrl);

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var latitude = data[0].lat;
        console.log(latitude);
        var longitude = data[0].lon;
        console.log(longitude);
        console.log("Weather Results for: " + query);
        displayApi(query, latitude, longitude);
      });
  }

  function displayApi(query, latitude, longitude) {
    //IDs for Current Weather Section
    var city = document.getElementById('City-Name');
    var weatherstatus;
    var currenttemp = document.getElementById('current-temp');
    var currenthumidity = document.getElementById('current-humidity');
    var currentwind = document.getElementById('current-wind');


  //Function that's called to ensure that the current time is always being displayed and is updated continuously
  function currentheader() {
  var reformatDate = dayjs().format('MM/DD/YYYY');
  city.textContent = query + ' ' + "(" + reformatDate + ")";
  }
        
  currentheader();
  setInterval(currentheader, 1000);

    //Current Weather Data Fetch Request
    var currentdataUrl = "https://api.openweathermap.org/data/2.5/weather?";
    var currentdataRequestUrl = currentdataUrl + "lat=" + latitude + "&" + "lon=" + longitude + "&units=imperial" + "&appid=8b61f61c77bff2de3b8dbec4350913b6";
    fetch(currentdataRequestUrl)
    .then(function (response) {
        return response.json();
     })
    .then (function (data) {
     console.log('Current Weather: ');
     console.log(data);
     weatherstatus = data.weather[0].main;
     currenttemp.textContent = 'Temperature: ' + data.main.temp + ' °F';
     currenthumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
     currentwind.textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
    });
    //5 Day Forecast Fetch Request
    var futuredataUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    var dataRequestUrl = futuredataUrl + "lat=" + latitude + "&" + "lon=" + longitude + "&units=imperial" + "&appid=8b61f61c77bff2de3b8dbec4350913b6";
    fetch(dataRequestUrl)
       .then(function (response) {
           return response.json();
        })
       .then (function (data) {
        console.log('5 Day Forecast: ');
        console.log(data);




 //Dates
var date1 = dayjs(data.list[3].dt_txt).format('MM/DD/YYYY');
var date2 = dayjs(data.list[9].dt_txt).format('MM/DD/YYYY');
var date3 = dayjs(data.list[21].dt_txt).format('MM/DD/YYYY');
var date4 = dayjs(data.list[30].dt_txt).format('MM/DD/YYYY');
var date5 = dayjs(data.list[39].dt_txt).format('MM/DD/YYYY');
var dateset = [date1, date2, date3, date4, date5];

// Weather Status
var weather1 = data.list[3].weather[0].main;
var weather2 = data.list[9].weather[0].main;
var weather3 = data.list[21].weather[0].main;
var weather4 = data.list[30].weather[0].main;
var weather5 = data.list[39].weather[0].main;
var weatherarray = [weather1, weather2, weather3, weather4, weather5, weatherstatus];

//Variables for Weather Status Images
var snow = './Assets/images/snow.png';
var rain = './Assets/images/rain.png';
var clouds = './Assets/images/cloud.png';
var clear = './Assets/images/sun.png';

//For loop that automatically sets an image to display based on weather condition for a particular day
for (var i = 0; i < weatherarray.length; i++) {
  var img = document.querySelectorAll('img')[i];
  img.style = "width: 100px; height: 100px; align-items: center;";
  
  if (weatherarray[i] === 'Rain') {
    img.setAttribute('src', rain);
  } else if (weatherarray[i] === 'Clouds') {
    img.setAttribute('src', clouds);
  } else if (weatherarray[i] === 'Snow') {
    img.setAttribute('src', snow);
  } else if (weatherarray[i] === 'Clear') {
    img.setAttribute('src', clear);
  }
}

    //Temperature
    var tem1 = 'Temperature: ' + data.list[3].main.feels_like + "°F";
    var tem2 = 'Temperature: ' + data.list[9].main.feels_like + "°F";
    var tem3 = 'Temperature: ' + data.list[21].main.feels_like + "°F";
    var tem4 = 'Temperature: ' + data.list[30].main.feels_like + "°F";
    var tem5 = 'Temperature: ' + data.list[39].main.feels_like + "°F";
    var temset = [tem1, tem2, tem3, tem4, tem5];

    //Humidity
    var hum1 = 'Humidity: ' + data.list[3].main.humidity + "%";
    var hum2 = 'Humidity: ' + data.list[9].main.humidity + "%";
    var hum3 = 'Humidity: ' + data.list[21].main.humidity + "%";
    var hum4 = 'Humidity: ' + data.list[30].main.humidity + "%";
    var hum5 = 'Humidity: ' + data.list[39].main.humidity + "%";
    var humidset = [hum1, hum2, hum3, hum4, hum5];

    //Wind Speed
    var win1 = 'Wind Speed: ' + data.list[3].wind.speed + " MPH";
    var win2 = 'Wind Speed: ' + data.list[9].wind.speed + " MPH";
    var win3 = 'Wind Speed: ' + data.list[21].wind.speed + " MPH";
    var win4 = 'Wind Speed: ' + data.list[30].wind.speed + " MPH";
    var win5 = 'Wind Speed: ' + data.list[39].wind.speed + " MPH";
    var windset = [win1, win2, win3, win4, win5];

    //HTML Date Variables + Array
    var day1 = document.getElementById('Date1');
    var day2 = document.getElementById('Date2');
    var day3 = document.getElementById('Date3');
    var day4 = document.getElementById('Date4');
    var day5 = document.getElementById('Date5');
    var days = [day1, day2, day3, day4, day5];

    //HTML Temperature Variables + Array
    var temp1 = document.getElementById('Temp1');
    var temp2 = document.getElementById('Temp2');
    var temp3 = document.getElementById('Temp3');
    var temp4 = document.getElementById('Temp4');
    var temp5 = document.getElementById('Temp5');
    var temps = [temp1, temp2, temp3, temp4, temp5];

    //HTML Wind Speed Variables + Array
    var wind1 = document.getElementById('Wind1');
    var wind2 = document.getElementById('Wind2');
    var wind3 = document.getElementById('Wind3');
    var wind4 = document.getElementById('Wind4');
    var wind5 = document.getElementById('Wind5');
    var winds = [wind1, wind2, wind3, wind4, wind5];

    //HTML Humidity Variables + Array
    var humid1 = document.getElementById('Humid1');
    var humid2 = document.getElementById('Humid2');
    var humid3 = document.getElementById('Humid3');
    var humid4 = document.getElementById('Humid4');
    var humid5 = document.getElementById('Humid5');
    var humids = [humid1, humid2, humid3, humid4, humid5];

//For loop that sets the textcontent for each variable in the days array
 for (var i = 0; i < days.length; i++) {
 days[i].textContent = dateset[i];
 }
//For loop that sets the textcontent for each variable in the temps array
 for (var i = 0; i < temps.length; i++) {
  temps[i].textContent = temset[i];
  }
//For loop that sets the textcontent for each variable in the winds array
  for (var i = 0; i < winds.length; i++) {
    winds[i].textContent = windset[i];
    }
//For loop that sets the textcontent for each variable in the humids array
    for (var i = 0; i < humids.length; i++) {
      humids[i].textContent = humidset[i];
      }
    


        //Date
        console.log("Date: " + data.list[0].dt_txt);
        //Weather Status
        console.log("Weather Status: " + data.list[0].weather[0].main);
        //Temperature
        console.log("Temperature: " + data.list[0].main.feels_like + "°F");
        //Wind Speed
        console.log("Wind Speed: " + data.list[0].wind.speed + " MPH");
        //Humidity
        console.log("Humidity: " + data.list[0].main.humidity + "%");
       });
  }

//Ensures that after results are displayed that the search bar value is cleared
input.value = ""; 

//Event Listener that restarts the entire process of searching for results when submit button is clicked
form.addEventListener('submit', function(event) {
//Prevent Refresh
event.preventDefault();
//Sets value of search input as the user input variable
var userInput = input.value;
//Conditional Statement that runs results function is userInput is present, otherwise display alert message designating that a value must be entered
if (userInput) {
window.location.href = "./search.html?search=" + userInput;
} else {
window.alert ('Please enter a city or county.');
}
});

