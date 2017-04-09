const Item = require("./Item.js")

var ItemsManager = function()
{
	this.items_deactived = []
	this.items_actived = []
	this.frontStage = new PIXI.Container()
	this.backStage = new PIXI.Container()
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
		this.frontStage.addChild(item.armatureDisplay)
		item.SetActive(true)
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
			this.backStage.removeChild(item)
		}
		else{
			console.log(item)
		}
	}
}

ItemsManager.prototype.SpawnItem = function(direction)
{
	var item = this.GetItem()
	if(item)
	{
		item.SetPos({x:direction,y:10,z:Defines.ITEM_OFFSET_Z})
	}
}

ItemsManager.prototype.Update = function(dt)
{
	// check spawn item
	this.timer += dt
	if(this.timer >= Defines.SPAWN_ITEM_TIME)
	{
		console.log("vo day")
		this.timer = 0
		var randomNumber = Math.floor(Math.random()*this.directionList.length)
		this.SpawnItem(this.directionList[randomNumber])
	}

	var deActivedItems = []
	for(let idx in this.items_actived)
	{
		var item = this.items_actived[idx]
		item.Update(dt)
		if(item.shouldPutBackStage && !item.isOnBackStage)
		{
			this.frontStage.removeChild(item)
			item.isOnBackStage = true
			this.backStage.addChild(item.armatureDisplay)
		}

		if(!item.isActived)
		{
			deActivedItems.push(item)
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

ItemsManager.prototype.CheckCollision = function(box)
{
	for(let idx in this.items_actived)
	{
		if(this.items_actived[idx].CheckCollision(box))
		{
			return this.items_actived[idx]
		}
	}
	return null
}

module.exports = new ItemsManager()