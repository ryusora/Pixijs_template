function FireBaseMgr()
{
	this.defaultApp = null
	this.database = null
	this.currentUser = null
	this.quizList = null
	this.isInitialized = false
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
	firebase.auth().signInAnonymously().catch(function(error) {
		// Handle Errors here.
		console.log('login failed with reason ' + error.message)
	});
	firebase.auth().onAuthStateChanged(user=>{
		if(user)
		{
			this.currentUser = user
			console.log("log in success : " + user.uid )
			// get QUIZs database
			this.database.ref("quizs").once("value", (snapshot) =>{
				console.log("load : " + JSON.stringify(snapshot.val()) )
				this.quizList = snapshot.val()
				this.isInitialized = true
			}, (reason)=>
			{
				// failed
				console.log(reason)
			})
		}
		else
		{
			console.log("User is signed out")
		}
	})
}

FireBaseMgr.prototype.isLogin = function()
{
	return (this.currentUser != null)
}

FireBaseMgr.prototype.login = function(isGoogle = true)
{
	// login request
	var provider = (isGoogle?(new firebase.auth.GoogleAuthProvider()):(new firebase.auth.FacebookAuthProvider()));

	firebase.auth().signInWithPopup(provider).then((result) => {
		this.currentUser = result.user
		console.log('sign in successful with user : ' + this.currentUser.displayName)
		this.saveRecord(1)
		console.log(this.getRecord())
	}).catch(function(error) {
		// Handle Errors here.
		console.error(error.message)
		// sign in with anonymous if error
		firebase.auth().signinAnonymously().catch(error=>{
			console.error(error.message)
		})

		firebase.auth().onAuthStateChanged(user=>{
			if(user)
			{
				this.currentUser = user
			}
			else
			{
				console.log("User is signed out")
			}
		})
	});
}

FireBaseMgr.prototype.saveRecord = function(record)
{
	if(this.currentUser)
	{
		this.database.ref('users/' + this.currentUser.uid).set({
			highestScore:record
		})
	}
}

FireBaseMgr.prototype.getRecord = function()
{
	if(this.currentUser)
	{
		var score = 0
		var job = []
		job.push( new Promise( (resolve, reject) =>{
			this.database.ref('users/' + this.currentUser.uid).once('value').then(snapshot=>{
				score = snapshot.val().highestScore
				resolve(true)
			})
		}))
		var next = false
		Promise.all(job).then(_=>{
			next = true
		}).catch(e=>{
			console.log(e)
		})
		while(!next)
		{
			// do something
			console.log('count')
		}
		return score
	}
	return null
}

module.exports = new FireBaseMgr()