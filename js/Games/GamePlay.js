import {SpriteAnimation} from '../Core/SpriteAnimation';
import {SpritesManager} from '../Core/SpritesManager';
import {Flappy} from './Flappy'
window.spritesMgr||(window.spritesMgr = new SpritesManager())

export class GamePlay{
    constructor(application){
        this.application = application;
        this.stage = new PIXI.Container();
        this.application.addChild(this.stage);
        this.ResetGame();
        // init birds pool
        let birdsCollection = [
            ["bird0_0", "bird0_1", "bird0_2"],
            ["bird1_0", "bird1_1", "bird1_2"],
            ["bird2_0", "bird2_1", "bird2_2"],
        ];
        
        this.birdsPool = [];
        let length = birdsCollection.length;
        const DEFAULT_ANIM_TIME = 0.1;
        for(let i = 0; i < length; ++i){
            this.birdsPool(new Flappy(spritesMgr.CreateAnimationSprite(birdsCollection[i], DEFAULT_ANIM_TIME)));
        }
        // random birds
        this.currentBird = Math.floor(Math.random() * this.birdsPool.length);
    }
    ResetGame(){

    }
}