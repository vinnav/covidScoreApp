// MAIN VALUES
// Starting scores
let mortalitySum = 0;

let ageSum = 0;
let sex = 0;
let comorbidSum = 0;
let rrSum = 0;
let spo = 0;
let gcs = 0;
let ureaSum = 0;
let crpSum = 0;

// Array of mortality scores
let mortality = ["<0.3%", "0.3%","0.8%", "2.3%", "4.8%", "7.5%", "7.8%", "11.7%", "14.4%", "19.2%", "22.9%", "26.9%", "32.9%", "40.1%", "44.6%", "51.6%", "59.1%", "66.1%", "75.8%", "77.4%"
, "82.9%", "87.5%"]

// Result logic
let resultText = document.getElementById("resultText");

function getMortalityScore(){
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Score = " + (mortalitySum+ageSum+comorbidSum+rrSum+ureaSum+crpSum) 
    + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality rate: " + mortality[(mortalitySum+ageSum+comorbidSum+rrSum+ureaSum+crpSum)] + "</p>";
}
// Adding points on pressing buttons
// Sex 
let maleSex = document.getElementById("maleSex");
let femaleSex = document.getElementById("femaleSex");
maleSex.addEventListener("click", maleCheck);
function maleCheck(){
    sex = 1;
    maleSex.style.backgroundColor = '#117d67';
    maleSex.style.color = 'white';
    mortalitySum++;
    maleSex.removeEventListener("click", maleCheck);
    femaleSex.addEventListener("click", maleUncheck);
    femaleSex.style.backgroundColor = 'lightgrey';
    femaleSex.style.color = 'black';
    getMortalityScore()
}
function maleUncheck(){
    sex = 0;
    femaleSex.style.backgroundColor = '#117d67';
    femaleSex.style.color = 'white';
    mortalitySum--;
    femaleSex.removeEventListener("click", maleUncheck);
    maleSex.addEventListener("click", maleCheck);
    maleSex.style.backgroundColor = 'lightgrey';
    maleSex.style.color = 'black';
    getMortalityScore()
}

// SpO
let yesspo = document.getElementById("yesspo");
let nospo = document.getElementById("nospo");
yesspo.addEventListener("click", spocheck);
function spocheck(){
    spo = 1;
    yesspo.style.backgroundColor = '#117d67';
    yesspo.style.color = 'white';
    mortalitySum += 2;
    yesspo.removeEventListener("click", spocheck);
    nospo.addEventListener("click", spouncheck);
    nospo.style.backgroundColor = 'lightgrey';
    nospo.style.color = 'black';
    getMortalityScore()
}
function spouncheck(){
    spo = 0;
    nospo.style.backgroundColor = '#117d67';
    nospo.style.color = 'white';
    mortalitySum -= 2;
    nospo.removeEventListener("click", spouncheck);
    yesspo.addEventListener("click", spocheck);
    yesspo.style.backgroundColor = 'lightgrey';
    yesspo.style.color = 'black';
    getMortalityScore()
}

