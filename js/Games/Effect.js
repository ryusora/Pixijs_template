var Effect = function()
{
	this.armatureDisplay = null
	this.position = { x:0, y:0, z:0 }
	this.originScale = 1
	this.scale = 0
	this.isActived = false
}

Effect.prototype.SetActive = function(actived)
{
	this.isActived = actived
    this.armatureDisplay.animation.play(actived?"active":"idle")
}

Effect.prototype.SetupDragonBones = function()
{
	this.armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("effect")
	this.armatureDisplay.animation.play("idle")

    this.armatureDisplay.armature.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.OnAnimEnd.bind(this))
}

Effect.prototype.SetPos = function(pos)
{
	this.position.x = pos.x
	this.position.y = pos.y
	this.position.z = pos.z
	this.UpdatePosition()
}

Effect.prototype.ResetAll = function()
{
	this.position = { x:0, y:0, z:0 }
	this.UpdateScale()
}

Effect.prototype.UpdatePosition = function(dt)
{
	if(this.armatureDisplay)
	{
		this.armatureDisplay.x = Camera.GetDrawX(this.position)
		this.armatureDisplay.y = Camera.GetDrawY(this.position)
	}
}

Effect.prototype.UpdateScale = function()
{
	this.scale = this.originScale * Camera.GetDrawScale(this.position.z)
	if(this.armatureDisplay)
	{
		this.armatureDisplay.armature.display.scale.set(this.scale, this.scale)
	}
}

Effect.prototype.Update = function(dt)
{
	if(!this.isActived) return

	this.UpdatePosition()
	this.UpdateScale()

    // this.SetActive(false)
}

Effect.prototype.OnAnimEnd = function(eventObj)
{
    this.SetActive(false)
}

Effect.prototype.FixedUpdate = function(dt)
{
	// if(!this.isActived) return
}

module.exports = Effect