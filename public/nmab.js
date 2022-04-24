// MAIN VALUES
console.log("Hello this is Ale");
//Button Styles
const activeBackgroundColour = '#0066cc';       //Background colour for active buttons
const activeTextColour = 'white';               //Text Colour for active buttons
const inactiveBackroundColour = 'lightgray';    //Background colour for inactive buttons
const inactiveTextColour = 'black';             //Text Colour for inactive buttons
const validatedTextboxColour = 'green';
const invalidTextboxColour = 'orange';
const defaultTextboxColour = 'lightgray';

// Assign DOM elements to variables

let down = document.getElementById("down");
let solidCancer = document.getElementById("solidCancer");
let haem = document.getElementById("haem");
let renal = document.getElementById("renal");
let liver = document.getElementById("liver");
let IMID = document.getElementById("IMID");
let immune = document.getElementById("immune");
let HIV = document.getElementById("HIV");
let transplant = document.getElementById("transplant");
let neuro = document.getElementById("neuro");

let yesDown = document.getElementById("yesDown");
let noDown = document.getElementById("noDown");
let yesSolidCancer = document.getElementById("yesSolidCancer");
let noSolidCancer = document.getElementById("noSolidCancer");
let yesHaem = document.getElementById("yesHaem");
let noHaem = document.getElementById("noHaem");
let yesRenal = document.getElementById("yesRenal");
let noRenal = document.getElementById("noRenal");
let yesLiver = document.getElementById("yesLiver");
let noLiver = document.getElementById("noLiver");
let yesIMID = document.getElementById("yesIMID");
let noIMID = document.getElementById("noIMID");
let yesImmune = document.getElementById("yesImmune");
let noImmune = document.getElementById("noImmune");
let yesHIV = document.getElementById("yesHIV");
let noHIV = document.getElementById("noHIV");
let yesTransplant = document.getElementById("yesTransplant");
let noTransplant = document.getElementById("noTransplant");
let yesNeuro = document.getElementById("yesNeuro");
let noNeuro = document.getElementById("noNeuro");

let yesEligible1 = document.getElementById("yesEligible1");
let noEligible1 = document.getElementById("noEligible1");
let yesEligible2 = document.getElementById("yesEligible2");
let noEligible2 = document.getElementById("noEligible2");
let yesEligible3 = document.getElementById("yesEligible3");
let noEligible3 = document.getElementById("noEligible3");
let yesEligible4 = document.getElementById("yesEligible4");
let noEligible4 = document.getElementById("noEligible4");
let yesEligible5 = document.getElementById("yesEligible5");
let noEligible5 = document.getElementById("noEligible5");
let yesEligible6 = document.getElementById("yesEligible6");
let noEligible6 = document.getElementById("noEligible6");
let yesEligible7 = document.getElementById("yesEligible7");
let noEligible7 = document.getElementById("noEligible7");
let yesEligible8 = document.getElementById("yesEligible8");
let noEligible8 = document.getElementById("noEligible8");

let resultText = document.getElementById("resultText");
let submitButton = document.getElementById("submitButton");

yesDown.addEventListener("click", onDownCheck);
noDown.addEventListener("click", onDownUncheck);

yesSolidCancer.addEventListener("click", onSolidCancerCheck);
noSolidCancer.addEventListener("click", onSolidCancerUncheck);

yesHaem.addEventListener("click", onHaemCheck);
noHaem.addEventListener("click", onHaemUncheck);

yesRenal.addEventListener("click", onRenalCheck);
noRenal.addEventListener("click", onRenalUncheck);

yesLiver.addEventListener("click", onLiverCheck);
noLiver.addEventListener("click", onLiverUncheck);

yesIMID.addEventListener("click", onIMIDCheck);
noIMID.addEventListener("click", onIMIDUncheck);

yesImmune.addEventListener("click", onImmuneCheck);
noImmune.addEventListener("click", onImmuneUncheck);

yesHIV.addEventListener("click", onHIVCheck);
noHIV.addEventListener("click", onHIVUncheck);

yesTransplant.addEventListener("click", onTransplantCheck);
noTransplant.addEventListener("click", onTransplantUncheck);

yesNeuro.addEventListener("click", onNeuroCheck);
noNeuro.addEventListener("click", onNeuroUncheck);

