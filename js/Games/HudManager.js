const Utility = require("../Core/Utility.js")

var HudManager = function()
{
    this.stage = new PIXI.Container()
    this.liveStr = null
    this.scoreStr = null
    this.isInitialized = false
    this.pause = null
    this.IsPaused = false

    this.fadeEffect = new PIXI.Graphics()
    this.fadeEffect.beginFill(0x000000)
	this.fadeEffect.drawRect(0,0,Application.getScreenWidth(), Application.getScreenHeight())
	this.fadeEffect.alpha = 0
}

HudManager.prototype.OnPause = function()
{
    this.IsPaused = !this.IsPaused
    this.fadeEffect.alpha = this.IsPaused?0.5:0
    if(this.pause)
        this.pause.text = ((this.IsPaused)?"CHƠI TIẾP":"TẠM DỪNG")
}

HudManager.prototype.Initialize = function()
{
    if(this.isInitialized) 
    {
        this.live_sprite.texture = TextureManager.getTexture("hud_live_" + GameStates.GetCharacterName())
        return
    }

    var half_width = Application.getScreenWidth()*0.5
    var hudStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 35,
        fontWeight: 'bold',
        fill: ['#ff0000'], // white
        stroke: '#ffffff',
        strokeThickness: 5,
    })

    var scoreStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 65,
        fontWeight: 'bold',
        fill: ['#ff0099', '#ff0000'], // red
        stroke: '#ffffff',
        strokeThickness: 5,
    })

    var scoreTitleStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 45,
        fontWeight: 'bold',
        fill: ['#ff0099'], // red
        stroke: '#ffffff',
        strokeThickness: 5,
        lineJoin:'round'
    })
    // load hud bg
    var bg_sprite = new PIXI.Sprite(TextureManager.getTexture("hud_bg"))
    bg_sprite.position.set(half_width, 0)
    bg_sprite.anchor.set(0.5,0)
    // load Life icon
    this.live_sprite = new PIXI.Sprite(TextureManager.getTexture("hud_live_" + GameStates.GetCharacterName()))
    this.live_sprite.position.set(Defines.HUD_LIVE_OFFSET_X, Defines.HUD_ITEM_Y)
    this.live_sprite.anchor.set(0,0.5)
    // load life text
    this.liveStr = new PIXI.Text("0", hudStyle)
    this.liveStr.position.set(Defines.LIVE_TEXT_OFFSET_X, 0)
    this.liveStr.anchor.set(0.5, 0.5)
    // load score icon
    // var score_sprite = new PIXI.Sprite(TextureManager.getTexture("hud_score"))
    // score_sprite.position.set(half_width + Defines.HUD_SCORE_OFFSET_X, Defines.HUD_ITEM_Y)
    // score_sprite.anchor.set(0.5,0.5)
    // load score text
    this.scoreStr = new PIXI.Text("0", scoreStyle)
    this.scoreStr.anchor.set(0.5, 0.5)
    this.scoreStr.position.set(half_width + Defines.HUD_SCORE_OFFSET_X, Defines.HUD_ITEM_Y + 35)

    var scoreTitle = new PIXI.Text("ĐIỂM", scoreTitleStyle)
    scoreTitle.anchor.set(0.5, 0.5)
    scoreTitle.position.set(half_width + Defines.HUD_SCORE_OFFSET_X, Defines.HUD_ITEM_Y - 30)

    var pauseStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: ['#ff0000'], // red
        stroke: '#ffffff',
        strokeThickness: 10,
        lineJoin:'round'
    })
    this.pause = new PIXI.Text("TẠM DỪNG", pauseStyle)
    this.pause.position.set(Application.getScreenWidth()*0.5 + 250, Defines.HUD_ITEM_Y)
    this.pause.anchor.set(0.5, 0.5)
    this.pause.interactive = true
    this.pause.on('pointerdown', this.OnPause.bind(this))

    this.stage.addChild(bg_sprite)
    this.stage.addChild(this.live_sprite)
    this.live_sprite.addChild(this.liveStr)
    this.stage.addChild(scoreTitle)
    this.stage.addChild(this.scoreStr)
    this.stage.addChild(this.fadeEffect)
    this.stage.addChild(this.pause)

    this.isInitialized = true
}

HudManager.prototype.ResetAll = function()
{
    this.UpdateLife(0)
    this.UpdateScore(0)
}

HudManager.prototype.UpdateScore = function(score)
{
    this.scoreStr.text = Utility.GetStringFromNumber(score)
}

HudManager.prototype.UpdateLife = function(life)
{
    this.liveStr.text = life + ""
}

module.exports = new HudManager()