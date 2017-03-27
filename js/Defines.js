var Defines = function()
{
	this.LOGO_TIME 		= 1.5 * 100
	this.GROUND_Y_BASE 	= 100
	this.GROUND_Y  		= Application.getScreenHeight() - this.GROUND_Y_BASE
	this.GRAVITY		= {x:0, y:1}
}

module.exports = new Defines()