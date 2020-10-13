// MAIN VALUES
// Starting scores
let mortalitySum = 0;

let ageSum = 0;
let resp = 0;
let spo = 0;
let stroke = 0;
let obesity = 0;

// Array of mortality scores
let mortality = ["1.4%","5.3%", "5.9%", "19.7%", "33.3%", "39.7%", "40%", "40.6%", "47.9%", "74.6%", "77.8%", ">77.8%"]

// Assign DOM elements to variables
let resultText = document.getElementById("resultText");
let yesresp = document.getElementById("yesresp");
let noresp = document.getElementById("noresp");
let yesspo = document.getElementById("yesspo");
let nospo = document.getElementById("nospo");

// Display result
function getMortalityScore(){
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Score = " + (mortalitySum+ageSum) + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality rate: " + mortality[(mortalitySum+ageSum)] + "</p>";
}

    // Adding score based on chosen predictors

// Respiratory rate >24/m
yesresp.addEventListener("click", respcheck);
// Respiratory rate >24/m checked
function respcheck(){
    // logic
    resp = 1;
    mortalitySum++;
    // update result
    getMortalityScore()
    // modify yes button style and remove eventListener
    yesresp.removeEventListener("click", respcheck);
    yesresp.style.backgroundColor = '#0066cc';
    yesresp.style.color = 'white';
    // modify no button style and add eventListener
    noresp.addEventListener("click", respuncheck);
    noresp.style.backgroundColor = 'lightgrey';
    noresp.style.color = 'black';
}
                /* WIP refactoring buttons behaviour functions
                var btnY = function() {
                    btnCheck(resp, yesresp, noresp)
                }

                yesresp.addEventListener("click", function btnY(){
                    btnCheck(resp, yesresp, noresp)}, true);
                function btnCheck(predictor, buttonToUncheck, buttonToCheck){
                    yesresp.removeEventListener("click", btnY, true);
                    predictor = 1;
                    mortalitySum++;
                    getMortalityScore()
                    console.log(buttonToCheck)
                    
                    buttonToUncheck.style.backgroundColor = '#117d67';
                    buttonToUncheck.style.color = 'white';
                        // modify no button style and add eventListener
                    //buttonToCheck.addEventListener("click", btnUncheck);
                    buttonToCheck.style.backgroundColor = 'lightgrey';
                    buttonToCheck.style.color = 'black';
                }
                */
function respuncheck(){
    // logic
    resp = 0;
    mortalitySum--;
    // update result
    getMortalityScore()
    // modify no button style and remove eventListener 
    noresp.removeEventListener("click", respuncheck);
    noresp.style.backgroundColor = '#0066cc';
    noresp.style.color = 'white';
    // modify yes button style and add eventListener
    yesresp.addEventListener("click", respcheck);
    yesresp.style.backgroundColor = 'lightgrey';
    yesresp.style.color = 'black';

}

// SpO

yesspo.addEventListener("click", spocheck);
function spocheck(){
    spo = 1;
    yesspo.style.backgroundColor = '#0066cc';
    yesspo.style.color = 'white';
    mortalitySum++;
    yesspo.removeEventListener("click", spocheck);
    nospo.addEventListener("click", spouncheck);
    nospo.style.backgroundColor = 'lightgrey';
    nospo.style.color = 'black';
    getMortalityScore()
}
function spouncheck(){
    spo = 0;
    nospo.style.backgroundColor = '#0066cc';
    nospo.style.color = 'white';
    mortalitySum--;
    nospo.removeEventListener("click", spouncheck);
    yesspo.addEventListener("click", spocheck);
    yesspo.style.backgroundColor = 'lightgrey';
    yesspo.style.color = 'black';
    getMortalityScore()
}

// Stroke
let yesstroke = document.getElementById("yesstroke");
let nostroke = document.getElementById("nostroke");
yesstroke.addEventListener("click", strokecheck);
function strokecheck(){
    stroke = 1;
    yesstroke.style.backgroundColor = '#0066cc';
    yesstroke.style.color = 'white';
    mortalitySum++;
    yesstroke.removeEventListener("click", strokecheck);
    nostroke.addEventListener("click", strokeuncheck);
    nostroke.style.backgroundColor = 'lightgrey';
    nostroke.style.color = 'black';
    getMortalityScore()
}
function strokeuncheck(){
    stroke = 0;
    nostroke.style.backgroundColor = '#0066cc';
    nostroke.style.color = 'white';
    mortalitySum--;
    nostroke.removeEventListener("click", strokeuncheck);
    yesstroke.addEventListener("click", strokecheck);
    yesstroke.style.backgroundColor = 'lightgrey';
    yesstroke.style.color = 'black';
    getMortalityScore()
}

