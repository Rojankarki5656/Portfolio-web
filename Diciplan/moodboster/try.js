// Data for Exercises, Stretching, Yoga, and Jumba Steps
const lightExercises = ["Knee Push-Up", "Arm Circles", "Lunge", "Hip Circle", "Shoulder Rotation"];
const hardExercises = ["Archar Push-Ups", "Weight Lifting", "Planks", "Mountain Climbers", "Jump Squats", "Pull-Ups"];
const stretchingActivities = ["Hamstring Stretch", "Quad Stretch", "Neck Stretch", "Shoulder Stretch", "Side Stretch"];
const yogaPoses = ["Mountain Pose", "Downward Dog", "Bhujangasana", "Cobra Pose", "Tree Pose", "Child's Pose"];
const jumbaSteps = ["Jumba Step 1", "Jumba Step 2", "Jumba Step 3", "Jumba Step 4", "Jumba Step 5"];

// Get elements
const mainPage = document.getElementById('main-page');
const exercisePage = document.getElementById('exercise-page');
const lightExercisePage = document.getElementById('light-exercise-page');
const hardExercisePage = document.getElementById('hard-exercise-page');
const stretchingPage = document.getElementById('stretching-page');
const yogaPage = document.getElementById('yoga-page');
const jumbaStepsPage = document.getElementById('jumba-steps-page');

const lightExerciseContent = document.getElementById('light-exercise-content');
const hardExerciseContent = document.getElementById('hard-exercise-content');
const stretchingContent = document.getElementById('stretching-content');
const yogaContent = document.getElementById('yoga-content');
const jumbaStepsContent = document.getElementById('jumba-steps-content');

const nextLightExerciseBtn = document.getElementById('next-light-exercise');
const nextHardExerciseBtn = document.getElementById('next-hard-exercise');
const nextStretchingBtn = document.getElementById('next-stretching');
const nextYogaBtn = document.getElementById('next-yoga');
const nextJumbaStepsBtn = document.getElementById('next-jumba-steps');

// Back buttons
const backToMainFromExercise = document.getElementById('back-to-main-from-exercise');
const backToMainFromLight = document.getElementById('back-to-main-from-light');
const backToMainFromHard = document.getElementById('back-to-main-from-hard');
const backToMainFromStretching = document.getElementById('back-to-main-from-stretching');
const backToMainFromYoga = document.getElementById('back-to-main-from-yoga');
const backToMainFromJumba = document.getElementById('back-to-main-from-jumba');

// Index trackers
let currentLightExerciseIndex = 0;
let currentHardExerciseIndex = 0;
let currentStretchingIndex = 0;
let currentYogaIndex = 0;
let currentJumbaStepsIndex = 0;

// Hide all pages except the main page
function hideAllPages() {
  mainPage.classList.add('hidden');
  exercisePage.classList.add('hidden');
  lightExercisePage.classList.add('hidden');
  hardExercisePage.classList.add('hidden');
  stretchingPage.classList.add('hidden');
  yogaPage.classList.add('hidden');
  jumbaStepsPage.classList.add('hidden');
}

// Show Main Page
function showMainPage() {
  hideAllPages();
  mainPage.classList.remove('hidden');
  resetAllPages(); // Reset all pages when returning to the main page
}

// Reset all pages
function resetAllPages() {
  currentLightExerciseIndex = 0;
  currentHardExerciseIndex = 0;
  currentStretchingIndex = 0;
  currentYogaIndex = 0;
  currentJumbaStepsIndex = 0;

  lightExerciseContent.innerHTML = '';
  hardExerciseContent.innerHTML = '';
  stretchingContent.innerHTML = '';
  yogaContent.innerHTML = '';
  jumbaStepsContent.innerHTML = '';

  nextLightExerciseBtn.classList.remove('hidden');
  nextHardExerciseBtn.classList.remove('hidden');
  nextStretchingBtn.classList.remove('hidden');
  nextYogaBtn.classList.remove('hidden');
  nextJumbaStepsBtn.classList.remove('hidden');

  backToMainFromLight.classList.add('hidden');
  backToMainFromHard.classList.add('hidden');
  backToMainFromStretching.classList.add('hidden');
  backToMainFromYoga.classList.add('hidden');
  backToMainFromJumba.classList.add('hidden');
}

// Main Page Buttons
document.getElementById('exercise-btn').addEventListener('click', () => {
  hideAllPages();
  exercisePage.classList.remove('hidden');
});

document.getElementById('stretching-btn').addEventListener('click', () => {
  hideAllPages();
  stretchingPage.classList.remove('hidden');
  showNextStretching();
});

