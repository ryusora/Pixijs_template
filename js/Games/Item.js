var Item = function()
{
	this.armatureDisplay = null
	this.position = { x:0, y:0, z:0 }
	this.localScale = 1
	this.scale = 0
	this.isActived = false
	this.direction = null
	this.speed = 0
	this.isOnBackStage = false
	this.shouldPutBackStage = false
	this.score = Defines.ITEM_SCORE
	this.type = -1
	this.isLuckyItem = false
}

Item.prototype.SetActive = function(actived)
{
	this.isActived = actived
}

Item.prototype.SetSpeed = function(speed)
{
	this.speed = speed
}

Item.prototype.SetupDragonBones = function(item_name)
{
	this.isLuckyItem = (item_name == "lucky_item")
	if(!this.isLuckyItem)
		this.score = (item_name.startsWith("item"))?Defines.ITEM_SCORE:-1
	else
		this.score = Defines.ITEM_LUCKY_SCORE
	this.armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay(item_name)
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

		// set alpha
		var offset = (this.position.z - Camera.GetCameraPosZ())/Defines.ITEM_OFFSET_Z
		var alpha = 1-offset + 0.5
		if(alpha > 1) alpha = 1
		this.armatureDisplay.alpha = alpha
	}
}

Item.prototype.UpdateScale = function()
{
	this.scale = this.localScale * Camera.GetDrawScale(this.position.z)
	if(this.armatureDisplay)
	{
		this.armatureDisplay.armature.display.scale.set(this.scale, this.scale)
	}
}

Item.prototype.CheckCollision = function(box)
{
	if(box.z - (box.depth*0.5) < this.position.z && this.position.z < box.z + (box.depth*0.5))
	{
		if(box.x - (box.width*0.5) < this.position.x && this.position.x < box.x + (box.width*0.5))
		{
			if(Math.abs(box.y) >= this.position.y && this.position.y + (this.original.height/2) > Math.abs(box.y))
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

	this.UpdatePosition()
	this.UpdateScale()

	if(!this.shouldPutBackStage && this.position.z < GameStates.stateInGame.GetPlayerPosZ())
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