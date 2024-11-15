import React, { useEffect } from 'react';

const GoogleMapsIntegration = () => {
  useEffect(() => {
    // Load Google Maps script dynamically using the environment variable for the API key
    const loadGoogleMaps = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        // This callback will initialize the map when the script is loaded
        window.initMap = () => {
          const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 10,
          });

          const marker = new window.google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 },
            map: map,
            title: "Nearby Auto Shop",
          });

          
        };
      }
    };

    loadGoogleMaps();

    // Clean up by removing the script tag when the component is unmounted
    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      if (script) script.remove();
    };
  }, []);

  return <div id="map" style={{ height: "300px", width: "100%" }}></div>;
};

export default GoogleMapsIntegration;
