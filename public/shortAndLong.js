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
const  shortMortality = [1.4, 5.3, 5.9, 23.4, 35.4, 53.9, 72.5, 78.6, 78.6]  //Per SOARS paper NB final element is printed '>78.6%'
const   longMortality = [0.0, 0.3, 0.6, 2, 5, 12, 15, 30, 40, 47, 56, 75, 87, 100, 100, 100]  //TODO Confirm - these are eyeballed from the SOARS paper
const isaricMortality = [0.3, 0.3, 0.8,  2.3,  4.8,  7.5,  7.8, 11.7, 14.4, 19.2, 22.9, 26.9, 32.9, 40.1, 44.6, 51.6, 59.1, 66.1, 75.8, 77.4, 82.9, 87.5] //per isaric4c.net/risk
//NB first element is printed '0.3%'

//Multibutton Score Ranges
const shortAgeRangeScore = [0, 1, 2, 3, 4]  //scores for each age range category
const isaricAgeRangeScore = [0, 2, 4, 6, 7] //Scores for each age range category
const isaricUreaRangeScore = [0, 1, 3]      //Scores for each urea range category

//---Model Variables---

//Demographic Details
let demographicDoB = "0000-01-01";  //yyyy-mm-dd date - matches format from date control.
let demographicAgeYears = 0;
let demographicNhsNumber = 0;
let demographicFName = "";
let demographicLName = "";

let mortalityScore = 0;
let scoreType = 0; //0- short score, 1- long score, 2- isaric

//Button Definitions
let scoreSelectMSOL = {
    rowId:"testSelection", rowDom:undefined, value:0,
    titleLabel:"Select Test", titleLabelShort:"Test", titleLabelThreshold:300, titleWidth:30, titleDom:undefined, 
    buttonLabels:["Short Score", "Long Score", "Isaric Score"], buttonLabelsShort:["Short", "Long", "Isaric"], buttonLabelsThreshold:420,
    buttonIds:["shortScore", "longScore", "isaricScore"], 
    buttonDoms:[], buttonHandlers:[onSetShortScore, onSetLongScore, onSetIsaricScore]};
let satsMSOL = {
    rowId:"spo", rowDom:undefined, value:0, 
    titleLabel:"SpO<sub>2</sub> < 92% on Air / 21% O<sub>2</sub>", titleLabelShort:"Sats < 92% RA", titleLabelThreshold:350, titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["nospo", "yesspo"], buttonDoms:[], buttonHandlers:[onDesaturatedUncheck, onDesaturatedCheck]};
let ageRangeMSOL = { //0- >50. 1- 50-59. 2- 60-69. 3- 70-79. 4- >=80. Not neccessarily a score.
    rowId:"ageRange", rowDom:undefined, value:0, 
    titleLabel:"Age", titleWidth:30, titleDom:undefined, 
    buttonLabels:["<50", "50-59", "60-69", "70-79", ">80"], buttonLabelsShort:["<50", "50s", "60s", "70s", ">80"], buttonLabelsThreshold:350,
    buttonIds:["ageless50", "age50-59", "age60-69", "age70-79", "agemore80"], 
    buttonDoms:[], buttonHandlers:[onAgeUnder50check, onAgeBetween5059check, onAgeBetween6069check, onAgeBetween7079check, onAgeOver80check]};
let obesityMSOL = {
    rowId:"obesity", rowDom:undefined, value:0, 
    titleLabel:"Obesity (BMI > 30)", titleLabelShort:"Obese", titleLabelThreshold:230, titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noobesity", "yesobesity"], 
    buttonDoms:[], buttonHandlers:[onObesityUncheck, onObesityCheck]};
let strokeMSOL = {
    rowId:"stroke", rowDom:undefined, value:0, 
    titleLabel:"Stroke", titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["nostroke", "yesstroke"], 
    buttonDoms:[], buttonHandlers:[onStrokeUncheck, onStrokeCheck]};
