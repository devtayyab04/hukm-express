"use client";
import { useState, ChangeEvent, FormEvent, useEffect, } from "react";
import { Box, MapPin, Clock, Plus, X } from "lucide-react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";
import type { DragEndEvent } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Dynamic imports for react-leaflet components (SSR-safe)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const SearchControl = dynamic(() => import("./SearchControl"), { ssr: false });

// FIX: Use mergeOptions only
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Types
interface ItemField {
  id: string;
  description: string;
}

interface FormState {
  items: ItemField[];
  address: string;
  deliveryTime: "normal" | "express";
}

const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    items: [{ id: "1", description: "" }],
    address: "",
    deliveryTime: "normal",
  });

  const [isClient, setIsClient] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>([
    31.5204, 74.3587,
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateAddress = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      if (data?.display_name) {
        setFormData((prev) => ({ ...prev, address: data.display_name }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on your device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
        updateAddress(latitude, longitude);
        setShowMap(true);
      },
      () => alert("Turn on GPS for accurate location."),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };

  // FIXED: Correct dragend event type
  const handleMarkerDrag = (e: DragEndEvent) => {
    const marker = e.target;
    const { lat, lng } = marker.getLatLng();
    setMarkerPosition([lat, lng]);
    updateAddress(lat, lng);
  };

  const handleItemChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, description: value } : item
      ),
    }));
  };

  const addItemField = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { id: newId, description: "" }],
    }));
  };

  const removeItemField = (id: string) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const handleAddressChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handleDeliveryTime = (time: "normal" | "express") => {
    setFormData({ ...formData, deliveryTime: time });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nonEmptyItems = formData.items.filter(
      (item) => item.description.trim() !== ""
    );

    if (nonEmptyItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    const itemsText = nonEmptyItems
      .map((item, index) => `${index + 1}. ${item.description}`)
      .join("\n");

    const message = `🟢 *New Order Received!*\n
🛒 *Items Needed:*\n${itemsText}
📍 *Address:* ${formData.address}
⏱️ *Delivery:* ${formData.deliveryTime}`;

    const whatsappUrl =
      "https://wa.me/923117016894?text=" + encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div id="order" className="flex items-center justify-center bg-blue-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl p-8 w-full max-w-lg mt-3 mb-3 bg-white shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Quick Order Form
        </h1>

        <div className="mt-6">
          <label className="block font-semibold text-gray-900 flex items-center gap-2 mb-3">
            <Box className="w-5 h-5" /> What do you need?
          </label>

          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
            {formData.items.map((item, index) => (
              <div key={item.id} className="mb-3 last:mb-0">
                <div className="flex items-start gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, e.target.value)}
                      placeholder="Describe item..."
                      className="w-full py-2 px-3 pr-10 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-gray-900 resize-none"
                      rows={2}
                      required={index === 0}
                    />

                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItemField(item.id)}
                        className="absolute right-2 top-2 p-1 text-red-500 hover:bg-red-50 rounded-md transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItemField}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-green-600 hover:border-green-400 flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Another Item
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Delivery Address
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700 ml-2"
            >
              Use my current location
            </button>
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleAddressChange}
            placeholder="Enter your delivery address..."
            className="w-full py-3 px-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-gray-900 resize-none"
            rows={3}
            required
          />

          {isClient && showMap && (
            <div
              className="mt-2 overflow-hidden rounded-2xl shadow-md"
              style={{ height: "180px", width: "100%" }}
            >
              <MapContainer
                center={markerPosition}
                zoom={18}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <SearchControl
                  setMarkerPosition={setMarkerPosition}
                  updateAddress={updateAddress}
                />

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  position={markerPosition}
                  draggable={true}
                  eventHandlers={{ dragend: handleMarkerDrag }}
                >
                  <Popup>Drag me to your exact location</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Delivery Time
          </label>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleDeliveryTime("normal")}
              className={`px-4 py-2 rounded-md border text-sm transition ${
                formData.deliveryTime === "normal"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Normal (1–2 hours)
            </button>

            <button
              type="button"
              onClick={() => handleDeliveryTime("express")}
              className={`px-4 py-2 rounded-md border text-sm transition ${
                formData.deliveryTime === "express"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Express (30–45 minutes)
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 mt-6 w-full hover:bg-green-700"
        >
          Complete Order On Whatsapp
        </button>
      </form>
    </div>
  );
};

export default Form;
