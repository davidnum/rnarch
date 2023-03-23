import { injectable, multiInject } from 'inversify';

import { LoggerAdapter } from './adapters';
import { StringBuilder } from './string-builder';

type LogLevel = 'INFO' | 'ERROR';

@injectable()
export class Logger {
  private readonly stringBuilder = new StringBuilder();

  constructor(
    @multiInject(LoggerAdapter)
    private readonly adapters: LoggerAdapter[],
    private readonly tag?: string,
  ) {}

  public log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const messageString = this.stringBuilder
      .appendDateTime()
      .appendTag(this.tag)
      .appendMessage(message)
      .appendData(data)
      .build();

    this.adapters.forEach(adapter => {
      if (level === 'INFO') {
        adapter.info(messageString);
      }

      if (level === 'ERROR') {
        adapter.error(messageString);
      }
    });
  }
}
