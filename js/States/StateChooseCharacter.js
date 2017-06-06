var StateChooseCharacter = function()
{
	this.isLoadingDone = false
	this.characterName = "male"
}

StateChooseCharacter.prototype.Init = function()
{
	// Init
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
	this.frontStage = new PIXI.Container()
	this.backStage = new PIXI.Container()

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
	// var title = new PIXI.Sprite()//new PIXI.Text("Chọn Nhân Vật", defaultStyle)
	// title.anchor.set(0.5, 0.5)
	// title.position.set(Application.getScreenWidth()*0.5, 100)

	var title = new PIXI.Sprite(TextureManager.getTexture('cc_title'))//new PIXI.Text("Chọn Màn Chơi", defaultStyle)
	title.anchor.set(0.15, 0.5)
	title.position.set(0, 300)

	this.stage.addChild(bg)
	this.stage.addChild(header)
	this.stage.addChild(title)
	this.stage.addChild(this.backStage)
	this.stage.addChild(this.frontStage)
	this.InitCharacters()
	this.InitButton()

    this.isLoadingDone = true
}

StateChooseCharacter.prototype.InitCharacters = function()
{
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('ChooseCharacters_ske'))
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('ChooseCharacters_tex_data'), TextureManager.getTexture('ChooseCharacters_tex'))

	this.maleDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("maleCharacter")
	this.maleDisplay.position.set(Defines.CC_MALE_OFFSET_X, Defines.CC_OFFSET_POS_Y)
	this.maleDisplay.animation.play("moveIn", 1)

	this.femaleDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("femaleCharacter")
	this.femaleDisplay.position.set(Defines.CC_FEMALE_OFFSET_X, Defines.CC_OFFSET_POS_Y)
	this.femaleDisplay.animation.play("moveIn", 1)
	if(this.characterName == "male")
	{
		this.frontStage.addChild(this.maleDisplay)
		this.backStage.addChild(this.femaleDisplay)
	}
	else
	{
		this.backStage.addChild(this.maleDisplay)
		this.frontStage.addChild(this.femaleDisplay)
	}
}
StateChooseCharacter.prototype.InitButton = function()
{
    // init male button
    var btnMale = new PIXI.Sprite(TextureManager.getTexture('cc_male_icon'))
	btnMale.position.set(Defines.CC_MALE_BTN_OFFSET_X, Defines.CHOOSE_BTN_OFFSET_Y)
	btnMale.anchor.set(0.5, 0.5)
	btnMale.interactive = true
	btnMale.on('pointerdown', ()=>{
		if(this.characterName != "male")
        {
            // update sprite
            this.characterName = "male"
        }
		StatesManager.ChangeState(GameStates.stateChooseLevel)
	})

    this.stage.addChild(btnMale)

    var btnFemale = new PIXI.Sprite(TextureManager.getTexture('cc_female_icon'))
	btnFemale.position.set(Defines.CC_FEMALE_BTN_OFFSET_X, Defines.CHOOSE_BTN_OFFSET_Y)
	btnFemale.anchor.set(0.5, 0.5)
	btnFemale.interactive = true
	btnFemale.on('pointerdown', ()=>{
		if(this.characterName != "female")
        {
            // update sprite
            this.characterName = "female"
        }
		StatesManager.ChangeState(GameStates.stateChooseLevel)
	})

	var btnPlay = new PIXI.Sprite(TextureManager.getTexture('cc_ready_btn'))
	btnPlay.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnPlay.anchor.set(0.5, 0.5)
	btnPlay.interactive = true
	btnPlay.on('pointerdown', ()=>{
		StatesManager.ChangeState(GameStates.stateChooseLevel)
	})

	var btnSound = new PIXI.Sprite(TextureManager.getTexture('cc_sound_on_btn'))
	btnSound.position.set(Defines.CL_BACK_BTN_OFFSET_X, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnSound.anchor.set(0.5, 0.5)
	btnSound.interactive = true
	btnSound.on('pointerdown', ()=>{
		//StatesManager.ChangeState(GameStates.stateChooseCharacter)
	})

	var btnHint = new PIXI.Sprite(TextureManager.getTexture('cc_hint_btn'))
	btnHint.position.set(Defines.CL_BACK_BTN_OFFSET_X, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnHint.anchor.set(0.5, 0.5)
	btnHint.interactive = true
	btnHint.on('pointerdown', ()=>{
		//StatesManager.ChangeState(GameStates.stateChooseCharacter)
	})

	this.stage.addChild(btnPlay)
	this.stage.addChild(btnSound)
	this.stage.addChild(btnFemale)
}

StateChooseCharacter.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateChooseCharacter.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateChooseCharacter.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
	}
}

module.exports = StateChooseCharacter