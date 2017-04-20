var DecorationsManager = function()
{
	this.listDecorations = []
	this.stage = null
}

DecorationsManager.prototype.Initialize = function()
{
	this.stage = new PIXI.Container()
	// init pool decoration
}

DecorationsManager.prototype.Update = function()
{
	var decorationsCount = this.listDecorations.length
	for(let i = 0; i < decorationsCount; i++)
	{
		this.listDecorations[i].Update()
	}
}

module.exports = new DecorationsManager()