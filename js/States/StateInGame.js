const Character 			= require('../Games/Character.js')
window.ScoreManager 		= require("../Games/ScoreManager.js")
window.ItemsManager			= require('../Games/ItemsManager.js')
window.GroundsManager		= require('../Games/GroundsManager.js')
// window.DecorationsManager 	= require('../Games/DecorationsManager.js')
window.HudManager 			= require('../Games/HudManager.js')
const StateQuiz				= require('./StateQuiz.js')
const CompletePopup			= require('../Games/CompletePopup.js')
var quizPopup = null
var completePopup = null
var StateInGame = function()
{
	this.currentSpeedUpIdx = 0
	this.speedUpTicker = 0
	this.listSpeedUpTime = [
		30,
		90,
		180,
		300,
		300
	]

	this.ListLevelsName = [
		"RungToc",
		"ThanKinh",
		"HoHap",
		"DauLung",
		"TieuHoa",
		"SinhSan"
	]

	this.ListUnlockScore = {
		"HoHap"		:10000,
		"SinhSan"	:3000,
		"ThanKinh"	:3000,
		"RungToc"	:3000,
		"DauLung"	:3000,
		"TieuHoa"	:6000
	}
	
	this.cameraInitPos = {
		"HoHap":{
			x:0,
			y:-328,
			z:-25,
			item_offset_z:321,
			camPosY:449.55
		},
		"SinhSan":{
			x:0,
			y:-400,
			z:-25,
			item_offset_z:321,
			camPosY:316.55
		},
		"ThanKinh":{
			x:0,
			y:-393,
			z:-25,
			item_offset_z:321,
			camPosY:322.55
		},
		"RungToc":{
			x:0,
			y:-499,
			z:-25,
			item_offset_z:321,
			camPosY:112.55
		},
		"DauLung":{
			x:0,
			y:-449,
			z:-25,
			item_offset_z:321,
			camPosY:205.55
		},
		"TieuHoa":{
			x:0,
			y:-416,
			z:-25,
			item_offset_z:321,
			camPosY:263.55
		}
	}
	this.shouldSpawnQuestion = false // in 2 minutes each

	this.levelIndex = 0
	this.isChangingLevel = false
	this.levelCounting = 0
	this.ResetAll()
	this.currentLevelName = null

	this.quizCount = 0
}

StateInGame.prototype.ResetAll = function()
{
	this.currentSpeedUpIdx = 0
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

StateInGame.prototype.InitCamera = function()
{
	Camera.InitOffset(this.cameraInitPos[this.currentLevelName])
	Defines.CAMERA_ON_SCREEN_POS_Y = this.cameraInitPos[this.currentLevelName].camPosY
	Defines.ITEM_OFFSET_Z = this.cameraInitPos[this.currentLevelName].item_offset_z
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

	if(completePopup == null)
	{
		completePopup = new CompletePopup()
	}

	this.currentLevelName = GameStates.GetLevel()

	if(!this.isSpecialState)
	{
		this.isSpecialState = (this.currentLevelName == 'DacBiet')
		if(this.isSpecialState)
		{
			this.ChangeLevel()
		}
		// Init old score
		ScoreManager.currentScore = FireBaseManager.getRecord(this.currentLevelName)
	}
	this.InitCamera()

	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
	Application.SetBackGroundColor(0xe4c29c)

	Defines.UpdateParams()

	GroundsManager.Initialize()
	HudManager.Initialize()
	HudManager.UpdateLife(ScoreManager.life)
	HudManager.UpdateScore(ScoreManager.currentScore)
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
	this.quizCount = 0
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
	if(this.isGameOver 
	|| HudManager.IsPaused 
	|| (completePopup != null && completePopup.IsOnScreen)
	|| (quizPopup != null && quizPopup.IsOnScreen))
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
				var currentLevel = this.isSpecialState?"DacBiet":this.currentLevelName
				FireBaseManager.SaveRecord(ScoreManager.currentScore, currentLevel)
				this.isGameOver = true
				this.player.ResetAll()
				// count quiz
				if(++this.quizCount <= 3)//(FireBaseManager.CanEnterState(currentLevel))
				{
					quizPopup.Show(()=>{
						this.Revive()
					}, ()=>{
						if(this.isSpecialState)
						{
							GameStates.ChangeLevelName('DacBiet')
						}
						FireBaseManager.CountQuiz(currentLevel)
						StatesManager.ChangeState(GameStates.stateResult)
					},
						this.isSpecialState?this.currentLevelName:null
					)
				}
				else
				{
					if(this.isSpecialState)
					{
						GameStates.ChangeLevelName('DacBiet')
					}
					StatesManager.ChangeState(GameStates.stateResult)
				}
				ItemsManager.DeactiveAllItems()
				return
			}
		}
		ItemsManager.DeactiveItem(collidedItem)
		if(!this.IsFrenzy()) this.combo++

		if(collidedItem.isQuestionItem)
		{
			quizPopup.Show(()=>{
				ItemsManager.SpawnScoreAt(this.player.position, 10)
				HudManager.UpdateScore(ScoreManager.currentScore)
			}, null, this.isSpecialState?this.currentLevelName:null)
			return
		}

		// if(collidedItem.isLuckyItem || this.combo >= Defines.MAX_COMBO_COUNT){
		// 	this.ResetCombo()
		// 	this.player.ActiveFrenzy()
		// 	this.fadeEffect.alpha = 0.5
		// }
		HudManager.UpdateScore(ScoreManager.currentScore)
		HudManager.UpdateLife(ScoreManager.life)

		if(!this.isSpecialState && !FireBaseManager.IsLevelCompleted(this.currentLevelName) && ScoreManager.currentScore >= this.ListUnlockScore[this.currentLevelName])
		{
			// Complete level
			FireBaseManager.SetComplete(this.currentLevelName)

			// show popup completed
			completePopup.Show(this.currentLevelName)
		}
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
	GameStates.ChangeLevelName(this.currentLevelName)
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
	this.speedUpTicker = 0
	this.invincibleTicker = 0
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
	if(this.isGameOver 
	|| HudManager.IsPaused 
	|| (completePopup != null && completePopup.IsOnScreen)
	|| (quizPopup != null && quizPopup.IsOnScreen))	
	{
		return
	}

	if(this.isSpecialState)
	{
		this.levelCounting += dt
		if(this.levelCounting > Defines.CHANGE_LEVEL_TIMER - 3) // flicking for 3 seconds
		{
			if(!this.isChangingLevel)
			{
				this.changeStateEffect.alpha -= Defines.RED_FADE_TICKER * dt
				if(this.changeStateEffect.alpha <= 0)
				{
					this.changeStateEffect.alpha = 0.5
				}
			}
		}

		if(this.levelCounting > Defines.CHANGE_LEVEL_TIMER)
		{
			console.log("Change Level")
			this.ChangeLevel()
			return
		}
	}

	if(!this.IsFrenzy())
	{
		this.speedUpTicker += dt
		if(this.speedUpTicker >= this.listSpeedUpTime[this.currentSpeedUpIdx])
		{
			this.speedUpTicker = 0
			let length = this.listSpeedUpTime.length
			if(++this.currentSpeedUpIdx > length - 1)
			{
				this.currentSpeedUpIdx = 0
			}
			else if (this.currentSpeedUpIdx < length - 1)
			{
				this.player.ActiveFrenzy()
				this.fadeEffect.alpha = 0.5
			}
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