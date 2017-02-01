require('pixi.js')
const Application 		= require('./Application.js')
window.StatesManager 	= require('./StatesManager.js')
window.GameStates		= require('./GameStates.js')

function run(){
	var deltaTime = Application.getDeltaTime()
	StatesManager.Update(deltaTime)
}


var main = function(){
	StatesManager.ChangeState(GameStates.stateLogo)
	Application.initialize(run)
}

main()