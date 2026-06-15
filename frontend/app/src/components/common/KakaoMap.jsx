import { useEffect, useRef } from "react";

function KakaoMap({ lat = 37.5665, lng = 123.9780, level = 3 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(lat, lng);

      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level,
      });

      new kakao.maps.Marker({ map, position: center });
    });
  }, [lat, lng, level]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

export default KakaoMap;  