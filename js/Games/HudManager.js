var HudManager = function()
{
    this.stage = new PIXI.Container()
    this.liveStr = null
    this.scoreStr = null
}

HudManager.prototype.Initialize = function()
{
    var half_width = Application.getScreenWidth()*0.5
    var hudStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: ['#ffffff'], // white
    })
    // load hud bg
    var bg_sprite = new PIXI.Sprite(TextureManager.getTexture("hud_bg"))
    bg_sprite.position.set(half_width, 0)
    bg_sprite.anchor.set(0.5,0)
    // load Life icon
    var live_sprite = new PIXI.Sprite(TextureManager.getTexture("hud_live"))
    live_sprite.position.set(Defines.HUD_LIVE_OFFSET_X, Defines.HUD_ITEM_Y)
    live_sprite.anchor.set(0,0.5)
    // load life text
    this.liveStr = new PIXI.Text("0", hudStyle)
    this.liveStr.position.set(Defines.LIVE_TEXT_OFFSET_X, 0)
    this.liveStr.anchor.set(0.5, 0.5)
    // load score icon
    var score_sprite = new PIXI.Sprite(TextureManager.getTexture("hud_score"))
    score_sprite.position.set(half_width + Defines.HUD_SCORE_OFFSET_X, Defines.HUD_ITEM_Y)
    score_sprite.anchor.set(0.5,0.5)
    // load score text
    this.scoreStr = new PIXI.Text("0", hudStyle)
    this.scoreStr.anchor.set(0.5, 0.5)
    this.scoreStr.position.set(Defines.SCORE_TEXT_OFFSET_X, 0)

    live_sprite.addChild(this.liveStr)
    score_sprite.addChild(this.scoreStr)
    this.stage.addChild(bg_sprite)
    this.stage.addChild(live_sprite)
    this.stage.addChild(score_sprite)
}

HudManager.prototype.ResetAll = function()
{
    this.UpdateLife(0)
    this.UpdateScore(0)
}

HudManager.prototype.UpdateScore = function(score)
{
    this.scoreStr.text = score + ""
}

HudManager.prototype.UpdateLife = function(life)
{
    this.liveStr.text = life + ""
}

module.exports = new HudManager()