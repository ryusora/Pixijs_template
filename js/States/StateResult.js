var StateResult = function()
{
	this.isLoadingDone = false
	this.MAX_USERS = 5
}

StateResult.prototype.Init = function()
{
	// Init
	this.stage = new PIXI.Container()
	Application.addChild(this.stage)
	Application.Align(this.stage)
	// init leaderboards
	var bg = new PIXI.Sprite(TextureManager.getTexture('MENU_BG'))
	bg.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
	bg.anchor.set(0.5, 0.5)

	var board = new PIXI.Sprite(TextureManager.getTexture('rs_board'))
	board.position.set(Application.getScreenWidth()*0.5, 10)
	board.anchor.set(0.5, 0)

	var character = new PIXI.Sprite(TextureManager.getTexture('cl_characters_' + GameStates.GetCharacterName()))
	character.position.set(Application.getScreenWidth()*0.5 + 260, 210)
	character.anchor.set(0.5, 0)

	var title = new PIXI.Sprite(TextureManager.getTexture("rs_title"))
	title.position.set(Application.getScreenWidth()*0.5, 130)
	title.anchor.set(0.5, 0)

	var score_border = new PIXI.Sprite(TextureManager.getTexture("rs_score_border"))
	score_border.position.set(Application.getScreenWidth()*0.5 - 65, 280)
	score_border.anchor.set(0.5, 0.5)

	var hanhTrinh_title = new PIXI.Sprite(TextureManager.getTexture("rs_diem_hanh_trinh"))
	hanhTrinh_title.position.set(Application.getScreenWidth()*0.5 - 65, 400)
	hanhTrinh_title.anchor.set(0.5, 0.5)
	var total_score = new PIXI.Text(FireBaseManager.getRecordTotal()  + "", new PIXI.TextStyle({
		fontFamily: 'Arial',
        fontSize: 70,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#51b2d2'], // red
        wordWrap: true,
        wordWrapWidth: 750
	}))
	total_score.position.set(Application.getScreenWidth()*0.5 - 65, 450)
	total_score.anchor.set(0.5, 0.5)
	var score = new PIXI.Text(ScoreManager.currentScore  + "", new PIXI.TextStyle({
		fontFamily: 'Arial',
        fontSize: 85,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#ee175a'], // red
        wordWrap: true,
        wordWrapWidth: 750
	}))
	//score.position.set(0, 0)
	score.anchor.set(0.5, 0.5)
	score_border.addChild(score)
	var x = Application.getScreenWidth()*0.5 - 280
	var y = 330 + 230
	var replayBtn = new PIXI.Sprite(TextureManager.getTexture("rs_replay_btn"))
	replayBtn.position.set(x, y)
	replayBtn.anchor.set(0, 0.5)
	replayBtn.interactive = true
	replayBtn.on('pointerdown', ()=>{
		GameStates.stateInGame.RestartGame()
		StatesManager.ChangeState(GameStates.stateInGame)
	})

	y+=130

	var chooseLevelBtn = new PIXI.Sprite(TextureManager.getTexture("rs_chooseLevel"))
	chooseLevelBtn.position.set(x, y)
	chooseLevelBtn.anchor.set(0, 0.5)
	chooseLevelBtn.interactive = true
	chooseLevelBtn.on('pointerdown', ()=>{
		GameStates.stateInGame.RestartGame()
		StatesManager.ChangeState(GameStates.stateChooseLevel)
	})

	this.leaderboardStage = new PIXI.Container()
	this.leaderboardStage.position.set(0, Application.getScreenHeight()*0.5 + 230)
	// this.leaderboardStage.anchor.set(0, 0)

	this.stage.addChild(bg)
	this.stage.addChild(board)
	this.stage.addChild(character)
	this.stage.addChild(title)
	this.stage.addChild(score_border)
	this.stage.addChild(hanhTrinh_title)
	this.stage.addChild(total_score)
	this.stage.addChild(replayBtn)
	this.stage.addChild(chooseLevelBtn)
	this.stage.addChild(this.leaderboardStage)
	this.InitLeaderboard()
}

StateResult.prototype.InitLeaderboard = function()
{
	// init leader board
	var normalStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#ee175a'],
        wordWrap: true,
        wordWrapWidth: 750
	})

	var myStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#5a17ee'],
        wordWrap: true,
        wordWrapWidth: 750
	})
	var topten = new PIXI.Text("TOP "+ this.MAX_USERS +" NGƯỜI CAO ĐIỂM NHẤT", normalStyle)
	topten.position.set(Application.getScreenWidth()*0.5, 0)
	topten.anchor.set(0.5, 0.5)

	this.leaderboardStage.addChild(topten)
	var half_width = Application.getScreenWidth()*0.5
	var stt_x,name_x,score_x
	stt_x = half_width - 200
	name_x = half_width - 150
	score_x = half_width + 100
	var y = 60
	var users = null
	try{
		users = Object.keys(FireBaseManager.listUsers)
	}catch(e)
	{
		users = null
	}
	
	if(users != null)
	{
		var length = users.length>this.MAX_USERS?this.MAX_USERS:users.length
		quickSort(users, 0, length - 1)
		console.log(users)
		for(let i = 0; i < length; i++)
		{
			var style = (users[i] != FireBaseManager.currentUser.uid)?normalStyle:myStyle
			var stt = new PIXI.Text((i+1) + ".", style)
			stt.position.set(stt_x, y)
			stt.anchor.set(1, 0.5)
			var strName = (users[i].length > 5)? users[i].substring(0, 5) + '.':users[i]
			var name = new PIXI.Text(strName + "", style)
			name.position.set(name_x, y)
			name.anchor.set(0, 0.5)

			var score = new PIXI.Text(FireBaseManager.listUsers[users[i]].totalScore + "", style)
			score.position.set(score_x, y)
			score.anchor.set(0, 0.5)

			this.leaderboardStage.addChild(stt)
			this.leaderboardStage.addChild(name)
			this.leaderboardStage.addChild(score)

			y+= 50
		}
	}
}
StateResult.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateResult.prototype.Destroy = function()
{
	Application.removeChild(this.stage)
}

StateResult.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		
	}
}

////////////////////////////
var partition = function(arr, left, right)
{
	var i = left, j = right;
	var tmp;
	var pivot = FireBaseManager.listUsers[arr[Math.floor((left + right) / 2)]].totalScore// arr[(left + right) / 2];

	while (i <= j) {
		var iScore, jScore
		iScore = FireBaseManager.listUsers[arr[i]].totalScore
		while (iScore > pivot)
		{
			i++;
			iScore = FireBaseManager.listUsers[arr[i]].totalScore
		}
		jScore = FireBaseManager.listUsers[arr[j]].totalScore
		while (jScore < pivot){
			j--
			jScore = FireBaseManager.listUsers[arr[j]].totalScore
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