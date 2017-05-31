const Item = require("./Item.js")
const Effect = require("./Effect.js")

const TYPE_ITEM 	= 0
const TYPE_ENEMY_1 	= 1
const TYPE_ENEMY_2 	= 2
const TYPE_ENEMY_3 	= 3
const TYPE_ENEMY_4 	= 4
const TYPE_ENEMY_5 	= 5
const TYPE_MAX	 	= 6

var ItemsManager = function()
{
	this.items_deactived = []
	this.items_actived = []
	this.effects_actived = []
	this.effects_deactived = []
	this.frontStage = new PIXI.Container()
	this.backStage = new PIXI.Container()
	this.backStage.addChild(ScoreManager.stage)
	this.timer = 0
	this.directionList = [Defines.LEFT_DIRECTION, Defines.RIGHT_DIRECTION, Defines.CENTER_DIRECTION]
}

ItemsManager.prototype.InitPool = function()
{
	// init enemy
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('enemy_ske'))
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('enemy_tex_data'), TextureManager.getTexture('enemy_tex'))

	var item_pool = []
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones(TYPE_ITEM)
		item_pool.push(item)
	}
	this.items_deactived.push(item_pool)

	var enemy1_pool = []
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones(TYPE_ENEMY_1)
		enemy1_pool.push(item)
	}
	this.items_deactived.push(enemy1_pool)

	var enemy2_pool = []
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones(TYPE_ENEMY_2)
		enemy2_pool.push(item)
	}
	this.items_deactived.push(enemy2_pool)

	var enemy3_pool = []
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones(TYPE_ENEMY_3)
		enemy3_pool.push(item)
	}
	this.items_deactived.push(enemy3_pool)

	var enemy4_pool = []
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones(TYPE_ENEMY_4)
		enemy4_pool.push(item)
	}
	this.items_deactived.push(enemy4_pool)

	var enemy5_pool = []
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Item()
		item.SetupDragonBones(TYPE_ENEMY_5)
		enemy5_pool.push(item)
	}
	this.items_deactived.push(enemy5_pool)


	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('effect_ske'))
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('effect_tex_data'), TextureManager.getTexture('effect_tex'))

	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var effect = new Effect()
		effect.SetupDragonBones()
		this.effects_deactived.push(effect)
	}

	ScoreManager.InitPool()
}

ItemsManager.prototype.GetItem = function(type)
{
	var item = this.items_deactived[type].pop()
	if(item)
	{
		// item.SetDisable(false)
		this.items_actived.push(item)
		this.frontStage.addChildAt(item.armatureDisplay, 0)
		item.SetActive(true)
	}
	return item;
}

ItemsManager.prototype.DeactiveItem = function(item)
{
	var index = this.items_actived.indexOf(item)
	if(index > -1 && index < this.items_actived.length)
	{
		var item = this.items_actived.splice(index, 1)[0]
		if(item)
		{
			item.ResetAll()
			this.items_deactived[item.type].push(item)
			this.backStage.removeChild(item.armatureDisplay)
			this.frontStage.removeChild(item.armatureDisplay)
		}
		else{
			console.log(item)
		}
	}
}

ItemsManager.prototype.GetEffect = function()
{
	var effect = this.effects_deactived.pop()
	if(effect)
	{
		// effect.SetDisable(false)
		this.effects_actived.push(effect)
		this.backStage.addChild(effect.armatureDisplay)
		effect.SetActive(true)
	}
	return effect;
}

ItemsManager.prototype.DeactiveEffect = function(effect)
{
	var index = this.effects_actived.indexOf(effect)
	if(index > -1 && index < this.effects_actived.length)
	{
		var effect = this.effects_actived.splice(index, 1)[0]
		if(effect)
		{
			effect.ResetAll()
			this.effects_deactived.push(effect)
			this.backStage.removeChild(effect.armatureDisplay)
		}
		else{
			console.log(effect)
		}
	}
}


ItemsManager.prototype.SpawnItem = function(direction)
{
	var type = Math.floor(Math.random() * TYPE_MAX)
	var item = this.GetItem(type)
	if(item)
	{
		item.SetPos({x:direction,y:0,z:Defines.ITEM_OFFSET_Z + Camera.GetCameraPosZ()})
	}
}

ItemsManager.prototype.SpawnEffectAt = function(pos)
{
	var effect = this.GetEffect()
	if(effect)
	{
		effect.SetPos(pos)
	}
}

ItemsManager.prototype.Update = function(dt)
{
	// check spawn item
	this.timer += (dt * ( 1 + GameStates.stateInGame.GetPlayerOffsetSpeed()/Defines.GAME_SPEED))
	if(this.timer >= Defines.SPAWN_ITEM_TIME)
	{
		this.timer = 0
		var randomNumber = Math.floor(Math.random()*this.directionList.length)
		this.SpawnItem(this.directionList[randomNumber])
	}

	this.UpdateItem(dt)
	this.UpdateEffect(dt)

	ScoreManager.Update(dt)
}

ItemsManager.prototype.UpdateEffect = function(dt)
{
	var deActivedEffects = []
	for(let idx in this.effects_actived)
	{
		var effect = this.effects_actived[idx]
		effect.Update(dt)

		if(!effect.isActived)
		{
			deActivedEffects.push(effect)
		}
	}

	for(let i = 0; i < deActivedEffects.length; i++)
	{
		this.DeactiveEffect(deActivedEffects[i])
	}
}

ItemsManager.prototype.UpdateItem = function(dt)
{
	var deActivedItems = []
	for(let idx in this.items_actived)
	{
		var item = this.items_actived[idx]
		item.Update(dt)

		if(item.shouldPutBackStage && !item.isOnBackStage)
		{
			item.isOnBackStage = true
			this.backStage.addChild(item.armatureDisplay)
		}

		if(!item.isActived)
		{
			deActivedItems.push(item)
		}
	}

	for(let i = 0; i < deActivedItems.length; i++)
	{
		this.DeactiveItem(deActivedItems[i])
	}
}

ItemsManager.prototype.FixedUpdate = function(dt)
{
	for(let item in this.items_actived)
	{
		this.items_actived[item].FixedUpdate(dt)
	}
}

ItemsManager.prototype.ResetAll = function()
{
	var deActivedItems = []
	for(let idx in this.items_actived)
	{
		this.items_actived[idx].active = false
		deActivedItems.push(this.items_actived[idx])
	}

	for(let i = 0; i < deActivedItems.length; i++)
	{
		this.DeactiveItem(deActivedItems[i])
	}
}

ItemsManager.prototype.CheckCollision = function(box)
{
	for(let idx in this.items_actived)
	{
		if(this.items_actived[idx].CheckCollision(box))
		{
			// this.SpawnEffectAt(this.items_actived[idx].position)
			if(this.items_actived[idx].score < 0)
			{
				ScoreManager.life--
			}
			else
			{
				ScoreManager.GetItem(this.items_actived[idx].score, this.items_actived[idx].position)
			}
			return this.items_actived[idx]
		}
	}
	return null
}

module.exports = new ItemsManager()