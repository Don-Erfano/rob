import { useState, useEffect } from "react";
import type { NewFace } from "./interface";
import { faceService } from "./new-faces-service";

export function useFaceService() {
  const [newFaces, setNewFaces] = useState<NewFace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    faceService
      .getNewFaces()
      .then((resp) => {
        setNewFaces(resp.new_faces);
      })
      .catch((err) => {
        console.error("New faces load error:", err);
        setError(err as Error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { newFaces, loading, error };
}
