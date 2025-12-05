"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default function SearchControl({ setMarkerPosition, updateAddress }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: { countrycodes: "PK" }, // LIMIT SEARCH TO PAKISTAN
    });

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      showMarker: false,
      showPopup: false,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result: any) => {
      const { x, y } = result.location;
      setMarkerPosition([y, x]);
      updateAddress(y, x);
      map.flyTo([y, x], 18);
    });

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}
