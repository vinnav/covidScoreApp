// MAIN VALUES
// Starting scores
let mortalitySum = 0;

let ageSum = 0;
let ckdSum = 0;

let resp = 0;
let spo = 0;
let stroke = 0;
let obesity = 0;
let smoker = 0;
let dementia = 0;
let wcc = 0;
let ckd = 0;
let lymph = 0;
let cxr = 0;

// Array of mortality scores
let mortality = ["1.4%","5.3%", "5.9%", "19.7%", "33.3%", "39.7%", "40%", "40.6%", "47.9%", "74.6%", "77.8%", ">77.8%"]

// Result logic
let resultText = document.getElementById("resultText");

function getMortalityScore(){
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Score = " + (mortalitySum+ageSum+ckdSum);
    //  + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality rate: " + mortality[(mortalitySum+ageSum)] + "</p>"
}
// Adding points on pressing buttons
// Respiratory rate >24/m
let yesresp = document.getElementById("yesresp");
let noresp = document.getElementById("noresp");
yesresp.addEventListener("click", respcheck);
function respcheck(){
    resp = 1;
    yesresp.style.backgroundColor = '#0066cc';
    yesresp.style.color = 'white';
    mortalitySum++;
    yesresp.removeEventListener("click", respcheck);
    noresp.addEventListener("click", respuncheck);
    noresp.style.backgroundColor = 'lightgrey';
    noresp.style.color = 'black';
    getMortalityScore()
}
function respuncheck(){
    resp = 0;
    noresp.style.backgroundColor = '#0066cc';
    noresp.style.color = 'white';
    mortalitySum--;
    noresp.removeEventListener("click", respuncheck);
    yesresp.addEventListener("click", respcheck);
    yesresp.style.backgroundColor = 'lightgrey';
    yesresp.style.color = 'black';
    getMortalityScore()
}

// SpO
let yesspo = document.getElementById("yesspo");
let nospo = document.getElementById("nospo");
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

// Smoker
let yessmoker = document.getElementById("yessmoker");
let nosmoker = document.getElementById("nosmoker");
yessmoker.addEventListener("click", smokercheck);
function smokercheck(){
    smoker = 1;
    yessmoker.style.backgroundColor = '#0066cc';
    yessmoker.style.color = 'white';
    mortalitySum++;
    yessmoker.removeEventListener("click", smokercheck);
    nosmoker.addEventListener("click", smokeruncheck);
    nosmoker.style.backgroundColor = 'lightgrey';
    nosmoker.style.color = 'black';
    getMortalityScore()
}
function smokeruncheck(){
    obesity = 0;
    nosmoker.style.backgroundColor = '#0066cc';
    nosmoker.style.color = 'white';
    mortalitySum--;
    nosmoker.removeEventListener("click", smokeruncheck);
    yessmoker.addEventListener("click", smokercheck);
    yessmoker.style.backgroundColor = 'lightgrey';
    yessmoker.style.color = 'black';
    getMortalityScore()
}

// Dementia
let yesdementia = document.getElementById("yesdementia");
let nodementia = document.getElementById("nodementia");
yesdementia.addEventListener("click", dementiacheck);
function dementiacheck(){
    smoker = 1;
    yesdementia.style.backgroundColor = '#0066cc';
    yesdementia.style.color = 'white';
    mortalitySum++;
    yesdementia.removeEventListener("click", dementiacheck);
    nodementia.addEventListener("click", dementiauncheck);
    nodementia.style.backgroundColor = 'lightgrey';
    nodementia.style.color = 'black';
    getMortalityScore()
}
function dementiauncheck(){
    obesity = 0;
    nodementia.style.backgroundColor = '#0066cc';
    nodementia.style.color = 'white';
    mortalitySum--;
    nodementia.removeEventListener("click", dementiauncheck);
    yesdementia.addEventListener("click", dementiacheck);
    yesdementia.style.backgroundColor = 'lightgrey';
    yesdementia.style.color = 'black';
    getMortalityScore()
}

// wcc
let yeswcc = document.getElementById("yeswcc");
let nowcc = document.getElementById("nowcc");
yeswcc.addEventListener("click", wcccheck);
function wcccheck(){
    smoker = 1;
    yeswcc.style.backgroundColor = '#0066cc';
    yeswcc.style.color = 'white';
    mortalitySum++;
    yeswcc.removeEventListener("click", wcccheck);
    nowcc.addEventListener("click", wccuncheck);
    nowcc.style.backgroundColor = 'lightgrey';
    nowcc.style.color = 'black';
    getMortalityScore()
}
function wccuncheck(){
    obesity = 0;
    nowcc.style.backgroundColor = '#0066cc';
    nowcc.style.color = 'white';
    mortalitySum--;
    nowcc.removeEventListener("click", wccuncheck);
    yeswcc.addEventListener("click", wcccheck);
    yeswcc.style.backgroundColor = 'lightgrey';
    yeswcc.style.color = 'black';
    getMortalityScore()
}

// lymph
let yeslymph = document.getElementById("yeslymph");
let nolymph = document.getElementById("nolymph");
yeslymph.addEventListener("click", lymphcheck);
function lymphcheck(){
    smoker = 1;
    yeslymph.style.backgroundColor = '#0066cc';
    yeslymph.style.color = 'white';
    mortalitySum++;
    yeslymph.removeEventListener("click", lymphcheck);
    nolymph.addEventListener("click", lymphuncheck);
    nolymph.style.backgroundColor = 'lightgrey';
    nolymph.style.color = 'black';
    getMortalityScore()
}
function lymphuncheck(){
    obesity = 0;
    nolymph.style.backgroundColor = '#0066cc';
    nolymph.style.color = 'white';
    mortalitySum--;
    nolymph.removeEventListener("click", lymphuncheck);
    yeslymph.addEventListener("click", lymphcheck);
    yeslymph.style.backgroundColor = 'lightgrey';
    yeslymph.style.color = 'black';
    getMortalityScore()
}

