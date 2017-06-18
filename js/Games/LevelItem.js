const Vector2 = require("./Vector2.js")

var LevelItem = function(levelName, pos)
{
    this.nextPos = null
    this.nextScale = pos.scale
    this.currentScale = pos.scale
    this.scaleOffset = 0
    this.directionVector = null

    this.sprite = new PIXI.Sprite(TextureManager.getTexture(levelName))
    this.levelName = levelName
    this.sprite.position.set(pos.x, pos.y)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.scale.set(pos.scale, pos.scale)
    this.position = {x:pos.x, y:pos.y}

    this.isDoneX = this.isDoneY = false
}

LevelItem.prototype.SetScale = function(scale)
{
    this.sprite.scale.set(scale, scale)
}

LevelItem.prototype.MoveTo = function(pos)
{
    this.nextPos = {x:pos.x, y:pos.y}
    this.nextScale = pos.scale
    this.scaleOffset = (this.nextScale - this.currentScale)/10
    this.directionVector = new Vector2(this.nextPos.x, this.nextPos.y)
    this.directionVector.sub(this.position)
    this.directionVector.normalize()
    this.isDoneX = this.isDoneY = false
}

LevelItem.prototype.SetActive = function(actived)
{
    var textureName = this.levelName + ((actived)?"_highlight":"")
    this.sprite.texture = TextureManager.getTexture(textureName)
}

LevelItem.prototype.IsDoneMoving = function()
{
    return (this.isDoneX && this.isDoneY)
}

LevelItem.prototype.Update = function(dt)
{
    // update position
    if(this.directionVector != null)
    {
        var speed = 1000
        this.position.x += this.directionVector.x * dt * speed
        this.position.y += this.directionVector.y * dt * speed
        this.currentScale += this.scaleOffset
        var scaleCondition = (this.scaleOffset < 0)?(this.currentScale <= this.nextScale):(this.currentScale >= this.nextScale)
        if(scaleCondition)
        {
            this.currentScale = this.nextScale
        }
        this.SetScale(this.currentScale)

        var xCondition = (this.directionVector.x < 0)?(this.position.x <= this.nextPos.x):(this.position.x >= this.nextPos.x)
        var yCondition = (this.directionVector.y < 0)?(this.position.y <= this.nextPos.y):(this.position.y >= this.nextPos.y)
        if(xCondition)
        {
            this.position.x = this.nextPos.x
            this.isDoneX = true
        }

        if(yCondition)
        {
            this.position.y = this.nextPos.y
            this.isDoneY = true
        }

        if(this.isDoneX && this.isDoneY)
        {
            this.directionVector = null
        }

        this.sprite.position.set(this.position.x, this.position.y)
    }
}

module.exports = LevelItem