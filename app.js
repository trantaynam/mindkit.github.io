const questions = [
  "Ít hứng thú hoặc vui vẻ trong việc thực hiện các công việc.",
  "Cảm thấy buồn bã, trầm cảm hoặc tuyệt vọng.",
  "Khó ngủ, ngủ chập chờn hoặc ngủ quá nhiều.",
  "Cảm thấy mệt mỏi hoặc thiếu năng lượng.",
  "Ăn không ngon miệng hoặc ăn quá nhiều."
];

const options = [
  { text: "Không bao giờ", score: 0 },
  { text: "Vài ngày", score: 1 },
  { text: "Hơn một nửa số ngày", score: 2 },
  { text: "Gần như mỗi ngày", score: 3 }
];

let currentQuestion = 0;
let totalScore = 0;

function loadQuestion() {
  const qText = document.getElementById("question-text");
  const oContainer = document.getElementById("options-container");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");

  qText.textContent = `${currentQuestion + 1}. ${questions[currentQuestion]}`;
  oContainer.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.className =
      "option-card w-full text-left p-4 rounded-xl border transition";
    btn.onclick = () => selectOption(opt.score);
    oContainer.appendChild(btn);
  });

  const percent = Math.round((currentQuestion / questions.length) * 100);
  progressText.textContent = percent + "%";
  progressBar.style.width = percent + "%";
}

function selectOption(score) {
  totalScore += score;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  let category = "";
  let advice = "";

  if (totalScore <= 4) {
    category = "Bình thường";
    advice = "Bạn đang kiểm soát tốt tâm trạng.";
  } else if (totalScore <= 9) {
    category = "Căng thẳng nhẹ";
    advice = "Nên nghỉ ngơi, vận động nhẹ, và chia sẻ với người tin cậy.";
  } else {
    category = "Nguy cơ cao";
    advice = "Khuyến nghị bạn tìm gặp chuyên gia tâm lý.";
  }

  document.getElementById("score-display").textContent = totalScore;
  document.getElementById("category-text").textContent = category;
  document.getElementById("advice-text").textContent = advice;
}

loadQuestion();
