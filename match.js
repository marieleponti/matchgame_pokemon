"using strict";

let choices = [];
let firstClick = -1;
let secondClick = -1;
let correct = 0;
let correct1 = 0;
let correct2 = 0;
let attemps = 0;
let attempts1 = 0;
let attempts2 = 0;
let timer = null; 
let numMatches = 8;
let clock = null;
let seconds = 0;

const pics = ["charizard.png", "charmander.png", "charmeleon.png",
    "golbat.png", "horsea.png", "jigglypuff.png", "nidoqueen.png",
    "nidoran.png", "nidorina.png", "oddish.png", "pikachu.png",
    "raichu.png", "seadra.png", "squirtle.png", "vileplum.png",
    "wartortle.png", "wiggletuff.png", "zubat.png"];

//event listener when page loads
document.addEventListener("DOMContentLoaded", () =>{
    //event listener for button
    document.getElementById("restart").addEventListener("click", startGame);
    startGame();
});

function startGame(){
    choices = [];
    correct = 0;
    correct1 = 0;
    correct2 = 0;
    attempts = 0;
    attempts1 = 0;
    attempts2 = 0;
    seconds = 0;
    clearInterval(clock);
    document.getElementById("msg").innerHTML = "";
    document.getElementById("score1").innerHTML = "";
    document.getElementById("score2").innerHTML = "";
    document.getElementById("attempts").innerHTML = "";
    document.getElementById("attempts1").innerHTML = "";
    document.getElementById("attempts2").innerHTML = "";
    //shuffle cards
    shuffle(pics);
    //console.log(pics);
    //choose pictures, assign each twice
    let idx = 0;
    while (idx < numMatches){
        choices.push(pics[idx]);
        choices.push(pics[idx]);
        idx++;
    }
    shuffle(choices);
    shuffle(choices);
    console.log(choices);
    //show back image
    for (let i = 0; i < numMatches * 2; i++){
        let id = i.toString();
        const myimage = document.getElementById(id);
        //show back picture
        myimage.src = 'pics/back.png';
        //add click handler to each image
        myimage.addEventListener("click", checkMatch);
    }
    clock = setInterval(tick, 1000);
    document.getElementById("turn").innerHTML = "Player 1's turn!";
}

function checkMatch(event){
    //console.log(event.target.id);
    let imgClicked = event.target;
    if (firstClick == -1){
        //save position of first image clicked
        firstClick = parseInt(imgClicked.id);
        imgClicked.src = 'pics/' + choices[firstClick];
        console.log("first click: " + firstClick);
    } else if (secondClick == -1){
        attempts++;
        if (attempts % 2 != 0){
            attempts1++;
            document.getElementById("attempts1").innerHTML = "P1 flips: " + attempts1;
        } else {
            attempts2++;
            document.getElementById("attempts2").innerHTML = "P2 flips: " + attempts2;
        }
        //save position of second image clicked
        secondClick = parseInt(imgClicked.id);
        imgClicked.src = 'pics/' + choices[secondClick];
        console.log("second click: " + secondClick);
        //check for match
        if (choices[firstClick] == choices[secondClick]){
            document.getElementById("msg").innerHTML = "MATCH!";
            correct++;
            if (attempts % 2 != 0){
                correct1++;
            } else {
                correct2++;
            }
            //check if game is over
            if (correct == numMatches){
                if (correct1 > correct2){
                    winnerMsg = "Player 1 has won the game!";
                } else if (correct2 > correct1){
                    winnerMsg = "Player 2 has won the game!";
                } else {
                    winnerMsg = "player 1 and player 2 have tied!";
                }
                document.getElementById("msg").innerHTML = winnerMsg;
                document.getElementById("attempts").innerHTML = "";
                clearInterval(clock);
            }
            //remove event listener once card is flipped.
            document.getElementById(firstClick.toString()).removeEventListener("click", checkMatch);
            document.getElementById(secondClick.toString()).removeEventListener("click", checkMatch);
            document.getElementById("score1").innerHTML = "P1 matches: " + correct1;
            document.getElementById("score2").innerHTML = "P2 matches: " + correct2;
            //reset for next try
            firstClick = -1;
            secondClick = -1;
        } else {
            //no match
            timer = setTimeout(togglePics, 1000);
            document.getElementById("msg").innerHTML = "TRY AGAIN."
        }
        if (attempts % 2 != 0){
            //player 1's turn is ending
            nextTurn = 2;
        } else {
            nextTurn = 1;
        }
        document.getElementById("turn").innerHTML = "Player " + nextTurn +"'s turn!";
    }
}

function shuffle(cards){
    for (let first = 0; first < cards.length; first++){
        let second = Math.floor(Math.random() * cards.length);
        //swap
        let temp = cards[first];
        cards[first] = cards[second];
        cards[second] = temp;
    }
}

function togglePics(){
    //turn cards over to back
    document.getElementById(firstClick.toString()).src = 'pics/back.png';
    document.getElementById(secondClick.toString()).src = 'pics/back.png';
    clearTimeout(timer);
    firstClick = -1;
    secondClick = -1;
    document.getElementById("msg").innerHTML = "";
}

function tick(){
    seconds++;
    document.getElementById("clock").innerHTML = seconds + " seconds";
}