import { useState, useEffect } from 'react';
import type { Camera, ActiveContainer } from './interface';
import { cameraService } from '@/service/app-services/cameras/camera.services';

export function useCameraService() {
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [activeContainers, setActiveContainers] = useState<ActiveContainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setLoading(true);
        cameraService
            .getAll()
            .then(({ data }) => {
                setCameras(data.cameras);
                setActiveContainers(data.active_containers);
            })
            .catch(e => {
                console.error(e);
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { cameras, activeContainers, loading, error };
}
