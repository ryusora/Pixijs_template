const Character = require('../Games/Character.js')

var StateInGame = function(){
	this.isLoadingDone = false
	this.player = null
}

StateInGame.prototype.Init = function(){
	ParalaxBackgrounds.Init()
	ParalaxBackgrounds.Display()
	this.player = new Character()
	this.player.InitSprite(TextureManager.get('MainCharacter'))
	this.player.SetPos(Application.getScreenWidth()/2, Application.getScreenHeight()/2)
}

StateInGame.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateInGame.prototype.Destroy = function(){

}

StateInGame.prototype.Update = function(dt)
{

}

module.exports = StateInGame