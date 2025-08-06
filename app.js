let userInp = [];
let compInp = [];
let gameStart = false;
let level = 0;

let h2 = document.querySelector('h2');
let h = document.querySelectorAll('h2');
let btns = ['btn-1', 'btn-2', 'btn-3', 'btn-4'];
let startBtn = document.querySelector('#start-btn'); // ✅ Start button

// ✅ Start button click
startBtn.addEventListener('click', function () {
  if (!gameStart) {
    levelUp();
    gameStart = true;
    startBtn.style.display = 'none'; // hide button once game starts
  }
});

function levelUp() {
  h[1].style.display = 'none'; // hide instructions
  userInp = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randBtn = document.querySelector(`.${btns[randIdx]}`);
  flash(randBtn);
  compInp.push(btns[randIdx]);
}

function flash(btn) {
  btn.classList.add('flash');
  setTimeout(function () {
    btn.classList.remove('flash');
  }, 300);
}

function checkAns(idx) {
  if (userInp[idx] === compInp[idx]) {
    if (userInp.length === compInp.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level - 1}</b>`;
    reset();
  }
}

function user() {
  if (gameStart) {
    let btn = this;
    flash(btn);
    let userColor = btn.getAttribute('id');
    userInp.push(userColor);
    checkAns(userInp.length - 1);
  }
}

let selBtns = document.querySelectorAll('.btn');
for (let btn of selBtns) {
  btn.addEventListener('click', user);
}

function reset() {
  h[1].style.display = 'block'; // show instructions
  gameStart = false;
  userInp = [];
  compInp = [];
  level = 0;
  startBtn.style.display = 'inline-block'; // ✅ show button again
}
