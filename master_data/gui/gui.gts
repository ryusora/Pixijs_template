
//-----------------------------------------------------------------------------
// DEFINITIONS
//-----------------------------------------------------------------------------

DATA_TYPE TEXT_LIST "TextData"
{
	SET_LANG "EN"
	TEXT_FILE "..\text\text.ods"
}

DATA_TYPE LIST "Boolean"
{
	0 = "FALSE"
	1 = "TRUE"
}

DATA_TYPE LIST "Font"
{
	0 = "Font 1"
	1 = "Font 2"
	2 = "Font 3"
	3 = "Font 4"
	4 = "Font 5"
}

DATA_TYPE LIST "TextAlign"
{
	0 = "Left"
	1 = "Right"
	2 = "Center"
}

DATA_TYPE LIST "Sprites"
{
	0 = "preload"
	1 = "bg"
	2 = "game"
	3 = "gameover"
}

DATA_TYPE LIST "AlignmentSprites"
{
	0 = "preload_portrait"
	1 = "preload_landscape"
	2 = "loading_bg"
}

//-----------------------------------------------------------------------------
/// Gui data
//-----------------------------------------------------------------------------

// --- GUI_GfxItem: paint a sprite animation or frame
TEMPLATE OBJECT_LAYER "GUI_GfxItem"
{
	ID 200

	SPRITE "../sprite/preload.sprite"
	SPRITE "../sprite/bg.sprite"
	SPRITE "../sprite/game.sprite"
	SPRITE "../sprite/gameover.sprite"

	SET SPRITE PARAM[0]
	SET MODULE -1
	SET FRAME PARAM[1]
	SET ANIM PARAM[2]
	SET AFRAME 0
	SET RECT_AREA 0 0 5 5 RGB(0, 255, 255)

	PARAMS
	{
		//graph common parameters
		0 "SpriteId"          "Sprite id"                                                                       TYPE "Sprites" EXPORT INT8
		0 "FrameId"           "frame id, if it is an anim -1:loop -2:play once -3:play once and disappear"      TYPE FRAMESDESC[PARAM[0]] EXPORT INT16
		-1 "AnimId"            "anim id, if it is a frame set it to -1"                                         TYPE ANIMSDESC[PARAM[0]] EXPORT INT8
		1 "Visible"           "if the object is visible or not"                                                 TYPE "Boolean" EXPORT INT8
	}

	EXPORT_FORMAT
	{
		TEMPLATE_ID   UINT8
		LAYER_POS_XY  INT16
		LAYER_ANCHOR  UINT8
		PARAMS		  CUSTOM
	}
}

// --- TextareaItem: used to display texts
TEMPLATE OBJECT_LAYER "GUI_TextItem"
{
	ID 201

	SET MODULE -1
	SET FRAME 0
	SET RECT_AREA 0 0 PARAM[2] PARAM[3] RGB(0, 255, 255)

	PARAMS
	{
		-1 "Text id"            "ID of text" TYPE "TextData" EXPORT INT16
		30 "Text size"          "Size of text" EXPORT INT16
		50 "Width"             	"Area width in pixels"  FLAGS {W} EXPORT INT16
		50 "Height"            	"Area height in pixels" FLAGS {H} EXPORT INT16
		0 "Font"              	"Font used for DrawString" TYPE "Font" EXPORT INT8
		0 "RED"    				"Text Red Color" EXPORT INT8
		0 "GREEN"  				"Text Green Color" EXPORT INT8
		0 "BLUE"   				"Text Blue Color" EXPORT INT8
		1 "Align"           	"Alignment" TYPE "TextAlign" EXPORT INT8
		0 "Shadow text"			"Shadow text" TYPE "Boolean" EXPORT INT8
		0 "RED"    				"Shadow text Red Color" EXPORT INT8
		0 "GREEN"  				"Shadow text Green Color" EXPORT INT8
		0 "BLUE"   				"Shadow text Blue Color" EXPORT INT8
	}

	EXPORT_FORMAT
	{
		TEMPLATE_ID   UINT8
		LAYER_POS_XY  INT16
		LAYER_ANCHOR  UINT8
		PARAMS		  CUSTOM
	}
}

TEMPLATE OBJECT_LAYER "GUI_GfxItem_For_Alignment"
{
	ID 200

	SPRITE "../sprite/preload_portrait.sprite"
	SPRITE "../sprite/preload_landscape.sprite"
	SPRITE "../sprite/loading.sprite"

	SET SPRITE PARAM[0]
	SET MODULE -1
	SET FRAME PARAM[1]
	SET ANIM PARAM[2]
	SET AFRAME 0
	SET RECT_AREA 0 0 5 5 RGB(0, 255, 255)

	PARAMS
	{
		//graph common parameters
		0 "SpriteId"          "Sprite id"                                                                       TYPE "AlignmentSprites" EXPORT INT8
		0 "FrameId"           "frame id, if it is an anim -1:loop -2:play once -3:play once and disappear"      TYPE FRAMESDESC[PARAM[0]] EXPORT INT16
		-1 "AnimId"            "anim id, if it is a frame set it to -1"                                         TYPE ANIMSDESC[PARAM[0]] EXPORT INT8
		1 "Visible"           "if the object is visible or not"                                                 TYPE "Boolean" EXPORT INT8
	}
}

CINEMATIC_EDITOR //Editor command in cinematic
{
    NEW_CMD OBJLAYER "Repeat"
	{
		EXPORT_ID 101
		PARAM "Key_Start" TYPE "Key_Star"
		PARAM "Num_Repeat" TYPE "Num_Repeat"
	}
}
