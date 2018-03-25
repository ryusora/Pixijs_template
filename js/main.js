String.prototype.startsWith||(String.prototype.startsWith=function(a,b){return this.substr(b||0,a.length)===a})

window.Application 			= require('./Core/Application.js')
const FIXED_TIME = 0.2;

function run(deltaTime){
	deltaTime = deltaTime / (60 * Application.instance.ticker.speed);
	let fixedDT = deltaTime;
	while(fixedDT > FIXED_TIME) {
		fixedDT -= FIXED_TIME;
		FixedUpdate(FIXED_TIME);
	}
	Update(deltaTime);
}

function FixedUpdate(deltaTime)
{
}

function Update(deltaTime)
{
	StatesManager.Update(deltaTime);
	InputManager.Update(deltaTime);
}

var readyChecker = null
var checkReady = function(){
	if(readyChecker) {
		clearTimeout(readyChecker)
		readyChecker = null
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
	}
	else
	{
		readyChecker = setTimeout(checkReady, 1000)
	}
}

window.onload = checkReady
