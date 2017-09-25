const Quiz = require('./Quiz.js')
const MAX_QUIZ_PER_LEVEL = 5
var QuizManager = function()
{
	this.randomQuiz = []
	this.currentIndex = 0
}

QuizManager.prototype.ResetQuiz = function()
{
	this.randomQuiz = []
	this.currentIndex = 0
}

QuizManager.prototype.GetRandomQuiz = function(curLevel)
{
	var quizList = FireBaseManager.quizList
	if(quizList == null || typeof(quizList) == 'undefined') return null
	if(quizList[curLevel] == null || typeof(quizList[curLevel]) == 'undefined') return null

	var quizLength = Object.keys(quizList[curLevel]).length
	while(this.randomQuiz.length < MAX_QUIZ_PER_LEVEL)
	{
		var randomIndex = Math.floor((Math.random() * quizLength))
		if(this.randomQuiz.filter(idx => idx == randomIndex).length <= 0)
			this.randomQuiz.push(randomIndex)
	}

	if(this.currentIndex >= this.randomQuiz.length)
		this.currentIndex = 0

	return (quizList[curLevel])["question_" + this.randomQuiz[this.currentIndex++]]
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