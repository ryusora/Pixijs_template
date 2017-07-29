var StateInformation = function()
{
	this.isLoadingDone = false
}

StateInformation.prototype.Init = function()
{
	// Init
    if(!this.isLoadingDone)
    {
        this.stage = new PIXI.Container()
        // init tutorial
        this.screen = new PIXI.Sprite(TextureManager.getTexture('INFO_' + GameStates.GetLevel()))
        this.screen.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
        this.screen.anchor.set(0.5, 0.5)
        var btnOK = new PIXI.Sprite(TextureManager.getTexture('BTN_OK'))
		btnOK.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + 600)
		btnOK.anchor.set(0.5, 0.5)
		btnOK.interactive = true
		btnOK.on('pointerdown', ()=>{
			StatesManager.ChangeState(GameStates.stateInGame)
		})

        window.btn_OK_Debug = btnOK
        this.isLoadingDone = true
        this.stage.addChild(this.screen)
        this.stage.addChild(btnOK)
    }
    else
    {
        this.screen.texture = TextureManager.getTexture('INFO_' + GameStates.GetLevel())
    }
    Application.addChild(this.stage)
    Application.Align(this.stage)
}

StateInformation.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateInformation.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateInformation.prototype.Update = function(dt)
{
}

module.exports = StateInformation