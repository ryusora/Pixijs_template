var StateQuiz = function()
{
    this.board = null
    // Init
	this.stage = new PIXI.Container()
	Application.Align(this.stage)

    
	// init background
	var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
	bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	bg.anchor.set(0.5, 0.5)

	this.board = new PIXI.Sprite(TextureManager.getTexture('rs_board'))
	this.board.position.set(Application.getScreenWidth()*0.5,Application.getScreenHeight()*0.5)
	this.board.anchor.set(0.5, 0.5)
    this.currentIndex = 0

    this.count = 0
    
    this.currentQuiz = QuizManager.GetQuiz(this.currentIndex)
    if(this.currentQuiz)
	    this.ProcessQuiz()

    this.chosenAnswer = -1
    this.checkmark = new PIXI.Sprite(TextureManager.getTexture('checkmark'))
    this.checkmark.position.set(0,0)
    this.checkmark.anchor.set(0.5, 0.5)

    var btnConfirm = new PIXI.Sprite(TextureManager.getTexture('BTN_OK'))
    btnConfirm.position.set(0, 500)
    btnConfirm.anchor.set(0.5, 0.5)
    btnConfirm.interactive = true
    btnConfirm.on('pointerdown', (()=>{
            Application.removeChild(this.stage)
            // check correct answer
            if(this.currentQuiz.correct_answer == this.chosenAnswer)
            {
                if(++this.count > 2)
                {
                    GameStates.stateInGame.Revive()
                    this.count = 0
                    return
                }
                this.currentIndex++
                if(this.currentIndex >= QuizManager.GetQuizCount()) this.currentIndex = 0

                this.Show(false)
            }
            else 
            {
                this.count = 0
                if(this.count >= 1)
                {
                    GameStates.stateInGame.Revive()
                }
                else
                {
                    StatesManager.ChangeState(GameStates.stateResult)
                }
            }
    }).bind(this))
    this.board.addChild(btnConfirm)
    // fade effect

    this.stage.addChild(bg)
	this.stage.addChild(this.board)
}

StateQuiz.prototype.Show = function(resetCount = true)
{
    if(resetCount == true) this.count = 0

    this.currentQuiz = QuizManager.GetQuiz(this.currentIndex)
    if(this.currentQuiz)
    {
        this.ProcessQuiz()
	    Application.addChild(this.stage)
        return true
    }
        
    return false
}

StateQuiz.prototype.ProcessQuiz = function()
{
    if(this.currentQuiz)
    {
        var questionStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 40,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#000000'], // gradient
            wordWrap: true,
            wordWrapWidth: 650,
            align:'center'
        })

        var answerStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 30,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#000000'], // gradient
            wordWrap: true,
            wordWrapWidth: 550
        })
        // init question
        if(this.question)
        {
            this.question.text = this.currentQuiz.title
        }
        else
        {
            this.question = new PIXI.Text(this.currentQuiz.title, questionStyle)
            this.board.addChild(this.question)
            var x = 0
            var y = Defines.QUIZ_OFFSET_Y
            this.question.position.set(x, y)
            this.question.anchor.set(0.5, 0)
            this.board.addChild(this.question)
        }

        // init answers
        if(this.answers) {
            this.board.removeChild(this.answers)
            this.answers = null
        }
        x = Defines.QUIZ_ANSWERS_OFFSET_X
        y = Defines.QUIZ_ANSWERS_OFFSET_Y
        this.answers = new PIXI.Container()
        this.answers.position.set(x, y)

        var length = this.currentQuiz.answers.length
        x = 0
        y = 0
        for(let i = 0; i < length; i++)
        {
            y += Defines.QUIZ_OFFSET_Y_SPACING
            var answer = new PIXI.Text(this.currentQuiz.answers[i], answerStyle)
            answer.position.set(x, y)
            answer.anchor.set(0, 0.5)
            this.answers.addChild(answer)

            var btnTick = new PIXI.Sprite(TextureManager.getTexture('square'))
            btnTick.position.set(x - 50, y)
            btnTick.anchor.set(0.5, 0.5)
            btnTick.interactive = true
            btnTick.on('pointerdown', ((i, x, y)=>{
                this.chosenAnswer = i
                this.checkmark.position.set(x - 50, y)
                this.answers.addChild(this.checkmark)
            }).bind(this, i, x, y))
            this.answers.addChild(btnTick)
        }

        this.board.addChild(this.answers)
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