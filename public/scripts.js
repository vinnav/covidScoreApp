// MAIN VALUES

// Array of mortality scores
const mortality = ["1.4%","5.3%", "5.9%", "19.7%", "33.3%", "39.7%", "40%", "40.6%", "47.9%", "74.6%", "77.8%", ">77.8%"]

//Button Styles
const activeBackgroundColour = '#0066cc';       //Background colour for active buttons
const activeTextColour = 'white';               //Text Colour for active buttons
const inactiveBackroundColour = 'lightgray';    //Background colour for inactive buttons
const inactiveTextColour = 'black';             //Text Colour for inactive buttons
const validatedTextboxColour = 'green';
const invalidTextboxColour = 'orange';
const defaultTextboxColour = 'lightgray';

// Assign DOM elements to variables

let nhsNumber = document.getElementById("nhsnumber");
let fName = document.getElementById("name");
let lName = document.getElementById("surname");
let dob = document.getElementById("dob");

let yesresp = document.getElementById("yesresp");
let noresp = document.getElementById("noresp");

let yesspo = document.getElementById("yesspo");
let nospo = document.getElementById("nospo");

let yesstroke = document.getElementById("yesstroke");
let nostroke = document.getElementById("nostroke");

let yesobesity = document.getElementById("yesobesity");
let noobesity = document.getElementById("noobesity");

let ageless50 = document.getElementById("less50");
let age5059 = document.getElementById("age50-59");
let age6069 = document.getElementById("age60-69");
let age7079 = document.getElementById("age70-79");
let agemore80 = document.getElementById("more80");

let resultText = document.getElementById("resultText");

let submitButton = document.getElementById("submitButton");

// Data Update Event Listeners
nhsNumber.addEventListener('input', onNhsNumberChange);
nhsNumber.addEventListener('propertychange', onNhsNumberChange);

fName.addEventListener('input', onFNameChange);
fName.addEventListener('propertychange', onFNameChange);
lName.addEventListener('input', onLNameChange);
lName.addEventListener('propertychange', onLNameChange);

dob.addEventListener("change", onDobChange);

yesresp.addEventListener("click", respcheck);
noresp.addEventListener("click", respuncheck);

yesspo.addEventListener("click", spocheck);
nospo.addEventListener("click", spouncheck);

yesstroke.addEventListener("click", strokecheck);
nostroke.addEventListener("click", strokeuncheck);

yesobesity.addEventListener("click", obesitycheck);
noobesity.addEventListener("click", obesityuncheck);

ageless50.addEventListener("click", ageless50check);
age5059.addEventListener("click", age5059check);
age6069.addEventListener("click", age6069check);
age7079.addEventListener("click", age7079check);
agemore80.addEventListener("click", agemore80check);

submitButton.addEventListener('click', submitData);

//Model Variables
let age = 0;
let tachypneoa = false;
let desaturated = false;
let stroke = false;
let obesity = false;
let mortalityScore = 0;
let patientNhsNumber = 0;

// Display result
function getMortalityScore(){
    mortalityScore = age + tachypneoa + desaturated + stroke + obesity;
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Score = " + (mortalityScore) + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality rate: " + mortality[mortalityScore] + "</p>";
}

function setButtonStyle(targetButton, isActive)
{
    targetButton.style.backgroundColor = isActive ? activeBackgroundColour : inactiveBackroundColour;
    targetButton.style.color = isActive ? activeTextColour : inactiveTextColour;
}

function toggleButtonStyles(activeButton, inactiveButton)
{
    setButtonStyle(activeButton, true);
    setButtonStyle(inactiveButton, false);
}

function setAgeButtonStyles(activeAge)
{
    setButtonStyle(ageless50, ageless50 == activeAge);
    setButtonStyle(age5059, age5059 == activeAge);
    setButtonStyle(age6069, age6069 == activeAge);
    setButtonStyle(age7079, age7079 == activeAge);
    setButtonStyle(agemore80, agemore80 == activeAge);
}

function setTextboxValidStyle(targetTextbox, valid){
    targetTextbox.style.backgroundColor = valid ? validatedTextboxColour : invalidTextboxColour;
    targetTextbox.style.color = valid ? 'white' : 'black'; 
}

function setTextboxDefaultStyle(targetTextbox){
    targetTextbox.style.backgroundColor = defaultTextboxColour;
    targetTextbox.style.color = 'black';
}

// Respiratory rate >24/m checked
function respcheck(){
    //Update Model
    tachypneoa = true;

    //update view
    toggleButtonStyles(yesresp, noresp);

    //update Controller
    getMortalityScore()
}

function respuncheck(){
    //Update Model
    tachypneoa = false

    //update View
    toggleButtonStyles(noresp, yesresp);

    //Update Controller
    getMortalityScore()
}

// SpO
function spocheck(){
    //Update Model
    desaturated = true;

    //Update View
    toggleButtonStyles(yesspo, nospo);

    //Update Controller
    getMortalityScore();
}

function spouncheck(){
    //Update Model
    desaturated = false;

    //Update View
    toggleButtonStyles(nospo, yesspo);

    //Update Controller
    getMortalityScore();
}

// Stroke
function strokecheck(){
    //Update Model
    stroke = true;

    //Update View
    toggleButtonStyles(yesstroke, nostroke);

    //Update Controller
    getMortalityScore();
}

