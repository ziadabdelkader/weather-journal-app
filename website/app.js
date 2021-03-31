/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '9010d9daf8e32586a7033ec912159760';
const generate = document.querySelector('#generate');
const zipInput = document.querySelector('#zip');
// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', generateClickHandler);

function getURL(zipCode){
    return 'http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&appid='+apiKey;
}
/* Function to GET Web API Data*/
async function getDataFromAPI(URL) {
    let data = await fetch(URL);
    data = await data.json();
    return  data.main.temp;
}
/* Function called by event listener */
async function generateClickHandler() {
    const zipCode = zipInput.value;
    const URL = getURL(zipCode);
    const temp = await getDataFromAPI(URL);
    console.log('temp = ',temp);
}

// Create a new date instance dynamically with JS
function getDate(){
    const currentDate = new Date();
    return currentDate.getMonth() + '.' + currentDate.getDate() + '.' + currentDate.getFullYear();
}





/* Function to POST data */


/* Function to GET Project Data */