const Ground = require('./Ground.js')

var GroundsManager = function()
{
	this.groundSprites = []
	this.groundsArray = []
	this.stage = null
	this.position = {x:Defines.PLAYER_START_POS_X, y:Defines.PLAYER_START_POS_Y, z:Defines.PLAYER_START_POS_Z}
	this.groundIndex = 0
}

GroundsManager.prototype.Initialize = function()
{
	this.stage = new PIXI.Container()
	var background = new PIXI.Sprite(TextureManager.getTexture(GameStates.GetLevel() + "_background"))
	// background.position.set(Application.getScreenWidth()*0.5, 0)
	background.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	background.anchor.set(0.5, 0.5)
	this.stage.addChild(background)
	// this.InitSprites()
}

GroundsManager.prototype.InitSprites = function()
{
	var texture = TextureManager.getTexture("grounds")
	if(texture)
	{
		// clean arrays
		this.groundSprites = []
		// get texture base width + height
		var textureWidth = texture.width
		var textureHeight = texture.height

		// calculate the the texture to split
		var countTexture = textureHeight / Defines.GROUND_HEIGHT
		for(let i = 0; i < countTexture; i++)
		{
			var pool = []
			for(let j = 0; j < Defines.GROUND_POOL_SIZE; j++)
			{
				var groundTexture = new PIXI.Texture(texture, new PIXI.Rectangle(0, i * Defines.GROUND_HEIGHT, textureWidth, Defines.GROUND_HEIGHT))
				var sprite = new PIXI.Sprite(groundTexture)
				sprite.anchor.set(0.5, 0.5)
				var ground = new Ground()
				ground.SetSprite(sprite)
				pool.push(ground)
			}
			this.groundSprites.push(pool)
		}
	}
}

GroundsManager.prototype.GetGround = function(groundIndex)
{
	var pool = this.groundSprites[groundIndex]
	var length = pool.length
	for(let i = 0; i < length; i++)
	{
		if(!pool[i].isActived)
		{
			return pool[i]
		}
	}
	// not enough ground
	var ground = new Ground()
	var texture = TextureManager.getTexture("grounds")
	var groundTexture = new PIXI.Texture(texture, new PIXI.Rectangle(0, groundIndex * Defines.GROUND_HEIGHT, texture.width, Defines.GROUND_HEIGHT))
	var sprite = new PIXI.Sprite(groundTexture)
	ground.SetSprite(sprite)
	pool.push(ground)

	return ground
}

GroundsManager.prototype.Update = function(dt)
{
	/*
	var children = []
	while(this.position.z - Camera.GetCameraPosZ() < Defines.DISTANCE_Z_MAKE_OBJECT)
	{
		var ground = this.GetGround(this.groundIndex)
		ground.SetPos(this.position)
		ground.SetActive(true)
		children.push(ground.sprite)
		this.groundIndex = (this.groundIndex + 1) % this.groundSprites.length
		this.position.z += Defines.GROUND_SIZE_Z
	}

	for(let i = children.length - 1; i >= 0 ; i--)
	{
		this.stage.addChild(children[i])
	}

	// update ground
	for(let i = 0; i < this.groundSprites.length; i++)
	{
		let pool = this.groundSprites[i]
		for(let j = 0; j < pool.length; j++)
		{
			if(!pool[j].Update(dt))
			{
				this.stage.removeChild(pool[j].sprite)
			}
		}
	}
	*/
}

module.exports = new GroundsManager()