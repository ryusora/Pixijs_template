const LevelItem = require("../Games/LevelItem.js")

var upOffset = -50
var StateChooseLevel = function()
{
	this.isLoadingDone = false
	this.currentLevelName = "HoHap"
	this.levels = []
	this.ListNextPosition = []
	this.chosenLevel = null
	this.isAnimating = false
	this.backStage = new PIXI.Container()
	this.midStage = new PIXI.Container()
	this.frontStage = new PIXI.Container()
	this.stage = null
	this.specialLevelUnlock = false
	this.isCheatOn = false
	this.cheatButton = null
	this.ListLevelsName = [
		"HoHap",
		"SinhSan",
		"ThanKinh",
		"RungToc",
		"DacBiet",
		"DauLung",
		"TieuHoa"
	]

	this.ListPosition = [
		{x:Application.getScreenWidth()*0.5 + 120, y:Application.getScreenHeight()*0.5 + 120 + upOffset, scale:1},
		{x:Application.getScreenWidth()*0.5 - 150, y:Application.getScreenHeight()*0.5 + 220 + upOffset, scale:0.8},
		{x:Application.getScreenWidth()*0.5 - 330, y:Application.getScreenHeight()*0.5 + 130 + upOffset, scale:0.7},
		{x:Application.getScreenWidth()*0.5 - 150, y:Application.getScreenHeight()*0.5 - 100 + upOffset, scale:0.6},
		{x:Application.getScreenWidth()*0.5 + 150, y:Application.getScreenHeight()*0.5 - 230 + upOffset, scale:0.6},
		{x:Application.getScreenWidth()*0.5 + 280, y:Application.getScreenHeight()*0.5 - 200 + upOffset, scale:0.7},
		{x:Application.getScreenWidth()*0.5 + 280, y:Application.getScreenHeight()*0.5 - 30 + upOffset, scale:0.8},
	]

	this.ListIndex = []
}

