/**
 * Interface for defining middleware to be used with the HTTP client.
 *
 * @template C Type of the request config (default: any).
 * @template R Type of the response data (default: any).
 */
export interface IMiddleware<C={} , R={} > {
  /** Optional environment in which this middleware is active. */
  environment?: string;

  /**
   * Intercept and modify the request config before sending.
   *
   * @param config The current request config.
   * @returns The modified config or void.
   */
  onRequest?(config: C): C | Promise<C>;

  /**
   * Handle errors that occur during request setup.
   *
   * @param error The caught error.
   * @returns Potential recovery action or void.
   */
  onRequestError?(error: any): any;

  /**
   * Intercept and modify the response before passing to the caller.
   *
   * @param response The received response data.
   * @returns The modified data or void.
   */
  onResponse?(response: R): R | Promise<R>;

  /**
   * Handle errors that occur after receiving the response.
   *
   * @param error The caught error.
   * @returns Potential recovery action or void.
   */
  onResponseError?(error: any): any;
}
