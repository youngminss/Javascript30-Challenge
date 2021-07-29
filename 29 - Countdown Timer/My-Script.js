const timeControlButtons = document.querySelectorAll(".timer__controls button");
const customTimeInputForm = document.querySelector("#custom");
const restTime = document.querySelector(".display__time-left");
const toBeTime = document.querySelector(".display__end-time");
let tickOneSecond;

function toBeTimeCalculator(totalSecond) {
  const currentTime = new Date();
  const calcTime = currentTime.getTime() + totalSecond * 1000;
  const futureTime = new Date(calcTime);

  toBeTime.textContent = `Be Back At ${futureTime.getHours()}:${String(futureTime.getMinutes()).padStart(2, "0")}`;
}

function restTimeCalculator(totalSecond) {
  let restTotalSecond = totalSecond;

  // 현재 interval 존재시 제거
  clearInterval(tickOneSecond);
  tickOneSecond = setInterval(function () {
    restTotalSecond -= 1;
    let restMinutes = parseInt(restTotalSecond / 60);
    let restSeconds = String(parseInt(restTotalSecond % 60)).padStart(2, "0");

    restTime.textContent = `${restMinutes}:${restSeconds}`;
    document.title = `${restMinutes}:${restSeconds}`;

    if (restTotalSecond < 1) {
      clearInterval(tickOneSecond);
      return;
    }
  }, 1000);

  restTime.textContent = `${parseInt(restTotalSecond / 60)}:${parseInt(restTotalSecond % 60)}`;
  document.title = `${parseInt(restTotalSecond / 60)}:${parseInt(restTotalSecond % 60)}`;
}

function setButtonTimer() {
  restTimeCalculator(parseInt(this.dataset.time));
  toBeTimeCalculator(parseInt(this.dataset.time));
}

function setCustomTimer(e) {
  e.preventDefault();
  const customTime = document.querySelector('input[name="minutes"]');
  restTimeCalculator(parseInt(customTime.value) * 60);
  toBeTimeCalculator(parseInt(customTime.value) * 60);
  this.reset();
}

timeControlButtons.forEach((button) => {
  button.addEventListener("click", setButtonTimer);
});
customTimeInputForm.addEventListener("submit", setCustomTimer);

// element 의 이름을 알고 있으면, document.element이름 으로 직접 접근이 가능하다고 함
// document.customForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const mins = this.minutes.value;
//   console.log(mins);
//   timer(mins * 60);
//   this.reset();
// });
