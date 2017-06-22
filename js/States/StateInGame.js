const Character 			= require('../Games/Character.js')
window.ScoreManager 		= require("../Games/ScoreManager.js")
window.ItemsManager			= require('../Games/ItemsManager.js')
window.GroundsManager		= require('../Games/GroundsManager.js')
// window.DecorationsManager 	= require('../Games/DecorationsManager.js')
window.HudManager 			= require('../Games/HudManager.js')
const StateQuiz				= require('./StateQuiz.js')
var quizPopup = null
var StateInGame = function()
{
	this.ListLevelsName = [
		"HoHap",
		"SinhSan",
		"ThanKinh",
		"RungToc",
		"DauLung",
		"TieuHoa"
	]
	this.levelIndex = 0
	this.isChangingLevel = false
	this.levelCounting = 0
	this.ResetAll()
	this.quizCount = 0
}

StateInGame.prototype.ResetAll = function()
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

	this.changeStateEffect = new PIXI.Graphics()
	this.changeStateEffect.beginFill(0xFFFFFF)
	this.changeStateEffect.drawRect(0,0,Application.getScreenWidth(), Application.getScreenHeight())
	this.changeStateEffect.alpha = 0
	this.invincible = 0
	this.invincibleTicker = 0
}

StateInGame.prototype.ResetCombo = function()
{
	this.combo = 0
}

StateInGame.prototype.ChangeLevel = function()
{
	this.isChangingLevel = true
	GameStates.ChangeLevelName(this.ListLevelsName[this.levelIndex])
	if(++this.levelIndex >= this.ListLevelsName.length)
	{
		this.levelIndex = 0
	}

	this.levelCounting = 0

	this.Destroy()
	ItemsManager.ResetAll()
	this.Init()

	this.invincible = true
	this.invincibleTicker = 3
	
	this.changeStateEffect.alpha = 1
}

StateInGame.prototype.Init = function()
{
	// init quiz
	if(quizPopup == null)
	{
		quizPopup = new StateQuiz()
	}

	if(!this.isSpecialState)
	{
		this.isSpecialState = (GameStates.GetLevel() == 'DacBiet')
		if(this.isSpecialState)
		{
			this.ChangeLevel()
		}
	}

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
	this.stage.addChild(this.changeStateEffect)
	this.stage.addChild(HudManager.stage)

	this.isGameOver = false
}

StateInGame.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateInGame.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
	this.ResetAll()
	dragonBones.PixiFactory._factory = null
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
			if(!this.invincible)
			{
				this.player.speed = 0
				Application.Shake()
				this.ResetCombo()
				this.fadeEffect.alpha = 1
			}
			else
			{
				ScoreManager.life++
			}

			if(ScoreManager.life <= 0 && !this.invincible)
			{ 
				var latestScore = FireBaseManager.getRecord(GameStates.GetLevel())
				if(latestScore < ScoreManager.currentScore)
				{
					FireBaseManager.SaveRecord(ScoreManager.currentScore, GameStates.GetLevel())
				}
				this.isGameOver = true
				this.player.ResetAll()
				if(this.quizCount < 3)
				{
					this.quizCount++
					if(!quizPopup.Show())
					{
						StatesManager.ChangeState(GameStates.stateResult)
					}
				}
				else
				{
					StatesManager.ChangeState(GameStates.stateResult)
				}
				return
			}
		}
		ItemsManager.DeactiveItem(collidedItem)
		if(collidedItem.isLuckyItem){
			this.player.ActiveFrenzy()
			this.fadeEffect.alpha = 0.5
		}
		HudManager.UpdateScore(ScoreManager.currentScore)
		HudManager.UpdateLife(ScoreManager.life)
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
	// this.player.ResetAll()

	ItemsManager.ResetAll()
	// ItemsManager.initialize()
	ScoreManager.ResetAll()
	HudManager.ResetAll()
	HudManager.UpdateLife(ScoreManager.life)

	// this.isGameOver = false
	// this.fadeEffect.alpha = 0

	if(this.isSpecialState)
	{
		GameStates.ChangeLevelName('DacBiet')
	}
	this.isSpecialState = false
	this.isChangingLevel = false
	this.levelIndex = 0
	this.levelCounting = 0
}

StateInGame.prototype.Revive = function()
{
	this.invincible = true
	this.invincibleTicker = 3
	this.isGameOver = false
	this.player.ResetAll()
	HudManager.UpdateLife(++ScoreManager.life)
}

StateInGame.prototype.Update = function(dt)
{
	if(this.isGameOver)	return

	if(this.isSpecialState)
	{
		this.levelCounting += dt
		if(this.levelCounting > Defines.CHANGE_LEVEL_TIMER)
		{
			console.log("Change Level")
			this.ChangeLevel()
			return
		}
	}

	if(this.isChangingLevel)
	{
		if(this.changeStateEffect.alpha > 0)
		{
			this.changeStateEffect.alpha -= Defines.WHITE_FADE_TICKER * dt
			if(this.changeStateEffect.alpha <= 0)
			{
				this.changeStateEffect.alpha = 0
				this.isChangingLevel = false
				console.log("done effect change state")
			}
		}
	}

	if(this.invincibleTicker > 0)
	{
		this.invincibleTicker -= 1 * dt
		if(this.invincibleTicker < 0)
		{
			this.invincible = false
			this.invincibleTicker = 0
		}
	}

	if(this.fadeEffect.alpha > 0)
	{
		this.fadeEffect.alpha -= Defines.RED_FADE_TICKER * dt

		if(this.fadeEffect.alpha <= 0 && this.IsFrenzy())
		{
			this.fadeEffect.alpha = 0.5
		}
	}

	GroundsManager.Update(dt)
	// DecorationsManager.Update(dt)
	this.player.Update(dt)
	ItemsManager.Update(dt, this.isChangingLevel)
}

module.exports = StateInGame