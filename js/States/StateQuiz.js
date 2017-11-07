var StateQuiz = function(forceLevel = null)
{
    this.board = null
    // Init
	this.stage = new PIXI.Container()
	Application.Align(this.stage)

    this.correctAction = null
    this.failAction = null

    this.IsOnScreen = false

	// init background
	var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
	bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	bg.anchor.set(0.5, 0.5)

	this.board = new PIXI.Container()
	this.board.position.set(Application.getScreenWidth()*0.5,Application.getScreenHeight()*0.5)
    

    this.chosenAnswer = -1
    this.checkmark = new PIXI.Sprite(TextureManager.getTexture('checkmark'))
    this.checkmark.position.set(0,0)
    this.checkmark.anchor.set(0.5, 0)

    this.btnConfirm = new PIXI.Sprite(TextureManager.getTexture('BTN_OK'))
    this.btnConfirm.position.set(0, 350)
    this.btnConfirm.anchor.set(0.5, 0.5)
    this.btnConfirm.interactive = true
    this.btnConfirm.on('pointerdown', (()=>{
            if(this.chosenAnswer < 0) return
            
            this.IsOnScreen = false
            Application.removeChild(this.stage)
            // check correct answer
            if(this.currentQuiz.AnswerId == this.currentQuiz.Answers[this.chosenAnswer].id)
            {
                if(this.correctAction != null)
                    this.correctAction()
                //GameStates.stateInGame.Revive()
            }
            else 
            {
                if(this.failAction != null)
                    this.failAction()
                //StatesManager.ChangeState(GameStates.stateResult)
            }
            this.chosenAnswer = -1
    }).bind(this))
    // fade effect
    
    // this.currentQuiz = QuizManager.GetRandomQuiz((forceLevel != null)?forceLevel:GameStates.GetLevel())
    // if(this.currentQuiz)
	//     this.ProcessQuiz()
        
    this.stage.addChild(bg)
	this.stage.addChild(this.board)
}

StateQuiz.prototype.ResetQuiz = function(curLevel)
{
    QuizManager.ResetQuiz(curLevel)
}

StateQuiz.prototype.Show = function(correctAction = null, failAction = null, curLevel = null)
{
    this.currentQuiz = QuizManager.GetRandomQuiz(curLevel)
    if(this.currentQuiz)
    {
        this.correctAction = correctAction
        this.failAction = failAction
        this.ProcessQuiz()
	    Application.addChild(this.stage)
        this.IsOnScreen = true
    }
    else
    {
        this.IsOnScreen = false
        if(failAction != null)
            failAction()
    }
}

StateQuiz.prototype.ProcessQuiz = function()
{
    if(this.currentQuiz)
    {
        var questionStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 35,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#000000'], // gradient
            wordWrap: true,
            wordWrapWidth: 610,
            //align:'center'
        })
        window.textStyle = questionStyle

        var answerStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 25,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#000000'], // gradient
            wordWrap: true,
            wordWrapWidth: 510
        })
        // init question
        if(this.question)
        {
            this.question.text = this.currentQuiz.Question
        }
        else
        {
            this.question = new PIXI.Text(this.currentQuiz.Question, questionStyle)
            this.question.position.set(0, Defines.QUIZ_OFFSET_Y)
            this.question.anchor.set(0.5, 0)
        }

        // init answers
        if(this.answers) {
            this.board.removeChild(this.answers)
            this.answers = null
        }
        var totalHeight = this.question.height + Defines.QUIZ_OFFSET_Y_SPACING
        this.answers = new PIXI.Container()

        var length = this.currentQuiz.Answers.length
        var x = 0
        var y = 0
        var offset = 0
        for(let i = 0; i < length; i++)
        {
            var answer = new PIXI.Text(this.currentQuiz.Answers[i].Answer, answerStyle)
            y += offset + (answer.height <= 40? Defines.QUIZ_OFFSET_Y_SPACING/2 : 0)
            answer.position.set(x, y)
            answer.anchor.set(0, answer.height <= 40?0.5:0)
            this.answers.addChild(answer)

            offset = Defines.QUIZ_OFFSET_Y_SPACING + answer.height
            totalHeight += offset

            var btnTick = new PIXI.Sprite(TextureManager.getTexture('square'))
            btnTick.position.set(x - 50, y)
            btnTick.anchor.set(0.5, answer.height <= 40?0.5:0)
            btnTick.interactive = true
            btnTick.on('pointerdown', ((i, x, y, anchorY)=>{
                this.chosenAnswer = i
                this.checkmark.position.set(x - 50, y)
                this.checkmark.anchor.set(0.5, anchorY)
                this.answers.addChild(this.checkmark)
            }).bind(this, i, x, y, btnTick.anchor.y))
            this.answers.addChild(btnTick)
        }
        this.board.removeChild(this.btnConfirm)
        // init board
        if(this.whiteBoard != null)
        {
            this.board.removeChild(this.whiteBoard)
            this.whiteBoard = null
        }
        this.whiteBoard = new PIXI.Graphics()
        this.whiteBoard.beginFill(0xFFFFFF)
        var quizHeight = totalHeight + 150
        this.whiteBoard.drawRect(-Defines.QUIZ_WIDTH/2, -quizHeight/2, Defines.QUIZ_WIDTH, quizHeight)

        var offsetHeight = totalHeight //(quizHeight > Defines.QUIZ_HEIGHT)?(quizHeight - Defines.QUIZ_HEIGHT):0
        this.btnConfirm.position.set(0, quizHeight/2)
        var question_y = Defines.QUIZ_OFFSET_Y_SPACING - quizHeight/2
        this.question.position.set(0, question_y)
        
        var x = Defines.QUIZ_ANSWERS_OFFSET_X
        var y = question_y + this.question.height + Defines.QUIZ_OFFSET_Y_SPACING
        this.answers.position.set(x, y)

        this.board.addChild(this.whiteBoard)
        this.board.addChild(this.question)
        this.board.addChild(this.answers)
        this.board.addChild(this.btnConfirm)
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