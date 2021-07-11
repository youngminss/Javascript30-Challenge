const playBtn = document.querySelector(".toggle");
const video = document.querySelector(".viewer");
let play = false;
const ranges = document.querySelectorAll(".player__slider");
const skipBtn = document.querySelectorAll(".player__button");
const progress = document.querySelector(".progress");
const filledProgress = document.querySelector(".progress__filled");
let progressFlag = false;

function playerControl(e) {
  // 플레이 flag 설정
  playBtn.textContent === "▶" ? (play = true) : (play = false);
  play ? (playBtn.innerText = "❚ ❚") : (playBtn.innerText = "▶");

  if (play) {
    video.play();
    setInterval(() => {
      filledProgress.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
    });
  } else {
    video.pause();
  }
}
function rangeChangeHandler() {
  this.name === "volume" ? (video.volume = this.value) : (video.playbackRate = this.value);
}
function skipHandler() {
  const skipSec = parseInt(this.dataset.skip);
  skipSec === -10 ? (video.currentTime -= 10) : (video.currentTime += 25);
}
function moveProgressHandler(e) {
  if (progressFlag) {
    // offset 오차 감한
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
    filledProgress.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
  }
}
playBtn.addEventListener("click", playerControl);
video.addEventListener("click", playerControl);
ranges.forEach((range) => {
  range.addEventListener("input", rangeChangeHandler);
});
skipBtn.forEach((btn) => {
  btn.addEventListener("click", skipHandler);
});
progress.addEventListener("mousedown", (e) => {
  progressFlag = true;
  moveProgressHandler(e);
});
progress.addEventListener("mousemove", moveProgressHandler);
progress.addEventListener("mouseup", () => (progressFlag = false));
