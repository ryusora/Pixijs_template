const Quiz = require('./Quiz.js')
const MAX_QUIZ_PER_LEVEL = 5



var QuizManager = function()
{
	this.randomQuiz = []
	this.currentIndex = 0
	this.QuizID_Dict = {
		"HoHap"		:1,
		"TieuHoa"	:2,
		"SinhSan"	:3,
		"DauLung"	:4,
		"ThanKinh"	:5,
		"RungToc"	:10
	}
	this.isRequesting = false
}

QuizManager.prototype.ResetQuiz = function(curLevel)
{
	this.randomQuiz = []
	this.currentIndex = 0
	this.responseQuiz = []
	this.RequestQuizList(curLevel)
}
var requestTimeout = null
QuizManager.prototype.RequestQuizList = function(curLevel)
{
	if(window.appBridge){
		this.isRequesting = true
		window.appBridge.RequestQuizList(this.QuizID_Dict[curLevel], ((data)=>{
			this.responseQuiz = data
			this.isRequesting = false
			console.log("Quiz Response")
			console.log(this.responseQuiz)
		}).bind(this))
		if(requestTimeout!=null) clearTimeout(requestTimeout)
		requestTimeout = setTimeout((()=>{
			if(this.isRequesting)
			{
				this.isRequesting = false
				this.responseQuiz = FireBaseManager.quizList
				console.log("Request Timeout")
			}
		}).bind(this), 5000)
	}else
	{
		console.log("Fail to get window.appBridge");
		console.log(window.appBridge)
	}
}

QuizManager.prototype.GetQuizListFromLevel = function(curLevel)
{
	return this.QuizID_Dict[curLevel]
}

QuizManager.prototype.GetRandomQuiz = function(curLevel)
{
	//var quizList = FireBaseManager.quizList
	var quizList = this.responseQuiz
	if(quizList == null || typeof(quizList) == 'undefined') return null
	// if(quizList[curLevel] == null || typeof(quizList[curLevel]) == 'undefined') return null

	var quizLength = quizList.length
	while(this.randomQuiz.length < MAX_QUIZ_PER_LEVEL && this.randomQuiz.length < quizLength)
	{
		var randomIndex = Math.floor((Math.random() * quizLength))
		if(this.randomQuiz.filter(idx => idx == randomIndex).length <= 0)
			this.randomQuiz.push(randomIndex)
	}

	if(this.currentIndex >= this.randomQuiz.length)
		this.currentIndex = 0

	return (quizList)[this.randomQuiz[this.currentIndex++]]
}

QuizManager.prototype.GetQuizCount = function(curLevel)
{
	return (FireBaseManager.IsInitialized())?Object.keys(FireBaseManager.quizList[curLevel]).length:-1
}

QuizManager.prototype.GetQuiz = function(idx)
{
	if(FireBaseManager.quizList == null || typeof(FireBaseManager.quizList == 'undefined')) return null
	return FireBaseManager.quizList["question_" + idx]
}

module.exports = new QuizManager()