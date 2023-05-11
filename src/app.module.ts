import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';



export async function getStorageModule() {
  await ConfigModule.envVariablesLoaded;
  return ServicesModule.register();
}

@Module({
  imports: [CoreModule, JobsModule, getStorageModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
