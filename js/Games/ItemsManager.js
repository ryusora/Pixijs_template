const Item = require("./Item.js")

var ItemsManager = function()
{
	this.items_deactived = []
	this.items_actived = []
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
		item.SetDisable(false)
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

ItemsManager.prototype.Update = function(dt)
{

}

ItemsManager.prototype.FixedUpdate = function(dt)
{
	
}

module.exports = new ItemsManager()