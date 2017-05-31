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

	this.stage.addChild(this.backStage)
	this.stage.addChild(this.frontStage)
	this.InitCharacters()
	//this.InitButton()

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
    var btnMale = new PIXI.Sprite(TextureManager.getTexture('BTN_ACTIVE'))
	btnMale.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnMale.anchor.set(0.5, 0.5)
	btnMale.interactive = true
	btnMale.on('pointerdown', ()=>{
		if(this.characterName != "male")
        {
            // update sprite
            this.characterName = "male"
        }
	})

    this.stage.addChild(btnMale)

    var btnFemale = new PIXI.Sprite(TextureManager.getTexture('BTN_DEACTIVE'))
	btnFemale.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnFemale.anchor.set(0.5, 0.5)
	btnFemale.interactive = true
	btnFemale.on('pointerdown', ()=>{
		if(this.characterName != "female")
        {
            // update sprite
            this.characterName = "female"
        }
	})

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