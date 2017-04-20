const Decoration = require('./Decoration.js')
const DECORATION_TYPE_SIZE 	= 3
var decorationType = [
	'log',
	'rock',
	'bush'
]

var DecorationsManager = function()
{
	this.listDecorations = []
	this.stage = null
	this.timer = 0
	this.decorationLocation = [
		{x:-(Defines.LINE_LENGTH * 3), y:0, z:0},
		{x:(Defines.LINE_LENGTH * 3), y:0, z:0}
	]
}

DecorationsManager.prototype.Initialize = function()
{
	this.stage = new PIXI.Container()
	for(let i = 0; i < DECORATION_TYPE_SIZE; i++)
	{
		this.listDecorations[i] = []
	}
}

DecorationsManager.prototype.GetDecoration = function(index)
{
	if (index >= this.listDecorations.length) return null

	let pool = this.listDecorations[index]
	let poolCount = pool.length
	for(let i = 0; i < poolCount; i++)
	{
		if(!pool[i].isActived) return pool[i]
	}

	// not enough item
	var decoration = new Decoration()
	var sprite = new PIXI.Sprite(TextureManager.getTexture(decorationType[index]))
	sprite.anchor.set(0.5, 0.5)
	decoration.SetSprite(sprite)
	this.listDecorations[index].push(decoration)

	return decoration
}

DecorationsManager.prototype.SpawnRandom = function()
{
	var index = Math.floor(Math.random()*DECORATION_TYPE_SIZE)
	var decoration = this.GetDecoration(index)
	if(decoration != null)
	{
		var randomLocation = this.decorationLocation[Math.floor(Math.random()*2)]
		randomLocation.z = Camera.GetCameraPosZ() + Defines.ITEM_OFFSET_Z
		decoration.SetPos(randomLocation)
		decoration.SetActive(true)
		this.stage.addChildAt(decoration.sprite, 0)
	}
}

DecorationsManager.prototype.Update = function(dt)
{
	this.timer -= dt
	if(this.timer < 0)
	{
		this.timer = Defines.DECORATION_TIMER
		this.SpawnRandom()
	}

	var decorationsCount = this.listDecorations.length
	for(let i = 0; i < decorationsCount; i++)
	{
		let pool = this.listDecorations[i]
		let poolCount = pool.length
		for(let j = 0; j < poolCount; j++)
		{
			if(!pool[j].Update())
			{
				this.stage.removeChild(pool[j].sprite)
			}
		}
	}
}

module.exports = new DecorationsManager()