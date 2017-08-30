var StateTutorial = function()
{
	this.isLoadingDone = false
}

StateTutorial.prototype.Init = function()
{
	// Init
	if(!this.isLoadingDone)
	{
		this.stage = new PIXI.Container()
		
		// init tutorial
		var screen = new PIXI.Sprite(TextureManager.getTexture('TUTORIAL'))
		screen.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
		screen.anchor.set(0.5, 0.5)
		var btnOK = new PIXI.Sprite(TextureManager.getTexture('BTN_OK'))
		btnOK.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + 500)
		btnOK.anchor.set(0.5, 0.5)
		btnOK.interactive = true
		btnOK.on('pointerdown', ()=>{
			StatesManager.ChangeState(GameStates.stateChooseLevel)
		})

		this.stage.addChild(screen)
		this.stage.addChild(btnOK)
		this.isLoadingDone = true
	}
	Application.addChild(this.stage)
	Application.Align(this.stage)
	
	Application.InitCloseButton(TextureManager.getTexture('Exit_btn'), 10, 10)
}

StateTutorial.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateTutorial.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateTutorial.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
	}
}

module.exports = StateTutorial