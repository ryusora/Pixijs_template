const Quiz = require('./Quiz.js')

var QuizManager = function()
{
	
}

QuizManager.prototype.GetRandomQuiz = function(curLevel)
{
	var quizList = FireBaseManager.quizList
	if(quizList == null || typeof(quizList) == 'undefined') return null
	if(quizList[curLevel] == null || typeof(quizList[curLevel]) == 'undefined') return null

	var quizLength = Object.keys(quizList[curLevel]).length
	var randomIndex = Math.floor((Math.random() * quizLength))

	return (quizList[curLevel])["question_" + randomIndex]
}

QuizManager.prototype.GetQuizCount = function(curLevel)
{
	return (FireBaseManager.IsInitialized())?Object.keys(FireBaseManager.quizList[curLevel]).length:-1
}

QuizManager.prototype.GetQuiz = function(idx)
{
	if(FireBaseManager.quizList == null || typeof(FireBaseManager.quizList == 'undefined')) return null
	return FireBaseManager.quizList["question_" + idx]
}

module.exports = new QuizManager()