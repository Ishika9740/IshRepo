function handleFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Please select a file");

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    generateStudyMaterial(text);
  };

  if (file.type === "application/pdf") {
    alert("PDF support coming soon. Use a .txt file for now.");
  } else {
    reader.readAsText(file);
  }
}

function generateStudyMaterial(text) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const lines = text.split("\n").filter(line => line.trim() !== "");
  const flashcards = lines.map((line, i) => ({
    question: `What is the key idea in: "${line.slice(0, 50)}..."?`,
    answer: line
  }));

  const quiz = flashcards.map((card, i) => ({
    question: card.question,
    choices: [
      card.answer,
      "This is a wrong answer",
      "Not quite right",
      "Totally off"
    ].sort(() => Math.random() - 0.5),
    correct: card.answer
  }));

  output.innerHTML += `<h2>Flashcards</h2>`;
  flashcards.forEach(card => {
    output.innerHTML += `<div class="card"><strong>Q:</strong> ${card.question}<br/><strong>A:</strong> ${card.answer}</div>`;
  });

  output.innerHTML += `<h2>Quiz</h2>`;
  quiz.forEach(q => {
    output.innerHTML += `<div class="card"><strong>${q.question}</strong><ul>` +
      q.choices.map(choice => `<li>${choice}</li>`).join("") +
      `</ul></div>`;
  });
}
