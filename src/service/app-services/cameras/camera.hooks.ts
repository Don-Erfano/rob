import { useState, useEffect } from 'react';
import type { Camera, ActiveContainer } from './interface';
import { cameraService } from './camera.services';

export function useCameraService() {
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [activeContainers, setActiveContainers] = useState<ActiveContainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        cameraService
            .getAll()
            .then((resp) => {
                setCameras(resp.cameras);
                setActiveContainers(resp.active_containers);
            })
            .catch((err) => {
                console.error('Camera load error:', err);
                setError(err as Error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { cameras, activeContainers, loading, error };
}
