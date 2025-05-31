"use client";
import { FC } from "react";
import clsx from "clsx";
import { useCameraService } from "@/service/app-services/cameras";

const CameraPage: FC = () => {
  const { cameras, loading: camLoading, error: camError } = useCameraService();
  const loading = camLoading;
  const error = camError;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-[100%] grid bg-gray-100/80 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-gray-500">
        <p>Available Cameras</p>
      </div>

      <ul className="space-y-4">
        {cameras.map((cam) => (
          <li
            key={cam.camera_id}
            className={clsx(
              "p-4 rounded border",
              cam.status === "active" ? "border-green-500" : "border-red-500",
            )}
          >
            <p
              className={clsx(
                "font-medium",
                cam.status === "active" ? "text-green-500" : "text-red-500",
              )}
            >
              {cam.camera_id}
            </p>
            <p className="text-sm text-gray-900">{cam.rtsp_url}</p>
            <span
              className={clsx(
                "text-xs mt-1 inline-block py-1 rounded",
                cam.status === "active"
                  ? "bg-green-200 text-green-800"
                  : "text-red-600",
              )}
            >
              {cam.status.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CameraPage;
