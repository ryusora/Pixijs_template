require('pixi.js')
require('firebase')
window.Defines				= require('./Defines.js');
window.Application 			= require('./Application.js')
window.StatesManager 		= require('./States/StatesManager.js')
window.GameStates			= require('./States/GameStates.js')
window.ParalaxBackgrounds 	= require('./Games/ParalaxBackgrounds.js')
window.TextureManager 		= require('./TextureManager.js')

function run(){
	var deltaTime = Application.getDeltaTime()
	StatesManager.Update(deltaTime)
}


var main = function(){
	StatesManager.ChangeState(GameStates.stateLogo)
	Application.initialize(run)
}

main()