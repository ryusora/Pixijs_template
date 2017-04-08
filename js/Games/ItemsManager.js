const Item = require("./Item.js")

var ItemsManager = function()
{
	this.items_deactived = []
	this.items_actived = []
	this.stage = new PIXI.Container()
	this.timer = 0
	this.directionList = [Defines.LEFT_DIRECTION, Defines.RIGHT_DIRECTION, Defines.CENTER_DIRECTION]
}

ItemsManager.prototype.InitPool = function()
{
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones()
		this.items_deactived.push(item)
	}
}

ItemsManager.prototype.GetItem = function()
{
	var item = this.items_deactived.pop()
	if(item)
	{
		// item.SetDisable(false)
		this.items_actived.push(item)
		this.stage.addChild(item.armatureDisplay)
		item.SetActive(true)
		console.log("Activate item")
	}
	return item;
}

ItemsManager.prototype.DeactiveItem = function(item)
{
	var index = this.items_actived.indexOf(item)
	if(index > -1 && index < this.items_actived.length)
	{
		var item = this.items_actived.splice(index, 1)[0]
		if(item)
		{
			item.ResetAll()
			this.items_deactived.push(item)
			this.stage.removeChild(item)
			console.log("Deactivate item")
		}
		else{
			console.log("WFT!!!")
			console.log(item)
		}
	}
}

ItemsManager.prototype.SpawnItem = function(direction)
{
	var item = this.GetItem()
	if(item)
	{
		item.SetDirection(direction)
	}
}

ItemsManager.prototype.Update = function(dt)
{
	// check spawn item
	this.timer += dt
	if(this.timer >= Defines.SPAWN_ITEM_TIME)
	{
		this.timer = 0
		var randomNumber = Math.floor(Math.random()*this.directionList.length)
		this.SpawnItem(this.directionList[randomNumber])
	}

	var deActivedItems = []
	for(let item in this.items_actived)
	{
		// console.log()
		this.items_actived[item].Update(dt)
		if(!this.items_actived[item].isActived)
		{
			deActivedItems.push(this.items_actived[item])
		}
	}

	for(let i = 0; i < deActivedItems.length; i++)
	{
		this.DeactiveItem(deActivedItems[i])
	}
}

ItemsManager.prototype.FixedUpdate = function(dt)
{
	for(let item in this.items_actived)
	{
		this.items_actived[item].FixedUpdate(dt)
	}
}

module.exports = new ItemsManager()