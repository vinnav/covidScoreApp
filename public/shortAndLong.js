//-----------------
// Data Definitions
//-----------------

//Button Styles
const activeBackgroundColour    = '#0066cc';    //Background colour for active buttons
const activeTextColour          = 'white';      //Text Colour for active buttons
const inactiveBackroundColour   = 'lightgray';  //Background colour for inactive buttons
const inactiveTextColour        = 'black';      //Text Colour for inactive buttons
const validatedTextboxColour    = 'green';      //Background colour for validated text boxes
const invalidTextboxColour      = 'orange';     //Background colour for invalid textboxes
const defaultTextboxColour      = 'lightgray';  //Background for sleeping textboxes

// Array of mortality scores
const  shortMortality = [1.4, 5.3, 5.9, 23.4, 35.4, 53.9, 72.5, 78.6, 78.6]  //NB final element is printed '>78.6%'
const   longMortality = [1.4, 5.3, 5.9, 19.7, 33.3, 39.7, 40.0, 40.6, 47.9, 74.6, 77.8, 77.8]  //TODO Confirm
const isaricMortality = [0.3, 0.3, 0.8,  2.3,  4.8,  7.5,  7.8, 11.7, 14.4, 19.2, 22.9, 26.9, 32.9, 40.1, 44.6, 51.6, 59.1, 66.1, 75.8, 77.4, 82.9, 87.5] //per isaric4c.net/risk
//NB first element is printed '0.3%'

//Multibutton Score Ranges
const shortAgeRangeScore = [0, 1, 2, 3, 4]  //scores for each age range category
const isaricAgeRangeScore = [0, 2, 4, 6, 7] //Scores for each age range category
const isaricUreaRangeScore = [0, 1, 3]      //Scores for each urea range category

// Test Elements
const   longTestElements = ["everSmoker", "dementia", "leucophilia", "lymphopenia", "cxrChanges", "ckdStageRange"]
const isaricTestElements = ["gcs", "male", "comorbidRange", "tachypneoaRange", "ureaRange", "crpRange"]

//---Model Variables---

//Demographic Details
let demographicDoB = "0000-01-01";  //yyyy-mm-dd date - matches format from date control.
let demographicAgeYears = 0;
let demograhicNhsNumber = 0;
let demographicFName = "";
let demographicLName = "";

//Long Score Specific Variables
let everSmoker = false;
let dementia = false;
let leucophilia = false;
let lymphopenia = false;
let cxrChanges = false;
let ckdStageRange = 0;      //0- CKD1. 1- CKD2. 2- CKD3. 3- CKD4. 4- CKD5. Not neccessarily a score.

//ISARIC Score Specific Variables
let gcsUnder15 = false;
let maleBirthSex = false;
let comorbidRange = 0;      //0- no comorbidities. 1- 1 comorbidity. 2- 2+ comorbidities
let tachypneoaRange = 0;    //0- RR < 20. 1- RR 20-29. 2- RR >= 30.
let ureaRange = 0;          //0- <7. 1- 7-14. 2- >14.
let crpRange = 0;           //0- <50. 1- 50-99. 2- >100.

let mortalityScore = 0;
let scoreType = 0; //0- short score, 1- long score, 2- isaric
let scoreSelectMSOL = {
    rowLabel:"Select Test", rowId:"testSelection", rowDom:undefined, labelWidth:30, value:0,
    buttonLabels:["Short Score", "Long Score", "Isaric Score"], buttonIds:["shortScore", "longScore", "isaricScore"], buttonDoms:[], 
    buttonHandlers:[onSetShortScore, onSetLongScore, onSetIsaricScore]};
let satsMSOL = {
    rowLabel:"SpO2 < 92% on Air / 21% O2", rowId:"spo", rowDom:undefined, labelWidth:65, value:0,
    buttonLabels:["No", "Yes"], buttonIds:["nospo", "yesspo"], buttonDoms:[], buttonHandlers:[onDesaturatedUncheck, onDesaturatedCheck]};
