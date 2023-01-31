import React from "react";
import { Fragment, useEffect, useState, useRef } from "react";
import { useGoogleMaps } from "react-hook-google-maps";

export default function RouteMap(props) {
  const prevMarkersRef = useRef([]);

  // incoming location to set
  let point = {
    lat: 35,
    lng: -100,
  };

  let dest = {
    lat: 34.99,
    lng: -100.1,
  };

  // Map options
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0",
    {
      zoom: 6,
      center: point,
    }
  );
  useEffect(() => {
    if (map) {
      // ADD MARKER
      const m = addMarker();
      clearMarkers(prevMarkersRef.current); //clear prev markers
      prevMarkersRef.current.push(m);
      map.setCenter(point);
      //Add Directions
      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      calcRoute(directionsService, directionsRenderer);
    }
  }, [point]);

  // SIDE FUNCTIONS
  function addMarker() {
    return new window.google.maps.Marker({
      position: point,
      map: map,
    });
  }
  function clearMarkers(markers) {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  function calcRoute(directionsService, directionsRenderer) {
    let request = {
      origin: point,
      destination: dest,
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div ref={ref} style={{ height: "100vh", width: "100%" }} />
      </div>
    </>
  );
}
