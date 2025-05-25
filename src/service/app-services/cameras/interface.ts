export interface Camera {
    camera_id: string;
    rtsp_url: string;
    fps: number | null;
    status: 'active' | 'stopped' | string;
    stream_port?: number | null;
}

export interface ActiveContainer {
    camera_id: string;
    port: number;
    stream_queue: string;
}

export interface ServiceResponse {
    cameras: Camera[];
    active_containers: ActiveContainer[];
}