let ageRangeMSOL = { //0- >50. 1- 50-59. 2- 60-69. 3- 70-79. 4- >=80. Not neccessarily a score.
    rowLabel:"Age", rowId:"ageRange", rowDom:undefined, labelWidth:30, value:0,
    buttonLabels:["<50", "50-59", "60-69", "70-79", ">80"], buttonIds:["ageless50", "age50-59", "age60-69", "age70-79", "agemore80"], buttonDoms:[],
    buttonHandlers:[onAgeUnder50check, onAgeBetween5059check, onAgeBetween6069check, onAgeBetween7079check, onAgeOver80check]};
let obesityMSOL = {
    rowLabel:"Obesity (BMI > 30)", rowId:"obesity", rowDom:undefined, labelWidth:65, value:0,
    buttonLabels:["No", "Yes"], buttonIds:["noobesity", "yesobesity"], buttonDoms:[], buttonHandlers:[onObesityUncheck, onObesityCheck]};
let strokeMSOL = {
    rowLabel:"Stroke", rowId:"stroke", rowDom:undefined, labelWidth:65, value:0,
    buttonLabels:["No", "Yes"], buttonIds:["nostroke", "yesstroke"], buttonDoms:[], buttonHandlers:[onStrokeUncheck, onStrokeCheck]};
let tachypneoaMSOL = {
    rowLabel:"Respiratory Rate >24/min", rowId:"resp", rowDom:undefined, labelWidth:65, value:0,
    buttonLabels:["No", "Yes"], buttonIds:["noresp", "yesresp"], buttonDoms:[], buttonHandlers:[onTachypneoaUncheck, onTachypneoaCheck]};

let commonButtonDescriptors = [ageRangeMSOL, satsMSOL];
let shortButtonDescriptors = [obesityMSOL, strokeMSOL, tachypneoaMSOL];

// Generate HTML for button elements
// Needs to be run before assigning DOM elements
generateAllButtons();
generateDomIdsFromButtonDescriptor(scoreSelectMSOL);
generateDomIdsForList(commonButtonDescriptors);
generateDomIdsForList(shortButtonDescriptors);

// Assign DOM elements to variables
let titleText = document.getElementById("titleText");
let nhsNumber = document.getElementById("nhsnumber");
let fName = document.getElementById("name");
let lName = document.getElementById("surname");
let dob = document.getElementById("dob");
let resultText   = document.getElementById("resultText");
let submitButton = document.getElementById("submitButton");

// Finish setting up the document
attachAllEventListeners();
onSetShortScore();

//------------------------
//Document Generation Code
//------------------------

