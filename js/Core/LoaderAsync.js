export class LoaderAsync{
    constructor(){
        this.listPromise = [];
        this.jobCount = 0;
    }
    AddJob(promise) {
        this.listPromise.push(promise);
        this.jobCount++;
    }
    Notify(callback = null) {
        this.jobCount--;
        if(callback) {
            let max = this.listPromise.length;
            callback((max - this.jobCount) * 100/max);
        }
    }
    Excecute() {
        return Promise.all(this.listPromise);
    }
    ClearJobs() {
        this.listPromise = [];
        this.jobCount = 0;
    }
}