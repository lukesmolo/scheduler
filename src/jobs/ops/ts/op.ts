import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Op {
  public abstract execute(): void;
}
