import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { OpRegistry } from './op-registry';
import { TestOp } from './ts/test.op';

@Module({
  imports: [ServicesModule.register()],
  providers: [OpRegistry, TestOp],
  exports: [OpRegistry],
})
export class OpsModule {
  public constructor(
    private readonly opRegistry: OpRegistry,
    private readonly testOp: TestOp,
  ) {
    // for TS inject the service, for PY just register the path
    this.opRegistry.register('test', this.testOp);
    this.opRegistry.register('testPy', 'test.op.py');
  }
}
