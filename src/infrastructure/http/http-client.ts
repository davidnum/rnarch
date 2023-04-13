import { Either } from 'monet';

import { HttpClientAdapter } from './adapters';
import { HttpFailure } from './failures';

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

export class HttpClient {
  constructor(private readonly adapter: HttpClientAdapter) {}

  public async get<Data, Params = void>(
    url: string,
    config?: HttpRequestConfig<Params, undefined>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>> {
    return this.adapter.performRequest<Data, undefined, Params>(
      'GET',
      url,
      config,
    );
  }

  public async post<Data, Body = {}, Params = void>(
    url: string,
    body: Body,
    config?: Omit<HttpRequestConfig<Params, Body>, 'body'>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>> {
    return this.adapter.performRequest<Data, Body, Params>('POST', url, {
      ...config,
      body,
    });
  }

  public async put<Data, Body = {}, Params = void>(
    url: string,
    body: Body,
    config?: Omit<HttpRequestConfig<Params, Body>, 'body'>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>> {
    return this.adapter.performRequest<Data, Body, Params>('PUT', url, {
      ...config,
      body,
    });
  }

  public async delete<Data, Body = {}, Params = void>(
    url: string,
    config?: HttpRequestConfig<Params, Body>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>> {
    return this.adapter.performRequest<Data, Body, Params>(
      'DELETE',
      url,
      config,
    );
  }
}
