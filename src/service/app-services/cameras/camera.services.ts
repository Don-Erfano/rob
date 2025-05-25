import { ServiceResponse } from './interface';
import { INetworkResponse } from '@/service/endpoints/interface';
import AbstractHttp from '@/service/endpoints/abstract.http';

export default class CameraService extends AbstractHttp {
    constructor() {
        super('/cameras');
    }
    public getAll(): Promise<ServiceResponse> {
        const method = this.http.instance.Get<void, INetworkResponse<ServiceResponse>>(this.url);
        return this.http
            .request(method)
            .then((raw) => {
                if (
                    !raw ||
                    typeof raw !== 'object' ||
                    !Array.isArray((raw as any).cameras) ||
                    !Array.isArray((raw as any).active_containers)
                ) {
                    throw new Error('Invalid payload shape from /cameras');
                }
                return raw as ServiceResponse;
            });
    }
}

export const cameraService = new CameraService();