// cxr
let yescxr = document.getElementById("yescxr");
let nocxr = document.getElementById("nocxr");
yescxr.addEventListener("click", cxrcheck);
function cxrcheck(){
    smoker = 1;
    yescxr.style.backgroundColor = '#0066cc';
    yescxr.style.color = 'white';
    mortalitySum++;
    yescxr.removeEventListener("click", cxrcheck);
    nocxr.addEventListener("click", cxruncheck);
    nocxr.style.backgroundColor = 'lightgrey';
    nocxr.style.color = 'black';
    getMortalityScore()
}
function cxruncheck(){
    obesity = 0;
    nocxr.style.backgroundColor = '#0066cc';
    nocxr.style.color = 'white';
    mortalitySum--;
    nocxr.removeEventListener("click", cxruncheck);
    yescxr.addEventListener("click", cxrcheck);
    yescxr.style.backgroundColor = 'lightgrey';
    yescxr.style.color = 'black';
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

// ckd
let ckd1 = document.getElementById("ckd1");
let ckd2 = document.getElementById("ckd2");
let ckd3 = document.getElementById("ckd3");
let ckd4 = document.getElementById("ckd4");
let ckd5 = document.getElementById("ckd5");

ckd1.addEventListener("click", ckd1check);
function ckd1check(){
    allCkdUncheck();
    ckd1.style.backgroundColor = '#0066cc';
    ckd1.style.color = 'white';
    ckdSum+=1;
    ckd1.removeEventListener("click", ckd1check);
    ckd1.addEventListener("click", ckd1uncheck);
    getMortalityScore()
}
function ckd1uncheck(){
    ckd1.addEventListener("click", ckd1check);
    ckd1.style.backgroundColor = 'lightgrey';
    ckd1.style.color = 'black';
    ckdSum = 0;
    ckd1.removeEventListener("click", ckd1uncheck);
    ckd1.addEventListener("click", ckd1check);
    getMortalityScore()
}

ckd2.addEventListener("click", ckd2check);
function ckd2check(){
    allCkdUncheck();
    ckd2.style.backgroundColor = '#0066cc';
    ckd2.style.color = 'white';
    ckdSum+=2;
    ckd2.removeEventListener("click", ckd2check);
    ckd2.addEventListener("click", ckd2uncheck);
    getMortalityScore()
}
function ckd2uncheck(){
    ckdSum = 0;
    ckd2.addEventListener("click", ckd2check);
    ckd2.style.backgroundColor = 'lightgrey';
    ckd2.style.color = 'black';
    ckd2.removeEventListener("click", ckd2uncheck);
    ckd2.addEventListener("click", ckd2check);
    getMortalityScore()
}

ckd3.addEventListener("click", ckd3check);
function ckd3check(){
    allCkdUncheck();
    ckd3.style.backgroundColor = '#0066cc';
    ckd3.style.color = 'white';
    ckdSum+=3;
    ckd3.removeEventListener("click", ckd3check);
    ckd3.addEventListener("click", ckd3uncheck);
    getMortalityScore()
}
function ckd3uncheck(){
    ckdSum = 0;
    ckd3.addEventListener("click", ckd3check);
    ckd3.style.backgroundColor = 'lightgrey';
    ckd3.style.color = 'black';
    ckd3.removeEventListener("click", ckd3uncheck);
    ckd3.addEventListener("click", ckd3check);
    getMortalityScore()
}

ckd4.addEventListener("click", ckd4check);
function ckd4check(){
    allCkdUncheck();
    ckd4.style.backgroundColor = '#0066cc';
    ckd4.style.color = 'white';
    ckdSum+=4;
    ckd4.removeEventListener("click", ckd4check);
    ckd4.addEventListener("click", ckd4uncheck);
    getMortalityScore()
}
function ckd4uncheck(){
    ckdSum = 0;
    ckd4.style.backgroundColor = 'lightgrey';
    ckd4.style.color = 'black';
    ckd4.removeEventListener("click", ckd4uncheck);
    ckd4.addEventListener("click", ckd4check);
    getMortalityScore()
}

ckd5.addEventListener("click", ckd5check);
function ckd5check(){
    allCkdUncheck();
    ckdSum+=5;
    ckd5.style.backgroundColor = '#0066cc';
    ckd5.style.color = 'white';
    console.log("added 4")
    ckd5.removeEventListener("click", ckd5check);
    ckd5.addEventListener("click", ckd5uncheck);
    getMortalityScore()
}
function ckd5uncheck(){
    ckdSum = 0;
    console.log("removed 4")
    ckd5.addEventListener("click", ckd5check);
    ckd5.style.backgroundColor = 'lightgrey';
    ckd5.style.color = 'black';
    ckd5.removeEventListener("click", ckd5uncheck);
    ckd5.addEventListener("click", ckd5check);
    getMortalityScore()
}

function allCkdUncheck(){
    ckdSum = 0;
    ckd1uncheck();
    ckd2uncheck();
    ckd3uncheck();
    ckd4uncheck();
    ckd5uncheck();
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
    postData("http://15.161.61.239:3000/sendData", {nhsData: nhsNumber.value,
    nameData: name.value, surnameData: surname.value, dobData: dob.value, ageData: ageSum,
    respData: resp, spo2Data: spo, strokeData: stroke,
    obesityData: obesity, scoreData: mortalitySum+ageSum})
}
