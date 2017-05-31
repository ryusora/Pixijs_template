
var StateLoading = function(){
	this.isLoadingDone = false
	this.loadingIcon = null;
}

StateLoading.prototype.Init = function(){
	// init loading icon
	this.loadingIcon = new PIXI.Sprite(TextureManager.getTexture('LOADING'))
	this.loadingIcon.width = 100
	this.loadingIcon.height = 100
	this.loadingIcon.anchor.set(0.5)
	this.loadingIcon.x = (Application.getScreenWidth()/2)
	this.loadingIcon.y = (Application.getScreenHeight()/2)
	this.stage = new PIXI.Container()
	this.stage.addChild(this.loadingIcon)
	Application.addChild(this.stage)
	Application.Align(this.stage)

	var characterName = GameStates.stateChooseCharacter.characterName
	var currentLevel = GameStates.stateChooseLevel.currentLevelName
	// loading texture
	var textureList = {
		// HUD
		'hud_bg'			:'Assets/HUD/hud_bar_bg.png',
		'hud_live'			:'Assets/HUD/hud_bar_live.png',
		'hud_score'			:'Assets/HUD/hud_bar_score.png',
		'hud_pause'			:'Assets/HUD/hud_btn_pause.png',
		// effect
		'effect_ske'		:'Assets/items/effect_ske.json',
		'effect_tex_data'	:'Assets/items/effect_tex.json',
		'effect_tex'		:'Assets/items/effect_tex.png',
		// Tutorial

		// Character
		'mainChar_ske'		:'Assets/characters/' + characterName + '/mainChar_ske.json',
		'mainChar_tex_data'	:'Assets/characters/' + characterName + '/mainChar_tex.json',
		'mainChar_tex'		:'Assets/characters/' + characterName + '/mainChar_tex.png',
		// BG
		'background'		:'Assets/backgrounds/' + currentLevel + '/bg.png',
		// Enemy
		'enemy_ske'			:'Assets/enemy/' + currentLevel + '/enemy_ske.json',
		'enemy_tex_data'	:'Assets/enemy/' + currentLevel + '/enemy_tex.json',
		'enemy_tex'			:'Assets/enemy/' + currentLevel + '/enemy_tex.png',
		/*
		'grounds'			:'Assets/backgrounds/grounds.png',
		'log'				:'Assets/backgrounds/log.png',
		'rock'				:'Assets/backgrounds/rock.png',
		'bush'				:'Assets/backgrounds/bush.png',
		*/
	}

	TextureManager.load(textureList, ()=>{
		this.isLoadingDone = true
	})
}

StateLoading.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateLoading.prototype.Destroy = function(){
	Application.removeChild(this.stage)
	this.loadingIcon = null
}

StateLoading.prototype.Update = function(dt)
{
	// if(this.isLoadingDone && FireBaseManager.isInitialized)
	if(this.isLoadingDone)
	{
		// do something when textures are loaded
		StatesManager.ChangeState(GameStates.stateInGame)
		// StatesManager.ChangeState(GameStates.stateQuiz)
	}
	else
	{
		// rotate loading icon
		this.loadingIcon.rotation += dt * 0.1
	}
}

module.exports = StateLoading