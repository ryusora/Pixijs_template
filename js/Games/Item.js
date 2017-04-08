var Item = function()
{
	this.armatureDisplay = null
	this.position = { x:0, y:0, z:0 }
	this.scale = 0
	this.isActived = false
	this.direction = null
	this.speed = 0
}

Item.prototype.SetActive = function(actived)
{
	this.isActived = actived
}

Item.prototype.SetSpeed = function(speed)
{
	this.speed = speed
}

Item.prototype.SetDirection = function(direction)
{
	this.direction = direction
	switch(direction)
	{
		case Defines.LEFT_DIRECTION:
		{
			console.log("spawn left")
			this.SetPos({x:(Application.getScreenWidth()/2 - Defines.ITEM_OFFSET_X), y:Defines.TOP_Y_BASE, z:0})
		}
		break;

		case Defines.CENTER_DIRECTION:
		{
			console.log("spawn center")
			this.SetPos({x:(Application.getScreenWidth()/2), y:Defines.TOP_Y_BASE, z:0})
		}
		break;

		case Defines.RIGHT_DIRECTION:
		{
			console.log("spawn right")
			this.SetPos({x:(Application.getScreenWidth()/2 + Defines.ITEM_OFFSET_X), y:Defines.TOP_Y_BASE, z:0})
		}
		break;
	}
}

Item.prototype.SetupDragonBones = function()
{
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('enemy_ske'))
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('enemy_tex_data'), TextureManager.getTexture('enemy_tex'))

	this.armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("enemy")
	this.armatureDisplay.animation.play("idle")

	this.original = {width:this.armatureDisplay.armature.display.width, height:this.armatureDisplay.armature.display.height}
}

Item.prototype.SetPos = function(pos)
{
	this.position.x = pos.x
	this.position.y = pos.y
	this.position.z = pos.z
	this.UpdatePosition()
}

Item.prototype.ResetAll = function()
{
	this.position = { x:0, y:0, z:0 }
	this.armatureDisplay.armature.display.width = this.original.width
	this.armatureDisplay.armature.display.height = this.original.height
	this.UpdateScale()
}

Item.prototype.UpdatePosition = function()
{
	this.position.x += this.direction.x
	this.position.y += this.direction.y
	// recalculate position if it's wrong
	if(this.armatureDisplay)
	{
		this.armatureDisplay.x = this.position.x
		this.armatureDisplay.y = this.position.y
	}
}

Item.prototype.UpdateScale = function()
{
	var maxDistance = Defines.GROUND_Y - Defines.TOP_Y_BASE
	var itemDistance = Defines.GROUND_Y - this.position.y

	this.scale = (1 - (itemDistance/maxDistance))/2

	if(this.armatureDisplay)
	{
		this.armatureDisplay.armature.display.width = this.original.width * this.scale
		this.armatureDisplay.armature.display.height = this.original.height * this.scale
	}
}

Item.prototype.Update = function(dt)
{
	if(!this.isActived) return

	this.UpdatePosition()
	this.UpdateScale()

	if(this.position.y > Application.getScreenHeight())
	{
		this.SetActive(false)
	}
}

Item.prototype.FixedUpdate = function(dt)
{
	// if(!this.isActived) return
}

module.exports = Item