function FireBaseMgr()
{
	this.defaultApp = null
	this.database = null
	this.currentUser = null
	this.quizList = null
	this.initializeStep = 0
	this.usersPref = null
	this.currentUserPref = null
	this.cheatEnabled = false
	this.currentUserData = {
		"HoHap":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"SinhSan":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"TieuHoa":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"ThanKinh":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"RungToc":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"DauLung":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"DacBiet":{
			"lockTime":null,
			"quizCount":0,
			"score":0,
			"isCompleted":false
		},
		"FullName":"Default Account",
		"UserName":"defaultAccount",
		"totalScore":0
	}
	this.listUsers = []
	this.BrandID_Dict = {
		"HoHap"		:1,
		"TieuHoa"	:2,
		"SinhSan"	:3,
		"DauLung"	:4,
		"ThanKinh"	:5,
		"RungToc"	:10,
		"DacBiet"	:11
	}

	this.myRank = -1
}

FireBaseMgr.prototype.UpdateListUser = function(users)
{
	if(users != null && users.length > 0)
	{
		this.listUsers = []
		for(var i in users)
		{
			this.listUsers.push({
				"Total":user[i].totalScore,
				"FullName":user[i].FullName,
				"UserName":user[i].UserName
			})
		}
	}
}

FireBaseMgr.prototype.initialize = function()
{
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBDq-M1o_5B-ELr2_suPg6q_EPLtIahfKU",
		authDomain: "testabottapp.firebaseapp.com",
		databaseURL: "https://testabottapp.firebaseio.com",
		projectId: "testabottapp",
		storageBucket: "testabottapp.appspot.com",
		messagingSenderId: "508686023016"
	};

	this.defaultApp = firebase.initializeApp(config)
	this.database = firebase.database()
	firebase.auth().onAuthStateChanged(user=>{
		if(user)
		{
			this.currentUser = user
			// get userPref
			this.usersPref = this.database.ref("app_users")

			if(window.appBridge){
				console.log("Set up UserProfile")
				console.log(window.appBridge.UserProfile)
				this.currentUser.UserId = window.appBridge.UserProfile.id
				this.currentUser.FullName = window.appBridge.UserProfile.FullName
				this.currentUser.UserName = window.appBridge.UserProfile.UserName
				this.currentUserData.FullName = window.appBridge.UserProfile.FullName
				this.currentUserData.UserName = window.appBridge.UserProfile.UserName
				window.appBridge.RequestTop10Ranking((data, myRank)=>{
					console.log("Get Top 10 onLine")
					console.log(data)
					this.listUsers = data
					this.myRank = myRank
				}, (e)=>{
					console.log("Get top 10 failed from appBridge")
					console.log(e)
					this.listUsers = []
				})
			}
			else{
				console.log("failed to get AppBridge")
				this.currentUser.UserId = this.currentUser.uid
			}

			this.currentUserPref = this.database.ref('/app_users/' + (this.currentUser.UserId || this.currentUser.uid))
			this.currentUserPref.once('value', (snapshot) => {
				var userData = snapshot.val()
				var localUserData = JSON.parse(localStorage.getItem("UserData"))
				localUserData = localUserData || this.currentUserData
				if(userData != null && localUserData.totalScore < userData.totalScore)
				{
					console.log("Init online user")
					this.currentUserData = userData
					localStorage.setItem("UserData", JSON.stringify(this.currentUserData))
				}
				else
				{
					console.log("Init offline user")
					this.currentUserData = localUserData
					this.currentUserData.FullName = window.appBridge.UserProfile.FullName
					this.currentUserData.UserName = window.appBridge.UserProfile.UserName
					this.currentUserPref.set(this.currentUserData)
				}
				console.log("Current User")
				console.log(this.currentUserData)
			})

			// get QUIZs database
			this.database.ref("quiz_new").once("value", (snapshot) =>{
				this.quizList = snapshot.val()
			}, (reason)=>
			{
				// failed
				console.log(reason)
			})

			this.database.ref("cheatEnabled").once("value", (snapshot) =>{
				this.cheatEnabled = snapshot.val() || false
			}, (reason)=>
			{
				// failed
				console.log(reason)
			})
		}
		else
		{
			console.log("Try to sign in again");
			// sign-in anonymously
			firebase.auth().signInAnonymously().catch(function(error) {
				// Handle Errors here.
				console.log('login failed with reason ' + error.message)
				// offline
				var userData = JSON.parse(localStorage.getItem("UserData"))
				this.currentUserData = userData || this.currentUserData
				console.log("UserData init offline")
				console.log(this.currentUserData)
				if(window.appBridge)
				{
					this.currentUser.UserId = window.appBridge.UserProfile.id
					this.currentUser.FullName = this.currentUser.FullName
					this.currentUser.UserName = this.currentUser.UserName
					this.currentUserData.FullName = this.currentUser.FullName
					this.currentUserData.UserName = this.currentUser.UserName
					window.appBridge.RequestTop10Ranking((data, myRank)=>{
							console.log("Get Top 10 offline")
							console.log(data)
							this.listUsers = data || []
							this.myRank = myRank
					},(e)=>{
						console.log("Get top 10 failed from appBridge")
						console.log(e)
						this.listUsers = []
					})
				}
			});
		}
	})
}

