const Quiz = require('./Quiz.js')

var QuizManager = function()
{
	
}

QuizManager.prototype.GetRandomQuiz = function()
{
	if(FireBaseManager.quizList == null || typeof(FireBaseManager.quizList) == 'undefined') return null

	var quizLength = Object.keys(FireBaseManager.quizList).length
	var randomIndex = Math.floor((Math.random() * quizLength))

	return FireBaseManager.quizList["question_" + randomIndex]
}

QuizManager.prototype.GetQuizCount = function()
{
	return (FireBaseManager.IsInitialized())?Object.keys(FireBaseManager.quizList).length:-1
}

QuizManager.prototype.GetQuiz = function(idx)
{
	if(FireBaseManager.quizList == null || typeof(FireBaseManager.quizList == 'undefined')) return null
	return FireBaseManager.quizList["question_" + idx]
}

module.exports = new QuizManager()