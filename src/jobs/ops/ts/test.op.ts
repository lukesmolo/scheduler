import { Logger } from '@nestjs/common';
import { Op } from './op';

export class TestOp extends Op {
  private readonly logger = new Logger('testOp');
  public async execute(): Promise<void> {
    this.logger.debug('test executed');
    return;
  }
}
