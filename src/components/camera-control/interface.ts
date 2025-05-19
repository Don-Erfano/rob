export interface CameraControlProps{
    camera_id:string;
    rtsp_url:string;
    camera_fps?:number;
    onSubmit:()=>void;
    onClick:()=>void;
}