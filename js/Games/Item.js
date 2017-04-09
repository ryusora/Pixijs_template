var Item = function()
{
	this.armatureDisplay = null
	this.position = { x:0, y:0, z:0 }
	this.originScale = 0.8
	this.scale = 0
	this.isActived = false
	this.direction = null
	this.speed = 0
	this.isOnBackStage = false
	this.shouldPutBackStage = false
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
			this.SetPos({x:(Application.getScreenWidth()/2 - Defines.ITEM_OFFSET_X), y:Defines.TOP_Y_BASE, z:0})
		}
		break;

		case Defines.CENTER_DIRECTION:
		{
			this.SetPos({x:(Application.getScreenWidth()/2), y:Defines.TOP_Y_BASE, z:0})
		}
		break;

		case Defines.RIGHT_DIRECTION:
		{
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
	this.isOnBackStage = false
	this.shouldPutBackStage = false
}

Item.prototype.UpdatePosition = function(dt)
{
	if(this.armatureDisplay)
	{
		this.armatureDisplay.x = Camera.GetDrawX(this.position)
		this.armatureDisplay.y = Camera.GetDrawY(this.position)
	}
}

Item.prototype.UpdateScale = function()
{
	this.scale = this.originScale * Camera.GetDrawScale(this.position.z)
	if(this.armatureDisplay)
	{
		this.armatureDisplay.armature.display.width = this.original.width * this.scale
		this.armatureDisplay.armature.display.height = this.original.height * this.scale
	}
}

Item.prototype.CheckCollision = function(box)
{
	if(box.z - (box.depth*0.5) < this.position.z && this.position.z < box.z + (box.depth*0.5))
	{
		if(box.x - (box.width*0.5) < this.position.x && this.position.x < box.x + (box.width*0.5))
		{
			if(box.y < this.position.y && this.position.y < box.y + box.height)
			{
				return true
			}
		}
	}

	return false
}

Item.prototype.Update = function(dt)
{
	if(!this.isActived) return

	this.position.z -= Defines.GAME_SPEED * dt
	this.UpdatePosition()
	this.UpdateScale()

	if(!this.shouldPutBackStage && this.position.z < 0)
	{
		this.shouldPutBackStage = true
	}

	if(this.position.z < Camera.GetCameraPosZ())
	{
		this.SetActive(false)
	}
}

Item.prototype.FixedUpdate = function(dt)
{
	// if(!this.isActived) return
}

module.exports = Item