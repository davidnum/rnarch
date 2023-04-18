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
