document.getElementById("search")?.addEventListener("input",function(){

let value=this.value.toLowerCase();

let cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

let name=card.innerText.toLowerCase();

card.style.display=name.includes(value)?"block":"none";

});

});