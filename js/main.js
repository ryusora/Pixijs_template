require('pixi.js')
window.firebase = require('firebase')

// dragonBones defines
window.dragonBones			= window.dragonBones || {};
require('./Core/dragonBones/dragonBones.js')
require('./Core/dragonBones/dragonBonesPixi.js')
// main defines
window.FireBaseManager		= require('./Core/FireBaseMgr.js')
window.Application 			= require('./Core/Application.js')

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
}

var checkReady = function(){
	var width = Math.max(window.innerWidth, document.documentElement.clientWidth)
	var height = Math.max(window.innerHeight, document.documentElement.clientHeight)
	if(width != 0 && height != 0)
	{
		Application.initialize(run, width, height)
		window.Defines				= require('./Defines.js')
		window.InputManager			= require('./Core/InputManager.js')
		window.TextureManager 		= require('./Core/TextureManager.js')
		window.Camera				= require('./Games/Camera.js')
		window.StatesManager 		= require('./States/StatesManager.js')
		window.GameStates			= require('./States/GameStates.js')
		main()
		FireBaseManager.initialize();
	}
	else
	{
		setTimeout(checkReady, 1000)
	}
}

window.onload = function()
{
	checkReady()
}
