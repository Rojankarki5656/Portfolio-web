let WORK_TIME = 25 * 60; // Default work time (25 minutes)
let BREAK_TIME = 5 * 60; // Default break time (5 minutes)

let time = WORK_TIME;
let isActive = false;
let isWork = true;
let interval = null;

const modeElement = document.getElementById("mode");
const timeElement = document.getElementById("time");
const progressElement = document.getElementById("progress");
const startPauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");
const switchModeButton = document.getElementById("switch-mode");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");
const updateTimesButton = document.getElementById("update-times");
const notification = document.getElementById("notification");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateTimer() {
  if (isActive && time > 0) {
    time--;
    timeElement.textContent = formatTime(time);
    updateProgress();
  } else if (time === 0) {
    clearInterval(interval);
    isActive = false;
    isWork = !isWork;
    time = isWork ? WORK_TIME : BREAK_TIME;
    updateUI();
    alert(isWork ? "Time to work!" : "Time for a break!");
  }
}

function updateProgress() {
  const totalTime = isWork ? WORK_TIME : BREAK_TIME;
  const progress = ((totalTime - time) / totalTime) * 100;
  progressElement.style.width = `${progress}%`;
}

function toggleTimer() {
  isActive = !isActive;
  if (isActive) {
    interval = setInterval(updateTimer, 1000);
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    clearInterval(interval);
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
}

function resetTimer() {
  clearInterval(interval);
  isActive = false;
  time = isWork ? WORK_TIME : BREAK_TIME;
  updateUI();
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
}

function switchMode() {
  isActive = false;
  isWork = !isWork;
  time = isWork ? WORK_TIME : BREAK_TIME;
  updateUI();
  resetTimer();
}

function updateUI() {
  modeElement.textContent = isWork ? "Work" : "Break";
  timeElement.textContent = formatTime(time);
  updateProgress();
  switchModeButton.textContent = `Switch to ${isWork ? "Break" : "Work"}`;
  document.body.classList.toggle("break-mode", !isWork);
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500); // Hide after 2.5 seconds
}

// Update custom times
updateTimesButton.addEventListener("click", () => {
  const newWorkTime = parseInt(workTimeInput.value) * 60;
  const newBreakTime = parseInt(breakTimeInput.value) * 60;

  if (newWorkTime > 0 && newBreakTime > 0) {
    WORK_TIME = newWorkTime;
    BREAK_TIME = newBreakTime;
    resetTimer();
    showNotification(); // Show notification
  } else {
    alert("Please enter valid times (greater than 0).");
  }
});

startPauseButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
switchModeButton.addEventListener("click", switchMode);

// Initialize UI
updateUI();