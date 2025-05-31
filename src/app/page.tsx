"use client";

import { useCameraService } from "@/service/app-services/cameras";
import { StatusCard } from "@/components/StatusCard";
import { Icon } from "@iconify/react";
import { UserCard } from "@/components/UserCard";
import { useFaceService } from "@/service/app-services/faces/new-faces";
import { formatJalali } from "@/utils/helper/time-formatter";

export default function Home() {
  const { newFaces, loading: faceLoading, error: faceError } = useFaceService();
  const loading = faceLoading;
  const error = faceError;

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
      <div className="flex flex-wrap justify-center gap-4">
        {newFaces.map((face) => {
          return (
            <UserCard
              key={face.id}
              id={face.id}
              user_name={face.name}
              last_seen={formatJalali(face.last_seen)}
              image_data={`data:image/jpeg;base64,${face.image_data}`}
              score={face.score}
              camera_name={face.camera_id}
              onEdit={() => console.log("Edit", face.id)}
              onDelete={() => console.log("Delete", face.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
