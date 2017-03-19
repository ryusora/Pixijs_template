var Character = function(){
	this.sprite = null
}

Character.prototype.InitSprite = function(texture)
{
	this.sprite = new PIXI.Sprite(texture)
	Application.addChild(this.sprite)
}

Character.prototype.SetPos = function(x, y)
{
	if(this.sprite)
	{
		this.sprite.x = x
		this.sprite.y = y
	}
}

module.exports = Character