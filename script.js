// SELECTORS
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $gameTime = document.querySelector('#game-time');

const colors = ['green', 'red', 'blue', 'yellow', 'pink', 'purple', 'orange', 'black'];
let score = 0;


// EVENT LISTENERS
$start.addEventListener('click', startGame);
$gameTime.addEventListener('change', setGameTime);
$game.addEventListener('click', clickGameHandler);

// FUNCTIONS

function startGame(){
    $game.style.backgroundColor = 'white';
    hide($start);
    $gameTime.setAttribute('disabled', 'true');
    
    score = 0;
    $result.textContent = score;

   const interval = setInterval( ()=>{
       const time = parseFloat($time.textContent);

       if(time <= 0){
            clearInterval(interval);
            endGame();
       }else{
            $time.textContent = (time-0.1).toFixed(1);  
       }
    }, 100);


    renderBox();
}


function endGame(){
    $game.innerHTML = '';
    $game.style.backgroundColor = 'gray';
    show($start);
    $gameTime.removeAttribute('disabled');
    setGameTime();
}

function setGameTime(){
    $time.textContent = Number($gameTime.value).toFixed(1);
}

function renderBox(){

    $game.innerHTML = '';

   let {width, height} = $game.getBoundingClientRect();
   let boxSize = random(30, 100);   // 100
   let maxTop = height - boxSize;   // 200
   let maxLeft =  width - boxSize;  // 200
   let colorIndex = random(0, colors.length); // 3

   let $box = document.createElement('div');
   $box.style.position = 'absolute';
   $box.style.width = $box.style.height = boxSize + 'px';
   $box.style.top = random(0, maxTop) + 'px';
   $box.style.left = random(0, maxLeft)+ 'px';
   $box.style.backgroundColor = colors[colorIndex];
   $box.style.cursor = 'pointer';
   $box.setAttribute('data-box', 'true');
   
   $game.insertAdjacentElement('afterbegin', $box);
}

function clickGameHandler(e){
    if(e.target.dataset.box){
        renderBox();
        score++;
        $result.textContent = score;
    }
}

function show($el){
    $el.classList.remove('hide');
}

function hide($el){
    $el.classList.add('hide');
}

function random(min, max){
    return Math.floor(Math.random()*(max-min) + min);
}