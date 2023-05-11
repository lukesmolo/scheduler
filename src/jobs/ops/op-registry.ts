import { Injectable } from '@nestjs/common';
import { Op } from './ts/op';

@Injectable()
export class OpRegistry {
  private registeredOps: Map<string, Op | string>;

  public constructor() {
    this.registeredOps = new Map<string, Op | string>();
  }

  public contains(key: string): boolean {
    return this.registeredOps.has(key);
  }

  public get(key: string): Op | string {
    return this.registeredOps.get(key);
  }

  public list(): Op[] {
    return [...this.registeredOps.values()] as Op[];
  }

  public register(key: string, op: Op | string): void {
    this.registeredOps.set(key, op);
  }
}
