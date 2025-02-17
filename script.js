let score = JSON.parse(localStorage.getItem('score')) || {
    win : 0,
    lose : 0,
    ties : 0
};
document.querySelector('.showScore').innerText = `Wins : ${score.win}, Lose : ${score.lose}, Ties : ${score.ties}`;

function playUsingKeyboard(event){
    if(event.key == 'r' || event.key == 'R') game('Rock') 
    else if(event.key == 'p' || event.key == 'P') game('Paper') 
    else if(event.key == 's' || event.key == 'S') game('Scissor') 
}

function game(move){
    const randomNumber = Math.random();
    let computerPick = '';
    if(randomNumber<0.33)   computerPick = 'Rock';
    else if(randomNumber<0.66)  computerPick = 'Paper';
    else    computerPick = 'Scissor';
    
    let result = '';
    if(computerPick == move)    result = 'tie';
    else if(move == 'Rock')
        if(computerPick == 'Paper')    result = 'lost';
        else    result = 'won';
    else if(move == 'Paper')
        if(computerPick == 'Scissor')   result = 'lost';
        else    result = 'won';
    else if(move == 'Scissor')
        if(computerPick == 'Rock')  result = 'lost';
        else    result = 'won';

    if(result == 'won') score.win++;
    else if(result == 'lost') score.lose++;
    else score.ties++; 
    localStorage.setItem('score',JSON.stringify(score));
    document.querySelector('.showResult').innerText = `Game ${result}`;
    document.querySelector('.showPick').innerHTML = 
    `You <img src = "${move}-emoji.png" class = "move-icon"> <img src = "${computerPick}-emoji.png" class = "move-icon"> Computer`;
    document.querySelector('.showScore').innerText = `Wins : ${score.win}, Lose : ${score.lose}, Ties : ${score.ties}`;
    
}
function reset(){
    score.lose = 0;
    score.ties = 0;
    score.win = 0;
    localStorage.removeItem('score');
    document.querySelector('.showScore').innerText = `Wins : ${score.win}, Lose : ${score.lose}, Ties : ${score.ties}`;
}

let isAutoPlaying  = false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(function(){
            const randomNumber = Math.random();
            let move = '';
            if(randomNumber<0.33)   move = 'Rock';
            else if(randomNumber<0.66)  move = 'Paper';
            else    move = 'Scissor';
            game(move);
        },1000);
    }
    else{
        clearInterval(intervalId);
    }
    isAutoPlaying = !isAutoPlaying;
}