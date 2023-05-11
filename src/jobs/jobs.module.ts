import { Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '../core/config.service';
import { OpsModule } from './ops/ops.module';
import { JobSchedulerService } from './job-scheduler.service';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ScheduleModule.forRoot(), OpsModule, ServicesModule],
  providers: [JobSchedulerService],
  exports: [],
})
export class JobsModule implements OnModuleInit {
  initialized = false;
  public constructor(
    private readonly configService: ConfigService,
    private readonly JobScheduler: JobSchedulerService,
  ) {

  }

  async onModuleInit() {
    if (this.initialized === false) {
      this.loadJobs();
    }
    this.initialized = true;
    return;
  }

  private loadJobs(): void {
    const jobs = this.configService.jobs;
    for (const job of jobs) {
      this.JobScheduler.schedule(job);
    }
  }
}
