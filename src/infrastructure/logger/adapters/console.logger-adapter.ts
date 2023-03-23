import { injectable } from 'inversify';

import { LoggerAdapter } from './logger-adapter';

@injectable()
export class ConsoleLoggerAdapter implements LoggerAdapter {
  public info(message: string) {
    // eslint-disable-next-line no-console
    console.log(message);
  }

  public error(message: string) {
    // eslint-disable-next-line no-console
    console.error(message);
  }
}
