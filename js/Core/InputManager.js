const TOUCH_NONE    = 1 << 0
const TOUCH_DOWN 	= 1 << 1
const TOUCH_PRESSED = 1 << 2
const TOUCH_MOVE 	= 1 << 3
const TOUCH_UP 		= 1 << 4

export class InputManager{
    constructor(view){        
        var EVENT_DOWN = ('ontouchstart' in document)  ? 'touchstart' : 'mousedown';
        var EVENT_MOVE = ('ontouchstart' in document)  ? 'touchmove' : 'mousemove';
        var EVENT_END = ('ontouchstart' in document)  ? 'touchend' : 'mouseup';
        view.addEventListener(EVENT_DOWN, this.OnTouchStart.bind(this));
        view.addEventListener(EVENT_MOVE, this.OnTouchMove.bind(this));
        view.addEventListener(EVENT_END, this.OnTouchEnd.bind(this));
        this.rect = document.body.getBoundingClientRect();
    
        this.Reset();
        this.state = TOUCH_NONE;
        this.touchesQueue = [];
    }
    Reset(){
        this.x = 0
        this.y = 0
        this.deltaX = 0
        this.deltaY = 0
    }
    OnTouchStart(event){
        var evLength = this.touchesQueue.length
        if((event.touches && event.touches.length === 1) || evLength <= 0 || this.touchesQueue[evLength - 1].state != TOUCH_DOWN)
            this.touchesQueue.push({event:event, state:TOUCH_DOWN})
        event.preventDefault();
    }
    OnTouchMove(event) {
        if ((this.state & TOUCH_PRESSED) != 0)
        {
            this.state |= TOUCH_MOVE;
            this.GetTouchDelta(event);
        }
        event.preventDefault();
    }
    OnTouchEnd(event){
        this.touchesQueue.push({event:event, state:TOUCH_UP});
        event.preventDefault();
    }
    GetTouchPos(event) {
        if (event.touches)
        {
            var touches;
            if ((this.state & TOUCH_DOWN) != 0 || (this.state & TOUCH_PRESSED) != 0)
            {
                touches = event.touches;
            }
            else if ((this.state & TOUCH_UP) != 0)
            {
                touches = event.changedTouches;
            }

            if (touches && touches.length > 0)
            {
                this.x = touches[0].pageX - this.rect.left;
                this.y = touches[0].pageY - this.rect.top;
            }
        }
        else
        {
            this.x = event.pageX - this.rect.left;
            this.y = event.pageY - this.rect.top;
        }
    }
    GetTouchDelta(event) {
        var lastX = this.x;
        var lastY = this.y;
        this.GetTouchPos(event);
        this.deltaX = this.x - lastX;
        this.deltaY = this.y - lastY;
    }
    HandleTouchDown(event){
        if((this.state & TOUCH_DOWN) == 0)
        {
            this.deltaX = this.deltaY = 0;
            this.state = TOUCH_DOWN;
            this.GetTouchPos(event);
        }
    }
    HandleTouchUp(event) {
        if((this.state & TOUCH_UP) == 0)
        {
            if ((this.state & TOUCH_DOWN) != 0 || (this.state & TOUCH_PRESSED) != 0)
            {
                this.state = TOUCH_UP;
                this.GetTouchPos(event);
            }
        }
    }
    IsTouchDown() {
        return ((this.state & TOUCH_DOWN) != 0?true:false);
    }
    IsTouchRelease(){
        return ((this.state & TOUCH_UP) != 0?true:false);
    }
    IsTouchMove(){
        return ((this.state & TOUCH_MOVE) != 0?true:false);
    }
    IsTouchPress(){
        return ((this.state & TOUCH_PRESSED) != 0?true:false);
    }
    GetDelta(){
        return {x:this.deltaX, y:this.deltaY};
    }
    Update() {
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
}