yesEligible1.addEventListener("click", onEligible1Check);
noEligible1.addEventListener("click", onEligible1Uncheck);
yesEligible2.addEventListener("click", onEligible2Check);
noEligible2.addEventListener("click", onEligible2Uncheck);
yesEligible3.addEventListener("click", onEligible3Check);
noEligible3.addEventListener("click", onEligible3Uncheck);
yesEligible4.addEventListener("click", onEligible4Check);
noEligible4.addEventListener("click", onEligible4Uncheck);
yesEligible5.addEventListener("click", onEligible5Check);
noEligible5.addEventListener("click", onEligible5Uncheck);
yesEligible6.addEventListener("click", onEligible6Check);
noEligible6.addEventListener("click", onEligible6Uncheck);
yesEligible7.addEventListener("click", onEligible7Check);
noEligible7.addEventListener("click", onEligible7Uncheck);
yesEligible8.addEventListener("click", onEligible8Check);
noEligible8.addEventListener("click", onEligible8Uncheck);

submitButton.addEventListener('click', onSubmitButtonPress);


let downV = false;
let solidCancerV = false;
let heamV = false;
let renalV = false;
let liverV = false;
let IMIDV = false;
let HIVV = false;
let transplantV = false;
let neuroV = false;

resultRow = document.getElementsById("resultRow");
// Display result
function getResults() {
    
    resultRow.style.background = "red";
    
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Patient is at highest risk from COVID-19 and should be prioritised for treatment with nMABs </p>";
    //resultText.style.background = "red";
    window.scrollBy(0, 600);
}

function deleteResults() {
    resultText.innerHTML = "";
    resultRow.style.background = "#0066cc";

}
function setButtonStyle(targetButton, isActive) {
    targetButton.style.backgroundColor = isActive ? activeBackgroundColour : inactiveBackroundColour;
    targetButton.style.color = isActive ? activeTextColour : inactiveTextColour;
}

function toggleButtonStyles(activeButton, inactiveButton) {
    setButtonStyle(activeButton, true);
    setButtonStyle(inactiveButton, false);
}



function onDownCheck() {
    downV = true;
    toggleButtonStyles(yesDown, noDown);
    var content = document.getElementById("contentDown");
    content.style.display = "block";
    getResults();
}

function onDownUncheck() {
    downV = false
    toggleButtonStyles(noDown, yesDown);
    var content = document.getElementById("contentDown");
    content.style.display = "none";
    deleteResults();
}

function onSolidCancerCheck() {
    solidCancerV = true;
    toggleButtonStyles(yesSolidCancer, noSolidCancer);
    var content = document.getElementById("contentSolidCancer");
    content.style.display = "block";
}

function onSolidCancerUncheck() {
    solidCancerV = false;
    toggleButtonStyles(noSolidCancer, yesSolidCancer);
    var content = document.getElementById("contentSolidCancer");
    content.style.display = "none";
    onEligible1Uncheck()
}

function onHaemCheck() {
    heamV = true;
    toggleButtonStyles(yesHaem, noHaem);
    var content = document.getElementById("contentHaem");
    content.style.display = "block";
}

function onHaemUncheck() {
    heamV = false;
    toggleButtonStyles(noHaem, yesHaem);
    var content = document.getElementById("contentHaem");
    content.style.display = "none";
    onEligible2Uncheck()
}

function onRenalCheck() {
    renalV = true;
    toggleButtonStyles(yesRenal, noRenal);
    var content = document.getElementById("contentRenal");
    content.style.display = "block";
}

function onRenalUncheck() {
    renalV = false;
    toggleButtonStyles(noRenal, yesRenal);
    var content = document.getElementById("contentRenal");
    content.style.display = "none";
    onEligible3Uncheck()
}

function onLiverCheck() {
    obesity = true;
    toggleButtonStyles(yesLiver, noLiver);
    var content = document.getElementById("contentLiver");
    content.style.display = "block";

}

function onLiverUncheck() {
    obesity = false;
    toggleButtonStyles(noLiver, yesLiver);
    var content = document.getElementById("contentLiver");
    content.style.display = "none";
    onEligible4Uncheck()
}

function onIMIDCheck() {
    obesity = true;
    toggleButtonStyles(yesIMID, noIMID);
    var content = document.getElementById("contentIMID");
    content.style.display = "block";
}

function onIMIDUncheck() {
    obesity = false;
    toggleButtonStyles(noIMID, yesIMID);
    var content = document.getElementById("contentIMID");
    content.style.display = "none";
    onEligible5Uncheck()
}

