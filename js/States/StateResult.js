var StateResult = function()
{
	this.isLoadingDone = false
}

StateResult.prototype.Init = function()
{
	// Init
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
}

StateResult.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateResult.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateResult.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		
	}
}

module.exports = StateResult