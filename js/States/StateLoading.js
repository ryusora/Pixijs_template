import {LoaderAsync} from '../Core/LoaderAsync'
import {FBInstantUtils} from '../Core/FBInstantUtils'
import {Utility} from '../Utilities/Utility'
export class StateLoading {
    constructor(){
    }
    Init() {
        // add job for loading
        console.log("Init State Loading");
        let loader = new LoaderAsync();
        FBInstantUtils.UpdateLoadingProgress(0);
        loader.AddJob(new Promise((resolve, reject)=>{
            Utility.ReadFile('../../Assets/atlas.txt').then(result=>{
                let items = result.split('\n');
                let itemCount = items.length;
                let spritesList = [];
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
                        spritesList.push(spriteInfo);
                    }catch(e){
                        reject(e);
                    }
                }
                console.log(spritesList);
            }).catch(error => {
                console.error(error);
            });
        }))
    }
    Destroy() {

    }
    Update(dt) {

    }
    FixUpdate(dt) {

    }
}