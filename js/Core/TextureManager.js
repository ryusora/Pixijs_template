require('pixi.js')

function TextureManager()
{
	this.loader = PIXI.loader
	this.resources = this.loader.resources
}

TextureManager.prototype.load = function(listTextures, callback)
{
	for(let i in listTextures)
	{
		this.loader.add(i, listTextures[i])
	}
	this.loader.load( (loader, resources) => {
		if(callback)
			callback()
	})
}

TextureManager.prototype.get = function(textureName)
{
	return this.resources[textureName].texture
}

module.exports = new TextureManager()