export class LoaderAsync{
    constructor(){
        this.jobs = [];
        this.jobCount = 0;
    }
    AddJob(job) {
        this.jobs.push(job);
        this.jobCount++;
        return job;
    }
    Notify(callback) {
        this.jobCount--;
        if(callback) {
            let max = this.jobs.length;
            callback((max - this.jobCount) * 100/max);
        }
    }
    Excecute() {
        return Promise.all(this.jobs);
    }
    ClearJobs() {
        this.jobs = [];
        this.jobCount = 0;
    }
}