document.getElementById('yoga-btn').addEventListener('click', () => {
  hideAllPages();
  yogaPage.classList.remove('hidden');
  showNextYoga();
});

document.getElementById('jumba-steps-btn').addEventListener('click', () => {
  hideAllPages();
  jumbaStepsPage.classList.remove('hidden');
  showNextJumbaSteps();
});

// Exercise Page Buttons
document.getElementById('light-exercise-btn').addEventListener('click', () => {
  hideAllPages();
  lightExercisePage.classList.remove('hidden');
  showNextLightExercise();
});

document.getElementById('hard-exercise-btn').addEventListener('click', () => {
  hideAllPages();
  hardExercisePage.classList.remove('hidden');
  showNextHardExercise();
});

// Next Buttons
nextLightExerciseBtn.addEventListener('click', () => showNextLightExercise());
nextHardExerciseBtn.addEventListener('click', () => showNextHardExercise());
nextStretchingBtn.addEventListener('click', () => showNextStretching());
nextYogaBtn.addEventListener('click', () => showNextYoga());
nextJumbaStepsBtn.addEventListener('click', () => showNextJumbaSteps());

// Back Buttons
backToMainFromExercise.addEventListener('click', showMainPage);
backToMainFromLight.addEventListener('click', showMainPage);
backToMainFromHard.addEventListener('click', showMainPage);
backToMainFromStretching.addEventListener('click', showMainPage);
backToMainFromYoga.addEventListener('click', showMainPage);
backToMainFromJumba.addEventListener('click', showMainPage);

// Function to show next light exercise
function showNextLightExercise() {
  if (currentLightExerciseIndex < lightExercises.length) {
    lightExerciseContent.innerHTML = `
      <h3>${lightExercises[currentLightExerciseIndex]}</h3>
      <img src="images/lite-${currentLightExerciseIndex + 1}.gif" alt="${lightExercises[currentLightExerciseIndex]}" width="500" height="541">
    `;
    currentLightExerciseIndex++;
    if (currentLightExerciseIndex === lightExercises.length) {
      nextLightExerciseBtn.classList.add('hidden');
      backToMainFromLight.classList.remove('hidden');
    }
  }
}

// Function to show next hard exercise
function showNextHardExercise() {
  if (currentHardExerciseIndex < hardExercises.length) {
    hardExerciseContent.innerHTML = `
      <h3>${hardExercises[currentHardExerciseIndex]}</h3>
      <img src="images/exercise-${currentHardExerciseIndex + 1}.jpg" alt="${hardExercises[currentHardExerciseIndex]}" width="500" height="541">
    `;
    currentHardExerciseIndex++;
    if (currentHardExerciseIndex === hardExercises.length) {
      nextHardExerciseBtn.classList.add('hidden');
      backToMainFromHard.classList.remove('hidden');
    }
  }
}

// Function to show next stretching activity
function showNextStretching() {
  if (currentStretchingIndex < stretchingActivities.length) {
    stretchingContent.innerHTML = `
      <h3>${stretchingActivities[currentStretchingIndex]}</h3>
      <img src="images/stretch-${currentStretchingIndex + 1}.gif" alt="${stretchingActivities[currentStretchingIndex]}" width="500" height="541">
    `;
    currentStretchingIndex++;
    if (currentStretchingIndex === stretchingActivities.length) {
      nextStretchingBtn.classList.add('hidden');
      backToMainFromStretching.classList.remove('hidden');
    }
  }
}

// Function to show next yoga pose
function showNextYoga() {
  if (currentYogaIndex < yogaPoses.length) {
    yogaContent.innerHTML = `
      <h3>${yogaPoses[currentYogaIndex]}</h3>
      <img src="images/Yoga-${currentYogaIndex + 1}.jpg" alt="${yogaPoses[currentYogaIndex]}" width="500" height="541">
    `;
    currentYogaIndex++;
    if (currentYogaIndex === yogaPoses.length) {
      nextYogaBtn.classList.add('hidden');
      backToMainFromYoga.classList.remove('hidden');
    }
  }
}

// Function to show next Jumba step
function showNextJumbaSteps() {
  if (currentJumbaStepsIndex < jumbaSteps.length) {
    jumbaStepsContent.innerHTML = `
      <h3>${jumbaSteps[currentJumbaStepsIndex]}</h3>
      <img src="images/jumba-${currentJumbaStepsIndex + 1}.gif" alt="${jumbaSteps[currentJumbaStepsIndex]}" width="500" height="541">
    `;
    currentJumbaStepsIndex++;
    if (currentJumbaStepsIndex === jumbaSteps.length) {
      nextJumbaStepsBtn.classList.add('hidden');
      backToMainFromJumba.classList.remove('hidden');
    }
  }
}