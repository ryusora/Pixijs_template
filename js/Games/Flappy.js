require("pixi.js")

const MAX_ROTATION = 45;
const ROTATE_SPEED = 10;

export class Flappy{
    constructor(animSprite){
        this.animSprite = animSprite;
        this.animSprite.SetPivot(0.5, 0.5);
        this.velocity = {x:0, y:0};
        this.acceleration = {x:0, y:0};
        this.gravity = {x:0, y:0};
        this.rotation = 0;
    }
    SetGravity(x,y){
        this.gravity = {x:x, y:y};
    }
    SetPosition(x, y){
        this.animSprite.SetPosition(x, y);
    }
    SetPivot(x,y) {
        this.animSprite.SetPivot(x, y);
    }
    SetRotation(rotation) {
        this.rotation = Math.min(rotation, MAX_ROTATION);
        this.animSprite.SetRotation(this.rotation);
    }
    AddVelocity(force) {
        this.velocity.x += force.x;
        this.velocity.y += force.y;
    }
    UpdateRotation(dt){
        this.SetRotation(this.rotation + ROTATION_SPEED * dt);
    }
    UpdatePosition(velocity) {
        let {x, y} = this.animSprite.GetSprite().position;
        this.animSprite.SetPosition(x + velocity.x, y + velocity.y);
    }
    FixedUpdate(dt) {
        this.AddVelocity(this.acceleration);
        this.AddVelocity(this.gravity);

        this.UpdatePosition(this.velocity);
    }
    Update(dt) {
        this.UpdateRotation(dt);
    }
}