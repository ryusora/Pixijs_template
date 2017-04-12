var Application = function(){
	this.ratioOffset = {x:0, y:0}
	this.scale = 1
	this.scale_x = 1
}

Application.prototype.initialize = function(gameLoop, width, height)
{
	this.instance = new PIXI.Application(width * window.devicePixelRatio, height * window.devicePixelRatio, null,true)
	this.instance.renderer.backgroundColor = 0x000000
	document.body.appendChild(this.instance.view)
	this.UpdateScale(width, height)
	this.instance.ticker.add(gameLoop)
}

Application.prototype.UpdateScale = function(width, height)
{
	this.scale = height / 667
	this.scale_x = width / 375
	var scale = this.scale
	var context = this.instance.view.getContext("2d")

	if(context)
	{
		// init ratio offset
		this.ratioOffset.x = (width - 375 * scale) / 2 / scale
		this.ratioOffset.y = (height - 667 * scale) / 2 / scale

		console.log(this.ratioOffset)
		context.translate(0, 0)
		context.scale(scale, scale)
		context.rotate(0)
	}
	else
	{
		console.log('WTF')
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