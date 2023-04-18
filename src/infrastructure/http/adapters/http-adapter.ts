import { Either } from 'monet';

import { HttpFailure } from '#infrastructure/http/failures';
import {
  HttpMethod,
  HttpRequestConfig,
  HttpResponse,
} from '#infrastructure/http/types';

export abstract class HttpClientAdapter {
  public abstract performRequest<Data, Body = {}, Params = void>(
    method: HttpMethod,
    url: string,
    config?: HttpRequestConfig<Params, Body>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>>;
}