function onImmuneCheck() {
    obesity = true;
    toggleButtonStyles(yesImmune, noImmune);
    var content = document.getElementById("contentImmune");
    content.style.display = "block";
}

function onImmuneUncheck() {
    obesity = false;
    toggleButtonStyles(noImmune, yesImmune);
    var content = document.getElementById("contentImmune");
    content.style.display = "none";
    onEligible6Uncheck()
}

function onHIVCheck() {
    obesity = true;
    toggleButtonStyles(yesHIV, noHIV);
    var content = document.getElementById("contentHIV");
    content.style.display = "block";
}

function onHIVUncheck() {
    obesity = false;
    toggleButtonStyles(noHIV, yesHIV);
    var content = document.getElementById("contentHIV");
    content.style.display = "none";
    onEligible7Uncheck()
}

function onTransplantCheck() {
    obesity = true;
    toggleButtonStyles(yesTransplant, noTransplant);
    var content = document.getElementById("contentTransplant");
    content.style.display = "block";
    getResults();
}

function onTransplantUncheck() {
    obesity = false;
    toggleButtonStyles(noTransplant, yesTransplant);
    var content = document.getElementById("contentTransplant");
    content.style.display = "none";
    deleteResults();
}

function onNeuroCheck() {
    obesity = true;
    toggleButtonStyles(yesNeuro, noNeuro);
    var content = document.getElementById("contentNeuro");
    content.style.display = "block";

}

function onNeuroUncheck() {
    obesity = false;
    toggleButtonStyles(noNeuro, yesNeuro);
    var content = document.getElementById("contentNeuro");
    content.style.display = "none";
    onEligible7Uncheck()
}

function onEligible1Check() {
    toggleButtonStyles(yesEligible1, noEligible1);
    getResults();
}

function onEligible1Uncheck() {
    toggleButtonStyles(noEligible1, yesEligible1);
    deleteResults();
}

function onEligible2Check() {
    toggleButtonStyles(yesEligible2, noEligible2);
    getResults();
}

function onEligible2Uncheck() {
    toggleButtonStyles(noEligible2, yesEligible2);
    deleteResults();
}

function onEligible3Check() {
    toggleButtonStyles(yesEligible3, noEligible3);
    getResults();
}

function onEligible3Uncheck() {
    toggleButtonStyles(noEligible3, yesEligible3);
    deleteResults();
}

function onEligible4Check() {
    toggleButtonStyles(yesEligible4, noEligible4);
    getResults();
}

function onEligible4Uncheck() {
    toggleButtonStyles(noEligible4, yesEligible4);
    deleteResults();
}
function onEligible5Check() {
    toggleButtonStyles(yesEligible5, noEligible5);
    getResults();
}

function onEligible5Uncheck() {
    toggleButtonStyles(noEligible5, yesEligible5);
    deleteResults();
}
function onEligible6Check() {
    toggleButtonStyles(yesEligible6, noEligible6);
    getResults();
}

function onEligible6Uncheck() {
    toggleButtonStyles(noEligible6, yesEligible6);
    deleteResults();
}
function onEligible7Check() {
    toggleButtonStyles(yesEligible7, noEligible7);
    getResults();
}

function onEligible7Uncheck() {
    toggleButtonStyles(noEligible7, yesEligible7);
    deleteResults();
}
function onEligible8Check() {
    toggleButtonStyles(yesEligible8, noEligible8);
    getResults();
}

function onEligible8Uncheck() {
    toggleButtonStyles(noEligible8, yesEligible8);
    deleteResults();
}


function onSubmitButtonPress() {
    // postData("http://15.161.6.195:3000/sendData", {
    //     nhsData:     nhsNumber.value,
    //     nameData:    fName.value, 
    //     surnameData: lName.value, 
    //     dobData:     dob.value,
    //     ageData:     ageScore,
    //     respData:    tachypneoa  ? 1 : 0,
    //     spo2Data:    desaturated ? 1 : 0,
    //     strokeData:  stroke      ? 1 : 0,
    //     obesityData: obesity     ? 1 : 0,
    //     scoreData:   mortalityScore});
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
function postData(path, params, method = 'post') {

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
/**
var coll = document.getElementsByClassName("collapsible-open");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("content");
    content.style.display = "block";

  });
}

var coll = document.getElementsByClassName("collapsible-close");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("content");
    content.style.display = "none";
  });
}
 */





