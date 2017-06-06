var StateChooseLevel = function()
{
	this.isLoadingDone = false
	this.currentLevelName = "HoHap"
	this.levels = []
	this.chosenLevel = null
}

StateChooseLevel.prototype.Init = function()
{
	// Init
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)

	// init background
	var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
	bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	bg.anchor.set(0.5, 0.5)

	var header = new PIXI.Sprite(TextureManager.getTexture('HEADER_LOGO'))
	header.position.set(Application.getScreenWidth()*0.5, 10)
	header.anchor.set(0.5, 0)

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
	var title = new PIXI.Sprite(TextureManager.getTexture('cl_title'))//new PIXI.Text("Chọn Màn Chơi", defaultStyle)
	title.anchor.set(0.15, 0.5)
	title.position.set(0, 300)

	var character = new PIXI.Sprite(TextureManager.getTexture('cl_characters'))
	character.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	character.anchor.set(0.5, 0.5)

	this.chosenLevel = new PIXI.Sprite(TextureManager.getTexture('ho_hap_highlight'))
	this.chosenLevel.position.set(Application.getScreenWidth()*0.5 + 100, Application.getScreenHeight()*0.5 + 60)
	this.chosenLevel.anchor.set(0.5, 0.5)

	var btnPlay = new PIXI.Sprite(TextureManager.getTexture('cl_ready_btn'))
	btnPlay.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnPlay.anchor.set(0.5, 0.5)
	btnPlay.interactive = true
	btnPlay.on('pointerdown', ()=>{
		StatesManager.ChangeState(GameStates.stateLoading)
	})

	var btnBack = new PIXI.Sprite(TextureManager.getTexture('cl_back_btn'))
	btnBack.position.set(Defines.CL_BACK_BTN_OFFSET_X, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnBack.anchor.set(0.5, 0.5)
	btnBack.interactive = true
	btnBack.on('pointerdown', ()=>{
		StatesManager.ChangeState(GameStates.stateChooseCharacter)
	})

	this.stage.addChild(bg)
	this.stage.addChild(header)
	this.stage.addChild(title)
	this.stage.addChild(character)
	this.stage.addChild(this.chosenLevel)
	this.stage.addChild(btnPlay)
	this.stage.addChild(btnBack)
}

StateChooseLevel.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateChooseLevel.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}
var ticker = 0
var sub = 1
StateChooseLevel.prototype.Update = function(dt)
{
	//if(this.isLoadingDone)
	{
		// update chosen level
		if(ticker > 0.5 || ticker < 0)
		{
			sub*=-1
		}
		ticker+=0.02*sub
		this.chosenLevel.scale.set(1 + ticker, 1 + ticker)
	}
}

module.exports = StateChooseLevel