let tachypneoaMSOL = {
    rowId:"resp", rowDom:undefined, value:0, 
    titleLabel:"Respiratory Rate >24/min", titleLabelShort:"RR > 24", titleLabelThreshold:310, titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noresp", "yesresp"], 
    buttonDoms:[], buttonHandlers:[onTachypneoaUncheck, onTachypneoaCheck]};
let everSmokerMSOL = {
    rowId:"everSmoker", rowDom:undefined, value:0, 
    titleLabel:"Ever Smoker", titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noEverSmoker", "yesEverSmoker"], 
    buttonDoms:[], buttonHandlers:[onEverSmokerUncheck, onEverSmokerCheck]};
let dementiaMSOL = {
    rowId:"dementia", rowDom:undefined, value:0, 
    titleLabel:"Dementia", titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noDementia", "yesDementia"],
    buttonDoms:[], buttonHandlers:[onDementiaUncheck, onDementiaCheck]};
let leucophiliaMSOL = {
    rowId:"leucophilia", rowDom:undefined, value:0,
    titleLabel:"Leucophilia (WCC >11)", titleLabelShort:"WCC >11", titleLabelThreshold:280, titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noLeucophilia", "yesLeucophilia"],
    buttonDoms:[], buttonHandlers:[onLeucophiliaUncheck, onLeucophiliaCheck]};
let lymphopeniaMSOL = {
    rowId:"lymphopenia", rowDom:undefined, value:0, 
    titleLabel:"Lymphopenia (Lymphocytes <0.7)", titleLabelShort:"Lymph <0.7", titleLabelThreshold:400, titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noLymphopenia", "yesLymphopenia"], 
    buttonDoms:[], buttonHandlers:[onLymphopeniaUncheck, onLymphopeniaCheck]};
let cxrChangesMSOL = {
    rowId:"cxrChanges", rowDom:undefined, value:0, 
    titleLabel:"CXR Changes (>4 zones)", titleLabelShort:"CXR Changes", titleLabelThreshold:300,titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noCxrChanges", "yesCxrChanges"], 
    buttonDoms:[], buttonHandlers:[onCxrChangesUncheck, onCxrChangesCheck]};
let ckdStageRangeMSOL = { //0- CKD1. 1- CKD2. 2- CKD3. 3- CKD4. 4- CKD5. Not neccessarily a score.
    rowId:"ckdStageRange", rowDom:undefined, value:0, 
    titleLabel:"Renal Function", titleLabelShort:"CKD", titleLabelThreshold:380, titleWidth:30, titleDom:undefined, 
    buttonLabels:["CKD 1", "CKD 2", "CKD 3", "CKD 4", "CKD 5"], buttonLabelsShort:["1", "2", "3", "4", "5"], buttonLabelsThreshold:420,
    buttonIds:["ckd1", "ckd2", "ckd3", "ckd4", "ckd5"], 
    buttonDoms:[], buttonHandlers:[onCkd1Check, onCkd2Check, onCkd3Check, onCkd4Check, onCkd5Check]};
let gcsMSOL = {
    rowId:"gcs", rowDom:undefined, value:0, 
    titleLabel:"GCS < 15", titleWidth:65, titleDom:undefined, 
    buttonLabels:["No", "Yes"], buttonIds:["noGcs", "yesGcs"], 
    buttonDoms:[], buttonHandlers:[onLowGcsCheck, onNormGcsCheck]};
let maleMSOL = {
    rowId:"male", rowDom:undefined, value:0, 
    titleLabel:"Sex at birth", titleWidth:65, titleDom:undefined, 
    buttonLabels:["Female", "Male"], buttonLabelsShort:["F", "M"], buttonLabelsThreshold:330, 
    buttonIds:["femaleSex", "maleSex"], 
    buttonDoms:[], buttonHandlers:[onFemaleCheck, onMaleCheck]};
