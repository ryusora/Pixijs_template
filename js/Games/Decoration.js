var Decoration = function()
{
    this.position = {x:0, y:0, z:0} // 3D position
    this.scale = {x:0, y:0}
    this.isActived = false
    this.sprite = null
}

Decoration.prototype.SetSprite = function(sprite)
{
    this.sprite = sprite
    // init original size
    this.originalWidth = this.sprite.width
    this.originalHeight= this.sprite.height
}

Decoration.prototype.SetPos = function(pos)
{
    this.position.x = pos.x
    this.position.y = pos.y
    this.position.z = pos.z
}

Decoration.prototype.UpdateScale = function()
{
    var scale = Camera.GetDrawScale(this.position.z)
    this.sprite.scale.set(scale, scale)
}

Decoration.prototype.SetActive = function (active)
{
    this.isActived = active
}

Decoration.prototype.UpdatePos = function()
{
    var drawX = Camera.GetDrawX(this.position)
    var drawY = Camera.GetDrawY(this.position)
    if(this.sprite)
    {
        // set position
        this.sprite.position.set(drawX, drawY)
        // set alpha
    	var offset = (this.position.z - Camera.GetCameraPosZ())/Defines.ITEM_OFFSET_Z
    	var alpha = 1-offset + 0.5
    	if(alpha > 1) alpha = 1
        this.sprite.alpha = alpha
    }
}

Decoration.prototype.Update = function(dt)
{
    if(!this.isActived) return false
    
    this.UpdatePos()
    this.UpdateScale()

    if(this.position.z < Camera.GetCameraPosZ())
    {
        this.SetActive(false)
    }

    return true
}

module.exports = Decoration