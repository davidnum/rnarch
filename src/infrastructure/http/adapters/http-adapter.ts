import { Either } from 'monet';

import { HttpFailure } from '#infrastructure/http/failures';

export interface HttpResponse<Data> {
  data: Data;
  headers?: Record<string, string>;
}

export interface HttpRequestConfig<Params, Body = {}> {
  params?: Params;
  body?: Body;
  headers?: Record<string, string>;
  abortSignal?: AbortSignal;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class HttpClientAdapter {
  public abstract performRequest<Data, Body = {}, Params = void>(
    method: HttpMethod,
    url: string,
    config?: HttpRequestConfig<Params, Body>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>>;
}
