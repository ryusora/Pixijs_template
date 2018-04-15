require('pixi.js')
export class SpritesManager{
    constructor(){
        this.sprites = {};
    }
    Init(infosList, atlas){
        // create list sprite base on info and texture
        let infoLength = infosList.length;
        try{
            for(let i = 0; i < infoLength; ++i){
                let info = infosList[i];
                let texture = new PIXI.Texture(atlas.baseTexture);
                this.sprites[info.name] = new PIXI.Sprite(texture);
                texture.frame = new PIXI.Rectangle(info.x, info.y, info.width, info.height);
            }
        }catch(e){
            throw e;
        }
    }
    GetSprite(name){
        if(!this.sprites[name])
            throw "Cannot get sprite : " + name;
        return this.sprites[name];
    }
}