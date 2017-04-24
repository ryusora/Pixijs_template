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

    this.currentQuiz = QuizManager.GetRandomQuiz()
    this.title = new PIXI.Text("hello");
    this.state.addChild(this.title);
}

StateQuiz.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateQuiz.prototype.Update = function(dt)
{
}

module.exports = StateQuiz