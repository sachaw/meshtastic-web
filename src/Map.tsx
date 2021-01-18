import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2FjaGF3IiwiYSI6ImNrNW9meXozZjBsdW0zbHBjM2FnNnV6cmsifQ.3E4n8eFGD9ZOFo-XDVeZnQ";
  const mapDiv = useRef<HTMLDivElement>(null);
  let [map, setMap] = useState(null);
  useEffect(() => {
    const attachMap = (
      setMap: React.Dispatch<React.SetStateAction<any>>,
      mapDiv: React.RefObject<HTMLDivElement>
    ) => {
      if (!mapDiv.current) {
        return;
      }
      const map = new mapboxgl.Map({
        container: mapDiv.current || "",
        style: "mapbox://styles/mapbox/cjerxnqt3cgvp2rmyuxbeqme7",
        center: [-121.91390991210938, 40.316184625814095],
        zoom: 10,
      });
      setMap(map);
    };

    !map && attachMap(setMap, mapDiv);
  }, [map]);

  return <div className="h-full" ref={mapDiv} />;
};

export default Map;
