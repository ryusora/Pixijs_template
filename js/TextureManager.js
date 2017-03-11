

function TextureManager()
{
	this.loader = PIXI.loader
	this.resource = null
}

TextureManager.prototype.load = function(listTextures, callback)
{
	for(let i in listTextures)
	{
		this.loader.add(i, listTextures[i])
	}
	this.loader.load( (loader, resource) => {
		this.resource = resource
		callback()
	})
}

TextureManager.prototype.get = function(textureName)
{
	return this.resource[textureName].texture
}

module.exports = new TextureManager()