require('pixi.js')
require('firebase')
window.Application 			= require('./Core/Application.js')
window.InputManager			= require('./Core/InputManager.js')
window.TextureManager 		= require('./Core/TextureManager.js')
window.Defines				= require('./Defines.js');
window.StatesManager 		= require('./States/StatesManager.js')
window.GameStates			= require('./States/GameStates.js')

function run(){
	var deltaTime = Application.getDeltaTime()
	StatesManager.Update(deltaTime)
}


var main = function(){
	StatesManager.ChangeState(GameStates.stateLogo)
	Application.initialize(run)
}

main()