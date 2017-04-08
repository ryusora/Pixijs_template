const Vector2 = require('./Games/Vector2.js')

var Defines = function()
{
	this.LOGO_TIME 			= 1.5 * 100
	this.TOP_Y_BASE 		= 100
	this.GROUND_Y_BASE 		= 100
	this.GROUND_Y  			= Application.getScreenHeight() - this.GROUND_Y_BASE
	this.GRAVITY			= {x:0, y:1}
	this.LINE_LENGTH		= 250
	this.SWIPE_OFFSET		= 10
	this.JUMP_FORCE			= {x:0, y:-18}
	this.MOVE_FORCE			= {x:15, y:0}
	this.ITEMS_POOL			= 3
	this.ITEM_OFFSET_X		= 50
	this.SPAWN_ITEM_TIME	= 1
	this.LEFT_DIRECTION 	= {x:0, y:0}
	this.CENTER_DIRECTION	= {x:0, y:0}
	this.RIGHT_DIRECTION	= {x:0, y:0}

	//CAMERA
    this.CAMERA_ON_SCREEN_POS_X = 0.5*Application.getScreenWidth()
    this.CAMERA_ON_SCREEN_POS_Y = 450

    this.CAMERA_DELTA_POS_WITH_PLAYER_X = 0
    this.CAMERA_DELTA_POS_WITH_PLAYER_Y = -400
    this.CAMERA_DELTA_POS_WITH_PLAYER_Z = -1000
    
    this.CAMERA_ROOT_SCALE_POS_Z = 2000
    
    //PLAYER
    this.PLAYER_START_POS_X = 0
    this.PLAYER_START_POS_Y = 0
    this.PLAYER_START_POS_Z = 0

	this.UpdateParams = ()=>{
		this.GROUND_Y  			= Application.getScreenHeight() - this.GROUND_Y_BASE
		var middle_x			= Application.getScreenWidth()/2
		//calculate direction
		var enemy_left 			= {x:middle_x - this.ITEM_OFFSET_X, y:this.TOP_Y_BASE}
		var enemy_right			= {x:middle_x + this.ITEM_OFFSET_X, y:this.TOP_Y_BASE}
		var enemy_center		= {x:middle_x, y:this.TOP_Y_BASE}
		var character_left 		= {x:middle_x - this.LINE_LENGTH, y:this.GROUND_Y}
		var character_right		= {x:middle_x + this.LINE_LENGTH, y:this.GROUND_Y}
		var character_center	= {x:middle_x, y:this.GROUND_Y}

		//calculate left direction
		this.LEFT_DIRECTION		= new Vector2()
		this.LEFT_DIRECTION.clone(character_left)
		this.LEFT_DIRECTION.sub(enemy_left)
		this.LEFT_DIRECTION.normalize()
		//calculate right direction
		this.RIGHT_DIRECTION	= new Vector2()
		this.RIGHT_DIRECTION.clone(character_right)
		this.RIGHT_DIRECTION.sub(enemy_left)
		this.RIGHT_DIRECTION.normalize()
		//calculate center direction
		this.CENTER_DIRECTION	= new Vector2()
		this.CENTER_DIRECTION.clone(character_center)
		this.CENTER_DIRECTION.sub(enemy_left)
		this.CENTER_DIRECTION.normalize()

		console.log("---------------------------")
		console.log(character_left)
		console.log(enemy_left)
		console.log(this.LEFT_DIRECTION)
		console.log("---------------------------")
		// console.log(this.RIGHT_DIRECTION)
		// console.log(this.CENTER_DIRECTION)
	}
	this.UpdateParams()
}

module.exports = new Defines()