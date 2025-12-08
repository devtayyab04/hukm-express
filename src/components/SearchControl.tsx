"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import type { LatLngExpression } from "leaflet";

interface SearchControlProps {
  setMarkerPosition: (position: LatLngExpression) => void;
  updateAddress: (lat: number, lon: number) => void;
}

export default function SearchControl({
  setMarkerPosition,
  updateAddress,
}: SearchControlProps) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: { countrycodes: "PK" }, // Limit search to Pakistan
    });

    const GeoSearchControlAny = GeoSearchControl as any;

    const searchControl = new GeoSearchControlAny({
      provider,
      style: "bar",
      autoClose: true,
      showMarker: false,
      showPopup: false,
      keepResult: true,
    });

    map.addControl(searchControl);

    const handleSearch = (result: any) => {
      if (result?.location) {
        const { x, y } = result.location; // x = lon, y = lat
        setMarkerPosition([y, x]);
        updateAddress(y, x);
        map.flyTo([y, x], 18);
      }
    };

    map.on("geosearch/showlocation", handleSearch);

    return () => {
      map.off("geosearch/showlocation", handleSearch);
      map.removeControl(searchControl);
    };
  }, [map, setMarkerPosition, updateAddress]);

  return null;
}
