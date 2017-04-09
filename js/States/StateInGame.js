const Character 			= require('../Games/Character.js')
window.ItemsManager			= require('../Games/ItemsManager.js')

var StateInGame = function(){
	this.isLoadingDone = false
	this.player = null
	this.stage = null
}

StateInGame.prototype.Init = function(){
	Camera.Init()
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)

	this.stage.addChild(ItemsManager.frontStage)
	this.player = new Character()
	this.player.InitSprite()
	// this.player.SetPos(Camera.GetDrawX({x:0, y:0, z:0}), Camera.GetDrawY({x:0, y:0, z:0}), 0)
	this.player.SetPos(Defines.PLAYER_START_POS_X, Defines.PLAYER_START_POS_Y, Defines.PLAYER_START_POS_Z )

	this.stage.addChild(this.player.armatureDisplay)
	this.stage.addChild(ItemsManager.backStage)

	ItemsManager.InitPool()
	// console.log({x:Application.getScreenWidth()*0.5, y:Application.getScreenHeight()*0.5})
	// console.log({x:Camera.GetDrawX({x:0, y:0, z:0}), y:Camera.GetDrawY({x:0, y:0, z:0})})
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

	//check collision
	var isCollide = ItemsManager.CheckCollision({
		x:this.player.position.x,
		y:this.player.position.y,
		z:this.player.position.z,
		width:this.player.GetWidth(),
		height:this.player.GetHeight(),
		depth:Defines.PLAYER_BOX_DEPTH
	})
	if(isCollide)
	{
		console.log("Collide obstacle")
	}
}

module.exports = StateInGame