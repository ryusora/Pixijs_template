var GameConfig = function(){
	this.isWebviewPortrait = true
	this.width 	= 750
	this.height = 1334
	this.originalWidth = 0
	this.originalHeight = 0
	this.isShaking = false
	this.shakeTicker = 0
}

var GameConfig = new GameConfig()

var Application = function(){
	this.screenOffset = {x:0, y:0}
	this.scale = 1
	this.scale_x = 1
	this.closeBtn = null
	this.isQuit = false
}

Application.prototype.Quit = function()
{
	if(!this.isQuit){
		this.isQuit = true
		window.history.back()
	}
}

Application.prototype.InitCloseButton = function(texture, x, y)
{
	this.closeBtn = this.closeBtn || new PIXI.Sprite(texture)
	this.closeBtn.anchor.set(0, 0)
	this.closeBtn.position.set(x, y)
	this.addChild(this.closeBtn)
	this.closeBtn.interactive = true
	this.closeBtn.on('pointerdown', ()=>{
		this.Quit()
	})
}

Application.prototype.Shake = function()
{
	this.isShaking = true
	this.shakeTicker = 60
}

Application.prototype.initialize = function(gameLoop, width, height)
{
	this.instance = new PIXI.Application(width, height)
	document.body.appendChild(this.instance.view)
	// this.UpdateScale(width, height)
	this.Resize(width, height)
	this.instance.ticker.add(gameLoop)
	this.SetBackGroundColor(0xffffff);
}

Application.prototype.SetBackGroundColor = function(color)
{
	this.instance.renderer.backgroundColor = color
}

Application.prototype.Resize = function(width, height)
{
	GameConfig.isWebviewPortrait = (width < height)
	GameConfig.originalWidth = width
	GameConfig.originalHeight = height
	if(GameConfig.isWebviewPortrait)
	{
		this.ratio = width / height
		this.instance.renderer.resize(GameConfig.height * this.ratio, GameConfig.height)
		this.screenOffset.x = (this.instance.renderer.width - GameConfig.width) / 2
		this.screenOffset.y = 0
	}
	else
	{
		this.ratio = height / width
		this.instance.renderer.resize(GameConfig.height, GameConfig.height * this.ratio)
		this.screenOffset.x = (this.instance.renderer.height - GameConfig.width) / 2
		this.screenOffset.y = 0
	}

	this.Rotate(!GameConfig.isWebviewPortrait)
}

Application.prototype.Rotate = function(isRotate)
{
	if (isRotate)
	{
		this.instance.stage.position.set(this.instance.renderer.width / 2, this.instance.renderer.height / 2);
		this.instance.stage.pivot.set(this.instance.renderer.width / 2, this.instance.renderer.height / 2);
		this.instance.stage.rotation = -90 * Math.PI / 180;
	}
	else
	{
		this.instance.stage.pivot.set(0, 0);
		this.instance.stage.position.set(0, 0);
		this.instance.stage.rotation = 0;
	}
}

Application.prototype.getDeltaTime = function()
{
	return this.instance.ticker.deltaTime
}

Application.prototype.Align = function(stage)
{
	stage.scale.x = this.scale
	stage.scale.y = this.scale
	stage.position.set(this.getScreenWidth() / 2, this.getScreenHeight() / 2);
	stage.pivot.set(this.getScreenWidth() / 2, this.getScreenHeight() / 2);
}

Application.prototype.getRatioWidth = function()
{
	return 375 + this.ratioOffset.x
}

Application.prototype.getRatioHeight = function()
{
	return 667 + this.ratioOffset.y
}

Application.prototype.getScreenWidth = function()
{
	return this.instance.renderer.width
}

Application.prototype.getScreenHeight = function()
{
	return this.instance.renderer.height
}

Application.prototype.addChild = function(child)
{
	this.instance.stage.addChild(child)
}

Application.prototype.removeChild = function(child)
{
	this.instance.stage.removeChild(child)
}

module.exports = new Application()