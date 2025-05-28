import { FC } from "react";
import { CameraControlProps } from "./interface";

const CameraControl: FC<CameraControlProps> = ({
  camera_id,
  camera_fps,
  rtsp_url,
}) => {
  return (
    <div>
      <label className="f"> </label>
      <input></input>
    </div>
  );
};
export default CameraControl;
