const TOUCH_NONE    = 1 << 0
const TOUCH_DOWN 	= 1 << 1
const TOUCH_PRESSED = 1 << 2
const TOUCH_MOVE 	= 1 << 3
const TOUCH_UP 		= 1 << 4

var InputManager = function()
{
	var EVENT_DOWN = ('ontouchstart' in document)  ? 'touchstart' : 'mousedown'
    var EVENT_MOVE = ('ontouchstart' in document)  ? 'touchmove' : 'mousemove'
    var EVENT_END = ('ontouchstart' in document)  ? 'touchend' : 'mouseup'
	Application.instance.view.addEventListener(EVENT_DOWN, this.OnTouchStart.bind(this))
	Application.instance.view.addEventListener(EVENT_MOVE, this.OnTouchMove.bind(this))
	Application.instance.view.addEventListener(EVENT_END, this.OnTouchEnd.bind(this))

	this.rect = document.body.getBoundingClientRect();

	this.Reset();
	this.state = TOUCH_NONE
	this.touchesQueue = []
}

InputManager.prototype.OnTouchStart = function(e)
{
	var evLength = this.touchesQueue.length
	if((e.touches && e.touches.length === 1) || evLength <= 0 || this.touchesQueue[evLength - 1].state != TOUCH_DOWN)
	    this.touchesQueue.push({event:e, state:TOUCH_DOWN});

	if (e.target.tagName != "H1") {
        e.preventDefault();
	}
}

InputManager.prototype.OnTouchMove = function(e)
{
	if ((this.state & TOUCH_PRESSED) != 0)
    {
        this.state |= TOUCH_MOVE;
        this.GetTouchDelta(e);
    }
    e.preventDefault();
}

InputManager.prototype.OnTouchEnd = function(e)
{
	this.touchesQueue.push({event:e, state:TOUCH_UP});
    e.preventDefault();
}

InputManager.prototype.Reset = function()
{
	this.x = 0
	this.y = 0
	this.deltaX = 0
	this.deltaY = 0
}

InputManager.prototype.GetTouchPos = function(e)
{
	if (e.touches)
    {
        var touches;
        if ((this.state & TOUCH_DOWN) != 0 || (this.state & TOUCH_PRESSED) != 0)
        {
            touches = e.touches;
        }
        else if ((this.state & TOUCH_UP) != 0)
        {
            touches = e.changedTouches;
        }

        if (touches && touches.length > 0)
        {
            this.x = touches[0].pageX - this.rect.left;
            this.y = touches[0].pageY - this.rect.top;
        }
    }
    else
    {
        this.x = e.pageX - this.rect.left;
        this.y = e.pageY - this.rect.top;
    }
}

InputManager.prototype.GetTouchDelta = function(event)
{
	var lastX = this.x;
    var lastY = this.y;
    this.GetTouchPos(event);
    this.deltaX = this.x - lastX;
    this.deltaY = this.y - lastY;
    // this.x = lastX;
    // this.y = lastY;
}

InputManager.prototype.HandleTouchDown = function(event)
{
	if((this.state & TOUCH_DOWN) == 0)
    {
        this.deltaX = this.deltaY = 0;
        this.state = TOUCH_DOWN;
        this.GetTouchPos(event);
    }
}

InputManager.prototype.HandleTouchUp = function(event)
{
	if((this.state & TOUCH_UP) == 0)
    {
        if ((this.state & TOUCH_DOWN) != 0 || (this.state & TOUCH_PRESSED) != 0)
        {
            this.state = TOUCH_UP;
            this.GetTouchPos(event);
        }
    }
}

InputManager.prototype.IsTouchDown = function()
{
	return ((this.state & TOUCH_DOWN) != 0?true:false);
};

InputManager.prototype.IsTouchRelease = function()
{
	return ((this.state & TOUCH_UP) != 0?true:false);
};

InputManager.prototype.IsTouchMove = function()
{
	return ((this.state & TOUCH_MOVE) != 0?true:false);
};

InputManager.prototype.IsTouchPress = function()
{
	return ((this.state & TOUCH_PRESSED) != 0?true:false);
};

InputManager.prototype.GetDeltaX = function()
{
	return this.deltaX;
};

InputManager.prototype.GetDeltaY = function()
{
	return this.deltaY;
};

InputManager.prototype.Update = function(dt)
{
	if ((this.state & TOUCH_DOWN) != 0)
	{
		this.state &= ~TOUCH_DOWN;
		this.state |= TOUCH_PRESSED;
	}

	if ((this.state & TOUCH_MOVE) != 0)
	{
		this.state &= ~TOUCH_MOVE;
	}

	if ((this.state & TOUCH_UP) != 0)
	{
		this.Reset();
	}

	// check queue
    if(this.touchesQueue.length > 0)
    {
        var event_item = this.touchesQueue.shift();
        if(event_item.state)
        {
            if(event_item.state === TOUCH_DOWN)
            {
                this.HandleTouchDown(event_item.event);
            }
            else if(event_item.state === TOUCH_UP)
            {
                this.HandleTouchUp(event_item.event);
            }
        }
    }

    // reset delta
    this.deltaX = this.deltaY = 0
}

module.exports = new InputManager()