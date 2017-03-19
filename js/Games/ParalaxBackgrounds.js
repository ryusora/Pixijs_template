require('pixi.js')

var ParalaxBackgrounds = function(){
	this.onload = null
	this.layers = []
}

ParalaxBackgrounds.prototype.Init = function(listLayers, callback){
	
	for(var i = 0; i < 11; i++)
	{
		var bgSprite = new PIXI.Sprite(TextureManager.get('bg_' + (i+1)))
		bgSprite.anchor.set(0.5)
		bgSprite.x = (Application.getScreenWidth()/2)
		bgSprite.y = (Application.getScreenHeight()/2)
		bgSprite.height = Application.getScreenHeight()
		this.layers.push(bgSprite);
	}
}

ParalaxBackgrounds.prototype.Display = function()
{
	for(var i = 0; i < this.layers.length; i++)
	{
		Application.addChild(this.layers[i]);
	}
}

ParalaxBackgrounds.prototype.Remove = function()
{
	for(var i = 0; i < 11; i++)
	{
		Application.removeChild(this.layers[i]);
	}
}

ParalaxBackgrounds.prototype.Update = function(dt)
{

}

ParalaxBackgrounds.prototype.destroy = function()
{

}

module.exports = new ParalaxBackgrounds()