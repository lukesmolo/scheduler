import { Injectable, NotImplementedException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OpRegistry } from './ops/op-registry';
import { JobConfig } from './types/job-config';
import { CronJob } from 'cron';
import { Op } from './ops/ts/op';
import { PythonOp } from './ops/ts/python.op';

@Injectable()
export class JobSchedulerService {
  public constructor(
    private readonly opRegistry: OpRegistry,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  public schedule(jobConfig: JobConfig): void {
    const job = this.getJob(jobConfig);
    // console.log(job)
    this.schedulerRegistry.addCronJob(jobConfig.name, job);
    job.start();
  }

  private getJob(jobConfig: JobConfig): CronJob {
    const op = this.opRegistry.get(jobConfig.name);
    if (!op) {
      throw new NotImplementedException(
        `Can't find the OP named '${jobConfig.name}'`,
      );
    }
    // console.log(jobConfig.cronTime)
    // if (typeof op == 'string') {
    if (jobConfig.type == 'py') {
      const newPyOp = new PythonOp(op as string);
      return new CronJob(jobConfig.cronTime, () => newPyOp.execute());
    } else {
      return new CronJob(jobConfig.cronTime, () => (op as Op).execute());
    }
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      console.log(`job: ${key} -> next: ${next}`);
    });
  }
}
