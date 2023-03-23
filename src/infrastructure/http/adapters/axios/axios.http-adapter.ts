import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';
import { injectable } from 'inversify';
import { Either } from 'monet';

import { HttpClientAdapter } from '../http-adapter';

import { loggerInterceptor, retryInterceptor } from './interceptors';

import { HttpClientEnvironment } from '#infrastructure/http/environment';
import { HttpFailure } from '#infrastructure/http/failures';
import {
  HttpRequestConfig,
  HttpResponse,
} from '#infrastructure/http/http-client';

@injectable()
export class AxiosHttpAdapter implements HttpClientAdapter {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly environment: HttpClientEnvironment) {
    this.axiosInstance = axios.create();
    this.attachInterceptors();
  }

  public async request<Data, Body = {}, Params = void>(
    method: Method,
    url: string,
    config?: HttpRequestConfig<Params, Body>,
  ): Promise<Either<HttpFailure, HttpResponse<Data>>> {
    const headers = await this.environment.getHeaders();
    const result = await Either.fromPromise<AxiosResponse<Data>, AxiosError>(
      this.axiosInstance.request<Data, AxiosResponse<Data>, Body>({
        method,
        url,
        data: config?.body,
        params: config?.params,
        headers: { ...config?.headers, ...headers },
        signal: config?.abortSignal,
      }),
    );

    return result.map(this.mapAxiosResponse).leftMap(HttpFailure.fromError);
  }

  private attachInterceptors() {
    loggerInterceptor(this.axiosInstance, this.environment.logRequest);
    retryInterceptor(this.axiosInstance);
  }

  private mapAxiosResponse = <Data>(
    response: AxiosResponse<Data>,
  ): HttpResponse<Data> => {
    return {
      data: response.data,
      headers: response.headers as Record<string, string>,
    };
  };
}
