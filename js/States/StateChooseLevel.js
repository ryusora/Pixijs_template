const LevelItem = require("../Games/LevelItem.js")

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
		{x:Application.getScreenWidth()*0.5 + 120, y:Application.getScreenHeight()*0.5 + 120, scale:1},
		{x:Application.getScreenWidth()*0.5 - 150, y:Application.getScreenHeight()*0.5 + 220, scale:0.8},
		{x:Application.getScreenWidth()*0.5 - 330, y:Application.getScreenHeight()*0.5 + 130, scale:0.7},
		{x:Application.getScreenWidth()*0.5 - 150, y:Application.getScreenHeight()*0.5 - 100, scale:0.6},
		{x:Application.getScreenWidth()*0.5 + 150, y:Application.getScreenHeight()*0.5 - 230, scale:0.6},
		{x:Application.getScreenWidth()*0.5 + 280, y:Application.getScreenHeight()*0.5 - 200, scale:0.7},
		{x:Application.getScreenWidth()*0.5 + 280, y:Application.getScreenHeight()*0.5 - 30, scale:0.8},
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
			//if(this.currentLevelName != "DacBiet")
			{
				StatesManager.ChangeState(GameStates.stateLoading)
			}
		})

		var btnBack = new PIXI.Sprite(TextureManager.getTexture('cl_back_btn'))
		btnBack.position.set(Defines.CL_BACK_BTN_OFFSET_X, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
		btnBack.anchor.set(0.5, 0.5)
		btnBack.interactive = true
		btnBack.on('pointerdown', ()=>{
			StatesManager.ChangeState(GameStates.stateChooseCharacter)
		})

		this.stage.addChild(bg)
		this.stage.addChild(header)
		this.stage.addChild(title)
		this.stage.addChild(this.backStage)
		this.stage.addChild(this.midStage)
		this.stage.addChild(this.frontStage)
		this.stage.addChild(btnPlay)
		this.stage.addChild(btnBack)
	}
	Application.addChild(this.stage)
	Application.Align(this.stage)

	this.initLevels()
}

StateChooseLevel.prototype.initLevels = function()
{
	if(this.character == null)
	{
		this.character = new PIXI.Sprite(TextureManager.getTexture('cl_characters_' + GameStates.GetCharacterName()))
		this.character.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + Defines.CL_CHARACTER_OFFSET_Y)
		this.character.anchor.set(0.5, 0.5)
	}
	else
	{
		this.character.texture = TextureManager.getTexture('cl_characters_' + GameStates.GetCharacterName())
	}

	if(this.circle == null)
	{
		this.circle = new PIXI.Sprite(TextureManager.getTexture('cl_circle'))
		this.circle.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + Defines.CL_CIRCLE_OFFSET_Y)
		this.circle.anchor.set(0.5, 0.5)
	}
	if(this.levels.length <= 0)
	{
		this.MAX_LEVELS = 7
		
		for(let i = 0; i < this.MAX_LEVELS; i++)
		{
			var level = new LevelItem(this.ListLevelsName[i], this.ListPosition[i])
			level.SetActive((i==0))
			this.levels.push(level)
			level.sprite.interactive = true
			level.sprite.on('pointerdown', ((index)=>{
				this.OnTouchPress(index)
			}).bind(this, i))

			if(i >= 3 && i <= 4)
			{
				this.backStage.addChild(level.sprite)
			}
			else
			{
				this.frontStage.addChild(level.sprite)
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

		this.frontStage.addChild(this.levels[this.ListIndex[3]].sprite)
		this.frontStage.addChild(this.levels[this.ListIndex[4]].sprite)

		// update list index
		for(var i = 0; i < this.MAX_LEVELS; i++)
		{
			this.ListIndex[i] = (idx + i)%this.MAX_LEVELS
		}
		
		this.backStage.addChild(this.levels[this.ListIndex[3]].sprite)
		this.backStage.addChild(this.levels[this.ListIndex[4]].sprite)

		this.levels[this.ListIndex[0]].SetScale(1)
		this.levels[this.ListIndex[0]].SetActive(true)

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
var ticker = 0
var sub = 1
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
			// update chosen level
			if(ticker > 0.5 || ticker < 0)
			{
				sub*=-1
			}
			ticker+=0.02*sub
			this.levels[this.ListIndex[0]].sprite.scale.set(1 + ticker, 1 + ticker)
		}
	}
}

module.exports = StateChooseLevel