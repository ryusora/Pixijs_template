var Application = function(){
	this.instance = new PIXI.Application()
	this.instance.renderer.backgroundColor = 0x000000
	document.body.appendChild(this.instance.view)
}

Application.prototype.initialize = function(gameLoop)
{
	this.instance.ticker.add(gameLoop)
}

Application.prototype.getDeltaTime = function()
{
	return this.instance.ticker.deltaTime
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