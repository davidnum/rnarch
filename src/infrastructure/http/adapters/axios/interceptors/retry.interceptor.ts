import { AxiosError, AxiosInstance } from 'axios';
import axiosRetry, {
  isIdempotentRequestError,
  isNetworkOrIdempotentRequestError,
} from 'axios-retry';

const RETRY_DELAY = 1000;
const RETRY_DELAY_IDEMPOTENT = 10000;

const retryCondition = (error: AxiosError) =>
  error.message.includes('timeout') ||
  error.message.includes('Network Error') ||
  isNetworkOrIdempotentRequestError(error);

const retryDelay = (retryCount: number, error: AxiosError) => {
  if (isIdempotentRequestError(error)) {
    return retryCount * RETRY_DELAY_IDEMPOTENT;
  }

  return retryCount * RETRY_DELAY;
};

export const retryInterceptor = (instance: AxiosInstance) => {
  axiosRetry(instance, {
    retries: 3,
    shouldResetTimeout: true,
    retryDelay,
    retryCondition,
  });
};
