
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
	Application.addChild(this.loadingIcon)
	// loading texture
	var textureList = {
		'mainChar_ske'		:'Assets/characters/mainChar_ske.json',
		'mainChar_tex_data'	:'Assets/characters/mainChar_tex.json',
		'mainChar_tex'		:'Assets/characters/mainChar_tex.png',
		'enemy_ske'			:'Assets/characters/Enemy_ske.json',
		'enemy_tex_data'	:'Assets/characters/Enemy_tex.json',
		'enemy_tex'			:'Assets/characters/Enemy_tex.png',
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