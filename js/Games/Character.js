const Vector2 = require('./Vector2.js')

var Character = function(){
	this.armatureDisplay = null
	this.velocity = new Vector2()
	this.accelerator = new Vector2()
	this.position = new Vector2()
}

Character.prototype.SetupDragonBones = function()
{
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('mainChar_ske'));
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('mainChar_tex_data'), TextureManager.getTexture('mainChar_tex'));

	this.armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("mainCharacter");
	this.armatureDisplay.animation.play("run");
}

Character.prototype.InitSprite = function()
{
	this.SetupDragonBones()
}

Character.prototype.SetPos = function(x, y)
{
	this.position.x = x
	this.position.y = y
}

Character.prototype.UpdatePosition = function()
{
	if(this.armatureDisplay)
	{
		this.armatureDisplay.x = this.position.x
		this.armatureDisplay.y = this.position.y
	}
}

Character.prototype.FixedUpdate = function(dt)
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

Character.prototype.Update = function(dt)
{
	if(InputManager.IsTouchPress())
	{
		if(Math.abs(InputManager.deltaX) > 10)
		{
			if(InputManager.deltaX > 0)
			{
				// console.log("Swipe right")
			}
			else
			{
				// console.log("Swipe left")
			}
		}
	}
}

module.exports = Character