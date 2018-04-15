require('pixi.js')
import {LoaderAsync} from '../Core/LoaderAsync';
import {FBInstantUtils} from '../Core/FBInstantUtils';
import {Utility} from '../Utilities/Utility';
import {SpritesManager} from '../Core/SpritesManager';

window.spritesMgr||(window.spritesMgr = new SpritesManager());

export class StateLoading {
    constructor(){
        this.parent = null;
        this.stage = new PIXI.Container();
    }
    Init(parent) {
        this.parent = parent;
        this.parent.addChild(this.stage);
        // add job for loading
        console.log("Init State Loading");
        let loader = new LoaderAsync();
        FBInstantUtils.UpdateLoadingProgress(0);
        let spritesInfos = [];
        loader.AddJob(new Promise((resolve, reject)=>{
            Utility.ReadFile('../../Assets/atlas.txt').then(result=>{
                let items = result.split('\n');
                let itemCount = items.length;
                for(let i = 0; i < itemCount; ++i){
                    try{
                        let info = items[i].split(' ');
                        let spriteInfo = {
                            name:info[0],
                            width:info[1],
                            height:info[2],
                            x:info[3],
                            y:info[4]
                        };
                        spritesInfos.push(spriteInfo);
                    }catch(e){
                        console.error(e);
                        reject(e);
                    }
                }
                loader.Notify((values)=>{
                    FBInstantUtils.UpdateLoadingProgress(values);
                    resolve("Done loading atlas data");
                })
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        }));
        let atlasTexture = null;
        loader.AddJob(new Promise((resolve, reject)=>{
            PIXI.loader.add('atlas', '../../Assets/atlas.png');
            PIXI.loader.load((pixi_loader, resource)=>{
                atlasTexture = resource['atlas'].texture;
                loader.Notify((values)=>{
                    FBInstantUtils.UpdateLoadingProgress(values);
                    resolve("Done loading atlas image");
                })
            })
        }));

        loader.Excecute().then(val=>{
            spritesMgr.Init(spritesInfos, atlasTexture);
            let testSprite = spritesMgr.GetSprite("bird0_0");
            this.stage.addChild(testSprite);
            testSprite.position.set(0,0);
            testSprite.pivot.set(0.5, 0.5);

            testSprite = spritesMgr.GetSprite("bird0_1");
            this.stage.addChild(testSprite);
            testSprite.position.set(50,50);
            testSprite.pivot.set(0.5, 0.5);
            
            testSprite = spritesMgr.GetSprite("bird0_2");
            this.stage.addChild(testSprite);
            testSprite.position.set(100,100);
            testSprite.pivot.set(0.5, 0.5);
        }).catch(error=>{
            console.error(error);
        });
    }
    Destroy() {
        this.parent.removeChild(this.stage);
    }
    Update(dt) {

    }
    FixUpdate(dt) {

    }
}