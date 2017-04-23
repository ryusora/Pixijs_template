
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
	// loading texture
	var textureList = {
		'mainChar_ske'		:'Assets/characters/mainChar_ske.json',
		'mainChar_tex_data'	:'Assets/characters/mainChar_tex.json',
		'mainChar_tex'		:'Assets/characters/mainChar_tex.png',
		'enemy_ske'			:'Assets/characters/Enemy_ske.json',
		'enemy_tex_data'	:'Assets/characters/Enemy_tex.json',
		'enemy_tex'			:'Assets/characters/Enemy_tex.png',
		'coins_ske'			:'Assets/items/coins_ske.json',
		'coins_tex_data'	:'Assets/items/coins_tex.json',
		'coins_tex'			:'Assets/items/coins_tex.png',
		'grounds'			:'Assets/backgrounds/grounds.png',
		'background'		:'Assets/backgrounds/bg.jpg',
		'log'				:'Assets/backgrounds/log.png',
		'rock'				:'Assets/backgrounds/rock.png',
		'bush'				:'Assets/backgrounds/bush.png',
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