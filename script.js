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

  for (let question in answers) {
    const answer = document.querySelector(`input[name="${question}"]:checked`);
    if (answer) {
      userAnswers[question] = answer.value;
    } else {
      allAnswered = false;
      break;
    }
  }

  if (!allAnswered) {
    alert('Please answer all questions.');
    return;
  }

  for (let question in answers) {
    if (userAnswers[question] === answers[question]) {
      score++;
    }
  }

  document.getElementById('result').innerText = `You scored ${score} out of ${totalQuestions}.`;
});

// New code to handle progress bar updates
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
  radio.addEventListener('change', updateProgressBar);
});

// Initialize progress bar on page load
window.addEventListener('load', updateProgressBar);
