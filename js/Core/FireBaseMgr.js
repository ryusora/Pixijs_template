function FireBaseMgr()
{
	this.defaultApp = null
	this.database = null
	this.currentUser = null
	this.quizList = null
	this.initializeStep = 0
	this.userPref = null
	this.listUsers = null
	this.currentUserPref = null
	this.currentUserData = null
}

FireBaseMgr.prototype.IsInitialized = function()
{
	return (this.initializeStep > 1)
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
		// catcheggs // remove bacause forget password
		// apiKey: "AIzaSyCxByIYPGU6bmXnG_fVknGAx5ouqLzxb0Y",
		// authDomain: "catcheggs-ba7c0.firebaseapp.com",
		// databaseURL: "https://catcheggs-ba7c0.firebaseio.com",
		// storageBucket: "catcheggs-ba7c0.appspot.com",
		// messagingSenderId: "144968775208"
	};

	this.defaultApp = firebase.initializeApp(config)
	this.database = firebase.database()
	// sign-in anonymously
	// firebase.auth().signInAnonymously().catch(function(error) {
	// 	// Handle Errors here.
	// 	console.log('login failed with reason ' + error.message)
	// });
	firebase.auth().onAuthStateChanged(user=>{
		if(user)
		{
			this.currentUser = user
			console.log("log in success : " + user.uid )
			// get userPref
			this.userPref = this.database.ref("users")
			this.userPref.once("value", (snapshot) =>{
				console.log("load users : " + JSON.stringify(snapshot.val()) )
				this.listUsers = snapshot.val()
				this.initializeStep++
			})

			this.currentUserPref = this.database.ref('/users/' + this.currentUser.uid)
			this.currentUserPref.once('value', (snapshot) => {
				console.log('user : ' + this.currentUser.uid + ' - value change ')
				console.log(snapshot.val())

				this.currentUserData = snapshot.val()
			})

			// get QUIZs database
			this.database.ref("quizs").once("value", (snapshot) =>{
				this.quizList = snapshot.val()
				this.initializeStep++
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
			});
		}
	})
}

FireBaseMgr.prototype.isLogin = function()
{
	return (this.currentUser != null)
}

FireBaseMgr.prototype.SaveRecord = function(record, state)
{
	if(this.currentUser)
	{
		// update score
		if(this.currentUserData == null
		|| typeof(this.currentUserData.totalScore) == 'undefined' 
		|| this.currentUserData.totalScore == null)
			this.currentUserData = {totalScore:0}
		if(this.currentUserData[state] == null
		|| typeof(this.currentUserData[state]) == 'undefined')
			this.currentUserData[state] = {score:0}
		this.currentUserData.totalScore += record
		this.currentUserData[state].score = record

		
		this.currentUserPref.child(state).set(this.currentUserData)

		this.currentUserPref.child(state).once('value', (snapshot)=>{
			console.log("abc : " + JSON.stringify(snapshot.val()))
		})

		this.currentUserPref.set({
			"totalScore":this.currentUserData.totalScore
		})

		this.userPref.once("value", (snapshot) =>{
			console.log("update list users : " + JSON.stringify(snapshot.val()) )
			console.log(snapshot.val())
			this.listUsers = snapshot.val()
		})

		this.userPref.once('value')
	}
}

FireBaseMgr.prototype.getRecord = function(state)
{
	if(this.currentUserData != null
	&& this.currentUserData[state] != null
	&& this.currentUserData[state].score != null
	)
	{
		return this.currentUserData[state].score
	}
	return 0
}

FireBaseMgr.prototype.getRecordTotal = function()
{
	if(this.currentUserData != null
	&& this.currentUserData.totalScore != null
	)
	{
		return this.currentUserData.totalScore
	}
	return 0
}

module.exports = new FireBaseMgr()