'use strict';
const STORE = {
  questions: [
    {
      question: 'How old was Jimi Hendrix when he died?',
      answers: [
          '23',
          '24',
        '28',
        '27'
      ],
      answer: '27'
    },
  
    {
      question: 'How old was Kurt Cobain when he died?',
      answers: [
          '21',
          '30',
          '27',
          '24'
      ],
      answer: '27'
    },
    
    {
      question: 'How old was Janis Joplin when she died?',
      answers: [
          '25',
          '27',
          '26',
           '24'
      ],
      answer: '27'
    },
    
    {
      question: 'How old was Amy Whinehouse when she died?',
      answers: [
      '31',
      '30',
      '27',
      '24'
      ],
      answer: '27'
    },
    
    {
      question: 'How old was Jim Morrison when he died?',
      answers: [
          '31',
          '30',
          '27',
          '24'
      ],
      answer: '27'
    }
  ],
  quizStarted: false,
  correctAnswer: 0,
  score: 0
}
// Generates HTML for the start screen
function generateStartScreen(){
    return `<div class="start-screen">
    <p>This quiz will test your Celebrity knowledge</p>
    <button type="button" id="start">Start Quiz</button>
    </div>
    `;
}
// Generates HTML for the section of the app that displays number/score
function generateQuestionScoreNumber() {
    return `
    <ul class="questions-and-score">
    <li id="question-number">
    Question Number: ${STORE.correctAnswer + 1}/${STORE.questions.length}
    </li>
  </ul>
  `;
}

// Generates the list of possible answers for one question
function generateAnswers() {
    const answerArray = STORE.questions[STORE.correctAnswer].answers
    let answersHTML = '';
    let i = 0;

    answerArray.forEach(answer => {
        answersHTML += `
        <div id="option-container-${i}"
        <input type="radio" name="options" id="option${i + 1}" value=
        ${answers}" tabIndex="${i + 1}" required>
        </div>
        `;
        i++;
    });
    return answersHTML;
}

// Generates the HTML to display one question

function generateQuestions() {
    let correctAnswer = STORE.questions[STORE.correctAnswer];
    return `
    <form id="question-form" class="question-form">
    <fieldset>
    <div class="question">
    <legend> ${correctAnswer.question}</legend>
    </div>
    <div class="options">
    <div class="answers">
    ${generateAnswers()}
    </div>
 </div>
 <button type="submit: id="submit-answer-btn" tabindex="5">Submit</button>
 <button type="button: id="next-question=btn" tabindex="6">Next &gt;></button>
 </fieldset>
 </form>
    `;
}

// Generate the Results HTML
function generateResults() {
    return `
    <div class="results">
    <form id="restart-quiz">
    <fieldset>
    <div class="row">
    <div class="col-12">
      <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <button type="button" id="restart"> Restart Quiz </button>
    </div>
  </div>
</fieldset>
</form>
</div>
`;
}


// generates if user was correct or incorrect
function getResults(answerResult) {
    let correctAnswer = STORE.questions[STORE.correctAnswer].answer;
    let result = '';
    if (answerStatus === 'correct') {
        result = `
        <div class="right-answer">That is correct!</div>
        `;
      }
      else if (answerStatus === 'incorrect') {
        result = `
          <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
        `;
      }
      return result;
    }

// render function

function render() {
    let result = '';

    if (STORE.quizStarted === false) {
        $('main').html(generateStartScreen());
        return;
    }
    else if (STORE.correctAnswer >= 0 && STORE.correctAnswer < STORE.questions.length) {
        result = generateQuestionScoreNumber();
        result += generateQuestions();
        $('main').html(result);
    }
    else {
        $('main').html(generateResults());
    }
}


// event handler functions
// handles click start button
function handleStartQuiz() {
    $('main').on('click', '#start', function(event) {
        STORE.quizStarted = true;
        render();
    });
}

// handles the next button
function handleNextQuestion() {
    $('body').on('click', '#next-question-btn', (event) => {
        render();
    });
}

// handles the submission of question 
function handleQuestionSubmission() {
    $('body').on('submit', '#question-form', function (event) {
        event.preventDefault();
        const correctAnswer = STORE.questions[STORE.correctAnswer];
        let selectedOption = $('input[name=options]:checked').val();
        let optionContainerId = `#option-container-${correctAnswer.answers.findIndex(i => i === selectedOption)}`;
        if (selectedOption === STORE.correctAnswer) {
            STORE.score++;
            $(optionContainerId).append(generateFeedbackHTML('correct'));
          }
          else {
            $(optionContainerId).append(generateFeedbackHTML('incorrect'));
          }
          STORE.correctAnswer++;
          // hide the submit button
          $('#submit-answer-btn').hide();
          // disable all inputs
          $('input[type=radio]').each(() => {
            $('input[type=radio]').attr('disabled', true);
          });
          // show the next button
          $('#next-question-btn').show();
      
        });
    }

// reset all values
function restartQuiz() {
    STORE.quizStarted = false;
    STORE.currentQuestion = 0;
    STORE.score = 0;
  }
  function handleRestartClick() {
    $('body').on('click', '#restart', () => {
      restartQuiz();
      render();
    });
  }
  function handleQuizApp() {
    render();
    handleStartQuiz();
    handleNextQuestion();
    handleQuestionSubmission();
    handleRestartClick();
  }
  
  $(handleQuizApp);