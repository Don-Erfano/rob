'use client';

import clsx from 'clsx';
import {useCameraService} from "@/service/app-services/cameras";

export default function Home() {
    const { cameras, activeContainers, loading, error } = useCameraService();

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
        <div className="grid bg-white grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="text-gray-500">
                <p>Available Cameras</p>
            </div>

            <ul className="space-y-4">
                {cameras.map((cam) => (
                    <li
                        key={cam.camera_id}
                        className={clsx(
                            'p-4 rounded border',
                            cam.status === 'active'
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-300 bg-gray-50'
                        )}
                    >
                        <p className="font-medium">{cam.camera_id}</p>
                        <p className="text-sm text-gray-600">{cam.rtsp_url}</p>
                        <span
                            className={clsx(
                                'text-xs mt-1 inline-block px-2 py-1 rounded',
                                cam.status === 'active'
                                    ? 'bg-green-200 text-green-800'
                                    : 'bg-gray-200 text-gray-800'
                            )}
                        >
              {cam.status.toUpperCase()}
            </span>
                    </li>
                ))}
            </ul>

            <div>
                <h3 className="text-gray-500 mb-2">Active Streams</h3>
                <ul className="space-y-2">
                    {activeContainers.map((ac) => (
                        <li key={ac.camera_id}>
                            {ac.camera_id} on port {ac.port}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