function generateAllButtons() {
    let htmlGeneratedButtonElements = ""
    htmlGeneratedButtonElements += generateRowFromButtonDescriptor(scoreSelectMSOL);
    htmlGeneratedButtonElements += generateRowWithButtonHtmlFromList(commonButtonDescriptors);
    htmlGeneratedButtonElements += generateRowWithButtonHtmlFromList(shortButtonDescriptors);
    htmlGeneratedButtonElements += generateRowWithButtonHtml(longTestElements[0],   "Ever Smoker", ["noEverSmoker", "yesEverSmoker"], ["No", "Yes"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(longTestElements[1],   "Dementia", ["noDementia", "yesDementia"], ["No", "Yes"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(longTestElements[2],   "Leucophilia (>11.0)", ["noLeucophilia", "yesLeucophilia"], ["No", "Yes"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(longTestElements[3],   "Lymphopenia (<0.7)", ["noLymphopenia", "yesLymphopenia"], ["No", "Yes"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(longTestElements[4],   "CXR Changes (>4 zones)", ["noCxrChanges", "yesCxrChanges"], ["No", "Yes"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(isaricTestElements[0], "GCS < 15", ["noGcs", "yesGcs"], ["No", "Yes"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(isaricTestElements[1], "Sex at birth", ["femaleSex", "maleSex"], ["Female", "Male"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(isaricTestElements[2], "Comorbidities", ["comorbid0", "comorbid1", "comorbid2+"], ["0", "1", "2+"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(isaricTestElements[3], "Respiratory Rate", ["respRateUnder20", "respRate20-29", "respRateOver30"], ["<20", "20-30", ">30"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(isaricTestElements[4], "Urea", ["ureaUnder7", "urea7to14", "ureaOver14"], ["<7", "7-14", ">14"])
    htmlGeneratedButtonElements += generateRowWithButtonHtml(isaricTestElements[5], "CRP", ["crpUnder50", "crp50to100", "crpOver100"], ["<50", "50-100", ">100"])
    document.getElementById("generatedHtml").innerHTML += htmlGeneratedButtonElements
}

function attachAllEventListeners() {
    nhsNumber.addEventListener(             'input',           onNhsNumberChange);
    nhsNumber.addEventListener(             'propertychange',  onNhsNumberChange);
    fName.addEventListener(                 'input',           onFNameChange);
    fName.addEventListener(                 'propertychange',  onFNameChange);
    lName.addEventListener(                 'input',           onLNameChange);
    lName.addEventListener(                 'propertychange',  onLNameChange);
    dob.addEventListener(                   "change",          onDobChange);
    submitButton.addEventListener(          'click',           onSubmitButtonPress);

    generateEventListenerAttatchmentsFromButtonDescriptor(scoreSelectMSOL);
    generateEventListenersForList(commonButtonDescriptors);
    generateEventListenersForList(shortButtonDescriptors);
}

function generateRowFromButtonDescriptor(buttonDescriptor){
    return(generateRowWithButtonHtml(buttonDescriptor.rowId, buttonDescriptor.rowLabel, buttonDescriptor.buttonIds, buttonDescriptor.buttonLabels, buttonDescriptor.labelWidth))
}

function generateDomIdsFromButtonDescriptor(buttonDescriptor){
    buttonDescriptor.rowDom = document.getElementById(buttonDescriptor.rowId)
    var i;
    for(i = 0; i < buttonDescriptor.buttonIds.length; i++){
        buttonDescriptor.buttonDoms.push(document.getElementById(buttonDescriptor.buttonIds[i]));
    }
}

function generateEventListenerAttatchmentsFromButtonDescriptor(buttonDescriptor){
    var i;
    for(i=0; i < buttonDescriptor.buttonDoms.length; i++){
        buttonDescriptor.buttonDoms[i].addEventListener("click", buttonDescriptor.buttonHandlers[i]);
    }
}

function generateDomIdsForList(buttonDescriptorList){
    buttonDescriptorList.forEach(generateDomIdsFromButtonDescriptor);
}

function generateEventListenersForList(buttonDescriptorList){
    buttonDescriptorList.forEach(generateEventListenerAttatchmentsFromButtonDescriptor);
}

function generateRowWithButtonHtmlFromList(buttonDescriptorList){
    let htmlReturnValue = "";
    var i;
    for(i=0;i<buttonDescriptorList.length;i++){
        htmlReturnValue += generateRowFromButtonDescriptor(buttonDescriptorList[i]);
    }
    return htmlReturnValue;
}

function generateRowWithButtonHtml(rowId, rowLabel, buttonIdArray, buttonLabelArray, labelWidth=65){
    if(buttonIdArray.length != buttonLabelArray.length){return "";}
    if(labelWidth < 0 || labelWidth >100){return"";}
    let htmlLabelFlexOverride = (labelWidth == 35 ? "" : " style=\"flex-basis: " + labelWidth+ "%;\"");
    let htmlButtonFlexOverride = (labelWidth == 35 ? "" : " style=\"flex-basis: " + (100 - labelWidth) + "%;\"");
    let htmlOutput = 
      "<div class=\"row\" id=\"" + rowId + "\">\n" +
      "  <div class=\"multiButtonLabel\""+ htmlLabelFlexOverride +">\n" +
      "    " + rowLabel + "\n" +
      "  </div>\n" +
      "  <div class=\"multiButtonContainer\""+ htmlButtonFlexOverride + ">\n";
    var i;
    for(i = 0; i < buttonIdArray.length; i++){
      let htmlButtonClass = "multiButton";
      if(i==0 && buttonIdArray.length == 1){ htmlButtonClass += " bothEnds";}
      else if (i==0){ htmlButtonClass += " leftEnd";}
      else if (i+1==buttonIdArray.length){ htmlButtonClass += " rightEnd";}
      
      htmlOutput += 
      "    <div id=\"" + buttonIdArray[i] + "\" class=\""+ htmlButtonClass + "\">\n" +
      "      " + buttonLabelArray[i] + "\n" +
      "    </div>\n";
    }
    htmlOutput += 
      "  </div>\n" +
      "</div>\n";
    return htmlOutput;
}

// ---------------
// Model Functions
// ---------------

function getMortalityScore(){
    let mortalityComment = "";
    switch (scoreType){
        case 0:
            //Short Score
            mortalityScore = calculateShortScore();
            mortalityComment = (mortalityScore == 8 ? ">":"") + shortMortality[mortalityScore] + "%";
            break;
        case 1:
            //Long Score
            mortalityScore = calculateLongScore();
            mortalityComment = longMortality[mortalityScore] + "%";
            break;
        case 2:
            //ISARIC score
            mortalityScore = calculateIsaricScore();
            mortalityComment = (mortalityScore == 0 ? "<":"") + isaricMortality[mortalityScore] + "%";
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
    return (ageRangeMSOL.value + satsMSOL.value + tachypneoaMSOL.value + strokeMSOL.value + obesityMSOL.value);
}

function calculateLongScore(){
    //Long score is a superset of short score.
    //+1 because CKD scores are uniformly (category +1). 
    return calculateShortScore() + everSmoker + dementia + leucophilia + lymphopenia + cxrChanges + ckdStageRange + 1;
}

function calculateIsaricScore(){
    return isaricAgeRangeScore[ageRangeMSOL.value] + maleBirthSex + comorbidRange + tachypneoaRange + (2*satsMSOL.value) + (2*gcsUnder15) + crpRange;
}

function onSetShortScore(){
    scoreType = 0;
    titleText.innerHTML = "COVID-19 Short Score";
    setMultiButtonActiveStyle(scoreSelectMSOL.buttonDoms, 0);
    shortButtonDescriptors.forEach(showRowByMSOL);
    longTestElements.forEach(hideRowByElementId);
    isaricTestElements.forEach(hideRowByElementId);
    getMortalityScore();
}

function onSetLongScore(){
    scoreType = 1;
    titleText.innerHTML = "COVID-19 Long Score";
    setMultiButtonActiveStyle(scoreSelectMSOL.buttonDoms, 1);
    shortButtonDescriptors.forEach(showRowByMSOL);  //Long test is a superset of short test
    isaricTestElements.forEach(hideRowByElementId); 
    longTestElements.forEach(showRowByElementId);
    getMortalityScore();
}

function onSetIsaricScore(){
    //TODO implement ISARIC score
    scoreType = 2;
    titleText.innerHTML = "COVID-19 ISARIC score";
    setMultiButtonActiveStyle(scoreSelectMSOL.buttonDoms, 2);
    shortButtonDescriptors.forEach(hideRowByMSOL);
    longTestElements.forEach(hideRowByElementId);
    isaricTestElements.forEach(showRowByElementId);
    getMortalityScore();
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

function showRowByMSOL(msolToShow){
    try{
        msolToShow.rowDom.style.display = 'flex';
    } catch (e) { return false; }
}

function hideRowByMSOL(msolToShow){
    try{
        msolToShow.rowDom.style.display = 'none'
    } catch (e) { return false; }
}

function setDobFieldValidity(isValid){
    if(!isValid){
        dob.value='';
        setTextboxDefaultStyle(dob);
    }
    else{
        setTextboxValidStyle(dob, true);
    }
}

//------------------------
//Event Listener Functions
//------------------------

function onTachypneoaCheck(){
    tachypneoaMSOL.value = 1;
    setMultiButtonActiveStyle(tachypneoaMSOL.buttonDoms, 1);
    getMortalityScore()
}

function onTachypneoaUncheck(){
    tachypneoaMSOL.value = 0;
    setMultiButtonActiveStyle(tachypneoaMSOL.buttonDoms, 0);
    getMortalityScore()
}

function onDesaturatedCheck(){
    satsMSOL.value = 1;
    setMultiButtonActiveStyle(satsMSOL.buttonDoms, 1);
    getMortalityScore();
}

function onDesaturatedUncheck(){
    satsMSOL.value = 0;
    setMultiButtonActiveStyle(satsMSOL.buttonDoms, 0);
    getMortalityScore();
}

function onStrokeCheck(){
    strokeMSOL.value = 1;
    setMultiButtonActiveStyle(strokeMSOL.buttonDoms, 1);
    getMortalityScore();
}

function onStrokeUncheck(){
    strokeMSOL.value = 0;
    setMultiButtonActiveStyle(strokeMSOL.buttonDoms, 0);
    getMortalityScore();
}

function onObesityCheck(){
    obesityMSOL.value = 1;
    setMultiButtonActiveStyle(obesityMSOL.buttonDoms, 1);
    getMortalityScore();
}

function onObesityUncheck(){
    obesityMSOL.value = 0;
    setMultiButtonActiveStyle(obesityMSOL.buttonDoms, 0);
    getMortalityScore();
}

function ageButtonBaseListener(buttonIndex, lowLimit, highLimit){
    ageRangeMSOL.value = buttonIndex;
    if      (lowLimit  &&  highLimit)   {demographicAgeYears = demographicAgeYears >= lowLimit && demographicAgeYears < highLimit ? demographicAgeYears : 0;}
    else if ( lowLimit && !highLimit)   {demographicAgeYears = demographicAgeYears >= lowLimit ? demographicAgeYears : 0;}
    else if (!lowLimit &&  highLimit)   {demographicAgeYears = demographicAgeYears < highLimit ? demographicAgeYears : 0;}
    else if (!lowLimit && !highLimit)   {/*Always True; no action*/}
    setDobFieldValidity(demographicAgeYears);
    setMultiButtonActiveStyle(ageRangeMSOL.buttonDoms, buttonIndex);
    getMortalityScore();
}

function onAgeUnder50check()    { ageButtonBaseListener(0,  0, 50); }
function onAgeBetween5059check(){ ageButtonBaseListener(1, 50, 60); }
function onAgeBetween6069check(){ ageButtonBaseListener(2, 60, 70); }
function onAgeBetween7079check(){ ageButtonBaseListener(3, 70, 80); }
function onAgeOver80check()     { ageButtonBaseListener(4, 80,  0); }

function onFNameChange(){
    if(fName.value.length){
        setTextboxValidStyle(fName, true);
        demographicFName = fName;
        }
        else{
            setTextboxDefaultStyle(fName);
        }
}

function onLNameChange(){
    if(lName.value.length){
        setTextboxValidStyle(lName, true);
        demographcLName = lName;
    }
    else{
        setTextboxDefaultStyle(lName);
    }
}

function onDobChange(){
    let ageMiliseconds = Date.now() - Date.parse(dob.value);
    demographicAgeYears = Math.floor(ageMiliseconds / (3600000 * 24 *365.25));
    demographicBoB = dob.value;
    if      (demographicAgeYears >= 80) {onAgeOver80check();      return true;}
    else if (demographicAgeYears >= 70) {onAgeBetween7079check(); return true;}
    else if (demographicAgeYears >= 60) {onAgeBetween6069check(); return true;}
    else if (demographicAgeYears >= 50) {onAgeBetween5059check(); return true;}
    else                                {onAgeUnder50check();     return true;}
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

//---------------------
// Form Submission Code
//---------------------

function onSubmitButtonPress()
{
    postData("http://15.161.6.195:3000/sendData", {
        nhsData:     demographicNhsNumber,
        nameData:    demographicFName, 
        surnameData: demographicLName, 
        dobData:     demographicDoB,
        ageData:     ageRangeMSOL.value,
        respData:    tachypneoaMSOL.value,
        spo2Data:    desaturatedMSOL.value,
        strokeData:  strokeMSOL.value,
        obesityData: obesityMSOL.value,
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