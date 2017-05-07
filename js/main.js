require('pixi.js')
window.firebase = require('firebase')

// dragonBones defines
window.dragonBones			= window.dragonBones || {};
require('./Core/dragonBones/dragonBones.js')
require('./Core/dragonBones/dragonBonesPixi.js')
// main defines
window.FireBaseManager		= require('./Core/FireBaseMgr.js')
window.Application 			= require('./Core/Application.js')

function run(deltaTime){
	deltaTime = deltaTime / (60 * Application.instance.ticker.speed)
	FixedUpdate(deltaTime)
	Update(deltaTime)

	if(Application.isShaking)
	{
		var randomX = Math.random() * 10
		var randomY = Math.random() * 10
		Application.instance.stage.position.set(randomX, randomY)
		if(--Application.shakeTicker < 0)
		{
			Application.isShaking = false
		}
	}
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
var callback = null
var checkReady = function(){

	if(callback)
	{
		clearTimeout(callback)
		callback = null
	}

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
		callback = setTimeout(checkReady, 1000)
	}
}

window.onload = function()
{
	checkReady()
}
