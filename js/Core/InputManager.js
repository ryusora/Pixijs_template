var InputManager = function()
{
	this.x = 0
	this.y = 0
	this.deltaX = 0
	this.deltaY = 0
	Application.instance.view.addEventListener('touchstart', this.OnTouchStart)
	Application.instance.view.addEventListener('touchmove', this.OnTouchMove)
	Application.instance.view.addEventListener('touchend', this.OnTouchEnd)
}

InputManager.prototype.OnTouchStart = function()
{
	console.log("Touch Start")
}

InputManager.prototype.OnTouchMove = function()
{
	console.log("Touch Move")
}

InputManager.prototype.OnTouchEnd = function()
{
	console.log("Touch End")
}

module.exports = new InputManager()