StateChooseLevel.prototype.Init = function()
{
	// Init
	if(this.stage == null)
	{
		this.stage = new PIXI.Container()
		// init background
		var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
		bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
		bg.anchor.set(0.5, 0.5)

		var header = new PIXI.Sprite(TextureManager.getTexture('HEADER_LOGO'))
		header.position.set(Application.getScreenWidth()*0.5, 10)
		header.anchor.set(0.5, 0)

		var defaultStyle = new PIXI.TextStyle({
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
			wordWrapWidth: 750
		})
		var title = new PIXI.Sprite(TextureManager.getTexture('cl_title'))//new PIXI.Text("Chọn Màn Chơi", defaultStyle)
		title.anchor.set(0.15, 0.5)
		title.position.set(0, 300)

		var btnPlay = new PIXI.Sprite(TextureManager.getTexture('cl_ready_btn'))
		btnPlay.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
		btnPlay.anchor.set(0.5, 0.5)
		btnPlay.interactive = true
		btnPlay.on('pointerdown', ()=>{
			if(this.currentLevelName == 'DacBiet')
			{
				if(this.specialLevelUnlock || this.isCheatOn)
				{
					StatesManager.ChangeState(GameStates.stateLoading)
				}
				else
				{
					// show pop up
					this.levels[this.ListIndex[0]].SetActive(false)
				}
			}
			else
			{
				if(FireBaseManager.CanEnterState(this.currentLevelName))
				{
					StatesManager.ChangeState(GameStates.stateLoading)
				}
				else
				{
					this.levels[this.ListIndex[0]].SetActive(false)
				}
			}
		})

		var btnBack = new PIXI.Sprite(TextureManager.getTexture('cl_back_btn'))
		btnBack.position.set(Defines.CL_BACK_BTN_OFFSET_X, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
		btnBack.anchor.set(0.5, 0.5)
		btnBack.interactive = true
		btnBack.on('pointerdown', ()=>{
			StatesManager.ChangeState(GameStates.stateChooseCharacter)
		})

		this.ErrorPopup = new PIXI.Container()
		var rectW = 600
		var rectH = 150
		var rectangle = new PIXI.Graphics()
		rectangle.beginFill(0xffffff)
		rectangle.drawRect(0,0,rectW, rectH)

		this.ErrorPopup.addChild(rectangle)
		this.ErrorPopup.position.set(Application.getScreenWidth()*0.5 - rectW*0.5, Application.getScreenHeight()*0.5 - rectH*0.5 + 365 + upOffset)

		this.unlockText = new PIXI.Text("Bạn cần vượt qua 6 hành trình sẵn có để mở hành trình ĐẶC BIỆT này",
					new PIXI.TextStyle({
						fontFamily: 'Arial',
						fontSize: 25,
						fontStyle: 'normal',
						fontWeight: 'bold',
						lineHeight: 50,
						fill: ['#4a2268'],
						wordWrap: true,
						wordWrapWidth: 500,
						align: 'center'
					}))
		this.unlockText.position.set(rectW*0.5 - 25, rectH*0.5)
		this.unlockText.anchor.set(0.5, 0.5)
		this.ErrorPopup.addChild(this.unlockText)

		var OKBtn = new PIXI.Sprite(TextureManager.getTexture('BTN_OK'))
		OKBtn.position.set(rectW, rectH*0.5)
		OKBtn.anchor.set(0.5, 0.5)
		OKBtn.interactive = true
		OKBtn.on('pointerdown', ()=>{
			this.stage && this.stage.removeChild(this.ErrorPopup)
		})
		this.ErrorPopup.addChild(OKBtn)

		var chooseLevel = new PIXI.Text("Hãy chọn một hành trình bất kỳ",
					new PIXI.TextStyle({
						fontFamily: 'Arial',
						fontSize: 25,
						fontStyle: 'normal',
						fontWeight: 'bold',
						lineHeight: 50,
						fill: ['#4a2268'],
						wordWrap: true,
						wordWrapWidth: 500,
						align: 'center'
					}))
		chooseLevel.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - 185 + upOffset)
		chooseLevel.anchor.set(0.5, 0.5)

		this.stage.addChild(bg)
		this.stage.addChild(header)
		this.stage.addChild(title)
		this.stage.addChild(this.backStage)
		this.stage.addChild(this.midStage)
		this.stage.addChild(this.frontStage)
		this.stage.addChild(chooseLevel)
		this.stage.addChild(btnPlay)
		this.stage.addChild(btnBack)
	}

	if(FireBaseManager.cheatEnabled)
	{
		this.cheatButton = new PIXI.Sprite(TextureManager.getTexture('cc_sound_off_btn'))
		this.cheatButton.position.set(Defines.CL_BACK_BTN_OFFSET_X, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y*2 - 50)
		this.cheatButton.anchor.set(0.5, 0.5)
		this.cheatButton.interactive = true
		this.isCheatOn = false
		this.cheatButton.on('pointerdown', ((btnSound)=>{
			this.isCheatOn = !this.isCheatOn
			console.log("Is cheat on ? " + this.isCheatOn)
			this.cheatButton.texture = TextureManager.getTexture(this.isCheatOn?'cc_sound_on_btn':'cc_sound_off_btn')
		}).bind(this))
		this.stage.addChild(this.cheatButton)
	}
	else if(this.cheatButton != null)
	{
		this.stage.removeChild(this.cheatButton)
	}

	this.CheckUnlockSpecialLevel()
	Application.addChild(this.stage)
	Application.Align(this.stage)

	this.initLevels()
}

StateChooseLevel.prototype.CheckUnlockSpecialLevel = function()
{
	var length = this.ListLevelsName.length
	var count = 0
	for(let i = 0; i < length; i++)
	{
		if(FireBaseManager.IsLevelCompleted(this.ListLevelsName[i]))
		{
			count++
		}
	}

	this.specialLevelUnlock = (count >= (length - 1))
}

