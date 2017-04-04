const Item = require("./Item.js")

var ItemsManager = function()
{
	this.items_deactived = []
	this.items_actived = []
	this.stage = new PIXI.Container()
	this.timer = 0
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
	}
	return item;
}

ItemsManager.prototype.DeactiveItem = function(item)
{
	var index = this.items_actived.indexOf(item)
	if(index > -1 && index < this.items_actived.length)
	{
		var item = this.items_actived.splice(index, 1)
		this.stage.removeChild(item)
		item.ResetAll()
		this.items_deactived.push(item)
	}
}

ItemsManager.prototype.SpawnItem = function(pos)
{
	var item = this.GetItem()
	if(item)
	{
		item.SetPos(pos)
	}
}

ItemsManager.prototype.Update = function(dt)
{
	// check spawn item
	this.timer += dt
	if(this.timer >= Defines.SPAWN_ITEM_TIME)
	{
		this.timer = 0
		// calculate random pos
		var pos = {x:0, y:0, z:0}
		this.SpawnItem(pos)
	}


	for(let item in this.items_actived)
	{
		this.items_actived[item].Update(dt)
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