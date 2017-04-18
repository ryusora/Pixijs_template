const QuizManager = require('../Quiz/QuizManager.js')
var StateQuiz = function()
{
    
}

StateQuiz.prototype.Init = function()
{
	// Init
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)

    var quiz = QuizManager.GetRandomQuiz()
    console.log(quiz)
}

StateQuiz.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateQuiz.prototype.Update = function(dt)
{
}

module.exports = StateQuiz