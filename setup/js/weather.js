{/* <reference types="../../@types/jquery" /> */}
//search input
let searchInput = document.getElementById("search");
//button
let submitBtn = document.getElementById("submit");

//today vars
let todayName = document.getElementById("today-date-dayName");
let todayNo = document.getElementById("today-date-dayNo");
let todayMonth = document.getElementById("today-date-dayMonth");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-conditionImg");
let todayConditiontxt = document.getElementById("today-conditiontxt");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");


//next vars
let nextDayName = document.getElementsByClassName("next-dayName");
let nextConditionImg = document.getElementsByClassName ("next-conditionImg");
let nextConditiontxt = document.getElementsByClassName ("next-conditiontxt");
let nextMaxtemp = document.getElementsByClassName("next-Maxtemp");
let nextMintemp = document.getElementsByClassName("next-Mintemp");




//API Data 
async function weatherAPI(city) {
   let responseAPI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=552c570cbb7b47d7b43222941241001&q=${city}&days=3`);
   let weatherData = await responseAPI.json();  
   return weatherData
}



//display today data
function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:'long'});
    todayNo.innerHTML = todayDate.getDate();
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:'long'});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", 'https:'+data.current.condition.icon);
    todayConditiontxt.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph+" km/h";
    direction.innerHTML = data.current.wind_dir;

}

//display next day data
function displayNextData(data) {
    let nextDayData = data.forecast.forecastday;

    for (let i = 0; i < 2 ; i++) {
        let nextDate = new Date(nextDayData[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:'long'});
        nextMaxtemp[i].innerHTML = nextDayData[i+1].day.maxtemp_c;
        nextMintemp[i].innerHTML = nextDayData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src",'https:'+nextDayData[i+1].day.condition.icon);
        nextConditiontxt[i].innerHTML = nextDayData[i+1].day.condition.text;
        
    }
    
}


//callback functions

async function callbackFunctions(city="cairo") {
    let data = await weatherAPI(city);
    displayTodayData(data);
    displayNextData(data);
    
}
callbackFunctions(); 


submitBtn.addEventListener( 'click' , function() {
    callbackFunctions(searchInput.value)
})