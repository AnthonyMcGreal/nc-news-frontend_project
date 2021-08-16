
const wrongAnswers = [...document.querySelectorAll('#incorrectAnswer')];
const rightAnswer = document.querySelector('#correctAnswer');
const question = document.querySelector('#question');
const answers = document.querySelector('#answers');

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
    const selectedAnswer = event.target;
    
    selectedAnswer.innerHTML= "Correct!"
    changeQuestion(question,event)
}

function changeQuestion(question, event){
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