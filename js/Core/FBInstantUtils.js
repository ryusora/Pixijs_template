import {FBInstantMockup} from './fbinstant.mock';
import {Config} from 'config'

if(Config.FBINSTANT_MOCKUP){
    window.FBInstant = new FBInstantMockup();
}

export class FBInstantUtils {
    static UpdateLoadingProgress(values){
        FBInstant.setLoadingProgress(values);
    }
}