function jqueryGame(){
//    variables
    let time = 0;
    const startTime = (20*questions.length);
    const minusTime = 10;
    let quizQuestion = 0;
    let timerEl = document.getElementById("timer")
    // Start game
    function startButton() {
        document.getElementById("start-game-btn").addEventListener("click", function(){
            document.getElementById("div-content").innerHTML = "";
            quizQuestion = 0;
            renderQuestion();
            timer();
        });
        document.getElementById("highscore-btn").addEventListener("click", function(){
            handleHighscore();
        });
    }
    startButton();
    // Start timer countdown
    function timer() {
        time = startTime;
        gameInterval = setInterval(function(){
            time = time - 1;
            timerEl.innerHTML = time;
            if (time <= 0){
                // end interval
                clearInterval(gameInterval);
                timerEl.innerHTML = "00";
                finalEndGame();
            }
        }, 1000);
    }
    let mainContentEl = document.getElementById("div-content");   
    function createRow(rowTotal, content) {
        for (let i = 0; i < rowTotal; i++){
            const rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row");            
            const colEl = document.createElement("div");
            colEl.setAttribute("class", "col");
            colEl.append(content);
            rowEl.append(colEl);
            mainContentEl.append(rowEl);
        }
    }
    //    show questions
    function renderQuestion() {
        // Used to clear start button at beginning and clear previous question;
        mainContentEl.innerHTML = "";
        const questionEl = document.createElement("h3");
        questionEl.innerHTML = questions[quizQuestion].title;
        createRow(1, questionEl);
        let finalAnswer = "";
        
        // A loop to add a button for every question
        for(let i=0; i < questions[quizQuestion].choices.length; i++){
            finalAnswer = document.createElement("button");
            finalAnswer.setAttribute("class", "btn question-btn m-1");
            finalAnswer.innerHTML = questions[quizQuestion].choices[i];
            createRow(1, finalAnswer)

            finalAnswer.addEventListener("click", function(){
                questions[quizQuestion].userAnswer = questions[quizQuestion].choices[i];
                verifyAnswer();
                switchQuestion();
            })
        }
    }
    //  check if the chosen answer is correct
    function verifyAnswer () {

        if (questions[quizQuestion].answer === questions[quizQuestion].userAnswer)
        {
            questions[quizQuestion].outcome = true;
            questions[quizQuestion].time = time;
            // Displays outcome of the user answering the question, when the user is correct
            document.getElementById("displayResult").innerHTML = "Correct!";
            setTimeout(function(){
                document.getElementById("displayResult").innerHTML = "";
            }, 1500);
            
        } else {
            penaltyTime()
            questions[quizQuestion].outcome = false;
            // Displays outcome of the user answering the question, when the user is wrong
            document.getElementById("displayResult").innerHTML = "Wrong!";
            setTimeout(function(){
                document.getElementById("displayResult").innerHTML = "";
            }, 1500);
            
        }
    }
    
    // Subtracting Time
    function penaltyTime() {
            // Subtracts
            time = time - minusTime;
    }
    
    function switchQuestion() {
        if(quizQuestion <= (questions.length-2)){
            quizQuestion = quizQuestion + 1;
            renderQuestion();
        } else {
            time=0;
        }   
    }
    
    // Final score
    function finalQuizScore() {
        let finalQuizScore = 0;
        for(let i = 0; i < questions.length; i++){
            if(questions[i].outcome){
                finalQuizScore = finalQuizScore + questions[i].time;
            }
            else {
    
            }
        }
        return finalQuizScore; 
    }
    // HighScore and Initials
    function finalEndGame() {
        
        mainContentEl.innerHTML = "";
        // display game is over
        const finalEndGameMsg = document.createElement('div');
        finalEndGameMsg.setAttribute('class', 'display-3');
        finalEndGameMsg.innerText = "Game Over!";
        // element for score
        const finalScoreMessage = document.createElement('h4');
        finalScoreMessage.innerHTML = "Your Final Score was: "+ finalQuizScore();
        finalEndGameMsg.append(finalScoreMessage);
        // Asked to input initials
        const askInputInitials = document.createElement('div');
        askInputInitials.setAttribute('class', 'user-input');
        askInputInitials.innerHTML = "Enter your intials: <input type='text' id='initial-input'></input>"
        finalEndGameMsg.append(askInputInitials);
        // button for adding the high score and intials
        const submitHighscoreEl = document.createElement('button');
        submitHighscoreEl.setAttribute('class','btn btn-custom');
        submitHighscoreEl.setAttribute('id', 'submit-btn');
        submitHighscoreEl.innerText = "Submit Highscore";
        finalEndGameMsg.append(submitHighscoreEl);
        // display all of the elements 
        createRow(1, finalEndGameMsg);
        submitHighscoreEl.addEventListener("click", function(){
            // local storage from activity week-4
            let highscores = [];
            if(localStorage.getItem('localHighscores')){
                highscores = localStorage.getItem('localHighscores');
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
                highscores = JSON.parse(highscores);
            }   else{
                highscores = [];
            }
            const userInitial = document.getElementById('initial-input').value;
            const userScore = finalQuizScore();
            highscores[(highscores.length)] = {
                initial: userInitial,
                score: userScore
            }
            // Sorts highscores based on the best score in the array. 
            highscores.sort(function(a, b) {
                return b.score - a.score;
            })
            //JSON.stringify
            window.localStorage.setItem('localHighscores', JSON.stringify(highscores));
            handleHighscore(highscores);
        });
    }
    // Restart and erase highscores
    // Highscore Section
    function handleHighscore(highscores) {
        if(localStorage.getItem('localHighscores')){
            highscores = localStorage.getItem('localHighscores');
            highscores = JSON.parse(highscores);
        }   else{
            highscores = [];
        }
        // Clears all highscores
        document.body.innerHTML = "";
        // Display all the highscores
        const displayAllHighscore = document.createElement('div');
        displayAllHighscore.setAttribute('class','container');
        // Title for highscore page
        const highscorePageEl = document.createElement('div');
        highscorePageEl.setAttribute('class', 'display-2 text-center mb-3')
        highscorePageEl.innerHTML = "Highscores";
        displayAllHighscore.append(highscorePageEl);
        // Appends highscores to the container.
        for (let i=0; i < highscores.length; i++){
            let highscoreDisplayPage = document.createElement('div');
            highscoreDisplayPage.setAttribute('class','m-1 bg-secondary text-white p-1')
            highscoreDisplayPage.innerText = (i+1)+". "+highscores[i].initial+" - "+highscores[i].score;
            displayAllHighscore.append(highscoreDisplayPage);
        }
        //Restart button
        restartBtnEl = document.createElement('button');
        restartBtnEl.setAttribute('class', 'btn btn-custom m-1');
        restartBtnEl.innerText = 'Restart Quiz';
        displayAllHighscore.append(restartBtnEl);
        restartBtnEl.addEventListener('click', function(){
            document.location.reload()
        });
        //Clear highscores button
        clearScoresBtnEl = document.createElement('button');
        clearScoresBtnEl.setAttribute('class', 'btn btn-quit m-1');
        clearScoresBtnEl.innerText = 'Clear Highscores';
        displayAllHighscore.append(clearScoresBtnEl);
        clearScoresBtnEl.addEventListener('click', function(){
            window.localStorage.removeItem('localHighscores');
            handleHighscore();
        });
        document.body.append(displayAllHighscore);
    }
}
jqueryGame();