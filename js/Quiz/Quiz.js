var Quiz = function()
{
	this.question 	= ""
	this.answers 	= []
}

Quiz.prototype.SetQuestion = function(question, answers)
{
	this.question 	= question
	this.answers 	= answers
}

module.exports = Quiz