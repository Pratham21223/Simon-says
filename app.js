let userInp = [];
let compInp = [];
let gameStart = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let btns = ["btn-1", "btn-2", "btn-3", "btn-4"];
let startBtn = document.querySelector("#start-btn");
let answerBtn = document.querySelector("#ans-btn");

startBtn.addEventListener("click", function () {
  if (!gameStart) {
    compInp = [];
    level = 0;
    userInp = [];
    levelUp();
    gameStart = true;
    startBtn.style.display = "none";
    answerBtn.style.display = "none";
  }
});

function levelUp() {
  // h3.style.display = "none";
  userInp = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randBtn = document.querySelector(`.${btns[randIdx]}`);
  flash(randBtn);
  compInp.push(btns[randIdx]);
}

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function checkAns(idx) {
  if (userInp[idx] === compInp[idx]) {
    if (userInp.length === compInp.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <i><b>${level - 1}<b></i>.`;
    answerBtn.style.display = "inline-block";
    reset();
  }
}

function user() {
  if (gameStart) {
    let btn = this;
    flash(btn);
    let userColor = btn.getAttribute("id");
    userInp.push(userColor);
    checkAns(userInp.length - 1);
  }
}

let selBtns = document.querySelectorAll(".btn");
for (let btn of selBtns) {
  btn.addEventListener("click", user);
}

function reset() {
  h3.style.display = "block";
  gameStart = false;
  userInp = [];
  level = 0;
  startBtn.style.display = "inline-block";
}

// ✅ Flash sequence when "Show Answer" is clicked
answerBtn.addEventListener("click",async function () {
  function delay(){
  return new Promise(resolve=> setTimeout(resolve,100))
}
  for (let i = 0; i < compInp.length; i++) {
    let btn = document.querySelector(`.${compInp[i]}`);
    setTimeout(() => flash(btn), 300 * i);
    await delay();
}
});
