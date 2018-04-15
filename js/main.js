// String.prototype.startsWith||(String.prototype.startsWith=function(a,b){return this.substr(b||0,a.length)===a})

import {Application, GameConfig} from './Core/Application'
import {Defines} from './Defines'
import {InputManager} from './Core/InputManager'
import {StatesManager} from './States/StatesManager'

let application;
let statesMgr;
let inputMgr;
const FIXED_TIME = 1/60;
let fixedDT = 0;
function run(deltaTime){
	deltaTime = deltaTime / (Defines.FPS * application.instance.ticker.speed);
	fixedDT += deltaTime;
	do {
		fixedDT -= FIXED_TIME;
		FixedUpdate(FIXED_TIME);
	} while(fixedDT >= FIXED_TIME);
	Update(deltaTime);
}

function FixedUpdate(deltaTime){
}

function Update(deltaTime){
	statesMgr.Update(deltaTime);
	inputMgr.Update(deltaTime);
}
var readyChecker = null;
var checkReady = function(){
	if(readyChecker) {
		clearTimeout(readyChecker)
		readyChecker = null
	}
	var width = Math.max(window.innerWidth, document.documentElement.clientWidth)
	var height = Math.max(window.innerHeight, document.documentElement.clientHeight)
	if(width != 0 && height != 0){
		application = new Application(new GameConfig());
		application.Initialize(run, width, height, document.body);
		inputMgr = new InputManager(application.instance.view);
		statesMgr = new StatesManager(application);
	}
	else
	{
		readyChecker = setTimeout(checkReady, 1000)
	}
}

window.onload = checkReady
