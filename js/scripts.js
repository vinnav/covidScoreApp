let mortalitySum = 0;
let mortality = ["3.23%","5.41%", "9.00%", "30.72%", "40.58%", "65.59%", "73.85%", ">73.85%"]

let submit = document.getElementById("submit");
submit.addEventListener("click", getMortalityScore);

function getMortalityScore(){
    alert("The mortality rate is: " + mortality[mortalitySum]);
}


let resp = document.getElementById("resp");
resp.addEventListener("click", respcheck);
function respcheck(){
    resp.style.backgroundColor = '#d9534f';
    mortalitySum++;
}

let spo = document.getElementById("spo");
spo.addEventListener("click", spocheck);
function spocheck(){
    spo.style.backgroundColor = '#d9534f';
    mortalitySum++;
}

let stroke= document.getElementById("stroke");
stroke.addEventListener("click", strokecheck);
function strokecheck(){
    stroke.style.backgroundColor = '#d9534f';
    mortalitySum++;
}

let obesity = document.getElementById("obesity");
obesity.addEventListener("click", obesitycheck);
function obesitycheck(){
    obesity.style.backgroundColor = '#d9534f';
    mortalitySum++;
}

let age0 = document.getElementById("age0");
age0.addEventListener("click", age0check);
function age0check(){
    age0.style.backgroundColor = '#d9534f';
    mortalitySum++;
}
let age1 = document.getElementById("age1");
age1.addEventListener("click", age1check);
function age1check(){
    age1.style.backgroundColor = '#d9534f';
    mortalitySum+=1;
}
let age2 = document.getElementById("age2");
age2.addEventListener("click", age2check);
function age2check(){
    age2.style.backgroundColor = '#d9534f';
    mortalitySum+=2;
}
let age3 = document.getElementById("age3");
age3.addEventListener("click", age3check);
function age3check(){
    age3.style.backgroundColor = '#d9534f';
    mortalitySum+=3;
}
let age4 = document.getElementById("age4");
age4.addEventListener("click", age4check);
function age4check(){
    age4.style.backgroundColor = '#d9534f';
    mortalitySum+=4;
}
let age5 = document.getElementById("age5");
age5.addEventListener("click", age5check);
function age5check(){
    age5.style.backgroundColor = '#d9534f';
    mortalitySum+=5;
}