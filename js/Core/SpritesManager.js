require('pixi.js')
import {SpriteAnimation} from './SpriteAnimation'
export class SpritesManager{
    constructor(){
        this.atlasBaseTexture = null;
        this.scaleFactor = 1;
        this.spritesInfo = null;
    }
    Init(infosList, atlas, scaleFactor = 1){
        // create list sprite base on info and texture
        this.spritesInfo = infosList;
        this.atlasBaseTexture = atlas.baseTexture;
        this.scaleFactor = scaleFactor;
    }
    GetInfo(name) {
        let length = this.spritesInfo.length;
        for(let i = 0; i < length; ++i) {
            if(this.spritesInfo[i].name.includes(name))
                return this.spritesInfo[i];
        }
        throw "Cannot get sprite Info : " + name;
    }
    CreateSprite(name){
        let info = this.GetInfo(name);
        let texture = new PIXI.Texture(this.atlasBaseTexture);
        texture.frame = new PIXI.Rectangle(info.x, info.y, info.width, info.height);
        let sprite = new PIXI.Sprite(texture);
        sprite.scale.set(this.scaleFactor, this.scaleFactor);

        return sprite;
    }
    CreateAnimationSprite(listName, baseTime) {
        let animInfo = { baseTime: baseTime, frames:[]};
        let frameCount = listName.length;
        for(let i = 0; i < frameCount; ++i) {
            animInfo.frames.push(this.GetInfo(listName[i]));
        }

        return new SpriteAnimation(animInfo, this.atlasBaseTexture, this.scaleFactor);
    }
}