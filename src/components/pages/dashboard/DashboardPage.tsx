"use client";
import { FC } from "react";
import { StatusCard } from "@/components/StatusCard";
import { Icon } from "@iconify/react";
import { useCameraService } from "@/service/app-services/cameras";
import { useFaceService } from "@/service/app-services/faces/new-faces";
import { useRouter } from "next/navigation";

const DashboardPage: FC = () => {
  const router = useRouter();
  const { cameras, loading: camLoading, error: camError } = useCameraService();
  const { newFaces, loading: faceLoading, error: faceError } = useFaceService();
  const loading = camLoading || faceLoading;
  const error = camError || faceError;
  const routingCamera = () => {
    router.push("/camera");
  };
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
    <div className=" flex items-center gap-4 justify-center overflow-y-auto">
      <StatusCard
        start_adornment={
          <Icon
            icon="icon-park-outline:camera-four"
            className="text-blue-400 size-16"
          />
        }
        total={cameras.length}
        card_title="Cameras List"
        onClick={routingCamera}
      />
      <StatusCard
        start_adornment={
          <Icon icon="tdesign:user-filled" className="text-green-400 size-16" />
        }
        total={newFaces.length}
        card_title="Identified Persons"
      />
    </div>
  );
};
export default DashboardPage;
