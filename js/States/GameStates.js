const StateLogo = require('./StateLogo.js')
const StateMainMenu = require('./StateMainMenu.js')
const StateInGame = require('./StateInGame.js')
const StateLoading = require('./StateLoading.js')
const StateQuiz = require('./StateQuiz.js')
const StateChooseCharacter = require('./StateChooseCharacter.js')
const StateChooseLevel = require('./StateChooseLevel.js')
const StateResult = require('./StateResult.js')
const StateTutorial = require('./StateTutorial.js')
const StateInformation = require('./StateInformation.js')

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
	this.stateInformation = new StateInformation()

	this.GetCharacterName = function()
	{
		if(this.stateChooseCharacter != null && typeof(this.stateChooseCharacter) != 'undefined')
			return this.stateChooseCharacter.characterName
		return "male"
	}

	this.GetLevel = function()
	{
		if(this.stateChooseLevel != null && typeof(this.stateChooseLevel) != 'undefined')
			return this.stateChooseLevel.currentLevelName
		return "HoHap"
	}

	this.ChangeLevelName = function(newLevel)
	{
		if(newLevel != null && typeof(newLevel) != 'undefined')
			this.stateChooseLevel.currentLevelName = newLevel
	}
}

module.exports = new GameState()