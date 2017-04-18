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
    this.position = pos
}

Ground.prototype.UpdateScale = function()
{
    /*
    var newPos = {x: this.position.x, y: this.position.y, z: this.position.z + Defines.GROUND_SIZE_Z}
    var height = Camera.GetDrawY(this.position) - Camera.GetDrawY(newPos) + 4;
    var width  = Camera.GetDrawScale(this.position.z) * Defines.GROUND_SIZE_X;
    
    this.sprite.scale.set(
        width/this.originalWidth,
        height/this.originalHeight
    );*/

    var scale = Camera.GetDrawScale(this.position.z)

    this.sprite.scale.set(scale, scale)
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
        /*
        if(this.position.z - Camera.GetCameraPosZ() > Defines.DISTANCE_Z_MAKE_OBJECT)
        {
            this.sprite.alpha = 0;
        }
        else
        {
            this.sprite.alpha = 1-((this.position.z - Camera.GetCameraPosZ() - (Defines.DISTANCE_Z_MAKE_OBJECT - Defines.DISTANCE_ALPHA)) / Defines.DISTANCE_ALPHA);
        }*/
    }
}

Ground.prototype.Update = function(dt)
{
    if(!this.isActived) return
    this.position.z -= Defines.GAME_SPEED * dt
    this.UpdatePos(dt)
    this.UpdateScale()
}

module.exports = Ground