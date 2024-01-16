'use strict';
//selecting elements

const player0EL=document.querySelector('.player--0');
const player1EL=document.querySelector('.player--1');


const scoreOEL=document.getElementById('score--0');
const score1EL=document.getElementById('score--1');
const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const currentScore0EL=document.getElementById('current--0');
const currentScore1EL=document.getElementById('current--1');

let score,currentScore,activePlayer,playing;
//starting conditions

const initFunction=function()
{
   score=[0,0];
   currentScore=0;
   activePlayer=0;
   playing=true;

  scoreOEL.textContent=0;
  score1EL.textContent=0;
  currentScore0EL.textContent=0;
currentScore1EL.textContent=0;

  diceEl.classList.add('hidden');
 
player0EL.classList.remove('player--winner');
player1EL.classList.remove('player--winner');

player0EL.classList.add('player--active')
player1EL.classList.remove('player--active')
}
initFunction();




const switchPlayer=function()
{
  document.getElementById(`current--${activePlayer}`).textContent=0;
  activePlayer=activePlayer===0?1:0;
  currentScore=0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
  
}

//rolling dice

btnRoll.addEventListener('click',function()
{
  if(playing)
  {
  //1.generate the random dice roll
  const dice=Math.trunc(Math.random()*6)+1;
  diceEl.classList.remove('hidden');

  //2.display dice
  diceEl.src=`dice-${dice}.png`;
  //3.check for rolled 1
 if(dice !== 1)
 {
  //4.add dice to current score
   currentScore +=dice;
   document.getElementById(`current--${activePlayer}`).textContent=currentScore;
   
 }
 else{
  //5.switch to next player
   switchPlayer();
 }
}

});

btnHold.addEventListener('click',function()
{
  if(playing)
  {
  //1.add current score to the active player's score
  score[activePlayer]=score[activePlayer]+currentScore;
  document.getElementById(`score--${activePlayer}`).textContent=score[activePlayer];


  //2.check if active player's score >=100
  if(score[activePlayer]>=100)
  {
    //3.finish the game
    playing=false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

  }else{
    //4.switch to the next player
  switchPlayer();
  }
  
  }

  
})

btnNew.addEventListener('click',initFunction)
