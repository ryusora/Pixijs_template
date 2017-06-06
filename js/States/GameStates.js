const StateLogo = require('./StateLogo.js')
const StateMainMenu = require('./StateMainMenu.js')
const StateInGame = require('./StateInGame.js')
const StateLoading = require('./StateLoading.js')
const StateQuiz = require('./StateQuiz.js')
const StateChooseCharacter = require('./StateChooseCharacter.js')
const StateChooseLevel = require('./StateChooseLevel.js')
const StateResult = require('./StateResult.js')
const StateTutorial = require('./StateTutorial.js')

var GameState = function(){
	this.stateLogo = new StateLogo()
	this.stateMainMenu = new StateMainMenu()
	this.stateInGame = new StateInGame()
	this.stateLoading = new StateLoading()
	//this.stateQuiz = new StateQuiz()
	this.stateChooseCharacter = new StateChooseCharacter()
	this.stateChooseLevel = new StateChooseLevel()
	this.stateResult = new StateResult()
	this.stateTutorial = new StateTutorial()
}

module.exports = new GameState()