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
		screen.interactive = true
		screen.on('pointerdown', ()=>{
			StatesManager.ChangeState(GameStates.stateChooseLevel)
		})

		this.stage.addChild(screen)
		this.isLoadingDone = true
	}
	Application.addChild(this.stage)
	Application.Align(this.stage)
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