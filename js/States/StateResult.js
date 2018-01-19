const Utility = require('../Core/Utility.js')

var StateResult = function()
{
	this.isLoadingDone = false
	this.MAX_USERS = 10
	this.myRank = -1
	this.levelsName = {
		"HoHap"		:"HÔ HẤP",
		"SinhSan"	:"SỨC KHỎE SINH SẢN",
		"ThanKinh"	:"CHÓNG MẶT",
		"RungToc"	:"RỤNG TÓC",
		"DacBiet"	:"ĐẶC BIỆT",
		"DauLung"	:"ĐAU LƯNG",
		"TieuHoa"	:"TIÊU HÓA"
	}
	this.hanhTrinhTitle = null
}

StateResult.prototype.Init = function()
{
	this.leaderboardStage = new PIXI.Container()
	this.leaderboardStage.position.set(0, Application.getScreenHeight()*0.5 + 230)
	this.InitLeaderboard()

	if(this.isLoadingDone == false)
	{
		// Init
		this.stage = new PIXI.Container()
		// init leaderboards
		var bg = new PIXI.Sprite(TextureManager.getTexture('rs_bg'))
		bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
		bg.anchor.set(0.5, 0.5)

		this.total_score = new PIXI.Text(Utility.GetStringFromNumber(FireBaseManager.getRecordTotal()), new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 70,
			fontStyle: 'normal',
			fontWeight: 'bold',
			fill: ['#ffffff'], // red : #51b2d2
			wordWrap: true,
			wordWrapWidth: 750
		}))
		this.total_score.position.set(Application.getScreenWidth()*0.5 - 190, 250)
		this.total_score.anchor.set(0.5, 0.5)

		this.rank = new PIXI.Text(Utility.GetStringFromNumber(this.myRank), new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 70,
			fontStyle: 'normal',
			fontWeight: 'bold',
			fill: ['#ffffff'], // red : #ee175a
			wordWrap: true,
			wordWrapWidth: 750
		}))

		
		this.rank.position.set(Application.getScreenWidth()*0.5 + 190, 250)
		this.rank.anchor.set(0.5, 0.5)

		this.score = new PIXI.Text(Utility.GetStringFromNumber(ScoreManager.currentScore), new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 85,
			fontStyle: 'normal',
			fontWeight: 'bold',
			fill: ['#4a2268'], // red : #ee175a
			wordWrap: true,
			wordWrapWidth: 750
		}))
		
		this.score.anchor.set(0.5, 0.5)
		this.score.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 - 100)

		this.hanhTrinhTitle = new PIXI.Text("HÀNH TRÌNH " + this.levelsName[GameStates.GetLevel()], new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 45,
			fontStyle: 'normal',
			fontWeight: 'bold',
			fill: ['#4a2268'], // red : #ee175a
			wordWrap: true,
			wordWrapWidth: 750,
			align : 'center',
			lineHeight: 50
		}))
		
		this.hanhTrinhTitle.anchor.set(0.5, 0.5)
		this.hanhTrinhTitle.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 - 200)

		var x = Application.getScreenWidth()*0.5 - 120
		var y = 700
		/*
		var replayBtn = new PIXI.Sprite(TextureManager.getTexture("rs_replay_btn"))
		replayBtn.position.set(x, y)
		replayBtn.anchor.set(1, 0.5)
		replayBtn.interactive = true
		replayBtn.on('pointerdown', ()=>{
			if(FireBaseManager.CanEnterState(GameStates.GetLevel()))
			{
				GameStates.stateInGame.RestartGame()
				StatesManager.ChangeState(GameStates.stateInGame)
			}
		})*/

		//x = Application.getScreenWidth()*0.5 - 100
		x = Application.getScreenWidth()*0.5

		var chooseLevelBtn = new PIXI.Sprite(TextureManager.getTexture("rs_chooseLevel"))
		chooseLevelBtn.position.set(x , y)
		chooseLevelBtn.anchor.set(0.5, 0.5)
		chooseLevelBtn.interactive = true
		chooseLevelBtn.on('pointerdown', ()=>{
			GameStates.stateInGame.RestartGame()
			StatesManager.ChangeState(GameStates.stateChooseLevel)
		})

		this.stage.addChild(bg)
		this.stage.addChild(this.hanhTrinhTitle)
		this.stage.addChild(this.score)
		this.stage.addChild(this.total_score)
		this.stage.addChild(this.rank)
		//this.stage.addChild(replayBtn)
		this.stage.addChild(chooseLevelBtn)

		this.isLoadingDone = true
	}
	else
	{
		if(this.myRank == -1) this.myRank = FireBaseManager.myRank
		this.score.text = Utility.GetStringFromNumber(ScoreManager.currentScore)
		this.total_score.text = Utility.GetStringFromNumber(FireBaseManager.getRecordTotal())
		this.hanhTrinhTitle.text = "HÀNH TRÌNH " + this.levelsName[GameStates.GetLevel()]
		this.rank.text = Utility.GetStringFromNumber(this.myRank)
	}

	this.stage.addChild(this.leaderboardStage)

	Application.addChild(this.stage)
	Application.Align(this.stage)
}

