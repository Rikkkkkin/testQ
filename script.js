document.getElementById('questionnaire').addEventListener('submit', function(event) {
  event.preventDefault();

  let score = 0;
  const totalQuestions = 20;

  const answers = {
    q1: 'c',  // Paris
    q2: 'b',  // Mars
    q3: 'a',  // William Shakespeare
    q4: 'd',  // Pacific Ocean
    q5: 'b',  // Oxygen
    q6: 'b',  // Africa
    q7: 'c',  // 2
    q8: 'b',  // Leonardo da Vinci
    q9: 'c',  // Diamond
    q10: 'b', // Nitrogen
    q11: 'b', // Japan
    q12: 'b', // H2O
    q13: 'c', // Charles Babbage
    q14: 'c', // Heart
    q15: 'a', // 1912
    q16: 'c', // Photosynthesis
    q17: 'b', // Albert Einstein
    q18: 'c', // Jupiter
    q19: 'b', // Brazil
    q20: 'c', // Pound Sterling
  };

  const userAnswers = {};
  let allAnswered = true;

  // Remove previous highlights
  const questionDivs = document.querySelectorAll('.question');
  questionDivs.forEach(questionDiv => {
    questionDiv.classList.remove('unanswered');
  });

  // Check for unanswered questions and highlight them
  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = `q${i}`;
    const answer = document.querySelector(`input[name="${questionName}"]:checked`);
    if (answer) {
      userAnswers[questionName] = answer.value;
    } else {
      allAnswered = false;
      // Highlight the unanswered question
      const questionDiv = document.querySelector(`#question-${i}`);
      if (questionDiv) {
        questionDiv.classList.add('unanswered');
      }
    }
  }

  if (!allAnswered) {
    alert('Please answer all unanswered questions highlighted in red.');
    // Scroll to the first unanswered question
    const firstUnanswered = document.querySelector('.unanswered');
    if (firstUnanswered) {
      firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Calculate the score
  for (let question in answers) {
    if (userAnswers[question] === answers[question]) {
      score++;
    }
  }

  document.getElementById('result').innerText = `You scored ${score} out of ${totalQuestions}.`;
});

// Function to update the progress bar
function updateProgressBar() {
  const totalQuestions = 20;
  let answeredCount = 0;

  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = `q${i}`;
    const answer = document.querySelector(`input[name="${questionName}"]:checked`);
    if (answer) {
      answeredCount++;
    }
  }

  const progressPercent = ((answeredCount / totalQuestions) * 100).toFixed(0);
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${progressPercent}%`;
  progressBar.setAttribute('data-percentage', progressPercent);
}

// Add event listeners to all radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radio) => {
  radio.addEventListener('change', function() {
    updateProgressBar();
    // Remove highlight if the question is answered
    const questionDiv = this.closest('.question');
    if (questionDiv.classList.contains('unanswered')) {
      questionDiv.classList.remove('unanswered');
    }
  });
});

// Initialize progress bar on page load
window.addEventListener('load', updateProgressBar);