let comorbidRangeMSOL = {
    rowId:"comorbidRange", rowDom:undefined, value:0, 
    titleLabel:"Comorbidities", titleWidth:65, titleDom:undefined, 
    buttonLabels:["0", "1", "2+"], buttonIds:["comorbid0", "comorbid1", "comorbid2+"], 
    buttonDoms:[], buttonHandlers:[onComorbid0Check, onComorbid1Check, onComorbid2PlusCheck]};
let tachypneoaRangeMSOL = {
    rowId:"tachypneoaRange", rowDom:undefined, value:0, 
    titleLabel:"Respiratory Rate", titleWidth:65, titleDom:undefined, 
    buttonLabels:["<20", "20-30", ">30"], buttonIds:["respRateUnder20", "respRate20-29", "respRateOver30"], 
    buttonDoms:[], buttonHandlers:[onRrUnder20Check, onRr20to29Check, onRrOver30Check]};
let ureaRangeMSOL = {
    rowId:"ureaRange", rowDom:undefined, value:0, 
    titleLabel:"Urea", titleWidth:65, titleDom:undefined,
    buttonLabels:["<7", "7-14", ">14"], buttonIds:["ureaUnder7", "urea7to14", "ureaOver14"], 
    buttonDoms:[],buttonHandlers:[onUreaUnder7Check, onUrea7to14Check, onUreaOver14Check]};
let crpRangeMSOL = {
    rowId:"crpRange", rowDom:undefined, value:0, 
    titleLabel:"CRP", titleWidth:65, titleDom:undefined, 
    buttonLabels:["<50", "50-100", ">100"], buttonIds:["crpUnder50", "crp50to100", "crpOver100"], 
    buttonDoms:[], buttonHandlers:[onCrpUnder50Check, onCrp50to100Check, onCrpOver100Check]};

let commonButtonDescriptors = [ageRangeMSOL, satsMSOL];
let shortButtonDescriptors =  [tachypneoaMSOL, obesityMSOL, strokeMSOL];
let longButtonDescriptors =   [everSmokerMSOL, dementiaMSOL, leucophiliaMSOL, lymphopeniaMSOL, cxrChangesMSOL, ckdStageRangeMSOL];
let isaricButtonDescriptors = [gcsMSOL, maleMSOL, comorbidRangeMSOL, tachypneoaRangeMSOL, ureaRangeMSOL, crpRangeMSOL];

// Generate HTML for button elements
// Needs to be run before assigning DOM elements
generateAllButtons();
generateDomIdsFromMSOL(scoreSelectMSOL);
generateDomIdsForList(commonButtonDescriptors);
generateDomIdsForList(shortButtonDescriptors);
generateDomIdsForList(longButtonDescriptors);
generateDomIdsForList(isaricButtonDescriptors);

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
resizeHandler();            //To ensure that the correct responsive content is selected

//------------------------
//Document Generation Code
//------------------------

function generateAllButtons() {
    //TODO implement custom row order based on MSOL.sortOrder attribute (or could manually order in a single list)
    let htmlGeneratedButtonElements = ""
    htmlGeneratedButtonElements += generateRowFromMSOL(scoreSelectMSOL);
    htmlGeneratedButtonElements += generateRowWithButtonHtmlFromList(commonButtonDescriptors);
    htmlGeneratedButtonElements += generateRowWithButtonHtmlFromList(shortButtonDescriptors);
    htmlGeneratedButtonElements += generateRowWithButtonHtmlFromList(longButtonDescriptors);
    htmlGeneratedButtonElements += generateRowWithButtonHtmlFromList(isaricButtonDescriptors);
    document.getElementById("generatedHtml").innerHTML += htmlGeneratedButtonElements;
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

    generateEventListenerAttatchmentsFromMSOL(scoreSelectMSOL);
    generateEventListenersForList(commonButtonDescriptors);
    generateEventListenersForList(shortButtonDescriptors);
    generateEventListenersForList(longButtonDescriptors);
    generateEventListenersForList(isaricButtonDescriptors);

    window.addEventListener('resize', resizeHandler);
}

