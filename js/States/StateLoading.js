import {LoaderAsync} from '../Core/LoaderAsync'
import {FBInstantUtils} from '../Core/FBInstantUtils'
export class StateLoading {
    constructor(){
    }
    Init() {
        // add job for loading
        console.log("Init State Loading");
        FBInstantUtils.UpdateLoadingProgress(0);
    }
    Destroy() {

    }
    Update(dt) {

    }
    FixUpdate(dt) {

    }
}