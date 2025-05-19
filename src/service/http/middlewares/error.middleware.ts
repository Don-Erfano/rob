//import { INetworkResponse } from '../../endpoints/interface';
import { IMiddleware } from './interface';
import { AxiosError, AxiosRequestConfig } from 'axios';

export default class ErrorMiddleware implements IMiddleware {
  async onResponseError(
    error: AxiosError,
  ): Promise<AxiosRequestConfig | void> {
    const { response } = error;
    if (/5[0-9][0-9]/.exec(String(response?.status))) {
      window.location.replace(`${window.location.origin}/error/e5xx`);
    }
    throw error;
  }
}
