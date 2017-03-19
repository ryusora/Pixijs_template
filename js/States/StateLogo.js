require('pixi.js')

var StateLogo = function(){
	this.logoSprite = null
	this.isLoadingDone = false
	this.ticker = 0
	this.fadeValue = 1
}

StateLogo.prototype.Init = function(){
	PIXI.loader
		.add('LOGO', 'Assets/logo.png')
		.load((loader, resource)=>{
			this.logoSprite = new PIXI.Sprite(resource.LOGO.texture)
			this.logoSprite.anchor.set(0.5)
			this.logoSprite.x = Application.getScreenWidth() / 2
			this.logoSprite.y = Application.getScreenHeight() / 2
			this.logoSprite.alpha = 0
			Application.addChild(this.logoSprite)
			this.isLoadingDone = true
		})

	// Init 
}

StateLogo.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateLogo.prototype.Destroy = function(){
	Application.removeChild(this.logoSprite)
	this.logoSprite = null
}

StateLogo.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		this.ticker += dt * this.fadeValue
		this.logoSprite.alpha = this.ticker / Defines.LOGO_TIME
		if(this.ticker > Defines.LOGO_TIME)
		{
			this.ticker = Defines.LOGO_TIME
			this.fadeValue*=-1
		}
		else if(this.ticker < 0)
		{
			StatesManager.ChangeState(GameStates.stateLoading)
		}
	}
}

module.exports = StateLogo