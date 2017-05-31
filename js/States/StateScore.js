var StateScore = function(){
	this.isLoadingDone = false
	this.stage = new PIXI.Container()
}

StateScore.prototype.Init = function(){
	var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
	bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	bg.anchor.set(0.5, 0.5)
	var btnPlay = new PIXI.Sprite(TextureManager.getTexture('BTN_PLAY'))
	btnPlay.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight() - Defines.PLAY_BTN_OFFSET_Y)
	btnPlay.anchor.set(0.5, 0.5)
	btnPlay.on('click', ()=>{
		StatesManager.ChangeState(GameStates.stateLoading)
	})
	this.stage.addChild(bg)
	this.stage.addChild(btnPlay)
}

StateScore.prototype.IsLoadDone = function()
{
	return isLoadingDone
}

StateScore.prototype.Destroy = function(){
	this.stage = null
}

StateScore.prototype.Update = function(dt)
{

}

module.exports = StateScore