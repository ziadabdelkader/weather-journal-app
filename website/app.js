/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '9010d9daf8e32586a7033ec912159760';
const generate = document.querySelector('#generate');
const zipInput = document.querySelector('#zip');
const feelingsInput = document.querySelector('#feelings');
const tempView = document.querySelector('#temp');
const dateView = document.querySelector('#date');
const contentView = document.querySelector('#content');

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', generateClickHandler);

// Event handler for clicking generate button
async function generateClickHandler() {
    const zipCode = zipInput.value;
    const URL = getURL(zipCode);
    const temp = await getDataFromAPI(URL);
    if(temp){
        await postData('/data', {temp:temp , date:getDate() , feelings:feelingsInput.value});
        updateUI();
    }
}

// Combine zipCode with apiKey to get the required URL
function getURL(zipCode){
    return 'http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&appid='+apiKey;
}

// GET Web API Data (Temp)
async function getDataFromAPI(URL) {
    const response = await fetch(URL);
    try{
        const data = await response.json();
        return  data.main.temp;
    }catch (err){
        window.alert("Invalid Zipcode");
    }
}

// Post new data to the server at given url
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Update the UI with the most recent Data
async function updateUI() {
    const response = await fetch('/data');
    try {
        const data = await response.json();
        tempView.innerHTML = data.temp;
        dateView.innerHTML = data.date;
        contentView.innerHTML = data.feelings;
    }catch (err){
        console.log('error in update UI ',err);
    }
}


// Create a new date instance dynamically with JS
function getDate(){
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();
    return  dd + '/' + mm + '/' + yyyy;
}

