export interface Camera {
    camera_id: string;
    rtsp_url: string;
    fps: number | null;
    status: 'stopped' | 'active';
    stream_port: number | null;
}

export interface ActiveContainer {
    port: number;
    camera_id: string;
    stream_queue: string;
}

export interface ServiceResponse {
    cameras: Camera[];
    active_containers: ActiveContainer[];
}
