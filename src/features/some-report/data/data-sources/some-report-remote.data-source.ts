import { injectable } from 'inversify';
import { Either } from 'monet';

import { SomeReportDto } from '#features/some-report/data/dto';
import { HttpClient, HttpFailure } from '#infrastructure/http';

@injectable()
export class SomeReportRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  public async getSomeReport(): Promise<Either<HttpFailure, SomeReportDto>> {
    const result = await this.httpClient.get<SomeReportDto>('/some-report');
    return result.map(response => response.data);
  }
}
