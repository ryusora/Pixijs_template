require('pixi.js')

var StateLogo = function(){
	this.logoSprite = null
	this.isLoadingDone = false
	this.ticker = 0
	this.fadeValue = 5
}

StateLogo.prototype.Init = function(){
	TextureManager.load({
		'LOGO'		:'Assets/abbott-logo.jpg',
		'LOADING'	:'Assets/loading-icon.png'
	}, ()=>{
		this.logoSprite = new PIXI.Sprite(TextureManager.getTexture('LOGO'))
		this.logoSprite.anchor.set(0.5, 0.5)
		this.logoSprite.x = (Application.getScreenWidth()/2)
		this.logoSprite.y = (Application.getScreenHeight()/2)
		this.logoSprite.alpha = 0
		this.stage = new PIXI.Container()
		this.stage.addChild(this.logoSprite)
		Application.addChild(this.stage)
		//Application.Align(this.stage)
		this.isLoadingDone = true
	})
	// Init
}

StateLogo.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateLogo.prototype.Destroy = function(){
	Application.removeChild(this.stage)
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