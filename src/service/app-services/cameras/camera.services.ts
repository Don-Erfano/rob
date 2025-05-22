import type {
    Camera,
    ActiveContainer,
    ServiceResponse,
} from './interface';
import {INetworkResponse} from "@/service/endpoints/interface";
import AbstractHttp from "@/service/endpoints/abstract.http";

export default class CameraService extends AbstractHttp {
    constructor() {
        super('/cameras');
    }


    public getAll(): Promise<INetworkResponse<ServiceResponse>> {
        const method = this.http.instance.Get<void, INetworkResponse<ServiceResponse>>(
            this.url
        );
        return this.http.request(method) as Promise<INetworkResponse<ServiceResponse>>;
    }


    public getCameras(): Promise<Camera[]> {
        return this.getAll().then(res => res.data.cameras);
    }


    public getActiveContainers(): Promise<ActiveContainer[]> {
        return this.getAll().then(res => res.data.active_containers);
    }
}

export const cameraService = new CameraService();