let yesgcs = document.getElementById("yesgcs");
let nogcs = document.getElementById("nogcs");
yesgcs.addEventListener("click", gcscheck);
function gcscheck(){
    gcs = 1;
    yesgcs.style.backgroundColor = '#117d67';
    yesgcs.style.color = 'white';
    mortalitySum += 2;
    yesgcs.removeEventListener("click", gcscheck);
    nogcs.addEventListener("click", gcsuncheck);
    nogcs.style.backgroundColor = 'lightgrey';
    nogcs.style.color = 'black';
    getMortalityScore()
}
function gcsuncheck(){
    gcs = 0;
    nogcs.style.backgroundColor = '#117d67';
    nogcs.style.color = 'white';
    mortalitySum -= 2;
    nospo.removeEventListener("click", gcsuncheck);
    yesgcs.addEventListener("click", gcscheck);
    yesgcs.style.backgroundColor = 'lightgrey';
    yesgcs.style.color = 'black';
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
    ageless50.style.backgroundColor = '#117d67';
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
    age5059.style.backgroundColor = '#117d67';
    age5059.style.color = 'white';
    ageSum+=2;
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
    age6069.style.backgroundColor = '#117d67';
    age6069.style.color = 'white';
    ageSum+=4;
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
    age7079.style.backgroundColor = '#117d67';
    age7079.style.color = 'white';
    ageSum+=6;
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
    agemore80.style.backgroundColor = '#117d67';
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

// Resp rate
let rr20 = document.getElementById("rr20");
let rr2029 = document.getElementById("rr20-29");
let rr30 = document.getElementById("rr30");


rr20.addEventListener("click", rr20check);
function rr20check(){
    allRrUncheck();
    rr20.style.backgroundColor = '#117d67';
    rr20.style.color = 'white';
    rr20.removeEventListener("click", rr20check);
    rr20.addEventListener("click", rr20uncheck);
    getMortalityScore()
}
function rr20uncheck(){
    rr20.addEventListener("click", rr20check);
    rr20.style.backgroundColor = 'lightgrey';
    rr20.style.color = 'black';
    rr20.removeEventListener("click", rr20uncheck);
    rr20.addEventListener("click", rr20check);
    getMortalityScore()
}

rr2029.addEventListener("click", rr2029check);
function rr2029check(){
    allRrUncheck();
    rrSum += 1;
    rr2029.style.backgroundColor = '#117d67';
    rr2029.style.color = 'white';
    rr2029.removeEventListener("click", rr2029check);
    rr2029.addEventListener("click", rr2029uncheck);
    getMortalityScore()
}
function rr2029uncheck(){
    rr2029.addEventListener("click", rr2029check);
    rr2029.style.backgroundColor = 'lightgrey';
    rr2029.style.color = 'black';
    rr2029.removeEventListener("click", rr2029uncheck);
    rr2029.addEventListener("click", rr2029check);
    getMortalityScore()
}

rr30.addEventListener("click", rr30check);
function rr30check(){
    allRrUncheck();
    rrSum += 2;
    rr30.style.backgroundColor = '#117d67';
    rr30.style.color = 'white';
    rr30.removeEventListener("click", rr30check);
    rr30.addEventListener("click", rr30uncheck);
    getMortalityScore()
}
function rr30uncheck(){
    rr30.addEventListener("click", rr30check);
    rr30.style.backgroundColor = 'lightgrey';
    rr30.style.color = 'black';
    rr30.removeEventListener("click", rr30uncheck);
    rr30.addEventListener("click", rr30check);
    getMortalityScore()
}

function allRrUncheck(){
    rrSum = 0;
    rr20uncheck();
    rr2029uncheck();
    rr30uncheck();
}

// Comorbid
let comorbid0 = document.getElementById("comorbid0");
let comorbid1 = document.getElementById("comorbid1");
let comorbid2 = document.getElementById("comorbid2");


comorbid0.addEventListener("click", comorbid0check);
function comorbid0check(){
    allComorbidUncheck();
    comorbid0.style.backgroundColor = '#117d67';
    comorbid0.style.color = 'white';
    comorbid0.removeEventListener("click", comorbid0check);
    comorbid0.addEventListener("click", comorbid0uncheck);
    getMortalityScore()
}
function comorbid0uncheck(){
    comorbid0.addEventListener("click", comorbid0check);
    comorbid0.style.backgroundColor = 'lightgrey';
    comorbid0.style.color = 'black';
    comorbid0.removeEventListener("click", comorbid0uncheck);
    comorbid0.addEventListener("click", comorbid0check);
    getMortalityScore()
}

comorbid1.addEventListener("click", comorbid1check);
function comorbid1check(){
    allComorbidUncheck();
    comorbidSum += 1;
    comorbid1.style.backgroundColor = '#117d67';
    comorbid1.style.color = 'white';
    comorbid1.removeEventListener("click", comorbid1check);
    comorbid1.addEventListener("click", comorbid1uncheck);
    getMortalityScore()
}
function comorbid1uncheck(){
    comorbid1.addEventListener("click", comorbid1check);
    comorbid1.style.backgroundColor = 'lightgrey';
    comorbid1.style.color = 'black';
    comorbid1.removeEventListener("click", comorbid1uncheck);
    comorbid1.addEventListener("click", comorbid1check);
    getMortalityScore()
}

comorbid2.addEventListener("click", comorbid2check);
function comorbid2check(){
    allComorbidUncheck();
    comorbidSum += 2;
    comorbid2.style.backgroundColor = '#117d67';
    comorbid2.style.color = 'white';
    comorbid2.removeEventListener("click", comorbid2check);
    comorbid2.addEventListener("click", comorbid2uncheck);
    getMortalityScore()
}
function comorbid2uncheck(){
    comorbid2.addEventListener("click", comorbid2check);
    comorbid2.style.backgroundColor = 'lightgrey';
    comorbid2.style.color = 'black';
    comorbid2.removeEventListener("click", comorbid2uncheck);
    comorbid2.addEventListener("click", comorbid2check);
    getMortalityScore()
}

function allComorbidUncheck(){
    comorbidSum = 0;
    comorbid0uncheck();
    comorbid1uncheck();
    comorbid2uncheck();
}

// CRP
let crp50 = document.getElementById("crp50");
let crp5099 = document.getElementById("crp50-99");
let crp100 = document.getElementById("crp100");


crp50.addEventListener("click", crp50check);
function crp50check(){
    allCrpUncheck();
    crp50.style.backgroundColor = '#117d67';
    crp50.style.color = 'white';
    crp50.removeEventListener("click", crp50check);
    crp50.addEventListener("click", crp50uncheck);
    getMortalityScore()
}
function crp50uncheck(){
    crp50.addEventListener("click", crp50check);
    crp50.style.backgroundColor = 'lightgrey';
    crp50.style.color = 'black';
    crp50.removeEventListener("click", crp50uncheck);
    crp50.addEventListener("click", crp50check);
    getMortalityScore()
}

crp5099.addEventListener("click", crp5099check);
function crp5099check(){
    allCrpUncheck();
    crpSum += 1;
    crp5099.style.backgroundColor = '#117d67';
    crp5099.style.color = 'white';
    crp5099.removeEventListener("click", crp5099check);
    crp5099.addEventListener("click", crp5099uncheck);
    getMortalityScore()
}
function crp5099uncheck(){
    crp5099.addEventListener("click", crp5099check);
    crp5099.style.backgroundColor = 'lightgrey';
    crp5099.style.color = 'black';
    crp5099.removeEventListener("click", crp5099uncheck);
    crp5099.addEventListener("click", crp5099check);
    getMortalityScore()
}

crp100.addEventListener("click", crp100check);
function crp100check(){
    allCrpUncheck();
    crpSum += 2;
    crp100.style.backgroundColor = '#117d67';
    crp100.style.color = 'white';
    crp100.removeEventListener("click", crp100check);
    crp100.addEventListener("click", crp100uncheck);
    getMortalityScore()
}
function crp100uncheck(){
    crp100.addEventListener("click", crp100check);
    crp100.style.backgroundColor = 'lightgrey';
    crp100.style.color = 'black';
    crp100.removeEventListener("click", crp100uncheck);
    crp100.addEventListener("click", crp100check);
    getMortalityScore()
}

function allCrpUncheck(){
    crpSum = 0;
    crp50uncheck();
    crp5099uncheck();
    crp100uncheck();
}

// CRP
let urea7 = document.getElementById("urea7");
let urea714 = document.getElementById("urea7-14");
let urea14 = document.getElementById("urea14");


urea7.addEventListener("click", urea7check);
function urea7check(){
    allUreaUncheck();
    urea7.style.backgroundColor = '#117d67';
    urea7.style.color = 'white';
    urea7.removeEventListener("click", urea7check);
    urea7.addEventListener("click", urea7uncheck);
    getMortalityScore()
}
function urea7uncheck(){
    urea7.addEventListener("click", urea7check);
    urea7.style.backgroundColor = 'lightgrey';
    urea7.style.color = 'black';
    urea7.removeEventListener("click", urea7uncheck);
    urea7.addEventListener("click", urea7check);
    getMortalityScore()
}

urea714.addEventListener("click", urea714check);
function urea714check(){
    allUreaUncheck();
    ureaSum += 1;
    urea714.style.backgroundColor = '#117d67';
    urea714.style.color = 'white';
    urea714.removeEventListener("click", urea714check);
    urea714.addEventListener("click", urea714uncheck);
    getMortalityScore()
}
function urea714uncheck(){
    urea714.addEventListener("click", urea714check);
    urea714.style.backgroundColor = 'lightgrey';
    urea714.style.color = 'black';
    urea714.removeEventListener("click", urea714uncheck);
    urea714.addEventListener("click", urea714check);
    getMortalityScore()
}

urea14.addEventListener("click", urea14check);
function urea14check(){
    allUreaUncheck();
    ureaSum += 3;
    urea14.style.backgroundColor = '#117d67';
    urea14.style.color = 'white';
    urea14.removeEventListener("click", urea14check);
    urea14.addEventListener("click", urea14uncheck);
    getMortalityScore()
}
function urea14uncheck(){
    urea14.addEventListener("click", urea14check);
    urea14.style.backgroundColor = 'lightgrey';
    urea14.style.color = 'black';
    urea14.removeEventListener("click", urea14uncheck);
    urea14.addEventListener("click", urea14check);
    getMortalityScore()
}

function allUreaUncheck(){
    ureaSum = 0;
    urea7uncheck();
    urea714uncheck();
    urea14uncheck();
}

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
