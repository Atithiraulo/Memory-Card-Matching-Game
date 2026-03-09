const board = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const winMessage = document.getElementById("winMessage");

const icons = ["🍎","🍌","🍇","🍒","🍍","🥝","🍉","🍑"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let timer = 0;
let interval;
let matchedPairs = 0;

function shuffle(array){
for(let i = array.length - 1; i > 0; i--){
const j = Math.floor(Math.random() * (i+1));
[array[i],array[j]]=[array[j],array[i]];
}
}

function startGame(){

board.innerHTML="";
moves=0;
timer=0;
matchedPairs=0;

movesText.textContent="Moves: 0";
timerText.textContent="Time: 0s";
winMessage.style.display = "none";

clearInterval(interval);
interval=setInterval(()=>{
timer++;
timerText.textContent="Time: "+timer+"s";
},1000);

cards=[...icons,...icons];

shuffle(cards);

cards.forEach(icon=>{
const card=document.createElement("div");
card.classList.add("card");
card.dataset.icon=icon;
card.textContent="";
card.addEventListener("click",flipCard);
board.appendChild(card);
});

}

function flipCard(){

if(lockBoard) return;
if(this===firstCard) return;
if(this.classList.contains("matched")) return;

this.textContent=this.dataset.icon;
this.classList.add("flipped");

if(!firstCard){
firstCard=this;
return;
}

secondCard=this;
moves++;
movesText.textContent="Moves: "+moves;

checkMatch();

}

function checkMatch(){

if(firstCard.dataset.icon===secondCard.dataset.icon){
firstCard.classList.add("matched");
secondCard.classList.add("matched");
matchedPairs++;
if(matchedPairs === 8){
clearInterval(interval);
setTimeout(() => {
winMessage.textContent = `Congratulations! You won in ${moves} moves and ${timer} seconds!`;
winMessage.style.display = "block";
}, 500);
}
resetTurn();
}else{

lockBoard=true;

setTimeout(()=>{
firstCard.textContent="";
secondCard.textContent="";
firstCard.classList.remove("flipped");
secondCard.classList.remove("flipped");
resetTurn();
},800);

}

}

function resetTurn(){
[firstCard,secondCard]=[null,null];
lockBoard=false;
}

restartBtn.addEventListener("click",startGame);

startGame();