require('pixi.js')

export class GameConfig {
	
	static isWebviewPortrait 	= true;
	static width 				= 750;
	static height 				= 1334;
	static originalWidth 		= 0;
	static originalHeight 		= 0;
}

export class Application {
	constructor(gameConfig){
		this.screenOffset = {x:0, y:0};
		this.scale = 1;
		this.isQuit = false;
		this.ticker = PIXI.ticker.shared;
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

		this.Resize();
		document.body.appendChild(this.renderer.view);
	}
	Initialize(gameLoop){
		this.ticker.add(gameLoop);
	}
	Resize(width, height) {
		let width = window.innerWidth;
		let height = window.innerHeight;
		
		GameConfig.isWebviewPortrait = (width < height)
		GameConfig.originalWidth = width
		GameConfig.originalHeight = height
		if(GameConfig.isWebviewPortrait)
		{
			this.ratio = width / height
			this.instance.renderer.resize(GameConfig.height * this.ratio, GameConfig.height)
			this.screenOffset.x = (this.instance.renderer.width - GameConfig.width) / 2
			this.screenOffset.y = 0
		}
		else
		{
			this.ratio = height / width
			this.instance.renderer.resize(GameConfig.width, GameConfig.width * this.ratio)
			this.screenOffset.x = (this.instance.renderer.height - GameConfig.width) / 2
			this.screenOffset.y = 0
		}
	
		this.Rotate(!GameConfig.isWebviewPortrait)
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
	GetRatioWidth(){ return 375 + this.screenOffset.x; }
	GetRatioHeight(){ return 667 + this.screenOffset.y; }
	GetScreenWidth(){ return this.instance.renderer.width; }
	GetScreenHeight(){ return this.instance.renderer.height; }
	addChild(child){ this.instance.stage.addChild(child); this.Align(child); }
	removeChild(child){ this.instance.stage.removeChild(child); }
}