function encodeSOARSResult(isLongScore){

    //Two or three base32crockford characters 
    // 0x a b c d e ... f g h i j    ...    k l m n o
    //a - score type    f - age/ckd         k - smoker
    //b - SpO2          g - age/ckd         l - dementia
    //c - rr            h - age/ckd         m - wcc
    //d - obesity       i - age/ckd         n - lympho
    //e - stroke        j - age/ckd         o - cxr

    //'c' is Age + 5* CKD
    //'c' is decoded thus: Age = 'c' mod 5, CKD is 'c' / 5
    
    var alphabet = ["0", "1", "2", "3", "4", "5", "6", "7",
                    "8", "9", "A", "B", "C", "D", "E", "F",
                    "G", "H", "J", "K", "M", "N", "P", "Q",
                    "R", "S", "T", "V", "W", "X", "Y", "Z"];
    
    var code = "";
    code += alphabet[strokeMSOL.value + (2*obesityMSOL.value) + (4*tachypneoaMSOL.value) + (8*satsMSOL.value) + (isLongScore?16:0)];
    code += alphabet[ageRangeMSOL.value + (5*ckdStageRangeMSOL.value)];
    if(isLongScore){
        code += alphabet[cxrChangesMSOL.value + (2*lymphopeniaMSOL.value) + (4*leucophiliaMSOL.value) + (8*dementiaMSOL.value) + (16*everSmokerMSOL.value)];
    }
    return(code);
}

//Reposition
function resizeHandler(){
    setPreferredText(ckdStageRangeMSOL);
    setPreferredText(scoreSelectMSOL);
    setPreferredText(ageRangeMSOL);
    setPreferredText(satsMSOL);
    setPreferredText(tachypneoaMSOL);
    setPreferredText(obesityMSOL);
    setPreferredText(leucophiliaMSOL);
    setPreferredText(lymphopeniaMSOL);
    setPreferredText(cxrChangesMSOL);
    setPreferredText(maleMSOL);
}

//Reposition 
function setPreferredText(thisMSOL){
    var width = thisMSOL.rowDom.clientWidth;
    var t1 = thisMSOL.titleLabelThreshold;
    var t2 = thisMSOL.buttonLabelsThreshold;
    var i;

    thisMSOL.titleDom.innerHTML = width < t1 ? thisMSOL.titleLabelShort : thisMSOL.titleLabel;

    for(i = 0; i < thisMSOL.buttonDoms.length; i++){
        thisMSOL.buttonDoms[i].innerHTML = width < t2 ? thisMSOL.buttonLabelsShort[i] : thisMSOL.buttonLabels[i];
    }

}

function generateRowFromMSOL(thisMSOL){
    return(generateRowWithButtonHtml(thisMSOL.rowId, thisMSOL.titleLabel, thisMSOL.buttonIds, thisMSOL.buttonLabels, thisMSOL.titleWidth))
}

function generateDomIdsFromMSOL(thisMSOL){
    thisMSOL.rowDom = document.getElementById(thisMSOL.rowId);
    thisMSOL.titleDom = document.getElementById(thisMSOL.rowId + "Label");
    var i;
    for(i = 0; i < thisMSOL.buttonIds.length; i++){
        thisMSOL.buttonDoms.push(document.getElementById(thisMSOL.buttonIds[i]));
    }
}

function generateEventListenerAttatchmentsFromMSOL(thisMSOL){
    var i;
    for(i=0; i < thisMSOL.buttonDoms.length; i++){
        thisMSOL.buttonDoms[i].addEventListener("click", thisMSOL.buttonHandlers[i]);
    }
}

function generateDomIdsForList(thisMSOLList){
    thisMSOLList.forEach(generateDomIdsFromMSOL);
}

function generateEventListenersForList(thisMSOLList){
    thisMSOLList.forEach(generateEventListenerAttatchmentsFromMSOL);
}

function generateRowWithButtonHtmlFromList(thisMSOLList){
    let htmlReturnValue = "";
    var i;
    for(i=0;i<thisMSOLList.length;i++){
        htmlReturnValue += generateRowFromMSOL(thisMSOLList[i]);
    }
    return htmlReturnValue;
}

