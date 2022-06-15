var apiKey = "82637d580741789f3ab243d8e053d1da";
var searchBtn = document.getElementById("search-btn");
var row = document.getElementById("row");
var textInput = document.getElementById("text-input");
var savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
var weatherApiRootUrl = 'https://api.openweathermap.org';

var getCoordinates = function (){
    var city = textInput.value;
    var apiUrl = weatherApiRootUrl + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    fetch (apiUrl).then(function (results){
        return results.json();
    })
    .then(function (data){
        console.log(data);
        getWeather(data[0]);
    })
};

var getWeather = function (data){
    var lat = data.lat;
    var lon = data.lon;
    var city = data.name;
    var apiUrl = weatherApiRootUrl + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey;
    fetch (apiUrl).then(function (results){
        return results.json();
    })
    .then(function (data){
        console.log(data);
        createForecast(data, city);
    })
}

// if no savedSearches exist, create an array
if (!savedSearches){
    savedSearches = [];
};


// a function to save searches to localStorage
var saveSearch = function (){
    var textInputValue = textInput.value;
    savedSearches.push(textInputValue);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
};

// create a forecast whenever the button is clicked
var createForecast = function (data, city){
    // create the column
    var forecastBody = document.createElement("div");
    forecastBody.setAttribute("class", "col-lg-6 col-12");
    // create the card
    var forecastCard = document.createElement("div");
    forecastCard.setAttribute( "class", "card text-light bg-info d-flex align-items-center");
    // create the header
    var forecastHead = document.createElement("div");
    forecastHead.setAttribute("class", "card-header text-dark bg-warning w-100 font-weight-bold");
    
    // put the current date inside the text
    var currentDate = moment.unix(data.current.dt).format('dddd, MMMM Do, YYYY h:mm:ss A');
    // get the icons
    var iconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    var iconDescription = data.current.weather[0].description;

    // put the current input value inside the text
    var currentInput = textInput.value;
    forecastHead.textContent = "City: " + currentInput + " --- Today is " + currentDate;
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weather-img");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    // create the main content area
    var forecastMain = document.createElement("div");
    forecastMain.setAttribute("class", "card-body w-100 font-weight-bold");
    forecastMain.textContent = "Current Temp: " + data.current.temp + "F | Current Humidity: " + data.current.humidity + "%";
    // create the footer area
    var forecastFooter = document.createElement("div");
    // give the footer a special colour depending on UV index favourability
    if (data.current.uvi <= 3){
        forecastFooter.style.color = "#ffffff";
    } if (data.current.uvi > 3 && data.current.uvi <= 6){
        forecastFooter.style.color = "#a8d112";
    } if (data.current.uvi > 6){
        forecastFooter.style.color = "#e21313";
    }
    forecastFooter.setAttribute("class", "card-footer w-100 font-weight-bold");
    forecastFooter.textContent = "UV Index: " + data.current.uvi + " | Current Wind Speed: " + data.current.wind_speed + " MPH";

    // 1st grab uvi index  (add colour if less then 3), for current, data.daily[0].temp.day
    // make card that accepts 5 day, and loops through and renders each one
    // http://bit.ly/students-eval
 

    // append all the created elements into the card
    forecastCard.append(weatherIcon);
    forecastCard.append(forecastHead);
    forecastCard.append(forecastMain);
    forecastCard.append(forecastFooter);
    // append the card to the column
    forecastBody.appendChild(forecastCard);
    // append the column to the row
    row.appendChild(forecastBody);


    // save the search every time the forecast is created
    saveSearch();
};

searchBtn.addEventListener("click", getCoordinates);