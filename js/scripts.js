// MAIN VALUES
// Starting score
let mortalitySum = 0;
// Array of mortality scores
let mortality = ["3.23%","5.41%", "9.00%", "30.72%", "40.58%", "65.59%", "73.85%", ">73.85%", ">73.85%"]

// Sumbit logic
let submit = document.getElementById("submit");
submit.addEventListener("click", getMortalityScore);

let result = document.getElementById("result");
let startpage = document.getElementById("startpage");

function getMortalityScore(){
    startpage.style.display = 'none';
    result.style.display = 'visible';
    result.innerHTML = "<p style=\"font-size:70px;\"> The mortality rate is: " + mortality[mortalitySum] + "</p>";
}

// Adding points on pressing buttons
let resp = document.getElementById("resp");
resp.addEventListener("click", respcheck);
function respcheck(){
    resp.style.backgroundColor = '#d9534f';
    mortalitySum++;
    resp.removeEventListener("click", respcheck);
}
let spo = document.getElementById("spo");
spo.addEventListener("click", spocheck);
function spocheck(){
    spo.style.backgroundColor = '#d9534f';
    mortalitySum++;
    spo.removeEventListener("click", spocheck);
}
let stroke= document.getElementById("stroke");
stroke.addEventListener("click", strokecheck);
function strokecheck(){
    stroke.style.backgroundColor = '#d9534f';
    mortalitySum++;
    stroke.removeEventListener("click", strokecheck);
}
let obesity = document.getElementById("obesity");
obesity.addEventListener("click", obesitycheck);
function obesitycheck(){
    obesity.style.backgroundColor = '#d9534f';
    mortalitySum++;
    obesity.removeEventListener("click", obesitycheck);
}
let age0 = document.getElementById("age0");
age0.addEventListener("click", age0check);
function age0check(){
    age0.style.backgroundColor = '#d9534f';
    mortalitySum++;
    age0.removeEventListener("click", age0check);
    age1.removeEventListener("click", age1check);
    age2.removeEventListener("click", age2check);
    age3.removeEventListener("click", age3check);
    age4.removeEventListener("click", age4check);
}
let age1 = document.getElementById("age1");
age1.addEventListener("click", age1check);
function age1check(){
    age1.style.backgroundColor = '#d9534f';
    mortalitySum+=1;
    age0.removeEventListener("click", age0check);
    age1.removeEventListener("click", age1check);
    age2.removeEventListener("click", age2check);
    age3.removeEventListener("click", age3check);
    age4.removeEventListener("click", age4check);
}
let age2 = document.getElementById("age2");
age2.addEventListener("click", age2check);
function age2check(){
    age2.style.backgroundColor = '#d9534f';
    mortalitySum+=2;
    age0.removeEventListener("click", age0check);
    age1.removeEventListener("click", age1check);
    age2.removeEventListener("click", age2check);
    age3.removeEventListener("click", age3check);
    age4.removeEventListener("click", age4check);
}
let age3 = document.getElementById("age3");
age3.addEventListener("click", age3check);
function age3check(){
    age3.style.backgroundColor = '#d9534f';
    mortalitySum+=3;
    age0.removeEventListener("click", age0check);
    age1.removeEventListener("click", age1check);
    age2.removeEventListener("click", age2check);
    age3.removeEventListener("click", age3check);
    age4.removeEventListener("click", age4check);
}
let age4 = document.getElementById("age4");
age4.addEventListener("click", age4check);
function age4check(){
    age4.style.backgroundColor = '#d9534f';
    mortalitySum+=4;
    age0.removeEventListener("click", age0check);
    age1.removeEventListener("click", age1check);
    age2.removeEventListener("click", age2check);
    age3.removeEventListener("click", age3check);
    age4.removeEventListener("click", age4check);
}
