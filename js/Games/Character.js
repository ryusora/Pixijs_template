const Vector2 = require('./Vector2.js')

const LINE_LEFT 	= -1
const LINE_CENTER 	= 0
const LINE_RIGHT 	= 1

//
const STATE_MOVE_LEFT 	= 1 << 0
const STATE_JUMPING 	= 1 << 1
const STATE_MOVE_RIGHT 	= 1 << 2
const STATE_DEAD 		= 1 << 3
const STATE_IDLE 		= 1 << 4
const STATE_RUNNING		= 1 << 5

//
const ANIM_LEFT 	= "turn_left"
const ANIM_RIGHT 	= "turn_right"
const ANIM_RUN 		= "run"
const ANIM_DEAD		= "run"
const ANIM_JUMP		= "run"

var Character = function(){
	this.armatureDisplay = null
	this.velocity = new Vector2()
	this.accelerator = new Vector2()
	this.position = new Vector2()
	this.currentLine = LINE_CENTER
	this.currentState = STATE_IDLE
	this.baseX = 0
	this.scale = 0
	this.original = {width:0, height: 0}
	this.offsetSpeed = 1

	this.frenzyCamOffsetX = 0
	this.frenzyCamOffsetY = 0
	this.frenzyCamOffsetZ = 0

	document.addEventListener('keydown', e=>{
		console.log(e.keyCode)
		switch(e.keyCode)
		{
			case 37: // left
			{
				this.MoveLeft()
			}
			break

			case 38: // up
			{
				this.Jump()
			}
			break

			case 39: // right
			{
				this.MoveRight()
			}
			break

			case 32:
			{
				this.ActiveFrenzy()
			}
			break
		}
	})
}

Character.prototype.SetupDragonBones = function()
{
	dragonBones.PixiFactory.factory.parseDragonBonesData(TextureManager.getDragonbonesData('mainChar_ske'));
	dragonBones.PixiFactory.factory.parseTextureAtlasData(TextureManager.getDragonbonesData('mainChar_tex_data'), TextureManager.getTexture('mainChar_tex'));

	this.armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("mainCharacter");
	this.armatureDisplay.animation.play("run");
	// init origin
	this.original.width = this.armatureDisplay.armature.display.width
	this.original.height = this.armatureDisplay.armature.display.height
}

Character.prototype.InitSprite = function()
{
	this.SetupDragonBones()
	this.Jump()
}

Character.prototype.SetPos = function(x, y, z)
{
	this.position.x = x
	this.position.y = y
	this.position.z = z
	this.baseX = x
}

Character.prototype.GetWidth = function()
{
	if(this.armatureDisplay)
	{
		return this.armatureDisplay.armature.display.width
	}
	return 0
}

Character.prototype.GetHeight = function()
{
	if(this.armatureDisplay)
	{
		return this.armatureDisplay.armature.display.height
	}
	return 0
}

Character.prototype.UpdateScale = function()
{
	this.scale = Camera.GetDrawScale(this.position.z)

	if(this.armatureDisplay)
	{
		this.armatureDisplay.armature.display.width = this.original.width * this.scale
		this.armatureDisplay.armature.display.height = this.original.height * this.scale
	}
}

Character.prototype.UpdatePosition = function()
{
	if(this.armatureDisplay)
	{
		this.armatureDisplay.x = Camera.GetDrawX(this.position)
		this.armatureDisplay.y = Camera.GetDrawY(this.position)
		// console.log({x:this.armatureDisplay.x, y:this.armatureDisplay.y})
	}
}

Character.prototype.SetState = function(state)
{
	if((this.currentState & state) == 0)
	{
		this.currentState |= state
	}
}

Character.prototype.SetAnimation = function(anim_name)
{
	this.armatureDisplay.animation.play(anim_name);
}

Character.prototype.MoveLeft = function()
{
	if(this.IsState(STATE_MOVE_LEFT | STATE_MOVE_RIGHT)) return

	if(--this.currentLine < LINE_LEFT)
	{
		// no need to move left enymore
		this.currentLine = LINE_LEFT
		return
	}

	this.SetState(STATE_MOVE_LEFT)
	this.SetAnimation(ANIM_LEFT)
	// add force
	var moveLeftForce = new Vector2()
	moveLeftForce.clone(Defines.MOVE_FORCE)
	moveLeftForce.mulSchalar(-1)
	this.velocity.add(moveLeftForce)
}

