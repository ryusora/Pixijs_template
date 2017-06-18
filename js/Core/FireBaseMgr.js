function FireBaseMgr()
{
	this.defaultApp = null
	this.database = null
	this.currentUser = null
	this.quizList = null
	this.initializeStep = 0
	this.userPref = null
	this.listUsers = null
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
			// get QUIZs database
			this.database.ref("quizs").once("value", (snapshot) =>{
				console.log("load quizs : " + JSON.stringify(snapshot.val()) )
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
		
		this.userPref.child(this.currentUser.uid).set({
			state:{
				"score":record
			}
		})

		// update score
		if(this.listUsers != null)
		{
			if(typeof(this.listUsers[this.currentUser.uid]) == 'undefined' || typeof(this.listUsers[this.currentUser.uid].totalScore) == 'undefined')
				this.listUsers[this.currentUser.uid].totalScore = 0
			this.listUsers[this.currentUser.uid].totalScore += record
		}

		this.userPref.child(this.currentUser.uid).set({
			"totalScore":this.listUsers[this.currentUser.uid].totalScore
		})
	}
}

FireBaseMgr.prototype.getRecord = function()
{
	if(this.currentUser && this.listUsers != null && typeof(this.listUsers[this.currentUser.uid]) != 'undefined' && this.listUsers[this.currentUser.uid].totalScore != null)
	{
		return this.listUsers[this.currentUser.uid].totalScore
	}
	return 0
}

module.exports = new FireBaseMgr()