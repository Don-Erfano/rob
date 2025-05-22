import { IMiddleware } from './interface';

/**
 * Middleware for routing to a custom error page on 5xx responses.
 *
 * @implements {IMiddleware}
 */
export default class ErrorMiddleware implements IMiddleware {
  /**
   * On server errors (5xx), redirect user to /error/e5xx.
   *
   * @param error The caught error object.
   * @throws Propagates the original error after redirect.
   */
  public async onResponseError(error: any): Promise<any> {
    const status = error?.status ?? error?.response?.status;
    if (/5\d{2}/.test(String(status))) {
      window.location.replace(`${window.location.origin}/error/e5xx`);
    }
    throw error;
  }
}
