const Quiz = require('./Quiz.js')

var QuizManager = function()
{
	
}

QuizManager.prototype.GetRandomQuiz = function()
{
	var quizLength = Object.keys(FireBaseManager.quizList).length
	var randomIndex = Math.floor((Math.random() * quizLength))

	return FireBaseManager.quizList["question_" + randomIndex]
}

module.exports = new QuizManager()