const StateLogo = require('./StateLogo.js')
const StateMainMenu = require('./StateMainMenu.js')
const StateInGame = require('./StateInGame.js')
const StateLoading = require('./StateLoading.js')

var GameState = function(){
	this.stateLogo = new StateLogo()
	this.stateMainMenu = new StateMainMenu()
	this.stateInGame = new StateInGame()
	this.stateLoading = new StateLoading()
}

module.exports = new GameState()