const Character 			= require('../Games/Character.js')
window.ScoreManager 		= require("../Games/ScoreManager.js")
window.ItemsManager			= require('../Games/ItemsManager.js')
window.GroundsManager		= require('../Games/GroundsManager.js')
// window.DecorationsManager 	= require('../Games/DecorationsManager.js')
window.HudManager 			= require('../Games/HudManager.js')

var StateInGame = function()
{
	this.isLoadingDone = false
	this.player = null
	this.stage = null
	this.combo = 0
	this.fadeEffect = new PIXI.Graphics()
	// init graphic
	this.fadeEffect.beginFill(0xFF0000)
	this.fadeEffect.drawRect(0,0,Application.getScreenWidth(), Application.getScreenHeight())
	this.fadeEffect.alpha = 0
}

StateInGame.prototype.ResetCombo = function()
{
	this.combo = 0
}

StateInGame.prototype.Init = function()
{
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
	Application.SetBackGroundColor(0xe4c29c)

	Defines.UpdateParams()
	Camera.Init()

	GroundsManager.Initialize()
	HudManager.Initialize()
	HudManager.UpdateLife(ScoreManager.life)
	// DecorationsManager.Initialize()

	this.stage.addChild(GroundsManager.stage)
	// this.stage.addChild(DecorationsManager.stage)
	this.stage.addChild(ItemsManager.frontStage)

	this.player = new Character()
	this.player.InitSprite()
	this.player.SetPos(Defines.PLAYER_START_POS_X, Defines.PLAYER_START_POS_Y, Defines.PLAYER_START_POS_Z )

	this.stage.addChild(this.player.armatureDisplay)
	this.stage.addChild(ItemsManager.backStage)

	ItemsManager.InitPool()

	this.stage.addChild(this.fadeEffect)
	this.stage.addChild(HudManager.stage)
}

StateInGame.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateInGame.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateInGame.prototype.FixedUpdate = function(dt)
{
	if(this.isGameOver)
	{
		return
	}

	this.player.FixedUpdate(dt)
	ItemsManager.FixedUpdate(dt)
	var oldLife = ScoreManager.life
	//check collision
	var collidedItem = ItemsManager.CheckCollision({
		x:this.player.position.x,
		y:this.player.position.y,
		z:this.player.position.z,
		width:this.player.GetWidth(),
		height:this.player.GetHeight(),
		depth:Defines.PLAYER_BOX_DEPTH
	})

	if(collidedItem)
	{
		if(oldLife > ScoreManager.life)
		{
			this.fadeEffect.alpha = 1
			if(ScoreManager.life < 0)
			{
				this.isGameOver = true
				return
			}
			this.player.speed = 0
			Application.Shake()
			this.ResetCombo()
		}
		ItemsManager.DeactiveItem(collidedItem)
		if(!this.IsFrenzy()) this.combo++
		HudManager.UpdateScore(ScoreManager.currentScore)
		HudManager.UpdateLife(ScoreManager.life)
	}

	if(this.combo == Defines.MAX_COMBO_COUNT && !this.IsFrenzy())
	{
		this.combo = 0
		this.player.ActiveFrenzy()
	}
}

StateInGame.prototype.GetPlayerPosZ = function()
{
	return this.player.position.z
}

StateInGame.prototype.IsFrenzy = function()
{
	return this.player.IsFrenzy()
}

StateInGame.prototype.GetPlayerOffsetSpeed = function()
{
	return this.player.offsetSpeed
}

StateInGame.prototype.RestartGame = function()
{
	// reset player position
	this.player.ResetAll()

	ItemsManager.ResetAll()
	ScoreManager.ResetAll()
	HudManager.ResetAll()
	HudManager.UpdateLife(ScoreManager.life)

	this.isGameOver = false
	this.fadeEffect.alpha = 0
}

StateInGame.prototype.Update = function(dt)
{
	if(this.isGameOver)
	{
		if(InputManager.IsTouchDown())
		{
			this.RestartGame()
		}
		return
	}

	if(this.fadeEffect.alpha > 0)
	{
		this.fadeEffect.alpha -= Defines.RED_FADE_TICKER * dt
	}

	GroundsManager.Update(dt)
	// DecorationsManager.Update(dt)
	this.player.Update(dt)
	ItemsManager.Update(dt)
}

module.exports = StateInGame