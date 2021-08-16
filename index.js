
const wrongAnswers = [...document.querySelectorAll('#incorrectAnswer')];
const rightAnswer = document.querySelector('#correctAnswer');
const question = document.querySelector('#question');
const answers = document.querySelector('#answers');
let questionsCounter = 0;
let scoreCounter = 0;

wrongAnswers.forEach((button) =>{
    button.addEventListener('click', clickedWrongAnswer);
})
rightAnswer.addEventListener('click', clickedRightAnswer);

function clickedWrongAnswer(event){
    console.log(event)
    const selectedAnswer= event.target;
    selectedAnswer.innerHTML = "Wrong!"
    changeQuestion(question,event)
}

function clickedRightAnswer(event){
    scoreCounter+=1
    console.log(scoreCounter)
    const selectedAnswer = event.target;
    selectedAnswer.innerHTML= "Correct!"
    changeQuestion(question,event)
}

function changeQuestion(question, event){
    if(questionsCounter == 6){
        question.innerHTML = "Quiz Completed"
        answers.remove();
    }
    question.innerHTML = question2.question;
    const answer4 = document.getElementById("correctAnswer")
    answer4.remove();
    const answer = document.getElementById("incorrectAnswer")
    answer.remove();
    const answer2 = document.getElementById("incorrectAnswer")
    answer2.remove();
    const answer3 = document.getElementById("incorrectAnswer")
    answer3.remove();


    for(let i = 1; i<5; i++){
        const answer = document.createElement('button');
        let ids = 'id'+i
        let answerSearch = 'answer'+i
        console.log(answerSearch)
        answer.id=question2[ids],
        answer.innerHTML=question2[answerSearch],
        console.log(answer)
        answers.appendChild(answer)
    }

    }
    //create element
    //add data to element
    //insert into page

// event.target.id = question2.id1;
// event.target.innerHTML = question2.answer1;


//QUESTIONS
const question2 = {
    question:'What is the main Heading tag',
    id1:"incorrectAnswer",
    answer1:'h3',
    id2:"incorrectAnswer",
    answer2:'h4',
    id3:"incorrectAnswer",
    answer3:'h2',
    id4:"correctAnswer",
    answer4:'h1'
}

const question3 = {
    question:'What is the tag for italics?',
    id1:"correctAnswer",
    answer1:'<em>',
    id2:"incorrectAnswer",
    answer2:'<strong>',
    id3:"incorrectAnswer",
    answer3:'<footer>',
    id4:"incorrectAnswer",
    answer4:'<br>'
}

const question4 = {
    question:'How many h1 tags should you have?',
    id1:"incorrectAnswer",
    answer1:'3',
    id2:"incorrectAnswer",
    answer2:'6',
    id3:"correctAnswer",
    answer3:'1',
    id4:"incorrectAnswer",
    answer4:'0'
}

const question5 = {
    question:'How good is Northcoders?',
    id1:"incorrectAnswer",
    answer1:'good',
    id2:"correctAnswer",
    answer2:'excellent!',
    id3:"incorrectAnswer",
    answer3:'very good',
    id4:"incorrectAnswer",
    answer4:'very very good'
}