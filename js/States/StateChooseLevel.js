var StateChooseLevel = function()
{
	this.isLoadingDone = false
	this.currentLevelName = "HoHap"
	this.levels = []
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
	var title = new PIXI.Text("Chọn Màn Chơi", defaultStyle)
	title.anchor.set(0.5, 0.5)
	title.position.set(Application.getScreenWidth()*0.5, 100)

	var btnPlay = new PIXI.Sprite(TextureManager.getTexture('BTN_PLAY'))
	btnPlay.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnPlay.anchor.set(0.5, 0.5)
	btnPlay.interactive = true
	btnPlay.on('pointerdown', ()=>{
		StatesManager.ChangeState(GameStates.stateLoading)
	})

	this.stage.addChild(bg)
	this.stage.addChild(title)
	this.stage.addChild(btnPlay)
}

StateChooseLevel.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateChooseLevel.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateChooseLevel.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
	}
}

module.exports = StateChooseLevel