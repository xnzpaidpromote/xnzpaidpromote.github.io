const menuBtn=
document.getElementById("menuBtn");

const navMenu=
document.getElementById("navMenu");


if(menuBtn){

menuBtn.addEventListener(
"click",
function(){

navMenu.classList.toggle("active");

}
);

}


document
.querySelectorAll("#navMenu a")
.forEach(function(link){

link.addEventListener(
"click",
function(){

navMenu.classList.remove("active");

}
);

});


const form=
document.getElementById("contactForm");


if(form){

form.addEventListener(
"submit",
function(event){

event.preventDefault();

const name=
document
.getElementById("name")
.value
.trim();

const phone=
document
.getElementById("phone")
.value
.trim();

const message=
document
.getElementById("message")
.value
.trim();


if(!name||!phone||!message){

alert(
"Sila lengkapkan semua maklumat."
);

return;

}


const text=
"HI XNZ, SAYA MAHU BUAT PERTANYAAN.\n\n"+
"NAMA PENUH: "+name+"\n"+
"NO. WHATSAPP: "+phone+"\n"+
"BUTIRAN PERTANYAAN:\n"+
message;


const url=
"https://wa.me/60143783301?text="+
encodeURIComponent(text);


window.open(
url,
"_blank"
);


form.reset();

}
);

}


const year=
document.getElementById("year");

if(year){

year.textContent=
new Date().getFullYear();

}