function generateRowWithButtonHtml(rowId, titleLabel, buttonIdArray, buttonLabelArray, titleWidth=65){
    if(buttonIdArray.length != buttonLabelArray.length){return "";}
    if(titleWidth < 0 || titleWidth >100){return"";}
    let htmlLabelFlexOverride = (titleWidth == 35 ? "" : " style=\"flex-basis: " + titleWidth+ "%;\"");
    let htmlButtonFlexOverride = (titleWidth == 35 ? "" : " style=\"flex-basis: " + (100 - titleWidth) + "%;\"");
    let htmlOutput = 
      "<div class=\"row\" id=\"" + rowId + "\">\n" +
      "  <div class=\"multiButtonLabel\" id=\""+ rowId + "Label\" " + htmlLabelFlexOverride +">\n" +
      "    " + titleLabel + "\n" +
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
    var mortalityComment = "";
    var auditCode="";
    var pathwayComment = "";
    switch (scoreType){
        case 0:
            //Short Score
            mortalityScore = calculateShortScore();
            auditCode = " (" + encodeSOARSResult(false) + ")";
            mortalityComment = (mortalityScore == 8 ? ">":"") + shortMortality[mortalityScore] + "%";
            pathwayComment = shortMortalityComment(mortalityScore);
            break;
        case 1:
            //Long Score
            mortalityScore = calculateLongScore();
            auditCode = " (" + encodeSOARSResult(true) + ")";
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
    + (mortalityScore) + " " + auditCode
    + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality risk: "
    + mortalityComment 
    + "</p><hr>"
    + pathwayComment;
}

function shortMortalityComment(score){
    var comment;
    if(score < 2){
        comment = "<p><strong>Green Pathway</strong><br />1. Discharge to the Virtual Hospital<br />2. Provide advice pack and Pulse Oximeter<br />3. Consider calling #7854 to discuss VH Drug Trial Eligibility, and provide Patient Information Leaflet and Consent Form to read.</p>";
    }
    else if (score == 2){
        comment = "<p><strong>Orange Pathway</strong><br /><span>1. Discuss with Medical Registrar / Consultant RE need for admission</span><br /><span>&nbsp; &nbsp; - If Low Risk, treat as Green Pathway</span><br /><span>2. If High Risk, Calculate SOARS Long Score</span><br /><span>&nbsp; &nbsp; - assess O</span><sub>2</sub><span>&nbsp;Requirements, Obtain bloods (FBCs, U+Es, LFTs, CRP) and CXR</span><br /><span>3. If Long Score &lt;7, consider conscious proning</span><br /><span>4. If Long Score &ge;7:</span><br /><span>&nbsp; &nbsp; - Add additional bloods: Ferritin, D-Dimer, Procalcitonin, BNP, LDH, LDH, Troponin</span><br /><span>&nbsp; &nbsp; - Consider fast-track COVID swab if MI or Stroke suspected</span><br /><span>&nbsp; &nbsp; - Consider IV Fluids</span><br /><span>&nbsp; &nbsp; - Consider Antibiotics per local antimicrobial policy and review when procalcitonin reported<br />&nbsp; &nbsp; - Consider Dexamethasone<br /></span><span>&nbsp; &nbsp; - Assess Clinical Frailty / Rockwell Score</span><br /><span>&nbsp; &nbsp; - Consider and discuss appropriate escalation and resuscitation status</span><br /><span>&nbsp; &nbsp; - Consider need for escalation of care</span></p>";
    }
    else if (score > 2){
        comment = "<p><strong>Red Pathway</strong><br />1. Calculate SOARS Long Score<br />&nbsp; &nbsp; - assess O<sub>2</sub> Requirements, Obtain bloods (FBCs, U+Es, LFTs, CRP) and CXR<br />2. If Long Score &lt;7, consider conscious proning<br />3. If Long Score &ge;7,<br />&nbsp; &nbsp; - Add additional bloods: Ferritin, D-Dimer, Procalcitonin, BNP, LDH, LDH, Troponin<br />&nbsp; &nbsp; - Consider fast-track COVID swab if MI or Stroke suspected<br />&nbsp; &nbsp; - Consider IV Fluids<br />&nbsp; &nbsp; - Consider Antibiotics per local antimicrobial policy and review when procalcitonin reported<br />&nbsp; &nbsp; - Assess Clinical Frailty / Rockwell Score<br />&nbsp; &nbsp; - Consider and discuss appropriate escalation and resuscitation status<br />&nbsp; &nbsp; - Consider need for escalation of care</p>";        
    }
    return comment;
}

function calculateShortScore(){
    //Age range category is directly linked to score, so can just add it.
    return (ageRangeMSOL.value + satsMSOL.value + tachypneoaMSOL.value + strokeMSOL.value + obesityMSOL.value);
}

function calculateLongScore(){
    //Long score is a superset of short score.
    //+1 because CKD scores are uniformly (category +1). 
    return calculateShortScore() + everSmokerMSOL.value + dementiaMSOL.value + leucophiliaMSOL.value + lymphopeniaMSOL.value + cxrChangesMSOL.value + ckdStageRangeMSOL.value + 1;
}

function calculateIsaricScore(){
    return isaricAgeRangeScore[ageRangeMSOL.value] + isaricUreaRangeScore[ureaRangeMSOL.value] + maleMSOL.value + 
        comorbidRangeMSOL.value + tachypneoaRangeMSOL.value + (2*satsMSOL.value) + (2*gcsMSOL.value) + crpRangeMSOL.value;
}

function onSetShortScore(){
    scoreType = 0;
    titleText.innerHTML = "SOARS Short Score";
    setMultiButtonActiveStyle(scoreSelectMSOL.buttonDoms, 0);
    shortButtonDescriptors.forEach(showRowByMSOL);
    longButtonDescriptors.forEach(hideRowByMSOL);
    isaricButtonDescriptors.forEach(hideRowByMSOL);
    getMortalityScore();
}

function onSetLongScore(){
    scoreType = 1;
    titleText.innerHTML = "SOARS Long Score";
    setMultiButtonActiveStyle(scoreSelectMSOL.buttonDoms, 1);
    shortButtonDescriptors.forEach(showRowByMSOL);  //Long test is a superset of short test
    isaricButtonDescriptors.forEach(hideRowByMSOL); 
    longButtonDescriptors.forEach(showRowByMSOL);
    getMortalityScore();
}

function onSetIsaricScore(){
    //TODO implement ISARIC score
    scoreType = 2;
    titleText.innerHTML = "ISARIC score";
    setMultiButtonActiveStyle(scoreSelectMSOL.buttonDoms, 2);
    shortButtonDescriptors.forEach(hideRowByMSOL);
    longButtonDescriptors.forEach(hideRowByMSOL);
    isaricButtonDescriptors.forEach(showRowByMSOL);
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
    var nhsNumString = inputNhsNumber.replace(/\s/g, '').toString();
    var nhsNumArray = inputNhsNumber.toString().split('');
    var i;
    var tot = 0;
    var check;
    for(i = 0; i < 9; i++){
        tot += nhsNumArray[i] * (10-i);
    } 
    check = 11- (tot % 11);
    if(check == 10){return false;}
    if(check == 11){check = 0;}
    return(check == nhsNumArray[9]);
}

function isNhsNumberRangeValid(inputNhsNumber){
    //010 101 000x to 311 299 999x is reserved for NHS Scotland CHI Numbers
    //320 000 000x to 399 999 999x is reserved for Northern Ireland H&C Numbers
    //Anecdotally the current range of NHS Numbers within England, Wales, and IoM are
    //400 000 000x to 499 999 999x, and
    //600 000 000x to 708 800 000x
    if(inputNhsNumber < 3999999999 && inputNhsNumber > 3200000000){ return false;}  //NI H&C Number
    if(inputNhsNumber < 3112999999 && inputNhsNumber >  101010000){ return false;}  //Scottish CHI Number
    return true;     //Not in NI or Scotland reserved range. Does not guarentee this range is active.
}

function nhsNumberSearch(){
    //TODO implement NHS Number Lookup
    //Do something to lookup the NHS Number
    //resultText.innerHTML = "<p style=\"font-size:35px;\"> NHS number not found... " + "</p>";
}

//--------------------------
//DOM Manipulation functions
//--------------------------

function setButtonStyle(targetButton, isActive){
    targetButton.style.backgroundColor = isActive ? activeBackgroundColour : inactiveBackroundColour;
    targetButton.style.color = isActive ? activeTextColour : inactiveTextColour;
}

function setButtonStyleInactive(targetButton){
    setButtonStyle(targetButton, false);
}

function setMultiButtonActiveStyle(multiButtonArray, activeButtonIndex){
    multiButtonArray.forEach(setButtonStyleInactive);
    setButtonStyle(multiButtonArray[activeButtonIndex], true);
}

function setMSOLActiveStyle(msolElement, activeButtonIndex){
    msolElement.value = activeButtonIndex;
    msolElement.buttonDoms.forEach(setButtonStyleInactive);
    setButtonStyle(msolElement.buttonDoms[activeButtonIndex], true);
    getMortalityScore();
}

function setTextboxValidStyle(targetTextbox, valid){
    targetTextbox.style.backgroundColor = valid ? validatedTextboxColour : invalidTextboxColour;
    targetTextbox.style.color = valid ? 'white' : 'black'; 
}

function setTextboxDefaultStyle(targetTextbox){
    targetTextbox.style.backgroundColor = defaultTextboxColour;
    targetTextbox.style.color = 'black';
}

function setDobFieldValidity(isValid){
    if(!isValid){ dob.value=""; setTextboxDefaultStyle(dob);}
    else{                       setTextboxValidStyle(  dob, true);}
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

//------------------------
//Event Listener Functions
//------------------------
function onTachypneoaUncheck(){ setMSOLActiveStyle(tachypneoaMSOL, 0);}
function onTachypneoaCheck()  { setMSOLActiveStyle(tachypneoaMSOL, 1);}

function onDesaturatedUncheck(){ setMSOLActiveStyle(satsMSOL, 0);}
function onDesaturatedCheck()  { setMSOLActiveStyle(satsMSOL, 1);}

function onStrokeUncheck(){ setMSOLActiveStyle(strokeMSOL, 0);}
function onStrokeCheck()  { setMSOLActiveStyle(strokeMSOL, 1);}

function onObesityUncheck(){setMSOLActiveStyle(obesityMSOL, 0);}
function onObesityCheck()  {setMSOLActiveStyle(obesityMSOL, 1);}

function onEverSmokerUncheck(){setMSOLActiveStyle(everSmokerMSOL, 0);}
function onEverSmokerCheck()  {setMSOLActiveStyle(everSmokerMSOL, 1);}

function onDementiaUncheck(){setMSOLActiveStyle(dementiaMSOL, 0);}
function onDementiaCheck()  {setMSOLActiveStyle(dementiaMSOL, 1);}

function onLeucophiliaUncheck(){setMSOLActiveStyle(leucophiliaMSOL, 0);}
function onLeucophiliaCheck()  {setMSOLActiveStyle(leucophiliaMSOL, 1);}

function onLymphopeniaUncheck(){setMSOLActiveStyle(lymphopeniaMSOL, 0);}
function onLymphopeniaCheck()  {setMSOLActiveStyle(lymphopeniaMSOL, 1);}

function onCxrChangesUncheck(){ setMSOLActiveStyle(cxrChangesMSOL, 0);}
function onCxrChangesCheck()  { setMSOLActiveStyle(cxrChangesMSOL, 1);}

function onAgeUnder50check()    { ageButtonBaseListener(0,  0, 50); }
function onAgeBetween5059check(){ ageButtonBaseListener(1, 50, 60); }
function onAgeBetween6069check(){ ageButtonBaseListener(2, 60, 70); }
function onAgeBetween7079check(){ ageButtonBaseListener(3, 70, 80); }
function onAgeOver80check()     { ageButtonBaseListener(4, 80,  0); }
function ageButtonBaseListener(buttonIndex, lowLimit, highLimit){
    setMSOLActiveStyle(ageRangeMSOL, buttonIndex);
    if      ( lowLimit &&  highLimit)   {demographicAgeYears = demographicAgeYears >= lowLimit && demographicAgeYears < highLimit ? demographicAgeYears : 0;}
    else if ( lowLimit && !highLimit)   {demographicAgeYears = demographicAgeYears >= lowLimit ? demographicAgeYears : 0;}
    else if (!lowLimit &&  highLimit)   {demographicAgeYears = demographicAgeYears < highLimit ? demographicAgeYears : 0;}
//  else if (!lowLimit && !highLimit)   {/*Always True; no action*/}
    setDobFieldValidity(demographicAgeYears);
    getMortalityScore();
}

function onCkd1Check(){ckdButtonBaseListener(0);}
function onCkd2Check(){ckdButtonBaseListener(1);}
function onCkd3Check(){ckdButtonBaseListener(2);}
function onCkd4Check(){ckdButtonBaseListener(3);}
function onCkd5Check(){ckdButtonBaseListener(4);}
function ckdButtonBaseListener(buttonIndex){ setMSOLActiveStyle(ckdStageRangeMSOL, buttonIndex);}

function onLowGcsCheck() { setMSOLActiveStyle(gcsMSOL, 0);}
function onNormGcsCheck(){ setMSOLActiveStyle(gcsMSOL, 1);}

function onFemaleCheck(){ setMSOLActiveStyle(maleMSOL, 0);}
function onMaleCheck()  { setMSOLActiveStyle(maleMSOL, 1);}

function onComorbid0Check()    { setMSOLActiveStyle(comorbidRangeMSOL, 0);}
function onComorbid1Check()    { setMSOLActiveStyle(comorbidRangeMSOL, 1);}
function onComorbid2PlusCheck(){ setMSOLActiveStyle(comorbidRangeMSOL, 2);}

function onRrUnder20Check(){ setMSOLActiveStyle(tachypneoaRangeMSOL, 0);}
function onRr20to29Check() { setMSOLActiveStyle(tachypneoaRangeMSOL, 1);}
function onRrOver30Check() { setMSOLActiveStyle(tachypneoaRangeMSOL, 2);}

function onUreaUnder7Check(){ setMSOLActiveStyle(ureaRangeMSOL, 0);}
function onUrea7to14Check(){  setMSOLActiveStyle(ureaRangeMSOL, 1);}
function onUreaOver14Check(){ setMSOLActiveStyle(ureaRangeMSOL, 2);}

function onCrpUnder50Check(){ setMSOLActiveStyle(crpRangeMSOL, 0);}
function onCrp50to100Check(){ setMSOLActiveStyle(crpRangeMSOL, 1);}
function onCrpOver100Check(){ setMSOLActiveStyle(crpRangeMSOL, 2);}

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
        demographicLName = lName;
    }
    else{
        setTextboxDefaultStyle(lName);
    }
}

function onDobChange(){
    let ageMiliseconds = Date.now() - Date.parse(dob.value);
    demographicAgeYears = Math.floor(ageMiliseconds / (3600000 * 24 *365.25));
    demographicDoB = dob.value;
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
        var patientNhsNumber = validNhsN;
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
        spo2Data:    satsMSOL.value,
        strokeData:  strokeMSOL.value,
        obesityData: obesityMSOL.value,
        scoreData:   mortalityScore});
}

/*
 sends a request to the specified url from a form. this will change the window location.
 @param {string} path the path to send the post request to
 @param {object} params the paramiters to add to the url
 @param {string} [method=post] the method to use on the form
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