const accounts = [

{
name:"ACCOUNT GAME #001",
game:"GAME ACCOUNT",
price:"CONTACT ADMIN",
status:"AVAILABLE",
image:"",
description:"Account tersedia untuk dipromosikan."
},

{
name:"ACCOUNT GAME #002",
game:"GAME ACCOUNT",
price:"CONTACT ADMIN",
status:"AVAILABLE",
image:"",
description:"Account tersedia untuk dipromosikan."
}

];


function whatsappAccount(name){

const number="60143783301";

const message=
"Hi XNZ, saya berminat dengan account: "+
name+
". Saya mahu tanya detail account.";

const url=
"https://wa.me/"+
number+
"?text="+
encodeURIComponent(message);

window.open(url,"_blank");

}


function showAccounts(){

const grid=document.getElementById("accountGrid");

if(!grid)return;

grid.innerHTML="";

accounts.forEach(function(account){

const card=document.createElement("article");

card.className="account-card";

let image="";

if(account.image){

image=
'<img src="'+
account.image+
'" alt="'+
account.name+
'">';

}else{

image="ACCOUNT IMAGE";

}


card.innerHTML=

'<div class="account-image">'+
image+
'</div>'+

'<div class="account-info">'+

'<span class="status">'+
account.status+
'</span>'+

'<h3>'+
account.name+
'</h3>'+

'<div class="game">'+
account.game+
'</div>'+

'<p class="desc">'+
account.description+
'</p>'+

'<div class="account-bottom">'+

'<div class="price">'+
account.price+
'</div>'+

'<button class="detail">'+
'LIHAT DETAIL'+
'</button>'+

'</div>'+

'</div>';


card
.querySelector(".detail")
.addEventListener(
"click",
function(){

whatsappAccount(
account.name
);

}
);


grid.appendChild(card);

});

}


document.addEventListener(
"DOMContentLoaded",
showAccounts
);
