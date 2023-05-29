import React, {useEffect} from "react";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoid3lhemRhbmkiLCJhIjoiY2xmdDhvemN4MGR2NjNuc2NhYW9xZzlkaiJ9.osl4j8gDf_Mw6jrvEE98FA';
export default function RouteMapBox({
                                        coordinates,
                                        zoom = 14,
                                        center
                                    }) {
    const mapContainer = React.useRef(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current.id,
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: center,
            zoom: zoom
        });

        const featureList = [];
        featureList.push({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
            }
        });
        coordinates.forEach((coordinate) => {
            featureList.push({
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': coordinate
                }
            });
        });
        map.on('load', () => {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featureList

                }
            });
            map.addLayer({
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
            map.addLayer({
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
    },[]);

    return (
        <>
            <div style={{ height: "100vh", width: "100%" }}>
                <div id="map" ref={mapContainer} style={{ height: "100vh", width: "100%" }} />
            </div>
        </>
    );
}
