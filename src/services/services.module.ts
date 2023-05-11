import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import { KValStorageService } from './kval-storage/kval-storage.service';

export class ServicesModule {
  static register(): DynamicModule {
    return {
      module: ServicesModule,
      imports: [HttpModule],
      controllers: [],
      providers: [KValStorageService],
      exports: [KValStorageService],
    };
  }
}
