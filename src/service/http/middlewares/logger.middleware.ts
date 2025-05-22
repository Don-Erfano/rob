import { IMiddleware } from './interface';

/**
 * Middleware for logging request and response details to the console.
 *
 * @implements {IMiddleware}
 */
export default class LoggerMiddleware implements IMiddleware {
  /** Only run in development by default. */
  public environment = 'development';

  /**
   * Logs request details before sending.
   *
   * @param config The request config.
   * @returns The original config.
   */
  public onRequest(config: any): any {
    console.log('[REQUEST]', config);
    return config;
  }

  /**
   * Logs request errors.
   *
   * @param error The caught error.
   * @returns A rejected promise for error propagation.
   */
  public onRequestError(error: any): any {
    console.error('[REQUEST][ERROR]', error);
    return Promise.reject(error);
  }

  /**
   * Logs successful responses.
   *
   * @param response The response data.
   * @returns The original response.
   */
  public onResponse(response: any): any {
    console.log('[RESPONSE]', response);
    return response;
  }

  /**
   * Logs response errors.
   *
   * @param error The caught error.
   * @returns A rejected promise for error propagation.
   */
  public onResponseError(error: any): any {
    console.error('[RESPONSE][ERROR]', error);
    return Promise.reject(error);
  }
}
