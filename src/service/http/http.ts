import HttpClient from './client';


const baseURL = `${process.env[`NEXT_PUBLIC_BASE_API`]}/`;
const appClient = new HttpClient({
    baseURL,
});

// appClient.middlewares.add(new AuthMiddleware());
appClient.boot();
export { appClient, baseURL };
