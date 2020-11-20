'use strict';

//Global Variables
const questionNum = 0;

const score = 0;

const userAnswer = "";
//adds question HTML to the .quiz-page section
function renderQuestion(){
    const question = getQuestion(questionNum);
    $('.quiz-page').html(question);
}
//Returns the HTML to be added to the question page
function getQuestion(quizNum){
    return ` <div class="top-section" role="question-info">
                <div class="question-num">
                    Question ${quizNum+1}/5
                </div>
                <div class="quiz-score">
                    Score ${score}
                </div>
            </div>

            <div class="question">
                ${QUIZDATA[quizNum].question}
            </div>
            <form action="" class="quiz-question">
                <fieldset>
                    <label for="option-a" class="options-list-item" id="a">
                    <input type="radio" name="answer-option" id="option-a" value="${QUIZDATA[quizNum].options[0]}" required>
                    <span class="option-text">${QUIZDATA[quizNum].options[0]}</span>
                    </label>
                    <label for="option-b" class="options-list-item" id="b">
                    <input type="radio" name="answer-option" id="option-b" value="${QUIZDATA[quizNum].options[1]}" required>
                    <span class="option-text">${QUIZDATA[quizNum].options[1]}</span>
                    </label>
                    <label for="option-c" class="options-list-item" id="c">
                    <input type="radio" name="answer-option" id="option-c" value="${QUIZDATA[quizNum].options[2]}" required>
                    <span class="option-text">${QUIZDATA[quizNum].options[2]}</span>
                    </label>
                    <label for="option-d" class="options-list-item" id="d">
                    <input type="radio" name="answer-option" id="option-d" value="${QUIZDATA[quizNum].options[3]}" required>
                    <span class="option-text">${QUIZDATA[quizNum].options[3]}</span>
                    </label>
                    <button type="submit" class="submit-answer app-buttons">Submit Answer</button>
                    <div class="no-selection-error">
                    Error: Please make one selection to proceed to the next question
                    </div>
                </fieldset>
            </form>`;

}



//This function handles the button click on Let's Start 

function handleBeginning(){

    $('.start-quiz-button').on("click", function(event){
        
        //stop page from submitting and refreshing automatically
        event.preventDefault();
        
        //hide the current page and then call the renderQuestion to 
        //make the page ready for the question to be asked
        //and fadeIn the question. 
        $('.intro-screen').fadeOut(200);
        renderQuestion();
        $('.quiz-page').delay(200).fadeIn(200);
    });

}

//This function toggles the style for the selected input radio button.
//changes the background of the label element so the user is aware
//of what his/her selection is
function handleUserAnswerSelection(){
    
    $('.quiz-page').on("click", "label", function(event){
        if($(this).find('input[type="radio"]').is(':checked')){
            $('.quiz-page label').removeClass('options-list-item-selected');
            $(this).addClass('options-list-item-selected');

            //Sets the the selected answer value as per the users selection
            userAnswer = $(this).find('.option-text').text();
        }
    });
}

//returns HTML text to include on the answer page
function getAnswerText(classTxt){
    return `<h1 class="answer-heading ${classTxt}-answer">
                ${classTxt}
            </h1>
            <div class="answer">
                    ${QUIZDATA[questionNum].answertext}
            </div>
            <button class="next-question app-buttons">Continue</button>`;
}

//This function renders the page depending if the answer is 
//correct or incorrect 
function renderAnswerPage(correct){
    let answerClassName = "⭐ correct";
    if(correct){
        $('.quiz-answer').removeClass("incorrect");
        $('.quiz-answer').addClass(answerClassName);
    }else{
        answerClassName = "❌ incorrect";
        $('.quiz-answer').removeClass("correct");
        $('.quiz-answer').addClass(answerClassName);
    }
    const answerPageText = getAnswerText(answerClassName);

    //this will add a correct / incorrect class to get the border for the correct color.
    $('.quiz-answer').html(answerPageText);
    
}

//This function handles the button click on Submit Answer 
function handlesSubmitAnswer(){

    $('.quiz-page').on("submit", "form",function(event){
        
        event.preventDefault();
        let correct = true; 
        $('.quiz-page').fadeOut(200);

        //if the answer is correct increment score
        if(userAnswer === QUIZDATA[questionNum].answer)
        {
            score++;
        }else{
            correct = false;
        }

        // render
        renderAnswerPage(correct);
        $('.quiz-answer').delay(200).fadeIn(200);

    });

}

//Returns the User a Text based on thier performance with the quiz
function resultBasedText(){
    if(score === 0)
        return `thats really your Answer?`;
    
    if(score >= 1 && score <= 2)
        return `You can definitely do better <br>
        Why not give it another try?`;

    if(score >=2 && score <=3)
    `Not bad but..<br>
    Do better!!<br>
    Try again?`;

    if(score >= 3 && score <=4)
        return `Almost... <br>
        Try again?`;;
    
    if(score === 5)
        return `You Win!!<br>
        5 out of 5 Wow!. <br>
        Try again?`;
}

//setting text for the result page with user score
function getResultText(){
    return `<h1 class="result-heading">You Scored</h1>
                
    </div>
    <div class="overall-score">
        
        <div class="score-square">
            <p class="score">${score}</p>
            <p class="total-score">5</p>
        </div>
    </div>
    <div class="retake-text">
        ${resultBasedText()}
    </div>
    <button class="retake app-buttons">Retake Quiz</button>`;
}
// add html to result page

function renderQuizResult(){
    const resulText = getResultText();
    $('.quiz-result').html(resulText);
}


//if quiz is completed will take the user to the result screen
function handleNextQuestion(){

    $('.quiz-answer').on("click", ".next-question", function(event){ 
        questionNum++;
        event.preventDefault();
        $('.quiz-answer').fadeOut(200);
        if(questionNum <= 4){
            renderQuestion();
            $('.quiz-page').delay(200).fadeIn(200);
        }else{
            renderQuizResult();
            $('.quiz-result').delay(200).fadeIn(200);
        } 
    });

}
// Function handles click on retake quiz button on result page
// User chooses to retake they will be taken back to intro(beginning)

function handleRetakeQuiz(){

    $('.quiz-result').on("click", ".retake", function(event){

        event.preventDefault();
        $('.quiz-result').fadeOut(200);

        // default global values
        questionNum = 0;
        score = 0;
        userAnswer = "";

        //back to intro screen
        $('.intro-screen').delay(200).fadeIn(200);

    });
}


//The handleApplication will all the funnctions for handling the user clicks

function handleApplication(){

    handleBeginning();
    handleUserAnswerSelection();
    handlesSubmitAnswer();
    handleNextQuestion();
    handleRetakeQuiz();
        
}

$(handleApplication);