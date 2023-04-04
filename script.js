const StartStopBtn = document.getElementById("start-stop-button");
const StopBtn = document.getElementById("stop-button");
const ResetBtn = document.getElementById("reset-button");
const watchText = document.getElementById("watch-text");

let startStop = false;

let animationFrame;
let startTime = null;
let lastTime = null;
let elapsedTime = 0;

function update(time) {
  // get time since page was loaded
  if (!startTime) {
    startTime = time;
  }

  if (lastTime != null) {
    // update code
    const deltaTime = time - lastTime;
    elapsedTime += deltaTime;

    drawUpdate();
  }
  lastTime = time;
  animationFrame = window.requestAnimationFrame(update);
}

function drawUpdate() {
  const hours = Math.floor((elapsedTime / 3600000) % 24);
  const minutes = Math.floor((elapsedTime / 60000) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  let watchTextString;

  if (hours >= 1) {
    watchTextString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")
      .substring(0, 2)}`;
  } else {
    watchTextString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")
      .substring(0, 2)}`;
  }

  watchText.textContent = watchTextString;
}

function startWatch() {
  if (!startStop) {
    animationFrame = window.requestAnimationFrame(update);
    StartStopBtn.textContent = "Stop";
    startStop = true;
    lastTime = null;
  } else {
    window.cancelAnimationFrame(animationFrame);
    StartStopBtn.textContent = "Start";
    startStop = false;
  }
}

function resetWatch() {
  startTime = null;
  lastTime = null;
  elapsedTime = null;
  watchText.textContent = "00:00.00";
}

StartStopBtn.addEventListener("click", startWatch);
ResetBtn.addEventListener("click", resetWatch);
