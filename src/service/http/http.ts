import HttpClient from './client';
import {
  AuthMiddleware,
  ErrorMiddleware,
  LoggerMiddleware,
} from './middlewares';

const baseURL = `${process.env[`NEXT_PUBLIC_BASE_API`]}/${process.env[`NEXT_PUBLIC_API_VERSION`]}`;
const appClient = new HttpClient({
  baseURL,
});

appClient.middlewares.add(new LoggerMiddleware());
appClient.middlewares.add(new AuthMiddleware());
appClient.middlewares.add(new ErrorMiddleware());
appClient.boot();
export { appClient, baseURL };
