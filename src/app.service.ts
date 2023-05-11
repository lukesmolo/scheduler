import { Injectable } from '@nestjs/common';
import { KValStorageService } from './services/kval-storage/kval-storage.service';

@Injectable()
export class AppService {
  constructor(private readonly kval: KValStorageService) {}
}
