const Character 			= require('../Games/Character.js')
window.ItemsManager			= require('../Games/ItemsManager.js')
window.Camera				= require('../Games/Camera.js')

var StateInGame = function(){
	this.isLoadingDone = false
	this.player = null
	this.stage = null
}

StateInGame.prototype.Init = function(){
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)

	this.stage.addChild(ItemsManager.stage)
	this.player = new Character()
	this.player.InitSprite()
	this.player.SetPos(0, 0, 0)

	this.stage.addChild(this.player.armatureDisplay)

	ItemsManager.InitPool()
	Camera.Init()
}

StateInGame.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateInGame.prototype.Destroy = function(){

}

StateInGame.prototype.FixedUpdate = function(dt)
{
	this.player.FixedUpdate(dt)
	ItemsManager.FixedUpdate(dt)
}

StateInGame.prototype.Update = function(dt)
{
	this.player.Update(dt)
	ItemsManager.Update(dt)
}

module.exports = StateInGame