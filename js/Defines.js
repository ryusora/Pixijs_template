var Defines = function()
{
	this.LOGO_TIME 			= 1.5 * 100
	this.GROUND_Y_BASE 		= 100
	this.GROUND_Y  			= Application.getScreenHeight() - this.GROUND_Y_BASE
	this.GRAVITY			= {x:0, y:1}
	this.LINE_LENGTH		= 250
	this.SWIPE_OFFSET		= 10
	this.JUMP_FORCE			= {x:0, y:-18}
	this.MOVE_FORCE			= {x:15, y:0}
	this.ITEMS_POOL			= 1
	this.SPAWN_ITEM_TIME	= 1
}

module.exports = new Defines()