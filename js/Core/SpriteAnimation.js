export class SpriteAnimation {
    constructor(animInfo, baseTexture, scale){
        this.texture = new PIXI.Texture(baseTexture);
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.scale.set(scale, scale);
        this.animInfo = animInfo;
        this.pivotOffset = {x:0, y:0};
        this.SwitchFrame(0);
        // 
        this.ticker = 0;
    }
    SwitchFrame(frameID) {
        this.currentFrame = frameID;
        try{
            let {x, y, width, height} = this.animInfo.frames[frameID];
            this.texture.frame = new PIXI.Rectangle(x, y, width, height);
        }catch(e) {
            throw "[SpriteAnimation] Error: " + e;
        }
    }
    Update(dt) {
        this.ticker += dt;
        if(this.ticker >= this.animInfo.baseTime){
            // switch frame
            this.SwitchFrame(((this.currentFrame + 1) % this.animInfo.frames.length));
            this.ticker -= this.animInfo.baseTime;
        }
    }
    SetRotation(rotation) {
        this.sprite.rotation = rotation * Math.PI / 180;
    }
    SetPosition(x, y) {
        this.basePosition = {x:x, y:y};
        this.sprite.position.set(x, y);
    }
    SetPivot(xOff, yOff) {
        let {width, height} = this.animInfo.frames[0];
        this.pivotOffset.x = xOff * width;
        this.pivotOffset.y = yOff * height;
        this.sprite.pivot.set(this.pivotOffset.x, this.pivotOffset.y);
    }
    GetSprite(){
        return this.sprite;
    }
}