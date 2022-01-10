const $btn = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $appGame = document.querySelector('.app__content')
const $game_time = document.querySelector('#game-time')
const $header_result = document.querySelector('#result-header')
const $header_time = document.querySelector('#time-header')
const $result = document.querySelector('#result')
const $signUpBtn = document.querySelector('#singUp')
const $signUp = document.querySelector('#name')
const $form = document.querySelector('#form')
const $appResult = document.querySelector('.app__result')
const $exit = document.querySelector('#exit')
const $resultFormBtn = document.querySelector('#result_form')
const $info = document.querySelector('#info') 
let score = 0
let userName = ''
let userTime = ''
let user = {}
let userList = []

$signUpBtn.addEventListener('click', form)
function form () {
    if ($signUp.value){
        $form.classList.add('hide')
        $appGame.classList.remove('hide')
        $resultFormBtn.classList.add('hide')
        userName = $signUp.value
        userTime = $game_time.value
    }else{
        alert('Напишите свое имея!!')
    }
}

function getForm() {
    user.name = $signUp.value
    user.result = score
    user.data = new Date().toLocaleString()
    user.game_time = $game_time.value
    
    userList.push(user)
    user = {}
    localStorage.setItem('list', JSON.stringify(userList))
    userList = JSON.parse(localStorage.getItem('list'))
}

$resultFormBtn.addEventListener('click', function () {
    let listFromDataBase = JSON.parse(localStorage.getItem('list'))  
    $info.innerHTML = ''
    for(let i=0; i<listFromDataBase.length; i++){
        $info.insertAdjacentHTML('beforeend', `<div class="user" id="user"><h3>${listFromDataBase[i].$signUp}</h3><h3>${listFromDataBase[i].$result}</h3><h3>${listFromDataBase[i].$data}</h3><h3>${listFromDataBase[i].$game_time}</h3></div>`)
    }
})

function sortingUsers() {
    for(let i=0; i<userList.length; i++){
        for(let j=0; j<userList.length; j++){
            if(userList[j]>userList[j + 1]){
                let swap = userList[j]
                userList[j] = userList[j + 1]
                userList[j + 1] = swap
            }
        }
    }
}

$btn.addEventListener('click', startGame)
function startGame () {
    $btn.classList.add('hide')
    $game.style.backgroundColor = '#fff'
    $header_time.classList.remove('hide')
    $header_result.classList.add('hide')
    $time.textContent = $game_time.value
    $game_time.setAttribute('disabled', 'true')
    $exit.classList.add('hide')
    score = 0
    createBox()
    timer()
}

$game_time.addEventListener('input', setTime)
function setTime() {
    $time.textContent = $game_time.value
    $header_time.classList.remove('hide')
    $header_result.classList.add('hide')
}

function timer() {
    let interval = setInterval(function (){
        $time.textContent = (Number($time.textContent) - 0.1).toFixed(1)
        if ($time.textContent <= 0){
            $game.innerHTML = ''
            resultGame()
            getForm()
            clearInterval(interval)
        }
    }, 100) 
}

$game.addEventListener("click", clickBox); 
function clickBox(event) { 
    if (event.target.dataset.box) { 
        createBox(); 
        score++
    } 
}

function resultGame() {
    $header_time.classList.add('hide')
    $header_result.classList.remove('hide')
    $btn.classList.remove('hide')
    $game_time.removeAttribute('disabled')
    $game.style.backgroundColor = '#ccc'
    $result.textContent = score
    $exit.classList.remove('hide')
    $appResult.insertAdjacentHTML('beforeend', `<div class="user"><h3>${userName}</h3><h3>${score}</h3><h3>${new Date().toLocaleString()}</h3><h3>${userTime}</h3></div>`)
}

// function endGame() {
//     $game.innerHTML = ''
//     $start.classList.remove('hide')
//     $game.style.backgroundColor = '#ccc'
//     $result_header.classList.remove('hide')
//     $time_header.classList.add('hide')
//     $result.textContent = score
//     $game_time.removeAttribute('disabled')
//     $exit.classList.remove('hide')
//     usersList.sort(function (a, b) {
//       if (a.score > b.score) {
//         return -1;
//       }
//       if (a.score < b.score) {
//         return 0;
//       }
//       return 1;
//       });
//     usersListActually()
//     showListActually()
//   }

$exit.addEventListener('click', function() {
    $form.classList.remove('hide')
    $appGame.classList.add('hide')
    $exit.classList.add('hide')
    $resultFormBtn.classList.remove('hide')
})

function createBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let sizeBox = getRandom(30, 100)
    let left = getRandom(0, 300 - sizeBox)
    let top = getRandom(0, 300 - sizeBox)

    box.style.width = box.style.height = sizeBox + 'px'
    box.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
    box.style.position = 'absolute'
    box.style.left = left + 'px'
    box.style.top = top  + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', true)

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min
}