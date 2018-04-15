require('pixi.js')

export class GameConfig {
	constructor(){
		this.isWebviewPortrait = true;
		this.width 	= 750;
		this.height = 1334;
		this.originalWidth = 0;
		this.originalHeight = 0;
	}
}

export class Application{
	constructor(gameConfig){
		this.screenOffset = {x:0, y:0};
		this.scale = 1;
		this.isQuit = false;
		this.gameConfig = gameConfig;
	}
	Initialize(gameLoop, width, height, parent){
		this.instance = new PIXI.Application({
			width:width, 
			height:height,
			forceCanvas:false
		})
		parent.appendChild(this.instance.view)
		
		this.Resize(width, height)
		this.instance.ticker.add(gameLoop)
		this.SetBackGroundColor(0xffffff);
	}
	Resize(width, height) {
		this.gameConfig.isWebviewPortrait = (width < height)
		this.gameConfig.originalWidth = width
		this.gameConfig.originalHeight = height
		if(this.gameConfig.isWebviewPortrait)
		{
			this.ratio = width / height
			this.instance.renderer.resize(this.gameConfig.height * this.ratio, this.gameConfig.height)
			this.screenOffset.x = (this.instance.renderer.width - this.gameConfig.width) / 2
			this.screenOffset.y = 0
		}
		else
		{
			this.ratio = height / width
			this.instance.renderer.resize(this.gameConfig.height, this.gameConfig.height * this.ratio)
			this.screenOffset.x = (this.instance.renderer.height - this.gameConfig.width) / 2
			this.screenOffset.y = 0
		}
	
		this.Rotate(!this.gameConfig.isWebviewPortrait)
	}
	Rotate(isRotate){
		if (isRotate)
		{
			this.instance.stage.position.set(this.instance.renderer.width / 2, this.instance.renderer.height / 2);
			this.instance.stage.pivot.set(this.instance.renderer.width / 2, this.instance.renderer.height / 2);
			this.instance.stage.rotation = -90 * Math.PI / 180;
		}
		else
		{
			this.instance.stage.pivot.set(0, 0);
			this.instance.stage.position.set(0, 0);
			this.instance.stage.rotation = 0;
		}
	}
	GetDeltaTime(){ return this.instance.ticker.deltaTime; }
	SetBackGroundColor(color){ this.instance.renderer.backgroundColor = color; }
	Align(stage){
		stage.scale.set(this.scale, this.scale);
		stage.position.set(this.GetScreenWidth() / 2, this.GetScreenHeight() / 2);
		stage.pivot.set(this.GetScreenWidth() / 2, this.GetScreenHeight() / 2);
	}
	GetRatioWidth(){ return 375 + this.ratioOffset.x; }
	GetRatioHeight(){ return 667 + this.ratioOffset.y; }
	GetScreenWidth(){ return this.instance.renderer.width; }
	GetScreenHeight(){ return this.instance.renderer.height; }
	addChild(child){ this.instance.stage.addChild(child); this.Align(child); }
	removeChild(child){ this.instance.stage.removeChild(child); }
}