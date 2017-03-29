const Character = require('../Games/Character.js')

var StateInGame = function(){
	this.isLoadingDone = false
	this.player = null
	this.stage = null
}

StateInGame.prototype.Init = function(){
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)

	this.player = new Character()
	this.player.InitSprite()
	this.player.SetPos(Application.getScreenWidth()/2, Application.getScreenHeight()/2)

	this.stage.addChild(this.player.armatureDisplay)
}

StateInGame.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateInGame.prototype.Destroy = function(){

}

StateInGame.prototype.Update = function(dt)
{
	this.player.Update(dt)
}

module.exports = StateInGame