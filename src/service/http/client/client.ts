import {createAlova, Method} from 'alova';
import adapterFetch from 'alova/fetch';
import {IMiddleware} from '../middlewares/interface';
import {IHttpClient} from './interface';
import {useState} from 'react';

/**
 * Represents an HTTP client using Alova as the underlying adapter.
 * Allows for the addition of middleware to intercept requests and responses.
 *
 * @class HttpClient
 * @implements {IHttpClient}
 */
export default class HttpClient implements IHttpClient {
  /** The internal Alova instance (cast through any to avoid generic mismatches). */
  private alovaInstance: ReturnType<typeof createAlova> | null = null;

  /** Registered middleware for request/response interception. */
  private readonly _middlewares = new Set<IMiddleware>();

  /** Whether `boot()` has been called. */
  private isBooted = false;

  /** Base URL for all requests. */
  private readonly baseURL: string;

  /**
   * @param config.baseURL Root URL for all API calls.
   */
  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;
  }

  /**
   * Access and register middleware **before** `boot()` is called.
   *
   * @throws If called after `boot()`.
   */
  public get middlewares(): Set<IMiddleware> {
    if (this.isBooted) {
      throw new Error('Cannot add middleware after boot!');
    }
    return this._middlewares;
  }

  /**
   * Initialize Alova and wire up all middleware.
   * After this, you can no longer add middleware.
   */
  public boot(): void {
    const beforeRequest = async (method: Method) => {
      for (const mw of this._middlewares) {
        const env = mw.environment ?? process.env.NODE_ENV;
        if (env === process.env.NODE_ENV && mw.onRequest) {
          const cfg = await mw.onRequest(method.config);
          if (cfg) method.config = cfg;
        }
      }
    };

    const responded = {
      onSuccess: async (res: Response, method: Method) => {
        for (const mw of this._middlewares) {
          const env = mw.environment ?? process.env.NODE_ENV;
          if (env === process.env.NODE_ENV && mw.onResponse) {
            const data = await res.clone().json();
            await mw.onResponse(data);
          }
        }
        return res;
      },
      onError: async (err: unknown, method: Method) => {
        for (const mw of this._middlewares) {
          const env = mw.environment ?? process.env.NODE_ENV;
          if (env === process.env.NODE_ENV && mw.onResponseError) {
            await mw.onResponseError(err);
          }
        }
        throw err;
      }
    };

    this.alovaInstance = (createAlova as any)({
      baseURL: this.baseURL,
      requestAdapter: adapterFetch(),
      statesHook: useState,
      beforeRequest,
      responded
    });
    this.isBooted = true;
  }

  /**
   * Send a request and unwrap its `.data` payload.
   *
   * @param methodInstance An Alova Method instance from `.instance.Get/Post/etc.`
   * @returns A promise resolving to the response’s `.data`.
   * @throws If not yet booted.
   */
  public request(methodInstance: Method): Promise<unknown> {
    if (!this.isBooted || !this.alovaInstance) {
      throw new Error('HttpClient not yet booted!');
    }
    const p = methodInstance.send() as Promise<{ data: unknown }>;
    return p.then(res => res.data);
  }



  /**
   * Expose the raw Alova instance for advanced use (creating custom Methods).
   *
   * @throws If not yet booted.
   */
  public get instance(): ReturnType<typeof createAlova> {
    if (!this.alovaInstance) {
      throw new Error('Alova instance not yet initialized.');
    }
    return this.alovaInstance;
  }
}