FireBaseMgr.prototype.isLogin = function()
{
	return (this.currentUser != null)
}

FireBaseMgr.prototype.CanEnterState = function(state)
{
	if(this.currentUserData[state].lockTime != null)
	{
		var currentDateTime = (new Date()).getTime()
		var diffTime = currentDateTime - this.currentUserData[state].lockTime
		var result = (diffTime > 14400000 ) //  4 * 60 * 60 * 1000 // 4 hours
		if(result)
		{
			// reset count
			this.currentUserData[state].quizCount = 0
			this.currentUserData[state].lockTime = null
		}
		return result
	}
	return true
}

FireBaseMgr.prototype.SetComplete = function(levelName)
{
	this.currentUserData[levelName].isCompleted = true
	if(this.currentUserPref != null)
		this.currentUserPref.set(this.currentUserData)
	else
		localStorage.setItem("UserData", JSON.stringify(this.currentUserData))
}

FireBaseMgr.prototype.IsLevelCompleted = function(levelName)
{
	if(this.currentUserData != null
	&& this.currentUserData[levelName] != null)
	{
		if(typeof(this.currentUserData[levelName].isCompleted) != 'undefined')
			return this.currentUserData[levelName].isCompleted
	}
	return false
}

FireBaseMgr.prototype.CountQuiz = function(state = null)
{
	if(state != null)
	{
		this.currentUserData[state].quizCount++
		
		if(this.currentUserData[state].quizCount >= 1)
		{
			this.currentUserData[state].lockTime = (new Date()).getTime()
		}
		
		if(this.currentUserPref != null)
			this.currentUserPref.set(this.currentUserData)
		else
			localStorage.setItem("UserData", JSON.stringify(this.currentUserData))
	}
}

FireBaseMgr.prototype.SaveRecord = function(record, state)
{
	// update score
	this.currentUserData.totalScore += (record - this.currentUserData[state].score)
	this.currentUserData[state].score = record

	if(window.appBridge){
		// window.appBridge.PostScoreTotal(this.currentUserData.totalScore) // temporarily removed
		window.appBridge.PostScoreInBrand(this.currentUserData[state].score, this.BrandID_Dict[state])
	}
	if(this.currentUserPref != null)
		this.currentUserPref.set(this.currentUserData)
	localStorage.setItem("UserData", JSON.stringify(this.currentUserData))
	this.UpdateLeaderboardScore()
}

FireBaseMgr.prototype.UpdateLeaderboardScore = function()
{
	var isUserInList = false
	for(var i in this.listUsers)
	{
		if(this.listUsers[i].UserName === this.currentUserData.UserName)
		{
			console.log("User in list")
			this.listUsers[i].Total = this.currentUserData.totalScore
			isUserInList = true
			return
		}
	}
	if(!isUserInList)
		this.listUsers.push({
			"Total":this.currentUserData.totalScore,
			"FullName":this.currentUserData.FullName,
			"UserName":this.currentUserData.UserName
		})
	console.log("User not in list")
}

FireBaseMgr.prototype.getRecord = function(state)
{
	return this.currentUserData[state].score
}

FireBaseMgr.prototype.getRecordTotal = function()
{
	return this.currentUserData.totalScore
}

module.exports = new FireBaseMgr()