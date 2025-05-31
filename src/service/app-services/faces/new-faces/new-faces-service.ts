import { NewFacesResponse } from "./interface";
import { INetworkResponse } from "@/service/endpoints/interface";
import AbstractHttp from "@/service/endpoints/abstract.http";

export default class FaceService extends AbstractHttp {
  constructor() {
    super("/new-faces");
  }

  public getNewFaces(): Promise<NewFacesResponse> {
    const method = this.http.instance.Get<
      void,
      INetworkResponse<NewFacesResponse>
    >(this.url);
    return this.http.request(method).then((raw) => {
      if (
        !raw ||
        typeof raw !== "object" ||
        !Array.isArray((raw as any).new_faces)
      ) {
        throw new Error("Invalid payload shape from /new-faces");
      }
      return raw as NewFacesResponse;
    });
  }
}

export const faceService = new FaceService();
