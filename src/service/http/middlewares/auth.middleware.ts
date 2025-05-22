// import { IMiddleware } from './interface';
// import nookies from 'nookies';
// import { setCookie } from '@/lib/action';
// import { appClient } from '../index';
// import { INetworkResponse } from '../../endpoints/interface';
//
// /**
//  * Middleware for attaching an Authorization header and refreshing tokens on 401.
//  *
//  * @implements {IMiddleware}
//  */
// export default class AuthMiddleware implements IMiddleware {
//     /**
//      * Attach the access token from cookies to the Authorization header.
//      *
//      * @param config The Alova request config object.
//      * @returns The modified config.
//      */
//     public async onRequest(config: any): Promise<any> {
//         if (typeof window !== 'undefined') {
//             const { token } = nookies.get();
//             if (token && config.headers) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//         }
//         return config;
//     }
//
//     /**
//      * No-op on successful responses.
//      *
//      * @param response The parsed response data.
//      * @returns The original data.
//      */
//     public async onResponse(response: any): Promise<any> {
//         return response;
//     }
//
//     /**
//      * On 401, attempt to refresh the token via Alova and retry; otherwise redirect to welcome.
//      *
//      * @param error The caught error from the response phase.
//      * @throws Propagates the original error if refresh fails or status !== 401.
//      */
//     public async onResponseError(error: any): Promise<any> {
//         const status = error?.status ?? error?.response?.status;
//         if (status === 401) {
//             const cookies = nookies.get();
//             try {
//                 // Send refresh-token request via Alova
//                 const method = appClient.instance.Post<
//                     { refresh_token: string },
//                     INetworkResponse<{ access_token: string }>
//                 >(
//                     'https://apip.dev.vayudev.ir/api/v1/user/refresh_token',
//                     { refresh_token: cookies.refresh_token }
//                 );
//                 const result = await appClient.request(method);
//                 setCookie('token', result.data.access_token);
//             } catch {
//                 // If refresh fails, redirect to welcome/login
//                 if (/4\d{2}/.test(String(status))) {
//                     window.location.replace(`${window.location.origin}/welcome`);
//                 }
//             }
//         }
//         throw error;
//     }
// }
