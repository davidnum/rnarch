import { injectable, named } from 'inversify';

import { HttpClientEnvironment } from '#infrastructure/http';
import { Logger } from '#infrastructure/logger';

@injectable()
export class HttpClientEnvironmentImpl implements HttpClientEnvironment {
  constructor(@named('HTTP') private readonly logger: Logger) {}

  public getBaseUrl(): string {
    return 'https://some.api.com';
  }

  public async getHeaders(): Promise<Record<string, string>> {
    return {};
  }

  public logRequest = (message: string): void => {
    this.logger.log('INFO', message);
  };
}
