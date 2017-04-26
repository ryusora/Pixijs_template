const Character 			= require('../Games/Character.js')
window.ItemsManager			= require('../Games/ItemsManager.js')
window.GroundsManager		= require('../Games/GroundsManager.js')
window.DecorationsManager 	= require('../Games/DecorationsManager.js')

var StateInGame = function()
{
	this.isLoadingDone = false
	this.player = null
	this.stage = null
}

StateInGame.prototype.Init = function()
{
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
	Application.SetBackGroundColor(0xe4c29c)

	Defines.UpdateParams()
	Camera.Init()

	GroundsManager.Initialize()
	DecorationsManager.Initialize()

	this.stage.addChild(GroundsManager.stage)
	this.stage.addChild(DecorationsManager.stage)
	this.stage.addChild(ItemsManager.frontStage)

	this.player = new Character()
	this.player.InitSprite()
	this.player.SetPos(Defines.PLAYER_START_POS_X, Defines.PLAYER_START_POS_Y, Defines.PLAYER_START_POS_Z )

	this.stage.addChild(this.player.armatureDisplay)
	this.stage.addChild(ItemsManager.backStage)

	ItemsManager.InitPool()
}

StateInGame.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateInGame.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateInGame.prototype.FixedUpdate = function(dt)
{
	this.player.FixedUpdate(dt)
	ItemsManager.FixedUpdate(dt)

	//check collision
	var collidedItem = ItemsManager.CheckCollision({
		x:this.player.position.x,
		y:this.player.position.y,
		z:this.player.position.z,
		width:this.player.GetWidth(),
		height:this.player.GetHeight(),
		depth:Defines.PLAYER_BOX_DEPTH
	})

	if(collidedItem)
	{
		ItemsManager.DeactiveItem(collidedItem)
	}
}

StateInGame.prototype.GetPlayerPosZ = function()
{
	return this.player.position.z
}

StateInGame.prototype.Update = function(dt)
{
	GroundsManager.Update(dt)
	DecorationsManager.Update(dt)
	this.player.Update(dt)
	ItemsManager.Update(dt)
}

module.exports = StateInGame