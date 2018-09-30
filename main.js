'use strict';

function buildDom (html){
  var div = document.createElement('div');
  div.innerHTML= html;
  return div.children[0];
}

function main() {
   var mainContainerElement = document.querySelector('#main-container');

  //-- Splash 

  //--place holders
  var splashElement = null;
  var splashButton = null;

  var handleSplashClick = function (){
    destroySplash();
    buildGame();
  }

  function buildSplash(){
    splashElement = buildDom(`
      <main class="splash container">
        <h1 class="splash_title">Defense Grid</h1>
        <p>Instructions: Use your 'A' key to active the laser and defend the Earth from incoming asteroids</p>
        <button>Start</button>
      </main>
    `)

    mainContainerElement.appendChild(splashElement);

    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick);
  }

  function destroySplash(){
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  //-- Game

  //--placeholders

  var game = null;

  var handleGameOver = function(){
    destroyGame();
    buildGameOver(game.score);
  }

  function buildGame() {
    game = new Game (mainContainerElement);
    game.onOver(handleGameOver);
    
  }

  function destroyGame(){
    game.destroy();
  }

  //-- Game Over

   var gameOverElement = null;
   var gameOverButton = null;
   var gameOverScore = null;

   var handleGameOverClick = function(){
     destroyGameOver();
     buildSplash();
   }

  function buildGameOver (score, userName){
    gameOverElement = buildDom(`
    <main class="gamever container">
      <h1>Game Over</h1>
      <p>Your score:<span class="score"></span></p>
      <button>Play Again</button>
    </main>
    `)
     mainContainerElement.appendChild(gameOverElement);

     gameOverScore = document.querySelector('.score');
     gameOverScore.innerText = " " + game.score;
     gameOverButton = document.querySelector('button');
     gameOverButton.addEventListener('click', handleGameOverClick);

  }

  function destroyGameOver(){
    gameOverButton.removeEventListener('click', handleGameOverClick);
    gameOverElement.remove();
  }

buildSplash();
}
document.addEventListener('DOMContentLoaded', main);