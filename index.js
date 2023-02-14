let kills = document.getElementById('kills');
let deaths = document.getElementById('deaths');
let assists = document.getElementById('assists');
let killsArr = [];
let deathsArr = [];
let assistsArr = [];
let killsArrFiltered = [];
let deathsArrFiltered = [];
let assistsArrFiltered = [];
let gamesCount = 0;
const form = document.getElementById("form");
const erroEl = document.getElementById('error-message');
const countEl = document.getElementById("games-count");
const inputNames = ['kills', 'deaths', 'assists'];
let validFields = 0;

const inputToNumber = (arr) => arr.map(item => {
    return parseInt(item)
})


function validateInputs(inputName) {
    
    erroEl.textContent = '';

    switch(true) {
        case (inputName.value === '') :
            return 'fields cannot be empty';
        case (inputName.value.includes('.')) :
            return 'use integers only'; 
        case (inputName.value.length > 2) :
            return 'length should not be more than 2 degits';
        case (Math.sign(inputName.value) === 1) :
            validFields++
            break;
        case (Math.sign(inputName.value) === -1) :
            return 'enter positive numbers only'; 
        default:    
            return 'enter number';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    validFields = 0;
    
    for(let i = 0; i < inputNames.length; i++) {
        inputName = inputNames[i];
        const inputEl = document.getElementById(inputName);
        const error = validateInputs(form[inputName])
        
        if(error) {
            erroEl.textContent = error;
            inputEl.classList.add('input-error-style');
            break;
        } else {
            inputEl.classList.remove('input-error-style');
        }
    }
    
    validFields === 3 ? submitInputValue() : null;
})

function submitInputValue() {
    gamesCount += 1;
    countEl.textContent = gamesCount;

    killsArr.push(kills.value);
    killsArrFiltered = inputToNumber(killsArr);

    deathsArr.push(deaths.value);
    deathsArrFiltered = inputToNumber(deathsArr);

    assistsArr.push(assists.value);
    assistsArrFiltered = inputToNumber(assistsArr);

    kills.value = '';
    deaths.value = '';
    assists.value = '';
}

const sum = (arr) => arr.reduce(
    (acc, cur) => acc + cur, 
    0
  );

const average = (arr) => arr.length === 0 
? 0 
: sum(arr) / arr.length;

function showResult() {
    if(gamesCount < 2) {
        erroEl.textContent = 'To see the result, you should enter at least 2 games';
    } else {
        let averageKills = Math.round(average(killsArrFiltered) * 100) / 100;
        let averageDeaths = Math.round(average(deathsArrFiltered) * 100) / 100;
        let averageAssists = Math.round(average(assistsArrFiltered) * 100) / 100;
        erroEl.textContent = "Your average result in last " + gamesCount + " games is " + "Kills: " + averageKills + ", " + "Deaths: " + averageDeaths + ", " + "Assists: " + averageAssists; 
    }
}

function reset() {
    killsArr = [];
    deathsArr = [];
    assistsArr = [];
    killsArrFiltered = [];
    deathsArrFiltered = [];
    assistsArrFiltered = [];
    
    gamesCount = 0;
    countEl.textContent = gamesCount;
    erroEl.textContent = '';
}