var apiKey = "82637d580741789f3ab243d8e053d1da";
var searchBtn = document.getElementById("search-btn");
var row = document.getElementById("row");
var textInput = document.getElementById("text-input");
var savedSearches = JSON.parse(localStorage.getItem("savedSearches"));

// if no savedSearches exist, create an array
if (!savedSearches){
    savedSearches = [];
};

// for when it's sunny use bi-sun for the i and bg-success for the card-header
var sunIcon = "bi-sun";
// for when it's raining use bi-cloud-rain for the i and bg-warning for the card-header
var rainIcon = "bi-cloud-rain";
// for when it's snowing use bi-snow for the i and bg-light for the card-header
var snowIcon = "bi-snow";
// for when it's windy use bi-wind for the i and bg-danger for the card-header
var windIcon = "bi-wind";



// a function to save searches to localStorage
var saveSearch = function (){
    var textInputValue = textInput.value;
    savedSearches.push(textInputValue);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
};

// the function which will create a forecast
var createForecast = function (){
    // create the column
    var forecastBody = document.createElement("div");
    forecastBody.setAttribute("class", "col-12");
    // create the card
    var forecastCard = document.createElement("div");
    forecastCard.setAttribute( "class", "card text-light bg-info d-flex justify-content-center align-items-center");
    // create the icon
    var forecastImg = document.createElement("i");
    forecastImg.setAttribute("class", "bi-cloud-rain card-img-top");
    forecastImg.ariaHidden ="true";
    // create the header
    var forecastHead = document.createElement("div");
    forecastHead.setAttribute("class", "card-header text-dark bg-warning w-100 font-weight-bold");
    forecastHead.textContent = "City: ";
    // create the main content area
    var forecastMain = document.createElement("div");
    forecastMain.setAttribute("class", "card-body w-100 font-weight-bold");
    forecastMain.textContent = "Main";
    // create the footer area
    var forecastFooter = document.createElement("div");
    forecastFooter.setAttribute("class", "card-footer w-100 font-weight-bold");
    forecastFooter.textContent = "Footer";

    // append all the created elements into the card
    forecastCard.append(forecastImg)
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

searchBtn.addEventListener("click", createForecast);