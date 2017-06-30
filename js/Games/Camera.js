function Camera()
{
    var STATE = {
        INACTIVE: 0,
        ACTIVE: 1
        };
    
    //VARIABLE
    var m_state;
    
    var m_x, m_y, m_z;

    var offsetX = 0, offsetY = 0, offsetZ = 0;
    this.InitOffset = function(initPos)
    {
        offsetX = initPos.x
        offsetY = initPos.y
        offsetZ = initPos.z
        this.Init(initPos)
    }

    this.Init = function(initPos)
    {
        SetPos(
            Defines.PLAYER_START_POS_X + initPos.x, 
            Defines.PLAYER_START_POS_Y + initPos.y, 
            Defines.PLAYER_START_POS_Z + initPos.z
            );
        
        //
        SetState(STATE.ACTIVE);
    }
    
    this.Update = function(dt)
    {
        switch(m_state)
        {
            case STATE.INACTIVE:
                break;
                
            case STATE.ACTIVE:
                break;
        }
    }
    
    this.Draw = function()
    {
        switch(m_state)
        {
            case STATE.INACTIVE:
                break;
                
            case STATE.ACTIVE:
                break;
        }
    }
    
    //PUBLIC FUNCTION
    this.GetDrawX = function(pos)
    {   
        return Defines.CAMERA_ON_SCREEN_POS_X + this.GetDrawScale(pos.z)*(pos.x - m_x);
        
    }
    
    this.GetDrawY = function(pos)
    {
        return Defines.CAMERA_ON_SCREEN_POS_Y + this.GetDrawScale(pos.z)*(pos.y - m_y);
    }
    
    this.GetDrawScale = function(z)
    {
        return Defines.CAMERA_ROOT_SCALE_POS_Z/(z - m_z);
    }
    
    this.GetCameraPosX = function()
    {
        return m_x;
    }
    
    this.GetCameraPosY = function()
    {
        return m_y;
    }
    
    this.GetCameraPosZ = function()
    {
        return m_z;
    }
    
    this.CameraUpdatePlayerPos = function(x, y, z)
    {   
        SetPos(
            m_x + offsetX, 
            Defines.PLAYER_START_POS_Y + y + offsetY, 
            z + offsetZ
            );
    }
    
    //PRIVATE FUNCTION
    function SetState(value)
    {
        m_state = value;
    }
    
    function SetPos(x, y, z)
    {
        m_x = x;
        m_y = y;
        m_z = z;
    }

    // document.addEventListener('keydown', e=>{
	// 	// console.log(e.keyCode)
	// 	switch(e.keyCode)
	// 	{
	// 		case 37: // left
	// 		{
	// 			offsetX--
	// 		}
	// 		break

	// 		case 38: // up
	// 		{
	// 			offsetY++
	// 		}
	// 		break

	// 		case 39: // right
	// 		{
	// 			offsetX++
	// 		}
	// 		break

    //         case 40: // down
	// 		{
	// 			offsetY--
	// 		}
	// 		break

	// 		case 32: // space
	// 		{
	// 			// this.ActiveFrenzy()
    //             console.log({x:offsetX, y:offsetY, z:offsetZ, itemOffsetZ:Defines.ITEM_OFFSET_Z, camPosY:Defines.CAMERA_ON_SCREEN_POS_Y})
	// 		}
    //         break

    //         case 90: // z
    //         {
    //             offsetZ++
    //         }
    //         break

    //         case 88: // x
    //         {
    //             offsetZ--
    //         }
	// 		break

    //         case 65: // a
    //         {
    //             Defines.ITEM_OFFSET_Z++
    //         }
    //         break

    //         case 83: // s
    //         {
    //             Defines.ITEM_OFFSET_Z--
    //         }
    //         break

    //         case 104: // up 2
    //         {
    //             Defines.CAMERA_ON_SCREEN_POS_Y++
    //         }
    //         break

    //         case 98: // down 2
    //         {
    //             Defines.CAMERA_ON_SCREEN_POS_Y--
    //         }
    //         break
	// 	}
	// })
}

module.exports = new Camera();