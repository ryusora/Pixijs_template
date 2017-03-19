require('pixi.js')
require('firebase')
const Application 		= require('./Application.js')
const FireBaseMgr 		= require('./FireBaseMgr.js')
window.StatesManager 	= require('./States/StatesManager.js')
window.GameStates		= require('./States/GameStates.js')

function run(){
	var deltaTime = Application.getDeltaTime()
	StatesManager.Update(deltaTime)
}


var main = function(){
	StatesManager.ChangeState(GameStates.stateLogo)
	Application.initialize(run)
	FireBaseMgr.initialize()
}

main()