
var StateLoading = function(){
	this.isLoadingDone = false
	this.loadingIcon = null;
}

StateLoading.prototype.Init = function(){
	// init loading icon
	this.loadingIcon = new PIXI.Sprite(TextureManager.get('LOADING'))
	this.loadingIcon.width = 100
	this.loadingIcon.height = 100
	this.loadingIcon.anchor.set(0.5)
	this.loadingIcon.x = (Application.getScreenWidth()/2)
	this.loadingIcon.y = (Application.getScreenHeight()/2)
	Application.addChild(this.loadingIcon)
	// loading texture
	var textureList = {
		'MainCharacter'	:'Assets/characters/mainCharacter.png',
		'egg'			:'Assets/characters/egg.png',
		'chicken'		:'Assets/characters/chicken.png',
		'bg_1'			:'Assets/backgrounds/1_bg.png',
		'bg_2'			:'Assets/backgrounds/2_bg.png',
		'bg_3'			:'Assets/backgrounds/3_bg.png',
		'bg_4'			:'Assets/backgrounds/4_bg.png',
		'bg_5'			:'Assets/backgrounds/5_bg.png',
		'bg_6'			:'Assets/backgrounds/6_bg.png',
		'bg_7'			:'Assets/backgrounds/7_bg.png',
		'bg_8'			:'Assets/backgrounds/8_bg.png',
		'bg_9'			:'Assets/backgrounds/9_bg.png',
		'bg_10'			:'Assets/backgrounds/10_bg.png',
		'bg_11'			:'Assets/backgrounds/11_bg.png',
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
	Application.removeChild(this.loadingIcon)
	this.loadingIcon = null
}

StateLoading.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		// do something when textures are loaded
		StatesManager.ChangeState(GameStates.stateInGame)
	}
	else
	{
		// rotate loading icon
		this.loadingIcon.rotation += dt * 0.1
	}
}

module.exports = StateLoading