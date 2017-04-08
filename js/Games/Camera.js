function Camera()
{
    var STATE = {
        INACTIVE: 0,
        ACTIVE: 1
        };
    
    //VARIABLE
    var m_state;
    
    var m_x, m_y, m_z;
    
    this.Init = function()
    {
        SetPos(
            Defines.PLAYER_START_POS_X + Defines.CAMERA_DELTA_POS_WITH_PLAYER_X, 
            Defines.PLAYER_START_POS_Y + Defines.CAMERA_DELTA_POS_WITH_PLAYER_Y, 
            Defines.PLAYER_START_POS_Z + Defines.CAMERA_DELTA_POS_WITH_PLAYER_Z
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
            m_x, 
            y + Defines.CAMERA_DELTA_POS_WITH_PLAYER_Y, 
            z + Defines.CAMERA_DELTA_POS_WITH_PLAYER_Z
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
}

module.exports = new Camera();