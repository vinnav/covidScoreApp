// MAIN VALUES
// Starting score
let mortalitySum = 0;
// Array of mortality scores
let mortality = ["3.23%","5.41%", "9.00%", "30.72%", "40.58%", "65.59%", "73.85%", ">73.85%", ">73.85%"]

// Result logic
let resultText = document.getElementById("resultText");

function getMortalityScore(){
    resultText.innerHTML = "<p style=\"font-size:30px;margin:0px;padding:0px;\"> Score = " + mortalitySum + "</p> <p style=\"font-size:30px;margin:0px;padding:0px;\"> Mortality rate: " + mortality[mortalitySum] + "</p>";
}

// Adding points on pressing buttons
// Respiratory rate >24/m
let yesresp = document.getElementById("yesresp");
let noresp = document.getElementById("noresp");
yesresp.addEventListener("click", respcheck);
function respcheck(){
    yesresp.style.backgroundColor = '#117d67';
    yesresp.style.color = 'white';
    mortalitySum++;
    yesresp.removeEventListener("click", respcheck);
    noresp.addEventListener("click", respuncheck);
    noresp.style.backgroundColor = 'lightgrey';
    noresp.style.color = 'black';
    getMortalityScore()
}
function respuncheck(){
    noresp.style.backgroundColor = '#117d67';
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
    yesspo.style.backgroundColor = '#117d67';
    yesspo.style.color = 'white';
    mortalitySum++;
    yesspo.removeEventListener("click", spocheck);
    nospo.addEventListener("click", spouncheck);
    nospo.style.backgroundColor = 'lightgrey';
    nospo.style.color = 'black';
    getMortalityScore()
}
function spouncheck(){
    nospo.style.backgroundColor = '#117d67';
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
    yesstroke.style.backgroundColor = '#117d67';
    yesstroke.style.color = 'white';
    mortalitySum++;
    yesstroke.removeEventListener("click", strokecheck);
    nostroke.addEventListener("click", strokeuncheck);
    nostroke.style.backgroundColor = 'lightgrey';
    nostroke.style.color = 'black';
    getMortalityScore()
}
function strokeuncheck(){
    nostroke.style.backgroundColor = '#117d67';
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
    yesobesity.style.backgroundColor = '#117d67';
    yesobesity.style.color = 'white';
    mortalitySum++;
    yesobesity.removeEventListener("click", obesitycheck);
    noobesity.addEventListener("click", obesityuncheck);
    noobesity.style.backgroundColor = 'lightgrey';
    noobesity.style.color = 'black';
    getMortalityScore()
}
function obesityuncheck(){
    noobesity.style.backgroundColor = '#117d67';
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
    age5059.style.backgroundColor = '#117d67';
    age5059.style.color = 'white';
    mortalitySum+=1;
    age5059.removeEventListener("click", age5059check);
    age5059.addEventListener("click", age5059uncheck);
    getMortalityScore()
}
function age5059uncheck(){
    mortalitySum-=1;
    age5059.addEventListener("click", age5059check);
    age5059.style.backgroundColor = 'lightgrey';
    age5059.style.color = 'black';
    age5059.removeEventListener("click", age5059uncheck);
    age5059.addEventListener("click", age5059check);
    getMortalityScore()
}

age6069.addEventListener("click", age6069check);
function age6069check(){
    age6069.style.backgroundColor = '#117d67';
    age6069.style.color = 'white';
    mortalitySum+=2;
    age6069.removeEventListener("click", age6069check);
    age6069.addEventListener("click", age6069uncheck);
    getMortalityScore()
}
function age6069uncheck(){
    mortalitySum-=2;
    age6069.addEventListener("click", age6069check);
    age6069.style.backgroundColor = 'lightgrey';
    age6069.style.color = 'black';
    age6069.removeEventListener("click", age6069uncheck);
    age6069.addEventListener("click", age6069check);
    getMortalityScore()
}

age7079.addEventListener("click", age7079check);
function age7079check(){
    age7079.style.backgroundColor = '#117d67';
    age7079.style.color = 'white';
    mortalitySum+=3;
    age7079.removeEventListener("click", age7079check);
    age7079.addEventListener("click", age7079uncheck);
    getMortalityScore()
}
function age7079uncheck(){
    mortalitySum-=3;
    //age7079.addEventListener("click", age7079check);
    age7079.style.backgroundColor = 'lightgrey';
    age7079.style.color = 'black';
    age7079.removeEventListener("click", age7079uncheck);
    age7079.addEventListener("click", age7079check);
    getMortalityScore()
}

agemore80.addEventListener("click", agemore80check);
function agemore80check(){
    mortalitySum+=4;
    agemore80.style.backgroundColor = '#117d67';
    agemore80.style.color = 'white';
    console.log("added 4")
    agemore80.removeEventListener("click", agemore80check);
    agemore80.addEventListener("click", agemore80uncheck);
    getMortalityScore()
}
function agemore80uncheck(){
    mortalitySum-=4;
    console.log("removed 4")
    agemore80.addEventListener("click", agemore80check);
    agemore80.style.backgroundColor = 'lightgrey';
    agemore80.style.color = 'black';
    agemore80.removeEventListener("click", agemore80uncheck);
    agemore80.addEventListener("click", agemore80check);
    getMortalityScore()
}

// TODO: uncheck previous age button when new one is clicked
// function uncheckAll(){}

let nhsNumber = document.getElementById("nhsnumber");
nhsNumber.addEventListener('change', nhsNumberSearch);

function nhsNumberSearch(){
    resultText.innerHTML = "<p style=\"font-size:35px;\"> NHS number not found... " + "</p>";
}