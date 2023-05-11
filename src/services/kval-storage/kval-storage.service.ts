import { Injectable } from '@nestjs/common';
// import Keyv from 'keyv';
const Keyv = require('keyv')
import KeyvFile from 'keyv-file'
import { ConfigService } from 'src/core/config.service';




@Injectable()
export class KValStorageService {
  // keyv: Keyv;
  keyv;
  constructor(private readonly configService: ConfigService) {
    const store = new KeyvFile({
      filename: `${this.configService.keyValueDir}/default_storage.json`, // the file path to store the data
      //filename: `${this.configService.keyValueDir}/default-rnd-${Math.random().toString(36).slice(2)}.json`, // the file path to store the data
      // expiredCheckDelay: 24 * 3600 * 1000, // ms, check and remove expired data in each ms
      expiredCheckDelay: -1, // ms, check and remove expired data in each ms
      writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
      encode: JSON.stringify, // serialize function
      decode: JSON.parse // deserialize function
    })
    this.keyv = new Keyv({
      store
    })
  }

  async get(key: string) {
    return this.keyv.get(key);
  }

  async delete(key: string) {
    return this.keyv.delete(key);
  }

  async set(key: string, value: unknown) {
    return this.keyv.set(key, value);
  }
}
