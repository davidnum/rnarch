import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as AxiosLogger from 'axios-logger';

export const loggerInterceptor = (
  instance: AxiosInstance,
  log: (message: string) => void,
) => {
  AxiosLogger.setGlobalConfig({
    prefixText: false,
    data: false,
    params: true,
    logger: log,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) =>
      AxiosLogger.requestLogger(config, {
        headers: true,
        data: true,
      }) as InternalAxiosRequestConfig,
    AxiosLogger.errorLogger,
  );

  instance.interceptors.response.use(AxiosLogger.responseLogger, error =>
    AxiosLogger.errorLogger(error, {
      data: true,
    }),
  );
};
