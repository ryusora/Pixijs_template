require('pixi.js')

export class TextureManager{
	constructor(){
		this.loader = PIXI.loader
		this.resources = this.loader.resources
	}
	ResetLoader(){
		this.loader.reset()
	}
	Load(listTextures, callback){
		for(let i in listTextures)
			this.loader.add(i, listTextures[i]);
		this.loader.load( (loader, resources) => {
			if(callback)
				callback();
		})
	}
	GetTexture(textureName){
		return this.resources[textureName].texture;
	}
}