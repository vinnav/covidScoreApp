// MAIN VALUES

// Array of mortality scores
const  shortMortality = [1.4, 5.3, 5.9, 19.7, 33.3, 39.7, 40.0, 40.6, 47.9, 74.6, 77.8, 77.8]  //TODO Confirm NB final element is printed '>77.8%'
const   longMortality = [1.4, 5.3, 5.9, 19.7, 33.3, 39.7, 40.0, 40.6, 47.9, 74.6, 77.8, 77.8]  //TODO Confirm
const isaricMortality = [0.0, 0.3, 0.8,  2.3,  4.8,  7.5,  7.8, 11.7, 14.4, 19.2, 22.9, 26.9, 32.9, 40.1, 44.6, 51.6, 59.1, 66.1, 75.8, 77.4, 82.9, 87.5] //per isaric4c.net/risk

const isaricAgeRangeScore = [0, 2, 4, 6, 7] //Scores for each age range category
const isaricUreaRangeScore = [0, 1, 3]      //Scores for each urea range category

// Test Elements
const commonTestElements = ["spo", "ageRange"]
const  shortTestElements = ["resp", "stroke", "obesity"]
const   longTestElements = ["everSmoker", "dementia", "leucophilia", "lymphopenia", "cxrChanges", "ckdStageRange"]
const isaricTestElements = ["gcs", "male", "comorbidRange", "tachypneoaRange", "ureaRange", "crpRange"]

//---Model Variables---

//Demographic Details
let ageYears = 0;
let patientNhsNumber = 0;
//DoB, fName, and lName are not presently stored as variables here.

//Common Score Variables
let desaturated = false;
let ageRange = 0;           //0- >50. 1- 50-59. 2- 60-69. 3- 70-79. 4- >=80. Not neccessarily a score.

//Short Score Specific Variables
let tachypneoa = false;
let stroke = false;
let obesity = false;

//Long Score Specific Variables
let everSmoker = false;
let dementia = false;
let leucophilia = false;
let lymphopenia = false;
let cxrChanges = false;
let ckdStageRange = 0;      //0- CKD1. 1- CKD2. 2- CKD3. 3- CKD4. 4- CKD5. Not neccessarily a score.

//ISARIC Score Specific Variables
let gcs = false;
let male = false;
let comorbidRange = 0;      //0- no comorbidities. 1- 1 comorbidity. 2- 2+ comorbidities
let tachypneoaRange = 0;    //0- RR < 20. 1- RR 20-29. 2- RR >= 30.
let ureaRange = 0;          //0- <7. 1- 7-14. 2- >14.
let crpRange = 0;           //0- <50. 1- 50-99. 2- >100.

let mortalityScore = 0;
let scoreType = 0; //0- short score, 1- long score, 2- isaric

//Button Styles
const activeBackgroundColour = '#0066cc';       //Background colour for active buttons
const activeTextColour = 'white';               //Text Colour for active buttons
const inactiveBackroundColour = 'lightgray';    //Background colour for inactive buttons
const inactiveTextColour = 'black';             //Text Colour for inactive buttons
const validatedTextboxColour = 'green';         //Background colour for validated text boxes
const invalidTextboxColour = 'orange';          //Background colour for invalid textboxes
const defaultTextboxColour = 'lightgray';       //Background for sleeping textboxes

// Assign DOM elements to variables
let titleText = document.getElementById("titleText");

let nhsNumber = document.getElementById("nhsnumber");
let fName = document.getElementById("name");
let lName = document.getElementById("surname");
let dob = document.getElementById("dob");

let scoreMultiSelect = [
    document.getElementById("shortScore"),
    document.getElementById("longScore"),
    document.getElementById("isaricScore"),
]

let yesTachypneoa = document.getElementById("yesresp");
let noTachypneoa = document.getElementById("noresp");

let yesDesaturated = document.getElementById("yesspo");
let noDesaturated  = document.getElementById("nospo");

let yesStroke = document.getElementById("yesstroke");
let noStroke = document.getElementById("nostroke");

let yesObesity = document.getElementById("yesobesity");
let noObesity = document.getElementById("noobesity");

let ageMultiSelect = [
    document.getElementById("less50"),
    document.getElementById("age50-59"),
    document.getElementById("age60-69"),
    document.getElementById("age70-79"),
    document.getElementById("more80")]

let ageUnder50 = document.getElementById("less50");
let ageBetween5059 = document.getElementById("age50-59");
let ageBetween6069 = document.getElementById("age60-69");
let ageBetween7079 = document.getElementById("age70-79");
let ageOver80 = document.getElementById("more80");

let resultText = document.getElementById("resultText");

let submitButton = document.getElementById("submitButton");

