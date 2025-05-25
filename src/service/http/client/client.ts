import { createAlova, Method } from 'alova';
import adapterFetch from 'alova/fetch';
import { IMiddleware } from '../middlewares/interface';
import { IHttpClient } from './interface';
import { useState } from 'react';

export default class HttpClient implements IHttpClient {
  private alovaInstance: ReturnType<typeof createAlova> | null = null;
  private readonly _middlewares = new Set<IMiddleware>();
  private isBooted = false;
  private readonly baseURL: string;

  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;
  }

  public get middlewares(): Set<IMiddleware> {
    if (this.isBooted) {
      throw new Error('Cannot add middleware after boot!');
    }
    return this._middlewares;
  }

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
        const data = await res.clone().json();
        for (const mw of this._middlewares) {
          const env = mw.environment ?? process.env.NODE_ENV;
          if (env === process.env.NODE_ENV && mw.onResponse) {
            await mw.onResponse(data);
          }
        }
        return { data };
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

    this.alovaInstance =( createAlova as any)({
      baseURL: this.baseURL,
      requestAdapter: adapterFetch(),
      statesHook: useState,
      beforeRequest,
      responded
    });
    this.isBooted = true;
  }

  public request(methodInstance: Method): Promise<unknown> {
    if (!this.isBooted || !this.alovaInstance) {
      throw new Error('HttpClient not yet booted!');
    }
    return (methodInstance.send() as Promise<{ data: unknown }>).then(res => res.data);
  }

  public get instance(): ReturnType<typeof createAlova> {
    if (!this.alovaInstance) {
      throw new Error('Alova instance not yet initialized.');
    }
    return this.alovaInstance;
  }
}
