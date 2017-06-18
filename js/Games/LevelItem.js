var LevelItem = function(levelName, pos)
{
    this.nextPos = null
    this.directionVector = null

    this.sprite = new PIXI.Sprite(TextureManager.getTexture(levelName))
    this.levelName = levelName
    this.sprite.position.set(pos.x, pos.y)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.scale.set(pos.scale, pos.scale)
}

LevelItem.prototype.MoveTo = function(pos)
{
    this.nextPos = pos
    this.directionVector = new Vector2(this.sprite.position.x, this.sprite.position.y)
    this.directionVector.sub(pos)
    this.directionVector.normalize()
}

LevelItem.prototype.Update = function(dt)
{
    // update position
    if(this.nextPos != null)
    {

    }
}

module.exports = LevelItem