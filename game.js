const ROUNDS = [
  {
    title: "Ask a Supplier for a Sample Box",
    goal: "Pick a calm, clear temperature so the email sounds polite and easy to understand.",
    minWin: 0.2,
    maxWin: 0.7,
    lowReply: "\"Sample box. Please send. Company name: ABC. Address: 12 Main Street.\"",
    winReply: "\"Hi! Could you please send us a sample box to test quality? Our address is 12 Main Street. Thank you!\"",
    highReply: "\"SEND SAMPLE BOXES NOW OR FLYING PENGUINS WILL EAT THE WAREHOUSE BANANAS!!\""
  },
  {
    title: "Think of Fun Names for a New Snack",
    goal: "Turn the heat up a bit so the AI gives fun, creative snack names—not too stiff and not too wild.",
    minWin: 0.9,
    maxWin: 1.5,
    lowReply: "\"Crunchy Corn Chips. Salted Potato Snack. Baked Wheat Crackers.\"",
    winReply: "\"MoonCrunch Puffs, Happy Cheesy Waves, and Zoomy Snap Bites!\"",
    highReply: "\"ZAP-BONGLE-FIZZ-TOASTER-9000!!! BLORP SNACK GALAXY!!\""
  },
  {
    title: "Explain Why a Delivery Is 2 Days Late",
    goal: "Keep the message friendly and honest without sounding too cold or too crazy.",
    minWin: 0.4,
    maxWin: 0.9,
    lowReply: "\"Delay is 2 days. Rain happened. New date is Friday.\"",
    winReply: "\"Sorry for the 2-day delay! Heavy rain slowed the road, and your order will now arrive on Friday.\"",
    highReply: "\"THE SKY CRIED SAD RAINDROPS AND A UNICORN STOLE THE TRUCK UNTIL FRIDAY!!\""
  },
  {
    title: "Write a Short Welcome Note for a New Teammate",
    goal: "Find a warm, lively temperature that feels welcoming without going off the rails.",
    minWin: 0.7,
    maxWin: 1.3,
    lowReply: "\"Welcome to the team. Your desk is by the window. Start at 9:00 AM.\"",
    winReply: "\"Welcome to the team! We are so glad you are here—grab some coffee and say hi!\"",
    highReply: "\"WELCOME SUPER-HUMAN!! CONFETTI CANNONS FIRING AT 900 MILES PER HOUR!!\""
  }
];

let currentRound = 0;
let score = 0;
let roundSolved = false;

const roundText = document.getElementById("round-text");
const scoreText = document.getElementById("score-text");
const gameCard = document.getElementById("game-card");
const endCard = document.getElementById("end-card");
const badgeText = document.getElementById("badge-text");
const taskTitle = document.getElementById("task-title");
const taskGoal = document.getElementById("task-goal");
const tempSlider = document.getElementById("temp-slider");
const tempValue = document.getElementById("temp-value");
const btnTest = document.getElementById("btn-test");
const resultBox = document.getElementById("result-box");
const resultLabel = document.getElementById("result-label");
const aiReply = document.getElementById("ai-reply");
const resultTip = document.getElementById("result-tip");
const btnTryAgain = document.getElementById("btn-try-again");
const btnNext = document.getElementById("btn-next");
const finalScore = document.getElementById("final-score");
const finalNote = document.getElementById("final-note");
const btnRestart = document.getElementById("btn-restart");

function loadRound(index) {
  const round = ROUNDS[index];
  roundSolved = false;
  roundText.textContent = `${index + 1} / ${ROUNDS.length}`;
  badgeText.textContent = `Round ${index + 1}`;
  taskTitle.textContent = round.title;
  taskGoal.textContent = round.goal;
  tempSlider.value = "1.0";
  tempValue.textContent = "1.0";
  resultBox.classList.add("hidden");
  btnNext.textContent = index < ROUNDS.length - 1 ? "Next Round →" : "See Final Score →";
}

function testTemperature() {
  const round = ROUNDS[currentRound];
  const temp = Number(tempSlider.value);

  resultBox.classList.remove("hidden", "win", "low", "high");

  if (temp < round.minWin) {
    resultBox.classList.add("low");
    resultLabel.textContent = "❄️ Too Low (Too Stiff)";
    aiReply.textContent = round.lowReply;
    resultTip.textContent = `Try turning the slider higher (sweet spot: ${round.minWin.toFixed(1)} to ${round.maxWin.toFixed(1)}).`;
  } else if (temp > round.maxWin) {
    resultBox.classList.add("high");
    resultLabel.textContent = "🔥 Too High (Too Wild)";
    aiReply.textContent = round.highReply;
    resultTip.textContent = `Try turning the slider lower (sweet spot: ${round.minWin.toFixed(1)} to ${round.maxWin.toFixed(1)}).`;
  } else {
    resultBox.classList.add("win");
    resultLabel.textContent = "🎯 Sweet Spot! Great Fit!";
    aiReply.textContent = round.winReply;
    resultTip.textContent = `Nice! ${temp.toFixed(1)} hit the right balance for this task.`;
    if (!roundSolved) {
      roundSolved = true;
      score += 25;
      scoreText.textContent = score;
    }
  }
}

function showEndScreen() {
  gameCard.classList.add("hidden");
  endCard.classList.remove("hidden");
  finalScore.textContent = `Total Score: ${score} / ${ROUNDS.length * 25}`;
  finalNote.textContent =
    score >= 75
      ? "Awesome job! You know how to tune AI temperature for different tasks."
      : "Good try! Play again and test different slider spots to score even higher.";
}

tempSlider.addEventListener("input", () => {
  tempValue.textContent = Number(tempSlider.value).toFixed(1);
});

btnTest.addEventListener("click", testTemperature);

btnTryAgain.addEventListener("click", () => {
  resultBox.classList.add("hidden");
});

btnNext.addEventListener("click", () => {
  if (currentRound < ROUNDS.length - 1) {
    currentRound += 1;
    loadRound(currentRound);
  } else {
    showEndScreen();
  }
});

btnRestart.addEventListener("click", () => {
  currentRound = 0;
  score = 0;
  scoreText.textContent = "0";
  endCard.classList.add("hidden");
  gameCard.classList.remove("hidden");
  loadRound(0);
});

loadRound(0);