// Data Update Event Listeners
scoreMultiSelect[0].addEventListener('click', onSetShortScore);
scoreMultiSelect[1].addEventListener('click', onSetLongScore);
scoreMultiSelect[2].addEventListener('click', onSetIsaricScore);

nhsNumber.addEventListener('input', onNhsNumberChange);
nhsNumber.addEventListener('propertychange', onNhsNumberChange);

fName.addEventListener('input', onFNameChange);
fName.addEventListener('propertychange', onFNameChange);
lName.addEventListener('input', onLNameChange);
lName.addEventListener('propertychange', onLNameChange);

dob.addEventListener("change", onDobChange);

yesTachypneoa.addEventListener("click", onTachypneoaCheck);
noTachypneoa.addEventListener("click", onTachypneoaUncheck);

yesDesaturated.addEventListener("click", onDesaturatedCheck);
noDesaturated.addEventListener("click", onDesaturatedUncheck);

yesStroke.addEventListener("click", onStrokeCheck);
noStroke.addEventListener("click", onStrokeUncheck);

yesObesity.addEventListener("click", onObesityCheck);
noObesity.addEventListener("click", onObesityUncheck);

ageMultiSelect[0].addEventListener("click", onAgeUnder50check);
ageMultiSelect[1].addEventListener("click", onAgeBetween5059check);
ageMultiSelect[2].addEventListener("click", onAgeBetween6069check);
ageMultiSelect[3].addEventListener("click", onAgeBetween7079check);
ageMultiSelect[4].addEventListener("click", onAgeOver80check);

submitButton.addEventListener('click', onSubmitButtonPress);

onSetShortScore();

function getMortalityScore(){
    let mortalityComment = "";
    switch (scoreType){
        case 0:
            //Short Score
            mortalityScore = calculateShortScore();
            mortalityComment = (mortalityScore == 11 ? ">":"") + shortMortality[mortalityScore] + "%";
            break;
        case 1:
            //Long Score
            mortalityScore = calculateLongScore();
            mortalityComment = longMortality[mortalityScore] + "%";
            break;
        case 2:
            //ISARIC score
            mortalityScore = calculateIsaricScore();
            mortalityComment = isaricMortality[mortalityScore] + "%";
            break;
    }
    //TODO: Functions to generate interpertive comment for risk band and explaination of basis of prediction
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Score = " 
    + (mortalityScore) 
    + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality rate: "
    + mortalityComment 
    + "</p>";
}

function calculateShortScore(){
    //Age range category is directly linked to score, so can just add it.
    return (ageRange + tachypneoa + desaturated + stroke + obesity);
}

function calculateLongScore(){
    //Long score is a superset of short score.
    //+1 because CKD scores are uniformly (category +1). 
    return calculateShortScore() + everSmoker + dementia + leucophilia + lymphopenia + cxrChanges + ckdStageRange + 1;
}

function calculateIsaricScore(){
    return isaricAgeRangeScore[ageRange] + male + comorbidRange + tachypneoaRange + (2*desaturated) + (2*gcs) + crpRange;
}

//----------
//DOM Manipulation functions
//----------

function setButtonStyle(targetButton, isActive){
    targetButton.style.backgroundColor = isActive ? activeBackgroundColour : inactiveBackroundColour;
    targetButton.style.color = isActive ? activeTextColour : inactiveTextColour;
}

function setButtonStyleInactive(targetButton){
    setButtonStyle(targetButton, false);
}

function toggleButtonStyles(activeButton, inactiveButton){
    setButtonStyle(activeButton, true);
    setButtonStyle(inactiveButton, false);
}

function setMultiButtonActiveStyle(multiButtonArray, activeButtonIndex){
    multiButtonArray.forEach(setButtonStyleInactive);
    setButtonStyle(multiButtonArray[activeButtonIndex], true);
}

function setTextboxValidStyle(targetTextbox, valid){
    targetTextbox.style.backgroundColor = valid ? validatedTextboxColour : invalidTextboxColour;
    targetTextbox.style.color = valid ? 'white' : 'black'; 
}

function setTextboxDefaultStyle(targetTextbox){
    targetTextbox.style.backgroundColor = defaultTextboxColour;
    targetTextbox.style.color = 'black';
}

function hideRowByElementId(elementToHide){
    try{
    document.getElementById(elementToHide).style.display = 'none';
    } catch (e) { return false; }
}

function showRowByElementId(elementToShow){
    try{
    document.getElementById(elementToShow).style.display = 'flex';
    } catch (e) { return false; }
}

function onSetShortScore(){
    scoreType = 0;
    titleText.innerHTML = "COVID-19 Short Score";
    setMultiButtonActiveStyle(scoreMultiSelect, 0);
    shortTestElements.forEach(showRowByElementId);
    longTestElements.forEach(hideRowByElementId);
    isaricTestElements.forEach(hideRowByElementId);
    getMortalityScore();
}

