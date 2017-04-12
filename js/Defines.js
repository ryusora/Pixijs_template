const Vector2 = require('./Games/Vector2.js')

var Defines = function()
{
	// defines game
	this.GAME_SPEED			= 2

	this.LOGO_TIME 			= 1.5 * 100
	this.TOP_Y_BASE 		= 100
	this.GROUND_Y_BASE 		= 100
	this.GROUND_Y  			= 0
	this.GRAVITY			= {x:0, y:1}
	this.LINE_LENGTH		= 100
	this.SWIPE_OFFSET		= 10
	this.JUMP_FORCE			= {x:0, y:-20}
	this.MOVE_FORCE			= {x:5, y:0}
	this.ITEMS_POOL			= 3
	this.ITEM_OFFSET_Z		= 500
	this.SPAWN_ITEM_TIME	= 1 * 100
	this.LEFT_DIRECTION 	= {x:0, y:0}
	this.CENTER_DIRECTION	= {x:0, y:0}
	this.RIGHT_DIRECTION	= {x:0, y:0}

	//CAMERA
    this.CAMERA_ON_SCREEN_POS_X = 0.5*Application.getScreenWidth()
    this.CAMERA_ON_SCREEN_POS_Y = (450 + Application.ratioOffset.x * 2) * Application.scale

    this.CAMERA_DELTA_POS_WITH_PLAYER_X = 0
    this.CAMERA_DELTA_POS_WITH_PLAYER_Y = (-350 + Application.ratioOffset.x * 2) * Application.scale
    this.CAMERA_DELTA_POS_WITH_PLAYER_Z = -100

    this.CAMERA_ROOT_SCALE_POS_Z = 200

    //PLAYER
    this.PLAYER_START_POS_X = 0
    this.PLAYER_START_POS_Y = 0
    this.PLAYER_START_POS_Z = 0

    this.PLAYER_BOX_DEPTH	= 5

	this.UpdateParams = ()=>{
		//calculate left direction
		this.LEFT_DIRECTION = -this.LINE_LENGTH
		//calculate right direction
		this.RIGHT_DIRECTION = this.LINE_LENGTH
		//calculate center direction
		this.CENTER_DIRECTION = 0
		this.SWIPE_OFFSET = 10 * Application.scale
		this.SWIPE_OFFSET_VERTICAL 		= this.SWIPE_OFFSET * Application.getScreenWidth()/375
		this.SWIPE_OFFSET_HORIZONTAL 	= this.SWIPE_OFFSET * Application.getScreenHeight()/667
	}
	this.UpdateParams()
}

module.exports = new Defines()