var Score = function()
{
    this.textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 50,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ff0000'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    })
    this.sprite = new PIXI.Text("test", this.textStyle)
    this.sprite.anchor.set(0.5, 0.5)

    this.isActived = false

    this.timer = 0
}

Score.prototype.ResetAll = function(){

}

Score.prototype.SetActive = function(actived)
{
    this.isActived = actived
    if(this.isActived)
    {
        // init timer
        this.timer = Defines.SCORE_TIMER
    }
}

Score.prototype.SetScore = function(score)
{
    this.sprite.text = "+" + score
}

Score.prototype.SetPosition = function(pos)
{
    var x = Camera.GetDrawX(pos)
    var y = Camera.GetDrawY(pos)
    this.sprite.position.set(x, y)
}

Score.prototype.Update = function(dt)
{
    if(!this.isActived) return
    
    this.sprite.position.y -= Defines.SCORE_SPEED * dt

    this.timer -= dt
    if(this.timer < 0)
    {
        this.timer = 0
        this.isActived = false
    }
}

module.exports = Score