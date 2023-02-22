import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import {GOOGLE_KEY} from "../../../../config/constants";

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

  // useEffect(() => {
  //   if (preRenderMarkers) {
  //     const directionsService = new google.maps.DirectionsService();
  //     const directionsRenderer = new google.maps.DirectionsRenderer();
  //     directionsRenderer.setMap(map);

  //     const origin = startingPoint;
  //     const destination = endingPoint;

  //     console.log(origin);
  //     console.log(destination);
  //     console.log(travelMode);

  //     const request = {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: travelMode,
  //     };

  //     directionsService.route(request, (result, status) => {
  //       console.log(status);
  //       console.log(result);
  //       if (status === "OK") {
  //         directionsRenderer.setDirections(result);
  //       }
  //     });
  //   }
  // }, [preRenderMarkers, google, map]);

  // useEffect(() => {
  //   console.log("RouteMap");
  //   console.log(markers);
  //   if (markers.length > 0) {
  //     setMarkers((prevMarkers) => {
  //       let color;
  //       if (prevMarkers.length === 0) {
  //         color = "black";
  //       } else if (prevMarkers.length === 1) {
  //         color = "red";
  //       } else {
  //         color = "yellow";
  //       }

  //       return [
  //         ...prevMarkers,
  //         {
  //           position: {
  //             lat: 29.143644,
  //             lng: 71.25724,
  //             // lat: e.latLng.lat(),
  //             // lng: e.latLng.lng(),
  //           },
  //           color,
  //         },
  //       ];
  //     });
  //   }
  // }, [startingPoint, endingPoint, map, google, markers]);

  useEffect(() => {

    if (map) {
      const listener = map.addListener("click", (e) => {
        // setMarkers((prevMarkers) => {
        //   let color;
        //   if (prevMarkers.length === 0) {
        //     color = "black";
        //   } else if (prevMarkers.length === 1) {
        //     color = "red";
        //   } else {
        //     color = "yellow";
        //   }
        //   return [
        //     ...prevMarkers,
        //     {
        //       position: {
        //         lat: e.latLng.lat(),
        //         lng: e.latLng.lng(),
        //       },
        //       color,
        //     },
        //   ];
        // });
      });
      if (preRenderMarkers) {
        console.log('preRenderMarkers')
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const origin = startingPoint;
        const destination = endingPoint;

        console.log(origin);
        console.log(destination);
        console.log(travelMode);

        const request = {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
        };

        directionsService.route(request, (result, status) => {
          console.log(status);
          console.log(result);
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          }
        });
      }

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map, google]);

  useEffect(() => {
    if (map && markers.length >= 2) {
      console.log("Calculate Distance");
      console.log('markers',markers);
      console.log('length',markers.length);
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const origin = markers[0].position;
      const destination = markers[1].position;

      // console.log(origin);
      // console.log(destination);
      // console.log(travelMode);

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
  }, [map, markers, travelMode]);


  const Marker = ({
    index,
    position,
    map,
    color,
    onPositionChange,
    onRemove,
  }) => {
    setTimeout(function () {
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
    }, 500);


    return null;
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div ref={ref} style={{ height: "100vh", width: "100%" }} />
        {markers.map((marker, index) => (
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
