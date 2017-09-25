const Item = require("./Item.js")
const Effect = require("./Effect.js")

const TYPE_ITEM_MAX		= 14
const TYPE_ENEMY_MAX	= 8

const ITEM_IDX 	= 0
const ENEMY_IDX = 1

const TIME_FOR_QUESTION = 120

var ItemsManager = function()
{
	this.initialize()
}

ItemsManager.prototype.initialize = function()
{
	this.questionTimer = 0
	this.shouldSpawnQuestion = false
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
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData(GameStates.GetLevel() + '_enemy_ske'))
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData(GameStates.GetLevel() + '_enemy_tex_data'), TextureManager.getTexture(GameStates.GetLevel() + '_enemy_tex'))

	var items = []
	for(let i = 0; i < TYPE_ITEM_MAX; i++)
	{
		var pool = []
		for(let j = 0; j < Defines.ITEMS_POOL; j++)
		{
			var item = new Item()
			if(i < TYPE_ITEM_MAX - 2)
			{
				item.SetupDragonBones("item_" + (i+1))
			}
			else if(i == TYPE_ITEM_MAX - 2)
			{
				item.SetupDragonBones("lucky_item")
			}
			else
			{
				item.SetupDragonBones("question_item")
			}
			item.type = ITEM_IDX
			item.index = i
			pool.push(item)
		}
		items.push(pool)
	}
	this.items_deactived.push(items)

	var enemies = []
	for(let i = 0; i < TYPE_ENEMY_MAX; i++)
	{
		var pool = []
		for(let j = 0; j < Defines.ITEMS_POOL; j++)
		{
			var item = new Item()
			item.SetupDragonBones("enemy_" + (i+1))
			item.type = ENEMY_IDX
			item.index = i
			pool.push(item)
		}
		enemies.push(pool)
	}
	this.items_deactived.push(enemies)

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

ItemsManager.prototype.GetQuestionItem = function()
{
	var item = this.items_deactived[ITEM_IDX][TYPE_ITEM_MAX - 1].pop()
	if(item)
	{
		this.items_actived.push(item)
		this.frontStage.addChildAt(item.armatureDisplay, 0)
		item.SetActive(true)
	}
	else
	{
		console.log("item null : " + type + "/" +random)
	}
	return item;
}

ItemsManager.prototype.GetItem = function(type)
{
	var random = Math.floor(Math.random()*((type == ENEMY_IDX)?TYPE_ENEMY_MAX:TYPE_ITEM_MAX - 1))
	var item = this.items_deactived[type][random].pop()
	if(item)
	{
		// item.SetDisable(false)
		this.items_actived.push(item)
		this.frontStage.addChildAt(item.armatureDisplay, 0)
		item.SetActive(true)
	}
	else
	{
		console.log("item null : " + type + "/" +random)
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
			this.items_deactived[item.type][item.index].push(item)
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

const MAX_PERCENT = 1000
ItemsManager.prototype.SpawnItem = function(direction)
{
	var type = (Math.floor(Math.random() * MAX_PERCENT)>400)?ENEMY_IDX:ITEM_IDX
	var item = this.shouldSpawnQuestion?this.GetQuestionItem():this.GetItem(type)
	if(item)
	{
		if(this.shouldSpawnQuestion)
		{
			direction = this.directionList[Defines.CENTER_DIRECTION]
			this.shouldSpawnQuestion = false
		}
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

ItemsManager.prototype.SpawnScoreAt = function(pos, score)
{
	ScoreManager.GetItem(score, pos)
}

ItemsManager.prototype.Update = function(dt, isChangingState)
{
	if(!this.shouldSpawnQuestion && this.questionTimer < TIME_FOR_QUESTION)
	{
		this.questionTimer += dt
		if(this.questionTimer >= TIME_FOR_QUESTION)
		{
			this.shouldSpawnQuestion = true
			this.questionTimer = 0
		}
	}
	// check spawn item
	if(!isChangingState)
	{
		this.timer += (dt * ( 1 + GameStates.stateInGame.GetPlayerOffsetSpeed()/Defines.GAME_SPEED))
		if(this.timer >= Defines.SPAWN_ITEM_TIME)
		{
			this.timer = 0
			var randomNumber = Math.floor(Math.random()*this.directionList.length)
			this.SpawnItem(this.directionList[randomNumber])
		}
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

ItemsManager.prototype.DeactiveAllItems = function()
{
	var deActivedItems = []
	for(let idx in this.items_actived)
	{
		deActivedItems.push(this.items_actived[idx])
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
	this.initialize()
	
	dragonBones.PixiFactory.factory.removeDragonBonesData(TextureManager.getDragonbonesData(GameStates.GetLevel() + '_enemy_ske').name)
	dragonBones.PixiFactory.factory.removeTextureAtlasData(TextureManager.getDragonbonesData(GameStates.GetLevel() + '_enemy_tex_data').name, TextureManager.getTexture(GameStates.GetLevel() + '_enemy_tex'))
}

ItemsManager.prototype.CheckCollision = function(box)
{
	for(let idx in this.items_actived)
	{
		if(this.items_actived[idx].CheckCollision(box))
		{
			if(!this.items_actived[idx].isQuestionItem)
			{
				if(this.items_actived[idx].score < 0)
				{
					ScoreManager.life--
				}
				else
				{
					ScoreManager.GetItem(this.items_actived[idx].score, this.items_actived[idx].position)
				}
			}
			return this.items_actived[idx]
		}
	}
	return null
}

module.exports = new ItemsManager()