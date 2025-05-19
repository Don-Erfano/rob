import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { IMiddleware } from "./interface";
import nookies from "nookies";
import { setCookie } from "@/lib/action";

// import { INetworkResponse } from '../../endpoints/interface';

export default class AuthMiddleware implements IMiddleware {
  /*constructor(
    private readonly fallBackUrl = process.env[
      `NEXT_PUBLIC_FALLBACK`
    ] as string,
  ) {}
*/
  async onRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    if (typeof window) {
      const { token } = nookies.get();
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  }

  async onResponse(response: AxiosResponse<any>): Promise<AxiosResponse<any>> {
    return response;
  }

  async onResponseError(error: AxiosError): Promise<AxiosRequestConfig | void> {
    const { response } = error;
    if (response?.status === 401) {
      const cookies = nookies.get();
      await axios
        .post("https://apip.dev.vayudev.ir/api/v1/user/refresh_token", {
          refresh_token: cookies.refresh_token,
        })
        .then((res) => {
          setCookie("token", res.data.data.access_token);
        })
        .catch((err) => {
          if (/4[0-9][0-9]/.exec(String(err?.status))) {
            window.location.replace(`${window.location.origin}/welcome`);
          }
        });
    }
    throw error;
  }
}