// Obesity
let yesobesity = document.getElementById("yesobesity");
let noobesity = document.getElementById("noobesity");
yesobesity.addEventListener("click", obesitycheck);
function obesitycheck(){
    obesity = 1;
    yesobesity.style.backgroundColor = '#0066cc';
    yesobesity.style.color = 'white';
    mortalitySum++;
    yesobesity.removeEventListener("click", obesitycheck);
    noobesity.addEventListener("click", obesityuncheck);
    noobesity.style.backgroundColor = 'lightgrey';
    noobesity.style.color = 'black';
    getMortalityScore()
}
function obesityuncheck(){
    obesity = 0;
    noobesity.style.backgroundColor = '#0066cc';
    noobesity.style.color = 'white';
    mortalitySum--;
    noobesity.removeEventListener("click", obesityuncheck);
    yesobesity.addEventListener("click", obesitycheck);
    yesobesity.style.backgroundColor = 'lightgrey';
    yesobesity.style.color = 'black';
    getMortalityScore()
}

// Age
let ageless50 = document.getElementById("less50");
let age5059 = document.getElementById("age50-59");
let age6069 = document.getElementById("age60-69");
let age7079 = document.getElementById("age70-79");
let agemore80 = document.getElementById("more80");

ageless50.addEventListener("click", ageless50check);
function ageless50check(){
    allAgeUncheck();
    ageless50.style.backgroundColor = '#0066cc';
    ageless50.style.color = 'white';
    ageless50.removeEventListener("click", ageless50check);
    ageless50.addEventListener("click", ageless50uncheck);
    getMortalityScore()
}
function ageless50uncheck(){
    ageless50.addEventListener("click", ageless50check);
    ageless50.style.backgroundColor = 'lightgrey';
    ageless50.style.color = 'black';
    ageless50.removeEventListener("click", ageless50uncheck);
    ageless50.addEventListener("click", ageless50check);
    getMortalityScore()
}

age5059.addEventListener("click", age5059check);
function age5059check(){
    allAgeUncheck();
    age5059.style.backgroundColor = '#0066cc';
    age5059.style.color = 'white';
    ageSum+=1;
    age5059.removeEventListener("click", age5059check);
    age5059.addEventListener("click", age5059uncheck);
    getMortalityScore()
}
function age5059uncheck(){
    ageSum = 0;
    age5059.addEventListener("click", age5059check);
    age5059.style.backgroundColor = 'lightgrey';
    age5059.style.color = 'black';
    age5059.removeEventListener("click", age5059uncheck);
    age5059.addEventListener("click", age5059check);
    getMortalityScore()
}

age6069.addEventListener("click", age6069check);
function age6069check(){
    allAgeUncheck();
    age6069.style.backgroundColor = '#0066cc';
    age6069.style.color = 'white';
    ageSum+=2;
    age6069.removeEventListener("click", age6069check);
    age6069.addEventListener("click", age6069uncheck);
    getMortalityScore()
}
function age6069uncheck(){
    ageSum = 0;
    age6069.addEventListener("click", age6069check);
    age6069.style.backgroundColor = 'lightgrey';
    age6069.style.color = 'black';
    age6069.removeEventListener("click", age6069uncheck);
    age6069.addEventListener("click", age6069check);
    getMortalityScore()
}

age7079.addEventListener("click", age7079check);
function age7079check(){
    allAgeUncheck();
    age7079.style.backgroundColor = '#0066cc';
    age7079.style.color = 'white';
    ageSum+=5;
    age7079.removeEventListener("click", age7079check);
    age7079.addEventListener("click", age7079uncheck);
    getMortalityScore()
}
function age7079uncheck(){
    ageSum = 0;
    age7079.style.backgroundColor = 'lightgrey';
    age7079.style.color = 'black';
    age7079.removeEventListener("click", age7079uncheck);
    age7079.addEventListener("click", age7079check);
    getMortalityScore()
}

agemore80.addEventListener("click", agemore80check);
function agemore80check(){
    allAgeUncheck();
    ageSum+=7;
    agemore80.style.backgroundColor = '#0066cc';
    agemore80.style.color = 'white';
    console.log("added 4")
    agemore80.removeEventListener("click", agemore80check);
    agemore80.addEventListener("click", agemore80uncheck);
    getMortalityScore()
}
function agemore80uncheck(){
    ageSum = 0;
    console.log("removed 4")
    agemore80.addEventListener("click", agemore80check);
    agemore80.style.backgroundColor = 'lightgrey';
    agemore80.style.color = 'black';
    agemore80.removeEventListener("click", agemore80uncheck);
    agemore80.addEventListener("click", agemore80check);
    getMortalityScore()
}

function allAgeUncheck(){
    ageSum = 0;
    ageless50uncheck();
    age5059uncheck();
    age6069uncheck();
    age7079uncheck();
    agemore80uncheck();
}

// TODO: uncheck previous age button when new one is clicked
// function uncheckAll(){}

let nhsNumber = document.getElementById("nhsnumber");
let name = document.getElementById("name");
let surname = document.getElementById("surname");
let dob = document.getElementById("dob");
nhsNumber.addEventListener('change', nhsNumberSearch);

function nhsNumberSearch(){
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

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', submitData);

function submitData(){
    postData("http://15.161.6.195:3000/sendData", {nhsData: nhsNumber.value,
    nameData: name.value, surnameData: surname.value, dobData: dob.value, ageData: ageSum,
    respData: resp, spo2Data: spo, strokeData: stroke,
    obesityData: obesity, scoreData: mortalitySum+ageSum})
}
