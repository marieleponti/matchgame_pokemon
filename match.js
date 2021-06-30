"using strict";

let choices = [];

const pics = ["charizard.png", "charmander.png", "charmelon.png",
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
    console.log("start game");
    //show back image
    for (let i = 0; i < 16; i++){
        let id = i.toString();
        const myimage = document.getElementById(id);
        //show back picture
        myimage.src = 'pics/back.png';
        //add click handler to each image
        myimage.addEventListener("click", checkMatch);
    }
    choices = [];
}

function checkMatch(event){
    console.log(event.target.id);
}

function shuffle(cards){
    for (let first = 0; first < cards; first++){
        let second = Math.floor(Math.random() * cards.length);
        //swap
        let temp = cards[first];
        cards[first] = cards[second];
        cards[second] = temp;
    }
}