Character.prototype.MoveRight = function()
{
	if(this.IsState(STATE_MOVE_RIGHT | STATE_MOVE_LEFT)) return

	if(++this.currentLine > LINE_RIGHT)
	{
		// no need to move right enymore
		this.currentLine = LINE_RIGHT
		return
	}

	this.SetState(STATE_MOVE_RIGHT)
	this.SetAnimation(ANIM_RIGHT)
	// add force
	this.velocity.add(Defines.MOVE_FORCE)
}

Character.prototype.Jump = function()
{
	if(this.IsState(STATE_JUMPING)) return

	this.ResetState(STATE_RUNNING)
	this.SetState(STATE_JUMPING)
	this.SetAnimation(ANIM_JUMP)

	this.velocity.add(Defines.JUMP_FORCE)
}

Character.prototype.Run = function()
{
	if(this.IsState(STATE_RUNNING)) return

	this.SetAnimation(ANIM_RUN)
	this.ResetState(STATE_JUMPING)
	this.SetState(STATE_RUNNING)
}

Character.prototype.IsState = function(state)
{
	return ((this.currentState & state) != 0?true:false);
}

Character.prototype.ResetState = function(state)
{
	this.currentState &= ~state
}

Character.prototype.FixedUpdate = function(dt)
{
	var gravity = new Vector2();
	gravity.clone(Defines.GRAVITY)
	gravity.mulSchalar(dt)
	this.velocity.add(gravity)
	this.accelerator.add(this.velocity)
	this.position.add(this.accelerator)

	if(this.position.y > Defines.GROUND_Y)
	{
		this.position.y = Defines.GROUND_Y
		this.velocity.y = 0
		if(!this.IsState(STATE_MOVE_LEFT | STATE_MOVE_RIGHT))
		{
			this.Run()
		}
	}

	if(this.IsState(STATE_MOVE_LEFT))
	{
		var destinationX = this.currentLine * Defines.LINE_LENGTH + this.baseX
		if(this.position.x < destinationX)
		{
			this.position.x = destinationX
			this.velocity.x = 0
			this.ResetState(STATE_MOVE_LEFT)
			this.SetAnimation(ANIM_RUN)
		}
	}
	else if(this.IsState(STATE_MOVE_RIGHT))
	{
		var destinationX = this.currentLine * Defines.LINE_LENGTH + this.baseX
		if(this.position.x > destinationX)
		{
			this.position.x = destinationX
			this.velocity.x = 0
			this.ResetState(STATE_MOVE_RIGHT)
			this.SetAnimation(ANIM_RUN)
		}
	}

	this.UpdatePosition()
	this.UpdateScale()

	this.accelerator.zero()
}

Character.prototype.UpdateFrenzyMode = function(dt)
{
	if(this.isFrenzyMode)
	{
		this.frenzyTimer -= dt
		// update offset Speed
		this.offsetSpeed += Defines.FRENZY_FADE_SPEED
		this.offsetSpeed = Math.max(this.offsetSpeed, Defines.MAX_FRENZY_OFFSET_SPEED)
		if(this.frenzyTimer < 0)
		{
			this.frenzyTimer = 0
			this.isFrenzyMode = false
			this.offsetSpeed = 1
			this.frenzyCamOffsetX = 0
			this.frenzyCamOffsetY = 0
			this.frenzyCamOffsetZ = 0
		}
	}
}

Character.prototype.ActiveFrenzy = function()
{
	this.isFrenzyMode = true
	this.frenzyTimer = Defines.FRENZY_TIME
	this.frenzyCamOffsetX = Defines.FRENZY_CAM_OFFSET_X
	this.frenzyCamOffsetY = Defines.FRENZY_CAM_OFFSET_Y
	this.frenzyCamOffsetZ = Defines.FRENZY_CAM_OFFSET_Z
}


Character.prototype.Update = function(dt)
{
	this.UpdateFrenzyMode(dt)

	this.position.z += Defines.GAME_SPEED * dt * this.offsetSpeed
	Camera.CameraUpdatePlayerPos(this.frenzyCamOffsetX, this.frenzyCamOffsetY, this.position.z + this.frenzyCamOffsetZ)

	if(InputManager.IsTouchPress()) {
		if(Math.abs(InputManager.deltaY) > Defines.SWIPE_OFFSET) {
			if(InputManager.deltaY < 0)
			{
				// swipe up
				this.Jump()
			}
		}
		else if(Math.abs(InputManager.deltaX) > Defines.SWIPE_OFFSET)
		{
			if(InputManager.deltaX > 0)
			{
				this.MoveRight()
			}
			else
			{
				this.MoveLeft()
			}
		}
		InputManager.Reset()
	}
}

module.exports = Character