export class UserProfile{
    constructor(data){
        this.currentScore = 0;
        this.highestScore = data['highestScore'] || 0;
    }
}