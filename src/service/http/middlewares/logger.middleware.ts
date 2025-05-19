import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IMiddleware } from './interface';
import nookies from 'nookies';
/**
 * Middleware for logging request and response information for Axios requests.
 * Utilizes moment.js for timestamp formatting and nookies for cookie management.
 *
 * @class LoggerMiddleware
 * @implements {IMiddleware}
 */
export default class LoggerMiddleware implements IMiddleware {
  /**
   * Environment where the middleware is executed. Defaults to `development`.
   * @type {string}
   */
  environment: string = `development`;

  /**
   * Generates the current timestamp in a formatted string.
   *
   * @private
   * @static
   */
  private static _now(): string {
    //return moment().format(`YYYY-MM-DD HH:mm:ss`);
    return ``;
  }

  /**
   * Intercepts and logs the Axios request before it is sent.
   *
   * @param {InternalAxiosRequestConfig} config The Axios request configuration.
   * @returns {InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>} The modified or unmodified Axios request configuration.
   */
  public onRequest(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
    const { baseURL, url, data, method, params } = config;
    console.log(
      // eslint-disable-next-line no-underscore-dangle
      `%c[REQUEST] %c[${LoggerMiddleware._now()}] %c${method?.toUpperCase()} ${
        baseURL ?? `` + url
      }`,
      `color:green`,
      `color:gray`,
      `color:orange`,
      data,
      params,
    );

    return config;
  }

  /**
   * Intercepts and logs any Axios request error.
   *
   * @param {any} error The error thrown during the Axios request.
   * @returns {Promise<never>} A promise that rejects with the provided error.
   */
  public onRequestError(error: any): any {
    const {
      config: { method, baseURL, url },
    } = error;
    const { token } = nookies.get();
    console.log(
      `%c[REQUEST][ERROR] %c[${LoggerMiddleware._now()}] %c${method} %c${
        baseURL + url
      }`,
      `color:red`,
      `color:gray`,
      `color:orange`,
      error?.response,
    );

    return Promise.reject(error);
  }

  /**
   * Intercepts and logs the Axios response.
   *
   * @param {AxiosResponse} response The response from the Axios request.
   * @returns {AxiosResponse | Promise<AxiosResponse>} The Axios response, potentially modified.
   */
  public onResponse(
    response: AxiosResponse,
  ): AxiosResponse | Promise<AxiosResponse> {
    const {
      config: { baseURL, url, method },
    } = response;
    console.log(
      `%c[RESPONSE] %c[${LoggerMiddleware._now()}] %c${method} ${
        baseURL ?? `` + url
      }`,
      `color:green`,
      `color:gray`,
      `color:orange`,
      response.data,
    );

    return response;
  }

  /**
   * Intercepts and logs any Axios response error.
   *
   * @param {any} error The error thrown in response to the Axios request.
   * @returns {Promise<never>} A promise that rejects with the provided error.
   */
  public onResponseError(error: any): any {
    const method = error?.response?.config?.method || ``;
    const url = error?.response?.config?.baseURL + error?.response?.config?.url;
    console.log(
      `%c[RESPONSE][ERROR] %c[${LoggerMiddleware._now()}] %c${method.toUpperCase()} ${
        url || ``
      }`,
      `color:red`,
      `color:gray`,
      `color:orange`,
      error?.response,
    );

    return Promise.reject(error);
  }
}