StateResult.prototype.InitLeaderboard = function()
{
	// init leader board
	var normalStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#004c6c'],
        wordWrap: true,
        wordWrapWidth: 750
	})

	var myStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#71b6d3'],
        wordWrap: true,
        wordWrapWidth: 750
	})

	var half_width = Application.getScreenWidth()*0.5
	var stt_x,name_x,score_x
	stt_x = half_width - 300
	name_x = half_width - 150
	score_x = half_width + 200
	var y = 30
	var users = null
	try{
		users = FireBaseManager.listUsers
	}catch(e)
	{
		users = null
	}
	
	if(users != null)
	{
		var length = users.length>this.MAX_USERS?this.MAX_USERS:users.length
		quickSort(users, 0, users.length - 1)
		this.myRank = this.FindMyRank(users) // find my rank after sort
		if(this.myRank > 10 || this.myRank <= 0) this.myRank = FireBaseManager.myRank
		for(let i = 0; i < length; i++)
		{
			var style = (users[i].UserName != FireBaseManager.currentUserData.UserName)?normalStyle:myStyle
			var stt = new PIXI.Text((i+1) + ".", style)
			stt.position.set(stt_x, y)
			stt.anchor.set(1, 0.5)
			var strName = (users[i].UserName.length > 5)? users[i].UserName.substring(0, 5) + '.':users[i].UserName
			var name = new PIXI.Text(strName + "", style)
			name.position.set(name_x, y)
			name.anchor.set(0, 0.5)

			var score = new PIXI.Text(Utility.GetStringFromNumber(users[i].Total), style)
			score.position.set(score_x, y)
			score.anchor.set(0.5, 0.5)

			this.leaderboardStage.addChild(stt)
			this.leaderboardStage.addChild(name)
			this.leaderboardStage.addChild(score)

			y+= 40
		}
	}
}

StateResult.prototype.FindMyRank = function(users)
{
	var length = users.length
	for(let i = 0; i < length; ++i)
	{
		if(users[i].UserName == FireBaseManager.currentUserData.UserName)
		{
			return (i + 1)
		}
	}
	return -1;
}
StateResult.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateResult.prototype.Destroy = function()
{
	this.stage.removeChild(this.leaderboardStage)
	Application.removeChild(this.stage)
	this.leaderboardStage = null
}

StateResult.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		if(this.myRank > FireBaseManager.myRank)
			--this.myRank
	}
}

////////////////////////////
var partition = function(arr, left, right)
{
	var i = left, j = right;
	var tmp;
	var pivot = arr[Math.floor((left + right) / 2)].Total// arr[(left + right) / 2];

	while (i <= j) {
		var iScore, jScore
		iScore = arr[i].Total
		while (iScore > pivot)
		{
			i++;
			iScore = arr[i].Total
		}
		jScore = arr[j].Total
		while (jScore < pivot){
			j--
			jScore = arr[j].Total
		}
		if (i <= j) {
		tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
		i++;
		j--;
		}
	}

	return i;
}

var quickSort = function(arr, left, right) {
	var index = partition(arr, left, right)
	if (left < index - 1)
		quickSort(arr, left, index - 1)
	if (index < right)
		quickSort(arr, index, right)
}

module.exports = StateResult