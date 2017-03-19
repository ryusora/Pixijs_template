window.TextureManager = require('./TextureManager.js')
var StateLoading = function(){
	this.isLoadingDone = false
}

StateLoading.prototype.Init = function(){
	var textureList = {
		checkerboard: 	'Assets/checkerboard.jpg',
		glowFlare: 		'Assets/glowFlare.png',
		raindrop2flip: 	'Assets/raindrop2flip.png',
		snowflake: 		'Assets/snowflake.png',
		spikey: 		'Assets/spikey.png',
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

}

StateLoading.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		// do something when textures are loaded
	}
}

module.exports = StateLoading