function strokeuncheck(){
    //Update Model
    stroke = false;

    //Update View
    toggleButtonStyles(nostroke, yesstroke);

    //Update Controller
    getMortalityScore();
}

// Obesity
function obesitycheck()
{
    //Update Model
    obesity = true;

    //Update View
    toggleButtonStyles(yesobesity, noobesity);

    //Update Controller
    getMortalityScore();
}

function obesityuncheck()
{
    //Update Model
    obesity = false;

    //Update View
    toggleButtonStyles(noobesity, yesobesity);

    //Update Controller
    getMortalityScore();
}

// Age
function ageless50check(){
    //Update Model
    age = 0;

    //Update View
    setAgeButtonStyles(ageless50);

    //Update Controller
    getMortalityScore();
}

function age5059check(){
    //Update Model
    age = 1;

    //Update View
    setAgeButtonStyles(age5059);

    //Update Controller
    getMortalityScore();
}

function age6069check(){
    //Update Model
    age = 2;

    //Update View
    setAgeButtonStyles(age6069);

    //Update Controller
    getMortalityScore();
}

function age7079check(){
     //Update Model
     age = 5;

     //Update View
     setAgeButtonStyles(age7079);
 
     //Update Controller
     getMortalityScore();
}

function agemore80check(){
    //Update Model
    age = 7;

    //Update View
    setAgeButtonStyles(agemore80);

    //Update Controller
    getMortalityScore();
}

function onFNameChange(){
    if(fName.value.length){
        setTextboxValidStyle(fName, true);
        }
        else{
            setTextboxDefaultStyle(fName);
        }
}

function onLNameChange(){
    if(lName.value.length){
        setTextboxValidStyle(lName, true);
    }
    else{
        setTextboxDefaultStyle(lName);
    }
}

function onDobChange(){
    return true;
}

function onNhsNumberChange()
{
    //respond to changes in the NHS Number input
    //if it matches the expected format (eg nnn nnn nnnn or nnnnnnnnnn), verify the checksum and then perform external lookup
    let validNhsN = isTenDigitNumber(nhsNumber.value);
    if(validNhsN){
        patientNhsNumber = validNhsN;
        setTextboxValidStyle(nhsNumber, false);
        if(isNhsNumberChecksumValid(patientNhsNumber) && isNhsNumberRangeValid(patientNhsNumber)){
            resultText.innerHTML = "<p style=\"font-size:35px;\"> NHS number appears to be valid..." + "</p>";
            nhsNumberSearch();
            setTextboxValidStyle(nhsNumber, true);
        }
    }
    else{
        setTextboxDefaultStyle(nhsNumber);
    }
}

function isTenDigitNumber(inputNhsNumber){
    //check the NHS Number provided matches nnn nnn nnnn or nnnnnnnnnn
    inputNhsNumber = inputNhsNumber.replace(/\s/g, '');  //Remove whitespace
    //Return either 0, or a 10-digit number. (NB leading zeroes _are_ included in length here)
    return isNaN(inputNhsNumber) || inputNhsNumber < 0 || String(inputNhsNumber).length !== 10 ? 0 : inputNhsNumber;
}

function isNhsNumberChecksumValid(inputNhsNumber){
    //TODO Implement Mod 11 Checksum Verification
    //Do stuff here to check the NHS Number Mod 11 check digit
    //Per https://datadictionary.nhs.uk/attributes/nhs_number.html
    //eg NHS Number 123 456 7890
    //place values 10 9 8    7 6 5    4 3 2
    //multiply each digit by its place value, sum those values, take the mod11 of that sum.
    //If the result is 10, the NHSN is invalid. If the result is 11, the check digit is 0. Otherwise, the result is the check digit.
    return true;
}

function isNhsNumberRangeValid(inputNhsNumber){
    //010 101 000x to 311 299 999x is reserved for NHS Scotland CHI Numbers
    //320 000 000x to 399 999 999x is reserved for Northern Ireland H&C Numbers
    //Anecdotally the current range of NHS Numbers within England, Wales, and IoM are
    //400 000 000x to 499 999 999x, and
    //600 000 000x to 708 800 000x
    if(inputNhsNumber < 3999999999 && inputNhsNumber > 3200000000){
        //NI H&C Number
        return false;
    }
    if(inputNhsNumber < 3112999999 && inputNhsNumber > 0101010000){
        //Scottish CHI Number
        return false;
    }
    //Not in NI or Scotland reserved range. Does not guarentee this range is active.
    return true;
}

function nhsNumberSearch(){
    //TODO implement NHS Number Lookup
    //Do something to lookup the NHS Number
    resultText.innerHTML = "<p style=\"font-size:35px;\"> NHS number not found... " + "</p>";
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function postData(path, params, method='post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
  
        form.appendChild(hiddenField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
  }

//postData("http://127.0.0.1:8080/myaction", {name: nhsNumber})

function submitData()
{
    postData("http://15.161.6.195:3000/sendData", {
        nhsData:     nhsNumber.value,
        nameData:    fName.value, 
        surnameData: lName.value, 
        dobData:     dob.value,
        ageData:     age,
        respData:    tachypneoa  ? 1 : 0,
        spo2Data:    desaturated ? 1 : 0,
        strokeData:  stroke   ? 1 : 0,
        obesityData: obesity ? 1 : 0,
        scoreData:   mortalityScore});
}