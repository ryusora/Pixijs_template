const Vector2 = require('./Games/Vector2.js')

var Defines = function()
{
	// defines game
	this.GAME_SPEED			= 80
	this.SPEED_RATE			= 1.5

	this.INITIAL_LIFE		= 3
	this.RED_FADE_TICKER	= 1
	this.WHITE_FADE_TICKER	= 0.5

	this.CHANGE_LEVEL_TIMER = 60

	this.DECORATION_TIMER	= 0.5
	this.LOGO_TIME 			= 5
	this.TOP_Y_BASE 		= 100
	this.GROUND_Y_BASE 		= 100
	this.GROUND_Y  			= 0
	this.GRAVITY			= {x:0, y:25}
	this.LINE_LENGTH		= 150
	this.SWIPE_OFFSET		= 10
	this.JUMP_FORCE			= {x:0, y:-12}
	this.MOVE_FORCE			= {x:10, y:0}
	this.ITEMS_POOL			= 3
	this.ITEM_OFFSET_Z		= 200
	this.SPAWN_ITEM_TIME	= 1
	this.LEFT_DIRECTION 	= {x:0, y:0}
	this.CENTER_DIRECTION	= {x:0, y:0}
	this.RIGHT_DIRECTION	= {x:0, y:0}

	// STATES
	// CHOOSE CHARACTERS
	this.CC_FEMALE_OFFSET_X 	= Application.getScreenWidth()*0.5 + 100
	this.CC_MALE_OFFSET_X 		= Application.getScreenWidth()*0.5 - 100
	this.CC_OFFSET_POS_Y		= Application.getScreenHeight()*3/4
	this.CHOOSE_BTN_OFFSET_Y 	= Application.getScreenHeight() - 300
	this.CC_MALE_BTN_OFFSET_X 	= Application.getScreenWidth()*0.5 - 80
	this.CC_FEMALE_BTN_OFFSET_X = Application.getScreenWidth()*0.5 + 80

	// CHOOSE LEVELS
	this.CL_BACK_BTN_OFFSET_X	= 100
	this.CL_CHARACTER_OFFSET_Y	= 100
	this.CL_CIRCLE_OFFSET_Y		= 0

	// QUIZ
	this.QUIZ_OFFSET_Y			= -300
	this.QUIZ_ANSWERS_OFFSET_Y	= -150
	this.QUIZ_ANSWERS_OFFSET_X	= -200
	this.QUIZ_OFFSET_Y_SPACING	= 90

	// ALIGNMENT
	this.PLAY_BTN_OFFSET_Y	= 80

	// HUD
	this.HUD_ITEM_Y				= 78
	this.HUD_SCORE_OFFSET_X 	= 0
	this.HUD_LIVE_OFFSET_X		= 0
	this.SCORE_TEXT_OFFSET_X	= 50
	this.LIVE_TEXT_OFFSET_X		= 165

	// FRENZYR
	this.FRENZY_FADE_SPEED			= 5
	this.FRENZY_CAM_SPEED			= 2	
	this.FRENZY_TIME				= 5
	this.MAX_FRENZY_OFFSET_SPEED	= 50
	this.FRENZY_CAM_OFFSET_X		= 0
	this.FRENZY_CAM_OFFSET_Y		= 0
	this.FRENZY_CAM_OFFSET_Z		= 0
	this.MAX_COMBO_COUNT			= 10

	//CAMERA
    this.CAMERA_ON_SCREEN_POS_X = 0.5*Application.getScreenWidth()
    this.CAMERA_ON_SCREEN_POS_Y = 0.325*Application.getScreenHeight()

    this.CAMERA_DELTA_POS_WITH_PLAYER_X = 0
    this.CAMERA_DELTA_POS_WITH_PLAYER_Y = -0.25*Application.getScreenHeight()
    this.CAMERA_DELTA_POS_WITH_PLAYER_Z = -25

    this.CAMERA_ROOT_SCALE_POS_Z = 50

    //PLAYER
    this.PLAYER_START_POS_X = 0
    this.PLAYER_START_POS_Y = 0
    this.PLAYER_START_POS_Z = 0

    this.PLAYER_BOX_DEPTH	= 10

	// Score
	this.SCORE_TIMER		= 0.7
	this.SCORE_SPEED		= 500
	this.ITEM_SCORE			= 5
	this.ITEM_LUCKY_SCORE	= 10

	// Grounds
	this.GROUND_SIZE_Z				= 1
	this.GROUND_SIZE_X				= 75*25
	this.GROUND_HEIGHT				= 20
	this.DISTANCE_ALPHA				= this.ITEM_OFFSET_Z//4*25
	this.DISTANCE_Z_MAKE_OBJECT		= 100//30*25

	this.GROUND_POOL_SIZE			= 10
	this.DECORATION_POOL_SIZE		= 5

	this.UpdateParams = ()=>{
		//calculate left direction
		this.LEFT_DIRECTION = -this.LINE_LENGTH
		//calculate right direction
		this.RIGHT_DIRECTION = this.LINE_LENGTH
		//calculate center direction
		this.CENTER_DIRECTION = 0
	}
	this.UpdateParams()
}

module.exports = new Defines()