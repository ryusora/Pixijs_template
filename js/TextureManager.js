require('pixi.js')

function TextureManager()
{
	this.loader = PIXI.loader
	this.resource = this.loader.resources
}

TextureManager.prototype.load = function(listTextures, callback)
{
	for(let i in listTextures)
	{
		this.loader.add(i, listTextures[i])
	}
	this.loader.load( (loader, resource) => {
		if(callback)
			callback()
	})
}

TextureManager.prototype.get = function(textureName)
{
	return this.resource[textureName].texture
}

module.exports = new TextureManager()