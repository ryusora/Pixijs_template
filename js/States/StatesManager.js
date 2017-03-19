const GameStates = require('./GameStates.js')

function StatesManager()
{
	this.prevState 		= null
	this.currentState 	= null

	this.ChangeState = function(state)
	{
		if(this.currentState != null)
		{
			this.prevState = this.currentState
		}
		this.currentState = state
		this.currentState.Init()

		if(this.prevState != null)
		{
			this.prevState.Destroy()
		}
	}

	this.Update = function(dt)
	{
		if(this.currentState != null)
		{
			this.currentState.Update(dt)
		}
	}
}



module.exports = new StatesManager()