const Score = require("./Score.js")

var ScoreManager = function()
{
    this.stage = new PIXI.Container()
    this.scores_deactived = []
    this.scores_actived = []

    this.currentScore = 0
	this.life = Defines.INITIAL_LIFE
}

ScoreManager.prototype.InitPool = function()
{
	for(let i = 0; i < Defines.ITEMS_POOL; i++)
	{
		var item = new Score()
		item.SetActive(false)
		this.scores_deactived.push(item)
	}
}

ScoreManager.prototype.ResetAll = function()
{
	this.life = Defines.INITIAL_LIFE
	this.currentScore = 0

	var deActivedItems = []
	for(let idx in this.scores_actived)
	{
		this.scores_actived[idx].active = false
		deActivedItems.push(this.scores_actived[idx])
	}

	for(let i = 0; i < deActivedItems.length; i++)
	{
		this.DeactiveItem(deActivedItems[i])
	}
}

ScoreManager.prototype.GetItem = function(score, position)
{
    var scoreItem = this.scores_deactived.pop()
	var isLuckyItem = score == Defines.ITEM_LUCKY_SCORE
	if(isLuckyItem)
	{
		var bonus = GameStates.stateInGame.IsFrenzy()?2:1
		score *= bonus
	}
	this.currentScore += score
	// console.log("Add Score : " + this.currentScore + " with bonus : " + bonus)
	if(scoreItem)
	{
		// score.SetDisable(false)
		this.scores_actived.push(scoreItem)
		this.stage.addChild(scoreItem.sprite)
		scoreItem.SetActive(true)
        scoreItem.SetScore(score)
        scoreItem.SetPosition(position)
		if(GameStates.stateInGame.IsFrenzy() && isLuckyItem)
		{
			scoreItem.ActiveBonusStyle()
		}
		else
		{
			scoreItem.ActiveDefaultStyle()
		}
	}
	return scoreItem;
}

ScoreManager.prototype.DeactiveItem = function(item)
{
	var index = this.scores_actived.indexOf(item)
	if(index > -1 && index < this.scores_actived.length)
	{
		var item = this.scores_actived.splice(index, 1)[0]
		if(item)
		{
			item.ResetAll()
			this.scores_deactived.push(item)
			this.stage.removeChild(item.sprite)
		}
	}
}

ScoreManager.prototype.Update = function(dt)
{
    var activeCount = this.scores_actived.length
    var deactiveScore = []
    for(let i = 0; i < activeCount; ++i)
    {
        var score = this.scores_actived[i]
        score.Update(dt)
        if(!score.isActived)
        {
            deactiveScore.push(score)
        }
    }

    var deactiveCount = deactiveScore.length
    for(let i = 0; i < deactiveCount; ++i)
    {
        this.DeactiveItem(deactiveScore[i])
    }
}

module.exports = new ScoreManager()