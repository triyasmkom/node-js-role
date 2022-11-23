import CronJob from "node-cron";


export const initScheduledJobs = ()=>{
    const jobs = CronJob.schedule("* * * * * *", ()=>{
        console.log("Test Cron in second");
    });
}