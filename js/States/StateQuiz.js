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

	var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
	bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	bg.anchor.set(0.5, 0.5)

	var defaultStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 50,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ff0000'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 750
    })

    this.currentQuiz = QuizManager.GetRandomQuiz()
    this.title = new PIXI.Text("QUIZ", defaultStyle);
	this.title.position.set(Application.getScreenWidth()*0.5, 100)
	this.title.anchor.set(0.5, 0.5)
	this.stage.addChild(bg)
    this.stage.addChild(this.title)

	this.InitQuiz()
}

StateQuiz.prototype.InitQuiz = function()
{
    var questionStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ff0000'], // gradient
        //stroke: '#4a1850',
        //strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 750
    })

    var answerStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff'], // gradient
        //stroke: '#4a1850',
        //strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 750
    })

	// init question
    var question = new PIXI.Text(this.currentQuiz.title, questionStyle)
    console.log(this.currentQuiz)
    var x = Application.getScreenWidth()*0.5
    var y = Defines.QUIZ_OFFSET_Y
    question.position.set(x, y)
    question.anchor.set(0.5, 0.5)
    this.stage.addChild(question)

    // init answers
    var length = this.currentQuiz.answers.length
    for(let i = 0; i < length; i++)
    {
        var answer = new PIXI.Text(this.currentQuiz.answers[i], answerStyle)
        y += Defines.QUIZ_OFFSET_Y_SPACING
        answer.position.set(x, y)
        answer.anchor.set(0.5, 0.5)
        this.stage.addChild(answer)
    }
}

StateQuiz.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateQuiz.prototype.Update = function(dt)
{
}

module.exports = StateQuiz