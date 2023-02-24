import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import {GOOGLE_KEY} from "../../../config/constants";

export default function RouteMap({
  markers,
  startingPoint,
  endingPoint,
  travelMode,
  handleAddRow,
  updateStartEndPosition,
  preRenderMarkers = false,
}) {
  const { ref, map, google } = useGoogleMaps(
    GOOGLE_KEY,
    {
      zoom: 3,
      center: startingPoint,
    }
  );
  const [oldMarkers, setOldMarkers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);

  // useEffect(() => {
  //   if (map) {
  //     if (preRenderMarkers) {
  //       console.log('preRenderMarkers')
  //       const directionsService = new google.maps.DirectionsService();
  //       const directionsRenderer = new google.maps.DirectionsRenderer();
  //       directionsRenderer.setMap(map);
  //
  //       const origin = startingPoint;
  //       const destination = endingPoint;
  //
  //       console.log(origin);
  //       console.log(destination);
  //       console.log(travelMode);
  //
  //       const request = {
  //         origin: origin,
  //         destination: destination,
  //         travelMode: travelMode,
  //       };
  //
  //       directionsService.route(request, (result, status) => {
  //         console.log(status);
  //         console.log(result);
  //         if (status === "OK") {
  //           directionsRenderer.setDirections(result);
  //         }
  //       });
  //     }
  //   }
  // }, [map, google]);
  useEffect(() => {
    setMapMarkers(markers)

  } );
  useEffect(() => {
    console.log('Hello')
    //setOldMarkers([]);
  }, [oldMarkers]);

  useEffect(() => {
    clearMap()
    console.log('Called')
    console.log('markers Length', mapMarkers.length)
    if (map && mapMarkers.length >= 2) {
      console.log("Calculate Distance");
      console.log('markers',mapMarkers);
      console.log('length',mapMarkers.length);
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      setDirections(directionsRenderer)
      directionsRenderer.setMap(map);

      const origin = mapMarkers[0].position;
      const destination = mapMarkers[1].position;
      const request = {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
      };
      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      });

      if (updateStartEndPosition) updateStartEndPosition(origin, destination);

    }
  }, [map,mapMarkers, travelMode]);


  const clearMap = () => {
    if (oldMarkers.length> 0){
      console.log('oldMarkers Length',oldMarkers.length)
      console.log('markers',mapMarkers.length)
      oldMarkers.forEach(marker => {
        marker.setMap(null);
      });
      if (directions){
        directions.setMap(null);
      }
      setOldMarkers([])
    }
  }
  const Marker = ({
    index,
    position,
    map,
    color,
    onPositionChange,
    onRemove,
  }) => {
    setTimeout(function () {
      if (oldMarkers.length<100) {
        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          draggable: false,
          icon: {
            path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
            scale: 1,
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 0,
          },
        });
        setOldMarkers((prevState) => [...prevState, marker]);
      }

    }, 100);


    return null;
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div ref={ref} style={{ height: "100vh", width: "100%" }} />
        {mapMarkers.length>0 && mapMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            map={map}
            color={marker.color}
          />
        ))}
      </div>
    </>
  );
}
