import 'mapbox-gl/dist/mapbox-gl.css';
import React, {useEffect, useRef} from "react";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoid3lhemRhbmkiLCJhIjoiY2xmdDhvemN4MGR2NjNuc2NhYW9xZzlkaiJ9.osl4j8gDf_Mw6jrvEE98FA';

export default function RouteMapBox({
                                        coordinates,
                                        zoom = 6,
                                        center,
                                        historicalCoordinates = []
                                    }) {
    const mapContainer = useRef(null);
    const mapInstance = useRef(null);
    useEffect(() => {

        if (coordinates.length === 0) {
            zoom = 5;
        }
        // if (mapInstance.current) {
        //     mapInstance.current.remove();
        // }
        if (!mapInstance.current) {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: center,
                zoom: zoom
            });
        } else {

            mapInstance.current.remove();

            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: center,
                zoom: zoom
            });
        }

        const featureList = [];
        featureList.push({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
            }
        });

        mapInstance.current.on('load', () => {
            coordinates.map((coordinate) =>

                new mapboxgl.Marker({color:'#fffff'})
                    .setLngLat(coordinate)
                    .addTo(mapInstance.current)
            );
            historicalCoordinates.map((coordinate) =>

                new mapboxgl.Marker({color:'#ffff80'})
                    .setLngLat(coordinate)
                    .addTo(mapInstance.current)
            );
            mapInstance.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featureList

                }
            });
            mapInstance.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#3d7be0',
                    'line-width': 6
                },
                'filter': ['==', '$type', 'LineString']
            });
            mapInstance.current.addLayer({
                'id': 'markers',
                'type': 'circle',
                'source': 'route',
                'paint': {
                    'circle-radius': 6,
                    'circle-color': '#B42222'
                },
                'filter': ['==', '$type', 'Point']
            });

        })
        return () => {
            if (mapInstance.current) {
                mapInstance.current.off('load');
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    },[coordinates]);

    return (
        <>
            <div id="map" ref={mapContainer} style={{ width: '100%', height: '400px' }} />
        </>
    );
}
