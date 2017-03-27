const Vector2 = require('./Vector2.js')

var Character = function(){
	this.anim = null
	this.velocity = new Vector2()
	this.accelerator = new Vector2()
	this.position = new Vector2()
}

Character.prototype.InitSprite = function()
{
	var frames = []
	frames.push(PIXI.Texture.fromFrame('front_1'))

	this.anim = new PIXI.extras.AnimatedSprite(frames)
	this.anim.anchor.set(0.5)
	this.anim.animationSpeed = 0.5
	this.anim.scale.set(2)
	Application.addChild(this.anim)
}

Character.prototype.SetPos = function(x, y)
{
	this.position.x = x
	this.position.y = y
}

Character.prototype.UpdatePosition = function()
{
	if(this.anim)
	{
		this.anim.x = this.position.x
		this.anim.y = this.position.y
	}
}

Character.prototype.Update = function(dt)
{
	var gravity = new Vector2();
	gravity.clone(Defines.GRAVITY)
	gravity.mulSchalar(dt)
	this.velocity.add(gravity)
	this.accelerator.add(this.velocity)
	this.position.add(this.accelerator)

	if(this.position.y > Defines.GROUND_Y)
	{
		this.position.y = Defines.GROUND_Y
		this.velocity.zero
	}
	this.UpdatePosition()

	this.accelerator.zero()
}

module.exports = Character