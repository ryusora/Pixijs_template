const Ground = require('./Ground.js')

var GroundsManager = function()
{
	this.groundSprites = []
	this.groundsArray = []
	this.stage = null
	this.position = {x:Defines.PLAYER_START_POS_X, y:Defines.PLAYER_START_POS_Y, z:Defines.PLAYER_START_POS_Z}
	this.groundIndex = 0
}

GroundsManager.prototype.initialize = function()
{
	this.stage = new PIXI.Container()
	var background = new PIXI.Sprite(TextureManager.getTexture("background"))
	background.position.set(Application.getScreenWidth()*0.5, 0)
	background.anchor.set(0.5, 0.3)
	this.stage.addChild(background)
	this.initSprites()
}

GroundsManager.prototype.initSprites = function()
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
			var groundTexture = new PIXI.Texture(texture, new PIXI.Rectangle(0, i * Defines.GROUND_HEIGHT, textureWidth, Defines.GROUND_HEIGHT))
			var sprite = new PIXI.Sprite(groundTexture)
			sprite.anchor.set(0.5, 0.5)
			this.groundSprites.push(sprite)
		}
	}
}

GroundsManager.prototype.GetGround = function()
{
	var ground = null
	for(let i = 0; i < this.groundsArray.length; i++)
	{
		if(!this.groundsArray[i].isActive)
		{
			ground = this.groundsArray[i]
			break
		}
	}

	if(ground == null)
	{
		ground = new Ground()
		this.groundsArray.push(ground)
	}

	return ground
}

GroundsManager.prototype.Update = function(dt)
{
	while(this.position.z - Camera.GetCameraPosZ() < Defines.DISTANCE_Z_MAKE_OBJECT)
	{
		var ground = this.GetGround()
		ground.SetSprite(this.groundSprites[this.groundIndex])
		ground.SetPos(this.position)
		ground.SetActive(true)
		this.stage.addChild(ground.sprite)
		this.groundIndex = (this.groundIndex + 1) % this.groundSprites.length
		this.position.z += Defines.GROUND_SIZE_Z
	}

	// update ground
	for(let i = 0; i < this.groundsArray.length; i++)
	{
		this.groundsArray[i].Update(dt)
		if(i == 0)
		{
			// console.log(this.groundsArray[i].sprite.position.x + ", " + this.groundsArray[i].sprite.position.y)
		}
	}
}

module.exports = new GroundsManager()