function onSetLongScore(){
    scoreType = 1;
    titleText.innerHTML = "COVID-19 Long Score";
    setMultiButtonActiveStyle(scoreMultiSelect, 1);
    isaricTestElements.forEach(hideRowByElementId);
    shortTestElements.forEach(showRowByElementId);  //Long test is a superset of short test
    longTestElements.forEach(showRowByElementId);
    getMortalityScore();
}

function onSetIsaricScore(){
    //TODO implement ISARIC score
    scoreType = 2;
    titleText.innerHTML = "COVID-19 ISARIC score";
    setMultiButtonActiveStyle(scoreMultiSelect, 2);
    shortTestElements.forEach(hideRowByElementId);
    longTestElements.forEach(hideRowByElementId);
    isaricTestElements.forEach(showRowByElementId);
    getMortalityScore();
}

//----------
//Event Listener Functions
//----------

function onTachypneoaCheck(){
    tachypneoa = true;
    toggleButtonStyles(yesTachypneoa, noTachypneoa);
    getMortalityScore()
}

function onTachypneoaUncheck(){
    tachypneoa = false
    toggleButtonStyles(noTachypneoa, yesTachypneoa);
    getMortalityScore()
}

function onDesaturatedCheck(){
    desaturated = true;
    toggleButtonStyles(yesDesaturated, noDesaturated);
    getMortalityScore();
}

function onDesaturatedUncheck(){
    desaturated = false;
    toggleButtonStyles(noDesaturated, yesDesaturated);
    getMortalityScore();
}

function onStrokeCheck(){
    stroke = true;
    toggleButtonStyles(yesStroke, noStroke);
    getMortalityScore();
}

function onStrokeUncheck(){
    stroke = false;
    toggleButtonStyles(noStroke, yesStroke);
    getMortalityScore();
}

function onObesityCheck()
{
    obesity = true;
    toggleButtonStyles(yesObesity, noObesity);
    getMortalityScore();
}

function onObesityUncheck()
{
    obesity = false;
    toggleButtonStyles(noObesity, yesObesity);
    getMortalityScore();
}

function onAgeUnder50check(){
    ageRange = 0;
    ageYears = ageYears < 50 ? ageYears : 0;
    setDobFieldIsValid(ageYears);
    setMultiButtonActiveStyle(ageMultiSelect, 0);
    getMortalityScore();
}

function onAgeBetween5059check(){
    ageRange = 1;
    ageYears = ageYears >= 50 && ageYears < 60 ? ageYears : 0;
    setDobFieldIsValid(ageYears);
    setMultiButtonActiveStyle(ageMultiSelect, 1);
    getMortalityScore();
}

function onAgeBetween6069check(){
    ageRange = 2;
    ageYears = ageYears >= 60 && ageYears < 70 ? ageYears : 0;
    setDobFieldIsValid(ageYears);
    setMultiButtonActiveStyle(ageMultiSelect, 2);
    getMortalityScore();
}

function onAgeBetween7079check(){
     ageRange = 3;
     ageYears = ageYears >= 70 && ageYears < 80 ? ageYears : 0;
     setDobFieldIsValid(ageYears);
     setMultiButtonActiveStyle(ageMultiSelect, 3);
     getMortalityScore();
}

function onAgeOver80check(){
    ageRange = 4;
    ageYears = ageYears >= 80 ? ageYears : 0;
    setDobFieldIsValid(ageYears);
    setMultiButtonActiveStyle(ageMultiSelect, 4);
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
    let ageMiliseconds = Date.now() - Date.parse(dob.value);
    ageYears = Math.floor(ageMiliseconds / (3600000 * 24 *365.25));
    if      (ageYears >= 80) {onAgeOver80check();      return true;}
    else if (ageYears >= 70) {onAgeBetween7079check(); return true;}
    else if (ageYears >= 60) {onAgeBetween6069check(); return true;}
    else if (ageYears >= 50) {onAgeBetween5059check(); return true;}
    else                     {onAgeUnder50check();     return true;}
}

function setDobFieldIsValid(dobIsValid){
    if(!dobIsValid){
        dob.value='';
        setTextboxDefaultStyle(dob);
    }
    else{
        setTextboxValidStyle(dob, true);
    }
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

function onSubmitButtonPress()
{
    postData("http://15.161.6.195:3000/sendData", {
        nhsData:     nhsNumber.value,
        nameData:    fName.value, 
        surnameData: lName.value, 
        dobData:     dob.value,
        ageData:     ageRange,
        respData:    tachypneoa  ? 1 : 0,
        spo2Data:    desaturated ? 1 : 0,
        strokeData:  stroke      ? 1 : 0,
        obesityData: obesity     ? 1 : 0,
        scoreData:   mortalityScore});
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