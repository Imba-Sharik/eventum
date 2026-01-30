"use client";

import { useEffect, useRef, useState } from "react";
import { load } from "@2gis/mapgl";
import { toast } from "sonner";
import { Lock, Unlock } from "lucide-react";

type MapGLAPI = Awaited<ReturnType<typeof load>>;
type MapInstance = InstanceType<MapGLAPI["Map"]>;
type MarkerInstance = InstanceType<MapGLAPI["Marker"]>;

interface MapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
}

export default function Map({
  latitude = 55.7558,
  longitude = 37.6173,
  address = "Москва, ул. Примерная, д. 1",
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    let marker: MarkerInstance | null = null;

    load().then((mapglAPI) => {
      if (mapContainer.current) {
        const isMobile = window.innerWidth < 768;
        const map = new mapglAPI.Map(mapContainer.current, {
          center: [longitude, latitude],
          zoom: isMobile ? 16.5 : 17.5,
          pitch: 45,
          rotation: 30,
          key: process.env.NEXT_PUBLIC_2GIS_API_KEY || "",
        });
        mapRef.current = map;

        marker = new mapglAPI.Marker(map, {
          coordinates: [longitude, latitude],
        });

        marker.on("click", () => {
          navigator.clipboard.writeText(address).then(() => {
            toast.success("Адрес скопирован", {
              description: address,
            });
          });
        });
      }
    });

    return () => {
      if (marker) marker.destroy();
      if (mapRef.current) mapRef.current.destroy();
    };
  }, [latitude, longitude, address]);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className="w-full h-112.5 md:h-125 rounded-lg overflow-hidden border border-gray-200 shadow-lg"
      />
      {/* Overlay блокирует взаимодействие с картой когда заблокирована */}
      {isLocked && (
        <div className="absolute inset-0 rounded-lg" />
      )}
      <button
        onClick={() => setIsLocked(!isLocked)}
        className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-colors z-10"
        title={isLocked ? "Разблокировать карту" : "Заблокировать карту"}
      >
        {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
      </button>
    </div>
  );
}