StateChooseLevel.prototype.initLevels = function()
{
	if(this.character == null)
	{
		this.character = new PIXI.Sprite(TextureManager.getTexture('cl_characters_' + GameStates.GetCharacterName()))
		this.character.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + Defines.CL_CHARACTER_OFFSET_Y + upOffset)
		this.character.anchor.set(0.5, 0.5)
	}
	else
	{
		this.character.texture = TextureManager.getTexture('cl_characters_' + GameStates.GetCharacterName())
	}

	if(this.circle == null)
	{
		this.circle = new PIXI.Sprite(TextureManager.getTexture('cl_circle'))
		this.circle.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + Defines.CL_CIRCLE_OFFSET_Y + upOffset)
		this.circle.anchor.set(0.5, 0.5)
	}
	if(this.levels.length <= 0)
	{
		this.MAX_LEVELS = 7
		
		for(let i = 0; i < this.MAX_LEVELS; i++)
		{
			var level = new LevelItem(this.ListLevelsName[i], this.ListPosition[i], FireBaseManager.IsLevelCompleted(this.ListLevelsName[i]))
			level.SetActive((i==0), (i==0)?FireBaseManager.IsLevelCompleted(this.ListLevelsName[i]):false)
			this.levels.push(level)
			level.stage.interactive = true
			level.stage.on('pointerdown', ((index)=>{
				this.OnTouchPress(index)
			}).bind(this, i))

			if(i >= 3 && i <= 4)
			{
				this.backStage.addChild(level.stage)
			}
			else
			{
				this.frontStage.addChild(level.stage)
			}

			this.ListIndex.push(i)
			this.ListNextPosition.push(i)
		}
	}

	this.midStage.addChild(this.character)
	this.midStage.addChild(this.circle)
}
StateChooseLevel.prototype.OnTouchPress = function(idx)
{
	if(this.currentLevelName != this.ListLevelsName[idx])
	{
		this.currentLevelName = this.ListLevelsName[idx]
		// reset scale 
		this.levels[this.ListIndex[0]].SetScale(1)
		this.levels[this.ListIndex[0]].SetActive(false)

		this.frontStage.addChild(this.levels[this.ListIndex[3]].stage)
		this.frontStage.addChild(this.levels[this.ListIndex[4]].stage)

		// update list index
		for(var i = 0; i < this.MAX_LEVELS; i++)
		{
			this.ListIndex[i] = (idx + i)%this.MAX_LEVELS
		}
		
		this.backStage.addChild(this.levels[this.ListIndex[3]].stage)
		this.backStage.addChild(this.levels[this.ListIndex[4]].stage)


		this.levels[this.ListIndex[0]].SetScale(1)
		if(this.levels[this.ListIndex[0]].levelName == 'DacBiet')
		{
			this.levels[this.ListIndex[0]].SetActive(this.specialLevelUnlock || this.isCheatOn, this.specialLevelUnlock || this.isCheatOn)
			if(!this.specialLevelUnlock && !this.isCheatOn)
			{
				this.stage.addChild(this.ErrorPopup)
			}
		}
		else
		{
			this.stage.removeChild(this.ErrorPopup)
			this.levels[this.ListIndex[0]].SetActive(true, FireBaseManager.IsLevelCompleted(this.levels[this.ListIndex[0]].levelName))
		}

		// Update position
		this.isAnimating = true
		for(let i = 0; i < this.MAX_LEVELS; i++)
		{
			this.levels[this.ListIndex[i]].MoveTo(this.ListPosition[i])
		}
	}
}

StateChooseLevel.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateChooseLevel.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}
StateChooseLevel.prototype.Update = function(dt)
{
	if(this.isAnimating)
	{
		this.isAnimating = false
		for(let i = 0; i < this.MAX_LEVELS; i++)
		{
			this.levels[i].Update(dt)
			if(!this.levels[i].IsDoneMoving())
			{
				this.isAnimating = true
			}
		}
	}
	else
	{
		if(this.levels[this.ListIndex[0]] != null)
		{
			this.levels[this.ListIndex[0]].Update(dt)
		}
	}
}

module.exports = StateChooseLevel