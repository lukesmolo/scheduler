import { Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import { Op } from './op';

export class PythonOp extends Op {
  private logger;
  constructor(private readonly path: string) {
    super();
    this.logger = new Logger(`${path}`);
  }
  public async execute(): Promise<void> {
    const child = spawn('python', [`src/jobs/ops/py/${this.path}`]);

    // Registriamo una funzione per la gestione degli output del processo figlio
    child.stdout.on('data', (data) => {
      this.logger.debug(data);
    });

    // Registriamo una funzione per la gestione degli errori del processo figlio
    child.stderr.on('data', (data) => {
      this.logger.error(data);
    });

    // Registriamo una funzione per la gestione della chiusura del processo figlio
    child.on('close', (code) => {});
    return;
  }
}
