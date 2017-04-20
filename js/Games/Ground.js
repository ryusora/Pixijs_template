var Ground = function()
{
    this.position = {x:0, y:0, z:0} // 3D position
    this.scale = {x:0, y:0}
    this.isActived = false
    this.sprite = null
}

Ground.prototype.SetSprite = function(sprite)
{
    this.sprite = sprite
    // init original size
    this.originalWidth = this.sprite.width
    this.originalHeight= this.sprite.height
}

Ground.prototype.SetPos = function(pos)
{
    this.position.x = pos.x
    this.position.y = pos.y
    this.position.z = pos.z
}

Ground.prototype.UpdateScale = function()
{
    var newPos = {x: this.position.x, y: this.position.y, z: this.position.z + Defines.GROUND_SIZE_Z}
    var height = Camera.GetDrawY(this.position) - Camera.GetDrawY(newPos) + 4;
    var width  = Camera.GetDrawScale(this.position.z) * Defines.GROUND_SIZE_X;
    
    this.sprite.scale.set(
        width/this.originalWidth,
        height/this.originalHeight
    );
    
    if(this.sprite.scale.x < 0 || this.sprite.scale.y < 0)
    {
        this.sprite.alpha = 0
    }
}

Ground.prototype.SetActive = function (active)
{
    this.isActived = active
}

Ground.prototype.UpdatePos = function(dt)
{
    var drawX = Camera.GetDrawX(this.position)
    var drawY = Camera.GetDrawY(this.position)
    if(this.sprite)
    {
        // set position
        this.sprite.position.set(drawX, drawY)
        // set alpha
        if(this.position.z - Camera.GetCameraPosZ() > Defines.DISTANCE_Z_MAKE_OBJECT)
        {
            this.sprite.alpha = 0;
        }
        else
        {
            this.sprite.alpha = 1-((this.position.z - Camera.GetCameraPosZ() - (Defines.DISTANCE_Z_MAKE_OBJECT - Defines.DISTANCE_ALPHA)) / Defines.DISTANCE_ALPHA);
        }
    }
}

Ground.prototype.Update = function(dt)
{
    if(!this.isActived) return false
    
    this.UpdatePos(dt)
    this.UpdateScale()

    if(this.position.z < Camera.GetCameraPosZ())
    {
        this.SetActive(false)
    }

    return true
}

module.exports = Ground