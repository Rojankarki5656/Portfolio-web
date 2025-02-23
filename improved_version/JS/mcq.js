const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopupButton = document.getElementById("close-popup");

// EDIT: Added 5 sets of questions
const questionSets = [
// set- 1 that is based to indetify the personality of a person.
[
  {
    question: "How do you usually react to stressful situations?",
    options: ["Panic and feel overwhelmed", "Take a deep breath and stay calm", "Avoid the situation", "Analyze the problem and find a solution"],
    points: [1, 4, 2, 3],
  },
  {
    question: "How do you prefer to spend your free time?",
    options: ["Alone, reading or watching movies", "With friends, socializing", "Exploring new hobbies or activities", "Relaxing and doing nothing"],
    points: [3, 4, 2, 1],
  },
  {
    question: "How do you handle criticism?",
    options: ["Take it personally and feel hurt", "Reflect on it and try to improve", "Ignore it completely", "Get defensive and argue"],
    points: [1, 4, 2, 3],
  },
  {
    question: "How do you make decisions?",
    options: ["Go with your gut feeling", "Weigh the pros and cons carefully", "Ask for others' opinions", "Delay making a decision"],
    points: [3, 4, 2, 1],
  },
  {
    question: "How do you describe your communication style?",
    options: ["Direct and to the point", "Friendly and empathetic", "Reserved and thoughtful", "Expressive and animated"],
    points: [4, 3, 2, 1],
  },
  {
    question: "How do you approach challenges?",
    options: ["Avoid them if possible", "Face them head-on with confidence", "Seek help from others", "Take small steps to overcome them"],
    points: [1, 4, 3, 2],
  },
  {
    question: "How do you feel about change?",
    options: ["Excited and embrace it", "Nervous but willing to adapt", "Resistant and prefer stability", "Indifferent, it doesn't affect me"],
    points: [4, 3, 2, 1],
  },
  {
    question: "How do you handle conflicts?",
    options: ["Avoid confrontation at all costs", "Try to find a compromise", "Stand your ground and defend your position", "Listen and try to understand the other person's perspective"],
    points: [1, 3, 2, 4],
  },
  {
    question: "How do you describe your work style?",
    options: ["Organized and detail-oriented", "Creative and spontaneous", "Collaborative and team-oriented", "Independent and self-driven"],
    points: [4, 3, 2, 1],
  },
  {
    question: "How do you express your emotions?",
    options: ["Openly and freely", "Only with close friends or family", "Rarely, I keep them to myself", "Through actions rather than words"],
    points: [4, 3, 2, 1],
  },
],
// the question that is based on psycology to find the user is happy or not!
[
  {
    question: "How often do you feel happy or content?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How do you feel about your future?",
    options: ["Hopeless", "Uncertain", "Optimistic", "Excited"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How do you handle setbacks or failures?",
    options: ["I feel defeated and give up", "I feel sad but try to move on", "I learn from them and try again", "I see them as opportunities for growth"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How often do you feel stressed or anxious?",
    options: ["Almost always", "Often", "Sometimes", "Rarely"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How do you feel about your relationships with others?",
    options: ["Lonely and disconnected", "Somewhat satisfied", "Mostly positive", "Very fulfilling and supportive"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How do you feel about your self-worth?",
    options: ["I often feel worthless", "I sometimes doubt myself", "I generally feel good about myself", "I am confident and value myself"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How often do you engage in activities you enjoy?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How do you feel about your physical health?",
    options: ["Poor", "Fair", "Good", "Excellent"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How do you feel about your ability to achieve your goals?",
    options: ["I don't believe I can achieve them", "I sometimes doubt my ability", "I feel somewhat confident", "I am confident and motivated"],
    points: [1, 2, 3, 4],
  },
  {
    question: "How often do you feel grateful for what you have?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
    points: [1, 2, 3, 4],
  },
],
// set -3 find the user is not discipiline or not!
  [
    {
      question: "How often do you stick to your daily schedule or routine?",
      options: ["Rarely", "Sometimes", "Often", "Almost always"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How do you handle procrastination?",
      options: ["I often procrastinate and struggle to start tasks", "I sometimes procrastinate but eventually get things done", "I rarely procrastinate and stay on track", "I never procrastinate and complete tasks on time"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How often do you set goals for yourself?",
      options: ["Rarely", "Sometimes", "Often", "Almost always"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How do you follow through with your goals?",
      options: ["I rarely complete them", "I complete some of them", "I complete most of them", "I always complete them"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How do you manage your time?",
      options: ["Poorly, I often waste time", "Fairly, I sometimes get distracted", "Well, I usually stay focused", "Very well, I always use my time efficiently"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How often do you exercise or engage in physical activity?",
      options: ["Rarely", "Sometimes", "Often", "Almost always"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How do you handle distractions while working or studying?",
      options: ["I get easily distracted and lose focus", "I sometimes get distracted but manage to refocus", "I rarely get distracted and stay focused", "I never get distracted and maintain full focus"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How often do you complete tasks on time?",
      options: ["Rarely", "Sometimes", "Often", "Almost always"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How do you handle temptations (e.g., junk food, procrastination)?",
      options: ["I often give in to temptations", "I sometimes resist temptations", "I usually resist temptations", "I always resist temptations"],
      points: [1, 2, 3, 4],
    },
    {
      question: "How often do you reflect on your progress and make improvements?",
      options: ["Rarely", "Sometimes", "Often", "Almost always"],
      points: [1, 2, 3, 4],
    },
  ],
    // Add more sets of questions here if needed
];

// EDIT: Randomly select a set of questions
const selectedSet = questionSets[Math.floor(Math.random() * questionSets.length)];

// EDIT: Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// EDIT: Shuffle the selected set of questions
const questions = shuffleArray(selectedSet);

let currentQuestionIndex = 0;
let totalPoints = 0;

// Display Current Question
function displayQuestion(index) {
  const question = questions[index];
  quizContainer.innerHTML = `
    <div class="question active">
      <h3>${index + 1}. ${question.question}</h3>
      <div class="options">
        ${question.options
          .map(
            (option, i) =>
              `<div class="option" data-question="${index}" data-option="${i}">${option}</div>`
          )
          .join("")}
      </div>
    </div>
  `;

  // Highlight selected option (if any)
  const selectedOption = document.querySelector(
    `.option.selected[data-question="${index}"]`
  );
  if (selectedOption) {
    selectedOption.classList.add("selected");
  }

  // Update navigation buttons
  nextButton.disabled = index === questions.length - 1;
  submitButton.style.display = index === questions.length - 1 ? "block" : "none";
}

// Handle Option Selection
quizContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("option")) {
    const questionIndex = e.target.getAttribute("data-question");
    const optionIndex = e.target.getAttribute("data-option");

    // Remove selected class from all options in this question
    const options = document.querySelectorAll(
      `.option[data-question="${questionIndex}"]`
    );
    options.forEach((option) => option.classList.remove("selected"));

    // Add selected class to the clicked option
    e.target.classList.add("selected");

    // Store the selected option's points
    questions[questionIndex].selectedPoints = questions[questionIndex].points[optionIndex];
  }
});

// Handle Next Button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }
});

// Calculate Total Points and Show Popup
submitButton.addEventListener("click", () => {
  totalPoints = questions.reduce((sum, q) => sum + (q.selectedPoints || 0), 0);

  // Determine the message based on the total score
  let message = "";
  if (totalPoints > 30 && totalPoints <= 35) {
    message = "You are doing great in your life! Keep up the good work. 🎉";
  } else if (totalPoints > 25 && totalPoints <= 30) {
    message = "You're doing well, but there's still room for improvement. Focus on maintaining a healthy lifestyle. 💪";
  } else if (totalPoints > 20 && totalPoints <= 25) {
    message = "You're on the right track, but there are areas where you can improve. Consider making small changes to your daily habits. 🌱";
  } else {
    message = "You need improvement. Here are some areas to focus on: exercise, diet, sleep, and stress management. Start small and build from there. 🌟";
  }

  // Show the popup with the final message
  popupMessage.textContent = `Your total points: ${totalPoints} out of ${questions.length * 4}. ${message}`;
  popup.style.display = "flex";
});

// Close Popup
closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});

// Initialize Quiz with randomized questions
displayQuestion(currentQuestionIndex);