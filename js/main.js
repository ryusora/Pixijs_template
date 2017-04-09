require('pixi.js')
require('firebase')
// dragonBones defines
window.dragonBones			= window.dragonBones || {};
require('./Core/dragonBones/dragonBones.js')
require('./Core/dragonBones/dragonBonesPixi.js')
// main defines
window.Application 			= require('./Core/Application.js')
window.InputManager			= require('./Core/InputManager.js')
window.TextureManager 		= require('./Core/TextureManager.js')
window.Defines				= require('./Defines.js');
window.Camera				= require('./Games/Camera.js')
window.StatesManager 		= require('./States/StatesManager.js')
window.GameStates			= require('./States/GameStates.js')

function run(){
	var deltaTime = Application.getDeltaTime()
	FixedUpdate(deltaTime)
	Update(deltaTime)
}

function FixedUpdate(deltaTime)
{
	StatesManager.FixedUpdate(deltaTime)
}

function Update(deltaTime)
{
	StatesManager.Update(deltaTime)
	InputManager.Update(deltaTime)
}


var main = function(){
	StatesManager.ChangeState(GameStates.stateLogo)
	Application.initialize(run)
}

main()