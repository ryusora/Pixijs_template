var StateChooseLevel = function()
{
	this.isLoadingDone = false
	this.currentLevelName = "hohap"
	this.levels = []
}

StateChooseLevel.prototype.Init = function()
{
	// Init
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
}

StateChooseLevel.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateChooseLevel.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateChooseLevel.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
	}
}

module.exports = StateChooseLevel