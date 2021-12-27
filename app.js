const countdownElemnt = document.getElementById("timer");
let clear = setInterval(function updateCount(){
    const minutes = Math.floor(time/ 60);
    let seconds = time % 60; 
    seconds = seconds < 10 ? '0' + seconds: seconds;
    countdownElemnt.innerHTML= `${minutes}: ${seconds}`;
    time--;   
}, 1000);

const cards = document.querySelectorAll('.memory-card');
let badTries = 0
let streak = 0
const Starting = 0.3;
let time = Starting * 60;
let hiden = document.querySelector('.retry').addEventListener('click', reload)
// hiden.classList.toggle("retry")

function reload (){
    window.location.reload()
}
function yourStreak(){
    if (window.location.reload){
        streak++;
    }
}

setInterval(() => {
    if (time < 0) { 
        clearInterval (clear) 
        document.getElementById ('player').innerHTML ='YOU LOST :('
        unflipCards();
        disableCards();  
    }    
}, 100);


cards.forEach(card => {
    card.classList.add("flip")
})

setTimeout(() => {
    cards.forEach(card => {
        card.classList.remove("flip")
    })
}, 1500);

setTimeout(() => {
    setInterval(() => {
        
        let gameIsDone = Array.from(cards).every((card)=>card.className.includes("flip")) 
        if (gameIsDone){
            window.location.reload()
            streak++;
            document.getElementById("streak").innerHTML = badTries
            document.getElementById("player").innerHTML = "YOU WIN !!"
        }
        
        
    }, 1000);
}, 1000);




let hasFlippedCard = false;
let lockBoard = false
let firstCard, secondCard;

function flipcard() {
    console.log(this);
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {

        hasFlippedCard = true
        firstCard = this

        return;
    }
    secondCard = this

    checkForMatch()
}
function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===
        secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);
    restBoard()
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        badTries++;
        document.getElementById("badTries").innerHTML = badTries
        restBoard();
    }, 550)
}
function restBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    });
})();

cards.forEach(card => card.addEventListener('click', flipcard));
