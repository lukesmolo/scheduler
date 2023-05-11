import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import configuration from './configuration';


@Global()
@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
   }
  )],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class CoreModule {
}
