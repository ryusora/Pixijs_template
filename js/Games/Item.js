var Item = function()
{
	this.armatureDisplay = null
	this.position = { x:0, y:0, z:0 }
	this.scale = 1
}

Item.prototype.SetupDragonBones = function()
{
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('enemy_ske'))
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('enemy_tex_data'), TextureManager.getTexture('enemy_tex'))

	this.armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("enemy")
	this.armatureDisplay.animation.play("idle")
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
	this.scale = 1
	this.UpdateScale()
}

Item.prototype.UpdatePosition = function()
{
	// recalculate position if it's wrong
	if(this.armatureDisplay)
	{
		this.armatureDisplay.x = this.position.x
		this.armatureDisplay.y = this.position.y
	}
}

Item.prototype.UpdateScale = function()
{
	if(this.armatureDisplay)
	{
		this.armatureDisplay.scale.x = this.scale
		this.armatureDisplay.scale.y = this.scale
	}
}

Item.prototype.Update = function(dt)
{
	this.UpdatePosition()
	this.UpdateScale()
}

Item.prototype.FixedUpdate = function(dt)
{

}

module.exports = Item