import { Method } from 'alova';
import { IMiddleware } from '../middlewares/interface';

/**
 * Interface for an HTTP client backed by Alova.
 */
export interface IHttpClient {
  /**
   * Boots the HTTP client, applying all registered middleware.
   */
  boot(): void;

  /**
   * Sends a request and returns its `.data` payload.
   *
   * @param methodInstance An Alova Method instance (created via `.Get()`, `.Post()`, etc.).
   * @returns A Promise resolving to whatever `.data` was in the response.
   */
  request(methodInstance: Method): Promise<unknown>;



  /**
   * Middleware set (must configure before `boot()`).
   */
  readonly middlewares: Set<IMiddleware>;
}
