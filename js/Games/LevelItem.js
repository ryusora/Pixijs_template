const Vector2 = require("./Vector2.js")

var ticker = 0
var sub = 1

var LevelItem = function(levelName, pos, isCompleted = false)
{
    this.nextPos = null
    this.nextScale = pos.scale
    this.currentScale = pos.scale
    this.scaleOffset = 0
    this.directionVector = null
    this.isActived = false

    this.stage = new PIXI.Container()
    this.stage.position.set(pos.x, pos.y)

    this.sprite = new PIXI.Sprite(TextureManager.getTexture(levelName))
    this.levelName = levelName
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.scale.set(pos.scale, pos.scale)

    this.position = {x:pos.x, y:pos.y}

    this.isDoneX = this.isDoneY = false
    this.effect = new PIXI.Sprite(TextureManager.getTexture('cl_sunEffect'))
    this.effect.anchor.set(0.5, 0.5)
    this.effect.alpha = 0
    this.stage.addChild(this.effect)
    this.stage.addChild(this.sprite)
    this.isCompleted = isCompleted
}

LevelItem.prototype.SetScale = function(scale)
{
    this.sprite.scale.set(scale, scale)
    this.effect.scale.set(scale, scale)
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

LevelItem.prototype.SetActive = function(actived, isCompleted = false)
{
    var textureName = this.levelName + ((actived)?"_highlight":"")
    this.sprite.texture = TextureManager.getTexture(textureName)
    this.isActived = actived
    this.isCompleted = isCompleted
    this.effect.alpha = isCompleted?1:0
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

        this.stage.position.set(this.position.x, this.position.y)
    }
    else if(this.isActived)
    {
        // update chosen level
        if(ticker > 0.5 || ticker < 0)
        {
            sub*=-1
        }
        ticker+=0.02*sub
        this.SetScale(1 + ticker)
        if(this.isCompleted)
        {
            this.effect.rotation += 1 * dt
        }
    }
}

module.exports = LevelItem